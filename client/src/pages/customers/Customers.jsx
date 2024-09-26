import React from "react";
import './Customers.css';

function Customers({ users, refreshUsers }) {
  return (
    <div>
       <div className="header-container">
            <h1>Customer Account Details</h1>
            <button className="refreshUser" onClick={refreshUsers}>Refresh Users</button>
       </div>
       <table className="table-container">
        <thead>
          <tr>
            <th>S_No</th>
            <th>Name</th>
            <th>Account No.</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item._id}>
              <td>{item.S_No}</td>
              <td>{item.Name}</td>
              <td>{item.Account_Number}</td>
              <td>{item.Balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
