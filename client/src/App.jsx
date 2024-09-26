import React, { useState, useEffect } from "react";
import Customers from "./pages/customers/Customers";
import Transaction from "./pages/Transaction/Transaction";
import Nav from "./pages/Nav";
import Hero from "./pages/Hero";
import Footer from "./pages/Footer";
import Ledger from "./pages/Ledger/Ledger";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const getUsersData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ledger");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getUsersData();
    fetchTransactions(); // Fetch transactions on initial load
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/customers" element={<Customers users={users} refreshUsers={getUsersData} />} />
          <Route path="/transaction" element={<Transaction refreshUsers={getUsersData} fetchTransactions={fetchTransactions} />} />
          <Route path="/ledger" element={<Ledger transactions={transactions} />} /> {/* Pass transactions to Ledger if needed */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
