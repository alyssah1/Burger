// import mysql connection
const connection = require("../config/connection.js");

function printQuestions(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}


function objectSQL(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnPoperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM" + tableInput + ";";
        connection.query(queryString, function(err, result){
            if(err) {
            console.log(err);
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO" + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ")";
        queryString += "VALUES (";
        queryString += printQuestions(vals.length);
        queryString += ")";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if(err) {
                console.log(err);
            }
            cb(result);
        });
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE" + table;

        queryString += "SET";
        queryString += objectSQL(objColVals);
        queryString += "WHERE";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, reuslt) {
            if(err) {
                console.log(err);
            }
            cb(result);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM" + table;

        queryString += "WHERE";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if(err) {
                console.log(err);
            }
            cb(result);
        });
    }
};

module.exports = orm;