"use strict";
/*
V tej datoteki imamo konstante, ki nam bodo olajšale delo z SQL.
konstante so nizi, ki vsebujejo SQL ukaze.
*/
exports.__esModule = true;
exports.SQL_FIND_DATA = exports.SQL_COUNT_DATA = exports.SQL_DELETE_DATA = exports.SQL_UPDATE_DATA = exports.SQL_QUERY_NOTES = exports.SQL_INSERT_DATA = exports.SQL_CREATE_NOTE_TABLE = exports.db = void 0;
//Uvoz potrebnih knjižnjic
//import { Database } from 'sqlite3';
var sqlite3 = require('sqlite3').verbose();
//baza s katero bomo delali
var bazaPodatkov = "db.sqlite";
var db = new sqlite3.Database(bazaPodatkov, function (err) {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Connected to the SQLite database.');
    }
    db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, creation DATE, note TEXT)", function (err) {
        if (err) {
            console.error(err.message);
            // Table already created
        }
        else {
            // Table just created, creating some rows
            var insert = 'INSERT INTO notes (creation, note) VALUES (?,?)';
            db.run(insert, ["2021-01-04", "first_test"]);
            db.run(insert, ["2021-01-04", "second_test"]);
        }
    });
});
exports.db = db;
var SQL_CREATE_NOTE_TABLE = "\n    CREATE TABLE IF NOT EXISTS  notes (\n      id INTEGER PRIMARY KEY,\n      creation DATE NOT NULL,\n      note TEXT NOT NULL\n    )";
exports.SQL_CREATE_NOTE_TABLE = SQL_CREATE_NOTE_TABLE;
var SQL_QUERY_NOTES = "SELECT * FROM notes";
exports.SQL_QUERY_NOTES = SQL_QUERY_NOTES;
var SQL_INSERT_DATA = "INSERT INTO notes (creation, note) VALUES (?,?)";
exports.SQL_INSERT_DATA = SQL_INSERT_DATA;
var SQL_UPDATE_DATA = "UPDATE notes SET (note,creation) = (?,?) WHERE id = ?";
exports.SQL_UPDATE_DATA = SQL_UPDATE_DATA;
var SQL_DELETE_DATA = "DELETE FROM notes WHERE id =?";
exports.SQL_DELETE_DATA = SQL_DELETE_DATA;
var SQL_FIND_DATA = "SELECT FROM notes WHERE id =?";
exports.SQL_FIND_DATA = SQL_FIND_DATA;
var SQL_COUNT_DATA = +"COUNT * FROM notes";
exports.SQL_COUNT_DATA = SQL_COUNT_DATA;
console.log(SQL_COUNT_DATA);
