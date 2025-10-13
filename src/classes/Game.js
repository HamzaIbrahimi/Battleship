import container from './Containers.js';
import DOMhelper from './DOMhelpers.js';
import Player from './Player.js';

export default class Game {
    constructor() {
        this.player = new Player('player');
        this.computer = new Player('computer');
        DOMhelper.displayGrids(container.playerGrid);
        DOMhelper.positionShipForm(container.computerShipArea);
        this.#events();
    }

    #events() {
        container.playerGrid.addEventListener('mouseover', (e) =>
            this.#placeShips(e),
        );
        container.playerGrid.addEventListener('mouseout', (e) =>
            this.#removeShips(e),
        );
    }

    #placeShips(e) {
        if (e.target.matches('.cell')) {
            const gridLocation = DOMhelper.findGridCellInClassName(
                e.target.className,
            );
            const currShip = this.player.shipsArray[0];
            const position = document.querySelector(
                'input[type="radio"]:checked',
            ).id;

            this.player.gameBoard.placeShip(gridLocation, currShip, position);
            const findLocations = this.player.gameBoard.findShip(currShip);
            DOMhelper.colorCells(
                'red',
                container.playerGrid.children,
                findLocations,
                0.5,
            );
        }
    }

    #removeShips(e) {
        if (e.target.matches('.cell')) {
            const currShip = this.player.shipsArray[0];
            const findLocations = this.player.gameBoard.findShip(currShip);
            this.player.gameBoard.removeShip(currShip);
            DOMhelper.colorCells(
                'white',
                container.playerGrid.children,
                findLocations,
                1,
            );
        }
    }
}
