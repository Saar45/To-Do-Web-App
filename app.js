const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date();

  const today = date.toLocaleDateString("en-US", options);

  res.render("list", { theDate: today, newItem: items });
});

app.post("/", function (req, res) {
  let newElement = req.body.newListItem;

  items.push(newElement);

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Hey! we're up!");
});
