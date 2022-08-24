// Application dependencies

const express = require("express");
const bodyParser = require("body-parser"); 
const morgan = require("morgan");
const helmet = require("helmet");


const { mongoose } = require('./db.js');

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

var app = express();

// Application middleware
app.use(morgan("common"));
app.use(helmet());
app.use(bodyParser.json()); // Enbale application to request and pass responds to the 

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, (err) => {
    if (!err)
        console.log("Backend server is running on PORT : " + process.env.PORT);
    else
        console.log("Can not start backend server :" + JSON.stringify(err, undefined, 2));
});

app.get("/", (req, res, next) => {
    res.send("welcome to homepage");

});
