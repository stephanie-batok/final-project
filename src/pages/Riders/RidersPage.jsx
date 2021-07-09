import React,{useState,useEffect} from 'react';
import apiUrl from '../../global';
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
    tableBtn:{
        display: 'flex',
        flexDirection: 'column',
        fontSize:12
    },
    tableHeader:{
        fontWeight:"bold",
        color:"#585858"
    },
    searchBar:{
        margin: '0 auto',
        maxWidth: 300,
        flexGrow:1,
        marginBottom:20
    }
}));

export default function RidersPage(props) {
    const [riders,setRiders] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
    const [ridingSector, setRidingSector] = useState("הכל");
    const [active, setActive] = useState("");
    const [open, setOpen] = useState(false);
    const [chosenRider,setChosenRider] = useState("");
    const history = useHistory();
    const classes = useStyles();


    useEffect(()=>{

        fetch(apiUrl+"Rider/",
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
                  setActive(true);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

    useEffect(() => {
        if(active!=="הכל"){
            const filteredRows = riders.filter((rider) => {
                return rider.isActive===active;
            });
            setRows(filteredRows);
        }
        else{
            setRows(riders);
        }
    },[active]);

    const btnAddRider=()=>{
        history.push('/AddRider');
    }

    const btnEditing=(rider_id)=>{
        history.push("/EditRider/"+rider_id);
    }
                                                                //Delete rider dialog
    const handleClickOpen = (rider_id) => {
        setChosenRider(rider_id);    
        setOpen(true);
      };
    
      const deleteRider = () => {
          
        fetch(apiUrl+"Rider/"+chosenRider,                               //delete rider - turn isActive into false
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
                                                             //search rider by first name
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
                                                            //order riders table by last name
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
                                                            //change riding sector
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
                    <Grid container justify="space-between">
                        <Grid item xs={4} sm={4} md={3} lg={2}>
                            <TextField select label="בחר סטאטוס רוכבים" value={active} onChange={(event)=> setActive(event.target.value)} fullWidth>
                                <MenuItem value="הכל">
                                    כל הרוכבים
                                </MenuItem>
                                <MenuItem value={true}>
                                    רוכבים פעילים
                                </MenuItem>
                                <MenuItem value={false}>
                                    רוכבים לא פעילים
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={4} sm={4} md={3} lg={2}>
                            <TextField select label="בחר מגזר רכיבה" value={ridingSector} onChange={handleRidingSectorChange} fullWidth>
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
                        <Grid item xs={4} sm={4} md={3} lg={2}>
                            <IconButton classes={{label: classes.tableBtn}} aria-label="מיון">
                                <FilterListIcon onClick={() => sortBy()} />
                                <div className={classes.tableHeader}> מיון רוכבים</div>
                            </IconButton>    
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Grid item xs={4} sm={4} md={3} lg={3}>
                            <Button color="primary" onClick={btnAddRider}>
                                <AddIcon/>
                                הוספת רוכב 
                            </Button>
                        </Grid>
                        <Grid item xs={5} sm={5} md={4} lg={3}>
                            <SearchBar
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                                className={classes.searchBar}
                            />
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{background:"rgb(245 245 245)"}}>
                                <TableRow>
                                    <TableCell component='th' className={classes.tableHeader}>שם משפחה</TableCell>
                                    <TableCell className={classes.tableHeader}>שם פרטי</TableCell>
                                    <TableCell className={classes.tableHeader}>טלפון</TableCell>
                                    <TableCell className={classes.tableHeader}>מדריך קבוע</TableCell>
                                    <TableCell className={classes.tableHeader}>יום קבוע</TableCell>
                                    <TableCell className={classes.tableHeader}>שעה קבועה</TableCell>
                                    <TableCell>&nbsp;</TableCell>     
                                    <TableCell>&nbsp;</TableCell>       
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((rider) => (
                                    <TableRow onDoubleClick={() => btnEditing(rider.id)} key={rider.id}>
                                        <TableCell >{rider.last_name}</TableCell>
                                        <TableCell>{rider.first_name}</TableCell>
                                        <TableCell>{rider.phone_number}</TableCell>
                                        <TableCell>{rider.instructor_full_name}</TableCell>
                                        <TableCell>{rider.regular_lessons.map((lesson)=>(lesson.day+" "))}</TableCell>
                                        <TableCell>{rider.regular_lessons.map((lesson)=>(lesson.start_time+" "))}</TableCell>
                                        <TableCell>
                                            <IconButton classes={{label: classes.tableBtn}} aria-label="עריכה"> 
                                                <EditOutlineOutlinedIcon onClick={() => btnEditing(rider.id)} />
                                                <div>עריכה</div>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton classes={{label: classes.tableBtn}} aria-label="מחיקה">
                                                <DeleteOutlineOutlinedIcon onClick={() => handleClickOpen(rider.id)} />
                                                <div>מחיקה</div>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={open} onClose={()=>setOpen(false)}>
                        <DialogTitle style={{marginLeft:"auto"}} id="alert-dialog-title">מחיקת תלמיד</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <br/>האם אתה בטוח שתרצה למחוק תלמיד זה?
                            פרטי התלמיד יישמרו בסטאטוס לא פעיל.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>setOpen(false)} color="primary">
                            ביטול
                        </Button>
                        <Button onClick={deleteRider} color="primary" autoFocus>
                            אישור
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </main>
       </Container>
    )
                    
}
