// Imports
const express = require('express');
const path = require('path');
const app = express();


// Set static directories
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "controllers")));

// Default route sends 'index.html'
app.get('/', (req, res) => {
  res.sendFile('/views/index.html');
});

// The '/getDb' endpoint sends the database to the client
app.get('/getDb', (req, res) => {
  res.sendFile(__dirname + '/models/db.json');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
