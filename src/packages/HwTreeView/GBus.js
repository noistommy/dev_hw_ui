import Vue from 'vue'
export function createGBus () {
  return new Vue({
    data () {
      return {
        lockState: 'IDLE',
        dragNode: null,
        dragNodeParent: null,
        isDroppable: false,
        notAllowed: [],
        maxNodeDepth: 0
      }
    },
    created () {
      this.$on('g-create', () => {
        this.lockState = 'BUSY'
      })
      this.$on('g-edit', () => {
        this.lockState = 'WAIT'
      })
      this.$on('g-edit-end', () => {
        this.lockState = 'BUSY'
      })
      this.$on('g-delete', () => {
        this.lockState = 'BUSY'
      })
      this.$on('g-drag-start', ({ dragNode, dragNodeParent, notAllowed, maxNodeDepth }) => {
        this.dragNode = dragNode
        this.dragNodeParent = dragNodeParent
        this.notAllowed = notAllowed
        this.maxNodeDepth = maxNodeDepth
      })
      this.$on('g-drop', ({ dropNode, level, maxLevel }) => {
        if (this.notAllowed.includes(dropNode) ||
            this.dragNode === dropNode ||
            level + this.maxNodeDepth > maxLevel) {
          this.isDroppable = false
          return
        }
        this.isDroppable = true
        this.dragNodeParent.children = this.dragNodeParent.children.filter(child => child !== this.dragNode)
        dropNode.children.push(this.dragNode)
        this.lockState = 'BUSY'
      })
      this.$on('g-task-done', () => {
        this.lockState = 'IDLE'
        this.isDroppable = false
      })
    },
    methods: {
      isUnlocked () {
        return this.lockState === 'IDLE'
      },
      checkDroppable () {
        return this.isDroppable
      },
      getDragNodeId () {
        return this.dragNode.id
      }
    }
  })
}
