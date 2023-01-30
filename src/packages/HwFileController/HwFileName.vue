<template>
    <div class="hw-file-name" :style="nameStyle">
      <hw-file-name-item
        v-for="file in otherFiles"
        :key="file.id"
        :file="file"
        :listGap="listGap"
        @remove-file="removeFile"
      />
    </div>
</template>
<script>
import HwFileNameItem from './HwFileNameItem'
export default {
  name: 'hw-file-name',
  components: {
    HwFileNameItem
  },
  props: {
    imageGap: {
      type: Number
    },
    listGap: {
      type: Number
    },
    otherFiles: {
      type: Array
    }
  },
  computed: {
    nameStyle () {
      return this.otherFiles.length > 0 ? {
        padding: `${this.imageGap}px`,
        paddingTop: `${this.imageGap / 2}px`
      } : { padding: '0px' }
    }
  },
  methods: {
    removeFile (id) {
      this.$emit('remove-file', {
        type: 'not-image',
        id
      })
    }
  }
}
</script>
