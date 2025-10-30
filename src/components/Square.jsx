import React, { Component } from 'react';
import { GRID } from '../utils/constants.js';
class Square extends Component {
  render() {
    const { x, y, isExitCell } = this.props;
    
    const style = {
      top: y,
      left: x,
      width: GRID - 2,        
      height: GRID - 2,
      background: '#DDDDDD',
      borderWidth: 1,
      borderColor: '#666666',
      borderStyle: 'solid',
      position: 'absolute',
      borderRight: isExitCell ? 'none' : 'solid',
      borderBottom: 'solid', 
      borderTop: 'solid',
      borderLeft: 'solid',
    };
    return <div style={style} />;
  }
}
export default Square;
