const express = require('express');
const router = express.Router();
let userRoutes = require("./user/index.route")



router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


router.use("/api/v1/user", userRoutes);


router.all("*", (req, res) => {
    return res.status(404).json({ success: false, messageCode: '0012', error: "Invalid URL.", code: 404 })
})

module.exports = router;
