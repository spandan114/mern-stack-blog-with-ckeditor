const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog }
