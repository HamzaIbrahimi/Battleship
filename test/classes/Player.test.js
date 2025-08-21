import Player from '../../src/classes/Player';

test('A player should have their own gameboard', () => {
    const player = new Player('Tom');
    expect(player.gameBoard).toBeDefined();
});

test('Should return a player name', () => {
    const player = new Player('Tom');
    expect(player.getName()).toBe('Tom');
});
