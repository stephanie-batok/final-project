import React,{useState,useEffect} from 'react';
import apiUrl from '../../../global';
import { useForm } from "react-hook-form";
import {Grid,TextField,MenuItem,Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


export default function PersonalDetails(props) {
    const { register, handleSubmit,getValues} = useForm({mode: 'onBlur'});
    const [rider,setRider] = useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{
        setRider(props.rider);
    },[]);
    
    const onSubmit = (data) => {
        let riding_type = getValues('riding_type');
        let gender = getValues('gender');
        let isActive = getValues('isActive');

        let newPersonalDetails={                                  //create object to send in the body of Put method
          "first_name":data.first_name,
          "last_name":data.last_name,
          "id":rider.id,
          "gender": gender===undefined?rider.gender:data.gender,
          "date_of_birth":data.date_of_birth,
          "phone_number":data.phone_number,
          "email":data.email,
          "password":data.password,
          "riding_type": riding_type===undefined?rider.riding_type:data.riding_type,
          "weight":parseInt(data.weight),
          "height":parseFloat(data.height),
          "address":data.address,
          "city":data.city,
          "starting_date":data.starting_date,
          "isActive": isActive===undefined?rider.isActive:data.isActive
        }
        console.log(newPersonalDetails);
        
        fetch(apiUrl+"Rider/PersonalDetails/"+rider.id,                                    //edit rider personal details in db with Put method
            {
              method: 'PUT',
              body: JSON.stringify(newPersonalDetails),
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
                {rider!==""?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="first_name" defaultValue={rider.first_name} inputRef={register} label="???? ????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="last_name" defaultValue={rider.last_name} inputRef={register} label="???? ??????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="id" defaultValue={rider.id} inputRef={register} label="?????????? ????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select defaultValue={rider.gender} label="?????? ????????" onChange={(e) => register({name:"gender", value: e.target.value})} fullWidth>
                                <MenuItem value="??????">
                                    ??????
                                </MenuItem>
                                <MenuItem value="????????">
                                    ????????
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="date_of_birth" defaultValue={rider.date_of_birth} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="?????????? ????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="phone_number" defaultValue={rider.phone_number} inputRef={register} label="???????? ??????????" fullWidth />
                        </Grid>
                        <Grid item xs={12}> 
                            <TextField name="address" defaultValue={rider.address} inputRef={register} label="??????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="city" defaultValue={rider.city} inputRef={register} label="?????? ????????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select label="?????? ???????? ??????????" defaultValue={rider.riding_type} onChange={(e) => register({name:"riding_type", value: e.target.value})} fullWidth>
                                <MenuItem value="?????????? ??????????????????">
                                ?????????? ??????????????????
                                </MenuItem>
                                <MenuItem value="?????????? ??????????????">
                                ?????????? ??????????????
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="height" defaultValue={rider.height} inputRef={register} label="????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="weight" defaultValue={rider.weight} inputRef={register} type="number" label="????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="email" defaultValue={rider.email} inputRef={register} label="???????? ????????????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="password" defaultValue={rider.password} inputRef={register} label="??????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="starting_date" defaultValue={rider.starting_date} InputLabelProps={{shrink:true}} type="date" inputRef={register} label="?????????? ?????????? ??????????" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select label="???????????? ????????" defaultValue={rider.isActive} onChange={(e) => register({name:"isActive", value: e.target.value})} fullWidth>
                                <MenuItem value={true}>
                                ???????? ????????
                                </MenuItem>
                                <MenuItem value={false}>
                                ???????? ???? ????????
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
