const express = require('express');
const router = express.Router();
const { Blog } = require("../models/Blog");
const  auth  = require("../middleware/requireLogin");


const multer = require("multer");

// STORAGE MULTER CONFIG
// multer configuration to storing files to disk
const storage = multer.diskStorage({
    // directory where file being stored
    destination: function(req, file, cb) {
      cb(null, `${__dirname}/../../client/public/uploads/`);
    },
    // generate new name for file being uploaded
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });
  
  // filter file being uploaded
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      // rejects storing a file
      cb(null, false);
    }
  };
  
  // configure multer middleware
  const upload = multer({
    storage: storage,
    limits: {
      // limit file being uploaded
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

//=================================
//             Blog
//=================================


router.post("/uploadfiles", upload.single("imageData"), (req, res) => {
  if(req.file){
      imageName= req.file.filename,
      imageData= req.file.path
      res.status(200).json({success: true,document: imageName ,message:{success:"image uploded successfully" } });
  }else{
      res.json({success: false ,message:{error:"Unable to upload image try again" } });
  }
  });

router.post("/createPost",auth, (req, res) => {
    let blog = new Blog({ content: req.body.content, writer: req.body.userID,title: req.body.title,image: req.body.image });

    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })
});


router.get("/getBlogs", (req, res) => {
    Blog.find()
        .populate("writer")
        .exec((err, blogs) => {
            if (err) return res.status(400).json({ success: false,message:{error:"somthing went wrong" }});
            res.status(200).json({ success: true, blogs,message:{success:"successfully fetch all data" }});
        });
});

router.post("/getPost/:id", (req, res) => {
    Blog.findOne({ "_id": req.params.id })
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
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
        res.json(data)
    }).catch(err=>{console.log(err)})

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