var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 8080;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongolines";
var routes = require("./routes/index.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("views", "./views");

app.use("/", routes);
app.use(require("./routes/index.js"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true }, );

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});