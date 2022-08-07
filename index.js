import express from "express";
import handlebars from "express-handlebars";

import { renderRegisterPage, registerUser } from "./lib/registerPage.js";

import {
  renderMainPage,
  insertNewNote,
  deleteNote,
  editNote,
} from "./lib/mainPage.js";

const app = express();
const port = 8081;
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);

app.get("/", renderMainPage);
app.get("/register", renderRegisterPage);
app.post("/", insertNewNote);
app.post("/register", registerUser);
app.delete("/", deleteNote);
app.patch("/", editNote);

app.listen(port, () => console.log(`Starting server on port ${port}`));
