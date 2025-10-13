import Gameboard from './Gameboard.js';
import Ship from './Ship.js';

export default class Player {
    #name;

    constructor(name) {
        this.#name = name;
        this.gameBoard = new Gameboard();
        this.shipsArray = [
            new Ship('carrier', 5),
            new Ship('battleship', 4),
            new Ship('destroyer', 3),
            new Ship('submarine', 3),
            new Ship('patrolboat', 2),
        ];
    }

    getName() {
        return this.#name;
    }
}
