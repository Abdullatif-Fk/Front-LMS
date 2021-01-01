import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./ModalStyle.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddModal({ show, handleClose, arr, setArray2 }) {
  const [student_info, SetStudent_info] = useState([]);
  const [sections, SetSections] = useState([]);

  function handleInputChange(e) {
    const { value, name } = e.target;
    if (name == "picture") {
      SetStudent_info({
        ...student_info,
        [name]: e.target.files[0],
      });
    } else {
      if (name == "section_name") {
        var newValue = value.split("(");
        SetStudent_info({
          ...student_info,
          [name]: newValue[0].trim(),
        });
      } else
        SetStudent_info({
          ...student_info,
          [name]: value,
        });
    }
  }
  function submit(e) {
    const body = new FormData();

    body.append("picture", student_info.picture);
    body.append("phone_number", student_info.phone_number);
    body.append("last_name", student_info.last_name);
    body.append("first_name", student_info.first_name);
    body.append("email", student_info.email);
    body.append("section_name", student_info.section_name);

    console.log(body);
    fetch(`http://localhost:8000/api/Add_Student`, {
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
  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/Fetch_Sections`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          SetStudent_info({
            ...student_info,
            ["section_name"]: json.message[0].section_name,
          });
          SetSections(json.message);
        });
    } catch (err) {
      console.log(err);
    }
  }, [show]);
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="ModalStyle" encType="multipart/form-data">
          <Form.Group controlId="formBasicfirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="first_name"
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasiclastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              name="last_name"
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone nb</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone"
              name="phone_number"
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Section</Form.Label>
            <Form.Control
              as="select"
              name="section_name"
              onChange={handleInputChange}
            >
              {sections.map((o) => (
                <option key={o.section_name}>
                  {o.section_name}
                  {" ( "} Class: {o.class_name}
                  {" ) "}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.File
              type="file"
              name="picture"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submit}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddModal;
