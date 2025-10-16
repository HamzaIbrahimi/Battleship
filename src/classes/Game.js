import container from '../Containers.js';
import DOMhelper from './DOMhelpers.js';
import Player from './Player.js';
import Ship from './Ship.js';

export default class Game {
    constructor() {
        this.player = new Player('player');
        this.computer = new Player('computer');
    }

    #start(e) {
        if (this.player.shipsArray.length === 0 && e.target.matches('#start')) {
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
                e.target.style.pointerEvents = 'none';
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
