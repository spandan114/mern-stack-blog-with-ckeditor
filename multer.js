
const multer = require("multer");

// STORAGE MULTER CONFIG
// multer configuration to storing files to disk
const storage = multer.diskStorage({
    // directory where file being stored
    destination: function(req, file, cb) {
      cb(null, `${__dirname}/./../client/public/uploads/`);
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


  // router.post("/uploadfiles", upload.single("imageData"), (req, res) => {
//   if(req.file){
//       imageName= req.file.filename,
//       imageData= req.file.path
//       res.status(200).json({success: true,document: imageName ,message:{success:"image uploded successfully" } });
//   }else{
//       res.json({success: false ,message:{error:"Unable to upload image try again" } });
//   }
//   });