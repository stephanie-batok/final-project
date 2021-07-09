import React,{useState,useEffect} from 'react';
import apiUrl from '../../global';
import { useForm } from "react-hook-form";
import { useParams,useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Typography, Grid, IconButton,Button,TextField,MenuItem} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
      },
    }
}));


export default function EditInstructor(props) {
    const { register, handleSubmit,getValues} = useForm({mode: 'onBlur'});
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [instructor,setInstructor] = useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{

        fetch(apiUrl+"Worker/"+id,
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
              return res.json();
            })
            .then(
              (result) => {
                  console.log(result);
                  setInstructor(result);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

    const onSubmit = (data) => {
        let gender = getValues('gender');
        let isAllowed = getValues('isAllowed');

        let newPersonalDetails={                                  //create object to send in the body of Put method
          "first_name":data.first_name,
          "last_name":data.last_name,
          "id":instructor.id,
          "gender": gender===undefined?instructor.gender:data.gender,
          "date_of_birth":data.date_of_birth,
          "phone_number":data.phone_number,
          "starting_date":data.starting_date,
          "email":data.email,
          "password":data.password,
          "address":data.address,
          "city":data.city,
          "isAllowed": isAllowed===undefined?instructor.isAllowed:data.isAllowed,
        }
        console.log(newPersonalDetails);
        
        fetch(apiUrl+"Worker/"+instructor.id,                                    //edit instructor's personal details in db with Put method
            {
              method: 'PUT',
              body: JSON.stringify(newPersonalDetails),
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
                setStatus("ok");
              }
              else{
                setStatus("no");
              }
              return res.json()
            })
            .then(
              (result) => {
                if(typeof(result) === "object"){
                    setMessage(result.Message);
                }
                else{
                    setMessage(result);
                }
              },
              (error) => {
                console.log("err post=", error);
        });
    }


    return (
        <React.Fragment>
            <Grid container justify="flex-start">
                <Grid item>
                    <IconButton aria-label="חזור">
                        <ArrowForwardIosIcon onClick={() => history.goBack()} />
                    </IconButton>
                    <label>חזור</label>
                </Grid>
            </Grid>
            {instructor!==""?
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h6"><br/>פרטים אישיים</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="first_name" defaultValue={instructor.first_name} inputRef={register} label="שם פרטי" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="last_name" defaultValue={instructor.last_name} inputRef={register} label="שם משפחה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="id" defaultValue={instructor.id} inputRef={register} label="תעודת זהות" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField select defaultValue={instructor.gender} label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} fullWidth>
                                    <MenuItem value="זכר">
                                        זכר
                                    </MenuItem>
                                    <MenuItem value="נקבה">
                                        נקבה
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="date_of_birth" defaultValue={instructor.date_of_birth} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="phone_number" defaultValue={instructor.phone_number} inputRef={register} label="מספר טלפון" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}> 
                                <TextField name="address" defaultValue={instructor.address} inputRef={register} label="כתובת" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="city" defaultValue={instructor.city} inputRef={register} label="עיר מגורים" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="starting_date" defaultValue={instructor.starting_date} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך התחלת עבודה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="email" defaultValue={instructor.email} inputRef={register} label="דואר אלקטרוני" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="password" defaultValue={instructor.password} inputRef={register} label="סיסמה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField select defaultValue={instructor.isAllowed} label="סטאטוס הרשאה" onChange={(e) => register({name:"isAllowed", value: e.target.value})} fullWidth>
                                    <MenuItem value={true}>
                                        מורשה
                                    </MenuItem>
                                    <MenuItem value={false}>
                                        לא מורשה        
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            {message!==""?
                            <Grid item xs={12}>
                                <Alert severity={status==="ok"?"success":"error"}>{message}</Alert>
                            </Grid>:null}
                            <Grid item xs={12}>
                                <Button variant="contained"
                                        color="primary"
                                        type="submit">
                                    שמור שינויים
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    </Paper>
                </main>:null}
        </React.Fragment>
    )
}
