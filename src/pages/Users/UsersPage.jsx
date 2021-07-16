import React,{useState,useEffect} from 'react';
import apiUrl from '../../global';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,Button,Grid,IconButton,TextField,MenuItem,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import RestoreIcon from '@material-ui/icons/Restore';
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

export default function UsersPage() {
    const [users,setUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
    const [active, setActive] = useState("");
    const [open, setOpen] = useState(false);
    const [chosenUser,setChosenUser] = useState("");
    const history = useHistory();
    const classes = useStyles();

    useEffect(()=>{

        fetch(apiUrl+"SystemUser/All",
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
                  setUsers(result);
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
            const filteredRows = users.filter((user) => {
                return user.isAllowed===active;
            });
            setRows(filteredRows);
        }
        else{
            setRows(users);
        }
    },[active]);

    const btnAddUsers=()=>{
        history.push('/AddUser');
    }

                                                                     //Delete user dialog
    const handleClickOpen = (user_id) => {
        setChosenUser(user_id);    
        setOpen(true);
    };

    const deleteUser = () => {
        
        fetch(apiUrl+"SystemUser/"+chosenUser,                               //delete user - turn isAllowed into false
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

    const restoreUser = (userToRestore) => {
        
        fetch(apiUrl+"SystemUser/"+userToRestore,                               //delete user - turn isAllowed into true
            {
                method: 'PUT',
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
    };  

    const requestSearch = (searchedVal) => {
        const filteredRows = users.filter((user) => {
          return user.first_name.includes(searchedVal);
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
                            <TextField select label="בחר סטאטוס משתמשים" value={active} onChange={(event)=> setActive(event.target.value)} fullWidth>
                                <MenuItem value="הכל">
                                    כל המשתמשים
                                </MenuItem>
                                <MenuItem value={true}>
                                    משתמשים פעילים
                                </MenuItem>
                                <MenuItem value={false}>
                                    משתמשים לא פעילים
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={5} sm={4} md={3} lg={2}>
                            <IconButton classes={{label: classes.tableBtn}} aria-label="מיון">
                                <FilterListIcon color="primary" onClick={() => sortBy()} />
                                <div className={classes.tableHeader}> מיון משתמשים</div>
                            </IconButton>           
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Grid item xs={4} sm={4} md={3} lg={3}>
                            <Button color="primary" onClick={btnAddUsers}>
                                <AddIcon/>
                                הוספת משתמש
                            </Button>
                        </Grid>
                        <Grid item xs={5} sm={5} md={4} lg={3}>
                            <SearchBar
                                value={searched}
                                placeholder="חיפוש לפי שם פרטי"
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
                                    <TableCell align="center" className={classes.tableHeader}>טלפון</TableCell>
                                    <TableCell align="center" className={classes.tableHeader}>תעודת זהות</TableCell>
                                    <TableCell align="center" className={classes.tableHeader}>כתובת מייל</TableCell>
                                    <TableCell className={classes.tableHeader}>סיסמה</TableCell>
                                    <TableCell className={classes.tableHeader}>סוג משתמש</TableCell>
                                    <TableCell>&nbsp;</TableCell>       
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell >{user.last_name}</TableCell>
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell align="center">{user.phone_number}</TableCell>
                                        <TableCell align="center">{user.id}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell>{user.password}</TableCell>
                                        <TableCell>{user.user_type}</TableCell>
                                        <TableCell>
                                            {user.isAllowed?
                                            <IconButton aria-label="מחק הרשאה" classes={{label: classes.tableBtn}}>
                                                <DeleteOutlineOutlinedIcon color="error" onClick={() => handleClickOpen(user.id)} />
                                                <div>מחיקת הרשאה</div>
                                            </IconButton>:
                                                <IconButton aria-label="שחזר הרשאה" classes={{label: classes.tableBtn}}>
                                                <RestoreIcon color="primary" onClick={() => restoreUser(user.id)} />
                                                <div>שחזור הרשאה</div>
                                            </IconButton>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={open} onClose={()=>setOpen(false)}>
                        <DialogTitle style={{marginLeft:"auto"}} id="alert-dialog-title"> <DeleteOutlineOutlinedIcon/> מחיקת משתמש</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <br/>האם אתה בטוח שתרצה למחוק משתמש זה?
                            פרטי המשתמש יישמרו בסטאטוס לא פעיל.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>setOpen(false)} color="secondary">
                            ביטול
                        </Button>
                        <Button onClick={deleteUser} color="primary" autoFocus>
                            אישור
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </main>
       </Container>
    )
}
