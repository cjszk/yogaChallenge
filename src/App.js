import React, { Component } from 'react';
import './App.css';
import './custom.css';

import ClassFinder from './components/classFinder.js';

class App extends Component {
  render() {
    return (
      <div id="app" className="App">
        <ClassFinder />
      </div>
    );
  }
}

export default App;
