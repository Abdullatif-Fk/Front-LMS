import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { Wrap } from "./style.js";
import ModalEdit from "./ModalEdit";

import AddModal from "./AddModal";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Row, Col, Spinner, Modal, Button } from "react-bootstrap";
function Search() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

  const [id, setId] = useState("falsee");
  const [arr, setArray2] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const searchInput = useSelector((state) => {
    return state.Searching.search;
  });
  const [Pagination, setPagination] = useState({
    data: students.map((value, index) => ({
      id: value.id,
      class_id: value.class_id,
      section_name: value.section_name,
      section_id: value.section_id,
      student_name: value.student_name,
    })),
    offset: 0,
    numberPerPage: 1,
    pageCount: 0,
    currentData: [],
  });

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
                section_id: value.section_id,
                student_name: value.student_name,
              })),
              offset: 0,
              numberPerPage: 1,
              pageCount: 0,
              currentData: [],
            });
            setStudents(
              json.message.data.map((value, index) => ({
                id: value.id,
                class_id: value.class_id,
                section_name: value.section_name,
                class_name: value.class_name,
                section_id: value.section_id,
                student_name: value.student_name,
              }))
            );
          } else alert(json.message);
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
                student_name: value.student_name,
              })),
            offset: 0,
            numberPerPage: 1,
            pageCount: 0,
            currentData: [Pagination.data],
          });
        } else {
          setPagination({
            data: students,
            offset: 0,
            numberPerPage: 1,
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
      if (window.confirm("Delete the item?"))
        fetch(`http://localhost:8000/api/Delete_Student/${id}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            alert(json.message);
            if (json.status == 400) {
              // if (json.redirect == true) {
              //   window.location.replace(json.location);
              // }
            } else {
              const newList = Pagination.data.filter((item) => item.id !== id);

              setPagination({
                data: newList,
                offset: 0,
                numberPerPage: 1,
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
            <Col sm={9}></Col>
            <Col className="left mb-2">
              <button
                className="btn btn-primary btn-circle btn-xl"
                style={{ borderRadius: "45%" }}
                onClick={handleShow2}
              >
                Add
              </button>
            </Col>
          </Row>
          <div style={{ position: "absolute", left: "50%" }}>
            <div
              style={{
                position: "relative",
                left: "-50%",
              }}
            >
              Couldn't find any student...
            </div>
          </div>
          <AddModal
            show={show2}
            handleClose={handleClose2}
            arr={arr}
            setArray2={setArray2}
          />
        </Wrap>
      );
    else
      return (
        <Wrap>
          <Row>
            <Col sm={9}></Col>
            <Col className="left mb-2">
              <button
                className="btn btn-primary btn-circle btn-xl"
                style={{ borderRadius: "45%" }}
                onClick={handleShow2}
              >
                Add
              </button>
            </Col>
          </Row>

          <ListGroup.Item>
            {Pagination.currentData &&
              Pagination.currentData.map((item, index) => (
                <Row key={item.id}>
                  <Col sm={3}>
                    <b>Student Name: </b>
                    {item.student_name}
                  </Col>{" "}
                  <Col sm>
                    <b>Class:</b> {item.class_name + "(" + item.class_id + ")"}
                  </Col>
                  <Col sm>
                    <b>Section:</b>{" "}
                    {item.section_name + "(" + item.section_id + ")"}
                  </Col>
                  <Col sm>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setId(item.id);
                        handleShow();
                      }}
                    >
                      Edit
                    </button>
                  </Col>
                  <Col sm>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        del(item.id);
                        setCurrentPage(0);
                      }}
                    >
                      Delete
                    </button>
                  </Col>
                </Row>
              ))}
          </ListGroup.Item>
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
          <ModalEdit
            show={show}
            handleClose={handleClose}
            id={id}
            arr={arr}
            setArray2={setArray2}
          />
          <AddModal
            show={show2}
            handleClose={handleClose2}
            arr={arr}
            setArray2={setArray2}
          />
        </Wrap>
      );
  }
}
export default Search;
