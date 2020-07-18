const express = require("express");
const mongoose = require("mongoose");
const {MONGO_URI} = require('./config/key')


const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
//============= MONGOOSE SETTING ==============//
mongoose
  .connect(MONGO_URI,
    {
      useNewUrlParser:true,
      useUnifiedTopology: true
    })
  .then(() => console.log("Mondodb Connected ...."))
  .catch(err => console.error(err));
//---------model--------//
  require('./models/usermodel')
  require("./models/Blog");

//==========ROUTING========//

app.use('/auth',require('./routes/authroute'))
app.use('/api/blog', require('./routes/blog'));

//===========PORT SETTING============//

const PORT = process.env.PORT || 5000
if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT,()=>{
  console.log("server is running on",PORT)
})