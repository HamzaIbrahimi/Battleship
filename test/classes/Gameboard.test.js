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

test('Should be able to place multiple ships in the gameboard', () => {
    const ship = new Ship('ship', 2);
    const ship2 = new Ship('ship2', 2);
    const ship3 = new Ship('ship3', 2);
    gameBoard.placeShip([0, 0], ship, 'horizontal');
    gameBoard.placeShip([4, 2], ship2, 'vertical');
    gameBoard.placeShip([0, 9], ship3, 'horizontal');
    a[0][0] = ship;
    a[0][1] = ship;
    a[4][2] = ship2;
    a[5][2] = ship2;
    a[0][9] = ship;
    a[0][8] = ship;
    expect(gameBoard.grid()).toEqual(a);
});

test('If a an empty coordinate is hit then change the grid coordinate to 1', () => {
    gameBoard.receiveAttack([3, 3]);
    a[3][3] = 1;
    expect(gameBoard.grid()).toEqual(a);
});

test('If a ship receives an attack in the grid ensure that the ship itself is hit', () => {
    const carrier = new Ship('Carrier', 5, 'vertical');
    gameBoard.placeShip([5, 5], carrier, 'vertical');
    gameBoard.receiveAttack([5, 5]);
    expect(carrier.hit()).toBe(2);
});

test('If a ship is hit as many times as its length the ship to be sunk in the gameboard', () => {
    const carrier = new Ship('Carrier', 5, 'vertical');
    gameBoard.placeShip([5, 5], carrier, 'vertical');
    gameBoard.receiveAttack([5, 5]);
    gameBoard.receiveAttack([4, 5]);
    gameBoard.receiveAttack([3, 5]);
    gameBoard.receiveAttack([2, 5]);
    gameBoard.receiveAttack([1, 5]);
    expect(carrier.isSunk()).toBeTruthy();
});

test('Should to return true if all ships in the gameBoard have been sunk', () => {
    const ship = new Ship('ship', 2);
    const ship2 = new Ship('ship2', 2);
    const ship3 = new Ship('ship3', 2);
    gameBoard.placeShip([0, 0], ship, 'horizontal');
    gameBoard.placeShip([3, 3], ship2, 'vertical');
    gameBoard.placeShip([6, 7], ship3, 'vertical');
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([0, 1]);
    gameBoard.receiveAttack([3, 3]);
    gameBoard.receiveAttack([4, 3]);
    gameBoard.receiveAttack([6, 7]);
    gameBoard.receiveAttack([7, 7]);
    expect(gameBoard.areAllSunk()).toBeTruthy();
});

test('Should return false if ships are not sunk', () => {
    const ship = new Ship('ship', 2);
    const ship2 = new Ship('ship2', 2);
    gameBoard.placeShip([0, 0], ship, 'horizontal');
    gameBoard.placeShip([3, 3], ship2, 'vertical');
    gameBoard.receiveAttack([0, 0]);
    gameBoard.receiveAttack([3, 3]);
    expect(gameBoard.areAllSunk()).toBeFalsy();
});
