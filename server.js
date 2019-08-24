var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

var db = require("./models");
var app = express();
var PORT = process.env.PORT || 8080;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("views", "./views");

require("./routes")(app);

mongoose.connect("mongodb://localhost/unit18Populater", {
    useNewUrlParser: true
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});