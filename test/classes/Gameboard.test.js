import Gameboard from '../../src/classes/Gameboard';
import Ship from '../../src/classes/Ship';

let gameBoard;
let a;

beforeEach(() => {
    gameBoard = new Gameboard();
    a = [];
    for (let i = 0; i < 10; i += 1) {
        a.push([]);
        for (let j = 0; j < 10; j += 1) {
            a[i].push(0);
        }
    }
});

test('Should have a 10 x 10 grid', () => {
    expect(gameBoard.grid()).toEqual(a);
});

test('Should be able to place a ship in the gameboard grid', () => {
    const carrier = new Ship('Carrier', 5, 'vertical');
    gameBoard.placeShip([3, 2], carrier, 'vertical');
    expect(gameBoard.grid()[3][2]).toEqual(carrier);
});

test('Should throw an error if a ship is placed in an occupied coordinate', () => {
    const carrier = new Ship('Carrier', 5, 'vertical');
    gameBoard.placeShip([3, 2], carrier, 'vertical');
    expect(() => gameBoard.placeShip([3, 2], carrier, 'vertical')).toThrow();
});

test('Should be able to place the ship vertically with respect to its length', () => {
    const subMarine = new Ship('Submarine', 3, 'vertical');
    gameBoard.placeShip([5, 5], subMarine, 'vertical');
    a[5][5] = subMarine;
    a[6][5] = subMarine;
    a[7][5] = subMarine;
    expect(gameBoard.grid()).toEqual(a);
});

test('If the ship length + the coordinate (vertical) is out of bounds go to opposite direction', () => {
    const subMarine = new Ship('Submarine', 3, 'vertical');
    gameBoard.placeShip([9, 5], subMarine, 'vertical');
    a[9][5] = subMarine;
    a[8][5] = subMarine;
    a[7][5] = subMarine;
    expect(gameBoard.grid()).toEqual(a);
});

test('Should be able to place the ship horizontally with respect to its length', () => {
    const subMarine = new Ship('Carrier', 3, 'vertical');
    gameBoard.placeShip([5, 5], subMarine, 'horizontal');
    a[5][5] = subMarine;
    a[5][6] = subMarine;
    a[5][7] = subMarine;
    expect(gameBoard.grid()).toEqual(a);
});

test('If the ship length + the coordinate (horizontal) is out of bounds go to opposite direction', () => {
    const carrier = new Ship('Carrier', 5, 'vertical');
    gameBoard.placeShip([5, 5], carrier, 'horizontal');
    a[5][5] = carrier;
    a[5][4] = carrier;
    a[5][3] = carrier;
    a[5][2] = carrier;
    a[5][1] = carrier;
    expect(gameBoard.grid()).toEqual(a);
});
