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
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Router,
  useHistory,
} from "react-router-dom";
import { Provider } from "react-redux";
import Admin from "layouts/Admin.js";
// import { localStorage } from "localstorage-polyfill";

import lohinImg from "../../images/education.jpg";

import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();
import { useDispatch } from "react-redux/lib/hooks/useDispatch";

// const dispatch = useDispatch();

let path = "";
const Login = () => {
  // const [data, setState] = useState({
  //     email: '',
  //     password: ''
  // });
  const [adminData, setAdminData] = useState({
    token: undefined,
  });
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(listProducts());
    console.log(adminData);
    path = "";

    let dataa = new FormData();

    dataa.append("email", adminData.email);
    dataa.append("password", adminData.password);

    fetch("http://localhost:8000/api/login", {
      method: "post",
      body: dataa,
    })
      // axios
      //   .post("http://localhost:8000/api/login", adminData)
      .then((res) => res.json())
      .then((json) => {
        // console.log(adminData);
        if (json.status == 200) {
          console.log(json.access_token);
          adminData.token = json.access_token;
          console.log(adminData);
          localStorage.setItem("token", json.access_token);
          localStorage.setItem("id", json.admin.id);
          history.push("/");
          history.replace("/admin/reload");
        } else {
          alert(json.error);
        }
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
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter Email"
          onChange={(e) =>
            setAdminData({
              ...adminData,
              email: e.target.value,
            })
          }
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          onChange={(e) =>
            setAdminData({
              ...adminData,
              password: e.target.value,
            })
          }
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
          style={btnstyle}
          onClick={handleSubmit}
          fullWidth
        >
          Sign in
        </Button>

        {/* <Typography>
          <Link href="">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="/register">Sign Up</Link>
        </Typography> */}
      </Paper>
    </Grid>
  );
};

export default Login;
