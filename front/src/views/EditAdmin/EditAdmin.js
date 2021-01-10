import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Spinner, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [admin_info, setAdmin_info] = useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    if (name == "picture") {
      setAdmin_info({
        ...admin_info,
        [name]: e.target.files[0],
      });
    } else {
      setAdmin_info({
        ...admin_info,
        [name]: value,
      });
    }
  }
  function submit(e) {
    var id = 8;
    e.preventDefault();

    const body = new FormData();

    body.append("phone_number", admin_info.phone_number);
    body.append("last_name", admin_info.last_name);
    body.append("first_name", admin_info.first_name);
    body.append("email", admin_info.email);
    body.append("old_password", admin_info.old_password);
    body.append("new_password", admin_info.new_password);
    body.append("repeat_new_password", admin_info.repeat_new_password);
    body.append("picture", admin_info.picture);

    console.log(admin_info);

    console.log(body);
    fetch(`http://localhost:8000/api/Edit_Admin/${id}`, {
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
          window.location.replace("/");
        }
      });
  }
  useEffect(() => {
    var id = 8;
    try {
      if (id != "") {
        fetch(`http://localhost:8000/api/Fetch_Admin_By_Id/${id}`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setAdmin_info(json.message);
            console.log(json.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      {admin_info.id &&
      admin_info.email &&
      admin_info.picture &&
      admin_info.phone_number ? (
        <GridContainer>
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
          <GridItem xs={12} sm={12} md={8}>
            <Form onSubmit={submit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                  <p className={classes.cardCategoryWhite}>Edit your profile</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Active Admin (disabled)"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          disabled: true,
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "Email",
                          type: "email",
                          defaultValue: admin_info.email,
                          name: "email",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Phone number"
                        id="phone"
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "Phone nb",
                          type: "text",
                          defaultValue: admin_info.phone_number,
                          name: "phone_number",
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "First name",
                          type: "text",
                          defaultValue: admin_info.first_name,
                          name: "first_name",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "Last name",
                          type: "text",
                          defaultValue: admin_info.last_name,
                          name: "last_name",
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Old password (required)"
                        id="country"
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "old password",
                          type: "text",

                          name: "old_password",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="New password (optional)"
                        id="new-pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "New pass",
                          type: "text",

                          name: "new_password",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Retype password (optional)"
                        id="retype"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "New pass",
                          type: "text",

                          name: "repeat_new_password",
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    {" "}
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Your Photo"
                        id="photo"
                        formControlProps={{
                          fullWidth: true,
                          required: true,
                        }}
                        inputProps={{
                          onChange: (event) => handleChange(event),
                          placeholder: "Image",
                          type: "file",
                          name: "picture",
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit">
                    Update Profile
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    src={"http://localhost:8000/" + admin_info.picture}
                    alt="..."
                  />
                </a>
              </CardAvatar>
              <CardBody profile></CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      ) : (
        <div style={{ position: "absolute", left: "50%", top: "50%" }}>
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
      )}
    </div>
  );
}
