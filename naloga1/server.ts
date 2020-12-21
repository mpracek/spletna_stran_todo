// src/server.ts
import { app } from "./app";

var port = {
  port: 8080
};

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
