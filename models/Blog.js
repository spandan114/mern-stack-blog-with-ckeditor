const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
// const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
    },
    image: {
        type:String,
    },
    content: {
        type:String,
    },
    fileName:{
        type:String
    }
    ,
    tags: {
        type:String,
    },
    writer: { 
        type:ObjectId,
        ref: "User" 
    },

}, { timestamps: true })


mongoose.model('Blog', blogSchema);
