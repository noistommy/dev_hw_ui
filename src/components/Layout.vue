<template>
    <div class="layout-container">
        <template v-if="isResize">
            <hw-pane-layout layout="vertical" :reverse="false">
                <div class="side-pane" :style="lnbStyle">LEFT NAVIGATION BAR</div>
                <hw-resize-handle />
                <div class="responsive-pane">CONTENTS</div>
            </hw-pane-layout>
        </template>
        <template v-else>
            <div class="side-pane" :style="lnbStyle"></div>
            <div class="responsive-pane"></div>
        </template>
    </div>

</template>

<script>
    import HwPaneLayout from "@/packages/HwResizablePane/HwPaneLayout";
    import HwResizeHandle from "@/packages/HwResizablePane/HwResizeHandle";
    export default {
        name: 'layout-container',
        components: {HwPaneLayout, HwResizeHandle},
        data() {
            return {
                isResize: true,
                lnbStyle: {
                    minWidth: '276px',
                    maxWidth: '483px'
                }
            }
        }
    }
</script>

<style lang="scss">
    .layout-container, .hw-pane-layout {
        width: 100%;
        height: 100%;
        display: flex;
        &.column, &-column {
            flex-direction: column;
            &.side-right {
                flex-direction: column-reverse;
            }
        }
        &.side-right {
            flex-direction: row-reverse;
        }
        .side-pane{

        }
        .responsive-pane {
            flex-grow: 1;
        }
    }

    .side-pane{
        background-color: #ebebeb;
    }
    .responsive-pane {
        background-color: #F2F2F2;
    }
</style>