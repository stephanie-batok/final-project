import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams,useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Button,Grid,TextField,MenuItem,IconButton,Typography,Paper} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
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

export default function EditRider(props) {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const { register, handleSubmit,setValue} = useForm({mode: 'onBlur'});
    const [rider,setRider] = useState("");
    const [instructors,setInstructors]=useState("");
    const [horses,setHorses]=useState("");
    const [addLesson,setAddLesson] = useState(false);
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];

    useEffect(()=>{
        getRider();
        getInstructors();
        getHorses();
        if (rider!=="") {
            setValue([{first_name : rider.first_name},
                      {last_name : rider.last_name},
                      {id : rider.id},
                      {gender : rider.gender},
                      {date_of_birth : rider.date_of_birth},
                      {phone_number : rider.phone_number},
                      {email : rider.email},
                      {password : rider.password},
                      {riding_type : rider.riding_type},
                      {city : rider.city},
                      {address : rider.address},
                      {weight : rider.weight},
                      {height : rider.height},
                      {starting_date : rider.starting_date},
                      {healthForm : rider.healthForm},
                      {horse_id : rider.horse_id},
                      {instructor_id : rider.instructor_id},
                      {start_time0:rider.regular_lessons[0].start_time0}
                      (rider.regular_lessons.length===2?
                        {start_time1:rider.regular_lessons[1].start_time1}
                        :null
                        )

                    ]);
        }
    },[]);

    const onSubmit = (data) => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
    }

    const getRider = () => {
        let apiUrl= props.apiUrl + "Rider/";

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
                  setRider(result);
                  if(result.regular_lessons.length===1){
                        setAddLesson(true);
                  }
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
            {rider!==""?
            <form onSubmit={handleSubmit(onSubmit)}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    פרטים אישיים
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="first_name" defaultValue={rider.first_name} inputRef={register} label="שם פרטי" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="last_name" defaultValue={rider.last_name} inputRef={register} label="שם משפחה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="id" defaultValue={rider.id} inputRef={register} label="תעודת זהות" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField select defaultValue={rider.gender} label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} fullWidth>
                                    <MenuItem value="זכר">
                                        זכר
                                    </MenuItem>
                                    <MenuItem value="נקבה">
                                        נקבה
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="date_of_birth" defaultValue={rider.date_of_birth} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="phone" defaultValue={rider.phone} inputRef={register} label="מספר טלפון" fullWidth />
                            </Grid>
                            <Grid item xs={12}> 
                                <TextField name="address" defaultValue={rider.address} inputRef={register} label="כתובת" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="city" defaultValue={rider.city} inputRef={register} label="עיר מגורים" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField select label="בחר מגזר רכיבה" defaultValue={rider.riding_type} onChange={(e) => register({name:"riding_type", value: e.target.value})} fullWidth>
                                    <MenuItem value="רכיבה ספורטיבית">
                                    רכיבה ספורטיבית
                                    </MenuItem>
                                    <MenuItem value="רכיבה טיפולית">
                                    רכיבה טיפולית
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="height" defaultValue={rider.height} inputRef={register} defaultValue={0} label="גובה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="weight" defaultValue={rider.weight} inputRef={register} defaultValue={0} type="number" label="משקל" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="email" defaultValue={rider.email} inputRef={register} label="דואר אלקטרוני" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="password" defaultValue={rider.password} inputRef={register} label="סיסמה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="starting_date" defaultValue={rider.starting_date} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך רישום לחווה" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name="healthForm" defaultValue={rider.healthForm} inputRef={register} label="טופס הצהרת בריאות" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    פרטי הורים
                                </Typography>
                            </Grid>
                        </Grid>
                            {rider.parents.map((parent,key)=>(
                                <Grid container justify="center" spacing={3}>
                                    <Grid item xs={12}>
                                        {key===0?
                                        <Typography variant="h7"><br/>פרטי הורה ראשון</Typography>:
                                        <Typography variant="h7"><br/>פרטי הורה שני</Typography>}
                                    </Grid>
                                    <Grid item xs={12} sm={6}> 
                                        <TextField name={"parent_id"+key} value={parent.id} inputRef={register} label="תעודת זהות" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name={"parent_first_name"+key} value={parent.first_name} inputRef={register} label="שם פרטי" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name={"parent_last_name"+key} value={parent.last_name} inputRef={register} label="שם משפחה" fullWidth />
                                    </Grid>                    
                                    <Grid item xs={12} sm={6}>
                                        <TextField select label="בחר מגדר" value={parent.gender} onChange={(e) => register({name:"parent_gender"+key, value: e.target.value})} fullWidth>
                                            <MenuItem value="זכר">
                                                זכר
                                            </MenuItem>
                                            <MenuItem value="נקבה">
                                                נקבה
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name={"parent_phone"+key} value={parent.phone} inputRef={register} label="מספר טלפון" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name={"parent_email"+key} value={parent.email} inputRef={register} label="דואר אלקטרוני" fullWidth />
                                    </Grid>
                                </Grid>))}
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6"><br/>פרטי שיעורים קבועים</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="מדריך קבוע" defaultValue={rider.instructor_id} onChange={(e) => register({name:"instructor_id", value: e.target.value})} fullWidth>
                                        {instructors!==""?instructors.map((i) =>(
                                        <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                                        )):null}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="סוס קבוע" defaultValue={rider.horse_id} onChange={(e) => register({name:"horse_id", value: e.target.value})} fullWidth>
                                        <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                                        {horses!==""?horses.map((h) =>(
                                        <MenuItem value={h.id}>{h.name}</MenuItem>
                                        )):null}
                                    </TextField>
                                </Grid>
                            </Grid>
                            {rider.regular_lessons.map((regular_lesson,key) =>(
                                <Grid container justify="center" spacing={3}>
                                    <Grid item xs={12}>
                                    {key===0?<label><br/>פרטי שיעור ראשון</label>:<label><br/>פרטי שיעור שני</label>}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name={"price"+key} value={regular_lesson.price} type="number" inputRef={register} label="תעריף" fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField select label="בחר הסדר תשלום" value={regular_lesson.funding_source} onChange={(e) => register({name:"funding_source"+key, value: e.target.value})} fullWidth>
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
                                        <TextField select label="בחר סוג שיעור" value={regular_lesson.lesson_type} onChange={(e) => register({name:"lesson_type"+key, value: e.target.value})} fullWidth>
                                            <MenuItem value="פרטי">
                                                    פרטי
                                            </MenuItem>
                                            <MenuItem value="קבוצתי">
                                                    קבוצתי
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField select label="בחר יום קבוע" value={regular_lesson.day} onChange={(e) => register({name:"day"+key, value: e.target.value})} fullWidth>
                                            {days.map((d) =>(
                                            <MenuItem value={d}>{d}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name={"start_time"+key} value={regular_lesson.start_time} fullWidth label="שעת התחלת שיעור" type="time" inputRef={register}
                                            inputProps={{ 
                                            step: 300, // 5 min
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name={"end_time"+key} value={regular_lesson.end_time} fullWidth label="שעת סיום שיעור" type="time" inputRef={register}
                                            inputProps={{ 
                                            step: 300, // 5 min
                                            }}
                                        />
                                    </Grid>
                                </Grid>                            
                            ))}
                            <Grid item xs={12} style={{display:(addLesson?"block":"none")}}>
                                <Button startIcon={<AddCircleOutlineIcon />} style={{color:'green'}} onClick={()=>{setAddLesson(false)}}>
                                &nbsp;הוספת שיעור   
                                </Button>
                            </Grid>
                            <Grid container justify="center" spacing={3} style={{display:(addLesson?"none":"block")}}>
                                <Grid item xs={12}>
                                    <label><br/>פרטי שיעור שני</label>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="price1" type="number" inputRef={register} label="תעריף" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="בחר הסדר תשלום" onChange={(e) => register({name:"funding_source1", value: e.target.value})} fullWidth>
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
                                    <TextField select label="בחר סוג שיעור" onChange={(e) => register({name:"lesson_type1", value: e.target.value})} fullWidth>
                                        <MenuItem value="פרטי">
                                                פרטי
                                        </MenuItem>
                                        <MenuItem value="קבוצתי">
                                                קבוצתי
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField select label="בחר יום קבוע" onChange={(e) => register({name:"day1", value: e.target.value})} fullWidth>
                                        {days.map((d) =>(
                                        <MenuItem value={d}>{d}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="start_time1" fullWidth label="בחר שעת התחלת שיעור" defaultValue="00:00" type="time" inputRef={register}
                                        inputProps={{ 
                                        step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="end_time1" fullWidth label="בחר שעת סיום שיעור" defaultValue="00:00" type="time" inputRef={register}
                                        inputProps={{ 
                                        step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{display:(addLesson?"none":"block")}}>
                                <Button startIcon={<RemoveCircleOutlineIcon />} style={{color:'red'}} onClick={()=>{setAddLesson(true)}}>
                                &nbsp;הסר שיעור   
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined"
                                        color="primary"
                                        type="submit">
                                    שמור שינויים
                                </Button>
                            </Grid>
                    </Paper>
                </main>
            </form>:null}
        </React.Fragment>
    )
}
