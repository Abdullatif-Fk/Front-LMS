import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { Wrap, TableBody } from "./style.js";

import { useSelector, useDispatch } from "react-redux";
import EditID from "../../store/actions/EditID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ListGroup,
  Row,
  Col,
  Spinner,
  Modal,
  Button,
  Form,
  Image,
  Table,
} from "react-bootstrap";

let ModalEdit = () => <></>;
let AddModal = () => <></>;

function Search() {
  async function toggleModalForm(e, _id) {
    ModalEdit = await lazy(() => import("./ModalEdit"));

    setOpenForm(!OpenForm);
  }
  async function toggleModalForm2(e) {
    AddModal = await lazy(() => import("./AddModal"));
    setOpenForm2(!OpenForm2);
  }

  const [OpenForm, setOpenForm] = useState(false);
  const [OpenForm2, setOpenForm2] = useState(false);

  const handleClose = () => setOpenForm(!OpenForm);
  const handleClose2 = () => setOpenForm2(!OpenForm2);

  //const [id, setId] = useState("falsee");
  const [arr, setArray2] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sections, SetSections] = useState([]);
  const [classes, Setclasses] = useState([]);

  const [Filter, setFilter] = useState([]);
  const dispatch = useDispatch();

  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setidDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    Promise.resolve()
      .then(() => {
        setidDelete(id);
      })
      .then(() => {
        console.log(idDelete);
        setShowDelete(true);
      });
  };

  const searchInput = useSelector((state) => {
    return state.Searching.search;
  });
  const ID = useSelector((state) => {
    return state.EditID.ID;
  });

  const [Pagination, setPagination] = useState({
    data: students.map((value, index) => ({
      id: value.id,
      class_id: value.class_id,
      section_name: value.section_name,
      section_id: value.section_id,
      picture: value.picture,
      student_name: value.student_name,
    })),
    offset: 0,
    numberPerPage: 2,
    pageCount: 0,
    currentData: [],
  });
  useEffect(() => {
    fetch(`http://localhost:8000/api/Fetch_Sections`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        SetSections(json.message);
      });

    fetch(`http://localhost:8000/api/Fetch_Classes`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        Setclasses(json.message);
      });
  }, []);
  useEffect(() => {
    try {
      fetch("http://localhost:8000/api/Fetch_Students", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status != 400) {
            console.log(json.message);
            setPagination({
              data: json.message.data.map((value, index) => ({
                id: value.id,
                class_id: value.class_id,
                section_name: value.section_name,
                class_name: value.class_name,
                picture: value.picture,
                section_id: value.section_id,
                student_name: value.student_name,
              })),
              offset: 0,
              numberPerPage: 2,
              pageCount: 0,
              currentData: [],
            });
            setStudents(
              json.message.data.map((value, index) => ({
                id: value.id,
                class_id: value.class_id,
                section_name: value.section_name,
                class_name: value.class_name,
                picture: value.picture,
                section_id: value.section_id,
                student_name: value.student_name,
              }))
            );
          } else
            toast.error(json.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          setLoading(1);
        });
    } catch (err) {
      console.log(err);
    }
  }, [arr]);
  useEffect(() => {
    if (searchInput != "") {
      try {
        if (
          students.filter((item) => {
            return String(item.student_name).includes(String(searchInput));
          }).length > 0
        ) {
          setPagination({
            data: students
              .filter((item) => {
                return String(item.student_name).includes(String(searchInput));
                //||
                // String(item.description).includes(String(searchInput))
              })
              .map((value, index) => ({
                id: value.id,
                class_id: value.class_id,
                section_name: value.section_name,
                class_name: value.class_name,
                section_id: value.section_id,
                picture: value.picture,
                student_name: value.student_name,
              })),
            offset: 0,
            numberPerPage: 2,
            pageCount: 0,
            currentData: [Pagination.data],
          });
          setCurrentPage(0);
        } else {
          setPagination({
            data: students,
            offset: 0,
            numberPerPage: 2,
            pageCount: 0,
            currentData: [Pagination.data],
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [searchInput]);

  useEffect(() => {
    if (Filter != []) {
      try {
        setPagination({
          data: students
            .filter((item) => {
              return (
                String(item.section_name) == String(Filter["section_name"]) ||
                String(item.class_name) == String(Filter["class_name"])
              );
            })
            .map((value, index) => ({
              id: value.id,
              class_id: value.class_id,
              section_name: value.section_name,
              class_name: value.class_name,
              picture: value.picture,
              section_id: value.section_id,
              student_name: value.student_name,
            })),
          offset: 0,
          numberPerPage: 2,
          pageCount: 0,
          currentData: [Pagination.data],
        });
        setCurrentPage(0);
      } catch (err) {
        console.log(err);
      }
    }
  }, [Filter]);

  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(
        Pagination.offset,
        Pagination.offset + Pagination.numberPerPage
      ),
    }));
  }, [, Pagination.numberPerPage, Pagination.offset, Pagination.data]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * Pagination.numberPerPage;
    setCurrentPage(selected);
    setPagination({ ...Pagination, offset });
  };
  function handleInputChange(e) {
    const { value, name } = e.target;
    console.log(11);
    // if (name == "section_name") {
    //   var newValue = value.split("(");
    //   SetStudent_info({
    //     ...student_info,
    //     [name]: newValue[0].trim(),
    //   });

    setFilter({
      [name]: value,
    });
  }

  const del = (id) => {
    try {
      fetch(`http://localhost:8000/api/Delete_Student/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          toast.info(json.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (json.status == 400) {
            // if (json.redirect == true) {
            //   window.location.replace(json.location);
            // }
          } else {
            const newList = Pagination.data.filter((item) => item.id !== id);

            setPagination({
              data: newList,
              offset: 0,
              numberPerPage: 2,
              pageCount: 0,
              currentData: [],
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading == 0) {
    return (
      <div style={{ position: "absolute", left: "50%" }}>
        <div
          style={{
            position: "relative",
            left: "-50%",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  } else {
    if (Pagination.data.length == 0)
      return (
        <Wrap>
          <Row>
            <Col sm={4}>
              {" "}
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Section</Form.Label>
                <Form.Control
                  as="select"
                  name="section_name"
                  onChange={handleInputChange}
                >
                  {sections.map((o) => (
                    <option key={o.section_name}>{o.section_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={4}>
              {" "}
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class_name"
                  onChange={handleInputChange}
                >
                  {classes.map((o) => (
                    <option key={o.class_name}>{o.class_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col className="left mb-2">
              <button
                className="btn btn-primary btn-circle btn-xl"
                style={{ borderRadius: "45%" }}
                onClick={toggleModalForm2}
              >
                Add
              </button>
            </Col>
          </Row>
          <Row>
            <Col sm={5}></Col>
            <Col sm={2}>No Students</Col>
            <Col sm={5}></Col>
          </Row>

          <AddModal
            show={OpenForm2}
            handleClose={handleClose2}
            arr={arr}
            setArray2={setArray2}
          />
        </Wrap>
      );
    else
      return (
        <Wrap>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Row>
            <Col sm={1}></Col>
            <Col sm={4}>
              {" "}
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Section</Form.Label>
                <Form.Control
                  as="select"
                  name="section_name"
                  onChange={handleInputChange}
                >
                  {sections.map((o) => (
                    <option key={o.section_name}>{o.section_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={4}>
              {" "}
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class_name"
                  onChange={handleInputChange}
                >
                  {classes.map((o) => (
                    <option key={o.class_name}>{o.class_name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col className="left mb-2">
              <button
                className="btn btn-primary btn-circle btn-xl"
                style={{ borderRadius: "45%" }}
                onClick={toggleModalForm2}
              >
                Add
              </button>
            </Col>
          </Row>

          <Table responsive="sm" className="mt-2">
            <thead style={{ background: "#C0C0C0" }}>
              <tr>
                <th>Picture</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Section</th>
                <th colSpan="2" className="text-center">
                  Modify
                </th>
              </tr>
            </thead>
            <TableBody>
              {Pagination.currentData &&
                Pagination.currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td sm={3}>
                      <Image
                        width={100}
                        height={100}
                        src={"http://localhost:8000/" + item.picture}
                        rounded
                      />
                    </td>{" "}
                    <td sm={3}>{item.student_name}</td>{" "}
                    <td sm>{item.class_name + "(" + item.class_id + ")"}</td>
                    <td sm>
                      {item.section_name + "(" + item.section_id + ")"}
                    </td>
                    <td sm>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          dispatch(EditID(item.id));
                          toggleModalForm();
                        }}

                        // onClick={async () => {
                        //    handleShow(item.id);
                        //    setId(item.id);
                        // }}
                      >
                        Edit
                      </button>
                    </td>
                    <td sm>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleShowDelete(item.id);
                          // del(item.id);
                          // setCurrentPage(0);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </TableBody>
          </Table>
          <ReactPaginate
            previousLabel={" ← Previous"}
            nextLabel={"Next → "}
            pageCount={Pagination.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
          <Suspense fallback={null}>
            <ModalEdit
              show={OpenForm}
              handleClose={handleClose}
              id={ID}
              arr={arr}
              setArray2={setArray2}
            />

            <AddModal
              show={OpenForm2}
              handleClose={handleClose2}
              arr={arr}
              setArray2={setArray2}
            />
            <Modal show={showDelete} onHide={handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this item?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  onClick={() => {
                    console.log(idDelete);
                    handleCloseDelete();
                    del(idDelete);
                    setCurrentPage(0);
                  }}
                >
                  Delete
                </Button>
                <Button variant="primary" onClick={handleCloseDelete}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Suspense>
        </Wrap>
      );
  }
}
export default Search;
