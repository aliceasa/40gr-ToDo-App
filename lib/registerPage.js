import mysql from "mysql2";

export function renderRegisterPage(req, res) {
  const model = {};
  model.title = "Register page";

  const connection = connect();
  Promise.resolve()
    .then((_) => getUser(connection))
    .then((user) => ({ ...model, user }))
    .then((model) => res.render("register", { model }))
    .catch((err) => {
      console.log(err);
      res.render("error", {
        model: { errorName: err.name, message: err.message, stack: err.stack },
      });
    });
}

export function createNewUser(connection, newUser) {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO user (username, password) VALUES (${req.body.username}, ${req.body.password})`,
      (err) => {
        if (err) return reject(err);

        resolve();
      }
    );
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
