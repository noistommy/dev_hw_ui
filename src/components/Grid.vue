<template lang="pug">
.grid-container
  .grid-wrapper
    .type-title 그리드 분할
  .grid-wrapper
    .type-title 기본 그리드 ({{gridLength}}등분)
    .ga-grid2
      .column(v-for="(item, index) in gridLength", :key="`col-1-${index}`", :data-name="index + 1")
      .column.span-2(v-for="(item, index) in gridLength / 2", :key="`col-2-${index}`", :data-name="`col-2`")
      .column.span-3(v-for="(item, index) in gridLength / 3", :key="`col-3-${index}`", :data-name="`col-3`")
      .column.span-4(v-for="(item, index) in gridLength / 4", :key="`col-4-${index}`", :data-name="`col-4`")
      .column.span-6(v-for="(item, index) in gridLength / 6", :key="`col-6-${index}`", :data-name="`col-6`")
      .column.span-12(v-for="(item, index) in gridLength / 12", :key="`col-12-${index}`", :data-name="`col-12`")
  .grid-wrapper
    .type-title 기본 그리드 (ex> 4 Contents)
    .ga-grid2
      .column.span-3(v-for="(item, index) in 4", :key="`base${index}`", :data-name="`Col-3{${item})`")
    .ga-grid2
      .column.span-3(v-for="(item, index) in 4", :key="`base${index}`", :data-name="`Col-3{${item})`")
  .grid-wrapper
    .type-title 기본 그리드 나누기
    .ga-grid2.divide-column-4
      .column(v-for="(item, index) in [1,2]", :key="`divide${index}`")
  .grid-wrapper
    .type-title 기본 그리드 나누기 [2 ~ {{gridLength}}]
    .ga-grid2(v-for="grid in gridLength" :key="grid" :class="`divide-column-${grid}`")
      .column(v-for="(item, index) in grid", :key="`half${index}`", :data-name="`col-${index + 1}`")
  .grid-wrapper
    .type-title 그리드 구성 1
    p 2 + 6 + 4 = 12
    .ga-grid2
      .column.span-2
      .column.span-6
      .column.span-4
    .type-title 그리드 구성 2
    p 5 + 4 + 3 = 12
    .ga-grid2
      .column.span-5
      .column.span-4
      .column.span-3
    .type-title 그리드 구성 3
    p 5 + 1 + 3 + 1 + 2 = 12
    .ga-grid2
      .column.span-5
      .column
      .column.span-3
      .column
      .column.span-2
  .grid-wrapper
    .type-title Row / Dense Test
    p 5 + 1 + 3 + 1 + 2 = 12
    .ga-grid2.row-3.row-md-4.row-sm-6.dense
      .column.span-5.span-row-2.span-md-6.span-row-md-3.span-sm-12.span-row-sm-2(data-name="1")
      .column.span-8.span-md-6.span-sm-12(data-name="2")
      .column.span-3.span-md-6.span-sm-12.span-row-md-2.justify-center(data-name="3")
      .column.span-md-3.span-sm-12(data-name="4")
      .column.span-2.span-md-9.span-sm-12(data-name="5")
  .grid-wrapper.align-rule
    .type-title Grid align / Grid item align
    .type-control
      .label JUSTIFY
      .hw-button-group
        .hw-button(v-for="type in alignType", :key="type", :class="{active: type === justify}", @click="setJustify(type)") {{ type.toUpperCase() }}
      .label ALIGN
      .hw-button-group
        .hw-button(v-for="type in alignType", :key="type", :class="{active: type === align}", @click="setAlign(type)") {{ type.toUpperCase() }}
    .ga-grid2.divide-column-3.row-3.inline(:style="{width: '400px', height: '400px'}", :class="[`justify-${justify}`, `align-${align}`]")
      .column.smallColumn(v-for="item in 9", :key="item", :data-name="item")
  .grid-wrapper
    .type-title Grid fit-contents auto-fit / auto-fill
      .ga-grid2.auto-fit
        .column(v-for="(item, index) in 6", :key="`col-1-${index}`", :data-name="index + 1")
  .ga-form-2
    .field
      label form inputs
      .fields
        .field.column.span-4
          label form 1
          input(type="text", placeholder="Input text")
        .field.column.span-4
          label
          input(type="text", placeholder="Input text")
        .field.column.span-4
          label form 3
          input(type="text", placeholder="Input text")

</template>
<script>

export default {
  name: 'grid-view',
  data () {
    return {
      alignType: ['start', 'center', 'end'],
      justify: 'center',
      align: 'center',
      gridLength: 12,
      columnCount: ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
    }
  },
  methods: {
    setJustify (type) {
      this.justify = type;
    },
    setAlign (type) {
      this.align = type;
    }
  }
}
</script>

<style lang="scss" scoped>
$bp-mobile: 320px;
$bp-tablet: 768px;
$bp-laptop: 1280px;
$bp-desktop: 1440px;

$gridWhole: 12;

$gridGutterLarge: 20;
$gridGutterSmall: 10;

.ga-form-2 .fields,
.ga-grid2 {
  --grid-col-num: #{$gridWhole};
  --grid-row-num: #{$gridWhole};
  --grid-gap: #{$gridGutterLarge}px;
  display: grid;
  grid-gap: var(--grid-gap);
  grid-template-columns: repeat(var(--grid-col-num), 1fr);
  margin-bottom: var(--grid-gap);
  &.inline {
    display: inline-grid;
  }
  &.auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  &:last-child {
    margin: 0;
  }
  &.divide-column {
    grid-template-columns: repeat($gridWhole, 1fr);
    @for $i from 1 through $gridWhole {
      &-#{$i} {
        grid-template-columns: repeat($i, calc($gridWhole / $i) * 1fr);
      }
      // reject: span {n} 정수값만 지원
      //&-#{$i} > .column {
      //  grid-column: auto / span ($gridWhole / $i);
      //}
    }
  }
  &.row {
    @for $i from 1 through $gridWhole {
      &-#{$i} {
        grid-template-rows: repeat($i, 1fr);
      }
    }
  }
  &.flow {
    &-column {
      grid-auto-flow: column;
    }
    &-row {
      grid-auto-flow: row;
    }
  }
  &.dense {
    grid-auto-flow: dense;
  }
  &.justify {
    &-start {justify-items: start;}
    &-center {justify-items: center;}
    &-end {justify-items: end;}
    &-strech {justify-items: stretch;}
  }
  &.align {
    &-start {align-items: start;}
    &-center {align-items: center;}
    &-end {align-items: end;}
    &-strech {align-items: stretch;}
  }
  > .column {
    &.span {
      @for $i from 1 through $gridWhole {
        &-#{$i} {
          grid-column: auto / span $i;
        }
        &-row-#{$i} {
          grid-row: auto / span $i;
        }
      }
    }
  }
}


@media all and (max-width: #{$bp-tablet - 1px}) {
  .ga-grid2 {
    --grid-gap: #{$gridGutterSmall}px;
    &.row {
      @for $i from 1 through $gridWhole {
        &-xs-#{$i} {
          grid-template-rows: repeat($i, 1fr);
        }
      }
    }
    .column {
      &.span {
        @for $i from 1 through $gridWhole {
          &-xs-#{$i} {
            grid-column: auto / span $i;
          }
          &-row-xs-#{$i} {
            grid-row: auto / span $i;
          }
        }
      }
    }
  }
}
@media all and (min-width: #{$bp-tablet}) and (max-width: #{$bp-laptop - 1px}) {
  .ga-grid2 {
    --grid-gap: #{$gridGutterSmall}px;
    &.row {
      @for $i from 1 through $gridWhole {
        &-sm-#{$i} {
          grid-template-rows: repeat($i, 1fr);
        }
      }
    }
    .column {
      &.span {
        @for $i from 1 through $gridWhole {
          &-sm-#{$i} {
            grid-column: auto / span $i;
          }
          &-row-sm-#{$i} {
            grid-row: auto / span $i;
          }
        }
      }
    }
  }
}
@media all and (min-width: #{$bp-laptop}) and (max-width: #{$bp-desktop - 1px}) {
  //@media all and (max-width: #{$bp-desktop - 1px}) {
  .ga-grid2 {
    &.row {
      @for $i from 1 through $gridWhole {
        &-md-#{$i} {
          grid-template-rows: repeat($i, 1fr);
        }
      }
    }
    .column {
      &.span {
        @for $i from 1 through $gridWhole {
          &-md-#{$i} {
            grid-column: auto / span $i;
          }
          &-row-md-#{$i} {
            grid-row: auto / span $i;
          }
        }
      }
    }
  }
}
.column {
  position: relative;
  &:after {
    content: attr(data-name);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    width: 100%;
    height: 100%;
    min-height: 50px;
    background-color: #ebebeb;
    box-shadow: 0 0 0 1px #ccc inset;
  }
  &.smallColumn {
    width: 50px;
    height: 50px;
  }
}
.align-rule {
  .ga-grid2 {
    outline: dotted;
  }
}

.type-control {
  padding: 20px;
  display: flex;
  align-items: center;
  .label {
    font-weight: bold;
    margin: 0 10px;
  }
}

.field {
  &:after {
    display: none;
  }
}

</style>