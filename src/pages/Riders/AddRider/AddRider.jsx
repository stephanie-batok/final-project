import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import apiUrl from '../../../global';
import {Paper, Stepper, Step, StepLabel, Button, Link, Typography, Grid, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PersonalDetails from './PersonalDetails';
import ParentDetails from './ParentDetails';
import LessonDetails from './LessonDetails';

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
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(4, 0, 6),
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

const steps = ['פרטים אישיים', 'פרטי הורים', 'פרטי שיעור'];


export default function AddRider(props) {
    const history = useHistory();
    const [personalDetails,setPersonalDetails] = useState("");
    const [parentDetails,setParentDetails] = useState("");
    const [lessonDetails,setLessonDetails] = useState("");
    const [message, setMessage] = useState("");
    const [status,setStatus] = useState("");
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onSubmit = () => {

        let newRider={                                  //create object to send in the body of POST method
            "id": personalDetails["id"],
            "first_name": personalDetails["first_name"],
            "last_name": personalDetails["last_name"],
            "gender": personalDetails["gender"],
            "date_of_birth":personalDetails["date_of_birth"],
            "phone_number": personalDetails["phone_number"],
            "email":personalDetails["email"],
            "password": personalDetails["password"],
            "riding_type":personalDetails["riding_type"],
            "weight":parseInt(personalDetails["weight"]),
            "height": parseFloat(personalDetails["height"]),
            "starting_date":personalDetails["starting_date"],
            "healthForm":personalDetails["healthForm"],
            "city":personalDetails["city"],
            "address":personalDetails["address"],
            "instructor_id":lessonDetails["instructor_id"],
            "horse_id":lessonDetails["horse_id"],
            "parents":[
                {
                    "id": parentDetails["parent1_id"],
                    "first_name": parentDetails["parent1_first_name"],
                    "last_name": parentDetails["parent1_last_name"],
                    "gender": parentDetails["parent1_gender"],
                    "phone_number": parentDetails["parent1_phone_number"],
                    "email":parentDetails["parent1_email"]
                },
                {
                    "id": parentDetails["parent2_id"],
                    "first_name": parentDetails["parent2_first_name"],
                    "last_name": parentDetails["parent2_last_name"],
                    "gender": parentDetails["parent2_gender"],
                    "phone_number":parentDetails["parent2_phone_number"],
                    "email":parentDetails["parent2_email"]
                }
            ],
            "regular_lessons":[
                {
                    "day":lessonDetails["day"],
                    "start_time":lessonDetails["start_time"],
                    "end_time":lessonDetails["end_time"],
                    "lesson_type":lessonDetails["lesson_type"],
                    "price":parseInt(lessonDetails["price"]),
                    "funding_source":lessonDetails["funding_source"]
                },
                {
                    "day":lessonDetails["day2"],
                    "start_time":lessonDetails["start_time2"],
                    "end_time":lessonDetails["end_time2"],
                    "lesson_type":lessonDetails["lesson_type2"],
                    "price":parseInt(lessonDetails["price2"]),
                    "funding_source":lessonDetails["funding_source2"]
                }
            ]
        }
        console.log(newRider);
        
        fetch(apiUrl+"Rider/",                                    //add new rider to db with POST method
            {
              method: 'POST',
              body: JSON.stringify(newRider),
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

    const getParentDetails = (data) => {
        setParentDetails(data);
        setActiveStep(activeStep + 1);
    }

    const getLessonDetails = (data) => {
        setLessonDetails(data);
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
                        תלמיד חדש
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
                                <ParentDetails getParentDetails={getParentDetails} handleBack={handleBack} />
                            </div>
                            <div style={{display:(activeStep===2?"block":"none")}}>
                                <LessonDetails getLessonDetails={getLessonDetails} handleBack={handleBack} />
                            </div>
                            <div style={{display:(activeStep===3?"block":"none")}}>
                                <Alert severity={status==="ok"?"success":"error"}>{message}</Alert>
                                <div className={classes.buttons}>
                                    <Button onClick={handleBack} className={classes.button}>
                                        חזור
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={()=>{history.push('/AddRider')}} className={classes.button}>
                                        תלמיד חדש
                                    </Button>
                                </div>
                            </div>
                        </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    )
}
