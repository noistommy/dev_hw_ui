<template>
  <div
    class="hw-file-preview"
    :style="previewStyle"
  >
    <hw-file-preview-item
      v-for="file in imageFiles"
      :key="file.id"
      :file="file"
      :imageFit="imageFit"
      :imageGap="imageGap"
      :itemInRow="itemInRow"
      @remove-file="removeFile"
    />
  </div>
</template>
<script>
import HwFilePreviewItem from './HwFilePreviewItem'
export default {
  name: 'hw-file-preview',
  components: {
    HwFilePreviewItem
  },
  props: {
    areaGap: {
      type: Number
    },
    imageGap: {
      type: Number
    },
    itemInRow: {
      type: Number
    },
    imageFit: {
      type: String
    },
    imageFiles: {
      type: Array
    },
    otherFiles: {
      type: Array
    }
  },
  computed: {
    previewStyle () {
      return {
        'margin-bottom': (this.imageFiles.length > 0 && this.otherFiles.length > 0) ? `${this.areaGap}px` : 0,
        padding: this.imageFiles.length > 0 ? `0 ${this.imageGap / 2}px ${this.imageGap / 2}px ${this.imageGap / 2}px` : 0
      }
    }
  },
  methods: {
    removeFile (id) {
      this.$emit('remove-file', {
        type: 'image',
        id
      })
    }
  }
}
</script>
