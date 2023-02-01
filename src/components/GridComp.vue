<template lang="pug">
div.grid-container
  ScrollSpy(type="dot", container-key=".grid-container", section-key=".grid-wrapper", title-key=".type-title", :init-offset="0", @select="setGoto" )
  .grid-wrapper
    .type-title 기본 그리드
    FEGrid
      FEColumn(v-for="(item, index) in gridLength", :key="`col-1-${index}`")
        span Column
  .grid-wrapper
    .type-title 배치
    template(v-for="type in justifyType")
      .sub-title(:key="type") {{type.toUpperCase()}}
      FEGrid(divide="6", :justify="type")
        FEColumn(v-for="(item, index) in 4", :key="`${type}-${index}`")
          span Column
  .grid-wrapper
    .type-title 정렬
    template(v-for="type in alignmentType")
      .sub-title(:key="type") {{type.toUpperCase()}}
      FEGrid(divide="4", :alignment="type")
        FEColumn(v-for="(item, index) in 4", :key="`${type}-${index}`")
          span(:style="{height: `${item * 25}px`}") Column
  .grid-wrapper
    .type-title 컬럼 크기로 나누기
    FEGrid
      FEColumn(v-for="(item, index) in gridLength / 3", :key="`col-3-${index}`" :span="3",)
        span Span 3
      FEColumn(v-for="(item, index) in gridLength / 6", :key="`col-6-${index}`" :span="6")
        span Span 6
      FEColumn(v-for="(item, index) in gridLength / 4", :key="`col-4-${index}`" :span="4")
        span Span 4
  .grid-wrapper
    .type-title 숫자로 등분하기
    FEGrid(divide="4")
      FEColumn(v-for="(item, index) in 4", :key="`div-4-${index}`")
        span Divide 4
    FEGrid(divide="2")
      FEColumn(v-for="(item, index) in 2", :key="`div-2-${index}`")
        span Divide 2
    FEGrid(divide="3")
      FEColumn(v-for="(item, index) in 3", :key="`div-3-${index}`")
        span Divide 3
    FEGrid(divide="5")
      FEColumn(v-for="(item, index) in 5", :key="`div-3-${index}`")
        span Divide 5
    FEGrid(divide="8")
      FEColumn(v-for="(item, index) in 8", :key="`div-3-${index}`")
        span Divide 8
    .type-title 이름으로 등분하기
    FEGrid(divide-name="")
      FEColumn(v-for="(item, index) in 12", :key="`div-3-${index}`")
        span
    FEGrid(divide-name="half")
      FEColumn(v-for="(item, index) in 2", :key="`div-half-${index}`")
        span Half
    FEGrid(divide-name="quarter")
      FEColumn(v-for="(item, index) in 4", :key="`div-quarter-${index}`")
        span Quarter
  .grid-wrapper
    .type-title 간격
    FEGrid(:divide="selectLength", :gutter="gridGutter")
      FEColumn(v-for="(item, index) in selectLength", :key="`col-1-${index}`")
        span Column
    .sub-title Column Length
    .hw-button-group
      div.hw-button.hover(
        v-for="(item, index) in gridLength",
        :key="item",
        :class="{active: selectCol === item}",
        @click="setActive(item)")
        span.label {{item}}
    .sub-title Gutter Size
    .hw-button-group
      div.hw-button.hover(
        v-for="(item, index) in [4, 8, 12, 16, 24]",
        :key="item",
        :class="{active: selectGut === item}",
        @click="setGutterActive(item)")
        span.label {{item}}
  .grid-wrapper
    .type-title 순서
    FEGrid(divide="4")
      FEColumn(v-for="(item, index) in 4", :key="`div-4-${index}`", :order="4 - index")
        span Col {{item}} / Order {{4 - index}}
  .grid-wrapper
    .type-title 채우기
    FEGrid(v-for="(item, index) in 4", :key="`fegl-${index}`", fill-side="left")
      .column
        span Fill-Left-Side
      FEColumn(:span="item + 2")
        span Col-{{item + 2}}
    FEGrid(v-for="(item, index) in 4", :key="`fegr-${index}`", fill-side="right")
      FEColumn(:span="item + 2")
        span Col-{{item + 2}}
      .column
        span Fill-Right-Side
  .grid-wrapper
    .type-title 거리두기
    FEGrid
      FEColumn(v-for="(item, index) in 2", :key="`div-4-${index}`", :span="3", :offset="3")
        span Col 3 / offset 3
      FEColumn(:span="8", :offset="2")
        span Col 8 / offset 2 / Empty 2
      FEColumn(:span="4")
        span Col 4
      FEColumn(:span="4", :offset="4")
        span Col 4 / offset 4
  .grid-wrapper
    .type-title 중첩
    FEGrid(divide-name="half")
      FEColumn
        FEGrid.nest
          FEColumn(v-for="item in 3", :key="`nest-${item}`", :span="4")
            span Half-1-Col-{{item}}
      FEColumn
        span Half 2
  .grid-wrapper
    .type-title 반응형
    FEGrid
      FEColumn(v-for="(item, index) in gridLength / 3", :key="`col-3-${index}`" :span="2", :offset="1"
        :xs="{ span: 10, offset: 1}",
        :sm="{ span: 6, offset: 3}",
        :md="{ span: 3, offset: 2}")
        span responsive
  .grid-wrapper
    .type-title 조합
    FEGrid
      FEColumn(:span="3")
        span Span 3
      FEColumn(:span="2")
        span Span 4
      FEColumn(:span="7")
        span Span 7
    FEGrid
      FEColumn(:span="2")
        span Span 2
      FEColumn(:span="2")
        span Span 2
      FEColumn(:span="8")
        span Span 8
    FEGrid
      FEColumn(:span="5")
        span Span 5
      FEColumn(:span="1")
        span Span 1
      FEColumn(:span="6")
        span Span 6

</template>
<script>
import FEGrid from '@/packages/FEGrid/FEGrid';
import FEColumn from '@/packages/FEGrid/FEColumn';

export default {
  name: 'grid-component-view',
  components: {FEGrid, FEColumn },
  data () {
    return {
      selectGut: 4,
      selectCol: 12,
      selectLength: 12,
      gridGutter: 4,
      gridLength: 12,
      columnCount: ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
      justifyType: ['left', 'center', 'right', 'between', 'around'],
      alignmentType: ['top', 'center', 'bottom'],
      currentType: '0',
    }
  },
  methods: {
    setActive(target) {
      this.selectCol = target;
      this.selectLength = target;
    },
    setGutterActive(target) {
      this.selectGut = target;
      this.gridGutter = target;
    },
    setGoto(payload) {
      const parent = this.$el
      this.currentType = payload.i;
      parent.scrollTop = payload.target.offset
    }
  }
};
</script>

<style lang="scss" scoped>
$gridWhole: 12;
$gridWholeMobile: 4;
$gridWholeTablet: 8;
$gridWholeLaptop: 12;
$gridPercent: 100 / $gridWhole;
$gridHalf: $gridWhole / 2;
$gridThird: $gridWhole / 3;
$gridQuarter: $gridWhole / 4;
$gridFifth: $gridWhole / 5;
$gridSixth: $gridWhole / 6;
$gridEighth: $gridWhole / 8;
$gridTenth: $gridWhole / 10;
$gridGutter: 4;

.grid-container {
  position: relative;
  //max-width: 1280px;

  .grid-wrapper {
    background-color: #f8f8f8;
    border: 1px solid #ebebeb;
    width: 100%;
    margin-bottom: 10px;
    padding: 20px 24px;
    .type-title {
      font-weight: 600;
      font-size: 1.2em;
      padding: 10px 0 5px;
    }
    .sub-title {
      font-weight: 600;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }
  }

}

.fe-grid > .rows {width: 100%;}
.fe-grid,
.fe-grid .rows{
  .column {
    min-height: 50px;
    position: relative;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      width: 100%;
      height:100%;
      min-height: 50px;
      background-color: #ebebeb;
    }
    &:after {
      content: '';
      display: none;
    }
  }
  &.nest .column span {
    background-color: #ccc;
  }
}
.scrollspy::v-deep {
  position: fixed;
  top: 50%;
  right: 0;
  padding: 30px;
  transform: translate(0, -50%);
  ul.nav-list {
    .type-nav {
      cursor: pointer;
    }
  }
  .nav-title {
    font-size: 2em;
    font-weight: 900;
    margin-bottom: 10px;
  }
}

</style>