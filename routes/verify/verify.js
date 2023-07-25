var express = require('express');
var router = express.Router();
var router = require('express').Router();
var app = express();
module.exports = router;
var db = require('../db');


router.get("/verify",function(req,res){
    console.log(req.query.hash);
        
       
        res.render("pages/verify")
});