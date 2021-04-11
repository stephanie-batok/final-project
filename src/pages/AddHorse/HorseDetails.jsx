import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem} from '@material-ui/core';


export default function HorseDetails(props) {
    const { register, handleSubmit} = useForm();
    const [showHorseDetails,setShowHorseDetails] = useState("");


    const onSubmit = (data) => {
        props.getHorseDetails(data);
    }

    useEffect(()=>{
        setShowHorseDetails(props.show);
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={{display:(showHorseDetails?"block":"none")}}>
                <Grid item>
                    <label>פרטי הסוס</label>
                </Grid>
                <Grid item>
                    <TextField name="name" inputRef={register({ required: true })} label="* שם הסוס" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField select variant="outlined" label="* מין הסוס" onChange={(e) => register({name:"gender", value: e.target.value, required: true})} style={{width:"24ch"}}>
                        <MenuItem value="זכר">
                            זכר
                        </MenuItem>
                        <MenuItem value="נקבה">
                            נקבה
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField select variant="outlined" label="גודל הסוס" onChange={(e) => register({name:"size", value: e.target.value})} style={{width:"24ch"}}>
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
                <Grid item>
                    <TextField select variant="outlined" label="אופי הסוס" onChange={(e) => register({name:"temper", value: e.target.value})} style={{width:"24ch"}}>
                        <MenuItem value="רגוע">
                            רגוע
                        </MenuItem>
                        <MenuItem value="לא רגוע">
                            לא רגוע
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <label style={{fontSize:"12px", color:"red"}}>* שדות המסומנים בכוכבית (*) הינם שדות חובה.</label>
                </Grid>
                <Grid item xs={12}>
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
