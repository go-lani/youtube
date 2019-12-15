import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Main from './Main';
import VideoPlayer from './components/VideoPlayer';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/watch/:videoId" component={ VideoPlayer } />
        <Route path="/watch" component={ VideoPlayer } />
        <Route path="/results" component={ Main } />
        <Route path="/" component={ Main } />
      </Switch>
    </Router>
  );
}

export default App;