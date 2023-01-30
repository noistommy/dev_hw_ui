<template>
    <div
      class="g-row"
      :style="checkWidth"
    >
      <div
        class="g-item-wrap"
        :class="[isInternalNode ? '--g-item-parent' : '']"
        ref="pos"
        :draggable="isDraggable && !isEditing"
        @dragstart="emitDragStartSignal"
        @dragover.prevent
        @drop="emitDropSignal"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <div class="g-item --g-item-text">
          <div v-if="!isEditing">
            <span class="g-name">{{this.selfNode.name}}</span>
            <span class="g-count" v-if="!isEditing">{{checkItemCount}}</span>
          </div>
          <div v-else>
            <input
              class="g-edit-input"
              type="text"
              v-focus
              :value="editName"
              :placeholder="makePlaceHolder"
              @keypress.enter="updateName"
              @input="onEdit"
            >
          </div>
        </div>
        <div
          class="g-item-group"
          @mousedown.prevent
        >
          <div
            class="g-item --g-item-button"
            v-if="!isMaxLevel"
            @click.stop="emitCreateSignal"
          >
            <span class="g-icon-wrap ">
              <i :class="createIcon"></i>
            </span>
          </div>
          <div
            class="g-item --g-item-button"
            v-if="isRoot"
            @click.stop="emitDeleteSignal"
          >
            <span class="g-icon-wrap">
              <i :class="deleteIcon"></i>
            </span>
          </div>
          <div
            class="g-item --g-item-button"
            @click.stop="!isEditing ? emitEditSignal() : updateName()"
          >
            <span v-show="!isEditing" class="g-icon-wrap">
              <i :class="editIcon"></i>
            </span>
            <span v-show="isEditing" class="g-icon-wrap">
              <i :class="updateIcon"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'g-node',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      isEditing: false,
      isHovering: false,
      editName: this.selfNode.name || this.defaultNodeName
    }
  },
  props: {
    level: Number,
    maxLevel: Number,
    width: Number,
    defaultNodeName: String,
    selfNode: Object,
    parentNode: {
      type: Object,
      default: () => null
    },
    createIcon: String,
    deleteIcon: String,
    editIcon: String,
    updateIcon: String,
    GBus: Object
  },
  computed: {
    isDraggable () {
      return (this.level >= 2 && this.level <= this.maxLevel)
    },
    isInternalNode () {
      return (this.selfNode.children && this.selfNode.children.length > 0)
    },
    isMaxLevel () {
      return this.level >= this.maxLevel
    },
    isRoot () {
      return !!this.parentNode
    },
    makeName () {
      return (this.selfNode.name || this.defaultNodeName) + (this.isInternalNode ? `(${this.selfNode.children.length})` : '')
    },
    makePlaceHolder () {
      return this.selfNode.name || this.defaultNodeName
    },
    checkWidth () {
      return {
        flex: `0 0 ${this.width}px`
      }
    },
    checkItemCount () {
      return this.selfNode.children.length >= 1 ? this.selfNode.children.length : ''
    }
  },
  methods: {
    checkIsUnlocked () {
      return this.GBus.isUnlocked()
    },
    emitDeleteSignal () {
      if (!this.GBus.isUnlocked()) return
      this.removeChild()
      this.GBus.$emit('g-delete')
      this.$emit('g-delete', {
        done: this.emitDoneSignal
      })
    },
    emitCreateSignal () {
      if (!this.GBus.isUnlocked()) return
      this.selfNode.children.push({
        id: Math.random(),
        name: this.defaultNodeName,
        children: []
      })
      this.GBus.$emit('g-create')
      this.$emit('g-create', {
        done: this.emitDoneSignal,
        name: this.defaultNodeName
      })
    },
    emitEditSignal () {
      if (!this.GBus.isUnlocked()) return
      this.isEditing = true
      this.GBus.$emit('g-edit')
    },
    emitUpdateSignal () {
      this.GBus.$emit('g-edit-end')
      this.$emit('g-update', {
        done: this.emitDoneSignal,
        name: this.editName
      })
    },
    emitDragStartSignal () {
      if (!this.isDraggable) return
      this.GBus.$emit('g-drag-start', {
        dragNode: this.selfNode,
        dragNodeParent: this.parentNode,
        notAllowed: this.getChildrenNodes(this.selfNode),
        maxNodeDepth: this.getMaxNodeDepth(this.selfNode)
      })
    },
    emitDropSignal () {
      if (!this.GBus.isUnlocked()) return
      this.GBus.$emit('g-drop', {
        dropNode: this.selfNode,
        level: this.level,
        maxLevel: this.maxLevel
      })
      if (!this.GBus.checkDroppable()) return
      this.$emit('g-drop', {
        done: this.emitDoneSignal,
        path: [this.GBus.getDragNodeId(), this.selfNode.id]
      })
    },
    emitDoneSignal () {
      this.GBus.$emit('g-task-done')
    },
    onEdit (event) {
      this.editName = event.target.value
    },
    updateName () {
      if (this.editName.length === 0) return
      if (this.selfNode.name !== this.editName) {
        this.selfNode.name = this.editName
        this.emitUpdateSignal()
      } else {
        this.emitDoneSignal()
      }
      this.isEditing = false
    },
    onMouseEnter () {
      this.isHovering = true
    },
    onMouseLeave () {
      this.isHovering = false
    },
    removeChild () {
      this.parentNode.children = this.parentNode.children.filter(child => child !== this.selfNode)
    },
    getChildrenNodes (selfNode) {
      const childrenNodes = []
      const nodeIterator = [selfNode]
      while (nodeIterator.length !== 0) {
        const nextNode = nodeIterator.shift()
        if (nextNode.children.length > 0) {
          childrenNodes.push(...nextNode.children)
          nodeIterator.push(...nextNode.children)
        }
      }
      return childrenNodes
    },
    getMaxNodeDepth (selfNode) {
      let nodeList = [selfNode]
      let depth = 1
      while (nodeList.length !== 0) {
        const nextInternalNodes = this.findInternalNodes(nodeList)
        if (nextInternalNodes.length === 0) break
        depth += 1
        nodeList = [...nextInternalNodes]
      }
      return depth
    },
    findInternalNodes (nodeList) {
      return nodeList.reduce((acc, curr) => {
        if (curr.children.length > 0) {
          acc.push(...curr.children)
        }
        return acc
      }, [])
    }
  }
}
</script>
<style lang="scss">
    $color-g-item-border: #d9d9d9;
    $color-g-count: #3089dc;
    $color-g-item-button-hover: #ecedef;
    $color-g-item-button: #bfbfbf;

    .g-row{
      flex: 0 0 auto;
      .g-item-wrap{
        display: flex;
        padding: 10px 15px;
        position: relative;
      }
      .--g-item-parent::after{
        content: '';
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 7px solid cornflowerblue;
        position: absolute;
        right: -4px;
        top: 20px
      }
      .g-item-group{
        display: flex;
      }
      .g-item{
          background-color: #ffffff;
          padding: 4px 8px;
      }
      .test{
        display: flex;
      }
      .g-item{
        flex: 1 1 0;
      }
      .--g-item-text{
        padding-left: 10px;
      }
      .--g-item-button{
        color: $color-g-item-button;
        cursor: pointer;
      }
      .--g-item-button:hover{
        background-color: #ecedef;
      }
      .g-icon-wrap{
        font-size: 12px;
      }
      .g-name{
        font-size: 14px;
      }
      .g-count{
        font-size: 14px;
        margin-left: 4px;
        color: $color-g-count;
        font-weight: 600;
      }
      .g-edit-input{
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        font-size: 14px;
      }
    }
</style>
