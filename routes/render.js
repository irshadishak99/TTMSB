var express = require('express');
var router = express.Router();
var router = require('express').Router();
var app = express();
module.exports = router;
var db = require('./db');


var faculty = require('./faculty/faculty'); 
var staff = require('./staff/staff'); 
var upload = require('./upload/upload'); 
var user = require('./user/user'); 
var verify = require('./verify/verify'); 

 /* Importing all modules */
 router.use('/', faculty); 
  router.use('/', staff); 
 router.use('/', user); 
 router.use('/', upload); 
 router.use('/', verify); 
 //router.use('/',);

 router.get('/admin', function (req, res) {    
    res.render('login');});

// router.get('/verify', function (req, res) {    
//       res.render('pages/verify');});
router.get('/adminManual', function(req,res){
	if (req.session.loggedin) {
	res.render('adminManual')
}
else {
	res.render("pages/index");
	}
});
router.get('/userManual', function(req,res){
	if (req.session.loggedin) {
	res.render('userManual')
	}
	else {
		res.render("pages/index");
		}
});

/* GET home page. */
router.get("/",function(req,res){
    if (req.session.loggedin) {
		res.render("detailView");
	} else {
		res.render("pages/index");
		}
	res.end();
    });


router.get("/login",function(req,res){
    if (req.session.loggedin) {
		res.render("detailView");
	} else {
		res.render("login");
		}
	res.end();
    });


module.exports = router;   