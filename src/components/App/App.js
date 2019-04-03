import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Headers from '../elements/Header/Header'
import Home from '../Home/Home'
import Movie from '../Movie/Movie'
import NotFound from '../elements/NotFound/NotFound'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Headers />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/:movieId" component={Movie} exact />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
