// dependencies 
const express = require("express");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 8000;

const app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
// need to change catscontroller
var routes = require("./controllers/catsController.js");

app.use(routes);


// start server so that it can begin listening to client request
app.listen(PORT, function() {
    console.log("Server is listening online.");
});
