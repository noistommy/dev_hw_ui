<template>
  <div class="css-draw">
    <div class="contents-detail-view">
      <div class="contents-section">
        <div class="section-title">Type</div>
        <div class="type-wrapper">
          <div class="type-title">drunken driver</div>
          <div class="taxi-driver" @click="toggleStop">
            <div class="road" :class="{stop:isStop}">
              <div class="stop-sign">STOP</div>
              <div class="taxi">
                <div class="light"></div>
                <span>
                  <b></b>
                  <i></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Lightness Keyboard</div>
          <div class="lightness-keyboard">
            <div class="plate">
              <div class="key-wrapper">
                <span class="key" v-for="key in 36" :key="key" :data-name="key"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Number Puzzle</div>
          <div class="number-puzzle">
            <div class="puzzle" @click="shuffleNumber">
              <div class="cell-wrapper" :style="cellStyle">
                <span class="cell" v-for="(cell, index) in cellList" :key="cell.id"
                      :data-name="cell.id" :style="{'--x': cell.x, '--y': cell.y }" @click.stop="moveCell(index)"></span>
                <span class="reset-btn">R</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CssDrawView',
  data() {
    return {
      isStop: false,
      //puzzle
      numbers: [],
      cellList: [],
      gridSize: 4,
      cellSize: 18,
      cellGap: 2,
      empty: {
        x: 0,
        y: 0,
      }
    }
  },
  computed: {
    cellStyle() {
      return {
        '--grid-size': this.gridSize,
        '--cell-size': `${this.cellSize}px`,
        '--cell-gap': `${this.cellGap}px`,
      }
    },
  },
  mounted() {
    this.numbers = Array.from({length: this.gridSize * this.gridSize - 1}, (_, i) => i + 1)
    this.createCell()
  },
  methods: {
    createCell() {
      this.cellList = []
      this.numbers.forEach((item, index) => {
        const cell = {
          x: index % this.gridSize,
          y: Math.floor(index / this.gridSize),
          id: item,
        }
        this.cellList.push(cell)
        // cellList[index] = cell
      })
      this.empty = {x: this.gridSize - 1, y: this.gridSize - 1}
      // return cellList
    },
    toggleStop() {
      this.isStop = !this.isStop;
    },
    shuffleNumber() {
      this.numbers = this.numbers.sort(() => Math.random() - 0.5)
      this.createCell();
    },
    moveCell(target) {
      console.log(target)
      const moveCell = this.cellList[target]
      const {x, y} = this.empty
      if(Math.abs(moveCell.x - x) > 1 || Math.abs(moveCell.y - y) > 1) return
      this.empty.x = moveCell.x
      this.empty.y = moveCell.y
      // console.log(empty)

      moveCell.x = x
      moveCell.y = y
    },
    // keyControl(e) {
    //   const key = e.key;
    // }
  }
}
</script>

<style lang="scss" scoped>
$issue_red: #D75757;
$issue_orange: #EE9033;
$issue_yellow: #F8B825;
$issue_lightgreen: #B3BC40;
$issue_green: #61A475;
$issue_lightblue: #8CC5CE;
$issue_blue: #70A3CA;
$issue_deepblue: #5178AF;
$issue_deeppurple: #9180B4;
$issue_purple: #AF77C0;
$issue_brown: #A86A82;
$issue_gray: #8B8B8B;
$issue_white: #F2F2F2;


$carColor: $issue_yellow;
$shadowColor: darken($carColor, 10%);

.plate {
  width: 200px;
  height: 95px;
  background-color: #aaa;
  border-radius: 4px;
  position: relative;
  padding: 10px 5px 5px;
  margin: 20px;
  &:before {
    content: '';
    position: absolute;
    background: linear-gradient(0deg, $issue_red,  $issue_yellow);
    width: 2px;
    height: 15px;
    top: 10px;
    right: 2px;
    box-shadow: 0 0 5px linear-gradient(0deg, $issue_red,  $issue_yellow);
  }
  &:after {
    content: '';
    position: absolute;
    background: linear-gradient(0deg, $issue_red,  $issue_yellow);
    width: 2px;
    height: 15px;
    top: 10px;
    left: 2px;
    box-shadow: 0 0 5px linear-gradient(0deg, $issue_red,  $issue_yellow);
  }
  .key-wrapper {
    background-color: #666;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 2px;
    column-gap: 2px;
    padding: 2px
  }
  .key {
    position: relative;
    background-color: #fff;
    min-width: 16.5px;
    height: 16px;
    border-radius: 2px;
    flex-shrink: 0;
    &:nth-child(1) {
      background-color: $issue_green;
    }
    &:nth-child(8), &:nth-child(9), &:nth-child(10) {
      background-color: $issue_gray;
    }
    &:nth-child(29) {
      background-color: $issue_red;
      min-width: 35px;
    }
    &:nth-child(33) {
      background-color: $issue_yellow;
      flex-grow: 1;
      max-width: 72px;
    }
    &:before {
      content: '';
      position: absolute;
      inset: 2px;
      background-color: #fff;
      opacity: 0.3;
    }
    &:after {
      content: attr(data-name);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 900;
      font-size: 0.8em;
      display: none;
    }
    &:hover {
      //background-color: $issue_blue;
      box-shadow: 0 0 5px $issue_blue;
      &:after {
        //display: block;
      }
    }
  }
}
.puzzle {
  background-color: #aaa;
  border-radius: 4px;
  padding: 10px 5px 5px;
  margin: 20px;
  width: 92px;
  height: 97px;
  .cell-wrapper {
    position: relative;
    background-color: #666;
    width: 100%;
    height: 100%;
    .reset-btn {
      position: absolute;
      top: 0;
      left: calc(100% + 5px);
      background: linear-gradient(135deg, lighten($issue_red, 10), darken($issue_red, 30));
      padding: var(--cell-gap);
      border-bottom-right-radius: 2px;
      border-top-right-radius: 2px;
      color: #fff;
      font-weight: 900;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8em;
    }
    .cell {
      background-color: #fff;
      border-radius: 2px;
      position: absolute;
      width: var(--cell-size);
      height: var(--cell-size);
      top: calc(var(--y) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
      left: calc(var(--x) * (var(--cell-size) + var(--cell-gap)) + var(--cell-gap));
      transition: 250ms linear;
      &:before {
        content: '';
        position: absolute;
        inset: 2px;
        background-color: #fff;
        opacity: 0.3;
      }
      &:after {
        content: attr(data-name);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: 900;
        font-size: 0.8em;
      }
    }
  }

}

.taxi-driver {
  margin: 30px 0;
  .road {
    position: relative;
    width: 700px;
    height: 150px;
    background-color: #333333;
    border-radius: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    perspective: 500px;
    overflow: hidden;
    &:hover {
      .taxi {
        animation: animate-taxi 1s linear infinite;
      }
    }
    &.stop {
      &:before {
        animation: none;
      }
      .stop-sign {
        transform: translate(60px, -50%);
      }
      .taxi {
        left: 450px;
        animation: none;
      }
      .light {
        opacity: 0;
      }
    }
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 6px;
      background: linear-gradient(90deg, #fff, #fff 50%, transparent 50%);
      background-size: 100px;
      animation: animate-road 0.125s linear infinite;

    }
    .stop-sign {
      position: absolute;
      color: #fff;
      font-weight: 900;
      letter-spacing: 0.3em;
      font-size: 55px;
      top: 50%;
      left: 0;
      padding: 20px;
      transform: translate(-100%, -50%);
      transition: transform 1s ease-out;
      background-color: #333;
    }
    .taxi {
      position: absolute;
      left: 100px;
      width: 200px;
      height: 80px;
      background-color: $shadowColor;
      border-radius: 10px;
      box-shadow: -10px 10px rgba(0, 0, 0, 0.25);
      transform-style: preserve-3d;
      perspective: 800px;
      transition: all 1000ms ease-out;
      &:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 2px;
        width: 5px;
        height: 15px;
        border-radius: 2px;
        background-color: #fc3c25;
        box-shadow: 0 55px #fc3c25;
      }
      &:after {
        content: '';
        position: absolute;
        top: 8px;
        right: 2px;
        width: 6px;
        height: 16px;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 45px #fff;
      }
      span {
        position: absolute;
        inset: 5px 10px;
        background-color: $carColor;
        border-radius: 10px;
        &:before {
          content: '';
          position: absolute;
          top: -15px;
          left: 60%;
          width: 8px;
          height: 15px;
          border-radius: 2px;
          background-color: $carColor;
        }
        &:after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 60%;
          width: 8px;
          height: 15px;
          border-radius: 2px;
          background-color: $carColor;
        }
        b {
          position: absolute;
          inset: 0 60px 0 20px;
          background-color: #111;
          &:before {
            content: '';
            position: absolute;
            inset: 8px 35px 8px 15px;
            background-color: $carColor;
            //border-radius: 5px;
          }
          &:after {
            content: '';
            position: absolute;
            inset: 0 48px;
            background-color: $carColor;
            //border-radius: 5px;
          }
        }
        i {
          position: absolute;
          inset: 0;
          &:before {
            content: '';
            position: absolute;
            top: 10px;
            left: 17px;
            width: 40px;
            height: 5px;
            background-color: $carColor;
            transform: rotate(15deg);
            transform-origin: right;
            box-shadow: 76px 38px $carColor;
          }
          &:after {
            content: '';
            position: absolute;
            bottom: 10px;
            left: 17px;
            width: 40px;
            height: 5px;
            background-color: $carColor;
            transform: rotate(-15deg);
            transform-origin: right;
            box-shadow: 76px -38px $carColor;
          }
        }
      }
      .light {
        position: absolute;
        background-color: #0002;
        top: 5px;
        right: -2px;
        width: 10px;
        height: 70px;
        border-radius: 15px;
        transform-style: preserve-3d;
        &:before {
          content: '';
          position: absolute;
          top:  5px;
          left: 0;
          width: 150px;
          height: 16px;
          background: linear-gradient(90deg, #fffe, transparent);
          transform-origin: left;
          transform: perspective(500px) rotateY(-50deg);
        }
        &:after {
          content: '';
          position: absolute;
          bottom:  5px;
          left: 0;
          width: 150px;
          height: 16px;
          background: linear-gradient(90deg, #fffe, transparent);
          transform-origin: left;
          transform: perspective(500px) rotateY(-50deg);
        }
      }
    }
  }
}
@keyframes animate-road {
  0% {
    background-position: 100px 0;
  }
  100% {
    background-position: 0 0;
  }

}

@keyframes bounce {
  0% {
    transform: scale(0.8, 1)
  }
  25% {
    transform: scale(0.8, 1.2)
  }
  50% {
    transform: scale(0.8, 0.8)
  }
  75% {
    transform: scale(0.8, 1.2)
  }
  100% {
    transform: scale(0.8, 1)
  }
}

@keyframes animate-taxi {
  0% {
    transform: translate3d(0, 0, 0);
  }
  15% {
    transform: translate3d(0, 10px, 0) rotate(10deg);
  }
  45% {
    transform: translate3d(-10px, 10px, 0);
  }
  75% {
    transform: translate3d(-10px, -20px, 0) rotate(-5deg);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes scale-easeOutElastic {
  0% {
    transform: scale(0, 0);
  }

  16% {
    transform: scale(1, 1.12);
  }

  28% {
    transform: scale(1, 0.83);
  }

  44% {
    transform: scale(1, 1.05);
  }

  59% {
    transform: scale(1, 0.95);
  }

  73% {
    transform: scale(1, 1.01);
  }

  88% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(0, 0);
  }

}

</style>