import React, { Component } from 'react';
import GameOfLife from './GameOfLife'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Conway's Game of Life</h2>
        </div>
        <p className="App-intro">
          Conway's famous Game of Life simulation, built in React.js
        </p>

        <GameOfLife />

      </div>
    );
  }
}

export default App;
