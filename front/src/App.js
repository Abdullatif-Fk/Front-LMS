import React ,{ useState,useEffect } from "react";
import { Router, Route, Switch ,BrowserRouter,Redirect} from "react-router-dom";
import Axios from "axios";
import Login from "./components/Login/Login"
import Register from "./components/Login/Register"
import AdminContext from "./context/AdminContext"
import Admin from "components/Navbars/AdminNavbarLinks";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
const browserHistory =  createBrowserHistory();

// import Admin from "./views/Admins/Admins";
export default function App() {
    const [adminData, setAdminData]=useState({
        token: undefined,
      
      });
    //   useEffect(()=>{
    //    const checkLoggedIn = async () => {
    //     let token = localStorage.getItem("access_token");
 
    //     if(token === null){
    //         localStorage.setItem("access_token","");
    //         token="";
    //       }
    //       let tokenRes = await Axios.post(
    //         "http://localhost:8000/api/login",adminData
    //       );
    //     console.log(tokenRes);
    //     console.log(admindata);

    //     }
    //     // checkLoggedIn();
    //   }, [])
    return (
        <>
    <BrowserRouter>
        <AdminContext.Provider value={{adminData,setAdminData}} >
            {/* <Router history={browserHistory}> */}
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/register" component={Register}/>
                <Route path="/admin/students" component={Admin}  />

            </Switch>
            {/* </Router> */}
        </AdminContext.Provider>
    </BrowserRouter>, 
        </>
    )
}
