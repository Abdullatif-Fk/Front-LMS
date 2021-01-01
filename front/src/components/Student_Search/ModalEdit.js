import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./ModalStyle.scss";
function ModalEdit({ show, handleClose, id, arr, setArray2 }) {
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
    console.log(student_info);
    body.append("picture", student_info.picture);
    body.append("phone_number", student_info.phone_number);
    body.append("last_name", student_info.last_name);
    body.append("first_name", student_info.first_name);
    body.append("email", student_info.email);
    body.append("section_name", student_info.section_name);
    console.log(body);
    fetch(`http://localhost:8000/api/Edit_Student/${id}`, {
      method: "post",

      body: body,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.message);
        if (json.status == 400) {
          alert(json.message);
        } else {
          setArray2(arr + 1);
          handleClose();
        }
      });
  }
  useEffect(() => {
    try {
      if (id != "falsee") {
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

        fetch(`http://localhost:8000/api/Fetch_Student_By_Id/${id}`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            SetStudent_info(json.message);
            console.log(student_info);
          });
      }
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
              defaultValue={student_info.first_name}
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
              defaultValue={student_info.last_name}
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
              defaultValue={student_info.email}
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
              defaultValue={student_info.phone_number}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/* <Form.Group controlId="formBasicsectionname">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Class name"
              name="section_name"
              value={student_info.class_name}
            />
          </Form.Group> */}

          {/* <Form.Group controlId="formBasicPassword">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Class name"
              name="class_name"
              defaultValue={student_info.class_name}
              onChange={handleInputChange}
            />
          </Form.Group> */}
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select Section</Form.Label>
            <Form.Control
              as="select"
              name="section_name"
              defaultValue={student_info.section_name}
              onChange={handleInputChange}
            >
              {sections.map((o) =>
                o.section_name == student_info.section_name ? (
                  <option key={o.section_name} selected>
                    {o.section_name}
                    {" ( "} Class: {o.class_name}
                    {" ) "}
                  </option>
                ) : (
                  <option key={o.section_name}>
                    {o.section_name}
                    {" ( "} Class: {o.class_name} {" ) "}
                  </option>
                )
              )}
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
export default ModalEdit;
