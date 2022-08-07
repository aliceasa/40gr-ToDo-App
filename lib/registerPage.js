import mysql from "mysql2";

export function renderRegisterPage(req, res) {
  const model = {};
  model.title = "Register page";
  model.btn_text = "Register";

  const connection = connect();
  Promise.resolve()
    .then((_) => getUsers(connection))
    .then(() => ({ ...model }))
    .then((model) => res.render("register", { model }))
    .catch((err) => {
      console.log(err);
      res.render("error", {
        model: { errorName: err.name, message: err.message, stack: err.stack },
      });
    });
}

export async function registerUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const connection = connect();

  Promise.resolve()
    .then((_) => {
      updateUsers(connection, username, password);
    })
    .then((_) => {
      res.status(200).send({ msg: `User ${username} is registered` });
    })
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

async function updateUsers(connection, username, password) {
  return await new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO users (username, password) VALUES("${username}", "${password}")`,
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

async function checkIfUserExist(connection, username) {
  return await new Promise((resolve, reject) => {
    connection.execute(`SELECT username FROM users`, async (err, row) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
