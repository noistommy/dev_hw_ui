<template>
  <div class="hw-counter hw-input icon button left inline">
    <i :class="[lIcon,{disabled: isNegative}]" @click="clickLeft"></i>
    <input type="text" class="hw-input" :class="[{readonly}]" :readonly="readonly" v-model="counter">
    <i :class="[rIcon]" @click="clickRight"></i>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      counter: 0,
      leftIcon: 'gis gi-minus',
      rightIcon: 'gis gi-plus',
    }
  },
  props: {
    negative: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    iconType: {
      type: String,
      default: 'math'
    },
    lIcon: {
      type: String,
      default: 'gis gi-minus'
    },
    rIcon: {
      type: String,
      default: 'gis gi-plus'
    },
    value: {
      type: [String || Number],
      default: null
    }
  },
  computed: {
    isNegative() {
      return this.counter <= 0 && !this.negative
    }
  },
  watch: {
    $value() {
      this.counter = this.value
    }
  },
  created() {

  },
  methods: {
    clickLeft() {
      this.counter--
      this.$emit('left', this.counter)
    },
    clickRight() {
      this.counter++
      this.$emit('right', this.counter)
    }
  }
}
</script>


<style lang="scss" scoped>
.hw-counter {
  min-width: 150px;
  width: 200px;
  &> input.hw-input {
    position: relative;
    z-index: 1;
    text-align: center;
    //font-weight: 600;
  }
  &> i {
    margin: 0 -1px;
    &.disabled {
      color: #ddd;
      pointer-events: none;
    }
  }
}
</style>