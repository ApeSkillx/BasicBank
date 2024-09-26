import React, { useState } from "react";
import "./transaction.css";
import axios from "axios";

function Transaction({ refreshUsers, fetchTransactions  }) {
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [amt, setAmt] = useState(0);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
        console.log("Sender:", sender, "Receiver:", reciever, "Amount:", amt);

        if (sender === reciever) {
            alert('Cannot transfer money to the same account');
            return;
        }

        const response = await axios.patch("http://localhost:5000/transfer", {
            sen_acc: sender,
            rec_acc: reciever,
            amt: amt,
        });

        if (response.status === 200 || response.status === 203) {
          console.log(response);
          alert(response.data.msg || "Money Transferred!");
          refreshUsers(); // Refresh users
          await fetchTransactions(); // Fetch updated transactions
        } else {
          alert("Transaction failed.");
        }
  
      } catch (err) {
        console.log(err);
        alert("There is some error: " + (err.response?.data.msg || err.message));
      } finally {
        setSender("");
        setReciever("");
        setAmt(0);
      }
      console.log('message received');
    };

  return (
    <div className="transaction">
      <h1>Transfer Money</h1>
      <form>
        <label htmlFor="from">From</label>
        <input
          type="text"
          placeholder="From Account"
          value = {sender}
          onChange={(e) => setSender(e.target.value)}
        />

        <label htmlFor="from">To</label>
        <input
          type="text"
          placeholder="To Account"
          value={reciever}
          onChange={(e) => setReciever(e.target.value)}
        />

        <label htmlFor="from">Amount</label>
        <input
          type="text"
          placeholder="Enter Amount"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
        />

        <button
          onClick={handleSubmit}
        >Transfer</button>
      </form>
    </div>
  );
}

export default Transaction;
