<template>
  <div class="hw-tag" :class="[color, type]" draggable="true" @click="selectTag">
    <template v-if="type === 'label'">{{tagText}}</template>
  </div>
</template>

<script>
export default {
  name: 'hw-tag',
  data () {
    return {
    }
  },
  props: {
    idx: Number,
    type: {
      type: String,
      default: 'line' //'line', 'dot', 'label'
    },
    color: String,
    tagText: String
  },
  created() {
    if(this.tags != undefined) {
      this.tagList = this.tags;
    }

  },
  methods: {
    selectTag() {
      this.$emit('select-tag', this.idx)
    }
  }
}
</script>

<style lang="scss">
.hw-tag {
  display: inline-block;
  border-style: solid;
  border-radius: 0.6em;
  margin: 3px;
  font-weight: 600;
  &.line {
    border-width: 4px;
    width: 80px;
    min-width: 30px;
  }
  &.dot {
    border-radius: 8px;
    border-width: 8px;
    width:0;
    height:0;
  }
  &.label {
    vertical-align: baseline;
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1;
    border-radius: 8px;
    font-family: 'Spoqa Han Sans';
    display: inline-block;
    margin: 0 0.14285714em;
    background-color: #e8e8e8;
    background-image: none;
    padding: 0.5833em 0.833em;
    text-transform: none;
    border: 0 solid transparent;
    transition: background .1s ease;
  }
}
</style>