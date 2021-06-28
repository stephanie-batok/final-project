import React,{useState,useEffect} from 'react';
import apiUrl from '../../../global';
import { useForm } from "react-hook-form";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {Button,Grid,TextField,MenuItem,Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';



export default function LessonDetails(props) {
    const { register, handleSubmit,getValues} = useForm({mode: 'onBlur'});
    const [instructors,setInstructors]=useState("");
    const [horses,setHorses]=useState("");
    const [addLesson,setAddLesson] = useState(props.addLesson);
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];
    const [rider,setRider] = useState("");
    const [error, setError] =  useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{
        setRider(props.rider);
        getInstructors();
        getHorses();
    },[]);

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

    const onSubmit = (data) => {
        setError("");

        let lessons = [];
        let key = 0;
        let lessons_num = rider.regular_lessons.length;

        while (key<2) {
            
            let lesson = rider.regular_lessons[key];
            let day = getValues('day'+key);

            if(lessons_num!==2 && key===1){
                day = day===undefined?"":data["day"+key];                
            }
            else {
                day = day===undefined?lesson.day:data["day"+key];
            }

            if(day!==""){
                lessons.push({
                    "lesson_id":lessons_num!==2 && key===1? null : lesson.lesson_id,
                    "price": parseInt(data["price"+key]),
                    "funding_source": data["funding_source"+key],
                    "lesson_type": data["lesson_type"+key],
                    "day": day,
                    "start_time": data["start_time"+key],
                    "end_time":data["end_time"+key]
                });
            }
            else {
                setError("אנא השלם את כל השדות המסומנים בכוכבית (*).");
            }

            if(addLesson)
                break;
            key+=1;
        }

        if(error===""){
            let newLessonDetails={                                  //create object to send in the body of Put method
                "id":rider.id,
                "instructor_id": getValues('instructor_id')===undefined?rider.instructor_id:data.instructor_id,
                "horse_id": getValues('horse_id')===undefined?rider.horse_id:data.horse_id,
                "regular_lessons":lessons,
            }
            console.log(newLessonDetails);
        
            fetch(apiUrl+"Rider/LessonDetails/"+rider.id,                                    //edit rider's Lesson Details in db with Put method
                {
                  method: 'PUT',
                  body: JSON.stringify(newLessonDetails),
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
    }

    return (
        <React.Fragment>
            {rider!==""?
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}></Grid>
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
                    <Grid container justify="center" spacing={4}>
                        <Grid item xs={12}>
                                {key===0?
                                <Typography variant="h7"><br/>פרטי שיעור ראשון</Typography>:
                                <Typography variant="h7"><br/>פרטי שיעור שני</Typography>}
                            </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name={"price"+key} defaultValue={regular_lesson.price} type="number" inputRef={register} label="תעריף" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select label="בחר הסדר תשלום" defaultValue={regular_lesson.funding_source} onChange={(e) => register({name:"funding_source"+key, value: e.target.value})} fullWidth>
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
                            <TextField select label="בחר סוג שיעור" defaultValue={regular_lesson.lesson_type} onChange={(e) => register({name:"lesson_type"+key, value: e.target.value})} fullWidth>
                                <MenuItem value="פרטי">
                                        פרטי
                                </MenuItem>
                                <MenuItem value="קבוצתי">
                                        קבוצתי
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select label="בחר יום קבוע" defaultValue={regular_lesson.day} onChange={(e) => register({name:"day"+key, value: e.target.value})} fullWidth>
                                {days.map((d) =>(
                                <MenuItem value={d}>{d}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name={"start_time"+key} defaultValue={regular_lesson.start_time} fullWidth label="שעת התחלת שיעור" type="time" inputRef={register}
                                inputProps={{ 
                                step: 300, // 5 min
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name={"end_time"+key} defaultValue={regular_lesson.end_time} fullWidth label="שעת סיום שיעור" type="time" inputRef={register}
                                inputProps={{ 
                                step: 300, // 5 min
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
                {addLesson?
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Button startIcon={<AddCircleOutlineIcon />} style={{color:'green'}} onClick={()=>{setAddLesson(false)}}>
                        &nbsp;הוספת שיעור   
                        </Button>
                    </Grid>
                </Grid>:null}
                {addLesson? null:
                <Grid container justify="center" spacing={3}>
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
                        <TextField select label="בחר יום קבוע*" onChange={(e) => register({name:"day1", value: e.target.value})} fullWidth>
                            {days.map((d) =>(
                            <MenuItem value={d}>{d}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="start_time1" fullWidth label="בחר שעת התחלת שיעור*" defaultValue="00:00" type="time" inputRef={register}
                            inputProps={{ 
                            step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="end_time1" fullWidth label="בחר שעת סיום שיעור*" defaultValue="00:00" type="time" inputRef={register}
                            inputProps={{ 
                            step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button startIcon={<RemoveCircleOutlineIcon />} style={{color:'red'}} onClick={()=>{setAddLesson(true)}}>
                        &nbsp;הסר שיעור   
                        </Button>
                    </Grid>
                </Grid>}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h7" gutterBottom style={{color:"red"}}>
                            {error}
                        </Typography>
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
            </form>:null}
        </React.Fragment>
    )
}
