const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const parser = require("body-parser");

app.use(express());
app.use(parser.json());
app.use(express.static("public"));

app.use("/", proxy({ target: "http://www.example.org", changeOrigin: true }));
app.listen(3000, () => {
  console.log("listening on port 3000");
});
