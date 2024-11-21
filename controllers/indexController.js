exports.indexPage = async (req, res) => {
    try {
        res.render("index");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};