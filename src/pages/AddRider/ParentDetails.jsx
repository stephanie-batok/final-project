import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem} from '@material-ui/core';


export default function ParentDetails(props) {
    const { register, handleSubmit} = useForm();
    const [showParentDetails,setShowParentDetails] = useState(false);


    const onSubmit = (data) => {
        props.getParentDetails(data);
    }
    
    useEffect(()=>{
        setShowParentDetails(props.show);
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                                onClick={()=> props.goBack()}>
                            חזור
                        </Button>
                    </Grid>
                    <Grid item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Grid>
                    <Grid item>
                        <Button variant="outlined"
                                color="primary"
                                type="submit">
                            שמור והמשך
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
