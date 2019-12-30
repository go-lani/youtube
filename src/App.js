import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Main';
import VideoPlayer from './components/VideoPlayer';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

const App = () => {
  return (
    <Provider
      store={createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      )}
    >
      <Router>
        <Header>
          <SearchBar />
        </Header>
        <Switch>
          <Route path="/watch/:videoId" component={VideoPlayer} />
          <Route path="/watch" component={VideoPlayer} />
          <Route path="/results" component={Main} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
