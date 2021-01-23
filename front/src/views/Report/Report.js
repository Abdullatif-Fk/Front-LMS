import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Row, Form, Col, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";

//1- if for all days , required: student_id
//2- if for a day , required: student_id + date

//3- if for all days in specefic class , required:class_id
//4- if for all days in specefic class and section , required:class_id,section_id
//5- if for a day in specefi class and section :  class_id,section_id,date
//6- if for a day in specefic class :  class_id,date

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function Report() {
  const [repo_info, Setrepo_info] = useState([]);
  const [Sections, SetSections] = useState({});
  const [Classes, SetClasses] = useState({});
  const [Students, SetStudents] = useState({});

  const [SendData, SetSendData] = useState({});
  const classesss = useStyles();
  const [PrintReport] = useState([
    "all",
    "student",
    "student + date",
    "class",
    "section",
    "class + date",
    "section + date",
  ]);
  const [Value, setValue] = useState();

  function handleInputChange(e) {
    // Setrepo_info({});
    console.log(SendData.date_from);
    const { value, name } = e.target;
    if (name == "value") {
      setValue({
        [name]: value,
      });
      if (value == "all") SetSendData({});
      if (value == "student")
        SetSendData({
          student_id: SendData.student_id
            ? SendData.student_id
            : Students[0].id,
        });
      if (value == "student + date")
        SetSendData({
          student_id: SendData.student_id
            ? SendData.student_id
            : Students[0].id,
          date_from: SendData.date_from ? SendData.date_from : "",
          date_to: SendData.date_to ? SendData.date_to : "",
        });
      if (value == "class")
        SetSendData({
          class_id: SendData.class_id ? SendData.class_id : Classes[0].class_id,
        });
      if (value == "section") {
        console.log(
          Sections.filter((o) => SendData.class_id == o.class_id).map((o) => {
            return o.id;
          })[0]
        );

        SetSendData({
          class_id: SendData.class_id ? SendData.class_id : Classes[0].class_id,
          // section_id: SendData.section_id
          //   ? SendData.section_id
          //   : Sections[0].id,
          section_id: Sections.filter((o) =>
            SendData.class_id
              ? SendData.class_id
              : Classes[0].class_id == o.class_id
          ).map((o) => {
            console.log(o);
            return o.id;
          })[0],
        });
      }

      if (value == "class + date")
        SetSendData({
          class_id: SendData.class_id ? SendData.class_id : Classes[0].class_id,
          date_from: SendData.date_from ? SendData.date_from : "",
          date_to: SendData.date_to ? SendData.date_to : "",
        });
      if (value == "section + date")
        SetSendData({
          class_id: SendData.class_id ? SendData.class_id : Classes[0].class_id,
          date_from: SendData.date_from ? SendData.date_from : "",
          date_to: SendData.date_to ? SendData.date_to : "",
          // section_id: SendData.section_id
          //   ? SendData.section_id
          //   : Sections[0].id,
          section_id: Sections.filter((o) =>
            SendData.class_id
              ? SendData.class_id
              : Classes[0].class_id == o.class_id
          ).map((o) => {
            console.log(o.id);
            return o.id;
          })[0],
        });
    } else {
      if (name == "class_id")
        SetSendData({
          ...SendData,
          // ["section_id"]: Sections.filter((o) =>
          //   SendData.class_id
          //     ? SendData.class_id
          //     : Classes[0].class_id == o.class_id
          // ).map((o) => {
          //   return o.id;
          // })[0],

          [name]: value,
        });
      else
        SetSendData({
          ...SendData,
          [name]: value,
        });
    }
    console.log(SendData);
  }
  useEffect(() => {
    switch (Value) {
      case "all":
    }
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

            SetStudents(
              json.message.map((value) => ({
                id: value.id,
                section_name: value.section_name,
                class_name: value.class_name,
                student_name: value.student_name,
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

  useEffect(() => {
    try {
      fetch("http://localhost:8000/api/Sections", {
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
            SetSections(
              json.message.map((value) => ({
                id: value.ID,
                name: value.name,
                class_id: value.class_id,
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

  useEffect(() => {
    fetch(`http://localhost:8000/api/Fetch_Classes`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status == 200) {
          SetClasses(json.message);
          console.log(json.message);
        }
      });
  }, []);

  useEffect(() => {
    if (repo_info.length > 0)
      try {
        //1- if for all days , required: student_id
        //2- if for a day , required: student_id + date

        //3- if for all days in specefic class , required:class_id
        //4- if for all days in specefic class and section , required:class_id,section_id
        //5- if for a day in specefi class and section :  class_id,section_id,date
        //6- if for a day in specefic class :  class_id,date
        var columns,
          rows = [];
        var x;

        var doc = new jsPDF("p", "pt");
        if (
          SendData.student_id != undefined &&
          SendData.date_from == undefined
        ) {
          if (repo_info[0].length < 1) {
            console.log(repo_info[0].length);
            toast.info("Report empty", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            x = function isStudent(std) {
              return std.id == SendData.student_id;
            };

            doc.text(`Student : ${Students.find(x).student_name}`, 25, 40);

            columns = [["ID", "Date", "Student_id", "Attendance"]];

            // console.log(repo_info[0]);
            rows = repo_info[0].map((u) => {
              const row = [
                u.id,
                u.date,
                u.student_id,
                u.attendance_id == 0
                  ? "Presence"
                  : u.attendance_id == 1
                  ? "Late"
                  : "Absent",
                u.date,
              ];
              return row;
            });
          }
        } else {
          if (
            SendData.student_id == undefined &&
            SendData.class_id == undefined
          ) {
            if (repo_info[0].length < 1)
              toast.error("Report empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            else {
              doc.text(`Attendances for all students`, 25, 40);

              columns = [
                ["ID", "Date", "Student_id", "Student Name", "Attendance"],
              ];

              rows = repo_info[0].map((u) => {
                const row = [
                  u.id,
                  u.date,
                  u.student_id,
                  u.name,
                  u.attendance_id == 0
                    ? "Presence"
                    : u.attendance_id == 1
                    ? "Late"
                    : "Absent",
                  u.date,
                ];
                return row;
              });
            }
          }
          if (
            SendData.student_id != undefined &&
            SendData.date_from != undefined
          ) {
            if (repo_info[0].length < 1)
              toast.error("Report empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            else {
              x = function isStudent(std) {
                return std.id == SendData.student_id;
              };

              doc.text(`Student : ${Students.find(x).student_name}`, 25, 40);

              columns = [["ID", "Date", "Student_id", "Attendance"]];

              rows = repo_info[0].map((u) => {
                const row = [
                  u.id,
                  u.date,
                  u.student_id,
                  u.attendance_id == 0
                    ? "Presence"
                    : u.attendance_id == 1
                    ? "Late"
                    : "Absent",
                  u.date,
                ];
                return row;
              });
            }
          }
          if (
            SendData.student_id == undefined &&
            SendData.date_from == undefined &&
            SendData.class_id != undefined &&
            SendData.section_id == undefined
          ) {
            if (repo_info[0].length < 1) {
              console.log(repo_info[0].length);
              toast.info("Report empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              doc.text(`Class : ${repo_info[0][0].class_name}`, 25, 40);
              columns = [
                ["ID", "Date", "Class Name", "Student Name", "Attendance"],
              ];
              rows = repo_info.map((u) => {
                const row = [
                  u[0].id,
                  u[0].date,

                  u[0].class_name,
                  u[0].name,
                  u[0].attendance_id == 0
                    ? "Presence"
                    : u[0].attendance_id == 1
                    ? "Late"
                    : "Absent",
                  u[0].date,
                ];
                return row;
              });
            }
          }

          if (
            SendData.student_id == undefined &&
            SendData.date_from == undefined &&
            SendData.class_id != undefined &&
            SendData.section_id != undefined
          ) {
            if (repo_info[0].length < 1) {
              console.log(repo_info[0].length);
              toast.info("Report empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              doc.text(
                `Class : ${repo_info[0][0].class_name} , Section : ${repo_info[0][0].section_name}`,
                25,
                40
              );

              // section_name: "don't know"

              columns = [
                ["ID", "Date", "Class Name", "Student Name", "Attendance"],
              ];
              rows = repo_info.map((u) => {
                const row = [
                  u[0].id,
                  u[0].date,

                  u[0].class_name,
                  u[0].name,
                  u[0].attendance_id == 0
                    ? "Presence"
                    : u[0].attendance_id == 1
                    ? "Late"
                    : "Absent",
                  u[0].date,
                ];
                return row;
              });
            }
          }
          if (
            SendData.student_id == undefined &&
            SendData.date_from != undefined &&
            SendData.class_id != undefined &&
            SendData.section_id != undefined
          ) {
            if (repo_info[0].length < 1) {
              console.log(repo_info[0].length);
              toast.info("Report empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              console.log(22);
              doc.setFontSize(25);
              doc.text(
                `Class : ${repo_info[0][0].class_name} , Section : ${repo_info[0][0].section_name}`,
                25,
                25
              );

              doc.setFontSize(15);
              doc.text(
                `(Between ${SendData.date_from} and ${SendData.date_to})`,
                25,
                50,

                { styles: { fontSize: 100 } }
              );

              columns = [
                ["ID", "Date", "Class Name", "Student Name", "Attendance"],
              ];
              rows = repo_info.map((u) => {
                const row = [
                  u[0].id,
                  u[0].date,

                  u[0].class_name,
                  u[0].name,
                  u[0].attendance_id == 0
                    ? "Presence"
                    : u[0].attendance_id == 1
                    ? "Late"
                    : "Absent",
                  u[0].date,
                ];
                return row;
              });
            }
          }
          if (
            SendData.student_id == undefined &&
            SendData.date_from != undefined &&
            SendData.class_id != undefined &&
            SendData.section_id == undefined
          ) {
            //

            if (repo_info[0].length < 1) {
              console.log(repo_info[0].length);
              toast.info("Report empty", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              doc.text(`Class : ${repo_info[0][0].class_name}`, 25, 40);
              columns = [
                ["ID", "Date", "Class Name", "Student Name", "Attendance"],
              ];
              rows = repo_info.map((u) => {
                const row = [
                  u[0].id,
                  u[0].date,

                  u[0].class_name,
                  u[0].name,
                  u[0].attendance_id == 0
                    ? "Presence"
                    : u[0].attendance_id == 1
                    ? "Late"
                    : "Absent",
                  u[0].date,
                ];
                return row;
              });
            }
          }
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(35);
        console.log(repo_info);

        if (rows.length > 0) {
          doc.autoTable({
            head: columns,
            body: rows,
            startY: 60,
          });

          doc.save("report.pdf");
        }
        console.log(repo_info);
      } catch (err) {
        console.log(err);
      }
  }, [repo_info]);

  const generatePDF = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();
      console.log(SendData);
      body.append("class_id", SendData.class_id);
      body.append("student_id", SendData.student_id);
      body.append("section_id", SendData.section_id);
      body.append("date_from", SendData.date_from);
      body.append("date_to", SendData.date_to);

      await fetch(`http://localhost:8000/api/Students_Attendance`, {
        method: "post",
        body: body,
      })
        .then((res) => {
          // console.log(res.json());
          return res.json();
        })
        .then((json) => {
          console.log(json.message);
          Setrepo_info(json.message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classesss.cardTitleWhite}>Report</h4>
        <p className={classesss.cardCategoryWhite}>
          Download your PDf report .
        </p>
      </CardHeader>

      <Col xs={12} md={6}>
        <CardBody>
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
          <Form onSubmit={generatePDF}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Section</Form.Label>
              <Form.Control
                as="select"
                name="value"
                onChange={handleInputChange}
              >
                {PrintReport.map((o) =>
                  Value == o ? (
                    <option key={o} selected>
                      {o}
                    </option>
                  ) : (
                    <option key={o}>{o}</option>
                  )
                )}
              </Form.Control>
            </Form.Group>

            {SendData.student_id != undefined ? (
              <Row>
                <Form.Group controlId="exampleForm.ControlSelect0">
                  <Form.Label>Select Student</Form.Label>
                  {Object.keys(Students).length != 0 && (
                    <Form.Control
                      as="select"
                      required
                      name="student_id"
                      onChange={handleInputChange}
                    >
                      {Object.keys(Students).length != 0 &&
                        Students.map((o) => (
                          <option key={o.id} value={o.id}>
                            {`${o.student_name}  (
                      Class:${o.class_name} , section :${o.section_name}
                    )`}
                          </option>
                        ))}
                    </Form.Control>
                  )}
                </Form.Group>
              </Row>
            ) : (
              ""
            )}
            {SendData.class_id != undefined ? (
              <Row>
                <Form.Group controlId="exampleForm.ControlSelect2">
                  <Form.Label>Select Class</Form.Label>
                  <Form.Control
                    as="select"
                    required
                    name="class_id"
                    onChange={handleInputChange}
                  >
                    {Object.keys(Classes).length != 0 &&
                      Classes.map((o) => (
                        <option key={o.class_name} value={o.class_id}>
                          {o.class_name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Row>
            ) : (
              ""
            )}
            {SendData.section_id != undefined ? (
              <Row>
                {console.log(SendData)}
                <Form.Group controlId="exampleForm.ControlSelect3">
                  <Form.Label>Select Section</Form.Label>
                  <Form.Control
                    as="select"
                    name="section_id"
                    required
                    onChange={handleInputChange}
                  >
                    {Object.keys(Sections).length != 0 &&
                      Sections.map((o) =>
                        SendData.class_id == o.class_id ? (
                          SendData.section_id == o.id ? (
                            <option key={o.id} value={o.id}>
                              {o.name}
                            </option>
                          ) : (
                            <option key={o.id} value={o.id}>
                              {o.name}
                            </option>
                          )
                        ) : (
                          ""
                        )
                      )}
                  </Form.Control>
                </Form.Group>
              </Row>
            ) : (
              ""
            )}
            {SendData.date_to != undefined &&
            SendData.date_from != undefined ? (
              <Row>
                <Form.Group controlId="exampleForm.ControlSelect4">
                  <Form.Label>Select date from</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_from"
                    required
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
              </Row>
            ) : (
              ""
            )}
            {SendData.date_to != undefined &&
            SendData.date_from != undefined ? (
              <Row>
                <Form.Group controlId="exampleForm.ControlSelect4">
                  <Form.Label>Select date to</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_to"
                    required
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
              </Row>
            ) : (
              ""
            )}
            <Button variant="primary" type="submit" className="mt-3">
              Download
            </Button>
          </Form>
          {/* <button onClick={generatePDF}>click me</button>; */}
        </CardBody>
      </Col>
    </Card>
  );
}
