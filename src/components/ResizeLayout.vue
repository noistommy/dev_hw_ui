<template lang="pug">
    div.hw-resize-layout-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                .section-title Types
                .section-contents
                    .type-wrapper
                        .type-title 기본
                        .type-desc
                        .type-preview
                            hw-pane-layout(:layout="layoutType_v")
                                .directory-list-view.pane Pane LNB
                                hw-resize-handle
                                .file-list-view.pane Pane Contents
                    .type-wrapper
                        .type-title 다중 레이아웃
                        .type-desc
                        .type-preview
                            hw-pane-layout(:layout="layoutType_v",
                                @resizing="paneResize", @resizeStart="paneResizeStart", @resizeStop="paneResizeStop")
                                .directory-list-view.pane Pane LNB
                                hw-resize-handle
                                .file-list-view.pane Pane Contents 1
                                hw-resize-handle
                                .last-list-view.pane Pane Contents 2
                    .type-wrapper
                        .type-title 방향
                        .type-desc Vertical(기본) 또는 Horizontal
                        .type-preview
                            hw-pane-layout(:layout="`horizontal`", :handle-class="`handle`")
                                .directory-list-view.pane Pane TNB
                                hw-resize-handle( :handle-class="`handle`")
                                .file-list-view.pane Pane Contents 1
                    .type-wrapper
                        .type-title 핸들 타입
                        .type-desc Default || Stick
                        .type-preview
                            hw-pane-layout()
                                .directory-list-view.pane Pane LNB
                                hw-resize-handle
                                .file-list-view.pane Pane Contents 1
                                hw-resize-handle(:icon-type="`stick`")
                                .file-list-view.pane Pane Contents 2
                                hw-resize-handle(:icon-type="`line`")
                                .file-list-view.pane Pane Contents 3
                    .type-wrapper
                        .type-title 핸들 타입 2
                        .type-desc hide Handle
                        .type-preview.header-type
                            hw-pane-layout
                                .column-item.pane column 1
                                hw-resize-handle(:icon-type="`line`")
                                .column-item.pane  column 2
                                hw-resize-handle(:icon-type="`line`")
                                .column-item.pane  column 3
                                hw-resize-handle(:icon-type="`line`")
                                .column-item.pane  column 4
                                hw-resize-handle(:icon-type="`line`")
                                .column-item.pane  column 5
                    .type-wrapper
                        .type-title ㅋㅏ운트다운
                        .type-desc
                        .type-preview
                            .hw-button.small.round(:class="`${isStart?'secondary':'primary'}`", @click="startCount")
                                | {{isStart?'숨김':'시작'}}
                            .hw-button.small.round.danger( @click="offClose")
                                | 종료
                            template( v-if="!isClose")
                                hw-countdown(:count-time="countTime", :is-start="isStart", v-show="isStart")
                                //.hw-countdown
                                    .remind-time {{remindTime}}초 남았습니다.
                                    .hw-button.small.round.secondary(v-if="isStart && remindTime < 100", @click="addCountTime") 연장



</template>
<script>
    import InformationView from './InformationView';

    import HwPaneLayout from "@/packages/HwResizablePane/HwPaneLayout";
    import HwResizeHandle from "@/packages/HwResizablePane/HwResizeHandle";
    import HwCountdown from "@/packages/HwCountdown/HwCountdown";

    export default {
        name: 'resize-layout-view',
        components: {HwPaneLayout, HwResizeHandle, HwCountdown},
        data () {
            return {
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                layoutType_v: 'vertical',
                layoutType_h: 'horizontal',
                handleName: 'resize-bar',
                isStart: false,
                countTime: 100,
                pastTime: 0,
                interval: null,
                isClose: true

            }
        },
        computed: {
            remindTime() {
                return this.countTime - this.pastTime
            }
        },
        methods: {
            setContents(type) {
                if (type === 'info') {
                    this.showInfo = true;
                    this.infoComp = InformationView
                } else {
                    this.showInfo = false;
                    this.infoComp = null;
                }
            },
            paneResizeStart( pane, resizer, size) {
                console.log('start:',pane, resizer, size)
            },
            paneResize(pane, resizer, size) {
                console.log("resizing:",pane, resizer, size)
            },
            paneResizeStop(pane, resizer, size) {
                console.log("stop:",pane, resizer, size)

            },
            offClose() {
                this.isClose = !this.isClose
                this.startCount()
            },
            startCount() {
                // this.endCount();
                // this.countTime = 100;
                // this.pastTime = 0;
                this.isStart = !this.isStart;
                // if(this.isStart) {
                //     this.interval = window.setInterval(() => {
                //         this.pastTime++
                //     },1000)
                // }
            },
            // endCount() {
            //     window.clearInterval(this.interval);
            // },
            // addCountTime() {
            //     this.countTime = this.countTime + 100
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .type-preview {
        width: 770px;
        height: 400px;
        border: 1px solid #EBEBEB;
        &.header-type {
            height: 125px;
            .column-item {
                border-right: 2px solid #fff;
                &:last-child {
                    border:0;
                }
            }
        }
        .pane {
            padding: 10px;
            background-color: #F2F2F2;
            &:last-child {
                flex-grow: 1;
            }
        }
        .layout-v {
            flex-direction: row;
            .pane {
                min-width:15%;
            }
        }
        .layout-h {
            flex-direction: column;
            .pane {
                min-height: 15%;
            }
        }
        .handle {
            height: 10px;
            position: relative;
            left:0;
            &.default:before {
                content: "\e927";
                font-family: 'gi-icons';
                text-align: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform-origin: center center;
                transform: translate(-50%, -50%);
                color: #909090;

            }
        }

    }
</style>
