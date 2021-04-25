import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,Button,Grid,IconButton,MenuItem,TextField} from '@material-ui/core';
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

export default function HorsesPage(props) {
    const [horses,setHorses] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
    const [active, setActive] = useState("הכל");
    const history = useHistory();
    const classes = useStyles();


    useEffect(()=>{
        let apiUrl= props.apiUrl + "Horse/";

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
                  setHorses(result);
                  setRows(result);
              },
              (error) => {
                alert(error);
            }
        );
    },[]);

    const btnAddHorse=()=>{
        history.push('/AddHorse');
    }

    const btnView=(horse_id)=>{
        
    }

    const btnEditing=(horse_id)=>{
        history.push("/EditHorse/"+horse_id);
    }

    const btnRemove=(horse_id)=>{
        
    }

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

    const handleActiveChange = (event) => {
        setActive(event.target.value);

        if(event.target.value!=="הכל"){
            const filteredRows = horses.filter((horse) => {
                return horse.is_active===event.target.value;
            });
            setRows(filteredRows);
        }
        else{
            setRows(horses);
        }

    }
    
    return (
        <Container>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container justify="space-between">
                        <Grid item xs={5} sm={4} md={3} lg={2}>
                            <TextField select label="בחר סטאטוס סוסים" value={active} onChange={handleActiveChange} fullWidth>
                                <MenuItem value="הכל">
                                    כל הסוסים
                                </MenuItem>
                                <MenuItem value={true}>
                                    סוסים פעילים
                                </MenuItem>
                                <MenuItem value={false}>
                                    סוסים לא פעילים
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={5} sm={4} md={3} lg={2}>
                            <IconButton aria-label="מיון">
                                <FilterListIcon onClick={() => sortBy()} />
                            </IconButton>
                            <lable> מיון סוסים </lable>                 
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Grid item xs={4} sm={4} md={3} lg={3}>
                            <Button color="primary" onClick={btnAddHorse}>
                                <AddIcon/>
                                הוספת סוס
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
                                    <TableCell component='th'>שם הסוס</TableCell>
                                    <TableCell>מין</TableCell>
                                    <TableCell>גודל</TableCell>
                                    <TableCell>אופי הסוס</TableCell>
                                    <TableCell>רכיבה טיפולית</TableCell>
                                    <TableCell>רמת רכיבה נדרשת</TableCell>
                                    {/* <TableCell align="right">&nbsp;</TableCell>      */}
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
                                        <TableCell>{horse.therapeutic_riding?"מתאים":"לא מתאים"}</TableCell>
                                        <TableCell>{horse.required_rank}</TableCell>
                                        {/* <TableCell align="right">
                                            <IconButton aria-label="צפייה">  
                                                <VisibilityOutlinedIcon onClick={() => btnView(horse.id)} />
                                            </IconButton>
                                        </TableCell> */}
                                        <TableCell>
                                            <IconButton aria-label="עריכה"> 
                                                <EditOutlineOutlinedIcon onClick={() => btnEditing(horse.id)} />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton aria-label="מחיקה">
                                                <DeleteOutlineOutlinedIcon onClick={() => btnRemove(horse.id)} />
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
