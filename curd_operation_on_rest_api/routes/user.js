/* 
   Author: Manas, Date: Dec 12, 2021
  This Node module is implemented and used within my server to support
  the /user end point. The REST API supports GET, POST and DELETE
  operations on /user and GET, PUT and DELETE operations on
  /user/:id end points.
*/

const express = require("express");
const bodyParser = require("body-parser");
// enables us to parse the data and add it to a javascript object

const userRouter = express.Router();
const uuid_v4 = require("uuid-v4");
//enable us to store unquie id for every user

const { getAllUsers,createUser,updateUserWithoutId,deleteAllUsers ,getUserById,updateUserById,updateUserbyId,deleteUserById} = require("../controllers/user.js");


const users = require("../controllers/user.js");

userRouter.use(bodyParser.json());
//if json, bodyParser will parse and make available to dishRouter

userRouter.route("/")
    .all((req, res, next) => {// all is chained to .route
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');//We are Sending JSON data as a response 
        next();
    })// so no semicolon
    .get(getAllUsers)
    .post(createUser)
    .put(updateUserWithoutId)
    .delete(deleteAllUsers); // semicolon completes the chain

userRouter.route("/:id")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json");
        next();
    })
    .get(getUserById)
    .put(updateUserById)
    .patch(updateUserbyId)
    .delete(deleteUserById); // semicolon completes the chain

module.exports = userRouter;// so server can use
     
