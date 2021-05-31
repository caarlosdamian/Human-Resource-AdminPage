import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
function Employees() {

        const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/employee').then((response) => {
      setEmployeeList(response);
      console.log(response);
    });
  }, []);

  const AddEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("Success");
    });
  };

  const showEmployee = () => {
    Axios.get('http://localhost:3001/employee').then((response) => {
      setEmployeeList(response);
      console.log(response);
    });
  };
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
        <button onClick={showEmployee}>show Employee</button>
      </div>
    </div>
  );
}

export default Employees
