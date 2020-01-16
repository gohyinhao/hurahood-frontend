import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import HomePage from './components/home';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div class="ui container">
          <h1 class="ui header">EzTracker</h1>
          <Link to="/a">Go To Home</Link>
          <Route path="/a" component={ HomePage } />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
