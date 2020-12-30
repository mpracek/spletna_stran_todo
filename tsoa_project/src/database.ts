/*
V tej datoteki imamo konstante, ki nam bodo olajšale delo z SQL.
konstante so nizi, ki vsebujejo SQL ukaze.
*/

//Uvoz potrebnih knjižnjic
var sqlite3 = require('sqlite3').verbose();
import { Database } from 'sqlite3';

var sqlite3 = require('sqlite3').verbose()

//baza s katero bomo delali
const bazaPodatkov  = "db.sqlite";

const db = new sqlite3.Database(bazaPodatkov, (err: { message: any; }) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }
  else{
      console.log('Connected to the SQLite database.')}
      db.run(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, creation DATE, note TEXT)`,
        (err: { message: any; }) => {
            if (err) {
                console.error(err.message)
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO notes (creation, note) VALUES (?,?)'
                db.run(insert, ["2020-12-07","first"])
                db.run(insert, ["2020-12-08","second"])
            }
        });
    });


const SQL_CREATE_NOTE_TABLE: string = `
    CREATE TABLE IF NOT EXISTS  notes (
      id INTEGER PRIMARY KEY,
      creation DATE NOT NULL,
      note TEXT NOT NULL
    )`;

const SQL_QUERY_NOTES: string = `SELECT * FROM notes`;

const SQL_INSERT_DATA: string  = `INSERT INTO notes (creation, note) VALUES (?,?)`

const SQL_UPDATE_DATA: string = `UPDATE notes SET (note,creation) = (?,?) WHERE id = ?`

const SQL_DELETE_DATA: string = `DELETE FROM notes WHERE id =?`

var SQL_COUNT_DATA: number = +`COUNT * FROM notes`

export {
  db, SQL_CREATE_NOTE_TABLE,SQL_INSERT_DATA,SQL_QUERY_NOTES,SQL_UPDATE_DATA,SQL_DELETE_DATA, SQL_COUNT_DATA
}
