<template>
  <div class="hw-slider sm:block" ref="slider" :class="[{disabled}]" @mousedown="setStateOn" @mouseup="setStateOff">
<!--    slider value 표시-->
    <div class="result-slider primary" ref="result" :style="setValue"></div>
<!--    step mart 표시-->
    <template v-if="showStep">
      <div class="break-point" v-for="point in stepLevel - 1" :key="point" :style="{left: `${point*unitSize}%`}"></div>
    </template>
<!--    slider controller-->
    <div class="control-btn" :class="{catching}" :style="setPosition" tabindex="0" >
      <div class="tooltip" v-if="showTooltip">{{setResultValue}}</div>
    </div>

    <div class="label-text" v-if="showLabel">
      <div class="start-label">{{minValue}}{{unitText}}</div>
      <div class="end-label">{{maxValue}}{{unitText}}</div>
    </div>
    <div class="label-text" v-if="showValue">
      <div class="current-label" :style="{left:`${result}px`}">{{setResultValue}}{{unitText}}</div>
    </div>
    <div class="slider-title" v-if="titleText">
      <slot>
        <div class="title">{{titleText}}</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HwSlider',
  data () {
    return {
      startValue: 0,
      catching: false,
      container: 500,
      initialX: 0,
      initialW: 0,
      result: 0,
      resultValue: 0,
      sValue: 0,
      snap: true,
    }
  },
  props: {
    id: {
      type: [String, Number]
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 100
    },
    unitText: {
      type: [String, Object]
    },
    showStep: {
      type: Boolean,
      default: false
    },
    stepSize: {
      type: Number,
      default: 0.1
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    titleText: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    value: [Number, String]
  },
  computed: {
    setValue() {
      return {width: `${this.result}px`, left: `${this.startValue}%`}
    },
    setPosition () {
      return {left: `${this.result}px`}
    },
    stepLevel () {
      return (this.maxValue-this.minValue)/this.stepSize
    },
    unitSize () {
      return 100/this.stepLevel
    },
    setResultValue() {
      return Math.ceil(this.maxValue * (this.result / this.container));
    },
    convertValue() {
      return Math.ceil(this.maxValue - this.minValue) / 100 * this.result + this.minValue
    },
  },
  watch: {
    value() {
      this.initValue();
    }
  },
  created() {
  },
  mounted() {
    let sliderInfo = this.$refs.slider.getBoundingClientRect();
    this.container = sliderInfo.width;
    this.initialX = sliderInfo.x;
    this.initValue();
    // this.result = this.convertPixel(this.value)
  },
  methods: {
    initValue() {
      if(this.value > this.maxValue) {
        console.error(`입력값은 ${this.maxValue}보다 클 수 없습니다.`)
        this.$emit('error', {title: 'ErrorMaxValue', message: `입력값은 ${this.maxValue}보다 클 수 없습니다.`})
      }else if (this.value < this.minValue) {
        console.error(`입력값은 ${this.minValue}보다 작을 수 없습니다.`)
        this.$emit('error', {title: 'ErrorMinValue', message: `입력값은 ${this.minValue}보다 작을 수 없습니다.`})
      } else {
        this.result = this.convertPixel(this.value);
      }
    },
    setStateOn({target: control, pageX: initX}) {
      if(control.classList.contains('control-btn')) {
        this.initialX = initX;
        // this.initialW = control.previousElementSibling.offsetWidth;
        this.initialW = this.$refs.result.offsetWidth;
        this.catching = true;
        window.addEventListener('mousemove', this.changeValue);
        window.addEventListener('mouseup', this.setStateOff);
      } else {
        this.result = this.updatePos(initX - this.initialX)
        this.sValue = this.convertPercent(this.result)
      }
    },
    setStateOff({target : control, pageX}) {
      if(control.classList.contains('control-btn')) {
        this.result = this.updatePos( pageX - this.initialX)
      }
      this.sValue = this.result;
      this.$emit('update', {id: this.id || null, value: this.setResultValue})
      this.catching = false;
      window.removeEventListener('mousemove', this.changeValue);
      window.removeEventListener('mouseup', this.setStateOff)
    },
    changeValue({pageX}) {
      let moveValue = pageX - this.initialX;
      this.result = this.updatePos(moveValue)
    },
    updatePos (distance) {
      let offset = this.initialW + distance;
      offset = offset < 0 ? 0 : offset;
      offset = offset > this.container ? this.container : offset;
      //let newValue = this.showStep ? this.snapPos(offSet) : offSet
      // return this.snapPos(offset)
      return offset
    },
    snapPos(value) {
      let unit = this.unitSize;
      let step = Math.ceil(value/unit);
      // let isNext = value%unit > unit/2;
      let isSnap= value > unit*step - 20 && value < unit*step + 20;
      // return isNext ? unit * (step + 1) : unit * step
      console.log('Snap:', isSnap, unit , step, value)
      return isSnap ? unit * step : value
    },
    checkValue(value) {
      let finalValue = parseInt(value);
      if(finalValue >= this.maxValue) {
        finalValue = this.maxValue
      } else if (finalValue <= 0){
        finalValue = 0
      }
      return finalValue/this.maxValue*100
    },
    convertPercent(value) {
      return (value - this.minValue)/this.maxValue
    },
    convertPixel(value) {
      return this.container * this.convertPercent(value);
    },
  }
}
</script>

<style lang="scss">
.hw-slider {
  width: 100%;
  height: 8px;
  position: relative;
  margin: 16px 0;
  background-color: #F2F2F2;
  border-radius: 3px;
  input {
    position: absolute;
    top: 50px;
  }
  .result-slider {
    position: absolute;
    height: 100%;
  }
  .control-btn {
    /*cursor: all-scroll;*/
    cursor: grab;
    outline: 0;
    position: absolute;
    width: 25px;
    height: 25px;
    border: 2px solid #454545;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    /*z-index: 5;*/
    .tooltip {
      display: none;
      padding:  4px 8px;
      position: absolute;
      bottom:100%;
      left: 50%;
      z-index: 9999;
      margin-bottom: 10px;
      border-radius: 4px;
      background-color: #505050;
      color: #fff;
      transform: translateX(-50%);
      &:before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top: 6px solid #505050;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
      }
    }
    &:hover {
      transform: translate(-50%, -50%) scale(1);
      .tooltip {
        display: block;
      }
    }
    &:active {
      cursor: grabbing;
    }
    &.catching {
      background-color: #454545;
    }
  }
  .break-point {
    cursor: pointer;
    background-color: #fff;
    position: absolute;
    width: 8px;
    height: 100%;
    top:0;
    transform: translateX(-50%);
  }
  .slider-title {
    position: absolute;
    bottom: 100%;

  }
  .label-text {
    position: relative;
    width: 100%;
    top: 100%;
    & > div {
      position: absolute;
      top:0;
      margin-top: 10px;
      padding: 4px;
      background-color: #fff;
      text-align: center;
      min-width: 50px;
      &.start-label {
        left: 0;
        transform: translateX(-50%);
      }
      &.end-label {
        right: 0;
        transform: translateX(50%);
      }
      &.current-label {
        transform: translateX(-50%);
        color: #454545;
        font-weight: 700;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          border-bottom: 6px solid #454545;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }
      }
    }
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
    .control-btn {
      cursor: not-allowed;
      border-color: #d6d6d6;
    }
  }
}
.where-is-click {
  position: fixed;
  top:0;
  left: 0;
  background-color: #FFEB3B;
  opacity: .8;

}
</style>