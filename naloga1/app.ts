// src/app.ts
import express from "express";
import bodyParser from "body-parser";

export const app = express();

var db = require("./database.js");

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

