import React, { Component } from 'react';
import App from '../App';
import carsGame from '../utils/carsGame.js';

const theCars = new carsGame();

class Game extends Component {
  constructor(props) {
    super(props);
    theCars.setRedrawCallback(() => this.forceUpdate());
  }

  render() {
    return <App cars={theCars} />;
  }
}

export default Game;
