import React from 'react';
import './App.css';
import Home from './Components/Home'
import { Route, Switch, withRouter} from 'react-router-dom'
function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
  );
}

export default withRouter(App);
