import React,{useState,useEffect} from 'react';
import logo from '../horse-club-logo.png';
import clsx from 'clsx';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import {CssBaseline,Drawer,AppBar,Toolbar,List,IconButton,Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from './ListItems';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }
}));


export default function DrawerMenu(props) {
    const classes = useStyles();
    const theme = useTheme()
    const [open, setOpen] = useState(props.open);

    useEffect(() => {
        props.toggleDrawer(open);
    }, [open]);


    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color="transparent" position="fix" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => setOpen(true)}
                        className={clsx(classes.menuButton,open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    &nbsp;&nbsp;
                    <IconButton disabled={true} >
                        <img alt='logo' src={logo} style={{width:'3.5rem',height:'4rem'}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ?<ChevronRightIcon />:<ChevronLeftIcon />}
                    </IconButton>
                </div>
                <List>
                    <ListItems/>
                </List>
            </Drawer>
        </React.Fragment>
    )
}
