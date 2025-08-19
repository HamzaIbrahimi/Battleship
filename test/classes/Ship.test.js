import Ship from '../../src/classes/Ship';

let ship;
beforeEach(() => {
    ship = new Ship('Carrier', 5);
});

test('Should have a type', () => {
    expect(ship.type()).toBe('Carrier');
});

test('Should have a length', () => {
    expect(ship.length()).toBe(5);
});

test('Should have a hit method that increases the damage to the ship', () => {
    expect(ship.hit()).toBe(1);
});

test('Should be able to be hit multiple times', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hit()).toBe(4);
});

test('Should be able to be hit but only as much as its length', () => {
    for (let i = 0; i < 5; i += 1) {
        ship.hit();
    }
    expect(() => ship.hit()).toThrow();
});

test('Should return false if the ship has not been hit', () => {
    expect(ship.isSunk()).toBeFalsy();
});

test('Should return false if the ship has not been hit more than its length', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
});

test('Should return true if the ship has been hit as much as its length', () => {
    for (let i = 0; i < 5; i += 1) {
        console.log(ship.hit());
    }
    expect(ship.isSunk()).toBeTruthy();
});

test('Should return a string representation of the object', () => {
    expect(ship.toString()).toBe('Carrier of length 5');
});
