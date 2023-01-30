<template>
  <div class="game-board-body">
    <div id="game-board" :style="cellStyle" tabindex="1" ref="gBoard"
         @click="addTile" @keydown.prevent="controller">
      <div class="cell" v-for="(cell) in cells" :key="`cell_${cell.id}`" :id="[`cell_${cell.id}`]"></div>
      <div class="tile" v-for="(tile) in tiles" :key="`tile_${tile.id}`" :id="[`tile_${tile.id}`]"
           :style="{'--x': tile.x, '--y': tile.y, '--bg-lightness': `${100 - (Math.log2(tile.tile.value) * 20)}%`}">
        {{tile.tile.value}}
      </div>
    </div>
  </div>
</template>

<script>
// import Tile from './Tile'

export default {
  name: 'G2048',
  data() {
    return {
      start: false,
      cells: [],
      tiles :[],
      gridSize: 4,
      cellSize: 10,
    }
  },
  computed: {
    cellGap() {
      return this.cellSize/10
    },
    cellStyle() {
      return {
          '--grid-size': this.gridSize,
          '--cell-size': `${this.cellSize}vmin`,
          '--cell-gap': `${this.cellGap}vmin`,
      }
    },
    emptyCells() {
      return this.cells.filter(item => item.tile == null);
    }
  },
  created() {
    this.cells = this.createCell();
    // console.log(new Tile)
  },
  mounted() {
    this.$refs.gBoard.focus();
  },
  methods: {
    setTileValue() {
      return Math.random() > 0.2 ? 2 : 4;
    },
    createCell() {
      let cellList = new Array(this.gridSize * this.gridSize).fill()
      cellList.forEach((item, index) => {
        const cell = {
          x: index % this.gridSize,
          y: Math.floor(index / this.gridSize),
          id: index,
          tile: null
        }
        cellList[index] = cell
      })
      return cellList
    },
    selectCell(value) {
      console.log(value)
    },
    getRandomCell() {
      const randomIndex = Math.floor(Math.random() * this.emptyCells.length)
      return this.emptyCells[randomIndex]
    },
    addTile() {
      const newTile = this.getRandomCell();
      newTile.tile = {value: this.setTileValue()}
      this.tiles.push(newTile)
      this.cells[newTile.id] = newTile
    },
    changeTile() {

    },
    controller(e) {
      const key = e.key;
      let matrix = [];
      switch (key) {
        case ' ':
          if(this.start) return;
          this.start = true;
          this.addTile()
          this.addTile()
          break;
        case 'Escape':
          this.cells = this.createCell()
          this.tiles = []
          this.start = false
          break;
        case 'ArrowUp':
          matrix = this.cellByColumn()
          this.slideTile(matrix)
          break;
        case 'ArrowLeft':
          matrix = this.cellByRow()

          this.slideTile(matrix)
          break;
        case 'ArrowRight':
          matrix = this.cellByRow().map(row => [...row].reverse())
          this.slideTile(matrix)
          break;
        case 'ArrowDown':
          matrix = this.cellByColumn().map(column => [...column].reverse())
          this.slideTile(matrix)
          break;
      }
    },
    cellByColumn() {
      return this.cells.reduce((cellGrid, cell) => {
        cellGrid[cell.x] = cellGrid[cell.x] || []
        cellGrid[cell.x][cell.y] = cell
        return cellGrid
      }, [])
    },
    cellByRow() {
      return this.cells.reduce((cellGrid, cell) => {
        cellGrid[cell.y] = cellGrid[cell.y] || []
        cellGrid[cell.y][cell.x] = cell
        return cellGrid
      }, [])
    },
    slideTile(matrix) {
      matrix.forEach(group => {
        for(let i = 1; i < group.length; i++) {
          if(group[i].tile === null) continue;
          let lastCell = null;
          for(let j = i - 1; j >= 0 ;j--) {
            if(!(group[j].tile == null || group[j].tile.value === group[i].tile.value)) break;
            lastCell = j;
            console.log("laseCell", j)
          }
          if(lastCell !== null) {
            const target_i = this.findTileIndex(group[i].id)
            const target_j = this.findTileIndex(group[lastCell].id)
            if(group[lastCell].tile == null) {
              group[lastCell].tile = group[i].tile;
              this.tiles[target_i] = group[lastCell]
              // this.tiles[target_i].id = group[lastCell].id
              // this.tiles[target_i].x = group[lastCell].x
              // this.tiles[target_i].y = group[lastCell].y
            } else {
              group[lastCell].tile.value += group[i].tile.value;
              this.tiles[target_i] = group[lastCell]
              this.tiles.splice(target_j, 1)
            }
            group[i].tile = null
          }
        }
      })
      this.addTile()
    },
    findTileIndex(id) {
      return this.tiles.findIndex(item => item.id === id)
    },
  }
}
</script>

<style lang="scss" scoped>
.game-board-body {
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vmin;
  height: 100%;
}
#game-board {
  outline: none;
  display: grid;
  grid-template-columns: repeat(var(--grid-size), var(--cell-size));
  grid-template-rows: repeat(var(--grid-size), var(--cell-size));
  //background-color: #ccc;
  background-color: transparent;
  gap: var(--cell-gap);
  padding: var(--cell-gap);
  border-radius: .5vmin;
  position: relative;
  .cell {
    background-color: #aaa;
    border-radius: .5vmin;
    color: transparent;
    &:hover {
      color: #333;
    }
  }
  .tile {
    --bg-lightness: 80%;
    --t-lightness: 20%;
    border: 2px solid transparent;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--cell-size);
    height: var(--cell-size);
    border-radius: .5vmin;
    //background-color: #fff;
    top: calc(var(--y) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
    left: calc(var(--x) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
    font-weight: 900;
    //background-color: hsl(200, 50%, var(--bg-lightness));
    background: radial-gradient(circle at center, #fff, hsl(200, 50%, var(--bg-lightness)) 80%);
    box-shadow: 0 0 20px hsl(200, 50%, var(--bg-lightness));
    color: hsl(200, 25%, var(--t-lightness));
    //animation: scale-easeOutElastic 1s ease-in-out;
    animation: show 1000ms ease-in-out;
    transition: 400ms ease-in-out;
  }
}
@keyframes show {
  0% {
    opacity: 0%;
  }
}
@keyframes scale-easeOutElastic {
  0% {
    transform: scale(0);
  }

  16% {
    transform: scale(1.12);
  }

  28% {
    transform: scale(0.83);
  }

  44% {
    transform: scale(1.05);
  }

  59% {
    transform: scale(0.95);
  }

  73% {
    transform: scale(1.01);
  }

  88% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }

}
</style>