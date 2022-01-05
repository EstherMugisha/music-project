const express=require("express");
const path=require("path"); 
require("./api/data/db.js")
const routes=require("./api/routes");
var bodyParser = require('body-parser')


const app=express(); 

app.set("port",3000); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req,res,next){
    console.log("url passed: "+ req.method , req.url);
    next();
})

app.use("/api",routes)

const server=app.listen(app.get("port"),function(){
    const port=server.address().port;
    console.log("listening to port ", port);
})