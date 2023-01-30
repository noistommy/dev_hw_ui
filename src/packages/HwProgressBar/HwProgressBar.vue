<template>
  <div class="hw-progress-bar">
    <span
      :class="[
        'bar-title',
        'ellipsis',
        `title-${titleAlign || 'top-left'}`,
      ]"
    >
      {{title}}
    </span>
    <div
      class="bar-item-ratio"
      :style="{width: item.ratio + '%'}"
      v-for="(item, index) in data"
      :key="index"
    >
      <span
        :class="[
          'bar-item-text',
          `text-${item.textAlign || 'center'}`,
          'ellipsis'
        ]"
      >
        {{item.text}}
      </span>
      <div
        :style="{width: item.progress + '%'}"
        :class="[
          'bar-item-progress',
          item.backgroundClass ? `hw ${item.backgroundClass} shape` : `hw ${colorSet[index % colorSet.length]} shape`
        ]"
      >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hw-progress-bar',
  props: {
    title: {
      type: String,
      default: 'Hw-Progress',
      required: false
    },
    titleAlign: {
      type: String,
      default: 'top-left',
      required: false,
    },
    data: {
      type: Array,
      default: () => [{
        text: 'defaultText',
        ratio: 100,
        progress: 100,
        backgroundClass: 'blue'
      }],
      required: false,
    },
    colorSet: {
      type: Array,
      default: () => [
        'red', 'orange', 'yellow', 'lightgreen',
        'green', 'lightblue', 'blue', 'deepblue',
        'purple', 'deeppurple', 'brown', 'gray'
      ]
    }
  },
  data () {
    return {}
  },
  methods:{}
}
</script>
<style lang="scss" scoped>
  $title-positions:
  ('top-left', 100%, 0, none),
  ('top-center', 100%, 50%, translateX(-50%)),
  ('top-right', 100%, 100%, translateX(-100%));
  .hw-progress-bar{
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 100%;
    border: 1px solid #d6d6d6;
    .bar-title{
      width: auto;
      white-space: nowrap;
      position: absolute;
      @each $title-position, $bottom, $left, $translateX in $title-positions{
        &.title-#{$title-position}{
          bottom: $bottom;
          left: $left;
          transform: $translateX;
        }
      }
    }
    .bar-item-ratio{
        position: relative;
      .bar-item-text{
        width: auto;
        position: absolute;
        display: inline-block;
        top: 50%;
        transform: translateY(-50%);
        white-space: nowrap;
        &.text-left{
          left: 0;
        }
        &.text-center{
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &.text-right{
          right: 0;
        }
      }
      .bar-item-progress{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: width 0.25s ease;
      }
    }
  }
</style>
