const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model/user');
const activityModel=require('./model/activity')
const {checkExistingUser, generatePasswordHash} = require("./utility");
const jwt = require('jsonwebtoken');
const multer = require("multer")();
const bcrypt = require("bcryptjs");
const salt=10;
// const cors = require('cors')
const app = express();
require('dotenv').config();
app.use(multer.array());

app.use(express.json());
// app.use(cors());
app.use(express.urlencoded({extended: false}));

app.listen(3002,(err)=>{
    if(!err) {
        console.log("Server started at  port 3002")
    } else {
        console.log(err);
    }
});

mongoose.connect("mongodb+srv://adapasai:adapasai@cluster0.0menc.mongodb.net/Todo?retryWrites=true&w=majority",(data)=>{
    console.log("successfully connected to db");

},(err)=>{
    console.log(err)
});
app.post("/register", async (req, res)=> {
    if(await checkExistingUser(req.body.username)) {
        res.status(400).send("email exist. Please try with different email");
    } else {
        generatePasswordHash(req.body.password).then((passwordHash)=> {
            userModel.create({username: req.body.username,password: passwordHash})
                            .then(()=> { 
                                res.status(200).send(`${req.body.username} added successfully`); 
                            }).catch((err)=> {
                                res.status(400).send(err.message)
            })
        });
    }
    
});

app.post("/login", (req, res)=> {
    userModel.find({username: req.body.username}).then((userData)=> {
        
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val) {
                    const authToken = jwt.sign(userData[0].username, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                } else {
                    console.log("Invalid Password")
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            res.status(400).send("Unauthorized user");
        }
    })
});
app.get("/show",(req,res)=>{
    activityModel.find({username:req.headers.username}).then((data)=>{
        res.status(200).send(data)
    })
})

app.post("/create",(req,res)=>{
    activityModel.create({username:req.body.username,activity:req.body.activity,status:req.body.status,Time:req.body.Time,Action:req.body.Action}).then(()=>{
        res.status(200).send("success")
    })
})

app.patch("/update",(req,res)=>{
    
})