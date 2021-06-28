import React,{useState,useEffect} from 'react';
import apiUrl from '../../../global';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem,Typography} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));


export default function LessonDetails(props) {
    const { register,getValues} = useForm();
    const [instructors,setInstructors]=useState("");
    const [horses,setHorses]=useState([]);
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];
    const [addLesson,setAddLesson] = useState(true);
    const classes = useStyles();


    const handleBack = () => {
        props.handleBack();
    }

    const handleNext = () => {
        props.getLessonDetails(getValues());
    }

    useEffect(() => {
        getInstructors();
        getHorses();
    }, []);

    const getInstructors = () => {

        fetch(apiUrl+"Worker/Instructor",
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

        fetch(apiUrl+"Horse/",
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
            <Typography variant="h5" gutterBottom>
                פרטי השיעור
            </Typography>
            <form>
                {instructors!==""?
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="* בחר מדריך קבוע" onChange={(e) => register({name:"instructor_id", value: e.target.value, required: true})} fullWidth>
                            {instructors.map((i) =>(
                            <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="* בחר סוס קבוע" onChange={(e) => register({name:"horse_id", value: e.target.value, required: true})} fullWidth>
                            <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                            {horses.map((h) =>(
                            <MenuItem value={h.id}>{h.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}> 
                        <TextField name="price" type="number" inputRef={register} defaultValue={0} label="תעריף" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="בחר הסדר תשלום" onChange={(e) => register({name:"funding_source", value: e.target.value})} fullWidth>
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
                        <TextField select label="בחר סוג שיעור" onChange={(e) => register({name:"lesson_type", value: e.target.value})} fullWidth>
                            <MenuItem value="פרטי">
                                    פרטי
                            </MenuItem>
                            <MenuItem value="קבוצתי">
                                    קבוצתי
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="בחר יום קבוע" onChange={(e) => register({name:"day", value: e.target.value})} fullWidth>
                            {days.map((d) =>(
                            <MenuItem value={d}>{d}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="start_time" fullWidth defaultValue="00:00" label="בחר שעת תחילת שיעור" type="time" inputRef={register}
                            inputProps={{ 
                            step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                            <TextField name="end_time" fullWidth defaultValue="00:00" label="בחר שעת סיום שיעור" type="time" inputRef={register}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            startIcon={addLesson?<AddCircleOutlineIcon />:<RemoveCircleOutlineIcon />} 
                            style={{color:(addLesson?'green':'red')}} 
                            onClick={()=>{setAddLesson(!addLesson)}}
                            >
                                &nbsp;
                                {addLesson?"הוספת שיעור":"הסר שיעור"}
                        </Button>
                    </Grid>
                    {addLesson? null:
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <TextField name="price2" type="number" inputRef={register} defaultValue={0} label="תעריף" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select label="בחר הסדר תשלום" onChange={(e) => register({name:"funding_source2", value: e.target.value})} fullWidth>
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
                            <TextField select label="בחר סוג שיעור" onChange={(e) => register({name:"lesson_type2", value: e.target.value})} fullWidth>
                                <MenuItem value="פרטי">
                                    פרטי
                                </MenuItem>
                                <MenuItem value="קבוצתי">
                                    קבוצתי
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select label="בחר יום קבוע" onChange={(e) => register({name:"day2", value: e.target.value})} fullWidth>
                                {days.map((d) =>(
                                <MenuItem value={d}>{d}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="start_time2" fullWidth defaultValue="00:00" label="בחר שעת תחילת שיעור" type="time" inputRef={register}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="end_time2" fullWidth defaultValue="00:00" label="בחר שעת סיום שיעור" type="time" inputRef={register}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                            />
                        </Grid>
                    </Grid>}
                </Grid>:null}
                <div className={classes.buttons}>
                    <Button onClick={handleBack} className={classes.button}>
                        חזור
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                        שמור והמשך
                    </Button>
                </div>
            </form>
        </React.Fragment>
    )
}
