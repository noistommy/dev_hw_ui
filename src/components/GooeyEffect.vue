<template>
  <div class="gooey-test">
    <div class="contents-detail-view">
      <div class="contents-section">
        <div class="section-title">Type</div>
        <div class="type-wrapper">
          <div class="type-title">Gooey Button</div>
          <div class="type-preview" :style="{width: `${width}px`, height: `${height}px`}">
            <canvas id="canvas"></canvas>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Gooey Menu</div>
          <div class="gooey-menu" :class=[stateActive]>
            <div class="gooey-menu-wrapper">
              <ul class="menu-items">
                <li class="menu-item" v-for="item in 6" :key="item"
                    :style="{transform: `rotate(${60 * (item + 1)}deg)`}"
                >
                  <div class="button" :style="{transition: `transform ${item * 200}ms `}">
              <span class="button-name"
                    :style="{transform: `rotate(${-60 * (item + 1)}deg)`}"
              >{{item}}</span>
                  </div>
                  <div class="menu-item-bounce" :style="{animationDelay: ((item - 1) * 0.2) + 's'}"></div>
                </li>
              </ul>
              <div class="toggle-button" @click="setActive">
                <i class="fa fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Gooey Pagination</div>
          <div class="pagination">
            <div class="pagination-nav">
              <div class="current" :style="setCurrentPos"></div>
              <div class="dots">
                <div class="dot" v-for="dot in 5" :key="dot" :class="{currented: activeDot === dot}" @click="setCurrentActive(dot)">
                  <span class="dot-name">{{dot}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="type-wrapper">
          <div class="type-title">Gooey Pagination</div>
          <section class="goo-container">
            <!-- Content Section -->
            <section>
              <p>Minus quos, in ipsam ratione fugiat velit qui, ut natus inventore <a href="#">possimus nobis</a> vel dolores maxime sed quia temporibus voluptatum sunt repellat corrupti?</p>
            </section>
            <!-- Background Gradient -->
            <div class="goo-box">
              <!-- Gooey Cursor -->
              <div class="cursor goo-cursor"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo1">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo"/>
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" version="1.1">
      <defs>
        <filter id="goo2">
          <feGaussianBlur in="SourceGraphic" stdDeviation=10 result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -9"/>
        </filter>
      </defs>
    </svg>
    <svg
        xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="13"
              result="goo-blur"
          />
          <feColorMatrix
              in="goo-blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -11"
          />
        </filter>
      </defs>
    </svg>
    <div class="cursor true-cursor"></div>
  </div>
</template>

<script>
const colorPalette = ['#44B4E6', '#72CE16', '#FF9F64', '#F2D328', '#B080FD', '#FC64F3'];
const width = 400;
const height = 400;
const origin = {
  x: width / 2,
  y: height / 2,
};

class Ball {
  constructor() {
    this.x = origin.x;
    this.y = origin.y;
    this.angle = Math.PI * 2 * Math.random();
    this.vx = (1.3 + Math.random() * 0.) * Math.sin(this.angle);
    // this.vx = Math.cos(this.angle);
    // this.vy = Math.sin(this.angle);
    this.vy = (1.3 + Math.random() * 0.3) * Math.cos(this.angle);
    this.r = 4 + 3 * Math.random();
    this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.r -= 0.01;
  }
}

let throttleOn = false;
let actionLock = false;
const throttleTimer = 100;

export default {
  name: 'GooeyEffect',
  data() {
    return {
      slideKeyFrame: 5000,
      dot: [],
      angle: 0,
      size_radius: 20,
      bigger: true,
      active: false,
      activeDot: 1,
      //plutter
      canvas: null,
      context: '',
      width: 0,
      height: 0,
      origin: {},
      balls: [],
      count: 0,
      randomCount: 0,
    };
  },
  computed: {
    setCurrentPos() {
      return {
        transform: `translate3d(${(this.activeDot - 1) * 58}px, 0px, 0px) scale(1.4, 1.4)`,
      };
    },
    stateActive() {
      return this.active ? 'active' : 'close';
    }
  },
  mounted() {
    this.canvas = document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');

    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.origin = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.loop();

    window.addEventListener('mousemove', (e) => {this.throttle(e)})
  },
  methods: {
    setActive() {
      this.active = !this.active;
    },
    setCurrentActive(num) {
      this.activeDot = num;
    },
    loop() {
      this.context.clearRect(0, 0, this.width, this.height);
      if (this.count === this.randomCount) {
        this.balls.push(new Ball());
        this.count = 0;
        this.randomCount = 1 + Math.floor(Math.random() * 5);
      }
      this.count += 1;
      for (let i = 0; i < this.balls.length; i++) {
        const b = this.balls[i];
        this.context.fillStyle = b.color;
        this.context.beginPath();
        this.context.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
        this.context.fill();
        b.update();
      }

      this.context.fillStyle = '#ffdd02';
      // this.context.fillStyle = '#0a0a0a';
      this.context.beginPath();
      this.context.arc(this.origin.x, this.origin.y, this.size_radius * 2, 0, Math.PI * 2, false);
      this.context.fill();

      this.removeBall();
      requestAnimationFrame(this.loop);
    },
    removeBall() {
      for (let i = 0; i < this.balls.length; i++) {
        const b = this.balls[i];
        if (
            b.x + b.r < 0
            || b.x - b.r > this.width
            || b.y + b.r < 0
            || b.y - b.r > this.height
            || b.r <= 0
        ) {
          this.balls.splice(i, 1);
        }
      }
    },
    throttle(e){
      if(throttleOn){
        actionLock = true;
      }
      if(!actionLock){
        throttleOn = true;
        setTimeout(() => {
          throttleOn = false;
        }, throttleTimer);
        this.cursorTrack(e);
      }
      actionLock = false;
    },
    cursorTrack(e) {
      // console.log(e.pageX)
      const bodyOffset = document.querySelector('body');
      const boxOffset = document.querySelector('.goo-box').getBoundingClientRect();
      document.querySelector('.true-cursor').style.left = e.pageX - bodyOffset.offsetLeft + 'px';
      document.querySelector('.true-cursor').style.top = e.pageY - bodyOffset.offsetTop + 'px';

      document.querySelector('.goo-cursor').style.left = e.pageX - boxOffset.left + 'px';
      document.querySelector('.goo-cursor').style.top = e.pageY - boxOffset.top - 20 + 'px';

      // console.log(e.pageY, boxOffset.top )
    }
  },
};

</script>

<style lang="scss" scoped>
* {
  cursor:none;
}
#canvas{
  position: absolute;
  filter: url(#goo2);
}
section {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2em 0;
}
.goo-container {
  position: relative;

  a {
    color: #FFFFFF;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid #FFFFFF;
  }
  .goo-box {
    position: absolute;
    height: 100%;
    width: 140%;
    top: 0;
    left: 0;
    margin: auto;
    //margin-left: -20%;
    background: linear-gradient(90deg, #FAEFCC, #FAB599);
    filter: url(#goo);
    transform: translateZ(0);
  }
}
.cursor {
  pointer-events: none;
  position: absolute;
  width: 50px;
  height: 50px;
  margin-top: -25px;
  margin-left: -25px;
  border-radius: 50%;
  background: #FAB599;
  will-change: left, top, transform, background;
  transition: linear 20ms;
  transform: translateZ(0);
  z-index: 99999;
  /* Hide Element */
  left: -500%;
}
.true-cursor {
  background: rgba(250,181,153,.35);
}

.gooey-test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  .pagination {
    width: fit-content;
    margin: 20px 0;
    .pagination-nav {
      position: relative;
      text-align: center;
      filter: url(#goo1);
      transform: translateZ(0);
      .current, .dot {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        padding: 0;
        line-height: 32px;
        background: #d5d3d2;
        border-radius: 50%;
        margin: 0 13px;
        border: none;
        outline: none;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
      }
      .current {
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 500ms ease;
      }
      .dot {
        .dot-name {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: scale(0, 0)
        }
        &.currented {
          span.dot-name {
            transform: scale(1, 1)
          }
        }
      }
    }
  }
  .gooey-menu {
    width: 300px;
    height: 300px;
    position: relative;
    filter: url(#goo1);
    transform: translateZ(0);
    text-align: center;
    .gooey-menu-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      ul.menu-items {
        padding: 0;
        margin: 0;
        position: absolute;
        left: 0;
        top: 0;
      }
      .toggle-button, .button, .menu-item-bounce {
        background: #f59393;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        margin-left: -40px;
        margin-top: -40px;
        color: #fff;
        border: none;
        outline: none;
        position: relative;
      }
      .menu-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
      }
      .button {
        width: 60px;
        height: 60px;
        margin-left: -30px;
        margin-top: -30px;
        position: absolute;
        top: 0;
        left: 0;
        color: #AD4C4C;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 900;

      }
      .menu-item-bounce {
        // display: none;
        position: absolute;
        top: 0;
        left: 0;
      }
      .toggle-button {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 600ms;
        transform: scale(1);
        i {
          font-size: 2em;
          font-weight: 900;
        }
      }
    }
    &.active {
      .button {
        transform: translate3d(0px, 90px, 0px)
      }
      .toggle-button {
        transform: rotate(45deg) scale(0.8)
      }
      .menu-item-bounce {
        animation-name: scale-easeOutElastic;
        animation-duration: 3s;
        animation-timing-function: ease-out;
        //animation-iteration-count: infinite;
      }
    }
    &.close {
      .menu-item-bounce {
        animation-name: scale-easeOutElastic;
        animation-duration: 3s;
        animation-timing-function: ease-out;
        //animation-iteration-count: infinite;
      }
    }
  }
}



</style>
