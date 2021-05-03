import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem,Typography} from '@material-ui/core';
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


export default function PersonalDetails(props) {
    const { register, getValues} = useForm();
    const classes = useStyles();
    const [error, setError] =  useState("");


    const handleNext = () => {
        if(getValues('id')!=="" && getValues('first_name')!=="" && getValues('last_name')!==""){
            setError("");
            props.getPersonalDetails(getValues());
        }
        else {
            setError("אנא השלם את כל השדות המסומנים בכוכבית (*).")
        }
    }


    return (
        <React.Fragment>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                    <TextField name="first_name" inputRef={register} label="*שם פרטי" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="last_name" inputRef={register} label="*שם משפחה" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="id" inputRef={register} label="*תעודת זהות" fullWidth />
                    </Grid>                    
                    <Grid item xs={12} sm={6}>
                        <TextField select label="בחר מגדר" onChange={(e) => register({name:"gender", value: e.target.value})} fullWidth>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="phone" inputRef={register} label="מספר טלפון" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="date_of_birth" InputLabelProps={{shrink:true}} type="date" inputRef={register} label="תאריך לידה" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="address" inputRef={register} label="כתובת" fullWidth />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField name="city" inputRef={register} label="עיר מגורים" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="email" inputRef={register} label="דואר אלקטרוני" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="password" inputRef={register} label="סיסמה" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom style={{color:"red"}}>
                            {error}
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                        שמור והמשך
                    </Button>
                </div>
            </form>
        </React.Fragment>
    )
}
