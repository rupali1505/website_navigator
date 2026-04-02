const XLSX = require("xlsx");
const axios = require("axios");
const {saveUrls} = require("../Services/fileUpload.service")
const fs = require("fs");

function extractUrls(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);

    return data
        .flatMap(row => Object.values(row))
        .filter(value => typeof value === "string" && value.startsWith("http"));
}

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
async function sheetResponse(req, res) {
    try {
        let { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL required" });
        }


        if (url.includes("docs.google.com")) {
            const id = url.split("/d/")[1].split("/")[0];
            url = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
        }

        const response = await axios.get(url);
        const workbook = XLSX.read(response.data, { type: "string" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const urls = extractUrls(sheet);

        const savedData = await saveUrls(urls, "google-sheet");

        res.json({
            message: "Sheet processed successfully",
            data: savedData
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function getUrls(req, res) {
    try {
        const data = await getAllUrls();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    fileUploadResponse,
    sheetResponse,
    getUrls
}