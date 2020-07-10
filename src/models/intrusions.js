const mongoose = require("mongoose");

const intrusionSchema = new mongoose.Schema({

    atTime : {
        type:Date,
        required:true
    }
});

const Intrusion = mongoose.model("Intrusion",intrusionSchema);

module.exports = Intrusion;