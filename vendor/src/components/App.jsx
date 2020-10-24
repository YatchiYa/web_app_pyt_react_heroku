import React, { Component } from 'react'
import Navigation from './navigation';

export class App extends Component {
  state = {
    resumeData : {},
  }
  
  render() {
    return (
      <div>
        <Navigation />
      </div>
    )
  }
}

export default App
