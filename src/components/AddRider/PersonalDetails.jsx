import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem} from '@material-ui/core';


export default function PersonalDetails(props) {
    const { register, handleSubmit} = useForm();
    const [showPersonalDetails,setShowPersonalDetails] = useState("");


    const onSubmit = (data) => {
        props.getPersonalDetails(data);
    }

    useEffect(()=>{
        setShowPersonalDetails(props.show);
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={{display:(showPersonalDetails?"block":"none")}}>
                <Grid item>
                    <label>פרטים אישיים</label>
                </Grid>
                <Grid item>
                    <TextField name="first_name" inputRef={register} label="שם פרטי" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="last_name" inputRef={register} label="שם משפחה" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="id" inputRef={register} label="תעודת זהות" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField select variant="outlined" label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} style={{width:"24ch"}}>
                        <MenuItem value="זכר">
                            זכר
                        </MenuItem>
                        <MenuItem value="נקבה">
                            נקבה
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField name="date_of_birth" style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="phone" inputRef={register} label="מספר טלפון" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="city" inputRef={register} label="עיר מגורים" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="address" inputRef={register} label="כתובת" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField select label="בחר מגזר רכיבה" variant="outlined" onChange={(e) => register({name:"riding_type", value: e.target.value})} style={{width:"24ch"}}>
                        <MenuItem value="רכיבה ספורטיבית">
                        רכיבה ספורטיבית
                        </MenuItem>
                        <MenuItem value="רכיבה טיפולית">
                        רכיבה טיפולית
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField name="starting_date" style={{width:"24ch"}} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך רישום לחווה" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="height" inputRef={register} defaultValue={0} label="גובה" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="weight" inputRef={register} defaultValue={0} type="number" label="משקל" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="email" inputRef={register} label="דואר אלקטרוני" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="password" inputRef={register} label="סיסמה" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="healthForm" inputRef={register} label="טופס הצהרת בריאות" variant="outlined" />
                </Grid>
                <Grid item>
                    <Button variant="outlined"
                            color="primary"
                            type="submit">
                        שמור והמשך
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
