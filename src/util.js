export function displayGrids(container) {
    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.classList.add(`_${i}-${j}`);
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

export function positionShipForm(container) {
    container.insertAdjacentHTML(
        'afterend',
        `<div class="positioning">
             <div>
                 <input type="radio" name="positioning" id="vertical" checked>
                 <label for="vertical">vertical</label>
             </div>
             <div>
                 <input type="radio" name="positioning" id="horizontal">
                 <label for="horizontal">horizontal</label>
             </div>
             <button id="start">start</button>
             <button id="reset">reset</button>
        </div>`,
    );
}
