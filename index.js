require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Bring in our routes file, which contains all the API endpoints.
const routes = require('./routes/routes');

// Grab our MongoDB connection string from the .env file.
const mongoString = process.env.DATABASE_URL;

// Connect to MongoDB using that string.
mongoose.connect(mongoString);
const database = mongoose.connection;

// If the connection fails, print the error.
database.on('error', (error) => {
    console.log(error);
});

// If the connection succeeds, print a success message (only runs once).
database.once('connected', () => {
    console.log('Database Connected');
});

// Create our Express app.
const app = express();

// Allow the app to understand JSON data sent in requests.
app.use(express.json());

// Any request that starts with "/api" will be handled by our routes file.
// Example: localhost:3000/api/getAll
app.use('/api', routes);

// Start the server on port 3000.
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});