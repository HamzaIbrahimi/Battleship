export default function displayGrids(container) {
    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
            const div = document.createElement('div');
            div.classList.add(`${i},${j}`);
            container.appendChild(div);
        }
    }
}
