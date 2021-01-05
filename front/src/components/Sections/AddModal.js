import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./ModalStyle.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddModal({ show, handleClose, arr, setArray2 }) {
  const [section_info, Setsection_info] = useState([]);
  const [classes, Setclasses] = useState([]);

  function handleInputChange(e) {
    const { value, name } = e.target;
    console.log(e.target);
    if (name == "class_id")
      Setsection_info({
        ...section_info,
        [name]: value,
      });
    else
      Setsection_info({
        ...section_info,
        [name]: value,
      });
    console.log(section_info);
  }

  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/Classes`, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json.message[0]);
          Setsection_info({
            ...section_info,
            ["class_id"]: json.message[0].ID,
          });
          Setclasses(json.message);
        });
    } catch (err) {
      console.log(err);
    }
  }, [show]);

  function submit(e) {
    e.preventDefault();
    const body = new FormData();

    body.append("name", section_info.name);
    body.append("max_students", section_info.max_students);
    body.append("class_id", section_info.class_id);

    console.log(body);
    fetch(`http://localhost:8000/api/Sections`, {
      method: "post",
      body: body,
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
          toast.info(json.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setArray2(arr + 1);
          handleClose();
        }
      });
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
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
            <Form.Label>Section Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your section name"
              name="name"
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
              {classes.map((o) => (
                <option key={o.ID} value={o.ID}>
                  {o.name}
                </option>
              ))}
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
export default AddModal;
