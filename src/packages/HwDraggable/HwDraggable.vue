<template>
    <div
      @mousedown="onMouseDown"
      @dragstart="onDragStart"   
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover.prevent
      @drop="onDrop"
      @dragend="onDragEnd"
      ref="hw-draggable-wrapper"
    >
      <transition-group name="flip-list" tag="div">
        <slot></slot>
      </transition-group>
    </div>
</template>
<script>
export default {
  name: 'hw-draggable',
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    itemClass: {
      type: String,
      required: true
    },
    ghostClass: {
      type: String,
      default: '',
      required: false
    },
    handleClass: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      dragNode: null
    }
  },
  watch: {
    list: {
        handler(){
            this.setDraggable()
        },
        immediate: true
    }
  },
  methods: {
    setDraggable () {
        this.$nextTick(() => {
          this.$el.querySelectorAll(`.${this.itemClass}`).forEach(item => item.setAttribute('draggable', true))
        })
    },
    onMouseDown (event) {
      if(this.handleClass && !event.target.classList.contains(this.handleClass)) {
        event.preventDefault()
        return false
      }
    },
    onDragStart (event) { 
        if (this.isDragItem(event.target)) {
            this.dragNode = event.target
        }
    },
    onDragEnter (event) {
        const enterNode = event.target
        if (this.ghostClass) {
            this.dragNode.classList.add(this.ghostClass)
        }
        if (this.isDragItem(enterNode) && this.dragNode !== enterNode) {
            const dragIndex = this.getIndex(this.dragNode)
            const dropIndex = this.getIndex(enterNode)
            const temp = this.list.splice(dragIndex, 1)[0]
            this.list.splice(dropIndex, 0, temp)
        }
    },
    onDragLeave () {},
    onDrop () {
        if(this.ghostClass){
          this.dragNode.classList.remove(this.ghostClass)
        }
        this.dragNode = null
    },
    onDragEnd () {
        if(this.dragNode){
          if(this.ghostClass){
            this.dragNode.classList.remove(this.ghostClass)
          }
          this.dragNode = null
        }
    },
    isDragItem (node) {
        return node.classList.contains(this.itemClass)
    },
    getIndex (node) {
        return [...node.parentNode.childNodes].findIndex(childNode => node === childNode)
    },
  }
}
</script>
<style lang="scss">
.flip-list-move{
    transition: transform 0.25s;
}
</style>