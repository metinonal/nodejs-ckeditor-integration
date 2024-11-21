// Import required modules
const express = require("express"); // Web framework for building server applications
const app = express(); // Initialize an Express application
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const path = require("path"); // Module for working with file and directory paths
const uploadRoutes = require('./routes/uploadRoutes'); // Routes for file upload and related operations
const indexRoutes = require('./routes/indexRoutes'); // Routes for rendering the main index page

// Set the view engine to EJS for rendering dynamic HTML pages
app.set("view engine", "ejs");
// Set the directory for the views
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' and 'node_modules' directories
app.use(express.static('public')); // Makes 'public' folder files accessible
app.use(express.static('node_modules')); // Allows access to files from 'node_modules'

// Middleware for parsing request bodies
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define routes for the application
app.use('/', indexRoutes); // Routes for the index page
app.use('/', uploadRoutes); // Routes for file upload and related actions

// Start the server and listen on port 3000
app.listen(3000, function (err) {
    if (err) {
        // Log an error message if the server fails to start
        return console.log("An error occurred:", err);
    }
    // Log a message indicating the server is running
    console.log("The server is running on port: " + 3000);
});
