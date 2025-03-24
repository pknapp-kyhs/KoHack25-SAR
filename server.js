// Imports
const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();
app.use(express.text());

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

app.post('/updateDb', (req, res) => {

  newUser = JSON.parse(req.body);

  let db = JSON.parse(fs.readFileSync(__dirname + "/models/db.json"));

  db.users.push(newUser);

  fs.writeFileSync(__dirname + "/models/db.json", JSON.stringify(db));

});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

