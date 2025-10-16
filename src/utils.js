export function availableBoards() {
    const arr = [];
    for (let i = 0; i < 10; i += 1) {
        for (let j = 0; j < 10; j += 1) {
            arr.push([i, j]);
        }
    }
    return arr;
}

export function removeFromAvailableBoards(location, array) {
    const [x, y] = location;
    const findIndex = array.findIndex(([m, n]) => m === x && n === y);
    array.splice(findIndex, 1);
}

export function chooseRandomCell(array) {
    return array[Math.floor(Math.random() * array.length)];
}
