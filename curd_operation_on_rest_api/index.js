const express = require('express');
const userRouter = require('./routes/user.js');

const app = express();
const PORT = 4000;
const HOSTNAME = 'localhost';


app.use("/user",userRouter);

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', "text/plain");
    res.send("Welcome to Home page");
});
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON http://${HOSTNAME}:${PORT}`);
});