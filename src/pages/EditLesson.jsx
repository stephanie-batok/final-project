import React,{useState,useEffect} from 'react';
import { useParams,useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem,IconButton,Typography,Paper} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


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
    }
  }));

export default function EditLesson(props) {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();    
    const { register, handleSubmit,setValue} = useForm({mode: 'onBlur'});

    const [lesson,setLesson] = useState("");
    const [instructors,setInstructors]=useState("");
    const [horses,setHorses]=useState("");


    useEffect(()=>{
        getLesson();
        getInstructors();
        getHorses();

        console.log(lesson);

        if (lesson!=="") {
            setValue([
                      {horse_id : lesson.horse_id},
                      {instructor_id : lesson.instructor_id},
                    ]);
        }

    },[]);

    const getLesson = () => {
        let apiUrl= props.apiUrl + "Lesson/";

        fetch(apiUrl+"/"+id,
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
                  setLesson(result);
              },
              (error) => {
                alert(error);
            }
        );
    }
    const getInstructors = () => {
        let apiUrl= props.apiUrl + "Worker/Instructor";

        fetch(apiUrl,
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
                  setInstructors(result);
              },
              (error) => {
                alert(error);
            }
        );
    }

    const getHorses = () => {
        let apiUrl= props.apiUrl + "Horse/";

        fetch(apiUrl,
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
                  setHorses(result);
              },
              (error) => {
                alert(error);
            }
        );
    }
    const onSubmit = (data) => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
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
            {lesson!==""?
            <form onSubmit={handleSubmit(onSubmit)}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6"><br/>פרטי שיעור</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="rider_fullName" InputProps={{readOnly: true}} defaultValue={lesson.rider_fullName} inputRef={register} label="שם הרוכב" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="מדריך" value={lesson.instructor_id} onChange={(e) => register({name:"instructor_id", value: e.target.value})} fullWidth>
                                        {instructors!==""?instructors.map((i) =>(
                                        <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                                        )):null}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="סוס" defaultValue={lesson.horse_id} onChange={(e) => register({name:"horse_id", value: e.target.value})} fullWidth>
                                        <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                                        {horses!==""?horses.map((h) =>(
                                        <MenuItem value={h.id}>{h.name}</MenuItem>
                                        )):null}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined"
                                            color="primary"
                                            type="submit">
                                        שמור שינויים
                                    </Button>
                                </Grid>
                            </Grid>
                    </Paper>
                </main>
            </form>:null}
        </React.Fragment>
    )
}
