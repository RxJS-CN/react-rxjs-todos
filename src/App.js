import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Todos from './components/Todos';

// todomvc styles
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Todos} />
      <Route exact path="/:filter" component={Todos} />
    </div>
  </Router>
);

export default App;