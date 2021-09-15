import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './config/history'
import Aula from './views/Aula'

const App = () => {
  return ( 
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Aula} />
        <Route exact path="/aula" component={Aula} />
      </Switch>
    </Router>
    );
}

export default App