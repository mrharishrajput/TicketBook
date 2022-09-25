const express= require("express")
const router=express.Router();
const User=require("../models/user")
const jwt=require("jsonwebtoken")
const mongoose = require('mongoose')
const db="mongodb+srv://harish:hk123456@cluster0.uc9wizs.mongodb.net/harish";
mongoose.connect(db,err=>{
    if(err){
        console.log("not connected",err)
    }
    else{
        console.log("sucess connection ")
    }
})
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token =req.headers.authorization.split(' ')[1];
    if(token=='null'){
        return res.status(401).send("Unauthorized request")
    }
    let payload=jwt.verify(token,'secretKey');
    if(!payload){
        return res.status(401).send("Unauthorized request");
    }
    req.userId=payload.subject
    next()

}
router.get('/',(req,res)=>{
    res.send("From API route")
})
router.post('/register',(req,res)=>{
    let userData=req.body
    let user = new User(userData);
    user.save((err,registeredUser)=>{
        if(err){
            console.log(err);
        }
        else{
            let payload={subject:registeredUser._id}
            let token =jwt.sign(payload,"secretKey")
            res.status(200).send({token})
        }
    })
})
router.post("/login",(req,res)=>{
    let userData=req.body
    User.findOne({email:userData.email},(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            if(!user){
                res.status(401).send("Invalid Email");
            }
            else{
                if(user.password!==userData.password){
                    res.status(401).send("invalid password")
                }
                else{
                    let payload={subject:user._id}
                    let token=jwt.sign(payload,"secretKey")
                    res.status(200).send({token});
                }
            }
        }
    })
})
router.get("/data",(req,res)=>{
    // let data=(new MongoClient(db)).db
    res.send()
})
router.get("/events",(req,res)=>{
    let events=[
        {
            "_id":"1",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        }

    ]
    res.send(events);
})
router.get("/special",verifyToken,(req,res)=>{
    let special=[
        {
            "_id":"1",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        },
        {
            "_id":"2",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        },
        {
            "_id":"3",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        },
        {
            "_id":"4",
            "name":"Harish Kumar",
            "description":"lorem ipsum",
            "date":"2022-04-23T18:25:43.511Z"
        }

    ]
    res.send(special)
})

module.exports=router;
