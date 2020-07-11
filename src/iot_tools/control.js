const {buzzer,pir,piCamera,takePhoto} = require("./config");
const Intrusion = require("../models/intrusions");

pir.watch(async (error,value)=>{
    if(value){ 
        buzzer.writeSync(1);
        const intrusion = new Intrusion({
            atTime: new Date()
        });
        try{
            piCamera.config.output = __dirname +"/../../images/" + intrusion._id + ".jpg";
            await takePhoto(piCamera);
            await intrusion.save();
            setTimeout(()=>{
                buzzer.writeSync(0);
            },2000)
        }catch(e){
            console.log(e);
        }    
    }
    else{
        buzzer.writeSync(0);
    }
})
