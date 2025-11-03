const express = require("express");
const router = express();
const jwtPermissions = require('../../config/permissions');

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const tableRoutes = require("./table.route");

router.use("/auth", authRoutes);
router.use("/", jwtPermissions.checkToken, userRoutes);
router.use("/tables", jwtPermissions.checkToken, tableRoutes);

module.exports = router;
