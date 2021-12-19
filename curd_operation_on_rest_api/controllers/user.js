// const bodyParser = require("body-parser");
// const express = require("express");
// const userRouter = express.Router();
const uuid_v4 = require("uuid-v4");

var users = [//you can un comment below array of object(users) but taking it as an empty array from start
    /* 
        "first_name": "Luffy",
        "last_name": "Monkey D.",
        "age": 19,
        id:uuid_v4()
    },
    {
        first_name: "Zoro",
        last_name: "Roronoa",
        age: 21,
        id:uuid_v4()
    } */
]

exports.getAllUsers = (req, res) => {
    // GET Method is to get data/information from server
    res.send(users);
}

exports.createUser = (req, res) => {
    // POST method is use to create new entry to specific item

    let user = req.body;//first we add what is in req.body into user
    users.push({
        ...user, _id: uuid_v4()});//here we are allocating unquie ID for every user we create
    res.send(users);
}

exports.updateUserWithoutId = (req, res) => {
    // PUT Method is Update the entry
    //  so we require key for that means id or some thing that we can point out
    res.statusCode = 403;
    res.send("PUT is NOT support right now for this URL");
}

exports.deleteAllUsers = (req, res) => {
    // DELETE Method as name suggest used to delete entry
    /*  Method 1 */
    // users = [];
    // OR
    var users1 = users; //now users refernce is contain in  users1
    users = [];
    res.send("All Users deleted successfully!");
    console.log(users);
    // console.log(users1);

    /* Method 2 */
    // users.length = 0;


    /* Method 3 */
    // users.splice(0, users.length);


    /* Method 4 */
    // while (users.length > 0) {
    // users.pop();
    // }
}

exports.getUserById = (req, res) => {
    
    let { id } = req.params;
    console.log("User ID that we are serching :"+id);
    let foundUser = users.find((user) => user._id == id);//here we are sorting user using id which pass by client in params
    if (foundUser) {
        res.send(foundUser);
        console.log(foundUser);
    } else {
        res.send("User whose ID: "+id+" is NOT in database!");
    }
    
}
exports.updateUserById = (req, res) => {
    let { id } = req.params;
    console.log(req.body);
    let { first_name, last_name, age } = req.body;

    let user = users.find((user) => user._id == id);//To find the User whose ID in retrive from req.paramas
   
    console.log("Before Updation user ");
    console.log(user);

    user.first_name = first_name;
    user.last_name = last_name;
    user.age = age;

    console.log("After Updation user ");
    console.log(user);

    res.send(user);
}

exports.updateUserbyId = (req, res) => {
    let { id } = req.params;
    
    let { first_name, last_name, age } = req.body;

    console.log(`${first_name}  ${last_name} ${age}`);
    
    let user = users.find((user) => user._id == id);

    console.log(user);
    
    if (first_name) user.first_name = first_name;
    
    if (last_name) user.last_name = last_name;
    
    if (age) user.age = age;
    
    res.send(user);
    console.log(`user with ID : ${id} is updated!`);
}

exports.deleteUserById = (req, res) => {
    let { id } = req.params;
   
    users = users.filter((user) =>  user._id != id );
    
    console.log(users);

    res.send(users);

}
