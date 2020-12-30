// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "./build/swagger.json",
      validatorUrl : null
    },
  })
);
// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(function (req, res) {
  res.status(404);
});

app.get("/", (req, res, next) => {
  res.json({ "message": "Ok" })
});


export { app };
