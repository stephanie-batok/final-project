import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,Button,Grid,IconButton,TextField,MenuItem,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlineOutlinedIcon from '@material-ui/icons/EditOutlined';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from "material-ui-search-bar";


const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
        },
    },
}));


export default function InstructorsPage(props) {
    const [instructors,setInstructors] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
    const [active, setActive] = useState("");
    const [open, setOpen] = useState(false);
    const [chosenInstructor,setChosenInstructor] = useState("");
    const history = useHistory();
    const classes = useStyles();

    useEffect(()=>{
        let apiUrl= props.apiUrl + "Worker/Instructor";

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
                  setInstructors(result);
                  setRows(result);
                  setActive(true);
              },
              (error) => {
                console.log(error);
            }
        );
    },[]);

    useEffect(() => {
        if(active!=="הכל"){
            const filteredRows = instructors.filter((instructor) => {
                return instructor.isAllowed===active;
            });
            setRows(filteredRows);
        }
        else{
            setRows(instructors);
        }
    },[active]);

    const btnAddInstructor=()=>{
        history.push('/AddInstructor');
    }

    const btnEditing=(instructor_id)=>{
        history.push("/EditInstructor/"+instructor_id);
    }
                                                                     //Delete instructor dialog
    const handleClickOpen = (instructor_id) => {
        setChosenInstructor(instructor_id);    
        setOpen(true);
    };

    const deleteInstructor = () => {
        let apiUrl= props.apiUrl + "Worker/";
        fetch(apiUrl+chosenInstructor,                               //delete instructor - turn isAllowed into false
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
    };  

    const requestSearch = (searchedVal) => {
        const filteredRows = instructors.filter((instructor) => {
          return instructor.first_name.includes(searchedVal);
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
        
    const sortBy = () => {
        let arrayCopy = [...rows];

        if(order==="acs"){
            setOrder("desc");
            arrayCopy.sort((a, b) => a.last_name.localeCompare(b.last_name));
        }
        else{
            setOrder("acs");
            arrayCopy.sort((a, b) => b.last_name.localeCompare(a.last_name));
        }
        setRows(arrayCopy);
    };

    return (
        <Container>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container justify="space-between">
                        <Grid item xs={5} sm={4} md={3} lg={2}>
                            <TextField select label="בחר סטאטוס מדריכים" value={active} onChange={(event)=> setActive(event.target.value)} fullWidth>
                                <MenuItem value="הכל">
                                    כל המדריכים
                                </MenuItem>
                                <MenuItem value={true}>
                                    מדריכים פעילים
                                </MenuItem>
                                <MenuItem value={false}>
                                    מדריכים לא פעילים
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={5} sm={4} md={3} lg={2}>
                            <IconButton aria-label="מיון">
                                <FilterListIcon onClick={() => sortBy()} />
                            </IconButton>
                            <lable> מיון מדריכים </lable>                 
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Grid item xs={4} sm={4} md={3} lg={3}>
                            <Button color="primary" onClick={btnAddInstructor}>
                                <AddIcon/>
                                הוספת מדריך
                            </Button>
                        </Grid>
                        <Grid item xs={5} sm={5} md={4} lg={3}>
                            <SearchBar
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                                style={{
                                    margin: '0 auto',
                                    maxWidth: 300,
                                    flexGrow:1
                                }}
                            />
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{background:"rgb(245 245 245)"}}>
                                <TableRow>
                                    <TableCell component='th'>שם משפחה</TableCell>
                                    <TableCell>שם פרטי</TableCell>
                                    <TableCell align="center">טלפון</TableCell>
                                    <TableCell>מין</TableCell>
                                    <TableCell>כתובת מייל</TableCell>
                                    <TableCell >תאריך לידה</TableCell>
                                    <TableCell>&nbsp;</TableCell>     
                                    <TableCell>&nbsp;</TableCell>       
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((instructor) => (
                                    <TableRow onDoubleClick={() => btnEditing(instructor.id)} key={instructor.id}>
                                        <TableCell >{instructor.last_name}</TableCell>
                                        <TableCell>{instructor.first_name}</TableCell>
                                        <TableCell align="center">{instructor.phone_number}</TableCell>
                                        <TableCell>{instructor.gender}</TableCell>
                                        <TableCell>{instructor.email}</TableCell>
                                        <TableCell>{instructor.date_of_birth}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="עריכה"> 
                                                <EditOutlineOutlinedIcon onClick={() => btnEditing(instructor.id)} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="מחיקה">
                                                <DeleteOutlineOutlinedIcon onClick={() => handleClickOpen(instructor.id)} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={open} onClose={()=>setOpen(false)}>
                        <DialogTitle id="alert-dialog-title">מחיקת מדריך</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <br/>האם אתה בטוח שתרצה למחוק מדריך זה?
                            פרטי המדריך יישמרו בסטאטוס לא פעיל.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>setOpen(false)} color="primary">
                            ביטול
                        </Button>
                        <Button onClick={deleteInstructor} color="primary" autoFocus>
                            אישור
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </main>
       </Container>
    )
}
