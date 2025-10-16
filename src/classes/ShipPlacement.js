import container from '../Containers.js';
import DOMhelper from './DOMhelpers.js';
import Player from './Player.js';

export default class ShipPlacement {
    #player;

    constructor(player) {
        this.#player = player;
        DOMhelper.displayGrids(container.playerGrid);
        DOMhelper.positionShipForm(container.computerShipArea);
        this.events();
    }

    events() {
        container.playerGrid.addEventListener('mouseover', (e) =>
            this.#viewShips(e),
        );
        container.playerGrid.addEventListener('mouseout', (e) =>
            this.#removeShips(e),
        );

        container.playerGrid.addEventListener('click', (e) =>
            this.#placeShips(e),
        );
        container.formArea.addEventListener('click', (e) => this.#reset(e));
    }

    #placeShips(e) {
        if (this.#player.shipsArray.length !== 0 && e.target.matches('.cell')) {
            const currShip = this.#player.shipsArray[0];
            this.#player.gameBoard.removeShip(currShip);
            const gridLocation = DOMhelper.findGridCellInClassName(
                e.target.className,
            );

            const position = document.querySelector(
                'input[type="radio"]:checked',
            ).id;

            try {
                this.#player.gameBoard.placeShip(
                    gridLocation,
                    currShip,
                    position,
                );
                this.#player.shipsArray.shift();
                if (this.#player.shipsArray.length === 0) {
                    container.instruction.textContent =
                        'Your ships are ready, press start to play!';
                }
                const locations = this.#player.gameBoard.findShip(currShip);

                DOMhelper.colorCells(
                    'red',
                    container.playerGrid.children,
                    locations,
                );
                DOMhelper.createShip(
                    container.playerOneShipArea,
                    currShip.type(),
                    currShip.length(),
                );
                DOMhelper.disablePointerEvents(
                    container.playerGrid.children,
                    locations,
                );
            } catch (exc) {
                console.log(exc);
                container.instruction.textContent = `Can't place ${currShip.type()} here!`;
            }
        }
    }

    #viewShips(e) {
        if (e.target.matches('.cell') && this.#player.shipsArray.length !== 0) {
            container.instruction.textContent = `Place the ${this.#player.shipsArray[0].type()}`;
            const gridLocation = DOMhelper.findGridCellInClassName(
                e.target.className,
            );
            console.log(this.#player.gameBoard.grid());
            const currShip = this.#player.shipsArray[0];
            const position = document.querySelector(
                'input[type="radio"]:checked',
            ).id;
            try {
                this.#player.gameBoard.placeShip(
                    gridLocation,
                    currShip,
                    position,
                );
                const locations = this.#player.gameBoard.findShip(currShip);
                DOMhelper.colorCells(
                    'red',
                    container.playerGrid.children,
                    locations,
                );
            } catch (exc) {
                container.instruction.textContent = `Can't place ${currShip.type()} here!`;
            }
        }
    }

    #removeShips(e) {
        if (e.target.matches('.cell') && this.#player.shipsArray.length !== 0) {
            const currShip = this.#player.shipsArray[0];
            const locations = this.#player.gameBoard.findShip(currShip);
            this.#player.gameBoard.removeShip(currShip);
            DOMhelper.colorCells(
                'white',
                container.playerGrid.children,
                locations,
            );
        }
    }

    #reset(e) {
        if (e.target.matches('#reset')) {
            container.instruction.textContent =
                'Hover over grid to place ship, click when ready to place';
            DOMhelper.resetFunction(container.playerGrid.children);
            this.#player = new Player('player');
            container.playerOneShipArea.innerHTML = '';
        }
    }
}
