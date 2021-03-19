import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';


import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './pages/HomePage';
import RidersPage from './pages/RidersPage';
import AddRider from './pages/AddRider';

const apiUrl="http://localhost:58718/api/";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" >
            <LoginForm apiUrl={apiUrl}/>
          </Route>
          <Route path="/home" >
            <HomePage apiUrl={apiUrl}/>
          </Route>
          <Route path="/riders" >
            <RidersPage apiUrl={apiUrl}/>
          </Route>
          <Route path="/addRider" >
            <AddRider apiUrl={apiUrl}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default withRouter(App);
