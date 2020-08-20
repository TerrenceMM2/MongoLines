require('dotenv').config()
var express = require("express");
var dynamoose = require("dynamoose");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 8080;
var routes = require("./routes/index.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// Setting a default route of "/" and using index.js for route lookup.
app.use("/", routes);
app.use(require("./routes/index.js"));

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.sdk.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": process.env.AWS_REGION
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});