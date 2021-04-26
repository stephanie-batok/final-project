import React,{useState,useEffect} from 'react';
import { useParams,useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem,IconButton,Typography,Paper} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
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
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
      },
    }
  }));

export default function EditLesson(props) {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();    
    const { register, handleSubmit,setValue,getValues} = useForm({mode: 'onBlur'});
    const [lesson,setLesson] = useState("");
    const [instructors,setInstructors] = useState("");
    const [horses,setHorses] = useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{
        getLesson();
        getInstructors();
        getHorses();
    },[]);

    const getLesson = () => {
        let apiUrl= props.apiUrl + "Lesson/";

        fetch(apiUrl+id,
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
        let instructor_id = getValues('instructor_id');
        let horse_id = getValues('horse_id');
        let lesson_type = getValues('lesson_type');
        let funding_source = getValues('funding_source');
        let was_present = getValues('was_present');
        let charge_type = getValues('charge_type');



        let newLesson={                                  //create object to send in the body of Put method
          "lesson_id":lesson.lesson_id,
          "date":lesson.date,
          "start_time":lesson.start_time,
          "end_time":lesson.end_time,
          "instructor_id": instructor_id===undefined?lesson.instructor_id:data.instructor_id,
          "horse_id": horse_id===undefined?lesson.horse_id:data.horse_id,
          "field": data.field,
          "lesson_type": lesson_type===undefined?lesson.lesson_type:data.lesson_type,
          "price": data.price,
          "funding_source": funding_source===undefined?lesson.funding_source:data.funding_source,
          "charge_type": charge_type===undefined?lesson.charge_type:data.charge_type,
          "was_present": was_present===undefined?lesson.was_present:data.was_present,
          "comments": data.comments
        }
        console.log(newLesson);
        
        let apiUrl= props.apiUrl + "Lesson/";
        
        fetch(apiUrl+id,                                    //edit lesson in db with Put method
            {
              method: 'PUT',
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
            {lesson!==""?
            <form onSubmit={handleSubmit(onSubmit)}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">פרטי שיעור <br/></Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="rider_fullName" InputProps={{readOnly: true}} defaultValue={lesson.rider_fullName} inputRef={register} label="שם הרוכב" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="date" type="date" InputProps={{readOnly: true}} defaultValue={lesson.date} inputRef={register} label="תאריך" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="start_time" type="time" InputProps={{readOnly: true}} defaultValue={lesson.start_time} inputRef={register} label="שעת התחלה" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="end_time" type="time" InputProps={{readOnly: true}} defaultValue={lesson.end_time} inputRef={register} label="שעת סיום" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="מדריך" defaultValue={lesson.instructor_id} onChange={(e) => register({name:"instructor_id", value:e.target.value})} fullWidth>
                                        {instructors!==""?instructors.map((i) =>(
                                        <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                                        )):null}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="field" defaultValue={lesson.field} inputRef={register} label="מגרש" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="סוס" defaultValue={lesson.horse_id}  onChange={(e) => register({name:"horse_id", value: e.target.value})} fullWidth>
                                        <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                                        {horses!==""?horses.map((h) =>(
                                        <MenuItem value={h.id}>{h.name}</MenuItem>
                                        )):null}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="match_rank" InputProps={{readOnly: true}} defaultValue={lesson.match_rank} inputRef={register} label="רמת התאמה עם סוס" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="סוג שיעור" defaultValue={lesson.lesson_type} onChange={(e) => register({name:"lesson_type", value: e.target.value})} fullWidth>
                                        <MenuItem value="פרטי">
                                            פרטי
                                        </MenuItem>
                                        <MenuItem value="קבוצתי">
                                            קבוצתי
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="price" type="number" defaultValue={lesson.price} inputRef={register} label="תעריף" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="בחר הסדר תשלום" defaultValue={lesson.funding_source}  onChange={(e) => register({name:"funding_source", value: e.target.value})} fullWidth>
                                        <MenuItem value="תשלום רגיל">
                                            תשלום רגיל
                                        </MenuItem>
                                        <MenuItem value="תשלום חלקי">
                                            תשלום חלקי
                                        </MenuItem>
                                        <MenuItem value="תשלום ממומן">
                                            תשלום ממומן
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="סטאטוס תשלום" defaultValue={lesson.charge_type} onChange={(e) => register({name:"charge_type", value: e.target.value})} fullWidth>
                                        <MenuItem value="שולם">
                                            שולם
                                        </MenuItem>
                                        <MenuItem value="לא שולם">
                                            לא שולם
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="סטאטוס נוכחות" defaultValue={lesson.was_present} onChange={(e) => register({name:"was_present", value: e.target.value})} fullWidth>
                                        <MenuItem value="נכח">
                                            נכח
                                        </MenuItem>
                                        <MenuItem value="לא נכח">
                                            לא נכח
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="comments" defaultValue={lesson.comments} inputRef={register} label="הערות" fullWidth />
                                </Grid>
                                {message!==""?<Grid item xs={12}>
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
                    </Paper>
                </main>
            </form>:null}
        </React.Fragment>
    )
}
