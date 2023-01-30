<template>
  <div class="fe-grid" :class="[setDivide, `justify-${justify}`,setAlignment, setFillSide]" :style="[setGutter]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'FEGrid',
  props: {
    divide: {
      type: [Number,String],
      default: null
    },
    divideName: {
      type: String,
      default: null
    },
    justify: {
      type: String,
      default: 'left'
    },
    alignment: {
      type: String,
      default: null
    },
    fillSide: {
      type: String,
      default: null,
    },
    gutter: {
      type: Number,
      default: 4,
    }
  },
  computed: {
    setDivide() {
      if(this.divideName) {
        return `${this.divideName} divide`;
      } else {
        return this.divide ? `divide-${this.divide}` : '';
      }
    },
    setGutter () {
      return { '--gutter': this.gutter }
    },
    setAlignment () {
      return this.alignment ? `align-${this.alignment}` : '';
    },
    setFillSide () {
      return this.fillSide ? `${this.fillSide}-side` : '';
    }
  }
}
</script>

<style lang="scss" scoped>
$gridWhole: 12;
$gridGutter: 4;

.fe {
  &-grid {
    --gutter: $gridGutter;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin: calc(var(--gutter) * -1px);
    margin-bottom: calc(var(--gutter) * 1px);
    &.left-side .column:first-child {flex-grow: 1}
    &.right-side .column:last-child {flex-grow: 1}
    &.divide {
      @for $i from 1 through $gridWhole {
        &-#{$i} > .column{width: 100% / $i}
        //@if $gridWhole % $i == 0 {
        //
        //}
      }
    }
    &.divide {
      > .column{width: (100% / 12);}
      &.one > .column{width: (100% / 1);}
      &.half > .column{width: (100% / 2);}
      &.third > .column{width: (100% / 3);}
      &.quarter > .column{width: (100% / 4);}
      &.fifth > .column{width: (100% / 5);}
      &.sixth > .column{width: (100% / 6);}
      &.eighth > .column{width: (100% / 8);}
      &.tenth > .column{width: (100% / 10);}
      &.eleventh > .column{width: (100% / 11);}
    }
    &.justify {
      &-left{justify-content: flex-start;}
      &-center{justify-content: center;}
      &-right{justify-content: flex-end;}
      &-between{justify-content: space-between;}
      &-around{justify-content: space-around;}
    }
    &.align {
      &-top{align-items: flex-start;}
      &-center{align-items: center;}
      &-bottom{align-items: flex-end;}
      &-stretch{align-items: stretch;}
    }
    .column {
      padding: calc(var(--gutter) * 1px);
      > .fe-grid {
        margin-bottom: calc(var(--gutter) * -1px);
      }
    }
  }
  &-grid > .rows {
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin: 0;
  }
}


</style>