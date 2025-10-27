# Car Puzzle Game (React)
This is a 7x7 grid puzzle game built using React, which allows players to slide cars around the grid with the goal being to free the red car through the wall gap. This project demonstrates logical thinking, state management, and a front-end design all merged into a visual experience filled with different ways to interact.

# Overview
The main goal of the game is to essentially move the red goal car horizontally until it is free of cars in its path and is able to exit through the right side of the grid (wall gap). As you progress through different levels, you will see new layouts and levels of challenging puzzles with a max amount of moves given in order to solve the puzzle.
In its current stage, the 'Undo' feature is still in development, luckily the button is present in the UI but still has a small error in which I am in the process of fixing. Fortunately the rest of the gameplay is functioning smoothly.

# Languages & Tools
- React (JavaScript)
- HTML5/CSS3
- React Hooks for the state management

# Features
- 7x7 game grid the represents the blocked traffic
- the (red) car mechanic which is to free the red car by clearing a direct free path
- A move counter which tracks a user's total amount of moves made
- There is a reset button which restarts the puzzle right away
- You are given a chance to progress through multiple levels with increasing difficulty
- There is an undo button which is in progress and still being debugged
- There are clean and modular React components

# How to Run Locally
1. Download or clone the repository such as:
   bash
   git clone https://github.com/NicholasGarcia/car-puzzle-game.git
   cd car-puzzle-game
2. Install the dependencies: 'npm install'
3. Start the app: 'npm start'
4. Finally open in your browser such as: http://localhost:3000/

# Preview:
<img width="1492" height="582" alt="Screenshot 2025-10-27 at 1 36 32 AM" src="https://github.com/user-attachments/assets/a4186c89-94f8-4d8a-9150-e0df0e09b59c" />

Watch a video demo here: https://youtu.be/hMaYBx4jspA
