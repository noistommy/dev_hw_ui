<template>
    <div
      class="hw-file-preview-item"
      :style="itemStyle"
      @mousedown.prevent
    >
      <span class="remove-btn">
        <i @click="removeFile(file.id)" class='fa fa-cancel-alt'></i>
      </span>
      <div class="image-wrap" v-hw-tooltip.top.center="file.title">
        <img :style="imageStyle" :src="file.thumbnail_link" alt="image">
      </div>
    </div>
</template>
<script>
export default {
  name: 'hw-file-preview-item',
  props: {
    file: {
      type: Object
    },
    index: {
      type: Number
    },
    imageFit: {
      type: String
    },
    imageGap: {
      type: Number
    },
    itemInRow: {
      type: Number
    }
  },
  computed: {
    imageStyle () {
      return {
        'object-fit': this.imageFit
      }
    },
    itemStyle () {
      return {
        width: `${(100 / this.itemInRow)}%`,
        padding: `${this.imageGap / 2}px`
      }
    }
  },
  methods: {
    removeFile () {
      this.$emit('remove-file', this.file.id)
    }
  }
}
</script>
