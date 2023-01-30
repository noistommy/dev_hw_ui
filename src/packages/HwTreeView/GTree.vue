<template>
    <div class="next-wrap">
      <g-node
        :level="checkOwnLevel"
        :maxLevel="maxLevel"
        :width="width"
        :defaultNodeName="defaultNodeName"
        :selfNode="treeData"
        :parentNode="checkParentNode"
        :createIcon="createIcon"
        :deleteIcon="deleteIcon"
        :editIcon="editIcon"
        :updateIcon="updateIcon"
        :GBus="GBus"
        @g-create="onCreate"
        @g-update="onUpdate"
        @g-delete="onDelete"
        @g-drop="onDrop"
      >
      </g-node>
      <div>
        <g-tree
          :key="childNode.id"
          :level="checkOwnLevel"
          :maxLevel="maxLevel"
          :width="width"
          :treeData="childNode"
          :defaultNodeName="defaultNodeName"
          :createIcon="createIcon"
          :deleteIcon="deleteIcon"
          :editIcon="editIcon"
          :updateIcon="updateIcon"
          :GBus="GBus"
          v-for="childNode in treeData.children"
          @g-create="onCreate"
          @g-update="onUpdate"
          @g-delete="onDelete"
          @g-drop="onDrop"
        >
        </g-tree>
      </div>
    </div>
</template>
<script>
import GNode from './GNode'
// import GTree from './GTree'
import { createGBus } from './GBus'
export default {
  name: 'g-tree',
  components: {
    GTree: () => require('./GTree.vue'),
    GNode
  },
  props: {
    treeData: Object,
    defaultNodeName: String,
    createIcon: String,
    deleteIcon: String,
    editIcon: String,
    updateIcon: String,
    level: {
      type: Number,
      default: 0
    },
    GBus: {
      type: Object,
      default: () => createGBus()
    },
    maxLevel: Number,
    width: Number
  },
  computed: {
    checkOwnLevel () {
      return this.level + 1
    },
    checkNodeName () {
      return this.treeData.name || this.defaultNodeName
    },
    checkParentNode () {
      /* 해당 노드가 루트인경우 */
      if (!this.$parent.treeData) return null
      /* 해당 노드가 루트이며 사용자 뷰에서 키값을 동일하게 준 경우 */
      if (this.treeData === this.$parent.treeData) return null
      return this.$parent.treeData
    }
  },
  methods: {
    onCreate ({ done, name, path = [] }) {
      console.log('트리 : 노드생성')
      path.unshift(this.treeData.id)
      this.$emit('g-create', {
        done,
        name,
        path
      })
    },
    onUpdate ({ done, name, path }) {
      console.log('트리 : 노드수정')
      this.$emit('g-update', {
        done,
        name,
        path: path || [this.treeData.id]
      })
    },
    onDelete ({ done, path }) {
      console.log('트리 : 노드삭제')
      this.$emit('g-delete', {
        done,
        path: path || [this.treeData.id]
      })
    },
    onDrop ({ done, path }) {
      console.log('트리 : 노드이동')
      this.$emit('g-drop', {
        done,
        path
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active{
    transition: opacity .5s ease;
  }

  .fade-enter{
    opacity: 0;
  }
  .fade-enter-to{
    opacity: 1;
  }
  .fade-leave{
    opacity: 1;
  }
  .fade-leave-to{
    opacity: 0;
  }

  .next-wrap{
    display: flex;
  }
</style>
