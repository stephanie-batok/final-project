import React,{useState,useEffect} from 'react';
import { useHistory} from "react-router-dom";
import {Button,Grid,TextField,MenuItem,IconButton,Typography,Paper} from '@material-ui/core';
import { ViewState, GroupingState,IntegratedGrouping } from '@devexpress/dx-react-scheduler';
import EditIcon from '@material-ui/icons/Edit';
import {Scheduler,Resources, DayView, Appointments, MonthView, ViewSwitcher,GroupingPanel, DateNavigator,Toolbar,AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui';


export default function Schedule(props) {
    const [lessons,setLessons] = useState([]);
    const [schedulerData,setSchedulerData] = useState([]);
    const currentDate = Date.now();
    const history = useHistory();
    const [resources,setResources] = useState([]);
    const [grouping,setGrouping]= useState([]);
    const [ren,setRen]= useState(false);

    const getLessons = () => {
        let apiUrl= props.apiUrl + "Lesson/";

        fetch(apiUrl,
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
                    let tempInstructors = [];

                    result.map((lesson) => {
                        tempSchedulerData.push({
                        startDate: lesson.date+"T"+lesson.start_time,
                        endDate: lesson.date+"T"+lesson.end_time,
                        title:"תלמיד: "+lesson.rider_fullName,
                        text:"מדריך: " +lesson.instructor_fullName,
                        type:"סוג שיעור: "+lesson.lesson_type,
                        horse:"סוס: "+lesson.horse_name,
                        id:lesson.lesson_id
                        });
                        
                        // tempInstructors.push({
                        //     id:lesson.instructor_id,
                        //     text:lesson.instructor_fullName,
                        // });
                    });
                    // let instructors = [...new Map(tempInstructors.map(item => [item.id, item])).values()];
 
                    setLessons(result);
                    // setResources([{
                    //     fieldName: 'instructors',
                    //     title: 'מדריכים',
                    //     instances: instructors,
                    //     allowMultiple: false
                    // }]);
                    // setGrouping([{
                    //     resourceName: 'instructors'
                    // }]);
                    setSchedulerData(tempSchedulerData);
                    setRen(true);
                    
                },
              (error) => {
                alert(error);
            }
        )
    }

    useEffect(()=>{
        getLessons();
    },[]);

    const Appointment = ({
        children, style, ...restProps
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
          <IconButton
            onClick={()=>btn_edit(appointmentData.id)}
          >
          <EditIcon/>
          </IconButton>
        </AppointmentTooltip.Header>
    );

    const Content = ({children, appointmentData, ...restProps}) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
                <Typography>{appointmentData.text}</Typography>
                <Typography>{appointmentData.type}</Typography>
                <Typography>{appointmentData.horse}</Typography>
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
    );

    const btn_edit=(lesson_id)=>{
        history.push("/EditLesson/"+lesson_id);
    }

    return (
        <Paper dir="ltr">
            {ren?<Scheduler
            data={schedulerData}
            >
                <ViewState
                    defaultCurrentDate="2021-02-14"
                />
                <GroupingState
                    grouping={grouping}
                />
                <DayView startDayHour={10} endDayHour={19}/>
                <MonthView />
                <Toolbar />
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
                {/* <IntegratedGrouping/>
                <GroupingPanel/> */}
            </Scheduler>:null}
        </Paper>
    )
}
