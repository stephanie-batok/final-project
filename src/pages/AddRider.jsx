import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,Checkbox,FormControlLabel,Container,MenuItem} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


export default function AddRider(props) {
    const { register, handleSubmit,setValue} = useForm();
    const [showPersonalDetails,setShowPersonalDetails] = useState(true);
    const [showParentDetails,setShowParentDetails] = useState(false);
    const [showLessonDetails,setShowLessonDetails] = useState(false);
    const [instructors,setInstructors]=useState([]);
    const [horses,setHorses]=useState([]);
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];
    const [addLesson,setAddLesson] = useState(false);    

    const onSubmit = data => console.log(data);

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

    useEffect(()=>{
        getInstructors();
        getHorses();
    },[]);


    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>

                                       {/*PERSONAL DETAILS SECTION*/}
                <Grid container spacing={1} style={{display:(showPersonalDetails?"block":"none")}}>
                    <Grid item xs={12}>
                        <TextField name="first_name" inputRef={register} label="שם פרטי" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="last_name" inputRef={register} label="שם משפחה" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="id" inputRef={register} label="תעודת זהות" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField select label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="dateOfBirth" style={{width:"26ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="phone" inputRef={register} label="מספר טלפון" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="city" inputRef={register} label="עיר מגורים" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="address" inputRef={register} label="כתובת" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="height" inputRef={register} label="גובה" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="weight" inputRef={register} label="משקל" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="email" inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="password" inputRef={register} label="סיסמה" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="healthForm" inputRef={register} label="טופס הצהרת בריאות" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined"
                                color="primary"
                                onClick={()=> {setShowPersonalDetails(false);
                                               setShowParentDetails(true);           
                                            }}>
                            שמור והמשך
                        </Button>
                    </Grid>
                </Grid>
                                        {/*PARENT DETAILS SECTION*/}
                <Grid container spacing={2} style={{display:(showParentDetails?"block":"none")}}>
                    <Grid item>
                        <label>פרטי הורה ראשון</label>
                    </Grid>
                    <Grid item>
                        <TextField name="parent1_id" inputRef={register} label="תעודת זהות" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField name="parent1_first_name" inputRef={register} label="שם פרטי" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField name="parent1_last_name" inputRef={register} label="שם משפחה" variant="outlined" />
                    </Grid>                    
                    <Grid item>
                        <TextField select label="בחר מגדר" onChange={(e) => register({name:"parent1gender", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="parent1_phone" inputRef={register} label="מספר טלפון" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField name="parent1_email" inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <label>פרטי הורה שני</label>
                    </Grid>
                    <Grid item>
                        <TextField name="parent2_id" inputRef={register} label="תעודת זהות" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField name="parent2_first_name" inputRef={register} label="שם פרטי" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField name="parent2_last_name" inputRef={register} label="שם משפחה" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField select label="בחר מגדר" onChange={(e) => register({name:"parent2gender", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField name="parent2_phone" inputRef={register} label="מספר טלפון" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField name="parent2_email" inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <Button variant="outlined"
                                color="primary"
                                onClick={()=> {setShowParentDetails(false);
                                               setShowLessonDetails(true);           
                                            }}>
                            שמור והמשך
                        </Button>
                    </Grid>
                </Grid>
                                        {/*LESSON DETAILS SECTION*/}
                <Grid container spacing={3} style={{display:(showLessonDetails?"block":"none")}}>
                    <Grid item xs={12}>
                        <TextField select label="בחר מדריך קבוע" onChange={(e) => register({name:"instructor", value: e.target.value})} style={{width:"25ch"}}>
                            {instructors.map((i) =>(
                            <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField select label="בחר סוס קבוע" onChange={(e) => register({name:"horse", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                            {horses.map((h) =>(
                            <MenuItem value={h.id}>{h.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="price" type="number" inputRef={register} label="תעריף" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField select label="בחר הסדר תשלום" onChange={(e) => register({name:"funding_source", value: e.target.value})} style={{width:"25ch"}}>
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
                    <Grid item xs={12}>
                        <TextField select label="בחר סוג שיעור" onChange={(e) => register({name:"lesson_type", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value="פרטי">
                                 פרטי
                            </MenuItem>
                            <MenuItem value="קבוצתי">
                                 קבוצתי
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField select label="בחר יום קבוע" onChange={(e) => register({name:"day", value: e.target.value})} style={{width:"25ch"}}>
                            {days.map((d) =>(
                            <MenuItem value={d}>{d}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="time" style={{width:"26ch"}} defaultValue="00:00" label="בחר שעה קבועה" type="time" inputRef={register}
                            inputProps={{ 
                            step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button startIcon={<AddCircleOutlineIcon />} style={{color:'green'}} onClick={()=>{setAddLesson(true)}}>
                        &nbsp;הוספת שיעור   
                        </Button>
                    </Grid>
                    <Grid container spacing={3} style={{display:(addLesson?"block":"none")}}>
                        <Grid item xs={12}>
                            <TextField name="price2" type="number" inputRef={register} label="תעריף" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select label="בחר הסדר תשלום" onChange={(e) => register({name:"funding_source2", value: e.target.value})} style={{width:"25ch"}}>
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
                        <Grid item xs={12}>
                            <TextField select label="בחר סוג שיעור" onChange={(e) => register({name:"lesson_type2", value: e.target.value})} style={{width:"25ch"}}>
                                <MenuItem value="פרטי">
                                    פרטי
                                </MenuItem>
                                <MenuItem value="קבוצתי">
                                    קבוצתי
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select label="בחר יום קבוע" onChange={(e) => register({name:"day2", value: e.target.value})} style={{width:"25ch"}}>
                                {days.map((d) =>(
                                <MenuItem value={d}>{d}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="time2" style={{width:"26ch"}} defaultValue="00:00" label="בחר שעה קבועה" type="time" inputRef={register}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined"
                                type="submit"
                                color="primary"
                        >
                            סיום רישום
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}
