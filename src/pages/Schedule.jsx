import React,{useState,useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, GroupingState,IntegratedGrouping } from '@devexpress/dx-react-scheduler';
import {Scheduler,Resources , DayView, Appointments, WeekView, GroupingPanel} from '@devexpress/dx-react-scheduler-material-ui';


export default function Schedule(props) {
    const [lessons,setLessons] = useState([]);
    const [schedulerData,setSchedulerData] = useState([]);
    const currentDate = Date.now();
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
                        text:lesson.instructor_fullName+" "+ "מדריך",
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

    return (
        <Paper>
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
                <Appointments placeAppointmentsNextToEachOther/> 
                {/* <IntegratedGrouping/>
                <GroupingPanel/> */}
            </Scheduler>:null}
        </Paper>
    )
}
