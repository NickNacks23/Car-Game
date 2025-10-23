import React, { Component } from 'react';
import { WID, HGT, GRID, WALL } from '../utils/constants.js';
import Square from './Square.jsx';
import CarView from './CarView.jsx';
import YouWon from './YouWon.jsx';

class BoardView extends Component {
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }

  handleReset() {
    this.props.cars.resetPuzzle();
  }

  handleNext() {
    this.props.cars.nextPuzzle();
  }

  handleUndo() {
    this.props.cars.undoMove();
  }

  render() {
    const bWid = WID * GRID;
    const bHgt = HGT * GRID;

    const bStyle = {
      width: bWid,
      height: bHgt,
      position: 'relative',
      border: '10px solid #00BFFF',  
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      backgroundColor: '#f0f0f0',   
    };

    let list = [];
    let key = 1;
    for (let x = 0; x < WID; x++) {
      for (let y = 0; y < HGT; y++) {
        
        const isExitCell = x === 6 && y === 2;  
        
        list.push(
          <Square key={key++} x={x * GRID} y={y * GRID} isExitCell={isExitCell} />
        );
      }
    }

    
    const cars = this.props.cars;
    const num = cars.getNumCars();
    for (let i = 0; i < num; i++) {
      const { id, x, y, ncols, nrows, color } = cars.getCar(i);
      list.push(
        <CarView
          key={key++}
          x={x * GRID}
          y={y * GRID}
          wid={ncols * GRID}
          hgt={nrows * GRID}
          color={color}
          idNum={id}
          cars={cars}
        />
      );
    }

    const moves = cars.getNumMoves();
    const bestMoves = cars.getBestNumMoves();
    let youWonMessage = null;
    if (cars.hasWon()) {
      youWonMessage = (
        <YouWon
          cx={bWid / 2}  
          cy={bHgt / 2}  
          moves={moves}
          bestMoves={bestMoves}
        />
      );
    }

    
    const arrowStyle = {
      position: 'absolute',
      top: (2 * GRID) + WALL + 50,  
      left: (7 * GRID) + GRID + 660, 
      transform: 'translateY(-50%)', 
      fontSize: '36px', 
      color: '#00BFFF', 
      zIndex: 10, 
    };

    
    const buttonStyle = {
      backgroundColor: '#00BFFF',
      color: 'white',
      fontSize: '16px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      margin: '10px',
    };

    const buttonHoverStyle = {
      ...buttonStyle,
      backgroundColor: '#0099CC',
    };

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          height: '100vh', 
          flexDirection: 'column', 
          paddingLeft: '20px', 
        }}
      >
        {/* Display the label with puzzle number and moves counter at the top of the grid */}
        <div style={{ color: '#00BFFF', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
          Puzzle {cars.getPuzzleNumber() + 1} | Moves: {moves} / Goal: {bestMoves}
        </div>

        {/* The game board with the border */}
        <div style={bStyle}>{list}</div>

        {/* Displays the "You Won!" message centered on top of the grid */}
        {youWonMessage}

        {/* Controls (Undo, Reset, Next buttons) */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            onClick={this.handleUndo} 
          >
            Undo
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            onClick={this.handleReset}
          >
            Reset
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            onClick={this.handleNext}
          >
            Next
          </button>
        </div>

        {/* Displays the arrow pointing to the exit gap */}
        <div style={arrowStyle}>
          &#8592;  {/* Left Arrow */}
        </div>
      </div>
    );
  }
}

export default BoardView;
