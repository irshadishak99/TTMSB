var express = require('express');
var router = express.Router();
var router = require('express').Router();
var app = express();

const request = require('request');
const bcrypt = require('bcrypt');
module.exports = router;
var db = require('../db');
var username;
var password;


/* POST  submitLogin . */
        // router.post("/submitLogin",function(request,response){
        //      username= request.body.username;
        //      password= request.body.password;
        //     if(username && password ){
        //     db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(err, results) {
        
        //         console.log("User Name id Type of "+ typeof(username)+ "And Password is Type of "+ typeof(username) );
        //         if(username == 'admin' && password == 'admin'){
        //             console.log("Test Passed of Authentiacatoin");
        //         }else{
        //             console.log("Test Failed Credential Not Matched ");
        //         }
        //         if (err){
        //             throw err;
        //         } 
        
        //         if (results.length > 0) {
        //             request.session.loggedin = true;
        //             request.session.username = username;
        //             response.redirect("/admin");
        //         } else {
        //             response.redirect("/admin");
        //         }			
        //         response.end();
               
        //       });
        // }
        // });

                    router.post('/login', (req, res) => {
                    const username = req.body.username;
                    const password = req.body.password;
      
        
                  if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
                  return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
                  }    
                  // Put your secret key here.
                  var secretKey = "6LcgQpQmAAAAAJ164zVKsOkjqoFcgJwNBkLp9NKM";
                  // req.connection.remoteAddress will provide the IP address of the connected user.
                  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
                  
                  // Hitting GET request to the URL, Google will respond with success or error scenario.
                  request(verificationUrl, function(error, response, body) {
                      body = JSON.parse(body);
                      // Success will be true or false depending upon captcha validation.
                      if (body.success !== undefined && !body.success) {
                          return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
                      }
      
                      db.query('SELECT * FROM staff WHERE staffID = ?', [username], (err, results) => {
                          if (err) {
                              console.error(err);
                              res.status(500).send('Internal Server Error');
                          } else {
                              if (results.length === 0) {
                                  // User not found
                                  res.status(401).send('Invalid username or password');
                              } else {
                                  const user = results[0];
      
                                  // Compare the provided password with the stored hashed password
                                  bcrypt.compare(password, user.password, (err, match) => {
                                      if (err) {
                                          console.error(err);
                                          res.status(500).send('Internal Server Error');
                                      } else {
                                          if (match) {
                                              req.session.loggedin = true;
                                              req.session.username = username;
                                              if(username == 'admin')
                                              {
                                                res.redirect("/admin");
                                              }else
                                              res.redirect("/detailView");
                                          } else {
                                            res.status(401).send('Invalid username or password');
                                          }
                                      }
                                  });
                              }
                          }
                      });
                  });
              
      });
        
      
       
        

         /* GET Logout Method  . */
        router.get("/logout", function (req, res) {
          req.session.destroy(function (err) {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/");
            }
          });
        });




   router.get("/admin",function(req,res){
        if (req.session.loggedin) {
    
            res.render("admin");
        }else{
            res.render("login");
            
        }
        });
              
    router.get("/detailView",function(req,res){
        if (req.session.loggedin) {
    
            res.render("detailView");
        }else{
            res.render("login");
            
        }
        });
        router.get('/addexporter', function (req, res) {    
            res.render('addexporter');});

        router.get('/delete', function (req, res) {    
              res.render('delete');});
    
module.exports = router;   
    
