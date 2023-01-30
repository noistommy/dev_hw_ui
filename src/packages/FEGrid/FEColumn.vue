<template>
  <div class="column" :class="[setSpan, setOrder, setOffset, setLaptop, setTablet, setMobile]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'FEColumn',
  props: {
    span: {
      type: Number,
      default: null
    },
    order: {
      type: Number,
      default: null,
    },
    offset: {
      type: Number,
      default: null,
    },
    xs: {
      type: Object,
      default() {},
    },
    sm: {
      type: Object,
      default() {},
    },
    md: {
      type: Object,
      default() {},
    },
  },
  computed: {
    setSpan() {
      return this.span ? `span-${this.span}` : '';
    },
    setOrder() {
      return this.order ? `order-${this.order}` : '';
    },
    setOffset() {
      return this.offset ? `offset-${this.offset}` : '';
    },
    setLaptop() {
      if(!this.md) return '';
      const span = this.md.span || this.span;
      const offset = this.md.offset ? `offset-md-${this.md.offset}` : '';
      return `span-md-${span} ${offset}`
    },
    setTablet() {
      if(!this.sm) return '';
      const span = this.sm.span || this.span;
      const offset = this.sm.offset ? `offset-sm-${this.sm.offset}` : '';
      return `span-sm-${span} ${offset}`
    },
    setMobile() {
      if(!this.xs) return '';
      const span = this.xs.span || this.span;
      const offset = this.xs.offset ? `offset-xs-${this.xs.offset}` : '';
      return `span-xs-${span} ${offset}`
    }
  }
}
</script>

<style lang="scss" scoped>
$gridWhole: 12;
$gridWholeMobile: 4;
$gridWholeTablet: 8;
$gridWholeLaptop: 12;
$gridGutter: 5;
$gridPercent: (100 / $gridWhole);
$gridHalf: $gridWhole / 2;
$gridThird: $gridWhole / 3;
$gridQuarter: $gridWhole / 4;
$gridFifth: $gridWhole / 5;
$gridSixth: $gridWhole / 6;
$gridEighth: $gridWhole / 8;
$gridTenth: $gridWhole / 10;

$bp-mobile: 320px;
$bp-tablet: 768px;
$bp-laptop: 1280px;
$bp-desktop: 1440px;

.rows > .column,
.column {
  width: $gridPercent * 1%;
  &.two {width: $gridPercent * 2%}
  &.three {width: $gridPercent * 3%}
  &.four {width: $gridPercent * 4%}
  &.five {width: $gridPercent * 5%}
  &.six {width: $gridPercent * 6%}
  &.seven {width: $gridPercent * 7%}
  &.eight {width: $gridPercent * 8%}
  &.nine {width: $gridPercent * 9%}
  &.ten {width: $gridPercent * 10%}
  &.span {
    @for $i from 1 through $gridWhole {
      &-#{$i} {width: $gridPercent * $i * 1%; }
    }
  }
  &.order {
    @for $i from 1 through $gridWhole {
      &-#{$i} {order: $i; }
    }
  }
  &.offset {
    @for $i from 1 through $gridWhole {
      &-#{$i} {margin-left: $gridPercent * $i * 1%; }
    }
  }
}
@media all and (max-width: #{$bp-tablet - 1px}) {
  .fe-grid {
    .column {
      &.span {
        @for $i from 1 through $gridWhole {
          &-xs-#{$i} {width: $gridPercent * $i * 1% !important; }
        }
      }
      &.offset {
        @for $i from 1 through $gridWhole {
          &-xs-#{$i} {margin-left: $gridPercent * $i * 1% !important; }
        }
      }
    }
  }
}
@media all and (min-width: #{$bp-tablet}) and (max-width: #{$bp-laptop - 1px}) {
  .fe-grid {
    .column {
      &.span {
        @for $i from 1 through $gridWhole {
          &-sm-#{$i} {width: $gridPercent * $i * 1% !important; }
        }
      }
      &.offset {
        @for $i from 1 through $gridWhole {
          &-sm-#{$i} {margin-left: $gridPercent * $i * 1% !important; }
        }
      }
    }
  }
}
@media all and (min-width: #{$bp-laptop}) and (max-width: #{$bp-desktop - 1px}) {
  .fe-grid {
    .column {
      &.span {
        @for $i from 1 through $gridWhole {
          &-md-#{$i} {width: $gridPercent * $i * 1% !important; }
        }
      }
      &.offset {
        @for $i from 1 through $gridWhole {
          &-md-#{$i} {margin-left: $gridPercent * $i * 1% !important; }
        }
      }
    }
  }
}
</style>