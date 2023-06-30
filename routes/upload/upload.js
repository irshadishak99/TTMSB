var express = require('express');
var router = express.Router();
var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var app = express();
module.exports = router;
var db = require('../db');


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './upload/');
    },
    filename: (req, file, callBack) => {
       
        callBack(null, file.originalname+'.pdf');
    }
});


const upload = multer({ storage: storage });

router.post('/addQRTranscript', upload.single('pdfUrl'), (req, res) => {
    if (req.session.loggedin)
    {  
    const pdfQR = req.file.originalname;
    const studID = req.body.studID;
    saveQR(pdfQR,studID, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error saving file path to database' });
        } else {
            res.status(200).send({ message: 'File uploaded and path saved to database', data: result });
        }
    });
}else
res.redirect("/login");
});
function saveQR(pdfQR,studID, callback) {
    // const query = 'INSERT INTO transcript (file_path) VALUES (?)';
    db.query("UPDATE transcript SET pdfQR =?  WHERE studID = ?",[pdfQR,studID] ,(error, result) => {
        callback(error, result);
    });
}

router.post('/addtranscript', upload.single('doc-file'), (req, res) => {
    if (req.session.loggedin)
    {  
        console.log(req.file);
    const filePath = req.file.path;
    const studID = req.body.studID;
    console.log(studID)
    const hashDoc = req.body.hashDoc;
    const fileName = req.file.originalname;
    saveFile(filePath,studID,fileName,hashDoc, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error saving file path to database' });
        } else {
            res.status(200).send({ message: 'File uploaded and path saved to database', data: result });
        }
    });
}else
res.redirect("/login");
});


function saveFile(filePath,studID,fileName,hashDoc, callback) {
    // const query = 'INSERT INTO transcript (file_path) VALUES (?)';
    db.query("INSERT INTO transcript (fileName,filePath,blockchainHash,studID) VALUES (?,?,?,?)",[fileName,filePath,hashDoc,studID] ,(error, result) => {
        callback(error, result);
    });
}

router.get("/upload/:filename", (req, res) => { 
    const filePath = __dirname +"../../../" +"/upload/" + req.params.filename;
    console.log(req.params.filename)
    res.download(
        filePath, 
        req.params.filename, // Remember to include file extension
        (err) => {
            if (err) {
                res.send({
                    error : err,
                    msg   : "Problem downloading the file"
                })
            }
    });
});

router.get("/addtranscript/:id",function(req,res){
    console.log("hello");
    if (req.session.loggedin) {
        var data;
        var userId = req.params.id;
        db.query('select * from faculty WHERE id = ? ', [userId],function(error,result){
            if(error){
                throw error;
            }
                 data=result[0];
                 console.log(data);
                res.render("upload",{data});
        });
        }else{
            res.render("login");
        }
        });

        // router.get("/addstudtranscript/",function(req,res){
        //     console.log("hello");
        //     if (req.session.loggedin) {
        //         var data;
        //         var studID = req.params.id;
        //         db.query("INSERT INTO transcript (course, filename, blockchainHash, studID) VALUES ('"+req.body.id+"','" [studID],function(error,result){
        //             if(error){
        //                 throw error;
        //             }
        //                  data=result[0];
        //                 res.render("upload",{data});
        //         });
        //         }else{
        //             res.render("login");
        //         }
        //         });
        


         /* GET Logout Method  . */
        router.get("/logout",function(req,res){
            req.session.destroy(function(err)
            { if(err)
                { 
                console.log(err); 
                } 
                else 
                { 
                res.redirect('/'); 
                } 
                }); 
               });

    router.get("/upload",function(req,res){
    if (req.session.loggedin) {

        res.render("upload");
    }else{
        res.render("login");
        console.log(err);
    }
    });

    
module.exports = router;   
    
