<template>
    <div class="contents-dialog" ref="context" :class="[contextType]">
        <transition name="slide-fade">
            <div class="dialog" v-show="isShow"  ref="dialog" :style="[style,{ width: `${width}px`}]" :class="[{arrow}, placements.position, placements.direction, {active:isShow}]">
                <div class="dialog-wrap" v-if="isShow" :class="{round}">
                    <slot name="menu">
                        <div ref="menu" class="context-menu dropdown-menu">
                            <div class="context-group dropdown-items-group" v-for="group in menuList" :key="group.id">
                                <div class="context-item context-title dropdown-title" v-if="group.title !== ''"></div>
                                <div class="context-item" v-for="(item, i) in group.list" :key="`${group.id}_${i}`" >
                                    <context-item :depth="depth" :sub-menu-count="subMenuCount" :context-item="item" :round-child="round" :is-children="item.children != undefined" @itemClick="selectItem" />
                                </div>
                            </div>
                        </div>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import ContextItem from "./ContextItem";
    export default {
        name: 'hw-context-menu',
        components: {ContextItem},
        data () {
            return {
                isShow: false,
                top: 0,
                left: 0,
                data: null,
                interval: 0,
                parent: {x: 0, y:0},
                menuInfo: {
                    width: 0,
                    height: 0
                },
                depth: 0,
                subMenuCount: 0,
                posInfo: {}
            }
        },
        props: {
            contentsData: Object,
            contextType: {
                type: String,
                default: 'context'
            },
            contextPos: {
                type: Object,
                default: () => {
                    return {top:0, left:0, width: 0, height:0}
                }
            },
            posType: {
                type: String,
                default: 'bottom-end'
            },
            open: Boolean,
            arrow: {
                type: Boolean,
                default: false
            },
            menuList: Array,
            trigger: Boolean,
            width: String,
            target: [Event, Object],
            parentPos: {
                type: Object,
                default: () => {
                    return {x:0, y:0}
                }
            },
            round: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            style () {
                this.showDialog();
                return this.isShow ? { top: `${this.top}px`, left: `${this.left}px`} : null
            },
            placements () {
                let placement = this.posType.split('-');
                return {position:placement[0], direction:placement[1]};
            }
        },
        watch: {
            open(value) {
                this.reset();
                this.posInfo = this.contextPos;

                if(value) {
                    this.setPosition();
                }
                this.$nextTick(this.setOpen(value))
            },
            menuList() {
                console.log(this.menuList)
            }
        },
        created () {
            this.data = this.contentsData;
        },
        mounted() {
            this.parent = this.setRelativePos();
            document.body.addEventListener('click', () => {
                console.log('close')
                if(this.isShow) {
                    this.setOpen(false);
                    this.$emit('close');
                }
            });
            // this.$nextTick(() => {
            //     this.getMenu();
            // })
            this.getMenu();
        },
        update() {
          this.getMenu();
          console.log('update');
        },
        destroyed() {
            document.body.removeEventListener('click', () => {this.setOpen(false)});
            this.reset();
        },
        methods: {
            setPosition() {
                if(this.contextType === 'context') return;
                this.posInfo = this.target.target.getBoundingClientRect();
            },
            getMenu() {
                // if(!this.isShow) return;
                console.log("menu:",this.menuList);
                this.menuInfo.width = this.$refs.dialog.clientWidth;
                this.menuInfo.height = this.$refs.dialog.clientHeight;
            },
            reset () {
                this.setOpen(false);
                this.top = 0;
                this.left = 0;
                this.data = null;
            },
            setOpen (value = true) {
                if(this.isShow) this.isShow = false;
                this.isShow = value;
            },
            setRelativePos () {
                if(this.contextType === 'context') return;
                let parent = {}
                let parentPos = this.$refs.context.getBoundingClientRect();
                parent.x = parentPos.left;
                parent.y = parentPos.top;
                return parent
            },
            showDialog () {
                let positioning = {top: 0, left: 0};
                let parentOffset = {x:0, y: 0};
                let posData = this.checkPos(this.menuInfo, this.placements.position, this.posInfo);
                console.log(this.posInfo);
                if(this.contextType === 'dropdown') {
                    this.interval = 10;
                    parentOffset = this.setRelativePos();
                    console.log(parentOffset)
                }

                if (posData.pos === 'bottom') {
                    positioning.top = this.posInfo.height + this.interval;
                } else if (posData.pos === 'top'){
                    positioning.top = -(this.menuInfo.height + this.interval);
                }else if (posData.pos === 'right') {
                    positioning.left = this.posInfo.width + this.interval;
                } else if (posData.pos === 'left') {
                    positioning.left = -(this.menuInfo.width + this.interval);
                } else {
                    console.log("error: wrong positioning data");
                }

                this.top = this.posInfo.top + positioning.top - parentOffset.y - posData.dic.top;
                this.left = this.posInfo.left + positioning.left - parentOffset.x - posData.dic.left;
            },
            checkPos(menu, placement, target) {
                let wW = window.innerWidth;
                let wH = window.innerHeight;
                let position = '';
                let direction = {top:0, left:0};
                let checkSet = {
                    top: target.top,
                    left: target.left,
                    bottom: wH - target.top + target.height,
                    right: wW - target.left + target.width
                };
                switch(placement) {
                    case 'top':
                        position = (checkSet[placement] - menu.height  > 0) ? placement : 'bottom';
                        break;
                    case 'bottom':
                        position = (checkSet[placement] - menu.height > 0) ? placement : 'top';
                        break;
                    case 'left':
                        position = 'right';
                        break;
                    case 'right':
                        position = (checkSet[placement] - menu.width > 0) ? placement : 'left';
                        break;
                    default:
                        console.log('wrong placement')
                }
                let leftOffset = 0;
                if(this.placements.direction === 'end') {
                    leftOffset = menu.width - target.width;
                }

                if(position === 'top' || position === 'bottom') {
                    direction.left = (checkSet.right - menu.width - target.width > 0) ? direction.left + leftOffset : direction.left = menu.width - target.width;
                } else {
                    direction.top = (checkSet.bottom - menu.height - target.height  > 0) ? direction.top : direction.top = menu.height - target.height;
                }


                this.subMenuCount = Math.floor(checkSet.right / (menu.width + 10) - 1);
                return {pos: position, dic: direction};

            },
            selectItem (target) {
                console.log("parent emit",target)
                this.$emit('select', target, this.contentsData);
                this.$emit('close')
            }
        }
    }
</script>

<style lang="scss" >
    .contents-dialog {
        position: absolute;
        margin: 0 10px;
        width: 0;
        height: 0;
        top:0;
        left: 0;
        z-index: 9999;
        .dialog {
            min-width: 14em;
            height: auto;
            position: relative;
            z-index: 9999;

            .dialog-wrap {
                &.round .context-menu{
                    border-radius: 4px;
                }
            }
            .context-menu {
                background-color: #fff;
                padding: 5px;
                border: 1px solid #d8d8d8;
                box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
                .context-group {
                    border:0;
                    margin: 0;

                    /*margin-bottom: 5px;*/
                    /*border-bottom: 1px solid #d8d8d8;*/
                    &:first-child .context-title{
                        border: 0;
                    }
                }
                .context-item{
                    cursor: pointer;
                    color: #676767;
                    font-size: 14px;
                    position: relative;
                    background-color: #fff;
                    /*height: 34px;*/
                    &.context-title {
                        pointer-events: none;
                        border-bottom: 1px solid #d8d8d8;
                    }
                    .item-wrapper {
                        width: 100%;
                        padding: 10px;
                    }
                    .item-title {
                        display: flex;
                        align-items: center;
                        i {
                            color: #909090;
                            margin-right: 8px;
                        }
                    }
                    .item-dropdown-icon {
                        font-size: 0.8em;
                        position: absolute;
                        top:0;
                        right: 0;
                        padding: 1.2em;
                    }
                    &:hover {
                        background-color: #eff4fc;
                    }
                }

            }
            &.arrow {
                position: relative;
                &:before {
                    content: '';
                    position: absolute;
                    top: -0.4em;
                    left: 0.7em;
                    border: inherit;
                    //border-right: 0;
                    //border-bottom: 0;
                    background-color: #fff;
                    width: 0.8em;
                    height: 0.8em;
                    /*border-radius-top-left: 2px;*/
                    transform:rotate(45deg);
                }
                &.right:before {
                    top:0.7em;
                    left: -0.4em;
                }
                &.top:before {
                    top:calc(100% - 0.3em);
                    left: 0.7em;
                    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
                }
            }
            &.child {
                padding: 10px;
            }
        }
        .dialog-background {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top:0;
            left: 0;
            /*background-color: rgba(0, 0, 0, 0.16);*/
            z-index: 999;
        }
        &.context {
            .dialog {
                position: fixed;
            }
        }
    }

    .slide-fade-enter-active {
        transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
    }
    .slide-fade-leave-active {
        /*transition: all 0ms ease-in-out;*/
    }
    .slide-fade-enter, .slide-fade-leave {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>