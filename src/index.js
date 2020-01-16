import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './pages/home';
import RegisterPage from './pages/register';

import './stylesheets/main.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={ HomePage } />
        <Route path='/register' component={ RegisterPage } />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
