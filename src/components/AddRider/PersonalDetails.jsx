import React from 'react';
import { useForm } from "react-hook-form";
import {Button,Grid,TextField,MenuItem} from '@material-ui/core';


export default function PersonalDetails(props) {
    const { register, handleSubmit} = useForm();
    const [showPersonalDetails,setShowPersonalDetails] = useState(props.show);


    const onSubmit = () => {
        console.log('====================================');
        console.log();
        console.log('====================================');
    }



    return (
        <div>
            
        </div>
    )
}
