import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactPaginate from "react-paginate";

import { useSelector, useDispatch } from "react-redux";
import EditID from "../../store/actions/EditID";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Students/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Students() {
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
    console.log(state);
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
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) SetSections(json.message);
      });

    fetch(`http://localhost:8000/api/Fetch_Classes`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) Setclasses(json.message);
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
              data: json.message.map((value, index) => ({
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
              json.message.map((value, index) => ({
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
  useEffect(async () => {
    if (searchInput != "") {
      try {
        if (
          students.filter((item) => {
            return String(item.student_name).includes(String(searchInput));
          }).length > 0
        ) {
          await setPagination({
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
    console.log(Object.keys(Filter).length);
    if (Object.keys(Filter).length > 0) {
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

  const classes = useStyles();
  if (
    loading == 0 ||
    Object.keys(classes).length < 1 ||
    Object.keys(sections).length < 1
  ) {
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
        <Col>
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
                  {sections.map((o) =>
                    Filter["section_name"] == o.section_name ? (
                      <option key={o.section_id} selected>
                        {o.section_name}
                      </option>
                    ) : (
                      <option key={o.section_id}>{o.section_name}</option>
                    )
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={4}>
              {" "}
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Select Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class_name"
                  onChange={handleInputChange}
                >
                  {classes.map((o) =>
                    Filter["section_name"] == o.section_name ? (
                      <option key={o.class_name} selected>
                        {o.class_name}
                      </option>
                    ) : (
                      <option key={o.class_name}>{o.class_name}</option>
                    )
                  )}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col className="left mb-2 text-center m-auto">
              <button
                className="btn btn-primary btn-circle btn-xl"
                onClick={toggleModalForm2}
              >
                Add New Student
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
        </Col>
      );
    else
      return (
        <GridContainer>
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
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Students Table</h4>
                <p className={classes.cardCategoryWhite}></p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Country", "City", "Salary"]}
                  tableData={[
                    ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                    ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                    ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                    [
                      "Philip Chaney",
                      "Korea, South",
                      "Overland Park",
                      "$35555735",
                    ],
                    [
                      "Doris Greene",
                      "Malawi",
                      "Feldkirchen in Kärnten",
                      "$63,542",
                    ],
                    ["Mason Porter", "Chile", "Gloucester", "$78,615"],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
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
              setCurrentPage={setCurrentPage}
            />

            <AddModal
              show={OpenForm2}
              handleClose={handleClose2}
              arr={arr}
              setArray2={setArray2}
              setCurrentPage={setCurrentPage}
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
        </GridContainer>
      );
  }
}
