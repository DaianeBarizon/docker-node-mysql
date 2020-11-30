const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const jsonParser = bodyParser.json();

const connection = mysql.createConnection({
  host: 'database',
  port: 3306,
  user: 'root',
  password: 'dbfaeterj',
  database: 'dbfaeterjso2'
});

connection.connect();

app.get('/users', function(req, res) {
  connection.query('SELECT * FROM users', function (error, results) {
    console.log('resultado', results);

    if (error) { 
      console.log(error);
    };

    res.json(results);
  });
});

app.post('/users', jsonParser, function(req, res) {
  connection.query(
    'INSERT INTO users(name, date) VALUES (?,?);',
    [req.body.name, req.body.date],
    function (error, result) {

      if (error) { 
        console.log(error);
        return res.status(500).send({
          error: error,
          response: null
        });
      }

      res.status(201).send({
        mensagem: 'Inserido com sucesso!',
        id: result.insertId
      })
  });
});

app.listen(9002, '0.0.0.0', function() {
  console.log('Listening on port 9002');
})