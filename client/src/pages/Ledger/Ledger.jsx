import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Ledger.css";
function Ledger() {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/ledger");
            console.log(response.data); // Log fetched transactions
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []); // Fetch data when the component mounts

    return (
        <div>
            <div className="header-container">
                <h1>Transaction Ledger</h1>
                <button className="refreshLedger" onClick={fetchTransactions}>Refresh Ledger</button>
            </div>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.sender}</td>
                            <td>{transaction.receiver}</td>
                            <td>{transaction.amount}</td>
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Ledger;
