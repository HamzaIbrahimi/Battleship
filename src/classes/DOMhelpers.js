export default class DOMhelper {
    static displayGrids(container) {
        for (let i = 0; i < 10; i += 1) {
            for (let j = 0; j < 10; j += 1) {
                const div = document.createElement('div');
                div.classList.add('cell');
                div.classList.add(`_${i}-${j}`);
                container.appendChild(div);
            }
        }
    }

    static createShip(container, shipName, length) {
        const ship = document.createElement('div');
        ship.className = shipName;
        container.append(ship);
        for (let i = 0; i < length; i += 1) {
            ship.insertAdjacentHTML('beforeend', `<div class="${shipName + i}"></div>`);
        }
    }

    static positionShipForm(container) {
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

    static colorCells(color, children, arr) {
        for (let i = 0; i < children.length; i += 1) {
            if (arr.includes(children[i].className.substring(6))) {
                children[i].style.backgroundColor = color;
            }
        }
    }

    static findGridCellInClassName(str) {
        return str
            .substring(6)
            .split('-')
            .map((val) => +val);
    }

    static findElemFromLocation(location, container) {
        const [x, y] = location;
        return document.querySelector(`.${container} ._${x}-${y}`);
    }

    static disablePointerEvents(children, arr) {
        for (let i = 0; i < children.length; i += 1) {
            if (arr.includes(children[i].className.substring(6))) {
                children[i].style.pointerEvents = 'none';
            }
        }
    }

    static resetFunction(children) {
        for (let i = 0; i < children.length; i += 1) {
            children[i].style.pointerEvents = 'auto';
            children[i].style.backgroundColor = 'white';
        }
    }

    static controlPointerEvents(container, control, opacity) {
        container.style.pointerEvents = control;
        container.style.opacity = opacity;
    }

    static resetPointerEvents(children) {
        for (let i = 0; i < children.length; i += 1) {
            children[i].style.pointerEvents = 'none';
        }
    }

    static cellContainsShip(target, container, instruction, ship, hits, player) {
        target.textContent = 'X';
        target.style.backgroundColor = 'red';
        target.style.pointerEvents = 'none';
        if (hits + 1 === ship.length()) {
            instruction.textContent = `${player.getName()}'s ${ship.type()} is ${'destroyed'.toUpperCase()}!`;
        } else {
            const who = player.getName() === 'Computer' ? 'You' : 'Computer';
            instruction.textContent = `${who} attacked the ${player.getName()}'s ${ship.type()}!`;
        }
        const shipArea = document.querySelector(
            `.${container} .${ship.type()} .${ship.type() + hits}`,
        );
        shipArea.style.backgroundColor = 'red';
    }

    static cellIsEmpty(target, instruction) {
        target.textContent = '⚫';
        target.style.pointerEvents = 'none';
        target.style.backgroundColor = 'grey';
        instruction.textContent = 'Blank Shot!';
    }
}
