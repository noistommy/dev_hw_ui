<template>
    <div class="handle-pane" :class="[handleClass, iconType, {hide: hideHandle}]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'hw-resizer',
        props: {
            handleClass: {
                type: String,
                default: 'resize-bar'
            },
            iconType: {
                type: String,
                default: 'default'
            },
            hideHandle: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .layout-v .handle-pane {
        width: 10px;
        height: 100%;
        cursor: col-resize;
    }
    .layout-h .handle-pane {
        width: 100%;
        height: 10px;
        cursor: row-resize;
    }
    .handle-pane,
    .resize-bar {
        position: relative;
        left:0;
        overflow: hidden;
        //transform: translateX(-20px);
        /*transition: all 250ms;*/
        &.default:before {
            content: "\e927";
            font-family: 'gi-icons';
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center center;
            transform: translate(-50%, -50%) rotate(90deg);
            color: #909090;

        }
        &.stick:before {
            content: "";
            position: absolute;
            width: 5px;
            height: 60px;
            border-radius: 4px;
            top: 50%;
            left: 50%;
            transform-origin: center center;
            transform: translate(-50%, -50%);
            color: #909090;
            background-color: #909090;

        }
        &.line {
            margin-left: -10px;
            /*border-right: 2px solid #FFF;*/
            &:before {
                content: '';
            }
            &:hover {
                border-right: 3px solid #2985DB;
            }
        }
        &.hide {

        }
        /*&:hover,*/
        &.resizing {
            left: 0;
            &:before {
                left: 50%;
            }

        }


    }
</style>