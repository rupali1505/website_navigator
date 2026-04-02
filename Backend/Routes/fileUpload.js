const express = require("express");
const router = express.Router();
const multer = require("multer");
const { fileUploadResponse, sheetResponse } = require("../Controllers/fileUpload.controller")

const fileDestination = multer({dest:'fileUploads'});

router.post("/upload", fileDestination.single("file"), fileUploadResponse);
router.post("/sheet", sheetResponse);

module.exports =   router
