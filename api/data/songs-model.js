const mongoose = require("mongoose")

const producerSchema = new mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "year":Number,
    "country":String,
    "founder":String

})

const songSchema = new mongoose.Schema({
    "title":{
        type:String,
        required:true
    },

    "artists":{
        type:[String],
        required:true
    }, 
    
    "year":{
        type:Number,
        required:true
    },

    "producer": producerSchema
})

mongoose.model("Song", songSchema,"songs")