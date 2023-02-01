<template>
    <div class="hw-file-name-item" :style="itemStyle">
      <div class="file-icon">
        <img v-if="extensions.includes(file.ext)" :src="`https://static.hiworks.com/office/static/images/file_icon/${file.ext}.png`">
      </div>
      <div class="file-text">
        <div class="file-name">
          {{file.title}}
        </div>
        <div class="file-size">
          ({{file.size | formatDataSize}})
        </div>
      </div>
      <span class="remove-btn" @click="removeFile(file.id)">
        <i class='fa fa-cancel'></i>
      </span>
    </div>
</template>
<script>
export default {
  name: 'hw-file-name-item',
  data () {
    return {}
  },
  filters: {
    formatDataSize (value, point = 1) {
      const KB = 1024
      const MB = Math.pow(1024, 2)
      const GB = Math.pow(1024, 3)
      let out = ''
      if (value < KB) out = value + ' B'
      else if (KB <= value && value < MB) out = (value / KB).toFixed(point) + ' KB'
      else if (MB <= value && value < GB) out = (value / MB).toFixed(point) + ' MB'
      else if (GB <= value) out = (value / GB).toFixed(point) + ' GB'
      return out
    }
  },
  inject: ['extensions'],
  props: {
    file: {
      type: Object
    },
    index: {
      type: Number
    },
    listGap: {
      type: Number
    }
  },
  computed: {
    itemStyle () {
      return {
        'margin-bottom': `${this.listGap}px`
      }
    }
  },
  methods: {
    removeFile (index) {
      this.$emit('remove-file', index)
    }
  }
}
</script>
