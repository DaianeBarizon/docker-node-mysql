/*const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'dbfaeterj',
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

    res.send(results.map(item => ({ name: item.name, date: item.date })));
  });
});


app.listen(3000, '0.0.0.0', function() {
  console.log('Listening on port 3000');
})*/

const express = require('express');
const mysql = require('mysql');

const PORT = 9002;
const HOST = '0.0.0.0';

const app = express();

const con = mysql.createConnection({
    host: '172.17.0.6',
    //host: 'localhost',
    user: 'root',
    password: 'dbfaeterj',
    database: 'dbfaeterjso2'
});

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})


app.get('/users', function(req, res){
    res.json({ name: 'Flavio' })
    /*con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
    });*/
});

app.post('/user', function(req, res){
    const user = { name: 'Henrique', data: '2010-03-15 10:30:00' };
    con.query(
        'INSERT INTO users SET ?', user, (err, row) => {
        if (err) throw err
    
        console.log(`New user added with ID: ${row.insertId}`)
    });
});

con.end((err) => {
    if(err) {
        console.log('Erro to finish connection...', err)
        return 
    }
    console.log('The connection was finish...')
})

app.listen(PORT, HOST, function() {
    console.log('Listening on port 9002');
});