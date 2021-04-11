import './App.css';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';

import LoginForm from './pages/LoginForm';
import RidersPage from './pages/RidersPage';
import AddRider from './pages/AddRider/AddRider';
import EditRider from './pages/EditRider';
import ViewRider from './pages/ViewRider';
import Schedule from './pages/Schedule';
import Header from './components/Header';
import HorsesPage from './pages/HorsesPage';
import AddHorse from './pages/AddHorse/AddHorse';
import EditHorse from './pages/EditHorse';


const apiUrl="http://proj.ruppin.ac.il/bgroup19/prod/api/";

function App() {
  return (
    <Router>
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
            </div>
        </Switch>
      </div>
    </Router>
  );
}

export default withRouter(App);
