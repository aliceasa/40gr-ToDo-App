import mysql from "mysql2";

export function renderLoginPage(req, res) {
  const model = {};
  model.title = "Login page";
  model.btn_text = "Login";

  const connection = connect();
  Promise.resolve()
    .then((_) => getUsers(connection))
    .then(() => ({ ...model }))
    .then((model) => res.render("login", { model }))
    .catch((err) => {
      console.log(err);
      res.render("error", {
        model: { errorName: err.name, message: err.message, stack: err.stack },
      });
    });
}

export async function loginUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const connection = connect();

  Promise.resolve()
    .then((_) => {
      validateLogin(connection, username, password);
    })
    .then((_) => res.status(200).send({ msg: `User ${username} is logged in` }))
    .catch((err) => {
      console.log(err);
      res.status(400).send();
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

async function getUsers(connection) {
  return await new Promise((resolve, reject) => {
    connection.execute("SELECT username from users", (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function validateLogin(connection, username, password) {
  return await new Promise((resolve, reject) => {
    connection.execute(`SELECT * FROM users`, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
