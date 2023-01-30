<template>
    <div class="hw-tree-list" :class="{hide:currentLevel < 0}">

        <div class="hw-tree-list-title">
            <div class="arrow-wrap" :class="[{'expanded': isExpanded}]" :style="{marginLeft: setLevelIndent+'px'}" @click.stop="toggleExpand">
                    <slot name="arrow">
                        <i class="gis gi-short-arrow-down"  v-show="treeData.children.length > 0"></i>
                    </slot>
                </div>
            <div class="title-wrap" @click="selectItem">
                <span class="tree-icon" v-if="isTitleIcon">
                    <slot name="arrow">
                        <i :class="treeData.icon"></i>
                    </slot>
                </span>
                <span class="ellipsis" :style="{maxWidth: `${limitTextSize}px`}">{{treeData.title}}</span>
            </div>
        </div>
        <transition name="expand">
            <div class="hw-tree-list-content" :class="{open:isExpanded}" :style="hideStyle">
                <hw-tree-list v-for="child in treeData.children" :key="child.id" :tree-data="child" :level="currentLevel+1"
                              :set-limit="setLimit"
                              :max-wrap-size="maxWrapSize"
                              :all-expanded="allExpanded"
                              @toggle="setLevel" @change="changeLevel" @location="setPath"/>
            </div>
        </transition>
        <div class="show-level-btn" @click="setBack">
        </div>
    </div>
</template>
<script>
export default {
    name: 'hw-tree-list',
    data(){
        return {
            isExpanded: true,
            //showLevel: 4,
            currentLevel: this.level,
            limitText: 300,
            pathList: []
        }
    },
    props: {
        treeData: {
            type: Object,
            default: () => ([{
                id: 0,
                title: 'Node Root',
                children: [],
                isExpanded: false,
                icon: ''
            }])
        },
        level: {
            type:Number,
            required: true
        },
        maxWrapSize: {
            type: Number,
            default: 300
        },
        setLimit: {
            type: Number,
            default: -1
        },
        allExpanded: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        setLevelIndent() {
            return (this.level) * 20;
        },
        isTitleIcon() {
            return this.treeData.icon !== '' && this.treeData.icon !== undefined;
        },
        limitTextSize() {
            let itemSize = this.isTitleIcon ? 20 : 0;
            return this.maxWrapSize - this.setLevelIndent - itemSize - 20;
        },
        isLimit() {
            return this.setLimit > 0;
        },
        hideStyle() {
            return this.isExpanded ? {} : {width: 0, height: 0}
        }
    },
    watch: {
        level() {
            this.currentLevel = this.level;
            if(this.isLimit && this.currentLevel >= this.setLimit - 1) {
                this.isExpanded = false
            }

        },
        allExpanded(value) {
            this.isExpanded = value;
        }
    },
    created(){
        this.isExpanded = this.allExpanded ? true : this.treeData.isExpanded
    },
    methods: {
        toggleExpand(){
            if(this.treeData.children.length === 0) return;
            this.isExpanded = !this.isExpanded
            this.$emit('toggle', this.isExpanded, this.level)
        },
        setLevel (state, level) {
            if(!this.isLimit) return;
            if(this.setLimit === (level + 1) || !state) {
                this.$emit('change', state)
            }

        },
        changeLevel(value) {
            if(!this.isLimit) return;
            if(value) {
                this.currentLevel--;
            }
            this.$emit('change', value);
        },
        setBack () {
            this.$emit('change', false);
        },
        selectItem() {
            this.pathList.unshift(this.treeData.title)
            this.$emit('location', this.pathList)
            this.$emit('select', false);
        },
        setPath(pathArr) {
            pathArr.unshift(this.treeData.title)
            this.pathList = pathArr;
            this.$emit('location', this.pathList)
        }
    }
}
</script>
<style lang="scss" scoped>
$content-max-height: 300px;
$transition-duration: .15s;
$transition-timing-function: linear;
$list-border-color: #d6d6d6;
$title-background-color: #f8f8f8;
$title-color: #333333;
$arrow-color: #909090;
$content-padding: 11px;
.hw-tree-list{
    font-size: 1rem;
    font-weight: 400;
    .hw-tree-list-title{
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px;
        &:hover {
            background-color: #EFF4FC;
        }
        &.expanded{
        }
        .title-wrap{
            color: $title-color;
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
        .arrow-wrap{
            cursor: pointer;
            min-width: 20px;
            font-size: 8px;
            padding: 0 6px;
            transition: transform $transition-duration $transition-timing-function;   
            justify-content: flex-end;
            color: $arrow-color;
            &.expanded{
                transform: rotate(-90deg);
            }
        }
        .title-wrap,
        .arrow-wrap{
            display: flex;
            align-items: center;
        }

    }
    .hw-tree-list-content{
        transition: all 50000ms;
        overflow: hidden;
        visibility: hidden;
        &.open {
            visibility: visible;

        }
    }
    .show-level-btn {
        display: none;
    }
    &.hide {
        & > .hw-tree-list-title {
            display: none;
        }
        & > .show-level-btn {
            display: flex;
            text-align: center;
            cursor: pointer;
            width: 15px;
            height: 100%;
            border-left: 1px solid #ebebeb;
            position: absolute;
            top:0;
            background-color: #f2f2f2;
            transition: all 250ms ease;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            margin-left: -10px;
            &:after {
                content: '\e9fb';
                font-family: 'gi-icons';
                color: #909090;
                position: absolute;
                top: 50%;
                left: 0;
            }
            &:hover {
                margin-left: 0;
                &:after {
                    //transform: translate(-50%, -50%);
                }
            }
            i {
                font-size: 0.5em;
            }
        }
    }
}

//.expand-enter-active,
//.expand-leave-active{
//    transition: height $transition-duration $transition-timing-function;
//}
//.expand-leave,
//.expand-enter,
//.expand-leave-to{
//    height: 0px;
//}
//.expand-enter-to,
//.expand-leave{
//    height: $content-max-height;
//}

</style>