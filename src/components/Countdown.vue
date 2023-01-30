<template lang="pug">
    div.hw-rcountdown-view
        .contents-detail-view
            .contents-section
                .section-title Types
                .section-contents
                    .type-wrapper
                        .type-title 기본
                        .type-desc
                        .type-preview
                            .run-countdown
                                .hw-button.small.round( @click="offClose")
                                    | {{isClose?'리셋':'종료'}}
                            .countdown-wrapper
                                template( v-if="!isClose")
                                    hw-countdown(:count-time="countTime", :is-start="isStart", v-show="isStart", :class="{hide:isStart}", :extend-time="extendTime", :extend-count="extendCount",
                                        :remind-text="`후에 자동 종료 됩니다.`", @extend="setRemindExtend", @close="alertClose")
                                        template(slot="extendBtn")
                                            .hw-button.primary.round.small
                                                span.label {{extendTime}}초 연장
                                    .check-btn
                                        .hw-button.small.round(:class="`${isStart?'secondary':'primary'}`", @click="startCount")
                                            | {{isStart?'확인':'실행'}}
                                template(v-else)
                                    div 종료
                            .remind-extend-count
                                template(v-if="extendCount-useCount")
                                    | 연장 가능 횟수가 {{extendCount- useCount}}회 남았습니다.
                                template(v-else)
                                    | 연장불가
</template>

<script>
    import HwCountdown from "../packages/HwCountdown/HwCountdown";
    export default {
        name: 'countdown-view',
        components: {HwCountdown},
        data() {
            return {
                isStart: true,
                countTime: 100,
                pastTime: 0,
                interval: null,
                isClose: false,
                extendTime: 10,
                extendCount: 2,
                useCount: 0
            }
        },
        methods: {
            offClose() {
                this.isClose = !this.isClose;
                this.startCount()
            },
            startCount() {
                this.isStart = !this.isStart;
            },
            setRemindExtend(count) {
                this.useCount = count
            },
            alertClose() {
                this.isClose = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .type-preview {
        border:1px solid #ebebeb;
    }
    .run-countdown {
        margin-bottom: 10px;
        &.hide {
            opacity: 0;
        }
    }
    .countdown-wrapper {
        width: 100%;
        padding: 10px;
        border:1px solid #f2f2f2;
        display: flex;
        justify-content: flex-end;
        .check-btn {
            margin-left: 20px;
        }
        .hw-countdown {
            flex-grow: 1;
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .result-time {
                flex-grow: 1;
                .count {
                    color: #2985DB;
                    font-weight: 600;
                }
            }
        }
    }
</style>