import './css/normalize.css';
import './css/style.css';
import Game from './classes/Game.js';
import ShipPlacement from './classes/ShipPlacement.js';
import Player from './classes/Player.js';

const player = new Player('Player');
const shipPlacer = new ShipPlacement(player);

// on touch start start new game
const game = new Game(player);
