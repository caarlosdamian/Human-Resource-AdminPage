import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import ReactModal from "react-modal";
import "../../styles/Employees.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
function Employees() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [modal_add, setModalAdd] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
      console.log(response);
    });
  }, []);

  const AddEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("Success");
    });
  };

  return (
    <div className="App">
      <Button  className ="add"variant="outline-primary" onClick={() => setModalAdd(true)}>
        Agregar Employee
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Country</th>
            <th>Wage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((val, key) => {
            return (
              <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.position}</td>
                <td>{val.country}</td>
                <td>${val.wage}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Button variant="outline-info" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactModal
        isOpen={modal_add}
        onRequestClose={() => setModalAdd(false)}
        className="Modal"
      >
        <Form>
          <Form.Row>
            <Form.Group>
              <h1>Agregar Empleado</h1>
              <hr></hr>
              <div className="information">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text  "
                  onChange={(Event) => {
                    setName(Event.target.value);
                  }}
                />
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(Event) => {
                    setAge(Event.target.value);
                  }}
                />
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text  "
                  onChange={(Event) => {
                    setPosition(Event.target.value);
                  }}
                />

                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text  "
                  onChange={(Event) => {
                    setCountry(Event.target.value);
                  }}
                />
                <Form.Label>Wage</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(Event) => {
                    setWage(Event.target.value);
                  }}
                />
                <Button variant="outline-info" onClick={AddEmployee}>
                  Add Employee
                </Button>
              </div>
            </Form.Group>
          </Form.Row>
        </Form>
      </ReactModal>
    </div>
  );
}

export default Employees;
