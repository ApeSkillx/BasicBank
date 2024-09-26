const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
const fs = require('fs'); // Import fs to read files
require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected');
        addUsers(); // Call addUsers after successful connection
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });


const userSchema = mongoose.Schema({
    S_No: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Account_Number: {
        type: String,
        required: true,
        unique: true
    },
    Balance: {
        type: Number,
        default: 0.0
    }
})

const userModel = mongoose.model('userModel', userSchema);


const data = [
    {
        S_No: 6,
        Name: 'Aaruhi',
        Account_Number: '23023500',
        Balance: '900000'
    },
    {
        S_No: 7,
        Name: 'Honey',
        Account_Number: '23038600',
        Balance: '60000'
    },
    {
        S_No: 8,
        Name: 'Prakhar',
        Account_Number: '23025400',
        Balance: '4500000'
    },
    {
        S_No: 9,
        Name: 'Rishab',
        Account_Number: '23039600',
        Balance: '200000'
    },
    {
        S_No: 10,
        Name: 'Piyush',
        Account_Number: '23039200',
        Balance: '143000'
    },
]

// Add HardCODED users instead of JSON
// const addUsers = async () => {
//     const existingUsers = await userModel.countDocuments();
//     if (existingUsers === 0) {
//         await userModel.insertMany(data);
//         console.log('Initial users added');
//     }
// };


// Function to add users from JSON file
const addUsers = async () => {
    try {
        const existingUsers = await userModel.countDocuments();
        if (existingUsers === 0) {
            const data = JSON.parse(fs.readFileSync('./DB/data.json', 'utf8')); // Read and parse the JSON file
            await userModel.insertMany(data);
            console.log('Initial users added');
        }
    } catch (error) {
        console.error('Error adding users:', error);
    }
};

addUsers();

app.get('/getusers', async (req, res) => {
    try {
        const response = await userModel.find();
        return res.send(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "There was an error fetching users." });
    }
});

//Transaction Schema for Ledger
const transactionSchema = mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const TransactionModel = mongoose.model('Transaction', transactionSchema);


app.patch('/transfer', async (req, res) => {
    try {
        const { sen_acc, rec_acc, amt } = req.body;
        console.log("Received data:", req.body);

        // Ensure the amount is a valid number
        if (isNaN(amt) || amt <= 0) {
            return res.status(400).json({ msg: "Amount must be a positive number" });
        }

        // Check if both accounts exist
        const sender = await userModel.findOne({ Account_Number: sen_acc });
        const receiver = await userModel.findOne({ Account_Number: rec_acc });
        
        console.log("Sender Check:", sender);
        console.log("Receiver Check:", receiver);

        if (!sender || !receiver) {
            return res.status(404).json({ msg: 'Either Sender or Receiver Account does not exist' });
        }
        
        // Check if sender has sufficient balance
        if (sender.Balance < amt) {
            return res.status(403).json({ msg: 'Insufficient Balance' });
        }

        // Update the balances
        const updateSender = await userModel.updateOne(
            { Account_Number: sen_acc },
            { $inc: { Balance: -amt } }
        );

        const updateReceiver = await userModel.updateOne(
            { Account_Number: rec_acc },
            { $inc: { Balance: amt } }
        );

        // Save transaction to the TransactionModel
        const newTransaction = new TransactionModel({
            sender: sen_acc,
            receiver: rec_acc,
            amount: amt,
        });
        await newTransaction.save();

        // Fetch updated balances (optional for logging)
        const updatedSender = await userModel.findOne({ Account_Number: sen_acc });
        const updatedReceiver = await userModel.findOne({ Account_Number: rec_acc });
        console.log("Updated Sender Check:", updatedSender);
        console.log("Updated Receiver Check:", updatedReceiver);

        // Check if both updates were successful
        if (updateSender.modifiedCount > 0 && updateReceiver.modifiedCount > 0) {
            return res.status(200).json({ 
                msg: "Amount successfully transferred",
                updatedSenderBalance: updatedSender.Balance,
                updatedReceiverBalance: updatedReceiver.Balance,
            });
        }

        return res.status(500).json({ msg: 'There was an error during the transaction' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Server Error', error: err.message });
    }
});

// Ledger Route
app.get('/ledger', async (req, res) => {
    try {
        const transactions = await TransactionModel.find().sort({ date: -1 });
        return res.json(transactions);
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching ledger." });
    }
});

app.listen(port, ()=> {
    console.log(`server started on ${port}`)
})