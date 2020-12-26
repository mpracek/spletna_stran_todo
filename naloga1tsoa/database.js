var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE notes (id INTEGER PRIMARY KEY, creation DATE, note TEXT)`,
        (err) => {
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
    }
});


module.exports = db