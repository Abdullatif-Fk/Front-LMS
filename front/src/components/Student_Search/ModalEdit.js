import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./ModalStyle.scss";
function ModalEdit({ show, handleClose, id, arr, setArray2 }) {
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
      SetStudent_info({
        ...student_info,
        [name]: value,
      });
    }
  }
  function submit(e) {
    fetch(`http://localhost:8000/api/Edit_Student/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ student_info: student_info }),
    })
      .then((res) => res.json())
      .then((json) => {
        setArray2(arr + 1);
        handleClose();
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

          <Form.Group controlId="formBasicsectionname">
            <Form.Label>Section Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Section name"
              name="section_name"
              value={student_info.section_name}
            />
          </Form.Group>
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
            <Form.Label>Select Class</Form.Label>
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
                  </option>
                ) : (
                  <option key={o.section_name}>{o.section_name}</option>
                )
              )}
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
export default ModalEdit;
