const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const groupRoutes = require("./routes/group");
const emailRoutes = require("./routes/email");
const annnouncRoutes = require("./routes/announc");
const categRoutes = require("./routes/category");
const waitinguserRoutes = require("./routes/waitinguser");

const app = express();

//conection to data
mongoose
  .connect(
    "mongodb+srv://LaaKri:XAIt84UAoELi5mcg@cluster0.yq7ubbe.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/file-folder", express.static(path.join("backend/file-folder")));
app.use("/file-profile", express.static(path.join("backend/file-profile")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/announcs", annnouncRoutes);
app.use("/api/categs", categRoutes);
app.use("/api/wuser", waitinguserRoutes);

module.exports = app;
