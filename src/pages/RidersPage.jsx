import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,Button,Grid,IconButton,TextField,MenuItem} from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
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

export default function RidersPage(props) {
    const [riders,setRiders] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
    const [ridingSector, setRidingSector] = useState("הכל");
    const history = useHistory();
    const classes = useStyles();


    useEffect(()=>{
        let apiUrl= props.apiUrl + "Rider/";

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
                  setRiders(result);
                  setRows(result);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

    const btnAddRider=()=>{
        history.push('/AddRider');
    }

    const btnView=(rider_id)=>{
        
    }

    const btnEditing=(rider_id)=>{
        history.push("/EditRider/"+rider_id);
    }

    const btnRemove=(rider_id)=>{
        
    }

    const requestSearch = (searchedVal) => {
        const filteredRows = riders.filter((rider) => {
          return rider.first_name.includes(searchedVal);
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

    const handleRidingSectorChange = (event) => {
        
        setRidingSector(event.target.value);
        
        if(event.target.value!=="הכל"){
            const filteredRows = riders.filter((rider) => {
                return rider.riding_type.includes(event.target.value);
            });
            setRows(filteredRows);
        }
        else{
            setRows(riders);
        }
    }
    
    return (
        <Container>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container justify="flex-end">
                        <Grid item xs={2}>
                            <TextField style={{width:"25ch"}} select label="בחר מגזר רכיבה" value={ridingSector} onChange={handleRidingSectorChange}>
                                <MenuItem value="הכל">
                                הכל
                                </MenuItem>
                                <MenuItem value="רכיבה ספורטיבית">
                                    רכיבה ספורטיבית
                                </MenuItem>
                                <MenuItem value="רכיבה טיפולית">
                                    רכיבה טיפולית
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton aria-label="מיון">
                                <FilterListIcon onClick={() => sortBy()} />
                            </IconButton>
                            <lable> מיון רוכבים </lable>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Grid item xs={3}>
                            <Button variant="outlined" color="primary" onClick={btnAddRider}>
                                <AddIcon/>
                                הוספת רוכב 
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
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
                                    <TableCell component='th' align="right">שם משפחה</TableCell>
                                    <TableCell align="right">שם פרטי</TableCell>
                                    <TableCell align="right">טלפון</TableCell>
                                    <TableCell align="right">מדריך קבוע</TableCell>
                                    <TableCell align="right">יום קבוע</TableCell>
                                    <TableCell align="right">שעה קבועה</TableCell>
                                    <TableCell align="right">&nbsp;</TableCell>     
                                    <TableCell align="right">&nbsp;</TableCell>     
                                    <TableCell align="right">&nbsp;</TableCell>       
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((rider) => (
                                    <TableRow key={rider.id}>
                                        <TableCell align="right">{rider.last_name}</TableCell>
                                        <TableCell align="right">{rider.first_name}</TableCell>
                                        <TableCell align="right">{rider.phone_number}</TableCell>
                                        <TableCell align="right">{rider.instructor_full_name}</TableCell>
                                        <TableCell align="right">{rider.regular_lessons.map((lesson)=>(lesson.day+" "))}</TableCell>
                                        <TableCell align="right">{rider.regular_lessons.map((lesson)=>(lesson.start_time+" "))}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="צפייה">  
                                                <VisibilityOutlinedIcon onClick={() => btnView(rider.id)} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="עריכה"> 
                                                <EditOutlineOutlinedIcon onClick={() => btnEditing(rider.id)} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="מחיקה">
                                                <DeleteOutlineOutlinedIcon onClick={() => btnRemove(rider.id)} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </main>
       </Container>
    )
                    
}
