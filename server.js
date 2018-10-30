const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const parser = require("body-parser");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static("public"));
app.use(express());
app.use(parser.json());

app.get("/", function(req, res) {
  res.redirect("/restaurants/");
});

// const reviewsummary = {
//   target: "http://reviewsummary/droptable.com",
//   changeOrigin: true
// };
// const reviews = {
//   target: "http://reviews/droptable.com",
//   changeOrigin: true
// };

app.get("/restaurants/:restaurantID/menu/:menu", function(req, res) {
  const menuPath = path.join(__dirname, "./public/index.html");
  res.sendFile(menuPath);
});

app.use(
  "api/restaurants/:restaurantID/menu/:menu",
  proxy({ target: "http://127.0.0.1:3001/" })
);

// app.use("api/restaurants/:restaurantid/reviewsummary", proxy(reviewsummary));

// app.use("api//restaurants/:restaurantid/reviews", proxy(reviews));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
