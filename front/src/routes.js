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

import Notifications from "@material-ui/icons/Notifications";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Students from "views/Students/Students.js";
import Sections from "views/Sections/Sections.js";
import Classes from "views/Classes/Classes.js";
import Report from "views/Report/Report.js";

import NotificationsPage from "views/Notifications/Notifications.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "Students",
    icon: "content_paste",
    component: Students,
    layout: "/admin",
  },
  {
    path: "/sections",
    name: "Sections",
    icon: "content_paste",
    component: Sections,
    layout: "/admin",
  },
  {
    path: "/classes",
    name: "Classes",
    icon: "content_paste",
    component: Classes,
    layout: "/admin",
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
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
