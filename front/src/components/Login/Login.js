import React, { useState } from "react";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import lohinImg from "../../images/education.jpg"
const Login=()=>{
const [data, setState] = useState({
    email: '',
    password: ''
});
const  handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios.post('http://localhost:8000/api/login',data)
    .then(response => {
        console.log(response);
        localstorage.setItem('token',response.data.access_token);
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin/students"></Route>
            </Switch>
        </BrowserRouter>
    })
    .catch(err => {
        console.log(err);
    })
}




    



    

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter Email'  
                onChange={
                    (e)=>setState({
                    ...data,
                    email: e.target.value
                    })} 
                fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' 
                onChange={
                    (e)=>setState({
                        ...data,
                        password: e.target.value
                        })} 
                fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" onClick={handleSubmit} style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="/register" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login