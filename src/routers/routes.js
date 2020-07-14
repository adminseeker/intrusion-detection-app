const express = require("express");
const fs = require("fs");
const auth = require("../middleware/auth");
const Intrusion = require("../models/intrusions");
const Selection = require("../models/selections");

const router = new express.Router();

router.post("/verify",auth,(req,res)=>{
    try{
        if(req.body.password !== process.env.PASSWORD){
            throw new Error();
        }
        res.send("authorized");
    }catch(e){
        res.status(401).send()
    }

})

router.post("/intrusions",auth,async(req,res)=>{
    try{
        const intrusions = await Intrusion.find({});
        if(!intrusions){
            return res.status(404).send();
        }
        res.send(intrusions);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})
 
router.delete("/intrusions/delete/all",auth,async(req,res)=>{
    try{
        const intrusions = await Intrusion.deleteMany({});
        if(!intrusions){
          return  res.status(404).send();
        }
        await fs.readdir(directory=__dirname+"/../../images/", (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(directory+file, err => {
                if (err) throw err;
              });
            }
          });
          res.send(intrusions);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})

router.delete("/intrusions/delete/:id",auth,async(req,res)=>{
    try{
        const intrusion = await Intrusion.findOneAndDelete({_id:req.params.id});
        if(!intrusion){
          return  res.status(404).send();
        }
        await fs.unlink(__dirname + "/../../images/"+req.params.id+".jpg",(error)=>{
            if(error) throw error;
        });
        res.send(intrusion);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})


module.exports = router;