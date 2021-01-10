import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Form } from "react-bootstrap";
import { useState } from "react";
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
// 'first_name',
// 'last_name',
// 'email',
// 'password',
// 'phone_number',
// 'picture'
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
    e.preventDefault();

    const body = new FormData();

    body.append("phone_number", admin_info.phone_number);
    body.append("last_name", admin_info.last_name);
    body.append("first_name", admin_info.first_name);
    body.append("email", admin_info.email);
    body.append("password", admin_info.password);
    body.append("repeat_password", admin_info.repeat_password);
    body.append("picture", admin_info.picture);

    console.log(admin_info);

    console.log(body);
    fetch(`http://localhost:8000/api/Add_Admin`, {
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

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
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
            <Form onSubmit={submit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete their profile
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
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

                        name: "email",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Phone number"
                      id="phone"
                      required
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: (event) => handleChange(event),
                        placeholder: "Phone nb",
                        type: "phone",

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
                      required
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: (event) => handleChange(event),
                        placeholder: "First name",
                        type: "text",

                        name: "first_name",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      required
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: (event) => handleChange(event),
                        placeholder: "Last name",
                        type: "text",

                        name: "last_name",
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Password (required)"
                      id="new-pass"
                      required="TRUE"
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: (event) => handleChange(event),
                        placeholder: "password",
                        type: "password",

                        name: "password",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Retype password (required)"
                      id="retype"
                      required="required"
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: (event) => handleChange(event),
                        placeholder: "repeat password",
                        type: "password",

                        name: "repeat_password",
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {" "}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Photo"
                      id="photo"
                      required="required"
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
                  Add Profile
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
