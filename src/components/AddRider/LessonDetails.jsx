import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


export default function LessonDetails(props) {
    const { register, handleSubmit} = useForm();
    const [showLessonDetails,setShowLessonDetails] = useState(false);
    const [instructors,setInstructors]=useState("");
    const [horses,setHorses]=useState([]);
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];
    const [addLesson,setAddLesson] = useState(false);


    const onSubmit = (data) => {
        props.getLessonDetails(data);
    }

    useEffect(()=>{
        getInstructors();
        getHorses();
    },[]);

    useEffect(()=>{
        setShowLessonDetails(props.show);
    });

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
        <form onSubmit={handleSubmit(onSubmit)}>
            {instructors!==""?
            <Grid container spacing={3} style={{display:(showLessonDetails?"block":"none")}}>
                <Grid item>
                    <label>פרטי השיעור</label>
                </Grid>
                <Grid item>
                    <TextField select label="בחר מדריך קבוע" variant="outlined" onChange={(e) => register({name:"instructor_id", value: e.target.value, required: true})} style={{width:"25ch"}}>
                        {instructors.map((i) =>(
                        <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField select label="בחר סוס קבוע" variant="outlined" onChange={(e) => register({name:"horse_id", value: e.target.value, required: true})} style={{width:"25ch"}}>
                        <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                        {horses.map((h) =>(
                        <MenuItem value={h.id}>{h.name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField name="price" type="number" inputRef={register} defaultValue={0} label="תעריף" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField select label="בחר הסדר תשלום" variant="outlined" onChange={(e) => register({name:"funding_source", value: e.target.value})} style={{width:"25ch"}}>
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
                <Grid item>
                    <TextField select label="בחר סוג שיעור" variant="outlined" onChange={(e) => register({name:"lesson_type", value: e.target.value})} style={{width:"25ch"}}>
                        <MenuItem value="פרטי">
                                פרטי
                        </MenuItem>
                        <MenuItem value="קבוצתי">
                                קבוצתי
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField select label="בחר יום קבוע" variant="outlined" onChange={(e) => register({name:"day", value: e.target.value})} style={{width:"25ch"}}>
                        {days.map((d) =>(
                        <MenuItem value={d}>{d}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField name="start_time" style={{width:"25ch"}} variant="outlined" defaultValue="00:00" label="בחר שעת תחילת שיעור" type="time" inputRef={register}
                        inputProps={{ 
                        step: 300, // 5 min
                        }}
                    />
                </Grid>
                <Grid item>
                        <TextField name="end_time" style={{width:"25ch"}} variant="outlined" defaultValue="00:00" label="בחר שעת סיום שיעור" type="time" inputRef={register}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                        />
                </Grid>
                <Grid item style={{display:(addLesson?"none":"block")}}>
                    <Button startIcon={<AddCircleOutlineIcon />} style={{color:'green'}} onClick={()=>{setAddLesson(true)}}>
                    &nbsp;הוספת שיעור   
                    </Button>
                </Grid>
                <Grid item style={{display:(addLesson?"block":"none")}}>
                    <Button startIcon={<RemoveCircleOutlineIcon />} style={{color:'red'}} onClick={()=>{setAddLesson(false)}}>
                    &nbsp;הסר שיעור   
                    </Button>
                </Grid>
                <Grid container spacing={3} style={{display:(addLesson?"block":"none")}}>
                    <Grid item>
                        <TextField name="price2" type="number" inputRef={register} defaultValue={0} label="תעריף" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField select label="בחר הסדר תשלום" variant="outlined" onChange={(e) => register({name:"funding_source2", value: e.target.value})} style={{width:"25ch"}}>
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
                    <Grid item>
                        <TextField select label="בחר סוג שיעור" variant="outlined" onChange={(e) => register({name:"lesson_type2", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value="פרטי">
                                פרטי
                            </MenuItem>
                            <MenuItem value="קבוצתי">
                                קבוצתי
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField select label="בחר יום קבוע" variant="outlined" onChange={(e) => register({name:"day2", value: e.target.value})} style={{width:"25ch"}}>
                            {days.map((d) =>(
                            <MenuItem value={d}>{d}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="start_time2" style={{width:"25ch"}} variant="outlined" defaultValue="00:00" label="בחר שעת תחילת שיעור" type="time" inputRef={register}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField name="end_time2" style={{width:"25ch"}} variant="outlined" defaultValue="00:00" label="בחר שעת סיום שיעור" type="time" inputRef={register}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container item justify="center" alignItems="center" xs={12}>
                    <Grid item>
                        <Button variant="outlined"
                                color="primary"
                                onClick={()=> props.goBack()}>
                            חזור
                        </Button>
                    </Grid>
                    <Grid item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Grid>
                    <Grid item>
                        <Button variant="outlined"
                                type="submit"
                                color="primary"
                        >
                            סיום רישום
                        </Button>
                    </Grid>
                </Grid>
            </Grid>:null}
        </form>
    )
}
