// const GRID_SIZE = 4;
const CELL_SIZE = 10;
const CELL_GAP = 1;

class Grid {
    constructor(gridEl) {
        gridEl.style.setProperty("--grid-size", GRID_SIZE)
        gridEl.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
        gridEl.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)

        this.cells = createCellEls(gridEl).map((el, index )=> {
            return new Cell(el, index % GRID_SIZE, Math.floor(index / GRID_SIZE))
        })
    }

    get #emptyCells() {
        return this.cells.filter(cell => cell.tile == null)
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
        return this.#emptyCells[randomIndex]
    }
}

class Cell {
    #x
    #y
    #tile
    constructor(cellEl, x, y) {
        cellEl.style.background = '#AAA'
        cellEl.style.borderRadius = '0.5vmin'

        this.cellEl = cellEl;
        this.#x = x;
        this.#y = y;
    }

    get tile() {
        return this.#tile
    }

    set tile(value) {
        this.#tile = value
        if(value == null) return
        this.#tile.x = this.#x
        this.#tile.y = this.#y
    }
}

function createCellEls(gridEl) {
    const cells = [];
    for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div")
        cell.classList.add('cell')
        cells.push(cell)
        gridEl.append(cell)
    }
    return cells
}

export default Grid;