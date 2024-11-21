// Controller function to render the index page
exports.indexPage = async (req, res) => {
    try {
        // Render the "index" view
        res.render("index");
    } catch (err) {
        // Log any errors that occur
        console.log(err);
        // Send a 500 Internal Server Error response to the client
        res.status(500).send("Internal Server Error");
    }
};
