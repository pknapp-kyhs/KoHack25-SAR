const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "controllers")));

app.get('/', (req, res) => {
  res.sendFile('/views/index.html');
});

app.get('/getDb', (req, res) => {
  res.sendFile(__dirname + '/models/db.json');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
