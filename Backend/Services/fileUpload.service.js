const UrlModel = require("../Models/urlModel");


async function saveUrls(urls, source = "file") {
    try {
        const data = await UrlModel.create({ urls, source });
        return data;
    } catch (err) {
        throw new Error("Error saving URLs");
    }
}
async function getAllUrls() {
    try {
        return await UrlModel.find().sort({ createdAt: -1 });
    } catch (err) {
        throw new Error("Error fetching URLs");
    }
}

module.exports = {
    saveUrls,
    getAllUrls
}