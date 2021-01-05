import { Modal, Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./ModalStyle.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalEdit({ show, handleClose, id, arr, setArray2 }) {
  const [Class, Setclass] = useState([]);

  function handleInputChange(e) {
    const { value, name } = e.target;

    Setclass({
      ...Class,
      [name]: value,
    });
  }

  function submit(e) {
    e.preventDefault();
    fetch(`http://localhost:8000/api/Classes/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: Class.name }),
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
      if (id != "") {
        //Fetch_Student_By_Id
        fetch(`http://localhost:8000/api/Classes/${id}`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            Setclass(json.message);
            console.log(json.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [show, id]);
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
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter your name"
              name="name"
              defaultValue={Class.name}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted"></Form.Text>
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
