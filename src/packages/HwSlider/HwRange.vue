<template>
  <div class="hw-range">
    <input ref="range" type="range" :disabled="disabled" :min="minValue" :max="maxValue" :step="stepSize" :value="sValue" @input="onInput" @change="onChange"  />
  </div>
</template>

<script>
export default {
  name: 'HwRange',
  data () {
    return {
      sValue: 0
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
    stepSize: {
      type: Number,
      default: 0.1
    },
    disabled: Boolean,
    value: [Number, String]
  },
  watch: {
    value() {
      this.sValue = this.value;
    }
  },
  created() {
    this.sValue = this.value;
  },
  methods: {
    onInput(e) {
      console.log("I",e.target.value)
      this.result = this.container * e.target.value / 100;
    },
    onChange(e) {
      console.log("C",e.target.value)
      this.result = this.container * e.target.value / 100;
    }
  }
}
</script>

<style lang="scss" scoped>
  .hw-range {}
</style>