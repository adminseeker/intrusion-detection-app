const Gpio = require("onoff").Gpio;
const PiCamera = require("pi-camera");
const {v4:uuidv4} = require("uuid");

const buzzer = new Gpio("21","out");
const pir = new Gpio(20,"in","both");

const piCamera = new PiCamera({
    mode:"photo",
    output:__dirname+"/../images/"+uuidv4()+".jpg",
    width:640,
    height:480,
    nopreview:true
}); 

const takePhoto = (piCamera)=>{
    piCamera.snap().then((result)=>{
        console.log("captured");
    }).catch((error)=>{
        console.log(error);
    })
}

