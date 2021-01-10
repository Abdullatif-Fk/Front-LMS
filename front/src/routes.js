/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================


*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import EditAdmin from "views/EditAdmin/EditAdmin.js";
import AddAdmin from "views/AddAdmin/AddAdmin";
import Students from "views/Students/Students.js";
import Sections from "views/Sections/Sections.js";
import Classes from "views/Classes/Classes.js";
import Report from "views/Report/Report.js";
import Admins from "views/Admins/Admins";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/user",
    name: "Admin Profile",
    icon: Person,
    component: EditAdmin,
    layout: "/admin",
  },
  {
    path: "/adduser",
    name: "Add Admin",
    icon: Person,
    component: AddAdmin,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "Students",
    icon: Dashboard,
    component: Students,
    layout: "/admin",
  },
  {
    path: "/sections",
    name: "Sections",
    icon: Dashboard,
    component: Sections,
    layout: "/admin",
  },
  {
    path: "/fetchusers",
    name: "All admins",
    icon: Dashboard,
    component: Admins,
    layout: "/admin",
  },
  {
    path: "/classes",
    name: "Classes",
    icon: Dashboard,
    component: Classes,
    layout: "/admin",
  },

  {
    path: "/report",
    name: "Report",
    icon: "content_paste",
    component: Report,
    layout: "/admin",
  },
];

export default dashboardRoutes;
