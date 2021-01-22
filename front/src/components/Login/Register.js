import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import lohinImg from "../../images/education.jpg";
const Register = () => {
  const [data, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    let dataa = new FormData();

    dataa.append("first_name", data.first_name);
    dataa.append("last_name", data.last_name);
    dataa.append("email", data.email);
    dataa.append("password", data.password);
    console.log(data.first_name);
    console.log("okk");

    fetch("http://localhost:8000/api/register", {
      method: "post",
      body: dataa,
    })
      .then((response) => {
        console.log(response);
        localstorage.setItem("token", response.data.access_token);
        <BrowserRouter>
          <Switch>
            <Route exact path="/admin/students"></Route>
          </Switch>
        </BrowserRouter>;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          label="First Name"
          placeholder="Enter First Name"
          type="text"
          onChange={(e) =>
            setState({
              ...data,
              first_name: e.target.value,
            })
          }
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          placeholder="Enter Last Name"
          type="text"
          onChange={(e) =>
            setState({
              ...data,
              last_name: e.target.value,
            })
          }
          fullWidth
          required
        />
        <TextField
          label="Email"
          placeholder="Enter Email"
          type="email"
          onChange={(e) =>
            setState({
              ...data,
              email: e.target.value,
            })
          }
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          onChange={(e) =>
            setState({
              ...data,
              password: e.target.value,
            })
          }
          fullWidth
          required
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          style={btnstyle}
          fullWidth
        >
          Submit
        </Button>
        <Typography></Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="/login">Log In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Register;
