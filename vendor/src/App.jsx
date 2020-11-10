import React, { Component } from 'react'
import App_home from './components/App';
import Register from './components/registe';
import Reg from './components/registe_second';
import Login from './components/authentification';
import Home from './components/home_page';
import Map from './components/map_page';
import { BrowserRouter as Router, Route } from "react-router-dom";

export class App extends Component {
  
  render() {
    return (
      <Router>
        <Route path="/" exact component={App_home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/map" exact component={Map} />
        <Route path="/reg" exact component={Reg} />
      </Router>
    )
  }
}

export default App;
