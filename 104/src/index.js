require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("view", path.join(__dirname, "templates"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.json({ msg: "Health Check" });
});

app.get("/home", (req, res, next) => {
  res.render("index", { pageTitle: "Welcome to HomePage!" });
});

// console.log(process.env.PORT);

app.get("/login", (req, res, next) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "admin") {
    res.render("success", { username: name });
  } else {
    res.render("failure");
  }
  res.json({ msg: "test" });
});

app.listen(process.env.PORT);
