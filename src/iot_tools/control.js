const {buzzer,pir,piCamera,takePhoto} = require("./config");
const Intrusion = require("../models/intrusions");

pir.watch(async (error,value)=>{
    if(value){ 
        buzzer.writeSync(1);
        setTimeout(()=>{
            buzzer.writeSync(0);
        },2000)
        const intrusion = new Intrusion({
            atTime: new Date()
        });
        try{
            await intrusion.save().then(async (intrusion)=>{
                piCamera.config.output = __dirname +"/../../images/" + intrusion._id + ".jpg";
                await takePhoto(piCamera);
            })
        }catch(e){
            console.log(e);
        }    
    }
    else{
        buzzer.writeSync(0);
    }
})
