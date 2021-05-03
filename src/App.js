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
import Messages from './pages/Messages';


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

const apiUrl="http://proj.ruppin.ac.il/bgroup19/prod/api/";

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
                <LoginForm apiUrl={apiUrl}/>
              </Route>
              <div className={clsx(classes.content, {[classes.contentShift]: !open})}>
                  <DrawerMenu toggleDrawer={toggleDrawer}/>
                  <Route path="/RidersPage" >
                    <RidersPage apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/AddRider" >
                    <AddRider apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/EditRider/:id" >
                    <EditRider apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/Schedule" >
                    <Schedule apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/HorsesPage" >
                    <HorsesPage apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/AddHorse" >
                    <AddHorse apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/EditHorse/:id" >
                    <EditHorse apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/EditLesson/:id" >
                    <EditLesson apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/AddLesson" >
                    <AddLesson apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/InstructorsPage" >
                    <InstructorsPage apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/AddInstructor" >
                    <AddInstructor apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/EditInstructor/:id" >
                    <EditInstructor apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/Messages" >
                    <Messages apiUrl={apiUrl}/>
                  </Route>
              </div>
          </Switch>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default withRouter(App);
