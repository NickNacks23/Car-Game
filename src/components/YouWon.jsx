import React from 'react';

export default function YouWon({ cx, cy, moves, bestMoves }) {
  const style = {
    position: 'absolute',
    top: cy - 40,  
    center: cx -50, 
    width: 200,
    padding: '10px',
    background: 'rgba(255,255,0,0.9)',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    border: '2px solid #333',
    borderRadius: '8px',
  };

  return (
    <div style={style}>
      🎉 You Won! 🎉
      <br />
      Moves: {moves} / Goal: {bestMoves}
    </div>
  );
}

