const express = require("express");
const {buzzer,pir,piCamera,takePhoto} = require("./iot_tools/config");
const uniqueString = require("unique-string");

const app = express();
const port = process.env.PORT || 3000

app.get("/test",(req,res)=>{
    res.send({"data":"hello from rpi"});
})

app.listen(port,()=>{
    console.log("raspberry pi server started");
})
