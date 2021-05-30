const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "crudsysterm",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees(name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",[
      name, age, country, position, wage
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
