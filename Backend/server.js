const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

async function connectToDatabase() {
    try {
        const dbURI = 'mongodb+srv://sambhav511974:Sambhav1204@cluster0.ivgffuf.mongodb.net/';
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    profession: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Define Contact schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);


app.post('/backsignup', async (req, res) => {
    const { name, email, phone, profession, password } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new user instance
    const newUser = new User({
        name,
        email,
        phone,
        profession,
        password
    });

    // Save the user to the database
    try {
        await newUser.save();
        res.json({ message: 'Signup successful' });
        console.log("User saved:", newUser);
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/backlogin', async (req, res) => {
    const { email, password } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    try {
        // Check if a user with the provided email and password exists in the database
        const user = await User.findOne({ email, password });

        if (user) {
            // If the user exists, you can set a session token or return a success message
            res.json({ message: 'Login successful', user });
            console.log(`${user.name} logged in successfully.`);
        } else {
            // If the user does not exist or the password is incorrect, return an error message
            res.status(401).json({ error: 'Invalid email or password' });
            console.log('Invalid email or password.');
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Connect to MongoDB
    await connectToDatabase();

    // Create a new contact instance
    const newContact = new Contact({
        name,
        email,
        message
    });

    // Save the contact form submission to the database
    try {
        await newContact.save();
        res.json({ message: 'Contact form submitted successfully' });
        console.log("Contact form submission saved:", newContact);
    } catch (error) {
        console.error("Error saving contact form submission:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
