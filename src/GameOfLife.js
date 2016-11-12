import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class GameOfLife extends Component {
  constructor() {
    super();
    this.state = {
      world: [],
      ticker: false
    }
  }
  componentWillMount() {
    const size = 30;
    this.initWorld(size, false);
  }
  initWorld = (size, content) => {
    let world = [];
    _.range(size).forEach( () => {
      world.push(new Array(size).fill(content));
    });
    world = this.seedWorld(world, 200);
    this.setState({world: world});
  }
  seedWorld = (world, seeds) => {
    const size = world.length;
    let x,y;
    _.range(seeds).forEach( () => {
      x = Math.floor((Math.random() * size));
      y = Math.floor((Math.random() * size));
      console.log(x,y)
      console.log(world)
      world[x][y] = true;
    });
    return world;
  }
  tick = () => {
    let nextWorld = this.state.world;
    this.state.world.forEach( (row, x) => {
      row.forEach((element, y) => {
        let neighbours = this.getNeighbours(x,y)
        if (element) {
          if (neighbours < 2 || neighbours > 3) {
            nextWorld[x][y] = false;
          }
        } else if (neighbours === 3) {
          nextWorld[x][y] = true;
        }
      });
    });
    this.setState({world: nextWorld})
    console.log(nextWorld);
  }
  run = () => {
    if (this.state.ticker) {
      clearInterval(this.state.ticker)
      this.setState({ticker: false})
    } else{
      let ticker = setInterval(this.tick, 500);
      this.setState({ticker: ticker});
    }
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
        <button onClick={this.run}>{this.state.ticker ? 'Pause' : 'Run'}</button>
        { this.state.world.map( (row, index) => (
          <Row key={index} row={row} />
        )) }
      </div>
    );
  }
}

const Row = ({row}) => (
  <div>
    {row.map( (item) => (
      <Cell item={item} />
    ))}
  </div>
)

const Cell = ({item}) => (
  <span className={item ? 'filled-cell' : 'empty-cell'} />
)

export default GameOfLife;
