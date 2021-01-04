"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = process.env.PORT || 8080;
app_1.app.listen(port, function () {
    return console.log("Example app listening at http://localhost:" + port);
});
app_1.app.get("/", function (req, res, next) {
    res.json({ "message": "Ok" });
    console.log("Odpre povezavo");
});
