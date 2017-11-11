/*jshint esversion: 6 */

const express = require('express'),
  hbs = require('hbs'),
  fs = require('fs');

const app = express();

app.set('view engine', 'hbs');

// __dirname gives the absolute path name to the present file
// register partial templates to be used as parts of pages
hbs.registerPartials(__dirname + '/views/partials');

// This is middleware to make and store a server activity log
// app.use is the syntax for registering middleware
// next tells express that the middleware is done, time to move on - don't forget to call it!
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// This is middleware for maintenance mode, display maintenance page on all routes
// on this one, we don't call next because we want this one to block the rest
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Middleware that tells express to access /public/help.html as localhost:3000/help.html
// express.static is built-in middleware to serve static files
app.use(express.static(__dirname + '/public'));

// Register a Handlebars helper function, called in templates
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// Set up a handler for GET - always these two args
app.get('/', (req, res) => { // to any req on /
  // Can send html, an object, or call a render on a template
  // res.send('<h1>Hello Express!</h1>'); // send this response
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeContent: 'Welcome to our home page, you lucky dog!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  // In this case, the response is sent in json
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
