import React,{useState,useEffect} from 'react';
import {Grid,TextField,Typography,MenuItem,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const initialValues = {
    id: "",
    first_name:"",
    last_name:"",
    gender:"",
    date_of_birth:"",
    phone_number:"",
    email:"",
    password:"",
    city:"",
    address:"",
    riding_type:"",
    weight:0,
    height:"0",
    starting_date:""
  };

  const useStyles = makeStyles((theme) => ({
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function PersonalDetails(props) {
    const [values, setValues] = useState(initialValues);
    const [error, setError] =  useState("");
    const classes = useStyles();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
                
        setValues({
          ...values,
          [name]: value,
        });
    };


    const handleNext = () => {
        if(values.id!=="" && values.first_name!=="" && values.last_name!=="" && values.email!=="" && values.password!=="" && values.gender!=="" && values.date_of_birth!==""){
            setError("");
            props.getPersonalDetails(values);
        }
        else {
            setError("אנא השלם את כל השדות המסומנים בכוכבית (*).")
        }
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                פרטים אישיים
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <TextField required
                        value={values.first_name}
                        name="first_name"
                        label="שם פרטי"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required
                        value={values.last_name}
                        name="last_name"
                        label="שם משפחה"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required
                        value={values.id}
                        name="id"
                        label="תעודת זהות"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField select 
                        required
                        name="gender"
                        value={values.gender}
                        label="בחר מגדר" 
                        onChange={handleInputChange}
                        fullWidth
                        >
                        <MenuItem value="זכר">
                            זכר
                        </MenuItem>
                        <MenuItem value="נקבה">
                            נקבה
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required
                        type="date"
                        value={values.date_of_birth}
                        name="date_of_birth"
                        label="תאריך לידה"
                        onChange={handleInputChange}
                        InputLabelProps={{shrink:true}}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required
                        value={values.phone}
                        name="phone"
                        label="טלפון"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={values.address}
                        name="address"
                        label="כתובת"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={values.city}
                        name="city"
                        label="עיר מגורים"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField select 
                        required
                        value={values.riding_type}
                        name="riding_type"
                        label="בחר מגזר רכיבה" 
                        onChange={handleInputChange} 
                        fullWidth
                        >
                        <MenuItem value="רכיבה ספורטיבית">
                        רכיבה ספורטיבית
                        </MenuItem>
                        <MenuItem value="רכיבה טיפולית">
                        רכיבה טיפולית
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField type="date"
                        value={values.starting_date}
                        name="starting_date"
                        label="תאריך רישום לחווה"
                        InputLabelProps={{shrink:true}}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={values.height}
                        name="height"
                        label="גובה"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField type="number"
                        value={values.weight}
                        name="weight"
                        label="משקל"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required
                        value={values.email}
                        name="email"
                        label="דואר אלקטרוני"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required
                        value={values.password}
                        name="password"
                        label="סיסמה"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom style={{color:"red"}}>
                        {error}
                    </Typography>
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary" 
                    onClick={handleNext} 
                    className={classes.button}
                    >
                    שמור והמשך
                </Button>
            </div>
        </React.Fragment>
    )
}
