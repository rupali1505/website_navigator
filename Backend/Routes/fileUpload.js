const express = require("express");
const router = express.Router();
const multer = require("multer");
const { fileUploadResponse } = require("../Controllers/fileUpload.controller")

const fileDestination = multer({dist:'fileUploads'});

router.post("/upload", fileDestination.single("file"), fileUploadResponse);

module.exports = router