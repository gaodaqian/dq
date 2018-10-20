import React, { Component } from 'react';
import './App.css';

import Todo from './components/todo/index.js'

class App extends Component {
  render() {
    return (
      <div>
        <Todo />
      </div>
    );
  }
}

export default App;
