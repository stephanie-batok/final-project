import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,Button,Grid,IconButton,TextField,MenuItem} from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlineOutlinedIcon from '@material-ui/icons/EditOutlined';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function RidersPage(props) {
    const [riders,setRiders] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
    const [ridingSector, setRidingSector] = useState("הכל");
    const history = useHistory();
    const classes = useStyles();

    const getRiders = () => {
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
    }

    useEffect(()=>{
        getRiders();

    },[]);

    const btnAddRider=()=>{
        history.push('/addRider');
    }

    const btnView=(rider_id)=>{
        
        history.push({
            pathname: '/ViewRider',
            state: { 
                id: rider_id,
            }
        });
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

        if(ridingSector!=="הכל"){
            const filteredRows = riders.filter((rider) => {
                return rider.riding_type.includes(ridingSector);
            });
            setRows(filteredRows);
        }
        else{
            setRows(riders);
        }
    }
    
    return (
        <Container>
            <Grid container justify="flex-start" alignItems="center">
                <Grid item xs={3}>
                    <Button variant="outlined" color="primary" onClick={btnAddRider}>הוסף תלמיד</Button>
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={3}>
                    <IconButton aria-label="מיון">
                        <FilterListIcon onClick={() => sortBy()} />
                    </IconButton>                 
                </Grid>
            </Grid>
            <br/>
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
                                <TableCell align="right">{rider.regular_lessons.map((lesson)=>(lesson.time+" "))}</TableCell>
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
       </Container>
    )
                    
}
