import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class GameOfLife extends Component {
  constructor() {
    super();
    this.state = {
      world: [],
      ticker: false,
      ticks: 0
    }
  }
  componentWillMount() {
    this.initWorld(this.props.initialSize, false);
  }
  initWorld = (size, content) => {
    let world = [];
    _.range(size).forEach( () => {
        let row = []
        _.range(size).forEach( () => {
          row.push(content);
        });
        world.push(row);
    });
    world = this.seedWorld(world, this.props.initialSeeds);
    this.setState({world: world});
  }
  seedWorld = (world, seeds) => {
    const size = world.length;
    let x,y;
    _.range(seeds).forEach( () => {
      x = Math.floor((Math.random() * size));
      y = Math.floor((Math.random() * size));
      world[x][y] = true;
    });
    return world;
  }
  tick = () => {
    this.setState({ticks: this.state.ticks + 1});

    let nextWorld = this.state.world.map(function(arr) {
      return arr.slice();
    });

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
    if (_.isEqual(this.state.world, nextWorld)) {
      this.stopRun();
    }
    this.setState({world: nextWorld})
  }
  toggleRun = () => {
    if (this.state.ticker) {
      this.stopRun();
    } else{
      let ticker = setInterval(this.tick, this.props.speed);
      this.setState({ticker: ticker});
    }
  }
  stopRun = () => {
    clearInterval(this.state.ticker)
    this.setState({ticker: false})
  }
  getNeighbours = (x,y) => {
    let numNeighbours = 0;
    let world = this.state.world;
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
  toggleCell = (x,y) => {
    let world = this.state.world;
    world[x][y] = !world[x][y];
    this.setState({world: world})
  }
  render() {
    return (
      <div>
        <div className='controls'>
          Game of life!
          <button onClick={this.tick}>Tick</button>
          <button onClick={this.toggleRun}>{this.state.ticker ? 'Pause' : 'Run'}</button>
          <button onClick={this.initWorld.bind(this, 20, false)}>Reset</button>

        </div>
        <div className='world'>
          { this.state.world.map( (row, x) => (
            <div key={x}>
              {
                row.map( (item, y) => (
                  <span key={y} onClick={this.toggleCell.bind(null,x,y)} className={item ? 'filled-cell' : 'empty-cell'} />
                ))
              }
            </div>
          )) }
        </div>
      </div>
    );
  }
}


export default GameOfLife;
