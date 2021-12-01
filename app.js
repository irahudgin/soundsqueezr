const express = require("express");
const { stat } = require("fs");
const app = express();
const path = require("path");

// If more than one html page staticPath has to change
var staticPath = path.join(__dirname, "/public");

app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.sendFile(staticPath);
});

app.listen(8000, () => {
  console.log("server running on port 8000");
});
