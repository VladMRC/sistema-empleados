import React from 'react';
import { Provider } from 'react-redux';
import HomeRouter from './HomeRouter';

import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';

function App() {
  return (
    <Provider store={ store }>
      <Router>  
        <HomeRouter />
      </Router>
    </Provider>
  );
}

export default App;
