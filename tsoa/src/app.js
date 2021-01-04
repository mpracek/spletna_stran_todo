"use strict";
import express, { Response, Request } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = require("../build/routes");
exports.app = express_1.default();
// Use body parser to read sent json payloads
exports.app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
exports.app.use(body_parser_1.default.json());
routes_1.RegisterRoutes(exports.app);
app.use("/docs", swaggerUi.serve, async (_req, res) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  });
