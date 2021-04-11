import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams,useHistory } from "react-router-dom";
import {Button,Grid,TextField,MenuItem,Container, IconButton} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


export default function EditHorse(props) {
    let { id } = useParams();
    const history = useHistory();
    const { register, handleSubmit,setValue} = useForm({mode: 'onBlur'});
    const [horse,setHorse] = useState("");

    useEffect(()=>{
        getHorse();

        if (horse!=="") {
            setValue([{name : horse.name},
                      {gender : horse.gender},
                      {size : horse.size},
                      {temper : horse.temper},
                      {min_weight : horse.min_weight},
                      {max_weight : horse.max_weight},
                      {min_height : horse.min_height},
                      {max_height : horse.max_height},
                      {required_rank : horse.required_rank},
                      {therapeutic_riding : horse.therapeutic_riding},
                      {can_jump : horse.can_jump},
                      {is_qualified : horse.is_qualified},
                    ]);
        }
    },[]);

    const getHorse = () => {
        let apiUrl= props.apiUrl + "Horse/";

        fetch(apiUrl+"/"+id,
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
                  setHorse(result);
              },
              (error) => {
                alert(error);
            }
        );
    }

    const onSubmit = (data) => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
    }

    return (
        <Container>
            <Grid container justify="flex-start">
                <Grid item>
                    <IconButton aria-label="חזור">
                        <ArrowForwardIosIcon onClick={() => history.goBack()} />
                    </IconButton>
                    <label>חזור</label>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                {horse!==""?
                <Grid container justify="center" spacing={3}>
                    <Grid container item justify="center" xs={6} spacing={3}>
                        <Grid item xs={12}>
                            <label>פרטי הסוס</label>
                        </Grid>
                        <Grid item>
                            <TextField name="name" defaultValue={horse.name} inputRef={register({ required: true })} label="שם הסוס" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField select variant="outlined" label="מין הסוס" defaultValue={horse.gender} onChange={(e) => register({name:"gender", value: e.target.value, required: true})} style={{width:"24ch"}}>
                                <MenuItem value="זכר">
                                    זכר
                                </MenuItem>
                                <MenuItem value="נקבה">
                                    נקבה
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField select variant="outlined" label="גודל הסוס" defaultValue={horse.size} onChange={(e) => register({name:"size", value: e.target.value, required: true})} style={{width:"24ch"}}>
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
                            <TextField select variant="outlined" label="אופי הסוס" defaultValue={horse.temper} onChange={(e) => register({name:"temper", value: e.target.value, required: true})} style={{width:"24ch"}}>
                                <MenuItem value="רגוע">
                                    רגוע
                                </MenuItem>
                                <MenuItem value="לא רגוע">
                                    לא רגוע
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <label>מגבלות הסוס</label>
                        </Grid>
                        <Grid item>
                            <TextField name="min_weight" inputRef={register} label="משקל מינימאלי" defaultValue={horse.min_weight} type="number" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="max_weight" inputRef={register} label="משקל מקסימאלי" defaultValue={horse.max_weight} type="number" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <TextField name="min_height" inputRef={register} label="גובה מינימאלי" defaultValue={horse.min_height} variant="outlined" />
                        </Grid>      
                        <Grid item>
                            <TextField name="max_height" inputRef={register} label="גובה מקסימאלי" defaultValue={horse.max_height} variant="outlined" />
                        </Grid>    
                        <Grid item>
                            <TextField name="required_rank" inputRef={register({ required: true })} label="רמת רכיבה נדרשת" defaultValue={horse.required_rank} type="number" inputProps={{min:"0", max:"5", step:"1"}} style={{width:"25ch"}} variant="outlined" />
                        </Grid>                  
                        <Grid item>
                            <TextField select label="התאמה לרכיבה טיפולית" variant="outlined" defaultValue={horse.therapeutic_riding} onChange={(e) => register({name:"therapeutic_riding", value: e.target.value, required: true})} style={{width:"25ch"}}>
                                <MenuItem value={true}>
                                    מתאים
                                </MenuItem>
                                <MenuItem value={false}>
                                    לא מתאים
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField select label="מבצע קפיצות?" variant="outlined" defaultValue={horse.can_jump} onChange={(e) => register({name:"can_jump", value: e.target.value})} style={{width:"25ch"}}>
                                <MenuItem value={true}>
                                    כן
                                </MenuItem>
                                <MenuItem value={false}>
                                    לא
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField select label="מצב בריאותי" variant="outlined" defaultValue={horse.is_qualified} onChange={(e) => register({name:"is_qualified", value: e.target.value, required: true})} style={{width:"25ch"}}>
                                <MenuItem value={true}>
                                    כשיר לרכיבה
                                </MenuItem>
                                <MenuItem value={false}>
                                    לא כשיר לרכיבה
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined"
                                    color="primary"
                                    type="submit">
                                שמור שינויים
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                :null}
            </form>
        </Container>
    )
}
