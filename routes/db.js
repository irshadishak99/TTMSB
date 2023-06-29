var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'b3ipncj85vzkcjcdvltt-mysql.services.clever-cloud.com',
  user     : 'uk84alzz2ysiax1b',
  password : 'HUYFiwm7fEZ1rNBgy3LQ',
  database : 'b3ipncj85vzkcjcdvltt',
  multipleStatements: true

});

connection.connect((err)=>{
  if(!err)
  {
    console.log("connected");
  }else{
    console.log("Connection Failed");
  }

});


module.exports = connection;