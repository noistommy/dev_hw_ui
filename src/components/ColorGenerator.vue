<template>
  <div class="color-generator-container"  :class="{dark: isDark}">
    <div class="color-generator" :class="['gradient']" :style="setBackground" >
      <div class="cg-title bold">
        Color Generator
      </div>
      <div class="insert-color-wrapper hw-input underline massive fluid">
        <input type="text" placeholder="색상을 입력하세요.(Hex, rgb, ..)" @input="setColor">
      </div>
      {{color}} / {{toHEX}} / {{toRGB}} / {{toHSL}}
    </div>
    <div class="result-colors">
      <div class="selected-color" :style="{background: setLightness}">{{ setLightness }}</div>
      <div class="selected-color" :style="{backgroundColor: setBrightness}">{{ setBrightness }}</div>
      <div class="selected-color" :style="setBackground">{{ color }}</div>
      <div class="selected-color" :style="{backgroundColor: setDarkness}">{{ setDarkness }}</div>
      <div class="selected-color" :style="{backgroundColor: setSaturate}">{{ setSaturate }}</div>
      <h1 :style="{color: toLightness, fontSize: '30px', fontWeight: '900'}">{{ toLightness | uppercase }}</h1>
      <div class="select-color-controller">
        <div class="hue-list">
          <div v-for="(hue, i) in setHuePalette" :key="`hue-${i}`" class="color-bar" :style="{width: '3.6%', height: '10px', backgroundColor: hue }" @click="selectHue(hue, i)"></div>
        </div>
        <hw-slider v-model="saturateValue" :max-value="360" :show-label="true" @update="setSlide"/>
      </div>
      <div class="reference-color">
        <div class="title">3색 조화</div>
        <div class="reference-color-list">
          <div v-for="(hue, i) in setTripleColor" :key="`hue-${i}`" class="selected-color" :style="{ backgroundColor: hue }"></div>
        </div>
        <div class="title">유사색 조화</div>
        <div class="reference-color-list">
          <div v-for="(hue, i) in setKindlyColor" :key="`hue-${i}`" class="selected-color" :style="{ backgroundColor: hue }"></div>
        </div>
        <div class="title">보색 조화</div>
        <div class="reference-color-list">
          <div class="selected-color" :style="{ backgroundColor: color }"></div>
          <div class="selected-color" :style="{ backgroundColor: setComplimentColor }"></div>
        </div>
      </div>
    </div>
    <div class="cg-close" @click="$router.go(-1)">
      <i class="fa fa-remove"></i>
    </div>
  </div>
</template>

<script>
import tinycolor from 'tinycolor2';

export default {
  name: 'ColorGenerator',
  data () {
    return {
      color: '#957FB4',
      tColor: '#957FB4',
      tinyColor: {},
      resultColor: [],
      saturateValue: 0,
      brightness: '',
      lightness: '',
      darkness: '',
      tint: '',
      saturate: 10,
    }
  },
  computed: {
    setBackground () {
      return {backgroundColor: this.color}
    },
    isDark() {
      return tinycolor(this.color).isDark()
    },
    toRGB() {
      return tinycolor(this.color).toRgbString()
    },
    toHEX() {
      return tinycolor(this.color).toHexString()
    },
    toHSL() {
      return tinycolor(this.color).toHslString()
    },
    toLightness() {
      return tinycolor(this.color).spin(this.saturateValue).toHexString();
    },
    setLightness() {
      return tinycolor(this.color).lighten(10).toHexString();
    },
    setDarkness() {
      return tinycolor(this.color).darken(10).toHexString();
    },
    setBrightness() {
      return tinycolor(this.color).brighten(10).toHexString();
    },
    setHuePalette() {
      const hueList = [];
      while(hueList.length < 36) {
        hueList.push(this.setSpin(hueList.length * 10))
      }
      return hueList;
    },
    setTripleColor() {
      const hueList = [];
      [0, 120, 240].forEach(hue => {
        hueList.push(tinycolor(this.color).spin(hue).toHexString())
      })
      return hueList
    },
    setKindlyColor() {
      const hueList = [];
      [-30, 0, 30].forEach(hue => {
        hueList.push(tinycolor(this.color).spin(hue).toHexString())
      })
      return hueList
    },
    setComplimentColor() {
      return tinycolor(this.color).complement().toHexString();
    },
    setSaturate() {
      return tinycolor(this.color).saturate(this.saturate).toHexString();
    },
  },
  created() {
  },
  methods: {
    setColor(e) {
      let value = tinycolor(e.target.value)
      if(value.isValid()) {
        this.color = tinycolor(value).toHexString();
        this.tColor = tinycolor(value).clone().toHexString();
      }
    },
    // setHue(payload) {
    // }
    setSlide (payload) {
      this.saturateValue = payload.value;
      this.color = this.toLightness
    },
    setSpin(value) {
      return tinycolor(this.tColor).spin(value).toHexString();
    },
    selectHue(value, step) {
      this.color = value
      this.saturateValue = (step + 1) * 10 - 5;
    }
  }
}
</script>

<style lang="scss">
.color-generator-container {
  position: fixed;
  top:0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: #fff;
  padding: 0 !important;
  .color-generator {
    width: 100%;
    padding: 20px;
    //background: linear-gradient(to bottom, red 0%, blue 50%, green 100%);
    .cg-title  {
      font-size: 3em;
      margin-bottom: 30px;
    }
  }
  .result-colors {
    padding: 30px;
    .selected-color {
      width: 100px;
      height: 100px;

    }
  }
  .cg-close {
    position: absolute;
    padding: 20px;
    top:0;
    right: 0;
    i {
      font-size: 2em;
    }
  }
  &.dark {
    color: #fff !important;
    input {
      color: #333 !important;
    }
  }
}
.hue-list {
  display: flex;
}
.reference-color {
  margin-top: 60px;
  .title {
    font-size: 20px;
    font-weight: 900;
  }
  .reference-color-list {
    display: flex;
  }
}
</style>