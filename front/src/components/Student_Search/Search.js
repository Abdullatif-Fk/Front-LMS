import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { Wrap } from "./style.js";
import { ListGroup, Row, Col, Spinner } from "react-bootstrap";
function Search() {
  const [students, setStudents] = useState([]);
  const [arr, setArray2] = useState(0);
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
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

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

  if (Pagination.data.length == 0) {
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
    return (
      <Wrap>
        <ListGroup.Item>
          {Pagination.currentData &&
            Pagination.currentData.map((item, index) => (
              <Row key={item.id}>
                <Col sm={3}>Student Name: {item.student_name}</Col>{" "}
                <Col sm>Class: {item.class_id}</Col>
                <Col sm>Section: {item.section_id}</Col>
                <Col sm>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      // toggleModalForm();
                      // setId(item._id);
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
      </Wrap>
    );
  }
}
export default Search;
