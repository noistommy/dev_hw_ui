<template>
  <div class="hw-range-input" :class="[isDisabled]">
    <div class="item item-control" @click="onStepClick('down')">
      <i class="fa fa-minus"></i>
    </div>
    <div class="item item-gauge">
      <div class="full-gauge-bar" :style="{ width: leftX+'px', backgroundColor: itemColor }"></div>
      <div class="gauge-bar" ref="bar"></div>
      <div
        class="gauge-ball"
        draggable="false"
        :style="ballStyle"
        @mousedown="onBallGrab"
        ref="ball"
      ></div>
    </div>
    <div class="item item-control" @click="onStepClick('up')">
      <i class="fa fa-plus"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hw-range-input',
  data () {
    return {
      frameLimitterId: null,
      isGrabbing: false,
      barInfo: null,
      barWidth: 0,
      ballWidth: 0,
      leftX: 0
    }
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    numStep: {
      type: Number,
      default: 10
    },
    propValue: {
      type: Number
    },
    frameLimit: {
      type: Number,
      default: 144
    },
    disabled: {
      type: Boolean,
      default: false
    },
    itemColor: {
      type: String,
      default: '#2985db'
    }
  },
  computed: {
    ballStyle () {
      return { left: this.leftX + 'px' }
    },
    currentValue () {
      const currentValue = ((this.max - this.min) * (this.leftX / this.barWidth))
      return (this.min + currentValue)
    },
    isDisabled () {
      return this.disabled ? 'hw-range-input-disabled' : ''
    }
  },
  watch: {
    propValue (newVal, oldVal) {
      if(newVal === oldVal) return
      if(this.barWidth === 0 || this.ballWidth === 0) return
      this.calcValue()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.barInfo = this.$refs.bar.getBoundingClientRect()
      this.ballWidth = this.$refs.ball.offsetWidth
      this.barWidth = this.$refs.bar.offsetWidth - (this.ballWidth / 2)
      window.addEventListener('mousemove', this.onBallMove)
      window.addEventListener('mouseup', this.onBallLeave)
      this.calcValue()
    })
  },
  methods: {
    onBallGrab () {
      if (this.disabled) return
      this.isGrabbing = true
    },
    onBallMove (event) {
      if (!this.isGrabbing) return
      if (this.frameLimitterId) {
        clearTimeout(this.frameLimitterId)
        this.frameLimitterId = null
        return
      }
      this.frameLimitterId = setTimeout(() => {
        this.leftX = event.clientX - this.barInfo.left - (this.ballWidth / 2)
        this.checkValue()
        this.emitValue()
      }, 1000 / this.frameLimit)
    },
    onBallLeave () {
      this.isGrabbing = false
    },
    onStepClick (direction) {
      if (this.disabled) return
      this.leftX += (this.barWidth / this.numStep) * (direction === 'up' ? 1 : -1)
      this.checkValue()
      this.emitValue()
    },
    calcValue () {
      const ratio = (this.propValue - this.min) / (this.max - this.min)
      this.leftX = this.barWidth * ratio
    },
    checkValue () {
      this.leftX = Math.min(this.leftX, this.barWidth)
      this.leftX = Math.max(0, this.leftX)
    },
    emitValue () {
      this.$emit('value-changed', this.currentValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.gauge-ball-grab{
  cursor: grab;
  cursor: -webkit-grab;
  cursor: -moz-grab;
}
.gauge-ball-grabbing{
  cursor: grabbing;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
}
.hw-range-input-disabled{
  opacity: 0.3;
  pointer-events: none;
}
.hw-range-input{
  display: flex;
  flex-flow: row nowrap;
  height: 22px;
  width: 100%;
  .item{
    display: flex;
    align-items: center;
  }
  .item-control{
    width: 12px;
    flex: 0 0 auto;
    justify-content: center;
    font-size: 12px;
    color: #909090;
    cursor: pointer;
  }
  .item-gauge{
    padding: 0 1px;
    flex-grow: 1;
    margin: 0 10px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    .full-gauge-bar{
      background-color: #2985db;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      height: 5px;
    }
    .gauge-bar{
      flex-grow: 1;
      height: 5px;
      background-color: #ebebeb;
      border-radius: 3px;
    }
    .gauge-ball{
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: white;
      border: 1px solid #c4c4c4;
      top: 0;
    }
  }
}
</style>
