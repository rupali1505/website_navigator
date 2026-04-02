const UrlModel = require("../Models/urlModel");


async function saveUrls(urls, source = "file") {
    try {
        const data = await UrlModel.create({ urls, source });
        return data;
    } catch (err) {
        throw new Error("Error saving URLs");
    }
}

module.exports = {
    saveUrls
}