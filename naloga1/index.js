/*
to je osnova naše aplikacije.

sam si to primerjam z server.R
app.component.html je podobna kot ui.R
notes.js pa so dodatne funkcije za delovanje serverja in ui

to je je osnovna mapa naše aplikacije, vse se dogaja v njej (kot npr shiny mapa v R)
pomembna mapa je še src/app, kjer se nahaja app.component.html.

Še eno zelo pomembno dejstvo -> Funckije in spremenljivke (npr, userInput, createNote()), ki jih v xyz.html uporabljaš,
so vedno definirane v xyz.ts.


*/

/*
TODO:
-uporabi drugi tutorial, ki ga je urška poslala, da povežeš REST API in Angular -> nisem prepričan če deluje

-gumb dodaj postavko bo res dodal postavko
-uredi da se bo seznam prikazal
-križec in svinčnik naj bi bila že dodana (koda urška)
-uredi pop-upe




ni vec TODO ampak so še vedno odprta vprašanja
-ugotoviti izvor napake, ki se pojavi ko zaženem:
  src\app>curl -X POST http://localhost:4200/notes/new -H "ContentType: application/json" -d '{"note":"sql"}'
konzola potem izpiše html kodo, v kateri piše error in cannot post /notes/new
Ta napaka je rešena (s pomočjo Urške), ne vem kaj je bilo narobe

-ko ugotoviš napako, uporabi to znanje, da boš lahko iz spletnega vmesnika vpisoval v bazo
Ta napaka je rešena s pomočjo Urške -> imel sem napačne baze (mysql =! sqlite)

datoteka index.js je osnova aplikacije
*/

//najprej uvozimo vse potrebne module
const express = require('express'),
    app = express();
var db = require("./database.js");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//kam se bo server povezal
//to moram še spremenit da se bo povezal na 4200 kot ima angular
var server = {
    port: 8080
};


app.listen(server.port, () => console.log(`Server started, listening on port: ${server.port}`));

app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

//izpiše vse postavke
app.get("/api/note/list", (req, res, next) => {
    var sql = "SELECT * FROM notes"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "postavke izpisane",
            "data": rows
        })
    });
});

//izpiše postavko z enim določenim id
/*
da dobimo prvo postavko rabimo stran http://localhost:8080/api/note/1
uredila urška
*/
app.get("/api/note/:id", (req, res, next) => {
    console.log("HERE")
    var sql = "SELECT * FROM notes where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "postavka izpisana",
            "data": row
        })
    });
});

//dodamo postavko, id je avtomatičen
app.post("/api/note/", (req, res, next) => {
  //urška
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log("HERE1", req.body)
    let values = {
        //zaenkrat privzamemo, da je datum naloge trenutni datum, torej ko se je nalogo zamislilo se je začela -> tisto minuto
        creation: today,
        note: req.body.params.note
    };
    console.log(values);
    var sql = 'INSERT INTO notes (creation, note) VALUES (?,?)'
    var params = [values.creation, values.note]
    console.log(params);
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "postavka vstavljena"
        })
    });
})

//spremenimo eno postavko glede na določen id
app.post("/api/note/update", (req, res, next) => {
  /*
  deluje, v konzoli zazenemo z npr curl -d "id=5&note=nekaj" -X POST http://localhost:8080/api/note/update/5
  na ta način spremenimo postavko z id 5 da piše 'nekaj'
  */
  //spremenimo le točno določen id
  let values = {
      //datum naloge se ne spremeni, ko spremenimo nalogo. Datum ostane isti, sicer bi ustvarili novo nalogo
      id: req.body.params.id,
      note: req.body.params.note
  };
  console.log(values);
  var sql = 'UPDATE notes SET note = ? WHERE id = ?'
  var params = [values.note,values.id]
  console.log(params);
  db.run(sql, params, function (err, result) {
      if (err) {
          res.status(400).json({ "error": err.message })
          return;
      }
      res.json({
          "message": "Postavka spremenjena"
      })
  });
})

//izbrišemo postavko z določenim id
app.post("/api/note/delete", (req, res, next) => {
  /*
  tudi to sedaj dela, da jo iz konzole pokličemo potrebujemo
  curl -d "id=6" -X POST http://localhost:8080/api/note/delete/6
  */
  var sql = "DELETE FROM notes where id = ?"
  var params = [req.body.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
          res.status(400).json({ "error": err.message });
          return;
      }
      res.json({
          "message": "postavka izbrisana",
          "data": row
      })
  });
});

// use router
// app.use('/notes', notesRouter);

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});
