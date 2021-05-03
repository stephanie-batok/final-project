import React,{useState,useEffect} from 'react';
import { useParams,useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Grid,IconButton,Paper,Tabs,Tab} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import ClassIcon from '@material-ui/icons/Class';
import PersonalDetails from './PersonalDetails';
import ParentDetails from './ParentDetails';
import LessonDetails from './LessonDetails';


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

export default function EditRider(props) {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [tab, setTab] = useState(0);
    const [rider,setRider] = useState("");
    const [addLesson,setAddLesson] = useState(false);


    useEffect(()=>{
        let apiUrl= props.apiUrl + "Rider/";

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
                  setRider(result);
                  console.log('====================================');
                  console.log(result);
                  console.log('====================================');
                  if(result.regular_lessons.length===1){
                        setAddLesson(true);
                  }
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
            {rider!==""?
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Tabs
                            value={tab}
                            variant="fullWidth"
                            onChange={(event, newTab) => setTab(newTab)}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab icon={<AccountCircleIcon />} label="פרטים אישיים" />
                            <Tab icon={<PeopleIcon />} label="פרטי הורים" />
                            <Tab icon={<ClassIcon />} label="פרטי שיעור" />
                        </Tabs>
                        <br/>
                        {tab===0 && <PersonalDetails apiUrl={props.apiUrl} rider={rider}/>}
                        {tab===1 && <ParentDetails apiUrl={props.apiUrl} rider={rider}/>}
                        {tab===2 && <LessonDetails apiUrl={props.apiUrl} rider={rider} addLesson={addLesson}/>}
                    </Paper>
                </main>:null}
        </React.Fragment>
    )
}
