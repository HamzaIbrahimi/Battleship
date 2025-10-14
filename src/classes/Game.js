import container from './Containers.js';
import DOMhelper from './DOMhelpers.js';
import Player from './Player.js';
import Ship from './Ship.js';

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
            this.#viewShips(e),
        );
        container.playerGrid.addEventListener('mouseout', (e) =>
            this.#removeShips(e),
        );
        container.playerGrid.addEventListener('click', (e) =>
            this.#placeShips(e),
        );
        // container.playerGrid.addEventListener('click', (e) =>

        // );
        container.computerGrid.addEventListener('click', (e) =>
            this.#turnPlayer(e),
        );
        container.formArea.addEventListener('click', (e) => this.#reset(e));
        container.formArea.addEventListener('click', (e) => this.#start(e));
    }

    #placeShips(e) {
        if (this.player.shipsArray.length !== 0 && e.target.matches('.cell')) {
            const currShip = this.player.shipsArray[0];
            this.player.gameBoard.removeShip(currShip);

            const gridLocation = DOMhelper.findGridCellInClassName(
                e.target.className,
            );

            const position = document.querySelector(
                'input[type="radio"]:checked',
            ).id;
            try {
                this.player.gameBoard.placeShip(
                    gridLocation,
                    currShip,
                    position,
                );
                this.player.shipsArray.shift();
                if (this.player.shipsArray.length === 0) {
                    container.instruction.textContent =
                        'Your ships are ready, press start to play!';
                }
                const findLocations = this.player.gameBoard.findShip(currShip);

                DOMhelper.colorCells(
                    'red',
                    container.playerGrid.children,
                    findLocations,
                    0.5,
                );
                DOMhelper.createShip(
                    container.playerOneShipArea,
                    currShip.type(),
                    currShip.length(),
                );
                DOMhelper.disablePointerEvents(
                    container.playerGrid.children,
                    findLocations,
                );
            } catch (exc) {
                container.instruction.textContent = `Can't place ${currShip.type()} here!`;
            }
        }
    }

    #viewShips(e) {
        if (e.target.matches('.cell') && this.player.shipsArray.length !== 0) {
            container.instruction.textContent = `Place the ${this.player.shipsArray[0].type()}`;
            const gridLocation = DOMhelper.findGridCellInClassName(
                e.target.className,
            );
            const currShip = this.player.shipsArray[0];
            const position = document.querySelector(
                'input[type="radio"]:checked',
            ).id;
            try {
                this.player.gameBoard.placeShip(
                    gridLocation,
                    currShip,
                    position,
                );
                const findLocations = this.player.gameBoard.findShip(currShip);
                DOMhelper.colorCells(
                    'red',
                    container.playerGrid.children,
                    findLocations,
                    0.5,
                );
            } catch (exc) {
                container.instruction.textContent = `Can't place ${currShip.type()} here!`;
            }
        }
    }

    #removeShips(e) {
        if (e.target.matches('.cell') && this.player.shipsArray.length !== 0) {
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

    #reset(e) {
        if (e.target.matches('#reset')) {
            container.instruction.textContent =
                'Hover over grid to place ship, click when ready to place';
            DOMhelper.resetFunction(container.playerGrid.children);
            this.player = new Player('player');
            container.playerOneShipArea.innerHTML = '';
        }
    }

    #start(e) {
        if (this.player.shipsArray.length === 0 && e.target.matches('#start')) {
            console.log(this.computer.gameBoard.grid());
            container.instruction.textContent = 'Game has started!';
            const form = document.querySelector('.positioning');
            form.remove();
            DOMhelper.displayGrids(container.computerGrid);
            while (this.computer.shipsArray.length !== 0) {
                const currShip = this.computer.shipsArray.shift();
                DOMhelper.createShip(
                    container.computerShipArea,
                    currShip.type(),
                    currShip.length(),
                );
                DOMhelper.placeShipsRandomly(currShip, this.computer.gameBoard);
                DOMhelper.controlPointerEvents(
                    container.playerGrid.children,
                    'none',
                );
                container.playerGrid.style.opacity = 0.5;
                setTimeout(() => {
                    container.instruction.textContent = `Its your turn ${this.player.getName()}, click on the opposite grid to attack their ship!`;
                }, 1500);
            }
        }
    }

    #turnPlayer(e) {
        if (this.player.shipsArray.length === 0 && e.target.matches('.cell')) {
            const gridLocation = DOMhelper.findGridCellInClassName(
                e.target.className,
            );
            const elem =
                this.computer.gameBoard.getElementInLocation(gridLocation);
            if (elem instanceof Ship) {
                e.target.textContent = 'X';
                e.target.style.backgroundColor = 'red';
                container.instruction.textContent = `You attacked the opponent's ${elem.type()}!`;
                const hit = elem.hits;
                const shipArea = document.querySelector(
                    `.player_two_ship_area .${elem.type()} .${elem.type() + hit}`,
                );
                shipArea.style.backgroundColor = 'red';
                this.computer.gameBoard.receiveAttack(gridLocation);
                e.target.style.pointerEvents = 'none';
            } else if (elem === 0) {
                e.target.style.backgroundColor = 'grey';
                e.target.style.opacity = 0.5;
                container.instruction.textContent = 'Blank shot!';
                this.computer.gameBoard.receiveAttack(gridLocation);
                DOMhelper.controlPointerEvents(
                    container.computerGrid.children,
                    'none',
                );
                container.computerGrid.style.opacity = 0.5;
                DOMhelper.controlPointerEvents(
                    container.playerGrid.children,
                    'auto',
                );
                container.playerGrid.style.opacity = 1;
            }
        }
    }
}
