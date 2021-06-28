import React,{useState,useEffect} from 'react';
import apiUrl from '../../global';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Radio,FormControlLabel,FormControl,RadioGroup,FormLabel,MenuItem,TextField,Typography,Button} from '@material-ui/core';


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


export default function RiderDetails(props) {
    const { register, getValues} = useForm();
    const classes = useStyles();
    const [error, setError] =  useState("");
    const [riderType, setRiderType] = useState('');
    const [riderId, setRiderId] = useState('');
    const [riders, setRiders] = useState('');
    

    useEffect(()=>{
        
        fetch(apiUrl+"Rider/",
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
                  setRiders(result);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

    const handleChange = (event) => {
        setRiderType(event.target.value);
        props.getRiderType(event.target.value);
    };

    const handleNext = () => {

        if(riderType==="rider"){

            if(riderId!==""){
                setError("");
                props.getRiderDetails(riderId);
            }
            else {
                setError("אנא השלם את כל השדות המסומנים בכוכבית (*).");
            }
        }
        else if(riderType==="visitor"){

            if(getValues('id')!=="" && getValues('first_name')!=="" && getValues('last_name')!==""){
                setError("");
                props.getRiderDetails(getValues());
            }
            else {
                setError("אנא השלם את כל השדות המסומנים בכוכבית (*).");
            }
        }
        else {
            setError("אנא השלם את כל השדות המסומנים בכוכבית (*).");
        }
    }

    return (
        <React.Fragment>
            <Grid container justify="center" spacing={4}>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">* סוג משתתף</FormLabel>
                        <RadioGroup  name="riderType" riderType={riderType} onChange={handleChange}>
                            <FormControlLabel value="rider" control={<Radio />} label="תלמיד קבוע" />
                            <FormControlLabel value="visitor" control={<Radio />} label="מבקר" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {riderType==="rider"&& riders!==""?<Grid item xs={12} sm={6}>
                    <TextField select label="* בחר רוכב" onChange={(e) => setRiderId(e.target.value)} fullWidth>
                        {riders.map((r) =>(
                        <MenuItem value={r.id}>{r.first_name+" "+r.last_name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>:null}
            </Grid>
            <form>
                {riderType==="visitor"?<Grid container spacing={4}>
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
                        <TextField name="height" inputRef={register} label="גובה" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="weight" inputRef={register} type="number" label="משקל" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="comments" inputRef={register} label="הערות" fullWidth />
                    </Grid>
                </Grid>:null}
                <br/>
                <Grid container spacing={4}>
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
