const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// creating all routes and setting up logic within each route
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/newBurger", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function () {
        res.redirect("/");
    });
});

router.put("api/updateburger/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function () {
        if (data.changedRows == 0) {
            // if no rows changed, then id doesnt exist so send a 404 message
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// export routes for server.js to use 
module.exports = router;



















