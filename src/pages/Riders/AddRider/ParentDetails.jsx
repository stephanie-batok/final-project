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

export default function ParentDetails(props) {
    const { register, getValues} = useForm();
    const classes = useStyles();


    const handleBack = () => {
        props.handleBack();
    }

    const handleNext = () => {
        props.getParentDetails(getValues());
    }

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                פרטי הורים
            </Typography>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h7" gutterBottom style={{fontWeight:"bold"}}>פרטי הורה ראשון</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField name="parent1_first_name" inputRef={register} label="שם פרטי" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent1_last_name" inputRef={register} label="שם משפחה" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent1_id" inputRef={register} label="תעודת זהות" fullWidth />
                    </Grid>                    
                    <Grid item xs={12} sm={6}>
                        <TextField select label="בחר מגדר" onChange={(e) => register({name:"parent1_gender", value: e.target.value})} fullWidth>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent1_phone" inputRef={register} label="מספר טלפון" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent1_email" inputRef={register} label="דואר אלקטרוני" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                            <Typography variant="h7" gutterBottom style={{fontWeight:"bold"}}>פרטי הורה שני</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                            <TextField name="parent2_id" inputRef={register} label="תעודת זהות" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent2_first_name" inputRef={register} label="שם פרטי" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent2_last_name" inputRef={register} label="שם משפחה" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="בחר מגדר" onChange={(e) => register({name:"parent2_gender", value: e.target.value})} fullWidth>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent2_phone" inputRef={register} label="מספר טלפון" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="parent2_email" inputRef={register} label="דואר אלקטרוני" fullWidth />
                    </Grid>
                </Grid>
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
