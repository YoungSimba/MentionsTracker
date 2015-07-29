//Load required packages
var path = require('path');
var express = require('express');
var compression = require('compression');
var secrets = require('./config/secrets');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

//Connect to MongoDB
mongoose.connect(secrets.db);

//Load Controllers
var homecontroller = require('./controllers/home');
var authController = require('./controllers/auth');

//Create our Express application
var app = express();

//Tell Express to use sessions
app.use(session({
	secret: secrets.sessionSecret, 
	resave: false,
	saveUninitialized: false,
}));

//Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

// Setup objects needed by views
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

//Add content compression middleware
app.use(compression());

//Serve static content such as HTML, CSS, JavaScript, etc.
// Add static middleware
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

// Add jade view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Create our Express router
var router = express.Router();

//Landing page route
router.get('/', homecontroller.index);


// Auth routes
router.get('/auth/twitter', authController.twitter);
router.get('/auth/twitter/callback', authController.twitterCallback, function(req, res) {
  res.redirect(req.session.returnTo || '/');});
router.get('/auth/logout', authController.logout);

app.use(router);

app.listen(3000);
