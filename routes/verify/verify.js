var express = require('express');
var router = express.Router();
var router = require('express').Router();
var app = express();
module.exports = router;
var db = require('../db');


router.get("/verify",function(req,res){
    console.log(req.query.hash);
        
        var hash = req.query.hash;
        if(req.query.hash>2){
        console.log(hash);
        
        db.query("select * from transcript t CROSS JOIN faculty f ON t.studID = f.studID WHERE ? LIKE CONCAT('%', blockchainHash, '%')", [hash],function(error,result){
            if(error){
                throw error;
            }
            if(!result===0){
            console.log(result);
                 data=result[0];
                 console.log(data);
                 res.render("pages/verify",{data:data});
                }else{
                    res.render("pages/verifys");
                } 
           });
        }else{
        res.render("pages/verifys")
}});