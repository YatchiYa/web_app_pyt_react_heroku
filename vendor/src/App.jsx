import React, { Component } from 'react'
import App_home from './components/App';
import Auth from './components/authentification';
import Reg from './components/registe';
import { BrowserRouter as Router, Route } from "react-router-dom";

export class App extends Component {

  render() {
    return (
      <Router>
        <Route path="/" exact component={App_home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/reg" exact component={Reg} />
      </Router>
    )
  }
}

export default App;
