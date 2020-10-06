import React, { useState } from "react";
import { ptsCalc } from "./index";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export default ({ id, customerData }) => {
  const [showAll, setshowAll] = useState(false);
  return (
    <div>
      <h3>
        Customer ID: {id}: Total Points: {customerData.total}
      </h3>
      {showAll ? (
        <div>
          {Object.keys(customerData).map((month) => {
            if (monthNames[month])
              return (
                <div>
                  <p>
                    <b>
                      -- Month: {monthNames[month]} -{" "}
                      {"Month Total: " + customerData[month].total}
                    </b>
                  </p>
                  <table>
                    <thead>
                      <th>CID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Points</th>
                    </thead>
                    <tbody>
                      {customerData[month]["records"].map((record) => {
                        return (
                          <tr>
                            <td>{record.id}</td>
                            <td>
                              {record.date instanceof Date
                                ? record.date.toISOString().substring(0, 10)
                                : record.date.substring(0, 10)}
                            </td>
                            <td>${record.amount}</td>
                            <td>{ptsCalc(record.amount)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            else return null;
          })}
          <br />
        </div>
      ) : null}
      <button onClick={() => setshowAll(!showAll)}>
        {showAll ? "Hide All Transactions" : "Show All Transactions"}
      </button>
    </div>
  );
};
