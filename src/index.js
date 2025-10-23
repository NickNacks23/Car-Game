import React from 'react';
import { createRoot } from 'react-dom/client';
import Game from './containers/Game';

const container = document.getElementById('root');
// creates the root and renders into ti
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
