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
import Add from "@material-ui/icons/Add";
import AttachFile from "@material-ui/icons/AttachFile";
import Class from "@material-ui/icons/Class";
import StudentAdd from "@material-ui/icons/PersonAdd";
import PersonOutline from "@material-ui/icons/PersonOutline";

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
    icon: Add,
    component: AddAdmin,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "Students",
    icon: StudentAdd,
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
    icon: PersonOutline,
    component: Admins,
    layout: "/admin",
  },
  {
    path: "/classes",
    name: "Classes",
    icon: Class,
    component: Classes,
    layout: "/admin",
  },

  {
    path: "/report",
    name: "Report",
    icon: AttachFile,
    component: Report,
    layout: "/admin",
  },
];

export default dashboardRoutes;
