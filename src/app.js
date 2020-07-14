const express = require("express");
const cors = require("cors");

const routes = require("./routers/routes");
require("./db/mongoose");
require("./iot_tools/control");

const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/intrusions/images",express.static(__dirname+"/../images"));


app.listen(port,"0.0.0.0",()=>{
    console.log("raspberry pi server started");
})
