/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch ,Redirect} from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import "bootstrap/dist/css/bootstrap.min.css";

const hist = createBrowserHistory();
import { Provider } from "react-redux";
import configureStore from "./store/store.js";
import Login from "./components/Login/Login"
import Register from "./components/Login/Register"
import App from "./App"


ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={hist}>
      <Switch>
        {/* <Route path="/admin" component={Admin} /> 
       <Redirect from="/" to="/admin/students" /> */}
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin}  />

      </Switch>
    </Router>
    
  </Provider>,
  document.getElementById("root")
);
// ReactDOM.render(
// <App/>,
// document.getElementById("root")
// );