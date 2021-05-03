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


export default function PersonalFiles(props) {
    const { register, getValues} = useForm();
    const classes = useStyles();


    const handleBack = () => {
        props.handleBack();
    }

    const handleNext = () => {
        props.getPersonalFiles(getValues());
    }


    return (
        <React.Fragment>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="test1" inputRef={register} label="קובץ" fullWidth />
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
