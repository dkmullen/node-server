/*jshint esversion: 6 */

const express = require('express');

const app = express();

// Set up a handler for GET - always these two args
app.get('/', (req, res) => { // to any req on /
  // res.send('<h1>Hello Express!</h1>'); // send this response
  res.send({
    name: 'Dennis',
    likes: [
      'Running',
      'Learning',
      'Reading'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('This is the <strong>About Page</strong>');
});

app.get('/bad', (req, res) => {
  res.send({
    problem: 'You\'re a dumbass.',
    message: 'This is the error',
    solutions: [
      'Get a clue',
      'Use it'
    ]
  });
});

app.listen(3000); // listen on localhost:3000
