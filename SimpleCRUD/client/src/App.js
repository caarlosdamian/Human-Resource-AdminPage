import "./App.css";
import { useState } from "react";
import Axios from "axios"

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const AddEmployee=()=>{
    Axios.post('http://localhost:3001/create',{
      name:name,
      age:age,
      country:country,
      position:position,
      wage:wage
    }).then(()=>{
      console.log("Success")
    })

  }
  return (
    <div className="App">
      <div className="information">
        <h1>CRUD</h1>
        <label>Name</label>
        <input
          type="text  "
          onChange={(Event) => {
            setName(Event.target.value);
          }}
        />
        <label>Age</label>
        <input
         type="number"
          onChange={(Event) => {
            setAge(Event.target.value);
          }}
        />
        <label>Position</label>
        <input
          type="text  "
          onChange={(Event) => {
            setPosition(Event.target.value);
          }}
        />

        <label>Country</label>
        <input
          type="text  "
          onChange={(Event) => {
            setCountry(Event.target.value);
          }}
        />
        <label>Wage</label>
        <input
         type="number"
          onChange={(Event) => {
            setWage(Event.target.value);
          }}
        />
        <button onClick={AddEmployee}>Add Employee</button>
      </div>
    </div>
  );
}

export default App;
