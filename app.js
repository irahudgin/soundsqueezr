const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// If more than one html page staticPath has to change
var staticPath = path.join(__dirname, "/public");

app.use((req, res, next) => {
  res.set("Cross-Origin-Embedder-Policy", "require-corp");
  res.set("Cross-Origin-Opener-Policy", "same-origin");
  // res.header("Cross-Origin-Resource-Policy", "cross-origin");

  next();
});
app.use(express.static(staticPath));
app.use("/scripts", express.static(__dirname + "/node_modules/@ffmpeg/"));

app.get('*', (req, res) => {
  if(req.headers["x-forwarded-proto"] === "https") {
    // OK, continue
    return next();
  };  
  res.redirect('https://www.soundsqueezr.com/');
  
  
  
  // let protocol = req.protocol;

  // if (protocol != 'https') {
  //   res.redirect('https://www.soundsqueezr.com/');
  // }
});

app.get("/", (req, res) => {
  res.sendFile(staticPath);
});


app.listen(process.env.PORT || 8000);
