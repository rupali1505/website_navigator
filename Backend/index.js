const express = require("express");
const mongoose = require("mongoose")
const server = express();
const PORT = 5000;




mongoUrl = 'mongodb://localhost:27017/uploads';

mongoose.connect(mongoUrl)
.then(() => { console.log('connected to database') })
.catch((err)=>{console.log(err)})

server.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})