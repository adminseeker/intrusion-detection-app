const Gpio = require("onoff").Gpio;
const PiCamera = require("pi-camera");

const buzzer = new Gpio("21","out");
const pir = new Gpio(20,"in","both");

const piCamera = new PiCamera({
    mode:"photo",
    output:"",
    width:640,
    height:480,
    nopreview:true,
    timeout:500
}); 

const takePhoto = (piCamera)=>{
    return piCamera.snap().catch((error)=>{
        console.log(error);
    })
}

module.exports = {
    pir,
    buzzer,
    piCamera,
    takePhoto
};