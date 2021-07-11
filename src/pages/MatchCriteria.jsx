import React,{useState,useEffect} from 'react';
import apiUrl from '../global';
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Typography, Grid, IconButton,Button,TextField,Slider,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
      },
    }
}));


export default function MatchCriteria(props) {
    const { handleSubmit, control} = useForm({mode: 'onBlur'});
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const classes = useStyles();
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [matchMessage,setMatchMessage] = useState("");
    const [matchStatus,setMatchStatus] = useState("");
    const [match_criteria,setMatch_criteria] = useState("");
    const [message,setMessage] = useState("");
    const [status,setStatus] = useState("");

    useEffect(()=>{

        fetch(apiUrl+"Lesson/Match/Criteria",
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
                  console.log(result);
                  setMatch_criteria(result);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

    const onSubmit = (data) => {
        let criteria_list = [];
        let key = 7;

        while (key<15) {
            if(data["criterion_"+key]!==""){
                criteria_list.push({
                    "criterion_id": key,
                    "criterion_weight": data["criterion_"+key]
                });      
            }
            key+=1;        
        }

        console.log(criteria_list);
        
        fetch(apiUrl+"Lesson/Match/Criteria/0",                                    
            {
              method: 'PUT',
              body: JSON.stringify(criteria_list),
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

    const matchHorses = () => {

        if(startDate!=="" && endDate!==""){
            fetch(apiUrl+"Lesson/Match/"+startDate,                                    
            {
              method: 'PUT',
              body: JSON.stringify(endDate),
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
                setMatchStatus("ok");
              }
              else{
                setMatchStatus("no");
              }
              return res.json()
            })
            .then(
              (result) => {
                if(typeof(result) === "object"){
                    setMatchMessage(result.Message);
                }
                else{
                    setMatchMessage(result);
                }
              },
              (error) => {
                console.log("err post=", error);
        });
        }
    }


    return (
        <React.Fragment>
            <Grid container justify="flex-start">
                <Grid item>
                    <IconButton aria-label="חזור">
                        <ArrowForwardIosIcon onClick={() => history.goBack()} />
                    </IconButton>
                    <label>חזור</label>
                </Grid>
            </Grid>
            {match_criteria!==""?
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Button color="primary" onClick={()=>setOpen(true)} style={{marginRight:"auto",display:"flex"}}>
                               <EmojiObjectsIcon fontSize="small"/>
                               החל שיבוץ חכם
                        </Button>
                        <Grid container justify="center" alignItems="center" spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant="h6"><br/>קריטריונים לשיבוץ סוסים<br/><br/></Typography>
                            </Grid>
                            {match_criteria.map((criterion,key)=>(
                                <>
                                    <Grid item style={{marginLeft:"auto"}}>
                                        <Typography variant="h7">
                                        <b>{key+1}.</b> {criterion.criterion_description}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Controller
                                            name={"criterion_"+criterion.criterion_id}
                                            defaultValue={criterion.criterion_weight}
                                            control={control}
                                            render={(props) => (
                                                <Slider
                                                    {...props}
                                                    onChange={(_, value) => {props.onChange(value)}}
                                                    max={criterion.max_weight}
                                                    min={criterion.min_weight}
                                                    step={0.05}
                                                    marks ={[
                                                        {
                                                            value:criterion.max_weight,
                                                            label:criterion.max_weight
                                                        },
                                                        {
                                                            value:criterion.min_weight,
                                                            label:criterion.min_weight
                                                        },
                                                        {
                                                            value:props.value,
                                                            label:props.value
                                                        }
                                                    ]}
                                                />
                                                )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginLeft:"auto",fontSize:11,color:"gray",paddingBottom:25,paddingTop:5}}>
                                        <CheckIcon style={{fontSize:13,color:"green",fontWeight:"bold"}}/>
                                        <Typography variant="h7">
                                             <b> עודכן לאחרונה ב-</b>
                                             {new Date(criterion.last_update).toLocaleString(navigator.language, {year: '2-digit',month:'2-digit',day:'2-digit',hour: '2-digit', minute:'2-digit'})}
                                        </Typography>
                                    </Grid>
                                </>
                            ))}
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
                    </form>
                    <Dialog open={open} onClose={()=>setOpen(false)} style={{textAlign:"center"}}>
                        <DialogTitle id="alert-dialog-title">שיבוץ סוסים לשיעורים</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Grid container spacing={3}>
                                <Grid item xs={12} style={{paddingBottom:"20px"}}>
                                    <Typography>בחר תאריכים לשיבוץ סוסים לשיעורים:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField InputLabelProps={{shrink:true}} type="date" onChange={(e)=> setStartDate(e.target.value)} label="תאריך תחילת שיבוץ"   />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField InputLabelProps={{shrink:true}} type="date" onChange={(e)=> setEndDate(e.target.value)} label="תאריך סוף שיבוץ"   />
                                </Grid>
                                {matchMessage!==""?
                                <Grid item xs={12} style={{paddingTop:"20px"}}>
                                    <Alert severity={matchStatus==="ok"?"success":"error"}>{matchMessage}</Alert>
                                </Grid>:null}
                            </Grid>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>setOpen(false)} color="secondary">
                            ביטול
                        </Button>
                        <Button onClick={matchHorses} color="primary" autoFocus>
                            אישור
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </Paper>
                </main>:null}
        </React.Fragment>
    )
}
