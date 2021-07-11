import React,{useState,useEffect} from 'react';
import apiUrl from '../global';
import { useParams,useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Rating,Alert} from '@material-ui/lab';
import {Paper,Typography, Grid, IconButton, TextField } from '@material-ui/core';
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

export default function LessonFeedback(props) {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [feedback,setFeedback] = useState("");
    const [message,setMessage] = useState("");


    useEffect(() => {
        let err = "";
        fetch(apiUrl+"Lesson/RiderFeedback/"+id,
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
              if(res.status!==200){
                err = true;
              }
              return res.json();
            })
            .then(
              (result) => {
                  console.log(result);

                  if(err){
                    setMessage(result)
                  }
                  else{
                    setFeedback(result);
                  }
              },
              (error) => {
                alert(error);
            }
        );


    }, []);


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
                    <Grid item xs={12}>
                        <Typography variant="h6">משוב תלמיד<br/><br/></Typography>
                    </Grid>
                    {feedback!==""?
                    <Grid container justify="center" spacing={3} style={{textAlign:"right",fontSize:"14px",paddingTop:"15px"}}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h7">
                                <b>1.</b>עד כמה נהנת עם הסוס בשיעור?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Rating size="large" name="read-only" value={feedback.q1} readOnly />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h7">
                                <b>2.</b> עד כמה נהנת בשיעור?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Rating size="large" value={feedback.q2} readOnly />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h7">
                                <b>3.</b> עד כמה אתה מרגיש שיפור לעומת השיעור הקודם?
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Rating size="large" value={feedback.q3} readOnly />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                <b>4.</b> איך היה בשיעור?
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField value={feedback.q4} readOnly fullWidth />
                            </Grid>
                        </Grid>:
                        <Grid container justify="center" alignItems="center">
                            <Grid item>
                                {message!==""?<Alert severity="error">{message}</Alert>:null}
                            </Grid>
                        </Grid>}
                    </Paper>
                </main>
        </React.Fragment>
    )
}
