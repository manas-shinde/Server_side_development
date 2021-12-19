const express = require("express");
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var morgan = require('morgan'); // allows us to log info on server side
var cookieParser = require("cookie-parser");

const auth1 = require("./servers/auth1"),
      auth2 = require("./servers/auth2"),
      auth3 = require("./servers/auth3");
    
var app = express();
const PORT = 4000;
const HOSTNAME = "localhost";

// say that morgan will be one of the middleware used by express
app.use(morgan('dev')); // dev is a preprogrammed log output that morgan supports

app.use(cookieParser('12345-67890-09876-54321')); // secret key

app.use(session({//for auth3
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));
  
/* 
auth1  - for basic authentication
auth2  - for cookie setting on client side
auth3 - for session setting on client side
*/
app.use(auth1);

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.send("Welcome To Home Page !!");
});

// a middleware which specifically handles an error
app.use(function(err,req,res,next) {
    res.writeHead(err.status || 500, {
      'WWW-Authenticate': 'Basic',
      'Content-Type': 'text/plain'
    });
    res.end(err.message);
  });

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON http://${HOSTNAME}:${PORT}`);
});