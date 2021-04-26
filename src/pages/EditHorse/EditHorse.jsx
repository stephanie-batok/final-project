import React,{useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useParams,useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Grid,IconButton,Typography,Paper,Tabs,Tab} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HorseDetails from './HorseDetails';
import HorseRestrictions from './HorseRestrictions';

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


export default function EditHorse(props) {
    let { id } = useParams();
    const history = useHistory();
    const [horse,setHorse] = useState("");
    const classes = useStyles();
    const [tab, setTab] = useState(0);

    useEffect(()=>{
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
                  console.log('====================================');
                  console.log(result);
                  console.log('====================================');
                  setHorse(result);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

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
            {horse!==""?
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Tabs
                        value={tab}
                        onChange={(event, newTab) => setTab(newTab)}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="פרטי הסוס" />
                        <Tab label="מגבלות הסוס" />
                    </Tabs>
                    <br/>
                    {tab===0 && <HorseDetails apiUrl={props.apiUrl} horse={horse}/>}
                    {tab===1 && <HorseRestrictions apiUrl={props.apiUrl} horse={horse}/>}
                </Paper>
            </main>:null}
        </React.Fragment>
    )
}
