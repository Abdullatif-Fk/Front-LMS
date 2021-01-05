import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { Wrap, TableBody } from "../globalStyle/global.js";

import { useSelector, useDispatch } from "react-redux";
import SectionID from "../../store/actions/SectionID";
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

function Index() {
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
  const [loading, setLoading] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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
    console.log(state.SectionID.SectionID);
    return state.SectionID.SectionID;
  });

  const [Pagination, setPagination] = useState({
    data: classes.map((value, index) => ({
      id: value.ID,
      name: value.name,
      max_students: value.max_students,
      class_name: value.class_name,
    })),
    offset: 0,
    numberPerPage: 2,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    try {
      fetch("http://localhost:8000/api/Sections", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status != 400) {
            console.log(json.message);
            setPagination({
              data: json.message.map((value, index) => ({
                id: value.ID,
                name: value.name,
                max_students: value.max_students,
                class_name: value.class_name,
              })),
              offset: 0,
              numberPerPage: 2,
              pageCount: 0,
              currentData: [],
            });
            Setclasses(
              json.message.map((value, index) => ({
                id: value.ID,
                name: value.name,
                max_students: value.max_students,
                class_name: value.class_name,
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
          classes.filter((item) => {
            return String(item.student_name).includes(String(searchInput));
          }).length > 0
        ) {
          setPagination({
            data: classes
              .filter((item) => {
                return String(item.student_name).includes(String(searchInput));
                //||
                // String(item.description).includes(String(searchInput))
              })
              .map((value, index) => ({
                id: value.id,
                name: value.name,
              })),
            offset: 0,
            numberPerPage: 2,
            pageCount: 0,
            currentData: [Pagination.data],
          });
          setCurrentPage(0);
        } else {
          setPagination({
            data: classes,
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

  const del = (id) => {
    try {
      fetch(`http://localhost:8000/api/Sections/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status == 400) {
            toast.error(json.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.info(json.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
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
            <Col className="left mb-2 text-center m-auto">
              <button
                className="btn btn-primary btn-circle btn-xl"
                onClick={toggleModalForm2}
              >
                Add New Sections
              </button>
            </Col>
          </Row>
          <Row>
            <Col sm={5}></Col>
            <Col sm={2}>No Classes</Col>
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
            <Col className="left mb-2 text-center m-auto">
              <button
                className="btn btn-primary btn-circle btn-xl"
                onClick={toggleModalForm2}
              >
                Add New Section
              </button>
            </Col>
          </Row>

          <Table responsive="sm" className="mt-2">
            <thead style={{ background: "#C0C0C0" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Max students</th>
                <th>Class name</th>
                <th colSpan="2" className="text-center">
                  Modify
                </th>
              </tr>
            </thead>
            <TableBody>
              {Pagination.currentData &&
                Pagination.currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.max_students}</td>
                    <td>{item.class_name}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-info mr-3"
                        onClick={() => {
                          dispatch(SectionID(item.id));
                          toggleModalForm();
                        }}

                        // onClick={async () => {
                        //    handleShow(item.id);
                        //    setId(item.id);
                        // }}
                      >
                        Edit
                      </button>

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
export default Index;
