import React,{useState,useEffect} from 'react';
import apiUrl from '../../../global';
import { useForm } from "react-hook-form";
import {Grid,TextField,MenuItem,Typography,Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


export default function HorseRestrictions(props) {
    const { register, handleSubmit,getValues} = useForm({mode: 'onBlur'});
    const [horse,setHorse] = useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{
        setHorse(props.horse);
    },[]);


    const onSubmit = (data) => {
        let therapeutic_riding = getValues('therapeutic_riding');
        let can_jump = getValues('can_jump');
        let is_qualified = getValues('is_qualified');
        let required_rank = getValues('required_rank');


        let newHorseRestrictions={                                  //create object to send in the body of Put method
          "min_weight":parseInt(data.min_weight),
          "max_weight":parseInt(data.max_weight),
          "min_height":parseFloat(data.min_height),
          "max_height":parseFloat(data.max_height),
          "required_rank": required_rank===undefined?horse.required_rank:parseInt(data.required_rank),
          "therapeutic_riding": therapeutic_riding===undefined?horse.therapeutic_riding:data.therapeutic_riding,
          "can_jump": can_jump===undefined?horse.can_jump:data.can_jump,
          "is_qualified": is_qualified===undefined?horse.is_qualified:data.is_qualified
        }
        console.log(newHorseRestrictions);

        fetch(apiUrl+"Horse/HorseRestrictions/"+horse.id,                                    //edit horse restrictions in db with Put method
            {
              method: 'PUT',
              body: JSON.stringify(newHorseRestrictions),
              headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
              })
            })
            .then(res => {
              console.log('res=', res);
              console.log('res.status', res.status);
              console.log('res.ok', res.ok);
              if(res.ok){
                setStatus("ok");
              }
              else{
                setStatus("no");
              }
              return res.json()
            })
            .then(
              (result) => {
                if(typeof(result) === "object"){
                    setMessage(result.Message);
                }
                else{
                    setMessage(result);
                }
              },
              (error) => {
                console.log("err post=", error);
        });
    }


    return (
        <React.Fragment>
            {horse!==""?
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="min_weight" type="number" defaultValue={horse.min_weight} inputRef={register} label="משקל מינימאלי" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="max_weight" type="number" defaultValue={horse.max_weight} inputRef={register} label="משקל מקסימאלי" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="min_height" defaultValue={horse.min_height} inputRef={register} label="גובה מינימאלי" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="max_height" defaultValue={horse.max_height} inputRef={register} label="גובה מקסימאלי" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField defaultValue={horse.required_rank} onChange={(e) => register({name:"required_rank", value: e.target.value})} label="* (בין 1 ל-5) רמת רכיבה נדרשת" type="number" inputProps={{min:"0", max:"5", step:"1"}} fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select defaultValue={horse.therapeutic_riding} label="התאמה לרכיבה טיפולית" onChange={(e) => register({name:"therapeutic_riding", value: e.target.value})} fullWidth>
                            <MenuItem value={true}>
                                מתאים
                            </MenuItem>
                            <MenuItem value={false}>
                                לא מתאים
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select defaultValue={horse.can_jump} label="מבצע קפיצות?" onChange={(e) => register({name:"can_jump", value: e.target.value})} fullWidth>
                            <MenuItem value={true}>
                                כן
                            </MenuItem>
                            <MenuItem value={false}>
                                לא
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField select defaultValue={horse.is_qualified} label="מצב בריאותי" onChange={(e) => register({name:"is_qualified", value: e.target.value})} fullWidth>
                            <MenuItem value={true}>
                                כשיר לרכיבה
                            </MenuItem>
                            <MenuItem value={false}>
                                לא כשיר לרכיבה
                            </MenuItem>
                        </TextField>
                    </Grid>
                    {message!==""?
                    <Grid item xs={12}>
                        <Alert severity={status==="ok"?"success":"error"}>{message}</Alert>
                    </Grid>:null}
                    <Grid item xs={12}>
                        <Button variant="contained"
                                color="primary"
                                type="submit">
                            שמור שינויים
                        </Button>
                    </Grid>
                </Grid>
            </form>:null}
        </React.Fragment>
    )
}
