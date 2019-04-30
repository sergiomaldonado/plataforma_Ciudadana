import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './components/Home'
import Perfil from './components/Perfil'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <div>
     
  
     <Route exact path={'/'} component={ Home } />
     <Route exact path={'/perfil'} component={ Perfil } />
  
     </div>
        </div>
      </Router>
      </div>
    );
  }
}
export default App;
