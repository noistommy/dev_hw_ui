<template>
    <div class="hw-finder">
        <hw-pane-layout :layout="layoutType" :handle-class="handleName"
                        @resizing="paneResize" @resizeStart="paneResizeStart" @resizeStop="paneResizeStop">
            <div class="directory-list-view pane" ref="treeList" >
                PANE LNB
            </div>
            <hw-resize-handle :handle-class="handleName" icon-type="stick"/>
            <div class="file-list-view pane">PANE CONTENTS</div>
        </hw-pane-layout>
    </div>

</template>

<script>
    import HwPaneLayout from "../../packages/HwResizablePane/HwPaneLayout";
    import HwResizeHandle from "@/packages/HwResizablePane/HwResizeHandle";
    export default {
        name: 'finder-template-view',
        components: {HwPaneLayout, HwResizeHandle},
        data() {
            return {
                layoutType: 'vertical',
                handleName: 'resize-bar'
            }
        },
        methods: {

            paneResizeStart( pane, resizer, size) {
                console.log('start:',pane, resizer, size)
            },
            paneResize(pane, resizer, size) {
                console.log("resizing:",pane, resizer, size)
            },
            paneResizeStop(pane, resizer, size) {
                console.log("stop:",pane, resizer, size)

            }
        }
    }
</script>

<style lang="scss">
    .hw-finder {
        padding: 20px;
        width: 770px;
        height: 500px;
    }
    .hw-pane-layout {
        padding: 0 !important;
        position: relative;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        .pane {
            border: 1px solid #EBEBEB;
            background-color: #F8F8F8;
            padding: 10px;
        }
        .directory-list-view {
            min-width: 12%;
        }
        .resize-bar {
            position: relative;
            /*display: flex;*/
            /*justify-content: center;*/
            /*align-items: center;*/
            cursor: col-resize;
            width:10px;
            left:0;
            height: 100%;
            overflow: hidden;
            //transform: translateX(-20px);
            transition: all 250ms;
            
            &.stick:before {
                content: "";
                position: absolute;
                width: 5px;
                height: 60px;
                border-radius: 4px;
                top: 50%;
                left: -50%;
                transform-origin: center center;
                transform: translate(-50%, -50%);
                color: #909090;
                background-color: #909090;

            }
            &:hover,
            &.resizing {
                left: 0;
                &:before {
                    left: 50%;
                }

            }


        }
        .file-list-view {
            flex-grow: 1;
            height: 100%;
        }
    }
</style>