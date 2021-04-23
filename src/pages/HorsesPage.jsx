import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Container,Button,Grid,IconButton} from '@material-ui/core';
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

export default function HorsesPage(props) {
    const [horses,setHorses] = useState([]);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [order, setOrder] = useState("acs");
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
    
    return (
        <Container>
            <Grid container justify="flex-end">
                <Grid item xs={2}>
                    <IconButton aria-label="מיון">
                        <FilterListIcon onClick={() => sortBy()} />
                    </IconButton>
                    <lable> מיון סוסים </lable>                 
                </Grid>
            </Grid>
            <br/><br/>
            <Grid container justify="space-between" alignItems="baseline">
                <Grid item xs={3}>
                    <Button variant="outlined" color="primary" onClick={btnAddHorse}>הוספת סוס</Button>
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
       </Container>
    )
                    
}
