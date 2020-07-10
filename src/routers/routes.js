const express = require("express");
const Intrusion = require("../models/intrusions");

const router = new express.Router();

router.get("/intrusions",async(req,res)=>{
    try{
        const intrusions = await Intrusion.find({});
        if(!intrusions){
            return res.status(404).send();
        }
        res.send(intrusions);
        console.log(intrusions);
    }catch(e){
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
        console.log(intrusion);
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;