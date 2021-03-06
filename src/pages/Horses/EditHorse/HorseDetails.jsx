import React,{useState,useEffect} from 'react';
import apiUrl from '../../../global';
import { useForm } from "react-hook-form";
import {Grid,TextField,MenuItem,Typography,Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


export default function HorseDetails(props) {
    const { register, handleSubmit,getValues} = useForm({mode: 'onBlur'});
    const [horse,setHorse] = useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{
        setHorse(props.horse);
    },[]);


    const onSubmit = (data) => {
        let gender = getValues('gender');
        let size = getValues('size');
        let temper = getValues('temper');
        let is_active = getValues('is_active');


        let newHorseDetails={                                  //create object to send in the body of Put method
          "name":data.name,
          "gender": gender===undefined?horse.gender:data.gender,
          "size": size===undefined?horse.size:data.size,
          "temper": gender===undefined?horse.temper:data.temper,
          "is_active": is_active===undefined?horse.is_active:data.is_active
        }
        console.log(newHorseDetails);
        
        fetch(apiUrl+"Horse/HorseDetails/"+horse.id,                                    //edit horse details in db with Put method
            {
              method: 'PUT',
              body: JSON.stringify(newHorseDetails),
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
                            <TextField name="name" defaultValue={horse.name} InputProps={{readOnly: true}} label="???? ????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select defaultValue={horse.gender} label="?????? ????????" onChange={(e) => register({name:"gender", value: e.target.value})} fullWidth>
                                <MenuItem value="??????">
                                    ??????
                                </MenuItem>
                                <MenuItem value="????????">
                                    ????????
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select defaultValue={horse.size} label="???????? ????????" onChange={(e) => register({name:"size", value: e.target.value})} fullWidth>
                                <MenuItem value="??????">
                                    ??????
                                </MenuItem>
                                <MenuItem value="????????????">
                                    ????????????
                                </MenuItem>
                                <MenuItem value="????????">
                                    ????????
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select defaultValue={horse.temper} label="???????? ????????" onChange={(e) => register({name:"temper", value: e.target.value})} fullWidth>
                                <MenuItem value="????????">
                                    ????????
                                </MenuItem>
                                <MenuItem value="???? ????????">
                                    ???? ????????
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select defaultValue={horse.is_active} label="???????????? ????????????" onChange={(e) => register({name:"is_active", value: e.target.value})} fullWidth>
                                <MenuItem value={true}>
                                    ?????? ????????
                                </MenuItem>
                                <MenuItem value={false}>
                                    ?????? ???? ????????
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
                                ???????? ??????????????
                            </Button>
                        </Grid>
                    </Grid>
                </form>:null}
            </React.Fragment>
    )
}
