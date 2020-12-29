import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { Wrap } from "./style.js";
import ModalEdit from "./ModalEdit";
import { ListGroup, Row, Col, Spinner, Modal, Button } from "react-bootstrap";
function Search() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setId] = useState("falsee");
  const [arr, setArray2] = useState(0);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(0);
  const [Pagination, setPagination] = useState({
    data: students.map((value, index) => ({
      id: value.id,
      class_id: value.class_id,
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
            setPagination({
              data: json.message.data.map((value, index) => ({
                id: value.id,
                class_id: value.class_id,
                section_id: value.section_id,
                student_name: value.student_name,
              })),
              offset: 0,
              numberPerPage: 1,
              pageCount: 0,
              currentData: [],
            });
          } else alert(json.message);
          setLoading(1);
        });
    } catch (err) {
      console.log(err);
    }
  }, [arr]);

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
      );
    else
      return (
        <Wrap>
          <ListGroup.Item>
            {Pagination.currentData &&
              Pagination.data.map((item, index) => (
                <Row key={item.id}>
                  <Col sm={3}>Student Name: {item.student_name}</Col>{" "}
                  <Col sm>Class: {item.class_id}</Col>
                  <Col sm>Section: {item.section_id}</Col>
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
          />

          <ModalEdit
            show={show}
            handleClose={handleClose}
            id={id}
            arr={arr}
            setArray2={setArray2}
          />
        </Wrap>
      );
  }
}
export default Search;
