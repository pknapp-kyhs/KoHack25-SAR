// Import Express
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

// Define a route
app.get('/', (req, res) => {
  res.sendFile('index.html');
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
