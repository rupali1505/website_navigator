const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const server = express();
const fileUploads = require("./Routes/fileUpload")
const PORT = process.env.PORT || 5000;

server.use(cors({
    origin: "https://website-navigator-delta.vercel.app", 
    methods: ["GET", "POST"]
}));
server.use(express.json()); 

server.use('/api',fileUploads);

mongoUrl = 'mongodb+srv://test:test@cluster0.pvbto6a.mongodb.net/uploads';

mongoose.connect(mongoUrl)
.then(() => { console.log('connected to database') })
.catch((err)=>{console.log(err)})

server.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})