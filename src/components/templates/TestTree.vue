<template>
    <div class="organization-tree" :class="`level-${level}`">
        <div class="tree-title" :style="{paddingLeft: setLevelIndent+'px'}" :class="{selected: isSelected || header.id === selectedNode}">
            <div class="arrow-icon" @click.stop="toggleExpand"><i class="fa fa-chevron-down"  v-show="treeList.length > 0"></i></div>
            <div class="title-wrap" @click.stop="selectItem(header)">
                <span>{{header.attributes.name}}</span>
            </div>
        </div>
        <div class="tree-contents" :class="{open:isExpanded}" :style="hideStyle">
            <div class="content-wrapper" v-for="(child) in treeList" :key="child.id">
                <test-tree :base="base" :header="child.h" :child="child.c" :level="level+1" :selected-node="selectedNode" @select="selectItem" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'test-tree',
        data () {
            return {
                treeList: [],
                isExpanded: false,
                isSelected: false
            }
        },
        props: {
            base: Array,
            header: Object,
            child: Array,
            level: Number,
            selectedNode: [String, Number]
        },
        computed: {
            setLevelIndent() {
                return (this.level) * 20;
            },
            hideStyle() {
                return this.isExpanded ? {} : {width: 0, height: 0}
            }
        },
        mounted() {
            this.child.forEach(el => {
                let child = this.base.filter(item => el.id === `${item.attributes.parent_node_id}`)
                this.treeList.push({h: el, c:child})
            })
        },
        methods: {
            toggleExpand() {
                this.isExpanded = !this.isExpanded;
            },
            selectItem(item = null) {
                if(this.isSelected) return
                this.isSelected = true;
                this.$emit('select', item || this.header, this.isSelected)
            },
        }
    }
</script>

<style lang="scss">

    $title-background-color: #f8f8f8;
    $title-color: #333333;
    $arrow-color: #909090;
    $content-padding: 11px;
    .tree-title {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px;
        &:hover {
            background-color: #EFF4FC;
        }
        &.selected .title-wrap{
            color: #2985DB;
        }
        .title-wrap{
            color: #333;
            position: relative;
            & > span {
                display: inline-block;
                padding: 0 4px;
            }
            .tree-icon {
                color: #909090;
                line-height: 1;
            }
        }
        .arrow-icon{
            cursor: pointer;
            min-width: 20px;
            font-size: 8px;
            padding: 0 6px;
            transition: transform 250ms ease;
            justify-content: flex-end;
            color: #909090;
            &.expanded{
                transform: rotate(-90deg);
            }
        }
    }
    .tree-contents {
        transition: all 50000ms;
        overflow: hidden;
        visibility: hidden;
        &.open {
            visibility: visible;

        }
    }
</style>