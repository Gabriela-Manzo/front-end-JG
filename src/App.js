import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './config/history'
import LandingPage from './views/LandingPage'
// import Chat from './Chat'
import Aula from './views/Aula'

const App = () => {
  return ( 
    <Router history={history}>
      <LandingPage path="LandingPage" />
      <Aula path="aula" />
    </Router>
    );
}

export default App