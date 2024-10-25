const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/shoeStore'; // Make sure MongoDB is running locally
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema for the user information
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    size: String,
    number: String,
    email: String
});

// Create a model for the User collection
const User = mongoose.model('User', userSchema);

// Route to handle form submission
app.post('/api/submit', async (req, res) => {
    const { name, age, size, number, email } = req.body;

    // Create a new user document
    const newUser = new User({
        name,
        age,
        size,
        number,
        email
    });

    try {
        // Save the user to MongoDB
        await newUser.save();
        res.json({ message: 'User information saved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save user information.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
