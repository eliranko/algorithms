import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Header from './header/Header.js';
import ShortestPath from './shortest_path/ShortestPath.js';
import NotFound from './not_found.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route path="/shortest">
              <ShortestPath cableApp={this.props.cableApp} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;