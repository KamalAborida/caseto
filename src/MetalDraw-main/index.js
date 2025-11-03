require("dotenv").config();
const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");
const http = require('http');
const { errorHandler } = require("./config/permissions");
const routes = require("./routes/index.route");
const Admin = require("./models/user.model");
const Database = require("./config/database-config");
const { initializeDatabase } = require("./config/initialize-database");
const { userRoleAppEnum } = require("./enums/userRoleApp.enum");


Database.sync().then(async () => {
  await initializeDatabase();

  await Admin.findOrCreate({
    where: { id: 1 },
    defaults: {
      // id: 'superAdmin001',
      fullName: "superAdmin",
      emailAddress: "admin@admin.com",
      salt: null,
      hash: "Admin@2025",
      roleApp: userRoleAppEnum.SUPER_ADMIN,
      isDefault: true,
      isActive: true,
    },
  });
});

const app = express();

app.use(xss());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "dist")));

app.use(function (req, res, next) {
  var accept = req.accepts("html", "json", "xml");
  if (accept !== "html") {
    return next();
  }

  if (req.path.includes("/api")) {
    return next();
  }
  var ext = path.extname(req.path);
  if (ext !== "") {
    return next();
  }

  fs.createReadStream(path.join(process.cwd(), "./dist/index.html")).pipe(res);
});

app.use(routes);
app.use(errorHandler);

const server = http.createServer(app);


server.listen(3200, () => {
  console.log("now server is listening on localhost port 3200");
});

module.exports = { app };