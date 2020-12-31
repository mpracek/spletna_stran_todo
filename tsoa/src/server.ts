import { app } from "./app";

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});