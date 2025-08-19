export default class Ship {
    #type;

    #hit;

    #length;

    constructor(type, length) {
        this.#type = type;
        this.#length = length;
        this.#hit = 0;
    }

    type() {
        return this.#type;
    }

    length() {
        return this.#length;
    }

    hit() {
        if (this.isSunk()) {
            throw new Error(`Ship is sunk: has been hit ${this.#hit} times`);
        }
        this.#hit += 1;
        return this.#hit;
    }

    isSunk() {
        return this.#hit === this.#length;
    }
}
