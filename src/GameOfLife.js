import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class GameOfLife extends Component {
  constructor() {
    super();
    this.state = {
      world: []
    }
  }
  componentWillMount() {
    // init world
    let size = 10;
    let world = [];
    _.range(size).forEach( (y) => {
      world.push(new Array(size).fill(true))
    });
    this.setState({world: world})
  }
  tick = () => {
    let nextWorld = this.state.world;
    this.state.world.forEach( (row, x) => {
      row.forEach((element, y) => {
        let neighbours = this.getNeighbours(x,y)
        if (element) {
          if (neighbours < 2 || neighbours > 3) {
            nextWorld[x][y] = false;
            console.log('deleting', x, y)
          }
        } else if (element == false && neighbours === 3) {
          nextWorld[x][y] = true;
          console.log('spawning', x, y)
        }
      });
    });
    this.setState({world: nextWorld})
    console.log(nextWorld);
  }
  getNeighbours = (x,y) => {
    let numNeighbours = 0;
    let world = this.state.world
    //check neighbours on same x
    if (world[x-1] && world[x-1][y]) {
      numNeighbours += 1;
    }
    if (world[x+1] && world[x+1][y]) {
      numNeighbours += 1;
    }
    //check neighbours above
    if (world[x-1] && world[x-1][y+1]) {
      numNeighbours += 1;
    }
    if (world[x+1] && world[x+1][y+1]) {
      numNeighbours += 1;
    }
    if (world[x][y+1]) {
      numNeighbours += 1;
    }
    //check neighbours below
    if (world[x-1] && world[x-1][y-1]) {
      numNeighbours += 1;
    }
    if (world[x+1] && [x+1][y-1]) {
      numNeighbours += 1;
    }
    if (world[x][y-1]) {
      numNeighbours += 1;
    }
    return numNeighbours;
  }
  render() {
    return (
      <div>
        Game of life!
        <button onClick={this.tick}>Tick</button>
        { this.state.world.map( (row) => (
          <Row row={row} />
        )) }
      </div>
    );
  }
}

const Row = ({row}) => (
  <div>
    {row.map( (item) => {
      return item ? '# ' : '_ '
    })}
  </div>
)


export default GameOfLife;
