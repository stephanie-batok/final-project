import React,{useState,useEffect} from 'react';
import {Button,Grid,TextField,Checkbox,FormControlLabel} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import logo from '../horse-club-logo.png';


export default function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [allowd,setAllowd]= useState(localStorage.getItem('rememberMe'));
    const [checked, setChecked] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if(allowd){
            history.push('/Schedule');
        }
    },[allowd]);

    const btn_LogIn = () => {

        let apiUrl= props.apiUrl + "SystemUser/";

        fetch(apiUrl+email+"/"+password,
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
                setAllowd(true);
              }
              return res.json();
            })
            .then(
              (result) => {
                alert(result);
                localStorage.setItem('id', result);
              },
              (error) => {
                alert(error);
            }
        );
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
                <TextField value={password} onChange={e => setPassword(e.target.value)} label="סיסמה" variant="outlined" />
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
                <Button variant="outlined" color="primary" onClick={btn_LogIn}>התחבר</Button>
            </Grid>
        </Grid>
    )
}