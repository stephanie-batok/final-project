import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {Button,Grid,TextField,MenuItem,Container} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


export default function EditRider(props) {
    let { id } = useParams();
    const { register, handleSubmit,setValue} = useForm({mode: 'onBlur'});
    const [rider,setRider] = useState("");
    const [instructors,setInstructors]=useState("");
    const [horses,setHorses]=useState("");
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];
    const [addLesson,setAddLesson] = useState(false);

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
                  console.log('====================================');
                  console.log(result.regular_lessons.length);
                  console.log('====================================');

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
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                {rider!==""?<Grid container justify="center" spacing={3}>
                    <Grid container item justify="center" xs={6} spacing={3}>
                        <Grid item xs={12}>
                            <label>פרטים אישיים</label>
                        </Grid>
                        <Grid item>
                            <TextField name="first_name" defaultValue={rider.first_name} inputRef={register} label="שם פרטי" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="last_name" defaultValue={rider.last_name} inputRef={register} label="שם משפחה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="id" defaultValue={rider.id} inputRef={register} label="תעודת זהות" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField select variant="outlined" defaultValue={rider.gender} label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} style={{width:"24ch"}}>
                                <MenuItem value="זכר">
                                    זכר
                                </MenuItem>
                                <MenuItem value="נקבה">
                                    נקבה
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField name="date_of_birth" defaultValue={rider.date_of_birth} style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="phone" defaultValue={rider.phone} inputRef={register} label="מספר טלפון" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="city" defaultValue={rider.city} inputRef={register} label="עיר מגורים" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="address" defaultValue={rider.address} inputRef={register} label="כתובת" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField select label="בחר מגזר רכיבה" defaultValue={rider.riding_type} variant="outlined" onChange={(e) => register({name:"riding_type", value: e.target.value})} style={{width:"24ch"}}>
                                <MenuItem value="רכיבה ספורטיבית">
                                רכיבה ספורטיבית
                                </MenuItem>
                                <MenuItem value="רכיבה טיפולית">
                                רכיבה טיפולית
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField name="starting_date" defaultValue={rider.starting_date} style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך רישום לחווה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="height" defaultValue={rider.height} inputRef={register} defaultValue={0} label="גובה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="weight" defaultValue={rider.weight} inputRef={register} defaultValue={0} type="number" label="משקל" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="email" defaultValue={rider.email} inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="password" defaultValue={rider.password} inputRef={register} label="סיסמה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="healthForm" defaultValue={rider.healthForm} inputRef={register} label="טופס הצהרת בריאות" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <label>פרטי הורים</label>
                        </Grid>
                        {rider.parents.length!==0?rider.parents.map((parent,key)=>(
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={12}>
                                    {key===0?<label><br/>פרטי הורה ראשון</label>:<label><br/>פרטי הורה שני</label>}
                                </Grid>
                                <Grid item>
                                    <TextField name={"parent_id"+key} value={parent.id} inputRef={register} label="תעודת זהות" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField name={"parent_first_name"+key} value={parent.first_name} inputRef={register} label="שם פרטי" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField name={"parent_last_name"+key} value={parent.last_name} inputRef={register} label="שם משפחה" variant="outlined" />
                                </Grid>                    
                                <Grid item>
                                    <TextField select label="בחר מגדר" value={parent.gender} variant="outlined" onChange={(e) => register({name:"parent_gender"+key, value: e.target.value})} style={{width:"25ch"}}>
                                        <MenuItem value="זכר">
                                            זכר
                                        </MenuItem>
                                        <MenuItem value="נקבה">
                                            נקבה
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <TextField name={"parent_phone"+key} value={parent.phone} inputRef={register} label="מספר טלפון" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField name={"parent_email"+key} value={parent.email} inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                                </Grid>
                            </Grid>
                        )):
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={12}>
                                <label><br/>פרטי הורה ראשון</label>
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_id0"} inputRef={register} label="תעודת זהות" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_first_name0"} inputRef={register} label="שם פרטי" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_last_name0"} inputRef={register} label="שם משפחה" variant="outlined" />
                            </Grid>                    
                            <Grid item>
                                <TextField select label="בחר מגדר" variant="outlined" onChange={(e) => register({name:"parent_gender0", value: e.target.value})} style={{width:"25ch"}}>
                                    <MenuItem value="זכר">
                                        זכר
                                    </MenuItem>
                                    <MenuItem value="נקבה">
                                        נקבה
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_phone0"} inputRef={register} label="מספר טלפון" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_email0"} inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                 <label><br/>פרטי הורה שני</label>
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_id1"} inputRef={register} label="תעודת זהות" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_first_name1"} inputRef={register} label="שם פרטי" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_last_name1"} inputRef={register} label="שם משפחה" variant="outlined" />
                            </Grid>                    
                            <Grid item>
                                <TextField select label="בחר מגדר" variant="outlined" onChange={(e) => register({name:"parent_gender1", value: e.target.value})} style={{width:"25ch"}}>
                                    <MenuItem value="זכר">
                                        זכר
                                    </MenuItem>
                                    <MenuItem value="נקבה">
                                        נקבה
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_phone1"} inputRef={register} label="מספר טלפון" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField name={"parent_email1"} inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                            </Grid>
                        </Grid>}
                        <Grid item xs={12}>
                            <label><br/>פרטי שיעורים קבועים</label>
                        </Grid>
                        <Grid item>
                            <TextField select label="בחר מדריך קבוע" defaultValue={rider.instructor_id} variant="outlined" onChange={(e) => register({name:"instructor_id", value: e.target.value})} style={{width:"25ch"}}>
                                {instructors!==""?instructors.map((i) =>(
                                <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                                )):null}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField select label="בחר סוס קבוע" defaultValue={rider.horse_id} variant="outlined" onChange={(e) => register({name:"horse_id", value: e.target.value})} style={{width:"25ch"}}>
                                <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                                {horses!==""?horses.map((h) =>(
                                <MenuItem value={h.id}>{h.name}</MenuItem>
                                )):null}
                            </TextField>
                        </Grid>
                        {rider.regular_lessons.map((regular_lesson,key) =>(
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={12}>
                                   {key===0?<label><br/>פרטי שיעור ראשון</label>:<label><br/>פרטי שיעור שני</label>}
                                </Grid>
                                <Grid item>
                                    <TextField name={"price"+key} value={regular_lesson.price} type="number" inputRef={register} label="תעריף" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField select label="בחר הסדר תשלום" value={regular_lesson.funding_source} variant="outlined" onChange={(e) => register({name:"funding_source"+key, value: e.target.value})} style={{width:"25ch"}}>
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
                                    <TextField select label="בחר סוג שיעור" value={regular_lesson.lesson_type} variant="outlined" onChange={(e) => register({name:"lesson_type"+key, value: e.target.value})} style={{width:"25ch"}}>
                                        <MenuItem value="פרטי">
                                                פרטי
                                        </MenuItem>
                                        <MenuItem value="קבוצתי">
                                                קבוצתי
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <TextField select label="בחר יום קבוע" value={regular_lesson.day} variant="outlined" onChange={(e) => register({name:"day"+key, value: e.target.value})} style={{width:"25ch"}}>
                                        {days.map((d) =>(
                                        <MenuItem value={d}>{d}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item>
                                    <TextField name={"start_time"+key} style={{width:"25ch"}} value={regular_lesson.start_time} variant="outlined" label="שעת התחלת שיעור" type="time" inputRef={register}
                                        inputProps={{ 
                                        step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField name={"end_time"+key} style={{width:"25ch"}} value={regular_lesson.end_time} variant="outlined" label="שעת סיום שיעור" type="time" inputRef={register}
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
                            <Grid item>
                                <TextField name="price1" type="number" inputRef={register} label="תעריף" variant="outlined" />
                            </Grid>
                            <Grid item>
                                <TextField select label="בחר הסדר תשלום" variant="outlined" onChange={(e) => register({name:"funding_source1", value: e.target.value})} style={{width:"25ch"}}>
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
                                <TextField select label="בחר סוג שיעור" variant="outlined" onChange={(e) => register({name:"lesson_type1", value: e.target.value})} style={{width:"25ch"}}>
                                    <MenuItem value="פרטי">
                                            פרטי
                                    </MenuItem>
                                    <MenuItem value="קבוצתי">
                                            קבוצתי
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField select label="בחר יום קבוע" variant="outlined" onChange={(e) => register({name:"day1", value: e.target.value})} style={{width:"25ch"}}>
                                    {days.map((d) =>(
                                    <MenuItem value={d}>{d}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <TextField name="start_time1" style={{width:"25ch"}} variant="outlined" label="בחר שעת התחלת שיעור" defaultValue="00:00" type="time" inputRef={register}
                                    inputProps={{ 
                                    step: 300, // 5 min
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField name="end_time1" style={{width:"25ch"}} variant="outlined" label="בחר שעת סיום שיעור" defaultValue="00:00" type="time" inputRef={register}
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
                    </Grid>
                </Grid>:null}
            </form>
        </Container>
    )
}
