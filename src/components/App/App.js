import React, { Component } from 'react'
import Headers from '../elements/Header/Header'
import Home from '../Home/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Headers />
        <Home />
    </div>
    );
  }
}

export default App;
