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
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
  .then(() => console.log("Mondodb Connected ...."))
  .catch(err => console.error(err));
//---------model--------//
  require('./models/usermodel')

//==========ROUTING========//

app.use('/auth',require('./routes/authroute'))
app.use('/api/blog', require('./routes/blog'));

//===========PORT SETTING============//

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(port, () => console.log(`Server running on port port ${port}`));