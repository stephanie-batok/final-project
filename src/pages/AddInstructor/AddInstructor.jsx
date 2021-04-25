import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Stepper, Step, StepLabel, Button, Link, Typography, Grid, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PersonalDetails from './PersonalDetails';
import PersonalFiles from './PersonalFiles';


const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    },
}));


const steps = ["פרטים אישיים","טפסים"];


export default function AddInstructor(props) {
    const history = useHistory();
    const [personalDetails,setPersonalDetails] = useState("");
    const [personalFiles,setPersonalFiles] = useState("");
    const [message, setMessage] = useState("");
    const [status,setStatus] = useState("");
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onSubmit = () => {
        let apiUrl= props.apiUrl + "Worker/";

        let newInstructor={                                  //create object to send in the body of POST method
            "id": personalDetails["id"],
            "first_name": personalDetails["first_name"],
            "last_name": personalDetails["last_name"],
            "gender": personalDetails["gender"],
            "date_of_birth":personalDetails["date_of_birth"],
            "phone_number": personalDetails["phone_number"],
            "email":personalDetails["email"],
            "password": personalDetails["password"],
            "city":personalDetails["city"],
            "address":personalDetails["address"]

            // Don't
            //forget
            //add
            //files!!!!!!!
        
        }
        console.log(newInstructor);
        
        fetch(apiUrl,                                    //add new instructor to db with POST method
            {
              method: 'POST',
              body: JSON.stringify(newInstructor),
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

    const getPersonalDetails = (data) => {
        setPersonalDetails(data);
        setActiveStep(activeStep + 1);
    }

    const getPersonalFiles = (data) => {
        setPersonalFiles(data);
        setActiveStep(activeStep + 1);
    }

    useEffect(()=>{
        if(activeStep===steps.length){
            onSubmit();
        }
    },[activeStep]);

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
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h4" variant="h4" align="center">
                        מדריך חדש
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                        <React.Fragment>
                            <div style={{display:(activeStep===0?"block":"none")}}>
                                <PersonalDetails getPersonalDetails={getPersonalDetails} />
                            </div>
                            <div style={{display:(activeStep===1?"block":"none")}}>
                                <PersonalFiles getPersonalFiles={getPersonalFiles} handleBack={handleBack} />
                            </div>
                            <div style={{display:(activeStep===2?"block":"none")}}>
                                <Alert severity={status==="ok"?"success":"error"}>{message}</Alert>
                                <div className={classes.buttons}>
                                    <Button onClick={handleBack} className={classes.button}>
                                        חזור
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={()=>{history.push('/AddInstructor')}} className={classes.button}>
                                        מדריך חדש
                                    </Button>
                                </div>
                            </div>
                        </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
        
    )
}
