const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const path = require('path');

const user = "HeadDev";
const password = "Aa1234567";
const database = "chatapp";


//Funny thing happened here took me hours to realize i was connecting to the wrong database
const uri = "mongodb+srv://" + user + ":" + password + "@resourcecluster.7j9mt.mongodb.net/" + database + "?retryWrites=true&w=majority";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error)
    console.log("Connection Failed");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

//CHECK CONN Disabled because too heavy on requests

//app.use('/api/check/', (req, res, next) => {
//    const content = [
//        {
//            message: "Successfully Connected"
//        }
//    ]
//    res.status(200).json({
//        content: content,
//        message: "Connected Succesfully",
//        status: 200,
//    })

//    console.log("Request Received");
//    next();
//});

app.get('/api/check/', (req, res, next) => {
  const content = [
    {
      message: "Successfully Connected"
    }
  ]
  res.status(200).json({
    content: content,
    message: "Connected Succesfully",
    status: 200,
  })
  next();
});

const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats');

app.use("/api/users", usersRouter);
app.use("/api/chats", chatsRouter);

app.all((req, res, next) => {
  /*res.send("Nothing Here, Ignore Me");*/
  console.log("Log From: server/app.js");
});

module.exports = app;
