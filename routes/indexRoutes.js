// Import the Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the index controller
const indexController = require("../controllers/indexController");

// Route to handle the root ("/") path and render the index page
router.get("/", indexController.indexPage);

// Export the router to be used in the main application
module.exports = router;
