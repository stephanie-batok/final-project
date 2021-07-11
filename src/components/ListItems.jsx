import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List,ListItem,ListItemIcon,ListItemText,Collapse} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import EditIcon from '@material-ui/icons/Edit';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import {Link} from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Icon} from '@iconify/react';
import horseshoeIcon from '@iconify-icons/mdi/horseshoe';


const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
}));

export default function ListItems() {
    const [openSchedule, setOpenSchedule] = useState(false);
    const [openRiders, setOpenRiders] = useState(false);
    const [openHorses, setOpenHorses] = useState(false);
    const [openInstructors, setOpenInstructors] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const user_type = localStorage.getItem("user_type");

    const classes = useStyles();

    return (
        <div>
            <ListItem button onClick={()=>{setOpenSchedule(!openSchedule)}}>
                <ListItemIcon>
                    <CalendarTodayIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="יומן" />
                {openSchedule ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSchedule} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link style={{ textDecoration:'none',color: "inherit"}} to="/Schedule">
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="צפייה ביומן" />
                        </ListItem>
                    </Link>
                    <ListItem button className={classes.nested}>
                        <Link style={{ textDecoration:'none',color: "inherit"}} to="/AddLesson">
                            <ListItemText primary="שיעור חדש" />
                        </Link>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={()=>{setOpenRiders(!openRiders)}}>
                <ListItemIcon>
                    <PeopleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="רוכבים" />
                {openRiders ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openRiders} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link style={{ textDecoration:'none',color: "inherit"}} to="/RidersPage">
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="צפייה ברוכבים" />
                        </ListItem>
                    </Link>
                    <ListItem button className={classes.nested}>
                        <Link style={{ textDecoration:'none',color: "inherit"}} to="/AddRider">
                            <ListItemText primary="רוכב חדש" />
                        </Link>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={()=>{setOpenHorses(!openHorses)}}>
                <ListItemIcon>
                    <Icon icon={horseshoeIcon} width="1.3rem" height="1.3rem" style={{color:"#3f51b5"}} />
                </ListItemIcon>
                <ListItemText primary="סוסים" />
                {openHorses ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openHorses} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link style={{ textDecoration:'none',color: "inherit"}} to="/HorsesPage">
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="צפייה בסוסים" />
                        </ListItem>
                    </Link>
                    <ListItem button className={classes.nested}>
                        <Link style={{ textDecoration:'none',color: "inherit"}} to="/AddHorse">
                            <ListItemText primary="סוס חדש" />
                        </Link>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={()=>{setOpenInstructors(!openInstructors)}}>
                <ListItemIcon>
                    <WorkIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="מדריכים" />
                {openInstructors ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openInstructors} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link style={{ textDecoration:'none',color: "inherit"}} to="/InstructorsPage">
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="צפייה במדריכים" />
                        </ListItem>
                    </Link>
                    <ListItem button className={classes.nested}>
                        <Link style={{ textDecoration:'none',color: "inherit"}} to="/AddInstructor">
                            <ListItemText primary="מדריך חדש" />
                        </Link>
                    </ListItem>
                </List>
            </Collapse>
            {user_type==="manager"?
            <ListItem button onClick={()=>{setOpenUsers(!openUsers)}}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="משתמשים" />
                {openUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItem>:null}
            <Collapse in={openUsers} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link style={{ textDecoration:'none',color: "inherit"}} to="/UsersPage">
                        <ListItem button className={classes.nested}>
                            <ListItemText primary="צפייה במשתמשים" />
                        </ListItem>
                    </Link>
                    <ListItem button className={classes.nested}>
                        <Link style={{ textDecoration:'none',color: "inherit"}} to="/AddUser">
                            <ListItemText primary="משתמש חדש" />
                        </Link>
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button>
                    <ListItemIcon>
                        <EditIcon fontSize="small" color="primary"/>
                    </ListItemIcon>
                    <Link style={{ textDecoration:'none',color: "inherit"}} to="/MatchCriteria">
                        <ListItemText primary="ניהול שיבוץ" />
                    </Link>
            </ListItem>
            <ListItem button onClick={() => {localStorage.clear()}}>
                    <ListItemIcon>
                        <span class="material-icons md-48" style={{color:"#3f51b5",fontSize:"22px"}}>logout</span>
                    </ListItemIcon>
                    <Link style={{ textDecoration:'none',color: "inherit"}} to="">
                        <ListItemText primary="התנתק/י" />
                    </Link>
            </ListItem>
        </div>
    )
}