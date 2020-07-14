const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')


//====================== REGISTER =======================//

router.post("/register", (req, res) => {
  
    const {name,email,password} = req.body 
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"}) 
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
           return res.status(422).
           json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
              const user = new User({
                  email,
                  password:hashedpassword,
                  name
              })
      
              user.save()
              .then(user=>{

                  var mailOptions = {
                         from: 'spandanj685@gmail.com',
                         to: user.email,
                         subject: 'welcome '+user.name,
                         text: 'welcome '+user.name
                       };

                     transporter.sendMail(mailOptions, function(error, info){
                       if (error) {
                         console.log(error);
                       } else {
                         console.log('Email sent: ' + info.response);
                       }
                     });

                  res.json({message:"saved successfully"+user.email})
              })
              .catch(err=>{
                  console.log(err)
              })
        })
    })
    .catch(err=>{
      console.log(err)
    })

});

//====================== LOGIN ==================//

router.post("/login", (req, res) => {
    

    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email} = savedUser
               res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

  });


module.exports = router
