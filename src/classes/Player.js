import Gameboard from './Gameboard';

export default class Player {
    #name;

    gameBoard;

    constructor(name) {
        this.#name = name;
        this.gameBoard = new Gameboard();
    }

    getName() {
        return this.#name;
    }
}
