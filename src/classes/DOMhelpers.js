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
            ship.insertAdjacentHTML(
                'beforeend',
                `<div class="${shipName + i}"></div>`,
            );
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

    static colorCells(color, children, arr, opacity) {
        for (let i = 0; i < children.length; i += 1) {
            if (arr.includes(children[i].className.substring(6))) {
                children[i].style.opacity = opacity;
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
}
