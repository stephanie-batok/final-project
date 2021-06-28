import React,{useState,useEffect} from 'react';
import {Button,Grid,TextField,Checkbox,FormControlLabel} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import logo from '../horse-club-logo.png';
import apiUrl from '../global';


export default function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(false);
    const [allowd,setAllowd]= useState(localStorage.getItem('rememberMe'));
    const [checked, setChecked] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(allowd){
            history.push('/Schedule');
        }
    },[allowd]);

    const btn_LogIn = () => {

        if(email.trim()!=="" && password.trim()!==""){

            let err = "";
    
            fetch(apiUrl+"SystemUser/"+email+"/"+password,
                {
                  method: 'GET',
                  headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                  })
                })
                .then(res => {
                  console.log('res=', res);
                  console.log('res.status', res.status);
                  console.log('res.ok', res.ok);
    
                  if(res.ok){
                    if(checked){
                        localStorage.setItem('rememberMe', true);
                    }
                    err = false;
                    setAllowd(true);
                  }
                  else {
                    err = true;
                  }
                  return res.json();
                })
                .then(
                  (result) => {
                    if(err){
                        setErrorMsg(result);                                   
                    }
                    else {
                        localStorage.setItem('id', result);
                        localStorage.setItem('email', email);
                    }
                  },
                  (error) => {
                    setErrorMsg(error);
                }
            );
            
        }

    }

    return (
        <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
            spacing={3}
        >
            <Grid item>
                <br/>
                <img src={logo} />
                <br/><br/>
                <h4>כניסה למערכת</h4>
            </Grid>
            <Grid item>
                <TextField value={email} onChange={e => setEmail(e.target.value)} label="דואר אלקטרוני" variant="outlined" />
            </Grid>
            <Grid item>
                <TextField value={password} type="password" onChange={e => setPassword(e.target.value)} label="סיסמה" variant="outlined" />
            </Grid>
            <Grid item>
                <FormControlLabel
                    label="זכור אותי"
                    control={
                    <Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        color="primary"
                    />
                    }
                />
            </Grid>
            <Grid item> 
                {errorMsg &&<Alert severity="error">{errorMsg}</Alert>}
            </Grid>
            <Grid item>
                <Button variant="outlined" color="primary" onClick={btn_LogIn}>התחבר</Button>
            </Grid>
        </Grid>
    )
}