var express = require('express');
var router = express.Router();
var router = require('express').Router();

module.exports = router;
var db = require('../db');

router.get("/facultyView", function(req, res) {
    if (req.session.loggedin) {
      var faculty;
      var transcript;
  
      db.query('SELECT * FROM faculty', function(error, facultyResult) {
        if (error) {
          throw error;
        }
        faculty = facultyResult;
  
        db.query('SELECT * FROM transcript', function(error, transcriptResult) {
          if (error) {
            throw error;
          }
          transcript = transcriptResult;
  
          console.log(faculty);
          console.log(transcript);
  
          res.render("facultyView",{stud:JSON.parse(JSON.stringify(faculty)),transcript:JSON.parse(JSON.stringify(transcript))});
   
        });
      });
    } else {
      res.render("login");
    }
  });
  
  router.get("/viewtranscript/:id", function(req, res) {
var data;
    if (req.session.loggedin) {
        var userId = req.params.id;
        console.log(userId);
        db.query('select fileName from transcript WHERE studID = ? ', [userId],function(error,result){
            if(error){
                throw error;
            }
            console.log(result)
           data= result[0].fileName;
          
            console.log("dataialah :"+data);
            // console.log("nama"+pathname);
            const filePath = __dirname +"../../../" +"/upload/" + data +".pdf";
       
            console.log(filePath);
            res.download(
                filePath, 
                data+'.pdf', // Remember to include file extension
                (err) => {
                    if (err) {
                        res.send({
                            error : err,
                            msg   : "Problem downloading the file"
                        })
                    }
            });
           
        });
    }else{
       res.render('login');
    }
         });
         

        

    router.get("/facultyedit/:id",function(req,res){
        console.log("hello");
        if (req.session.loggedin) {
            

          const studID=req.params.id;
          console.log(studID)
          db.query("select * from faculty WHERE id = ?",[studID] ,function(error,data){
            if(error){
                throw error;
            }
                 
          
            db.query('SELECT * FROM faculty', function(error, facultyResult) {
                if (error) {
                  throw error;
                }
                faculty = facultyResult;
          
                db.query('SELECT * FROM transcript', function(error, transcriptResult) {
                  if (error) {
                    throw error;
                  }
                  transcript = transcriptResult;
          
                  console.log(data);
          
                  res.render("facultyView",{json:JSON.parse(JSON.stringify(faculty)),jsonn:JSON.parse(JSON.stringify(transcript)),data:JSON.parse(JSON.stringify(data))});
           
                });
              });
            });

            }else{
                res.render("login");
            }
        });


 /* CRUD FOR  FACULTIES */
    /* Add */

    router.post("/addFaculty", function (request, response) {
      if (request.session.loggedin) {
          // Check if studID already exists
          db.query("SELECT * FROM faculty WHERE studID = ?", [request.body.studID], function (err, result) {
              if (err) {
                  throw err;
              }
              if (result.length > 0) {
                  console.log("Error: Existing studID");
                  // Render an error message or send a response indicating the duplicate studID
                  response.send("Error: Existing studID");
              } else {
                  // Insert the new record
                  db.query("INSERT INTO faculty (studID, name, course, icStud, address) VALUES (?, ?, ?, ?, ?)", [request.body.studID, request.body.name, request.body.course, request.body.icStud, request.body.address], function (err, result) {
                      if (err) {
                          throw err;
                      }
                      console.log("Record inserted");
                      response.redirect('facultyView');
                  });
              }
          });
      } else {
          response.render("login");
      }
  });
   

 /* Delete */
   router.get("/delfaculty/:id",function(req,res){
    if (req.session.loggedin)
    {
       var del =req.params.id;

       db.query(
        "DELETE FROM faculty WHERE id =   ?",[del],function(err,result){
          if (err) {
                res.send("Unable to do");
                throw err;
            } else { // redirect to users list page
                res.redirect("/facultyView");
            } 
    
        }); 

    }else
    {
    res.render("login");}
   });
    
   router.get("/deltranscript/:id",function(req,res){
    if (req.session.loggedin)
    {
       var del =req.params.id;

       db.query(
        "DELETE from transcript WHERE studID =  ?",[del],function(err,result){
          if (err) {
                res.send("Unable to do");
                throw err;
            } else { // redirect to users list page
                res.redirect("/facultyView");
            } 
    
        }); 

    }else
    {
    res.render("login");}
   });
    

     /* Edit & Delete */


     router.get('/faculty_edit/:studID',function(req, res)  {
      if (req.session.loggedin)
      {
     
          var studID = req.params.studID;
           db.query('SELECT * FROM faculty WHERE studID = ? ', [studID], function(err, results) {
           console.log(results[0]);
          if (err)throw err;
          res.render('faculty_edit', {
              title : "Update Record",
              stud : results[0]
          });
           
      });}else{
          res.render("login");
      }
      
  });

  router.post("/editFaculty/:id", function (request, response) {
    if (request.session.loggedin) {
        var userId = request.params.id;
        console.log("userID=" + userId);
        
        // Check if studID already exists
        db.query("SELECT * FROM faculty WHERE studID = ? AND id != ?", [request.body.studID, userId], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length > 0) {
                console.log("Error: Existing studID");
                // Render an error message or send a response indicating the duplicate studID
                response.send("Error: Existing studID");
            } else {
                // Update the record
                db.query("UPDATE faculty SET studID = ?, name = ?, course = ?, icStud = ?, address = ? WHERE id = ?", [request.body.studID, request.body.name, request.body.course, request.body.icStud, request.body.address, userId], function (err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log("Record updated");
                    response.redirect('facultyView');
                });
            }
        });
    } else {
        response.render("login");
    }
});



router.post('/updateFac', function (req, res) {
  if (req.session.loggedin) {
    var userId = req.body.id;
    var newStudID = req.body.studID;

    // Check if newStudID already exists for other records
    var checkQuery = 'SELECT * FROM faculty WHERE studID = ? AND id != ?';
    var checkValues = [newStudID, userId];
    db.query(checkQuery, checkValues, function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        console.log('Error: Existing studID');
        // Render an error message or send a response indicating the duplicate studID
        res.send('Error: Existing studID');
      } else {
        // Update the record
        var updateQuery =
          'UPDATE faculty SET studID = ?, name = ?, course = ?, icStud = ?, address = ? WHERE id = ?';
        var updateValues = [
          req.body.studID,
          req.body.name,
          req.body.course,
          req.body.icStud,
          req.body.address,
          userId,
        ];
        db.query(updateQuery, updateValues, function (err, results) {
          if (err) {
            throw err;
          }
          console.log('Record updated');
          res.redirect('facultyView');
        });
      }
    });
  } else {
    res.render('login');
  }
});


router.get("/faculty",function(req,res){
    if (req.session.loggedin) {

        res.render("facultyView");
    }else{
        res.render("login");
        console.log(err);
    }
    });

    
module.exports = router;   
    