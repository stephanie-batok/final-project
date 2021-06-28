import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import clsx from 'clsx';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core/styles';
import React,{useState} from 'react';


import LoginForm from './pages/LoginForm';
import RidersPage from './pages/Riders/RidersPage';
import AddRider from './pages/Riders/AddRider/AddRider';
import Schedule from './pages/Schedule';
import HorsesPage from './pages/Horses/HorsesPage';
import AddHorse from './pages/Horses/AddHorse/AddHorse';
import EditHorse from './pages/Horses/EditHorse/EditHorse';
import CustomTheme from './assets/CustomTheme';
import EditLesson from './pages/EditLesson';
import EditRider from './pages/Riders/EditRider/EditRider';
import AddLesson from './pages/AddLesson/AddLesson';
import InstructorsPage from './pages/Instructors/InstructorsPage';
import AddInstructor from './pages/Instructors/AddInstructor/AddInstructor';
import EditInstructor from './pages/Instructors/EditInstructor';
import DrawerMenu from './components/DrawerMenu';
import Messages from './pages/Messages/Messages';


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    overflow: 'auto',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -240,
  },
  contentShift: {
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState("");


  const toggleDrawer = (data) =>{
    setOpen(data);
  }

  return (
    <ThemeProvider theme={CustomTheme}>
      <StylesProvider jss={jss}>
        <div className="App">
          <Switch>
              <Route exact path="/" >
                <LoginForm/>
              </Route>
              <div className={clsx(classes.content, {[classes.contentShift]: !open})}>
                  <DrawerMenu toggleDrawer={toggleDrawer}/>
                  <Route path="/RidersPage" >
                    <RidersPage/>
                  </Route>
                  <Route path="/AddRider" >
                    <AddRider/>
                  </Route>
                  <Route path="/EditRider/:id" >
                    <EditRider/>
                  </Route>
                  <Route path="/Schedule" >
                    <Schedule/>
                  </Route>
                  <Route path="/HorsesPage" >
                    <HorsesPage/>
                  </Route>
                  <Route path="/AddHorse" >
                    <AddHorse/>
                  </Route>
                  <Route path="/EditHorse/:id" >
                    <EditHorse/>
                  </Route>
                  <Route path="/EditLesson/:id" >
                    <EditLesson/>
                  </Route>
                  <Route path="/AddLesson" >
                    <AddLesson/>
                  </Route>
                  <Route path="/InstructorsPage" >
                    <InstructorsPage/>
                  </Route>
                  <Route path="/AddInstructor" >
                    <AddInstructor />
                  </Route>
                  <Route path="/EditInstructor/:id" >
                    <EditInstructor />
                  </Route>
                  <Route path="/Messages" >
                    <Messages/>
                  </Route>
              </div>
          </Switch>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default withRouter(App);
