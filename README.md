#  🏦 Banking System Web App
This web application is a simple banking system that allows users to view customer account details, transfer money between accounts, and view transaction history. 

## 🌟 Features
Customer Account Details: Displays a table with customer information, including account number, name, and balance.
Transaction: Allows users to transfer money from one account to another.
Transaction Ledger: Displays a table with transaction history, including sender, receiver, amount, and date.

## 🛠️ Technologies Used
- **Frontend**: React, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Styling**: CSS

## 🚀 Getting Started

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/banking-system.git
   cd banking-system
   ```
2. Install dependencies for the server:
    ```
    cd server
    npm install
3. Install dependencies for the client:
    ```
    cd client
    npm install
4.  Start the MongoDB server:
    ```
    mongod 
    (or simply use the mongodb Compass)

5. Start the backend server:
    ```
    cd server
    npm start
6. Start the frontend application:
    ```
    cd client
    npm start

## 👉 Usage
1. Open http://localhost:3000 in your web browser.
2. Navigate to the "Customer Account Details" page to view customer information.
3. Navigate to the "Transaction" page to transfer money between accounts.
4. Navigate to the "Transaction Ledger" page to view transaction history.

### 💻 API Endpoints
1. Customer Account Details
    `GET /getusers` : Retrieve customer account information
2. Transaction  
    ` PATCH /transfer` : Transfer money between accounts
3. Transaction Ledger
    `GET /ledger ` : Retrieve transaction history

## 🤝Contributing
Contributions are welcome! Please submit a pull request with your changes.