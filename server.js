/*jshint esversion: 6 */

const express = require('express'),
  hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');

// __dirname gives the absolute path name to the present file
// express.static is built-in middleware to serve static files
// this command allows me to access /public/help.html as localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

// Set up a handler for GET - always these two args
app.get('/', (req, res) => { // to any req on /
  // res.send('<h1>Hello Express!</h1>'); // send this response
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeContent: 'Welcome to our home page, you lucky dog!',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    problem: 'You got knocked out.',
    message: 'This is the error',
    solutions: [
      'Get a clue',
      'Use it'
    ]
  });
});

// listen on localhost:3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
