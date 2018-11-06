const express = require("express");
const proxy = require("http-proxy-middleware");
const path = require("path");
const parser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

app.set("port", process.env.PORT || 3000);

app.use(express.static("public"));
app.use(express());
app.use(parser.json());

app.get("/", function(req, res) {
  res.redirect("/restaurants/");
});

app.use(
  "/restaurants/:restaurantID/menu/:menu",
  proxy({ target: "http://127.0.0.1:3001/", changeOrigin: true })
);
app.use(
  "/restaurants/:restaurantID/special",
  proxy({ target: "http://127.0.0.1:3001/", changeOrigin: true })
);
app.use(
  "/restaurants/:restaurantID/menuCount",
  proxy({ target: "http://127.0.0.1:3001/", changeOrigin: true })
);

app.get("/restaurants/:restaurantID/menu/:menu", function(req, res) {
  const menuPath = path.join(__dirname, "./public/index.html");
  res.sendFile(menuPath);
});
app.get("/restaurants/:restaurantID/special", function(req, res) {
  const menuPath = path.join(__dirname, "./public/index.html");
  res.sendFile(menuPath);
});
app.get("/restaurants/:restaurantID/menuCount", function(req, res) {
  const menuPath = path.join(__dirname, "./public/index.html");
  res.sendFile(menuPath);
});

app.use(
  "/restaurants/:id/overview/",
  proxy({ target: "http://127.0.0.1:3002/", changeOrigin: true })
);
app.get("/restaurants/:id/overview/", function(req, res) {
  const overview = path.join(__dirname, "./public/index.html");
  res.sendFile(overview);
});

app.use(
  "/restaurants/:restaurantID/reservations",
  proxy({ target: "http://127.0.0.1:3003/", changeOrigin: true })
);
app.get("/restaurants/:restaurantID/reservations", function(req, res) {
  const reservations = path.join(__dirname, "./public/index.html");
  res.sendFile(reservations);
});

app.use(
  "/restaurants/:rest_id/gallery",
  proxy({ target: "http://127.0.0.1:3004/", changeOrigin: true })
);
app.get("/restaurants/:rest_id/gallery", function(req, res) {
  const gallery = path.join(__dirname, "./public/index.html");
  res.sendFile(gallery);
});

app.use(
  "/restaurants/:restaurantid/reviews",
  proxy({
    target: "http://127.0.0.1:3005/"
  })
);
app.use(
  "/restaurants/:restaurantid/reviewsummary",
  proxy({
    target: "http://127.0.0.1:3005/"
  })
);

app.get("/restaurants/:restaurantid/reviews", function(req, res) {
  const reviews = path.join(__dirname, "./public/index.html");
  res.sendFile(reviews);
});
app.get("/restaurants/:restaurantid/reviewsummary", function(req, res) {
  const reviews = path.join(__dirname, "./public/index.html");
  res.sendFile(reviews);
});

//shouldn't this come first?

// app.use("api/restaurants/:restaurantid/reviewsummary", proxy(reviewsummary));

// app.use("api//restaurants/:restaurantid/reviews", proxy(reviews));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
