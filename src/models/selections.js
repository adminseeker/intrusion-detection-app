const mongoose = require("mongoose");

const selectionSchema = new mongoose.Schema({

    buzzer : {
        type:Boolean,
        required:true
    },
    camera : {
        type:Boolean,
        required:true
    },
    notifications : {
        type:Boolean,
        required:true
    },
    id :{
        type:String,
        required:true
    }
});

const Selection = mongoose.model("Selection",selectionSchema);

const AddSelection = async ()=>{
    await Selection.countDocuments(async (err,d)=>{
          if(d<1){
              const selection = new Selection({
                  id:"options",
                  buzzer:true,
                  camera:true,
                  notifications:true
              })
          await selection.save();
          }
      })
  }

AddSelection().catch((err)=>{
    console.log(err);
})

module.exports = Selection;