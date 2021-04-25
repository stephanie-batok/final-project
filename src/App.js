import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/core/styles';

import LoginForm from './pages/LoginForm';
import RidersPage from './pages/RidersPage';
import AddRider from './pages/AddRider/AddRider';
import ViewRider from './pages/ViewRider';
import Schedule from './pages/Schedule';
import Header from './components/Header';
import HorsesPage from './pages/HorsesPage';
import AddHorse from './pages/AddHorse/AddHorse';
import EditHorse from './pages/EditHorse/EditHorse';
import CustomTheme from './assets/CustomTheme';
import EditLesson from './pages/EditLesson';
import EditRider from './pages/EditRider/EditRider';
import AddLeasson from './pages/AddLeasson';
import InstructorsPage from './pages/InstructorsPage';
import AddInstructor from './pages/AddInstructor/AddInstructor';
import EditInstructor from './pages/EditInstructor';


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const apiUrl="http://proj.ruppin.ac.il/bgroup19/prod/api/";

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <StylesProvider jss={jss}>
        <div className="App">
          <Switch>
              <Route exact path="/" >
                <LoginForm apiUrl={apiUrl}/>
              </Route>
              <div>
                  <Header/>
                  <Route path="/Riders" >
                    <RidersPage apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/AddRider" >
                    <AddRider apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/EditRider/:id" >
                    <EditRider apiUrl={apiUrl}/>
                  </Route>
                  <Route path="/ViewRider/:id" >
                    <ViewRider apiUrl={apiUrl}/>
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
                    <AddLeasson apiUrl={apiUrl}/>
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
              </div>
          </Switch>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default withRouter(App);
