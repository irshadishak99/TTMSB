// Load Node modules
var express = require('express');
const ejs = require('ejs');
const path = require('path')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var main = require('./routes/render'); 
// Initialise Express
var app = express();
// Render static files
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// *** GET Routes - display pages ***
// Root Route
app.get('/index', function (req, res) {
    res.render('pages/index');});
// app.get('/upload', function (req, res) {  
     
    // res.render('pages/upload');});

// app.get('/delete', function (req, res) {    
//     res.render('pages/delete');});
// app.get('/admin', function (req, res) {  
//     res.render('pages/admin');});
    
app.use('/', main); 
// Port website will run on
app.listen(2052,function(){
    console.log("Everything is fine");
});
