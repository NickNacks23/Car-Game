import { WID, HGT } from './constants.js';


const PUZZLES = [
  // Puzzle 1
  [
    { id: 0, x: 1, y: 2, ncols: 2, nrows: 1, color: 'red' },
    { id: 1, x: 3, y: 1, ncols: 1, nrows: 3, color: 'yellow' },
    { id: 2, x: 5, y: 0, ncols: 1, nrows: 4, color: 'limegreen' },
    { id: 3, x: 5, y: 2, ncols: 2, nrows: 1, color: 'magenta' },
    { id: 4, x: 5, y: 3, ncols: 2, nrows: 1, color: 'blue' }
  ],
  
  // Puzzle 2
  [
    { id: 0, x: 0, y: 2, ncols: 2, nrows: 1, color: 'red' },
    { id: 1, x: 2, y: 0, ncols: 1, nrows: 3, color: 'yellow' },
    { id: 2, x: 3, y: 3, ncols: 1, nrows: 3, color: 'green' },
    { id: 3, x: 5, y: 1, ncols: 2, nrows: 1, color: 'magenta' },
    { id: 4, x: 2, y: 4, ncols: 2, nrows: 1, color: 'blue' }
  ],

  // Puzzle 3 
  [
    { id: 0, x: 0, y: 2, ncols: 2, nrows: 1, color: 'red' },  
    { id: 1, x: 1, y: 0, ncols: 1, nrows: 2, color: 'yellow' },
    { id: 2, x: 3, y: 0, ncols: 1, nrows: 3, color: 'green' },
    { id: 3, x: 5, y: 2, ncols: 1, nrows: 2, color: 'magenta' },
    { id: 4, x: 1, y: 4, ncols: 3, nrows: 1, color: 'blue' },
    { id: 5, x: 2, y: 5, ncols: 2, nrows: 1, color: 'purple' },
    { id: 6, x: 4, y: 1, ncols: 2, nrows: 1, color: 'cyan' },
    { id: 7, x: 6, y: 2, ncols: 1, nrows: 3, color: 'orange' }
  ]
];


const BEST = [
  20,  
  25,  
  40   
 ];
 
 
 export default class carsGame {
  constructor() {
    this.puzzleNumber = 0;
    this._callback = null;
    this.moves = 0;
    this.won = false;
 
 
    this._initCars = JSON.parse(JSON.stringify(PUZZLES[this.puzzleNumber]));
    this.cars = JSON.parse(JSON.stringify(this._initCars));
 
 
    this._ensureNoOverlap();
  }
 
 
  _ensureNoOverlap() {
    let overlapFound = false;
    do {
      overlapFound = false;
      for (let i = 0; i < this.cars.length; i++) {
        for (let j = i + 1; j < this.cars.length; j++) {
          if (this._overlaps(this.cars[i], this.cars[j])) {
            overlapFound = true;
            this._repositionCar(this.cars[j]);
          }
        }
      }
    } while (overlapFound);
  }
 
 
  _repositionCar(car) {
    const randomX = Math.floor(Math.random() * (WID - car.ncols));
    const randomY = Math.floor(Math.random() * (HGT - car.nrows));
    car.x = randomX;
    car.y = randomY;
  }
 
 
  setRedrawCallback(cb) {
    this._callback = cb;
  }
 
 
  hasWon() {
    return this.won;
  }
 
 
  getPuzzleNumber() {
    return this.puzzleNumber;
  }
 
 
  getNumCars() {
    return this.cars.length;
  }
 
 
  getNumMoves() {
    return this.moves;
  }
 
 
  getBestNumMoves() {
    return BEST[this.puzzleNumber] || 0;
  }
 
 
  getCar(idx) {
    return this.cars[idx];
  }
 
 
  loadPuzzle(num) {
    if (num < 0 || num >= PUZZLES.length) return;
    this.puzzleNumber = num;
    this._initCars = JSON.parse(JSON.stringify(PUZZLES[num]));
    this.cars = JSON.parse(JSON.stringify(this._initCars));
    this.moves = 0;
    this.won = false;
 
 
    this._ensureNoOverlap();
 
 
    if (this._callback) this._callback();
  }
 
 
  resetPuzzle() {
    this.loadPuzzle(this.puzzleNumber);
  }
 
 
  nextPuzzle() {
    const next = (this.puzzleNumber + 1) % PUZZLES.length;
    this.loadPuzzle(next);
  }
 
 
  _overlaps(A, B) {
    return !(
      A.x + A.ncols <= B.x ||
      B.x + B.ncols <= A.x ||
      A.y + A.nrows <= B.y ||
      B.y + B.nrows <= A.y
    );
  }
 
 
  moveCar(id, dir) {
    const car = this.cars.find(c => c.id === id);
    if (!car || this.won) return;
 
 
    const next = { ...car };
    switch (dir) {
      case 0: next.y -= 1; break; 
      case 1: next.y += 1; break; 
      case 2: next.x += 1; break; 
      case 3: next.x -= 1; break; 
      default: return;
    }
 
 
    if (next.x < 0 || next.y < 0 ||
        next.y + next.nrows > HGT ||
        (next.x + next.ncols > WID && id !== 0) ||
        next.x + next.ncols < 0
    ) return;
 
 
    for (const other of this.cars) {
      if (other.id === id) continue;
      if (this._overlaps(next, other)) return;
    }
 
 
    car.x = next.x;
    car.y = next.y;
    this.moves += 1;
 
 
    if (id === 0 && car.x + car.ncols > 6 && car.y === 2) {
      this.won = true;
    }
 
 
    if (this._callback) this._callback();
  }
 }
 