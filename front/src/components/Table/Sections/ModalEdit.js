/* eslint react/prop-types: 0 */

import { Modal, Button, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./ModalStyle.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalEdit({ show, handleClose, id, arr, setArray2 }) {
  const [Section, SetSection] = useState([]);

  const [classes, Setclasses] = useState([]);
  function handleInputChange(e) {
    const { value, name } = e.target;
    if (name == "class_id")
      SetSection({
        ...Section,
        [name]: value,
      });
    else
      SetSection({
        ...Section,
        [name]: value,
      });
    console.log(Section);
  }

  useEffect(() => {
    try {
      fetch("http://localhost:8000/api/Classes", {
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
            Setclasses(
              json.message.map((value) => ({
                id: value.ID,
                name: value.name,
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
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  function submit(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/api/Sections/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Section.name,
        max_students: Section.max_students,
        class_id: Section.class_id,
        class_name: Section.class_name,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.message);
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
          setArray2(arr + 1);
          toast.info(json.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          handleClose();
        }
      });
  }
  useEffect(() => {
    try {
      console.log(id);
      if (id != "") {
        //Fetch_Student_By_Id
        fetch(`http://localhost:8000/api/Sections/${id}`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.status != 400) SetSection(json.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [show]);
  if (Section.length < 1) {
    console.log(555555555555555555555, Section);
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
  } else
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
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
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="ModalStyle" onSubmit={submit}>
            <Form.Group controlId="formBasicfirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter your name"
                name="name"
                defaultValue={Section.name}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Max Students</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter max nb of students"
                name="max_students"
                defaultValue={Section.max_students}
                onChange={handleInputChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Class</Form.Label>
              <Form.Control
                required
                as="select"
                name="class_id"
                onChange={handleInputChange}
              >
                {classes.map((o) =>
                  o.name == Section.class_name ? (
                    <option key={o.id} value={o.id} selected>
                      {o.name}
                    </option>
                  ) : (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
export default ModalEdit;
