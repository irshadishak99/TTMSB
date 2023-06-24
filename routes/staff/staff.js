var express = require('express');
var router = express.Router();
var router = require('express').Router();
var app = express();
const bcrypt = require('bcrypt');
module.exports = router;
var db = require('../db');





//////////////// staff Crud ////////////////


router.get("/staffadd",function(req,res){
    if (req.session.loggedin) {
        var data;
      
        db.query("select * from staff where staffID != 'admin'",function(error,result){
            if(error){
                throw error;
            }
                 data=result;
                res.render("staffadd",{json:JSON.parse(JSON.stringify(data))});
        });
        }else{
            res.render("login");
        }
    });

    /////////////////Add staff //////////////////////
    router.post("/addstaff",function(req,res){
        const password = req.body.password;
       
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
            }
            else{
                var hashPass = hash;
            }


        if (req.session.loggedin)
        { 
            db.query(
           "INSERT INTO staff (staffID,fullName,password,email) VALUES ('"+req.body.staffID+"',  '"+req.body.fullName+"', ? ,'"+req.body.email+"')" ,[hashPass],function(err,result){
             if (err) {
               if(err.code == "ER_DUP_ENTRY" ){
                   console.log("Error Dupliacate");
               }else{
                    throw err;
               }
            }
            console.log("record inserted");
            res.redirect("/staffadd");
        }); 
    
    }else{
        res.render("login");

    
    }
    });
     res.redirect('staffadd');
   });

   ///////////////////Delete//////////////
   
   router.get("/staffdel/:staffID/",function(req,res){
    db.query(
            "DELETE FROM staff WHERE staffID = '"+req.params.staffID+"'",function(err,result){
              if (err) {
                    res.send("Unable to do");
                    throw err;
                } else { // redirect to users list page
                    res.redirect("/staffadd");
                } 
        }); 
    });
   
    ////////////Edit/Update///////////////////////
    
router.get('/staffedit/:staffID',function(req, res)  {
    if (req.session.loggedin)
    {
   
        var staffID = req.params.staffID;
         db.query('SELECT * FROM staff WHERE staffID = ? ', [staffID], function(err, results) {
         console.log(results[0]);
        if (err)throw err;
        res.render('staffedit', {
            title : "Update Record",
            roomData : results[0]
        });
         
    });}else{
        res.render("login");
    }
    
});

router.post('/staffupdate', function (req, res) {
    const password = req.body.password;
       
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
            }
            else{
                var hashPass = hash;
            }
    if (req.session.loggedin) {
      var sql =
        'UPDATE staff SET staffID = ?, fullName = ?, password = ?, email = ? WHERE staffID = ?';
      var values = [
        req.body.staffID,
        req.body.fullName,
        [hashPass],
        req.body.email,
        req.body.staffID,
      ];
      var query = db.query(sql, values, function (err, results) {
        if (err) throw err;
        res.redirect('staffadd');
      });
    } else {
      res.render('login');
    }
    })
  });


    
module.exports = router;   
    