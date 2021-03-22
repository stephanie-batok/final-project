import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem,Container} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


export default function AddRider(props) {
    const { register, handleSubmit,getValues} = useForm();
    const [showPersonalDetails,setShowPersonalDetails] = useState(true);
    const [showParentDetails,setShowParentDetails] = useState(false);
    const [showLessonDetails,setShowLessonDetails] = useState(false);
    const [instructors,setInstructors]=useState([]);
    const [horses,setHorses]=useState([]);
    const days =["ראשון","שני","שלישי","רביעי","חמישי","שישי"];
    const [addLesson,setAddLesson] = useState(false);    


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

    const onSubmit = () => {
        let apiUrl= props.apiUrl + "Rider/";

        let newRider={                                  //create object to send in the body of POST method
            "id": getValues("id"),
            "first_name": getValues("first_name"),
            "last_name": getValues("last_name"),
            "gender": getValues("gender"),
            "date_of_birth":getValues("date_of_birth"),
            "phone_number":getValues("phone_number"),
            "email":getValues("email"),
            "password":getValues("password"),
            "riding_type":getValues("riding_type"),
            "weight":parseInt(getValues("weight")),
            "height": parseFloat(getValues("height")),
            "starting_date":getValues("starting_date"),
            "instructor_id":getValues("instructor_id"),
            "horse_id":getValues("horse_id"),
            "healthForm":getValues("healthForm"),
            "parents":[
                {
                    "id": getValues("parent1_id"),
                    "first_name": getValues("parent1_first_name"),
                    "last_name": getValues("parent1_last_name"),
                    "gender": getValues("parent1_gender"),
                    "phone_number":getValues("parent1_phone_number"),
                    "email":getValues("parent1_email")
                },
                {
                    "id": getValues("parent2_id"),
                    "first_name": getValues("parent2_first_name"),
                    "last_name": getValues("parent2_last_name"),
                    "gender": getValues("parent2_gender"),
                    "phone_number":getValues("parent2_phone_number"),
                    "email":getValues("parent2_email")
                }
            ],
            "regular_lessons":[
                {
                    "day":getValues("day"),
                    "time":getValues("time"),
                    "lesson_type":getValues("lesson_type"),
                    "price":parseInt(getValues("price")),
                    "funding_source":getValues("funding_source")
                },
                addLesson?{
                    "day":getValues("day2"),
                    "time":getValues("time2"),
                    "lesson_type":getValues("lesson_type2"),
                    "price":parseInt(getValues("price2")),
                    "funding_source":getValues("funding_source2")
                }:null
            ]
        }

        fetch(apiUrl,                                    //add new rider to db with POST method
            {
              method: 'POST',
              body: JSON.stringify(newRider),
              headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
              })
            })
            .then(res => {
              console.log('res=', res);
              console.log('res.status', res.status);
              console.log('res.ok', res.ok);
             
              return res.json()
            })
            .then(
              (result) => {
                alert(result);
              },
              (error) => {
                console.log("err post=", error);
              });           

    }

    useEffect(()=>{
        getInstructors();
        getHorses();
    },[]);


    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>

                                       {/*PERSONAL DETAILS SECTION*/}
                <Grid container spacing={3} style={{display:(showPersonalDetails?"block":"none")}}>
                    <Grid item>
                        <label>פרטים אישיים</label>
                    </Grid>
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
                        <TextField select variant="outlined" label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} style={{width:"24ch"}}>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="date_of_birth" style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" variant="outlined" />
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
                        <TextField select label="בחר מגזר רכיבה" variant="outlined" onChange={(e) => register({name:"riding_type", value: e.target.value})} style={{width:"24ch"}}>
                            <MenuItem value="רכיבה ספורטיבית">
                            רכיבה ספורטיבית
                            </MenuItem>
                            <MenuItem value="רכיבה טיפולית">
                            רכיבה טיפולית
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="starting_date" style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך רישום לחווה" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="height" inputRef={register} defaultValue={0} label="גובה" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="weight" inputRef={register} defaultValue={0} type="number" label="משקל" variant="outlined" />
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
                <Grid container spacing={3} style={{display:(showParentDetails?"block":"none")}}>
                    <Grid item>
                        <label>פרטי ההורים</label>
                    </Grid>
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
                        <TextField select label="בחר מגדר" variant="outlined" onChange={(e) => register({name:"parent1_gender", value: e.target.value})} style={{width:"25ch"}}>
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
                        <TextField select label="בחר מגדר" variant="outlined" onChange={(e) => register({name:"parent2_gender", value: e.target.value})} style={{width:"25ch"}}>
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
                    <Grid container item justify="center" alignItems="center" xs={12}>
                        <Grid item>
                            <Button variant="outlined"
                                    color="primary"
                                    onClick={()=> {setShowParentDetails(false);
                                                setShowPersonalDetails(true);           
                                                }}>
                                חזור
                            </Button>
                        </Grid>
                        <Grid item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Grid>
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
                </Grid>
                                        {/*LESSON DETAILS SECTION*/}
                <Grid container spacing={3} style={{display:(showLessonDetails?"block":"none")}}>
                    <Grid item>
                        <label>פרטי השיעור</label>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField select label="בחר מדריך קבוע" variant="outlined" onChange={(e) => register({name:"instructor_id", value: e.target.value})} style={{width:"25ch"}}>
                            {instructors.map((i) =>(
                            <MenuItem value={i.id}>{i.first_name+" "+i.last_name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField select label="בחר סוס קבוע" variant="outlined" onChange={(e) => register({name:"horse_id", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value={0}>ללא סוס קבוע</MenuItem>
                            {horses.map((h) =>(
                            <MenuItem value={h.id}>{h.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="price" type="number" inputRef={register} defaultValue={0} label="תעריף" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <TextField select label="בחר סוג שיעור" variant="outlined" onChange={(e) => register({name:"lesson_type", value: e.target.value})} style={{width:"25ch"}}>
                            <MenuItem value="פרטי">
                                 פרטי
                            </MenuItem>
                            <MenuItem value="קבוצתי">
                                 קבוצתי
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField select label="בחר יום קבוע" variant="outlined" onChange={(e) => register({name:"day", value: e.target.value})} style={{width:"25ch"}}>
                            {days.map((d) =>(
                            <MenuItem value={d}>{d}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="time" style={{width:"25ch"}} variant="outlined" defaultValue="00:00" label="בחר שעה קבועה" type="time" inputRef={register}
                            inputProps={{ 
                            step: 300, // 5 min
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} style={{display:(addLesson?"none":"block")}}>
                        <Button startIcon={<AddCircleOutlineIcon />} style={{color:'green'}} onClick={()=>{setAddLesson(true)}}>
                        &nbsp;הוספת שיעור   
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{display:(addLesson?"block":"none")}}>
                        <Button startIcon={<RemoveCircleOutlineIcon />} style={{color:'red'}} onClick={()=>{setAddLesson(false)}}>
                        &nbsp;הסר שיעור   
                        </Button>
                    </Grid>
                    <Grid container spacing={3} style={{display:(addLesson?"block":"none")}}>
                        <Grid item xs={12}>
                            <TextField name="price2" type="number" inputRef={register} defaultValue={0} label="תעריף" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <TextField select label="בחר סוג שיעור" variant="outlined" onChange={(e) => register({name:"lesson_type2", value: e.target.value})} style={{width:"25ch"}}>
                                <MenuItem value="פרטי">
                                    פרטי
                                </MenuItem>
                                <MenuItem value="קבוצתי">
                                    קבוצתי
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField select label="בחר יום קבוע" variant="outlined" onChange={(e) => register({name:"day2", value: e.target.value})} style={{width:"25ch"}}>
                                {days.map((d) =>(
                                <MenuItem value={d}>{d}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="time2" style={{width:"25ch"}} variant="outlined" defaultValue="00:00" label="בחר שעה קבועה" type="time" inputRef={register}
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
                                    onClick={()=> {setShowParentDetails(true);
                                                  setShowLessonDetails(false);           
                                                }}>
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
                </Grid>
            </form>
        </Container>
    )
}
