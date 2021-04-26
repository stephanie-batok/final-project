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


export default function HorseRestrictions(props) {
    const { register, getValues} = useForm();
    const classes = useStyles();


    const handleBack = () => {
        props.handleBack();
    }

    const handleNext = () => {
        props.getHorseRestrictions(getValues());
    }

    return (
        <React.Fragment>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="min_weight" inputRef={register} label="משקל מינימאלי" type="number" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="max_weight" inputRef={register} label="משקל מקסימאלי" type="number" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="min_height" inputRef={register} label="גובה מינימאלי" fullWidth />
                    </Grid>      
                    <Grid item xs={12} sm={6}>
                        <TextField name="max_height" inputRef={register} label="גובה מקסימאלי" fullWidth />
                    </Grid>    
                    <Grid item xs={12} sm={6}>
                        <TextField name="required_rank" inputRef={register({ required: true })} label="* רמת רכיבה נדרשת" type="number" inputProps={{min:"0", max:"5", step:"1"}} fullWidth />
                    </Grid>                  
                    <Grid item xs={12} sm={6}>
                        <TextField select label="התאמה לרכיבה טיפולית" onChange={(e) => register({name:"therapeutic_riding", value: e.target.value, required: true})} fullWidth>
                            <MenuItem value={true}>
                                מתאים
                            </MenuItem>
                            <MenuItem value={false}>
                                לא מתאים
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="מבצע קפיצות?" onChange={(e) => register({name:"can_jump", value: e.target.value})} fullWidth>
                            <MenuItem value={true}>
                                כן
                            </MenuItem>
                            <MenuItem value={false}>
                                לא
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="* מצב בריאותי" onChange={(e) => register({name:"is_qualified", value: e.target.value, required: true})} fullWidth>
                            <MenuItem value={true}>
                                כשיר לרכיבה
                            </MenuItem>
                            <MenuItem value={false}>
                                לא כשיר לרכיבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                    <Button onClick={handleBack} className={classes.button}>
                        חזור
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                        סיום רישום
                    </Button>
                </div>
            </form>
        </React.Fragment>
    )
}
