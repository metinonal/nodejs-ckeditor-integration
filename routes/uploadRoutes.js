// Import the Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the upload controller
const uploadController = require("../controllers/uploadController");

// Route to render the upload page
router.get('/upload', uploadController.getUploadPage);

// Route to handle file uploads
// Uses middleware to process the file upload and then handles the response
router.post('/upload', uploadController.uploadFile, uploadController.uploadFileHandler);

// Route to handle file deletion
router.post('/delete-file', uploadController.deleteFile);

// Route to list all uploaded files
router.get('/uploads', uploadController.listUploads);

// Export the router to be used in the main application
module.exports = router;
