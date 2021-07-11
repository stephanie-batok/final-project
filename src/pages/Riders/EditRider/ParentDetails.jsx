import React,{useState,useEffect} from 'react';
import apiUrl from '../../../global';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem,Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


export default function ParentDetails(props) {
    const { register, handleSubmit} = useForm({mode:'onBlur'});
    const [rider,setRider] = useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");


    useEffect(()=>{
        setRider(props.rider);
    },[]);

    const onSubmit = (data) => {
        let parents = [];
        let key = 0;

        while (key<2) {
            if(data["parent_id"+key]!==""){
                parents.push({
                    "id": data["parent_id"+key],
                    "first_name": data["parent_first_name"+key],
                    "last_name": data["parent_last_name"+key],
                    "gender": data["parent_gender"+key],
                    "phone_number": data["parent_phone_number"+key],
                    "email":data["parent_email"+key]
                });      
            }
            key+=1;        
        }

        let newParentDetails={                                  //create object to send in the body of Put method
          "id":rider.id,
          "parents": parents,
        }
        console.log(newParentDetails);
        
        fetch(apiUrl+"Rider/ParentDetails/"+rider.id,                                    //edit rider's parent details in db with Put method
            {
              method: 'PUT',
              body: JSON.stringify(newParentDetails),
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
                <Grid container justify="center" spacing={4}>
                    <Grid item xs={12}></Grid>
                    {rider.parents.length>0?rider.parents.map((parent,key)=>(
                        <>
                            <Grid item xs={12}>
                                {key===0?
                                <Typography variant="h7"><br/>פרטי הורה ראשון</Typography>:
                                <Typography variant="h7"><br/>פרטי הורה שני</Typography>}
                            </Grid>
                            <Grid item xs={12} sm={6}> 
                                <TextField name={"parent_id"+key} InputProps={{readOnly: true}} defaultValue={parent.id} inputRef={register} label="תעודת זהות" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_first_name"+key} defaultValue={parent.first_name} inputRef={register} label="שם פרטי" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_last_name"+key} defaultValue={parent.last_name} inputRef={register} label="שם משפחה" fullWidth />
                            </Grid>                    
                            <Grid item xs={12} sm={6}>
                                <TextField select label="בחר מגדר" defaultValue={parent.gender} onChange={(e) => register({name:"parent_gender"+key, value: e.target.value})} fullWidth>
                                    <MenuItem value="זכר">
                                        זכר
                                    </MenuItem>
                                    <MenuItem value="נקבה">
                                        נקבה
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_phone"+key} defaultValue={parent.phone} inputRef={register} label="מספר טלפון" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_email"+key} defaultValue={parent.email} inputRef={register} label="דואר אלקטרוני" fullWidth />
                            </Grid>
                        </>)):
                        <>
                            <Grid item xs={12}>
                                <Typography variant="h7"><br/>פרטי הורה ראשון</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}> 
                                <TextField name={"parent_id0"} inputRef={register} label="תעודת זהות" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_first_name0"} inputRef={register} label="שם פרטי" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_last_name0"} inputRef={register} label="שם משפחה" fullWidth />
                            </Grid>                    
                            <Grid item xs={12} sm={6}>
                                <TextField select label="בחר מגדר" onChange={(e) => register({name:"parent_gender0", value: e.target.value})} fullWidth>
                                    <MenuItem value="זכר">
                                        זכר
                                    </MenuItem>
                                    <MenuItem value="נקבה">
                                        נקבה
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_phone0"} inputRef={register} label="מספר טלפון" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_email0"} inputRef={register} label="דואר אלקטרוני" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7"><br/>פרטי הורה שני</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}> 
                                <TextField name={"parent_id1"} inputRef={register} label="תעודת זהות" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_first_name1"} inputRef={register} label="שם פרטי" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_last_name1"} inputRef={register} label="שם משפחה" fullWidth />
                            </Grid>                    
                            <Grid item xs={12} sm={6}>
                                <TextField select label="בחר מגדר" onChange={(e) => register({name:"parent_gender1", value: e.target.value})} fullWidth>
                                    <MenuItem value="זכר">
                                        זכר
                                    </MenuItem>
                                    <MenuItem value="נקבה">
                                        נקבה
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_phone1"} inputRef={register} label="מספר טלפון" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField name={"parent_email1"} inputRef={register} label="דואר אלקטרוני" fullWidth />
                            </Grid>
                        </>}
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
