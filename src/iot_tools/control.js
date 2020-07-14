const {buzzer,pir,piCamera,takePhoto} = require("./config");
const Intrusion = require("../models/intrusions");
const Selection = require("../models/selections");


pir.watch(async (error,value)=>{
    if(value){
        const selections = await Selection.findOne({id:"options"}); 
        if(selections.buzzer){
            buzzer.writeSync(1);
        }
        const intrusion = new Intrusion({
            atTime: new Date()
        });
        try{
            piCamera.config.output = __dirname +"/../../images/" + intrusion._id + ".jpg";
            if(selections.camera){
                await takePhoto(piCamera).catch((err)=>{
                    console.log(err);
                })
            }
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
