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


export default function HorseDetails(props) {
    const { register, getValues} = useForm();
    const [error, setError] =  useState("");
    const classes = useStyles();


    const handleNext = () => {
        if(getValues('name')!==undefined& getValues('gender')!==undefined){
            setError("");
            props.getHorseDetails(getValues());
        }
        else {
            setError("אנא השלם את כל השדות המסומנים בכוכבית (*).");
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                פרטי הסוס
            </Typography>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="name" inputRef={register({ required: true })} label="* שם הסוס" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select label="* מין הסוס" onChange={(e) => register({name:"gender", value: e.target.value, required: true})} fullWidth>
                            <MenuItem value="זכר">
                                זכר
                            </MenuItem>
                            <MenuItem value="נקבה">
                                נקבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item item xs={12} sm={6}>
                        <TextField select label="גודל הסוס" onChange={(e) => register({name:"size", value: e.target.value})} fullWidth>
                            <MenuItem value="קטן">
                                קטן
                            </MenuItem>
                            <MenuItem value="בינוני">
                                בינוני
                            </MenuItem>
                            <MenuItem value="גדול">
                                גדול
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item item xs={12} sm={6}>
                        <TextField select label="אופי הסוס" onChange={(e) => register({name:"temper", value: e.target.value})} fullWidth>
                            <MenuItem value="רגוע">
                                רגוע
                            </MenuItem>
                            <MenuItem value="לא רגוע">
                                לא רגוע
                            </MenuItem>
                        </TextField>
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
