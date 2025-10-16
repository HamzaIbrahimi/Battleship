import container from '../Containers.js';
import DOMhelper from './DOMhelpers.js';
import Player from './Player.js';
import Ship from './Ship.js';
import { availableLocations, removeFromAvailableBoards, chooseRandomCell } from '../utils.js';

export default class Game {
    constructor(player) {
        this.player = player;
        this.computer = new Player('Computer');
        this.#events();
        this.availableMoves = availableLocations();
    }

    #events() {
        container.formArea.addEventListener('click', (e) => {
            this.#start(e);
        });
        container.computerGrid.addEventListener('click', (e) => {
            this.#turnPlayer(e);
        });
    }

    #start(e) {
        if (this.player.shipsArray.length === 0 && e.target.matches('#start')) {
            container.instruction.textContent = 'Game has started!';
            document.querySelector('.positioning').remove();
            DOMhelper.displayGrids(container.computerGrid);
            while (this.computer.shipsArray.length !== 0) {
                const currShip = this.computer.shipsArray.shift();
                DOMhelper.createShip(
                    container.computerShipArea,
                    currShip.type(),
                    currShip.length(),
                );
                this.computer.gameBoard.placeShipRandomly(currShip);
            }
            container.instruction.textContent = `Its your turn ${this.player.getName()}, click on the opposite grid to attack their ship!`;
            DOMhelper.resetPointerEvents(container.playerGrid.children);
            DOMhelper.controlPointerEvents(container.playerGrid, 'none', 0.5);
        }
    }

    #turnPlayer(e) {
        if (this.player.shipsArray.length === 0 && e.target.matches('.cell')) {
            const gridLocation = DOMhelper.findGridCellInClassName(e.target.className);
            const elem = this.computer.gameBoard.getElementInLocation(gridLocation);

            if (elem instanceof Ship) {
                const hit = elem.hits;
                DOMhelper.cellContainsShip(
                    e.target,
                    'player_two_ship_area',
                    container.instruction,
                    elem,
                    hit,
                    this.computer,
                );
                this.computer.gameBoard.receiveAttack(gridLocation);
            } else if (elem === 0) {
                DOMhelper.cellIsEmpty(e.target, container.instruction);
                DOMhelper.controlPointerEvents(container.computerGrid, 'none', 0.5);
                DOMhelper.controlPointerEvents(container.playerGrid, 'auto', 1);
                this.computer.gameBoard.receiveAttack(gridLocation);
            }
            if (elem === 0) {
                setTimeout(() => this.#computerTurn(), 1000);
            }
        }
    }

    #computerTurn() {
        const randomLocation = chooseRandomCell(this.availableMoves);
        removeFromAvailableBoards(randomLocation, this.availableMoves);
        const htmlElement = DOMhelper.findElemFromLocation(randomLocation, 'player1');
        const elem = this.player.gameBoard.getElementInLocation(randomLocation);
        if (elem instanceof Ship) {
            const hit = elem.hits;
            DOMhelper.cellContainsShip(
                htmlElement,
                'player_one_ship_area',
                container.instruction,
                elem,
                hit,
                this.player,
            );
            this.player.gameBoard.receiveAttack(randomLocation);
            setTimeout(() => this.#computerTurn(), 1000);
        } else if (elem === 0) {
            DOMhelper.cellIsEmpty(htmlElement, container.instruction);
            DOMhelper.controlPointerEvents(container.playerGrid, 'none', 0.5);
            DOMhelper.controlPointerEvents(container.computerGrid, 'auto', 1);
            this.player.gameBoard.receiveAttack(randomLocation);
        }
    }
}
