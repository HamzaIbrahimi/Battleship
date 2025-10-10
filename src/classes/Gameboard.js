import Ship from './Ship.js';

export default class Gameboard {
    #array;

    constructor() {
        this.#array = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }

    grid() {
        return this.#array;
    }

    placeShip(coordinate, ship, direction) {
        if (this.#emptyPlace(coordinate) && direction === 'vertical') {
            this.#placeVertically(coordinate, ship);
        } else if (this.#emptyPlace(coordinate) && direction === 'horizontal') {
            this.#placeHorizontally(coordinate, ship);
        } else {
            throw new Error('Not a valid coordinate');
        }
    }

    receiveAttack(coordinate) {
        const [x, y] = [coordinate[0], coordinate[1]];
        if (this.#emptyPlace(coordinate)) {
            this.#array[x][y] = 1;
        } else {
            const ship = this.#array[x][y];
            ship.hit();
        }
    }

    areAllSunk() {
        return this.#array.every((array) =>
            array
                .filter((x) => x instanceof Ship)
                .every((ship) => ship.isSunk()),
        );
    }

    #emptyPlace(coordinate) {
        const [x, y] = [coordinate[0], coordinate[1]];
        if (this.#array[x][y] === 0) {
            return true;
        }
        return false;
    }

    #placeVertically(coordinate, ship) {
        const [x, y] = [coordinate[0], coordinate[1]];
        if (x + ship.length() > 9) {
            for (let i = 0; i < ship.length(); i += 1) {
                if (this.#emptyPlace([x - i, y])) {
                    this.#array[x - i][y] = ship;
                } else {
                    throw new Error('Another ship is already located here!');
                }
            }
        } else {
            for (let i = 0; i < ship.length(); i += 1) {
                if (this.#emptyPlace([x + i, y])) {
                    this.#array[x + i][y] = ship;
                } else {
                    throw new Error('Another ship is already located here!');
                }
            }
        }
    }

    #placeHorizontally(coordinate, ship) {
        const [x, y] = [coordinate[0], coordinate[1]];
        if (y + ship.length() > 9) {
            for (let i = 0; i < ship.length(); i += 1) {
                if (this.#emptyPlace([x, y - i])) {
                    this.#array[x][y - i] = ship;
                } else {
                    throw new Error('Another ship is already located here!');
                }
            }
        } else {
            for (let i = 0; i < ship.length(); i += 1) {
                if (this.#emptyPlace([x, y + i])) {
                    this.#array[x][y + i] = ship;
                } else {
                    throw new Error('Another ship is already located here!');
                }
            }
        }
    }

    findShip(ship) {
        const res = [];
        for (let i = 0; i < this.#array.length; i += 1) {
            for (let j = 0; j < this.#array.length; j += 1) {
                if (this.#array[i][j] === ship) {
                    res.push([i, j]);
                }
            }
        }
        return res;
    }
}
