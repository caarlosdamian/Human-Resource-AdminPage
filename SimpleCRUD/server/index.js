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
    "INSERT INTO employees(name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/employee", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/employee/:id", (req, res) => {
  const id = req.params.id;
  const wage = req.body.wage;
  const name = req.body.name;
  const age = req.body.age;
  const position = req.body.position;
  const country = req.body.country;
  db.query(
    "UPDATE  employees  SET wage = ?,name=?,age=?,country=?,position=? WHERE id=?",
    [wage,name,age,country,position, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/employee/:id',(req,res)=>{
  const id = req.params.id
  db.query("DELETE FROM employees WHERE id=?",id,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(result)
      res.send(result)
    }
  })
})

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
