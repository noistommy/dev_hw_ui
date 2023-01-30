<template>
    <div class="item-wrapper" @click="selectItem" @mouseenter="openSubMenu" @mouseleave="close">
        <div class="item-title">
            <template v-if="contextItem.icon">
                <i :class="contextItem.icon"></i>
            </template>
            <span>{{contextItem.option}}</span>
        </div>
        <template v-if="isChildren">
            <div class="item-dropdown-icon" >
                <i class="gi gi-short-arrow-right-alt"></i>
            </div>
            <div class="child-menu" v-if="isOpen" :class="directionSub">
                <div class="dialog child" >
                    <div class="dialog-wrap" :class="{round: roundChild}">
                        <div class="context-menu">
                            <div class="context-item" v-for="(child, i) in contextItem.children" :key="`${childDepth}_${i}`" >
                                <context-item :depth="childDepth" :sub-menu-count="subMenuCount" :context-item="child" :is-children="child.children != undefined" @itemClick="passiveItem"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </template>
    </div>
</template>

<script>
    import ContextItem from './ContextItem'
    export default {
        name: 'context-item',
        components: {ContextItem},
        data() {
            return {
                isOpen: false,
                childDepth: 0
            }
        },
        props: {
            depth: Number,
            contextItem: Object,
            isChildren: {
                type: Boolean,
                default: false
            },
            subMenuCount: Number,
            roundChild: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            directionSub() {
                return this.childDepth <= this.subMenuCount ? 'right' : 'left';
            }
        },
        created() {
            this.childDepth = this.depth + 1
        },
        methods: {
            selectItem() {
                if(this.isChildren) return;
                console.log("click data",this.depth)
                this.$emit('itemClick', this.contextItem)

            },
            passiveItem(target) {
                console.log("passed data",target,this.depth)
                this.$emit('itemClick', target)
            },
            openSubMenu() {
                if(!this.isChildren) return;
                console.log('open menu')
                this.isOpen = true;
            },
            close() {
                if(!this.isChildren) return;
                console.log('close menu')
                this.isOpen = false;
            }
        }
    }
</script>

<style lang="scss">
    .child-menu {
        padding: 0 10px;
        position: absolute !important;
        width: inherit;
        height: 100%;
        top:0;
        z-index: 99999;
        &.right {
            left: 100%;
        }
        &.left {
            right: 100%;
        }
        &.context-menu {
            padding: 10px;
        }
    }
</style>