const bodyParser = require("body-parser");
const express = require("express");
const userRouter = express.Router();
const uuid_v4 = require("uuid-v4");

const { getAllUsers,createUser,updateUserWithoutId,deleteAllUsers ,getUserById,updateUserById,updateUserbyId,deleteUserById} = require("../controllers/user.js");


// const users = require("../controllers/user.js");

userRouter.use(bodyParser.json());


userRouter.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');//We are Sending JSON data as a response 
        next();
    })
    .get(getAllUsers)
    .post(createUser)
    .put(updateUserWithoutId)
    .delete(deleteAllUsers)

userRouter.route("/:id")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json");
        next();
    })
    .get(getUserById)
    .put(updateUserById)
    .patch(updateUserbyId)
    .delete(deleteUserById)

module.exports = userRouter;
     