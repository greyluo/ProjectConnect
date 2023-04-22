const express = require('express');
const app = express();

// Define a route to serve your index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define a route to handle the button click and redirect to user.js
app.get('/redirect', (req, res) => {
  res.redirect('/user');
});

// Define a route for the user page
app.get('/user', (req, res) => {
  res.send('Welcome to the User page!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
