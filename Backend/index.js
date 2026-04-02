const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const server = express();
const fileUploads = require("./Routes/fileUpload")
const PORT = 5000;

server.use(cors({
    origin: "https://website-navigator-delta.vercel.app", 
    methods: ["GET", "POST"]
}));
server.use(express.json()); 

server.use('/',fileUploads);

mongoUrl = 'mongodb://localhost:27017/uploads';

mongoose.connect(mongoUrl)
.then(() => { console.log('connected to database') })
.catch((err)=>{console.log(err)})

server.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})