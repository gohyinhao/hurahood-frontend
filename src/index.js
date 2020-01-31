import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './pages/home';

import './stylesheets/main.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={ HomePage } />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
