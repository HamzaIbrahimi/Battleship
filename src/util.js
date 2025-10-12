export function displayGrids(container) {
    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
            const div = document.createElement('div');
            div.classList.add(`${i},${j}`);
            container.appendChild(div);
        }
    }
}

export function createShip(container, shipName, length) {
    const ship = document.createElement('div');
    ship.className = shipName;
    container.append(ship);
    for (let i = 0; i < length; i += 1) {
        ship.insertAdjacentHTML(
            'beforeend',
            `<div class="${shipName + i}"></div>`,
        );
    }
}
