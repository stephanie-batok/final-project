import React,{useState,useEffect} from 'react';
import { useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Button,Grid,Fab,Tooltip,IconButton,Typography,Paper,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import { ViewState} from '@devexpress/dx-react-scheduler';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {Scheduler,DayView, Appointments, MonthView, ViewSwitcher,DateNavigator,Toolbar,AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';
import apiUrl from '../global';
import {auth} from '../fireB';
import WorkIcon from '@material-ui/icons/Work';
import FeedbackIcon from '@material-ui/icons/Feedback';
import {Icon} from '@iconify/react';
import horseshoeIcon from '@iconify-icons/mdi/horseshoe';
import ClassIcon from '@material-ui/icons/Class';


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

    useEffect(() => {
      let email = localStorage.getItem('email');
      let id = localStorage.getItem('id');

      if(email!==null && id!==null){
        auth.createUserWithEmailAndPassword(email,id)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use'){
                auth.signInWithEmailAndPassword(email,id);
            }
        });
      }
    }, [trialLessons]);


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

    const Header = ({children,style, appointmentData, ...restProps}) => (
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
          <IconButton onClick={(e)=>btn_feedback(e,appointmentData.id)}>
            <FeedbackIcon/>
          </IconButton>
        </AppointmentTooltip.Header>
    );

    const Content = ({children,style, appointmentData, ...restProps}) => (
        <AppointmentTooltip.Content
         {...restProps}
         appointmentData={appointmentData}
         style={{
          ...style,
          textAlign:"right"
        }}
         >
          <Grid container alignItems="flex-start">
            <Grid item xs={2} style={{textAlign:"center",paddingTop:"10px"}}>
                <WorkIcon fontSize="small" color="action"/>
            </Grid>
            <Grid item xs={10} style={{paddingTop:"10px"}}>
                <Typography>{appointmentData.text}</Typography>
            </Grid>
            <Grid item xs={2} style={{textAlign:"center",paddingTop:"10px"}}>
                <ClassIcon fontSize="small" color="action"/>
            </Grid>
            <Grid item xs={10} style={{paddingTop:"10px"}}>
                <Typography>סוג שיעור: {appointmentData.type}</Typography>
            </Grid>
            <Grid item xs={2} style={{textAlign:"center",paddingTop:"10px"}}>
              <Icon icon={horseshoeIcon} width="1.1rem" height="1.1rem" color="#757575"/>
            </Grid>
            <Grid item xs={10} style={{paddingTop:"10px"}}>
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

    const btn_feedback = (e,lesson_id) =>{
      history.push("/LessonFeedback/"+lesson_id);
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
              <Fab className={classes.absolute}>
                <AddIcon onClick={btnAddLesson} />
              </Fab>
            </Tooltip>
            <Dialog open={open} onClose={()=>setOpen(false)}>
                <DialogTitle style={{marginLeft:"auto"}} id="alert-dialog-title"> <DeleteOutlineOutlinedIcon/> מחיקת שיעור</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      <br/>האם אתה בטוח שתרצה למחוק שיעור זה?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>setOpen(false)} color="secondary">
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
