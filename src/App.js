import React, { Component } from 'react';
import BoardView from './components/BoardView.jsx';

class App extends Component {
  render() {
    
    return <BoardView cars={this.props.cars} />;
  }
}

export default App;
