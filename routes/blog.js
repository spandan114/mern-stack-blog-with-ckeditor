const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Blog = mongoose.model("Blog")
const  auth  = require("../middleware/requireLogin");

//=================================
//             Blog
//=================================

router.post("/createPost",auth, (req, res) => {
    let blog = new Blog({ content: req.body.content, writer: req.body.user,title: req.body.title,image: req.body.image });

    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err , message:{error:"Unable to create post" } });
        return res.status(200).json({ success: true, postInfo ,message:{success:"post created successfully" } })
        
    })
});


router.get("/getBlogs", (req, res) => {
    Blog.find().populate("writer")
        .then((blogs) => {
           return res.status(200).json({ success: true, blogs,message:{success:"successfully fetch all data" }});
        }).catch(err=>{
           return res.status(400).json({ success: false,message:{error:"somthing went wrong" }});
        })    

});

router.get('/mypost',auth,(req,res)=>{
    Blog.find({writer:req.user._id})
    .populate("writer")
    .then(mypost=>{
        return res.status(200).json({ success: true, mypost,message:{success:"successfully fetch all data" }});
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/getPost/:id", (req, res) => {
    Blog.findOne({ "_id": req.params.id })
        .populate('writer')
        .then(( post) => {
            res.status(200).json({ success: true, post })
        }).catch(err=>{
          return res.status(400).send(err);
      })
});

router.put('/updatePost/:id',auth,(req,res) =>{

    const {content} = req.body
    if(!content){
        return res.status(422).send("please fill all the fields") 
     }
    const Id  = req.params.id;
    Blog.findOneAndUpdate({_id:Id}, { $set: {title: req.body.title,image: req.body.image ,content: req.body.content}},{new:true})
    .then(data =>{
        res.json({ success: true,data,message:{success:"Blog updated successfully" }});
    }).catch(err=>{
      console.log(err)
      res.json({ success: false,message:{error:"somthing went wrong" }});
    })

})

router.delete('/deletePost/:id',auth,(req,res) =>{
    Blog.findOne({_id:req.params.id})
    .then(data=>{
        data.remove()
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router;