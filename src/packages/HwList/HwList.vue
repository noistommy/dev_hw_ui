<template>
    <div class="hw-list" :class="[listClass, {timeline}, {underLine}, {compact}, type, {draggable}, {connect:(timeline && listData.length > 1)}, {icon:withIcon}]"
         :style="{maxHeight: `${maxHeight}px`}">
        <div class="hw-item" v-for="(item, index) in listData" :key="item[selectionKey]"  :index="index"
             :draggable="draggable"
             :class="[itemClass,{selected:selectedItem === item[selectionKey] && !withButtons}]"
             @click="selectItem(item, index)">
<!--             @dragover.prevent="draggableEl('start', item.title)"-->
<!--             @drop="dropEl('drop')">-->
            <div class="item-title">
                <span class="list-icon" v-if="withIcon">
                    <i :class="item.iconClass"></i>
                </span>
                <slot :contentText="item">
                    {{item.title}}
                </slot>
            </div>
            <span class="check-icon" v-if="isSelectedIcon && selectedItem === item[selectionKey]">
                <i class="gis gi-check"></i>
            </span>
            <div class="btn-set" v-if="withButtons">
                <slot name="buttonSet" :indexNumber="index"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    // import SelectToDrag from './selectToDrag';
    export default {
        name: 'hw-list',
        data() {
            return {
                selectedItem: "",
                selectedIndex: -1,
                range: {
                    start: 0,
                    end: 0
                }
            }
        },
        props: {
            type: {
              type: String,
              default: 'selection'
            },
            listData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            isSelectedIcon: {
                type: Boolean,
                default: false
            },
            underLine: {
                type: Boolean,
                default: false
            },
            compact: {
                type: Boolean,
                default: false
            },
            maxHeight: {
                type: [String,Number],
                default: '100%'
            },
            withButtons: {
                type: Boolean,
                default: false
            },
            draggable: {
                type: Boolean,
                default: false
            },
            timeline: {
                type: Boolean,
                default: false
            },
            listClass: {
                type: String,
                default: ''
            },
            itemClass: {
                type: String,
                default: ''
            },
            withIcon: {
                type: Boolean,
                default: false
            },
            selectionKey: {
                type: String,
                default: 'title'
            }
        },
        created() {

        },
        methods: {
            initList () {
                this.selectedIndex = -1;
                this.selectedItem = '';
            },
            selectItem(target, i) {
                if(this.withButtons || this.type === 'extend') return;
                this.selectedIndex = i;
                this.selectedItem = target[this.selectionKey];
                console.log('click')
            },
            draggableEl(type,target) {
                console.log(target, type)
            },
            dropEl(target) {
                console.log(target)
            },
            // onMouseDown(e) {
            //     let range = SelectToDrag.dragReady(e);
            //     this.range.start = e.target.attributes.index.value
            //     console.log("mousedown",range)
            // },
            // onMouseUp(e) {
            //     this.range.end = e.target.attributes.index.value
            //     // let container = this.$el;
            //     console.log("mouseup",this.range)
            //
            // },
            // selectedRange(rangeData) {
            //
            // }
        }
    }
</script>

<style lang="scss">
    .hw-list {
        overflow-y: auto;
        max-height: 300px;
        .hw-item {
            position: relative;
            padding: 10px;
            //background-color: #fff;
            margin-bottom: 1px;
            &:last-child {
                margin: 0;
            }
            .sub-title  {
                display: block;
                font-size: 13px;
                color: #909090;
                padding: 0;
            }
            .btn-set {
                position: absolute;
                top:0;
                right:0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 5px;
                .hw-button {
                    color: #909090;
                    margin: 0;
                }
            }
            &:hover > div {
                /*pointer-events: none;*/
            }
        }
        &.selection {
            .hw-item {
                cursor: pointer;
                &:hover {
                    background-color: #EFF4FC;
                }
                &.selected {
                    position: relative;
                    background-color: #F8F8F8;
                    span.check-icon {
                        position: absolute;
                        top:0;
                        right: 0;
                        padding: 10px;
                        color: #2985DB;
                    }
                }
            }
        }
        &.extend {
            > .hw-item {
                cursor: pointer;
                padding:0;
                margin:0;
            }
        }
        &.underLine {
            .hw-item {
                border-bottom: 1px solid #EBEBEB;
            }
            &:first-child {
                border-top: 1px solid #EBEBEB;
            }
        }
        &.compact {
            .hw-item {
                padding: 4px 10px;
            }
        }
        &.draggable {
            .hw-item {
                position: relative;
                padding-left: 30px;
                &:before {
                    content: "\e92d";
                    font-family: 'gi-icons';
                    position: absolute;
                    top:0;
                    left: 0;
                    padding: 10px;
                }
            }
        }
        &.timeline {
            .hw-item {
                position: relative;
                margin-left: 16px;
                margin-bottom: 0;
                &:after {
                    content: "";
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    top:50%;
                    left: -10px;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    background-color: #d4d4d4;
                }
                &.selected:after {
                    background-color: #2985DB;
                }
            }
            &.connect .hw-item {
                &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -10px;
                    border-left: 1px solid #d4d4d4;
                    height: 100%;
                }
                &:first-child{
                    &:before {top: 50%}
                }
                &:last-child{
                    &:before {top: auto; bottom:50%; height: calc(100% - 5px);}
                }
            }
        }
        &.icon .hw-item{
            .item-title {
                /*display: inline;*/
                position: relative;
                padding-left: 26px;
            }
            .list-icon {
                position: absolute;
                top:0;
                left: 0;
                padding: 2px 10px 2px 0;
                font-size: 16px;
                display: inline-block;
                line-height: 1em;
                color: #909090;
            }
        }
    }

</style>
