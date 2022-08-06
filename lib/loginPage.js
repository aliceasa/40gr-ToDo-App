import mysql from "mysql2";

export function renderLoginPage(req, res) {
  const model = {};
  model.title = "Login page";

  const connection = connect();
  Promise.resolve()
    .then((_) => getUser(connection))
    .then((user) => ({ ...model, user }))
    .then((model) => res.render("login", { model }))
    .catch((err) => {
      console.log(err);
      res.render("error", {
        model: { errorName: err.name, message: err.message, stack: err.stack },
      });
    });
}

export function loginUser(req, res) {
  const newUser = req.body.newUser;
  const connection = connect();
  Promise.resolve()
    .then((_) => loginUser(connection, newUser))
    .then((_) => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.render("error", {
        model: { errorName: err.name, message: err.message, stack: err.stack },
      });
    });
}

function connect() {
  return mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Liusinda1",
    database: "todoapp",
  });
}

async function getUser(connection) {
  return await new Promise((resolve, reject) => {
    connection.execute(
      "SELECT userId, username, password from user;",
      (err, rows) => {
        if (err) return reject(err);

        const notes = rows;
        return resolve(notes);
      }
    );
  });
}
