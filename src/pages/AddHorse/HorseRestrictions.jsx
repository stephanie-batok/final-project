import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem} from '@material-ui/core';


export default function HorseRestrictions(props) {
    const { register, handleSubmit} = useForm();
    const [showHorseRestrictions,setShowHorseRestrictions] = useState(false);


    const onSubmit = (data) => {
        props.getHorseRestrictions(data);
    }
    
    useEffect(()=>{
        setShowHorseRestrictions(props.show);
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={{display:(showHorseRestrictions?"block":"none")}}>
                <Grid item>
                    <label>מגבלות הסוס</label>
                </Grid>
                <Grid item>
                    <TextField name="min_weight" inputRef={register} label="משקל מינימאלי" type="number" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="max_weight" inputRef={register} label="משקל מקסימאלי" type="number" variant="outlined" />
                </Grid>
                <Grid item>
                    <TextField name="min_height" inputRef={register} label="גובה מינימאלי" variant="outlined" />
                </Grid>      
                <Grid item>
                    <TextField name="max_height" inputRef={register} label="גובה מקסימאלי" variant="outlined" />
                </Grid>    
                <Grid item>
                    <TextField name="required_rank" inputRef={register({ required: true })} label="* רמת רכיבה נדרשת" type="number" inputProps={{min:"0", max:"5", step:"1"}} style={{width:"25ch"}} variant="outlined" />
                </Grid>                  
                <Grid item>
                    <TextField select label="התאמה לרכיבה טיפולית" variant="outlined" onChange={(e) => register({name:"therapeutic_riding", value: e.target.value, required: true})} style={{width:"25ch"}}>
                        <MenuItem value={true}>
                            מתאים
                        </MenuItem>
                        <MenuItem value={false}>
                            לא מתאים
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField select label="מבצע קפיצות?" variant="outlined" onChange={(e) => register({name:"can_jump", value: e.target.value})} style={{width:"25ch"}}>
                        <MenuItem value={true}>
                            כן
                        </MenuItem>
                        <MenuItem value={false}>
                            לא
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField select label="* מצב בריאותי" variant="outlined" onChange={(e) => register({name:"is_qualified", value: e.target.value, required: true})} style={{width:"25ch"}}>
                        <MenuItem value={true}>
                            כשיר לרכיבה
                        </MenuItem>
                        <MenuItem value={false}>
                            לא כשיר לרכיבה
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item>
                    <label style={{fontSize:"12px", color:"red"}}>* שדות המסומנים בכוכבית (*) הינם שדות חובה.</label>
                </Grid>
                <Grid container item justify="center" alignItems="center" xs={12}>
                    <Grid item>
                        <Button variant="outlined"
                                color="primary"
                                onClick={()=> props.goBack()}>
                            חזור
                        </Button>
                    </Grid>
                    <Grid item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Grid>
                    <Grid item>
                        <Button variant="outlined"
                                color="primary"
                                type="submit">
                            סיום רישום
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
