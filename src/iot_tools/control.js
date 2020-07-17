const {buzzer,pir,piCamera,takePhoto} = require("./config");
const Intrusion = require("../models/intrusions");
const Selection = require("../models/selections");
const mailer = require("../mailer/mailer");
const moment = require("moment");

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
            if(selections.notifications){
                let text=""
                if(selections.camera){
                   text = "Intrusion detected on " + moment(intrusion.atTime).format('MMMM Do YYYY h:mm:ss a') +"." + 
                   "\nView the intrusion here: " + process.env.RPI_URL+"/intrusions/images/"+intrusion._id+".jpg" + ".";
                }else{
                   text = "Intrusion detected on " + moment(intrusion.atTime).format('MMMM Do YYYY h:mm:ss a')+"." +
                   "\nSince You have turned off your camera, you can't view this intrusion.So please turn on your camera to view intrusions."
                }
                await mailer(process.env.LOGIN_EMAIL,text).catch((err)=>{
                    console.log(err);
                })
            }
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
 