import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Grid,TextField,Checkbox,FormControlLabel,Paper, Container,InputAdornment} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from "react-router-dom";
import logo from '../horse-club-logo.png';
import apiUrl from '../global';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(50),
        marginLeft: theme.spacing(50),
        padding: theme.spacing(3),
      },
    }
}));

export default function LoginForm(props) {
    const classes = useStyles();
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
                        localStorage.setItem('id', result.id);
                        localStorage.setItem('user', JSON.stringify(result));
                        localStorage.setItem('email', email);
                        localStorage.setItem('name', result.first_name + " " + result.last_name);
                    }
                  },
                  (error) => {
                    setErrorMsg(error);
                }
            );
        }

        if(password.trim() ===""){
            setErrorMsg("יש להזין סיסמה");
        }

        if(email.trim() ===""){
            setErrorMsg("יש להזין כתובת דואר אלקטרוני");
        }
    }

    return (
        <Container style={{backgroundColor:"#fafafa"}}>
            <Paper className={classes.paper}>
                <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                spacing={2}
                >
                    <Grid item>
                        <br/>
                        <img src={logo} />
                        <br/><br/>
                        <h4>כניסה למערכת</h4>
                    </Grid>
                    <Grid item>
                        <TextField
                            value={email}
                            fullWidth
                            onChange={e => setEmail(e.target.value)}
                            label="דואר אלקטרוני"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <MailOutlinedIcon style={{fontSize:18}} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                    </Grid>
                    <Grid item>
                        <TextField
                            value={password}
                            fullWidth
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            label="סיסמה"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOutlinedIcon style={{fontSize:18}} />
                                  </InputAdornment>
                                ),
                              }}
                             />
                    </Grid>
                    <Grid item style={{fontSize:10}}>
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
                        <Button variant="contained" color="primary" onClick={btn_LogIn}>התחבר</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}