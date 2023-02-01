<template>
    <div class="hw-breadcrumb" :class="[type, {inline}]">
        <template v-for="(item, index) in parentsList">
            <template  v-if="index === 1 && isHidePath">
                <div class="hide-middle-node" :key="index">
                    <div class="hw-button circle icon"><i class="fa fa-ellipsis-h"></i></div>
                    <span class="divider">
                        <slot name="divider">{{divider}}</slot>
                    </span>
                </div>
            </template>
            <div v-else class="level-node parents-level" :key="index" :style="{maxWidth: `${setMaxSize}%`}"
                 :class="[{hide:isHidePath},{root:index === 0},{current: index === parentsList.length - 1},{parent: index === parentsList.length - 2}]">
    <!--            <span class="tooltip" v-hw-tooltip="item.title"></span>-->
                <div class="node-wrap ellipsis" :class="{linked:item[linkKey] !== ''}" @click="selectPath(item, index)" v-hw-tooltip="item.title">
                    <span class="bc-icon" v-if="isIcon"><i class="fa" :class="[`fa-${item.icon}`]"></i></span>
                    <span class="title">{{item.title}}</span>
<!--                    <span v-if="useTooltip" class="tooltip" v-hw-tooltip="item.title"></span>-->
                </div>
                <span class="divider">
                    <slot name="divider">{{divider}}</slot>
                </span>
            </div>

        </template>
    </div>
</template>

<script>
    export default {
        name: 'hw-breadcrumb',
        data () {
            return {
            }
        },
        props: {
            type: {
                type: String,
                default: 'divider'
            },
            inline: {
                type: Boolean,
                default: false
            },
            parentsList: {
                type: Array,
                default () {
                    return []
                }
            },
            activeLevel: {
                type: String,
                default: ''
            },
            divider: {
                type: String,
                default: '>'
            },
            isIcon: {
                type: Boolean,
                default: false
            },
            linkPrefix: {
                type: String,
                default: ''
            },
            displayPath: {
                type: Number,
                default: 999
            },
            idKey: {
                type: String,
                default: 'id'
            },
            linkKey: {
                type: String,
                default: ''
            },
            useTooltip: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            isHidePath() {
                return this.displayPath < this.parentsList.length
            },
            setMaxSize() {
                return 100/(this.parentsList.length)
            },
            setTooltip() {
                return {'v-hw-tooltip': 'text'}
            }
        },
        methods: {
            selectPath(target, i) {
                this.$emit('move', target, i)
            }
        }
    }

</script>

<style lang="scss">
    .hw-breadcrumb {
        display: flex;
        flex-direction: row;
        width: 100%;
        .parents-level {
            display: flex;
            &.middleNode {
                /*max-width: calc(100% / 5);*/
                /*flex-shrink: 1;*/
            }
        }
        &.inline {
            display: inline-flex;
        }
        &.column {
            flex-direction: column;
        }
        .folder-menu-btn,
        .level-node {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 18px 0 2px;
            /*&:hover {*/
            /*    max-width: 100% !important;*/
            /*}*/
            .node-wrap {
                position: relative;
                padding: 4px 8px;
                display: inline-block;
                .bc-icon {
                    margin-right: 10px;
                }
                &.linked:hover{
                    background-color: #f2f2f2;
                }
                .tooltip {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    left: 0;
                    bottom: 0;
                    &:hover {
                        background-color: #909090;
                    }
                }
            }
            &.active-level .title {
                color: #2985DB;
            }
            .divider {
                width: 18px;
                padding: 4px;
                position: absolute;
                top:0;
                right: 0;
                text-align: center;
                i {
                    font-size: 0.8em
                ;}
            }
            a.title {
                display: inline;
            }
            &.hide {
                display: none;
            }
            &.root {
                display: flex;
                max-width: 50% !important;
                .node-wrap:hover {
                    background-color: #f2f2f2;
                }
            }
            &.parent {
                display: flex;
                flex-shrink: 0;
            }
            &.current {
                display: flex;
                padding: 0;
                max-width: 50% !important;
                flex-shrink: 0;
                .divider {
                    display: none;
                }
            }
        }
        .hide-middle-node {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 30px 0 15px;
            .divider {
                width: 18px;
                padding: 4px;
                position: absolute;
                top:0;
                right: 0;
                text-align: center;
                i {
                    font-size: 0.8em
                ;}
            }
        }

    }
</style>