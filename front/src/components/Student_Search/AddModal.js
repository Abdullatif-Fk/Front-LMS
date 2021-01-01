import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./ModalStyle.scss";
function AddModal({ show, handleClose, arr, setArray2 }) {
  const [student_info, SetStudent_info] = useState([]);
  const [sections, SetSections] = useState([]);

  function handleInputChange(e) {
    const { value, name } = e.target;
    if (name == "Image") {
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
    fetch(`http://localhost:8000/api/Add_Student`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        student_info: student_info,
        email: student_info.email,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.message);
        if (json.status == 400) {
          alert(json.message);
        } else {
          alert(json.message);
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
        <Form className="ModalStyle">
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
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.File type="file" name="Image" onChange={handleInputChange} />
          </Form.Group> */}
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
