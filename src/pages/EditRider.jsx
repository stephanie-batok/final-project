import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {Button,Grid,TextField,MenuItem,Container} from '@material-ui/core';

export default function EditRider(props) {
    let { id } = useParams();
    const { register, handleSubmit} = useForm();
    const [rider,setRider] = useState("");
    const [instructors,setInstructors]=useState([]);
    const [horses,setHorses]=useState([]);
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];
    const [addLesson,setAddLesson] = useState(false);

    useEffect(()=>{
        getRider();
        getInstructors();
        getHorses();
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
                  console.log(result);
                  console.log('====================================');
                  console.log(rider);
                  console.log('====================================');
                  console.log(rider.parents);
              },
              (error) => {
                alert(error);
            }
        );
    }
    const getInstructors = () => {
        let apiUrl= props.apiUrl + "SystemUser/Instructor";

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
                <Grid container justify="center" spacing={3}>
                    <Grid container item justify="center" xs={6} spacing={3}>
                        <Grid item xs={12}>
                            <label>פרטים אישיים</label>
                        </Grid>
                        <Grid item>
                            <TextField name="first_name" value={rider.first_name} inputRef={register} label="שם פרטי" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="last_name" value={rider.last_name} inputRef={register} label="שם משפחה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="id" value={rider.id} inputRef={register} label="תעודת זהות" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField select variant="outlined" value={rider.gender} label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} style={{width:"24ch"}}>
                                <MenuItem value="זכר">
                                    זכר
                                </MenuItem>
                                <MenuItem value="נקבה">
                                    נקבה
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField name="date_of_birth" value={rider.date_of_birth} style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="phone" value={rider.phone} inputRef={register} label="מספר טלפון" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="city" value={rider.city} inputRef={register} label="עיר מגורים" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="address" value={rider.address} inputRef={register} label="כתובת" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField select label="בחר מגזר רכיבה" value={rider.riding_type} variant="outlined" onChange={(e) => register({name:"riding_type", value: e.target.value})} style={{width:"24ch"}}>
                                <MenuItem value="רכיבה ספורטיבית">
                                רכיבה ספורטיבית
                                </MenuItem>
                                <MenuItem value="רכיבה טיפולית">
                                רכיבה טיפולית
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField name="starting_date" value={rider.starting_date} style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך רישום לחווה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="height" value={rider.height} inputRef={register} defaultValue={0} label="גובה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="weight" value={rider.weight} inputRef={register} defaultValue={0} type="number" label="משקל" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="email" value={rider.email} inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="password" value={rider.password} inputRef={register} label="סיסמה" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="healthForm" value={rider.healthForm} inputRef={register} label="טופס הצהרת בריאות" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <label>פרטי הורים</label>
                        </Grid>
                        {rider.parents.map((parent,key)=>(
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
                                    <TextField name={"parent_phone"+key+1} value={parent.phone} inputRef={register} label="מספר טלפון" variant="outlined" />
                                </Grid>
                                <Grid item>
                                    <TextField name={"parent_email"+key+1} value={parent.email} inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                                </Grid>
                            </Grid>

                        ))}
                        <Grid item xs={12}>
                            <label>פרטי שיעורים קבועים</label>
                        </Grid>
                        <Grid item>
                            <TextField select label="בחר מדריך קבוע" variant="outlined" onChange={(e) => register({name:"instructor_id", value: e.target.value})} style={{width:"25ch"}}>
                                {instructors.map((i) =>(
                                <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField select label="בחר סוס קבוע" variant="outlined" onChange={(e) => register({name:"horse_id", value: e.target.value})} style={{width:"25ch"}}>
                                <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                                {horses.map((h) =>(
                                <MenuItem value={h.id}>{h.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {rider.regular_lessons.map((regular_lesson,key) =>(
                            <Grid container justify="center" spacing={3}>
                                <Grid item xs={12}>
                                   {key===0?<label><br/>פרטי שיעור ראשון</label>:<label><br/>פרטי שיעור שני</label>}
                                </Grid>
                                {/* <Grid item>
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
                                    <TextField name="time" style={{width:"25ch"}} variant="outlined" defaultValue="00:00" label="בחר שעה קבועה" type="time" inputRef={register}
                                        inputProps={{ 
                                        step: 300, // 5 min
                                        }}
                                    />
                                </Grid> */}
                            </Grid>                            
                        ))}


                        <Grid item xs={12}>
                            <Button variant="outlined"
                                    color="primary"
                                    type="submit">
                                שמור שינויים
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>


                        
        </Container>
    )
}
