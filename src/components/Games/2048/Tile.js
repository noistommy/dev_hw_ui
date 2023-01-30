class Tile {
    #x
    #y
    #value

    constructor(value = Math.random() > .5 ? 2 : 4) {
        this.value = value
    }

    set x(value) {
        this.#x = value
    }

    set y(value) {
        this.#y = value
    }
}

export default Tile;