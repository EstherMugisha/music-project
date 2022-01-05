const mongoose = require("mongoose"); 
require("./songs-model");
const url= "music";
const dbURL="mongodb://localhost:27017/"+url;
mongoose.connect(dbURL); 

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to "+dbURL);
});
mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected to ");
});
mongoose.connection.on("error", function(){
    console.log("Mongoose connection error "+ err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by App termination");
        process.exit(0);
    })
})
process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by App termination");
        process.exit(0);
    })
})
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by App termination");
        process.kill(process.pid,"SIGUSR2");
    })
})