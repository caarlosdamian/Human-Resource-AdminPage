import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import ReactModal from "react-modal";
import "../../styles/Employees.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ReactCard from "react-bootstrap/Card";
import swal from "sweetalert";
function Employees() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  //Edit Variables
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newCountry, setNewCountry] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [modal_add, setModalAdd] = useState(false);
  const [modal_edit, setModalEdit] = useState(false);
  const [modal_delete, setModalDelete] = useState(false);
  //Paginacion
  const [pageNumber, setPageNumber] = useState(0);
  const clientsPerPage = 3;
  const pagesVisited = pageNumber * clientsPerPage;
  const pageCount = Math.ceil(employeeList.length / clientsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const [employeeSelected, setEmployeeSelected] = useState({
    name: "",
    country: "",
    age: "",
    wage: "",
    position: "",
    id: "",
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
      console.log(response);
    });
  }, []);

  const selectEmployee = (val, caso) => {
    setEmployeeSelected(val);
    if (caso === "Editar") {
      setModalEdit(true);
    } else if (caso === "Eliminar") {
      setModalDelete(true);
    }
  };

  const AddEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(
      () => {
        Axios.get("http://localhost:3001/employee").then((response) => {
          setEmployeeList(response.data);
          swal("Empleado Agregado", {
            icon: "success",
          });
        });
      },
      (err) => {
        swal("Empleado No Agregado", "Reintentar", {
          icon: "error",
        });
      }
    );
  };
  const updateEmployee = (id) => {
    console.log(employeeSelected.id);
    setModalEdit(false);
    Axios.put(`http://localhost:3001/employee`, {
      id: id,
      name: newName,
      age: newAge,
      country: newCountry,
      position: newPosition,
      wage: newWage,
    }).then(
      () => {
        Axios.get(`http://localhost:3001/employee/${id}`).then((response) => {
          setEmployeeList(response.data);
          setName("");
          setNewCountry("");
          setNewPosition("");
          setNewAge("");
          setNewWage("");
          swal("Cliente Actualizado", {
            icon: "success",
          });
        });
      },
      (error) => {
        swal("No Actualizado", "Reintentar", {
          icon: "error",
        });
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/employee/${id}`).then((res) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
      swal("Cliente Eliminado", {
        icon: "success",
      });
    });
  };

  return (
    <div className="App">
      <ReactCard>
        <h1>Empleados</h1>
        <Button
          className="add"
          variant="outline-primary"
          onClick={() => setModalAdd(true)}
        >
          Agregar Employee
        </Button>
        <Table striped bordered hover>
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
            {employeeList
              .slice(pagesVisited, pagesVisited + clientsPerPage)
              .map((val, key) => {
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
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => {
                            selectEmployee(val, "Editar");
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            selectEmployee(val, "Eliminar");
                          }}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBtns"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisable"}
        />
        <ReactModal
          isOpen={modal_add}
          onRequestClose={() => setModalAdd(false)}
          ariaHideApp={false}
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
        <ReactModal
          isOpen={modal_edit}
          onRequestClose={() => setModalEdit(false)}
          className="Modal"
          ariaHideApp={false}
        >
          <Form>
            <Form.Row>
              <Form.Group>
                <h1>Editar Empleado</h1>
                <hr></hr>
                <div className="information">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required=""
                    type="text  "
                    onChange={(Event) => {
                      setNewName(Event.target.value);
                    }}
                  />
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    required=""
                    type="number"
                    onChange={(Event) => {
                      setNewAge(Event.target.value);
                    }}
                  />
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    required=""
                    type="text  "
                    onChange={(Event) => {
                      setNewPosition(Event.target.value);
                    }}
                  />

                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    required=""
                    type="text"
                    onChange={(Event) => {
                      setNewCountry(Event.target.value);
                    }}
                  />
                  <Form.Label>Wage</Form.Label>
                  <Form.Control
                    required=""
                    type="number"
                    onChange={(Event) => {
                      setNewWage(Event.target.value);
                    }}
                  />
                  <Button
                    variant="outline-info"
                    type="submit"
                    onClick={() => {
                      updateEmployee(employeeSelected.id);
                    }}
                  >
                    Edit Employee
                  </Button>
                </div>
              </Form.Group>
            </Form.Row>
          </Form>
        </ReactModal>
        <ReactModal
          isOpen={modal_delete}
          onRequestClose={() => setModalDelete(false)}
          className="Modal"
          ariaHideApp={false}
        >
          <Form>
            <Form.Row>
              <Form.Group>
                <div>
                  <h1>Delete Employee</h1>
                  <hr></hr>

                  <Button
                    variant="outline-info"
                    type="submit"
                    onClick={() => {
                      deleteEmployee(employeeSelected.id);
                    }}
                  >
                    Confirm
                  </Button>

                  <Button
                    variant="outline-danger"
                    type="submit"
                    onClick={() => {
                      setModalDelete(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form.Group>
            </Form.Row>
          </Form>
        </ReactModal>
      </ReactCard>
    </div>
  );
}

export default Employees;
