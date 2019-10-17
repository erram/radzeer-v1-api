//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const sql = require('mysql');
const app = express();
const basicAuth = require('express-basic-auth');


// Body Parser Middleware
app.use(bodyParser.json()); 

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
const pool = sql.createPool({
    user:  "radzeer",
    password: "radzeer23",
    host: "35.195.203.72",
    database:"radzeer",
    connectionLimit : 100,
    debug: false
});

const createHandler = tableName => (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        res.json({ code: 500, status: 'connection error' });
        return;
      }

      connection.query(`select count(*) as total from ${tableName}`, (err, result) => {
        if (err) {
          res.json({ code: 500, status: 'error in count total query' });
          return;
        }

        const total = Number(result[0].total);
        const { limit = 25, skip = 0 } = req.query;

        connection.query(`select * from ${tableName} order by id asc limit ${skip}, ${limit}`, (err, items) => {
          if (err) {
            res.json({ code: 500, status: 'error in fetch data query' });
            return;
          }

          res.json({ items, total });
        });
      });

      connection.on('error', err => {
        res.json({ code: 500, status: 'unexpected error' });
        return;
      });
    });
};

app.get('/api/user', createHandler('user'))

app.get('/api/company', createHandler('company'))

app.get('/api/product', createHandler('auction'))

app.get('/api/line', createHandler('line'))

app.get('/api/demand', createHandler('demand'))

app.get('/api/message', createHandler('message'))
