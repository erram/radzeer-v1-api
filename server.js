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

function getUsers(req,res) {

    pool.getConnection((err,connection) => {
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   

        console.log('connected as id ' + connection.threadId);

        var limit = " limit 25";
        var total = 0;
        
        if (req.query.limit) {
            limit = " limit " + req.query.limit;
        }

        if (req.query.skip) {
            limit = " limit " + req.query.limit + ", " + req.query.skip;
        }

        connection.query("SELECT count(*) as total FROM user", (err, result) => {
            if(!err) {
                console.log("Total Records: - " + result[0].total);

                total = result[0].total;
            }   
        });

        connection.query("select * from user order by id asc" + limit, (err,rows) => {
            connection.release();
            if(!err) {
                res.json({ items: rows, total: total });
            }           
        });

        connection.on('error', (err) => {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

function getCompany(req,res) {

    pool.getConnection((err,connection) => {
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   

        console.log('connected as id ' + connection.threadId);

        var limit = " limit 25";
        var total = 0;
        
        if (req.query.limit) {
            limit = " limit " + req.query.limit;
        }

        if (req.query.skip) {
            limit = " limit " + req.query.limit + ", " + req.query.skip;
        }

        connection.query("SELECT count(*) as total FROM company", (err, result) => {
            if(!err) {
                console.log("Total Records: - " + result[0].total);

                total = result[0].total;
            }   
        });

        connection.query("select * from company order by id asc" + limit, (err,rows) => {
            connection.release();
            if(!err) {
                res.json({ items: rows, total: total });
            }           
        });

        connection.on('error', (err) => {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

function getProduct(req,res) {

    pool.getConnection((err,connection) => {
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   

        console.log('connected as id ' + connection.threadId);

        var limit = " limit 25";
        var total = 0;
        
        if (req.query.limit) {
            limit = " limit " + req.query.limit;
        }

        if (req.query.skip) {
            limit = " limit " + req.query.limit + ", " + req.query.skip;
        }

        connection.query("SELECT count(*) as total FROM auction", (err, result) => {
            if(!err) {
                console.log("Total Records: - " + result[0].total);

                total = result[0].total;
            }   
        });

        connection.query("select * from auction order by id asc" + limit, (err,rows) => {
            connection.release();
            if(!err) {
                res.json({ items: rows, total: total });
            }           
        });

        connection.on('error', (err) => {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

function getLine(req,res) {

    pool.getConnection((err,connection) => {
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   

        console.log('connected as id ' + connection.threadId);

        var limit = " limit 25";
        var total = 0;
        
        if (req.query.limit) {
            limit = " limit " + req.query.limit;
        }

        if (req.query.skip) {
            limit = " limit " + req.query.limit + ", " + req.query.skip;
        }

        connection.query("SELECT count(*) as total FROM line", (err, result) => {
            if(!err) {
                console.log("Total Records: - " + result[0].total);

                total = result[0].total;
            }   
        });

        connection.query("select * from line order by id asc" + limit, (err,rows) => {
            connection.release();
            if(!err) {
                res.json({ items: rows, total: total });
            }           
        });

        connection.on('error', (err) => {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

function getDemand(req,res) {

    pool.getConnection((err,connection) => {
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   

        console.log('connected as id ' + connection.threadId);

        var limit = " limit 25";
        var total = 0;
        
        if (req.query.limit) {
            limit = " limit " + req.query.limit;
        }

        if (req.query.skip) {
            limit = " limit " + req.query.limit + ", " + req.query.skip;
        }

        connection.query("SELECT count(*) as total FROM demand", (err, result) => {
            if(!err) {
                console.log("Total Records: - " + result[0].total);

                total = result[0].total;
            }   
        });

        connection.query("select * from demand order by id asc" + limit, (err,rows) => {
            connection.release();
            if(!err) {
                res.json({ items: rows, total: total });
            }           
        });

        connection.on('error', (err) => {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get("/api/user", (req , res) => {
    getUsers(req,res);
});

app.get("/api/company", (req , res) => {
    getCompany(req,res);
});

app.get("/api/product", (req , res) => {
    getProduct(req,res);
});

app.get("/api/line", (req , res) => {
    getLine(req,res);
});

app.get("/api/demand", (req , res) => {
    getDemand(req,res);
});