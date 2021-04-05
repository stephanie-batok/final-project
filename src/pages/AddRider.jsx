import React,{useState,useEffect} from 'react';
import {Container} from '@material-ui/core';

import PersonalDetails from '../components/AddRider/PersonalDetails';
import ParentDetails from '../components/AddRider/ParentDetails';
import LessonDetails from '../components/AddRider/LessonDetails';


export default function AddRider(props) {
    const [showPersonalDetails,setShowPersonalDetails] = useState(true);
    const [personalDetails,setPersonalDetails]=useState("");
    const [showParentDetails,setShowParentDetails] = useState(false);
    const [parentDetails,setParentDetails]=useState("");
    const [showLessonDetails,setShowLessonDetails] = useState(false);
    const [lessonDetails,setLessonDetails] = useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);


    const onSubmit = () => {
        setIsSubmitted(false);
        let apiUrl= props.apiUrl + "Rider/";

        let newRider={                                  //create object to send in the body of POST method
            "id": personalDetails["id"],
            "first_name": personalDetails["first_name"],
            "last_name": personalDetails["last_name"],
            "gender": personalDetails["gender"],
            "date_of_birth":personalDetails["date_of_birth"],
            "phone_number": personalDetails["phone_number"],
            "email":personalDetails["email"],
            "password": personalDetails["password"],
            "riding_type":personalDetails["riding_type"],
            "weight":parseInt(personalDetails["weight"]),
            "height": parseFloat(personalDetails["height"]),
            "starting_date":personalDetails["starting_date"],
            "healthForm":personalDetails["healthForm"],
            "instructor_id":lessonDetails["instructor_id"],
            "horse_id":lessonDetails["horse_id"],
            "parents":[
                {
                    "id": parentDetails["parent1_id"],
                    "first_name": parentDetails["parent1_first_name"],
                    "last_name": parentDetails["parent1_last_name"],
                    "gender": parentDetails["parent1_gender"],
                    "phone_number": parentDetails["parent1_phone_number"],
                    "email":parentDetails["parent1_email"]
                },
                {
                    "id": parentDetails["parent2_id"],
                    "first_name": parentDetails["parent2_first_name"],
                    "last_name": parentDetails["parent2_last_name"],
                    "gender": parentDetails["parent2_gender"],
                    "phone_number":parentDetails["parent2_phone_number"],
                    "email":parentDetails["parent2_email"]
                }
            ],
            "regular_lessons":[
                {
                    "day":lessonDetails["day"],
                    "start_time":lessonDetails["start_time"],
                    "end_time":lessonDetails["end_time"],
                    "lesson_type":lessonDetails["lesson_type"],
                    "price":parseInt(lessonDetails["price"]),
                    "funding_source":lessonDetails["funding_source"]
                },
                {
                    "day":lessonDetails["day2"],
                    "start_time":lessonDetails["start_time2"],
                    "end_time":lessonDetails["end_time2"],
                    "lesson_type":lessonDetails["lesson_type2"],
                    "price":parseInt(lessonDetails["price2"]),
                    "funding_source":lessonDetails["funding_source2"]
                }
            ]
        }
        console.log(newRider);
        
        fetch(apiUrl,                                    //add new rider to db with POST method
            {
              method: 'POST',
              body: JSON.stringify(newRider),
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
                alert(result);
              },
              (error) => {
                console.log("err post=", error);
              });           

    }

    const getPersonalDetails = (data) => {
        setPersonalDetails(data);
        setShowPersonalDetails(false);
        setShowParentDetails(true);
    }

    const getParentDetails = (data) => {
        setParentDetails(data);
        setShowParentDetails(false);
        setShowLessonDetails(true);
    }

    const back2PersonalDetails = () => {
        setShowParentDetails(false);
        setShowPersonalDetails(true);
    }

    const getLessonDetails = (data) => {
        setLessonDetails(data);
        setIsSubmitted(true);
    }

    const back2ParentDetails = () => {
        setShowLessonDetails(false);
        setShowParentDetails(true);
    }

    useEffect(()=>{
        if(isSubmitted){
            onSubmit();
        }
    });
         
    return (
        <Container>
            <PersonalDetails show={showPersonalDetails} getPersonalDetails={getPersonalDetails} />
            <ParentDetails show={showParentDetails} getParentDetails={getParentDetails} goBack={back2PersonalDetails} />
            <LessonDetails show={showLessonDetails} getLessonDetails={getLessonDetails} goBack={back2ParentDetails} apiUrl={props.apiUrl} />
        </Container>
    )
}
