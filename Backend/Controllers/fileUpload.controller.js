const XLSX = require("xlsx");
const axios = require("axios");
const {saveUrls} = require("../Services/fileUpload.service")
const fs = require("fs");

async function fileUploadResponse(req,res){
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const workbook = XLSX.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const urls = extractUrls(sheet);


        const savedData = await saveUrls(urls, "file");


        fs.unlinkSync(req.file.path);

        res.json({
            message: "File processed successfully",
            data: savedData
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    fileUploadResponse
}