import React,{useState,useEffect} from 'react';
import { useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Button,Grid,Fab,Tooltip,IconButton,Typography,Paper,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import { ViewState} from '@devexpress/dx-react-scheduler';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {Scheduler,DayView, Appointments, MonthView, ViewSwitcher,DateNavigator,Toolbar,AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import apiUrl from '../global';
import {auth} from '../fireB';


const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position:'fixed',
    left: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));


export default function Schedule(props) {
    const classes = useStyles();
    const [lessons,setLessons] = useState([]);
    const [trialLessons,setTrialLessons] = useState([]);
    const [schedulerData,setSchedulerData] = useState([]);
    const currentDate = Date.now();
    const history = useHistory();
    const [ren,setRen]= useState(false);
    const [open, setOpen] = useState(false);
    const [chosenLesson,setChosenLesson] = useState("");
    const [chosenLessonType,setChosenLessonType] = useState("");


    useEffect(()=>{
      register();

      fetch(apiUrl+"Lesson/",
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
                  let tempSchedulerData = [];
                  result.map((lesson) => {
                      tempSchedulerData.push({
                      startDate: lesson.date+"T"+lesson.start_time,
                      endDate: lesson.date+"T"+lesson.end_time,
                      title:"תלמיד: "+lesson.rider_fullName,
                      text:"מדריך: " +lesson.instructor_fullName,
                      type:lesson.lesson_type,
                      horse:"סוס: "+lesson.horse_name,
                      id:lesson.lesson_id
                      });
                  });
                  setSchedulerData(tempSchedulerData);
                  setLessons(result);
              },
            (error) => {
              alert(error);
          }
      )
    },[]);

    useEffect(()=>{

      if(lessons.length>0){
        fetch(apiUrl+ "TrialLesson/",
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
                  let tempSchedulerData = [];
                  result.map((lesson) => {
                    tempSchedulerData.push({
                      startDate: lesson.date+"T"+lesson.start_time,
                      endDate: lesson.date+"T"+lesson.end_time,
                      title:"תלמיד: "+lesson.visitor_fullName,
                      text:"מדריך: " +lesson.instructor_fullName,
                      type:lesson.lesson_type,
                      horse:"סוס: "+lesson.horse_name,
                      id:lesson.lesson_id
                      });
                  });
                  setTrialLessons(result);
                  setSchedulerData(state => [...state, ...tempSchedulerData]);
                  setRen(true);
              },
            (error) => {
              alert(error);
          }
        )
      }
    },[lessons]);

    const register = () => {

      auth.onAuthStateChanged((user)=>{
        if (user) {
          let email = user.email;
          auth.signInWithEmailAndPassword(email,localStorage.getItem('id'));
        } else {
          auth.createUserWithEmailAndPassword(localStorage.getItem('email'),localStorage.getItem('id'));
        }
      });
    }

    const Appointment = ({
        children, style,appointmentData, ...restProps
      }) => (
        <Appointments.Appointment
          {...restProps}
          style={{
            ...style,
            borderRadius: '8px',
            justifyContent:"space-around"
          }}
        >
          {children}
        </Appointments.Appointment>
    );

    const Header = ({children, appointmentData, ...restProps}) => (
        <AppointmentTooltip.Header
          {...restProps}
          appointmentData={appointmentData}
        >
          <IconButton onClick={(e)=>btn_delete(e,appointmentData.id,appointmentData.type)}>
            <DeleteIcon/>
          </IconButton>
          <IconButton onClick={(e)=>btn_edit(e,appointmentData.id,appointmentData.type)}>
            <EditIcon/>
          </IconButton>
        </AppointmentTooltip.Header>
    );

    const Content = ({children, appointmentData, ...restProps}) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
                <Typography>{appointmentData.text}</Typography>
                <Typography>סוג שיעור: {appointmentData.type}</Typography>
                <Typography>{appointmentData.horse}</Typography>
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
    );

    const btn_edit = (e,lesson_id,lesson_type) => {
        console.log(lesson_type);
        history.push("/EditLesson/"+lesson_id,{lesson_type:lesson_type});
    }

    const btnAddLesson = () => {
       history.push("/AddLesson");
    }

    const btn_delete = (e,lesson_id,lesson_type) => {
      setChosenLesson(lesson_id);      
      setChosenLessonType(lesson_type);
      setOpen(true);
    }

    const delete_lesson = () => {
      let LessonTypeUrl;

      if(chosenLessonType==="שיעור ניסיון"){
        LessonTypeUrl= "TrialLesson/";
      }
      else {
        LessonTypeUrl= "Lesson/";
      }

      fetch(apiUrl+LessonTypeUrl+chosenLesson,                               //delete Lesson
          {
            method: 'DELETE',
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json; charset=UTF-8',
            })
          })
          .then(res => {
            console.log('res=', res);
            console.log('res.status', res.status);
            console.log('res.ok', res.ok);
            return res.json()
          })
          .then(
            (result) => {
                console.log(result);
            },
            (error) => {
              console.log("err post=", error);
      });  
      setOpen(false);
    }

    return (
        <Paper dir="ltr">
            {ren?
            <Scheduler
              data={schedulerData}
            >
                <ViewState
                    defaultCurrentDate={currentDate}
                />
                <DayView startDayHour={12} endDayHour={19}/>
                <MonthView />
                <Toolbar/>
                <ViewSwitcher />
                <DateNavigator/>
                <Appointments 
                  placeAppointmentsNextToEachOther
                  appointmentComponent={Appointment}
                /> 
                <AppointmentTooltip
                  headerComponent={Header}
                  contentComponent={Content}
                  showCloseButton
                />
            </Scheduler>
            :null}
            <Tooltip title="שיעור חדש" aria-label="שיעור חדש">
              <Fab color="default" className={classes.absolute}>
                <AddIcon onClick={btnAddLesson}/>
              </Fab>
            </Tooltip>
            <Dialog open={open} onClose={()=>setOpen(false)}>
                <DialogTitle id="alert-dialog-title">מחיקת שיעור</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      <br/>האם אתה בטוח שתרצה למחוק שיעור זה?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>setOpen(false)} color="primary">
                      ביטול
                  </Button>
                  <Button onClick={delete_lesson} color="primary" autoFocus>
                      אישור
                  </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
