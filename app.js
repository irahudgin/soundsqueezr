const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Homeeeee" });
});

app.listen(8000, () => {
  console.log("server running on port 8000");
});
