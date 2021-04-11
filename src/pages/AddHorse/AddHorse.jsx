import React,{useState,useEffect} from 'react';
import {Container, Grid, IconButton} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HorseDetails from './HorseDetails';
import HorseRestrictions from './HorseRestrictions';


export default function AddHorse(props) {
    const history = useHistory();
    const [showHorseDetails,setShowHorseDetails] = useState(true);
    const [horseDetails,setHorseDetails]=useState("");
    const [showHorseRestrictions,setShowHorseRestrictions] = useState(false);
    const [horseRestrictions,setHorseRestrictions]=useState("");
    const [isSubmitted,setIsSubmitted] = useState(false);

    const onSubmit = () => {
        setIsSubmitted(false);
        let apiUrl= props.apiUrl + "Horse/";

        let newHorse={                                  //create object to send in the body of POST method
            "name": horseDetails["name"],
            "gender": horseDetails["gender"],
            "size":horseDetails["size"],
            "temper": horseDetails["temper"],
            "required_rank": parseInt(horseDetails["required_rank"]),
            "max_weight":parseInt(horseRestrictions["max_weight"]),
            "min_weight": parseInt(horseRestrictions["min_weight"]),
            "max_height": parseFloat(horseRestrictions["max_height"]),
            "min_height": parseFloat(horseRestrictions["min_height"]),
            "required_rank": parseInt(horseRestrictions["required_rank"]),
            "therapeutic_riding": horseRestrictions["therapeutic_riding"],
            "can_jump": horseRestrictions["can_jump"],
            "is_qualified": horseRestrictions["is_qualified"],            
        }
        console.log(newHorse);
        
        fetch(apiUrl,                                    //add new horse to db with POST method
            {
              method: 'POST',
              body: JSON.stringify(newHorse),
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

    const getHorseDetails = (data) => {
        setHorseDetails(data);
        setShowHorseDetails(false);
        setShowHorseRestrictions(true);
    }

    const getHorseRestrictions = (data) => {
        setHorseRestrictions(data);
        setIsSubmitted(true);
    }

    const back2HorseDetails = () => {
        setShowHorseRestrictions(false);
        setShowHorseDetails(true);
    }

    useEffect(()=>{
        if(isSubmitted){
            onSubmit();
        }
    });

    return (
        <Container>
            <Grid container justify="flex-start">
                <Grid item>
                    <IconButton aria-label="חזור"> 
                        <ArrowForwardIosIcon onClick={() => history.goBack()} />
                    </IconButton>
                    <label>חזור</label>
                </Grid>
            </Grid>
            <HorseDetails show={showHorseDetails} getHorseDetails={getHorseDetails} />
            <HorseRestrictions show={showHorseRestrictions} getHorseRestrictions={getHorseRestrictions} goBack={back2HorseDetails} />
        </Container>
    )
}
