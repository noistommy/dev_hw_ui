<template>
    <div class="hw-expand-list">
        <div class="hw-expand-list-title" :class="[{'expanded': isExpanded}]" @click="toggleExpand">
            <div class="title-wrap">
                <slot name="title">
                    {{data.title}}
                </slot>
            </div>
            <span class="arrow-wrap" :class="[{'expanded': isExpanded && hasContents}]">
                <slot name="arrow">
                    <i :class="useOptionIcon"></i>
                </slot>
            </span>
        </div>
        <template v-if="hasContents">
            <transition name="expand">
                <div class="hw-expand-list-content" v-if="isExpanded" :class="{active:isExpanded}">
                    <template v-if="contentsType === 'list'">
                        <div class="list-child-wrapper">
                            <hw-list :list-data="data.content" :with-icon="contentsWithIcon"  class="child-list" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="content-wrapper" :style="useContentScroll">
                            <slot name="content">
                                {{data.content}}
                                {{data.content}}
                                {{data.content}}
                                {{data.content}}
                                {{data.content}}
                                {{data.content}}
                                {{data.content}}
                            </slot>
                        </div>
                    </template>
                </div>
            </transition>
        </template>

    </div>
</template>
<script>
export default {
    name: 'hw-expand-list',
    props: {
        contentsType: {
          type: String,
          default: 'content' // or 'list'
        },
        contentsWithIcon: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => ({
                title: '',
                content: '',
                isExpanded: false
            })
        },
        maxHeight: {
            type: Number,
            default: -1
        }
    },
    data(){
        return {
            isExpanded: false
        }
    },
    computed: {
        hasContents() {
            return this.data.content !== undefined && this.data.content.length > 0;
        },
        useOptionIcon() {
            return this.data.optionIcon || 'fa fa-chevron-down'
        },
        useContentScroll() {
            if(this.maxHeight > 0) {
                return {maxHeight: `${this.maxHeight}px`, overflowY: 'auto'}
            } else {
                return {}
            }
        }
    },
    created(){
        this.isExpanded = this.data.isExpanded || false
    },
    methods: {
        toggleExpand(){
            this.isExpanded = !this.isExpanded
        }
    }
}
</script>
<style lang="scss" scoped>
$content-max-height: 300px;
$transition-duration: 350ms;
$transition-timing-function: ease-in-out;
$list-border-color: #d6d6d6;
$title-background-color: #f8f8f8;
$title-color: #333333;
$arrow-color: #909090;
$content-padding: 11px;
.hw-expand-list{
    .hw-expand-list-title{
        padding: 10px;
        position: relative;
        &.expanded{
        }
        .title-wrap{
            margin-left: 30px;
            height: 100%;
            color: $title-color;
        }
        .arrow-wrap{
            width: 40px;
            height: 100%;
            left: 0;
            top: 0;
            position: absolute;
            transition: transform $transition-duration $transition-timing-function;   
            justify-content: center;
            color: $arrow-color;
            &.expanded{
                transform: rotate(180deg);
            }
        }
        .title-wrap,
        .arrow-wrap{
            display: flex;
            align-items: center;
        }
    }
    .hw-expand-list-content{
        overflow: hidden;
        opacity: 1;
        transition: all $transition-duration $transition-timing-function;
        .list-child-wrapper .hw-item{
            padding-left: 30px;
        }
        .content-wrapper {
            padding: $content-padding;
        }
    }
}
.expand-enter-active, .expand-leave-active {
    max-height: 1000px;
}

.expand-enter,
.expand-leave-to{
    max-height: 0;
    opacity: 0;
}
</style>