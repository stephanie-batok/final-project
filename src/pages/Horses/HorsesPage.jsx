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

export default function HorsesPage(props) {
    const [horses,setHorses] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
    const [active, setActive] = useState("");
    const [open, setOpen] = useState(false);
    const [chosenHorse,setChosenHorse] = useState("");
    const history = useHistory();
    const classes = useStyles();


    useEffect(()=>{

        fetch(apiUrl+"Horse/",
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
                  setHorses(result);
                  setRows(result);
                  setActive(true);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

    useEffect(() => {
        if(active!=="??????"){
            const filteredRows = horses.filter((horse) => {
                return horse.is_active===active;
            });
            setRows(filteredRows);
        }
        else {
            setRows(horses);
        }
    },[active]);

    const btnAddHorse=()=>{
        history.push('/AddHorse');
    }

    const btnEditing=(horse_id)=>{
        history.push("/EditHorse/"+horse_id);
    }
                                                                //Delete horse dialog
    const handleClickOpen = (horse_id) => {
        setChosenHorse(horse_id);    
        setOpen(true);
    };

    const deleteHorse = () => {
        
        fetch(apiUrl+"Horse/"+chosenHorse,                               //delete horse - turn is_active into false
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
        const filteredRows = horses.filter((horse) => {
          return horse.name.includes(searchedVal);
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
            arrayCopy.sort((a, b) => a.name.localeCompare(b.name));
        }
        else{
            setOrder("acs");
            arrayCopy.sort((a, b) => b.name.localeCompare(a.name));
        }
        setRows(arrayCopy);
    };
    
    return (
        <Container>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container justify="space-between">
                        <Grid item xs={5} sm={4} md={3} lg={2}>
                            <TextField select label="?????? ???????????? ??????????" value={active} onChange={(event)=> setActive(event.target.value)} fullWidth>
                                <MenuItem value="??????">
                                    ???? ????????????
                                </MenuItem>
                                <MenuItem value={true}>
                                    ?????????? ????????????
                                </MenuItem>
                                <MenuItem value={false}>
                                    ?????????? ???? ????????????
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={5} sm={4} md={3} lg={2}>
                        <IconButton classes={{label: classes.tableBtn}} aria-label="????????">
                            <FilterListIcon color="primary" onClick={() => sortBy()} />
                            <div className={classes.tableHeader}> ???????? ??????????</div>
                        </IconButton>              
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Grid item xs={4} sm={4} md={3} lg={3}>
                            <Button color="primary" onClick={btnAddHorse}>
                                <AddIcon/>
                                ?????????? ??????
                            </Button>
                        </Grid>
                        <Grid item xs={5} sm={5} md={4} lg={3}>
                            <SearchBar
                                value={searched}
                                placeholder="?????????? ?????? ???? ????????"
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
                                    <TableCell component='th' className={classes.tableHeader} >???? ????????</TableCell>
                                    <TableCell className={classes.tableHeader}>??????</TableCell>
                                    <TableCell className={classes.tableHeader}>????????</TableCell>
                                    <TableCell className={classes.tableHeader}>???????? ????????</TableCell>
                                    <TableCell className={classes.tableHeader}>?????????? ??????????????</TableCell>
                                    <TableCell className={classes.tableHeader}>?????? ?????????? ??????????</TableCell>
                                    <TableCell>&nbsp;</TableCell>     
                                    <TableCell>&nbsp;</TableCell>       
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((horse) => (
                                    <TableRow onDoubleClick={() => btnEditing(horse.id)} key={horse.id}>
                                        <TableCell>{horse.name}</TableCell>
                                        <TableCell>{horse.gender}</TableCell>
                                        <TableCell>{horse.size}</TableCell>
                                        <TableCell>{horse.temper}</TableCell>
                                        <TableCell>{horse.therapeutic_riding?"??????????":"???? ??????????"}</TableCell>
                                        <TableCell>{horse.required_rank}</TableCell>
                                        <TableCell>
                                            <IconButton classes={{label: classes.tableBtn}} aria-label="??????????"> 
                                                <EditOutlineOutlinedIcon color="primary" onClick={() => btnEditing(horse.id)} />
                                                <div>??????????</div>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton classes={{label: classes.tableBtn}} aria-label="??????????">
                                                <DeleteOutlineOutlinedIcon color="error" onClick={() => handleClickOpen(horse.id)} />
                                                <div>??????????</div>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={open} onClose={()=>setOpen(false)}>
                        
                        <DialogTitle style={{marginLeft:"auto"}} id="alert-dialog-title"> <DeleteOutlineOutlinedIcon/> ?????????? ??????</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <br/>?????? ?????? ???????? ?????????? ?????????? ?????? ?????
                            ???????? ???????? ???????????? ?????????????? ???? ????????.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>setOpen(false)} color="secondary">
                            ??????????
                        </Button>
                        <Button onClick={deleteHorse} color="primary" autoFocus>
                            ??????????
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </main>
       </Container>
    )
                    
}
