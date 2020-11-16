import React from "react";
import ReactDOM from "react-dom";
import UsrPtsProfile from "./UsrPtsProfile";
const DATA = [];
//Bool for choosing saved or random data
const RandomData = true;
//Function for enerating dataset. The form is as if it came from a database.
function dataGen() {
  for (let i = 1; i < 40; i++) {
    DATA.push({
      id: Math.floor(i / 10) + 1,
      date: new Date(
        2020,
        Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 28)
      ),
      amount: Math.floor(Math.random() * 200)
    });
  }
}
//Function for calculating the points from a transaction
export function ptsCalc(amnt) {
  if (amnt >= 50) return amnt <= 100 ? amnt - 50 : (amnt - 100) * 2 + 50;
  return 0;
}
////Data structure:
//└── CustomerID
//├── totalPoints
//└── months
//    ├── monthTotal
//    └── monthRecords
function processData(data) {
  let groupedData = {};
  for (let record in data) {
    let customerID = data[record].id;
    let month = data[record].date.getMonth();
    let points = ptsCalc(data[record].amount);
    if (!groupedData[customerID]) {
      groupedData[customerID] = {
        "total": points,
        month: {
          "total": points,
          "records": [data[record]]
        }
      };
    } else {
      groupedData[customerID]["total"] += points;
      if (!groupedData[customerID][month]) {
        groupedData[customerID][month] = {
          "total": points,
          "records": [data[record]]
        };
      } else {
        groupedData[customerID][month]["total"] += points;
        groupedData[customerID][month]["records"].push(data[record]);
      }
    }
  }
  return groupedData;
}
dataGen();
const App = () => {
  let processedData = RandomData
    ? processData(DATA)
    : JSON.parse(
        '{"1":{"0":{"total":29,"records":[{"id":1,"date":"2020-01-07T06:00:00.000Z","amount":71},{"id":1,"date":"2020-01-09T06:00:00.000Z","amount":19}]},"1":{"total":248,"records":[{"id":1,"date":"2020-02-25T06:00:00.000Z","amount":143},{"id":1,"date":"2020-02-08T06:00:00.000Z","amount":131}]},"2":{"total":594,"records":[{"id":1,"date":"2020-03-03T06:00:00.000Z","amount":110},{"id":1,"date":"2020-03-22T05:00:00.000Z","amount":130},{"id":1,"date":"2020-03-02T06:00:00.000Z","amount":167},{"id":1,"date":"2020-03-13T05:00:00.000Z","amount":144},{"id":1,"date":"2020-03-16T05:00:00.000Z","amount":121}]},"total":871},"2":{"0":{"total":31,"records":[{"id":2,"date":"2020-01-04T06:00:00.000Z","amount":94},{"id":2,"date":"2020-01-09T06:00:00.000Z","amount":22},{"id":2,"date":"2020-01-05T06:00:00.000Z","amount":75}]},"1":{"total":244,"records":[{"id":2,"date":"2020-02-29T06:00:00.000Z","amount":56},{"id":2,"date":"2020-02-04T06:00:00.000Z","amount":175}]},"2":{"total":196,"records":[{"id":2,"date":"2020-03-01T06:00:00.000Z","amount":161},{"id":2,"date":"2020-03-02T06:00:00.000Z","amount":86},{"id":2,"date":"2020-03-22T05:00:00.000Z","amount":91},{"id":2,"date":"2020-03-04T06:00:00.000Z","amount":39},{"id":2,"date":"2020-03-06T06:00:00.000Z","amount":99}]},"total":471},"3":{"0":{"total":361,"records":[{"id":3,"date":"2020-01-01T06:00:00.000Z","amount":127},{"id":3,"date":"2020-01-16T06:00:00.000Z","amount":181},{"id":3,"date":"2020-01-24T06:00:00.000Z","amount":55}]},"1":{"total":202,"records":[{"id":3,"date":"2020-02-22T06:00:00.000Z","amount":68},{"id":3,"date":"2020-02-24T06:00:00.000Z","amount":160},{"id":3,"date":"2020-02-20T06:00:00.000Z","amount":1},{"id":3,"date":"2020-02-09T06:00:00.000Z","amount":36}]},"2":{"total":228,"records":[{"id":3,"date":"2020-03-22T05:00:00.000Z","amount":144},{"id":3,"date":"2020-03-19T05:00:00.000Z","amount":104},{"id":3,"date":"2020-03-07T06:00:00.000Z","amount":68}]},"total":791},"4":{"0":{"total":234,"records":[{"id":4,"date":"2020-01-13T06:00:00.000Z","amount":67},{"id":4,"date":"2020-01-09T06:00:00.000Z","amount":128},{"id":4,"date":"2020-01-16T06:00:00.000Z","amount":83},{"id":4,"date":"2020-01-13T06:00:00.000Z","amount":114},{"id":4,"date":"2020-01-07T06:00:00.000Z","amount":4}]},"1":{"total":0,"records":[{"id":4,"date":"2020-02-14T06:00:00.000Z","amount":42},{"id":4,"date":"2020-02-17T06:00:00.000Z","amount":16},{"id":4,"date":"2020-02-19T06:00:00.000Z","amount":32}]},"2":{"total":246,"records":[{"id":4,"date":"2020-03-05T06:00:00.000Z","amount":25},{"id":4,"date":"2020-03-23T05:00:00.000Z","amount":198}]},"total":480}}'
      );
  return (
    <div>
      <h2>Customer Points</h2>
      <ul>
        {Object.keys(processedData).map((customerID) => {
          return (
            <li key={customerID}>
              <UsrPtsProfile
                id={customerID}
                customerData={processedData[customerID]}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
