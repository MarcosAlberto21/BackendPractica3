const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'practica3-analisis.cc3shre1pnew.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'practica3',
  database: 'Practica3_DB',
  multipleStatements: true  
});


mysqlConnection.connect(function (err, result) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('database is connected');
  }
});

module.exports = mysqlConnection;