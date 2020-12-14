//nisem niti prepričan, če to potrebujemo, mislim, da je vse zapisano v index.js v osnovni mapi.
const express = require('express'),
   router = express.Router();

/*
Tukaj bo shranjenega večina backenda, torej kaj bodo delali servici kot so get, post
narediti moram še, da bo, ko bom prek spletnega vmesnika to vpisal,
to dejansko shranilo

*/

//današnji datum
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

//pridobimo vse naloge POST http://localhost:4200/notes/list
router.get('/list', function(req, res) {
  let sql = `SELECT * FROM podatki`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "pridobljene so vse naloge"
    })
  })
});

//pridobi eno določeno nalogo POST http://localhost:4200/notes/list
/*
router.get('/list', function(req,res) {
  let sql = 'SELECT * from podatki WHERE id VALUES (?)';
  let values = [
    req.body.id
  ];
  db.query(sql, [values], function(err,data,fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Pridobljena je bila naloga "
    })
  })
});
*/


// Ustvari novo nalogo GET http://localhost:4200/notes/new
router.post('/new', function(req, res) {
  let sql = `INSERT INTO podatki(creation, note) VALUES (?)`;
  let values = [
    //zaenkrat privzamemo, da je datum naloge trenutni datum, torej ko se je nalogo zamislilo se je začela -> tisto minuto
    req.body.Date,
    req.body.String
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Dodana je bila nova naloga"
    })
  })
});

module.exports = router;
