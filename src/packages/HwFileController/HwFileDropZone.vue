<template>
    <div
      class="hw-file-drop-zone"
      @dragenter.stop="onDragEnter"
      @dragleave.stop="onDragLeave"
      @dragover.prevent
      @drop="onDrop"
    >
    </div>
</template>
<script>
export default {
  name: 'hw-file-drop-zone',
  props: {},
  methods: {
    onDragEnter () {
      this.$emit('drop-zone-enter')
    },
    onDragLeave () {
      this.$emit('drop-zone-leave')
    },
    onDrop (event) {
      event.preventDefault()
      this.$emit('drop-file', [...event.dataTransfer.files])
    }
  }
}
</script>
