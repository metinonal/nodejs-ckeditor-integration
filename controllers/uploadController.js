// Import required modules
const multer = require('multer'); // Middleware for handling multipart/form-data
const path = require('path'); // Module for handling and transforming file paths
const fs = require('fs'); // File system module for interacting with the file system

// Configure Multer storage settings
const storage = multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads')); // Files will be saved in 'public/uploads'
    },
    // Set the filename format for uploaded files
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique suffix using timestamp and random number
        const fileExtension = path.extname(file.originalname); // Extract the file extension from the original file name
        cb(null, uniqueSuffix + fileExtension); // Create a unique file name
    }
});

// File filter to allow only image and GIF files
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type. Only images and GIFs are allowed.'), false); // Reject file
    }
};

// Initialize Multer with the storage configuration and file filter
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

// Check if the uploads directory exists; create it if not
const uploadsDir = path.join(__dirname, '../public/uploads'); // Path to the uploads directory
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory recursively if it doesn't exist
}

// Render the file upload page
exports.getUploadPage = (req, res) => {
    res.render('upload'); // Render the 'upload' view for the user
};

// Middleware to handle single file uploads with Multer
exports.uploadFile = upload.single('upload'); // Field name for the file is 'upload'

// Handle the file upload and return a response for CKEditor integration
exports.uploadFileHandler = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded or invalid file type.'); // Send error if no file is uploaded
    }
    const fileUrl = `/uploads/${req.file.filename}`; // Construct the file's URL
    const funcNum = req.query.CKEditorFuncNum; // Retrieve CKEditor function number from the query
    // Send a script response to CKEditor to use the uploaded file
    res.send(`<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction(${funcNum}, '${fileUrl}', '');</script>`);
};

// Handle file deletion
exports.deleteFile = (req, res) => {
    const fileName = req.body.fileName; // Extract file name from the request body
    if (!fileName) {
        return res.status(400).send('File name is required.'); // Send error if file name is not provided
    }
    const filePath = path.join(__dirname, '../public/uploads', fileName); // Construct the full file path

    // Delete the file using the file system module
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('File could not be deleted:', err); // Log the error
            return res.status(500).send('File could not be deleted'); // Send error response
        }
        console.log('File successfully deleted:', fileName); // Log success
        res.status(200).send('File successfully deleted'); // Send success response
    });
};

// List all uploaded files in the uploads directory
exports.listUploads = (req, res) => {
    fs.readdir(path.join(__dirname, '../public/uploads'), (err, files) => { // Read the uploads directory
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err); // Send error if directory can't be scanned
        }
        const message = req.query.message || ''; // Optional message to display
        res.render('uploads', { files: files, message: message }); // Render the 'uploads' view with the list of files
    });
};
