import React,{useState,useEffect} from 'react';
import apiUrl from '../../global';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Stepper, Step, StepLabel, Button, Link, Typography, Grid, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LessonDetails from './LessonDetails';
import RiderDetails from './RiderDetails';


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
        justifyContent: 'center',
    },
    button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    },
}));

const steps = ['פרטי המשתתף','פרטי השיעור'];

export default function AddLesson(props) {
    const history = useHistory();
    const [riderDetails,setRiderDetails]=useState("");
    const [riderType, setRiderType] = useState('');
    const [lessonDetails,setLessonDetails]=useState("");
    const [message, setMessage] = useState("");
    const [status,setStatus] = useState("");
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);


    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const onSubmit = () => {

        if(riderType==="rider"){

            let newLesson={                                  //create object to send in the body of POST method
                "rider_id":riderDetails,
                "date":lessonDetails['date'],
                "start_time":lessonDetails['start_time'],
                "end_time":lessonDetails['end_time'],
                "instructor_id": lessonDetails['instructor_id'],
                "horse_id": lessonDetails['horse_id'],
                "field": lessonDetails['field'],
                "lesson_type": lessonDetails['lesson_type'],
                "price": lessonDetails['price'],
                "funding_source": lessonDetails['funding_source'],
                "charge_type": lessonDetails['charge_type'],
                "was_present": lessonDetails['was_present'],
                "comments": lessonDetails['comments']
            }
            console.log(newLesson);
            
            fetch(apiUrl+"Lesson/",                                    //add new lesson to db with POST method
                {
                method: 'POST',
                body: JSON.stringify(newLesson),
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
                return res.json();
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
        else if(riderType==="visitor"){

            let newLesson={                                  //create object to send in the body of POST method
                "visitor_id":riderDetails['id'],
                "visitor":{
                    "id":riderDetails['id'],
                    "first_name":riderDetails['first_name'],
                    "last_name":riderDetails['last_name'],
                    "gender":riderDetails['gender'],
                    "date_of_birth":riderDetails['date_of_birth'],
                    "phone_number":riderDetails['phone_number'],
                    "address":riderDetails['address'],
                    "city":riderDetails['city'],
                    "height":riderDetails['height'],
                    "weight":riderDetails['weight'],
                    "comments":riderDetails['comments'],
                },
                "date":lessonDetails['date'],
                "start_time":lessonDetails['start_time'],
                "end_time":lessonDetails['end_time'],
                "instructor_id": lessonDetails['instructor_id'],
                "horse_id": lessonDetails['horse_id'],
                "field": lessonDetails['field'],
                "lesson_type": lessonDetails['lesson_type'],
                "price": lessonDetails['price'],
                "funding_source": lessonDetails['funding_source'],
                "charge_type": lessonDetails['charge_type'],
                "was_present": lessonDetails['was_present'],
                "comments": lessonDetails['comments']
            }
            console.log(newLesson);
            
            fetch(apiUrl+"TrialLesson/",                                    //add new lesson to db with POST method
                {
                method: 'POST',
                body: JSON.stringify(newLesson),
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
                return res.json();
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
    }

    const getRiderType = (data) => {
        setRiderType(data);
    }

    const getRiderDetails = (data) => {
        setRiderDetails(data);
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
                        שיעור חדש
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
                                <RiderDetails getRiderType={getRiderType} getRiderDetails={getRiderDetails}/>
                            </div>
                            <div style={{display:(activeStep===1?"block":"none")}}>
                                <LessonDetails getLessonDetails={getLessonDetails} handleBack={handleBack}/>
                            </div>
                            <div style={{display:(activeStep===2?"block":"none")}}>
                                <Alert severity={status==="ok"?"success":"error"}>{message}</Alert>
                                <div className={classes.buttons}>
                                    <Button onClick={handleBack} className={classes.button}>
                                        חזור
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={()=>{history.push('/AddLesson')}} className={classes.button}>
                                        שיעור חדש
                                    </Button>
                                </div>
                            </div>
                        </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    )
}
