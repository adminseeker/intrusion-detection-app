const express = require("express");
const fs = require("fs");
const Intrusion = require("../models/intrusions");

const router = new express.Router();

router.get("/intrusions",async(req,res)=>{
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

router.get("/intrusions/:id",async(req,res)=>{
    try{
        const intrusion = await Intrusion.findById(req.params.id);
        if(!intrusion){
            return res.status(404).send();
        }
        res.send(intrusion);
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})
 
router.delete("/intrusions/delete/all",async(req,res)=>{
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

router.delete("/intrusions/delete/:id",async(req,res)=>{
    try{
        const intrusion = await Intrusion.findOneAndDelete({_id:req.params.id});
        if(!intrusion){
          return  res.status(404).send();
        }
        await fs.unlink(__dirname + "/../../images/"+req.params.id+".jpg",(error)=>{
            if(error) throw error;
            res.send(intrusion);
        });
    }catch(e){
        console.log(e);
        res.status(500).send();
    }
})


module.exports = router;