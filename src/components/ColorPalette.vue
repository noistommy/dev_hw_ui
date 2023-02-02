<template>
  <div class="color-palette-view contents-detail-view">
    <!--        <div class="h1">-->
    <!--            <router-link :to="`./color_generator`">스타일 가이드 분석 및 참고 자료</router-link>-->
    <!--        </div>-->
    <div class="type-wrapper">
      <div class="type-title">Color Palette</div>
      <div class="type-preview">
        <div class="color-grid">
          <div class="color-grid-row" v-for="row in colorList" :key="`${row}-1`">
            <div class="color-name">{{row}}</div>
            <div class="color-cell" v-for="item in levelList" :key="`${row}-${item}`" :class="`${row}-${item*100}`"></div>
          </div>
        </div>
        <div class="type-contents inline panel">
          <div class="color-palette" v-for="row in colorList" :key="row" :class="{hidden:!row}">

            <template v-if="row">
              <div class="main-color h3" :class="`${row}-100 ${row}-500-text ${row}-300-line ${row}-value`" >{{row}}</div>
              <div class="color-level" v-for="item in levelList" :key="item" :class="`${row}-${item*100}`">{{item*100}}</div>
            </template>

          </div>

        </div>

      </div>
    </div>
    <div class="type-wrapper">
      <div class="type-title">ee</div>
      <div class="type-preview">
        <div class="type-contents inline">
          <div class="content-card gray-100">100</div>
          <div class="content-card gray-200">200</div>
          <div class="content-card gray-500">500</div>
          <div class="content-card gray-700">700</div>
          <div class="content-card gray-900">900</div>
        </div>
      </div>
      <div class="type-preview">
        <div class="type-contents inline">
          <div class="content-card" v-for="item in grayscale" :key="item.name" :style="{backgroundColor: item.value}">{{item.value}}</div>
        </div>
      </div>
      <div class="type-preview">
        <div class="type-contents inline alpha">
          <div class="content-card" v-for="item in grayscale" :key="item.name" :style="{backgroundColor: item.value}">{{item.value}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import tinyColor from 'tinycolor2';
export default {
  name: 'Home',
  data(){
    return {
      levelList: [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      colorList: ['primary', 'gray', 'red', 'orange', 'yellow', 'lightgreen', 'green', 'lightblue', 'blue', 'deepblue', 'deeppurple', 'purple', 'brown', 'success', 'attention', 'info', 'error'],
      grayscale: [
        // {name: 'Gray1', class:'gray light', value: '#F8F8F8'},
        {name: 'Gray2', class:'', value: '#EBEBEB'},
        {name: 'Gray3', class:'', value: '#C4C4C4'},
        {name: 'Gray4', class:'alpha', value: '#909090'},
        {name: 'Gray5', class:'', value: '#676767'},
        {name: 'Gray6', class:'', value: '#333333'},
      ]
    }
  },
  created() {
    console.log(tinyColor('red').toHexString())
  }
}
</script>

<style lang="scss">
$red: #D75757;
$orange: #EE9033;
$yellow: #F8B825;
$lightgreen: #B3BC40;
$green: #61A475;
$lightblue: #8CC5CE;
$blue: #70A3CA;
$deepblue: #5178AF;
$deeppurple: #9180B4;
$purple: #AF77C0;
$brown: #A86A82;
$gray: #8F8F8F;

$baseColors: (
    'primary': #509BE2,
    'gray': #8F8F8F,
    'red': $red,
    'orange': $orange,
    'yellow': $yellow,
    'lightgreen': #B3BC40,
    'green': #61A475,
    'lightblue': #8CC5CE,
    'blue': #70A3CA,
    'deepblue': #5178AF,
    'deeppurple': #9180B4,
    'purple': #AF77C0,
    'brown': #A86A82,
    'success': #4ca44f,
    'attention': #e28c46,
    'info': #9E9E9E,
    'error': #d84a49,
);

@function getBase ($baseColor) {
  @if (lighten($baseColor, 45) == #FFFFFF) {
    @return getBase(darken($baseColor, 9))
  } @else {
    @return $baseColor;
  }
}

@function colorMap($baseColors, $variations) {
  $colors:();

  @each $color, $value in $baseColors {
    $value: getBase($value);
    $maxVar: 36;
    $mid: calc($variations / 2);
    $dist: $mid - 1;
    $step: calc($maxVar / $dist);

    // lighten and darken
    @for $i from 1 through $dist {
      $percent: $maxVar - ($step * ($i - 1));
      $darken: ($variations - $i) * 100;
      $lighten: $i * 100;

      $colors: map-merge($colors, (
          #{$color}-#{$lighten}: lighten($value, $percent),
          #{$color}-#{$darken}:  darken($value, $percent),
          A#{$color}-#{$darken}:  darken($value, $percent)
      ));
    }

    // middle eg 500
    $colors: map-merge($colors, (#{$color}-50: lighten($value, 42)));
    $colors: map-merge($colors, (#{$color}-#{calc($variations/2)*100}: $value));

  }
  @return $colors;
}

@each $color, $value in colorMap($baseColors, 10) {
  .#{$color} {
    background-color: $value;
    &:hover {
      background-color: darken($value, 8);
    }
  }
  .#{$color}-value {
    &::before {
      content: '#{$value}';
      font-family: monospace;
      float: right;
      text-transform: uppercase;
    }
  }
  .#{$color}-text {
    color: $value
  }
  .#{$color}-line {
    border: 1px solid $value;
  }
}

.type-contents {
  width: 100%;
  padding: 20px;
  margin-top:30px;
  &.inline {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
}

.main-color {
  padding: 12px;
  margin-bottom: 5px;
  text-transform: capitalize;
  font-weight: 600;
  &::before {
    content: '';
  }
}
.color-palette {
  width: 25%;
  min-width: 360px;
  padding: 12px;
  &.hidden {
    display: none;
  }
}
.color-level {
  padding: 12px;

}
.content-card:nth-child(n+4),
.color-level:nth-child(n+7) {
  color: #fff;
}

.secondary {
  background-color: #ECECEC;
  &.dark {
    background-color: #909090;
  }
}
.content-card {
  position: relative;
  width: 150px;
  height: 150px;
  .name {
    position: absolute;
    top:0;
    left: 0;
    padding: 10px;
  }
  .code {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
  }
}
.alpha {
  opacity: 0.294;
}
.color-grid {
  width: 600px;
  .color-grid-row {
    display: flex;
    border-bottom: 1px solid #d6d6d6;
    align-items: center;
    .color-name {
      min-width: 100px;
      flex-grow: 1;
    }
    .color-cell {
      width: 30px;
      height: 30px;
      margin:2px;
    }
  }
}

</style>
