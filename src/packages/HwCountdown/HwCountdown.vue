<template>
    <div class="hw-countdown">
        <div class="result-time">
            <span class="count">{{remindTime}}초</span> {{remindText}}
        </div>
        <template v-if="isStart && remindTime <= countTime && (extendCount - useExtendCount) > 0" >
            <div class="extend-time" @click="addCount">
                <slot name="extendBtn">
                    <div class="hw-button small round secondary" >
                        <div class="label">연장</div>
                    </div>
                </slot>
            </div>
        </template>


    </div>
</template>

<script>
    export default {
        name: 'hw-countdown',
        props: {
            isStart: {
                type: Boolean,
                default: false
            },
            countTime: {
                type: Number,
                default: 100
            },
            intervalTime: {
                type:Number,
                default: 1000 // ms
            },
            extendTime: {
                type: Number,
                default: 100
            },
            extendCount: {
                type: Number,
                default: 1
            },
            remindText: {
                type: String,
                default: '남았습니다.'
            }
        },
        data() {
            return {
                pastTime: 0,
                totalCount: 100,
                interval: null,
                useExtendCount: 0
            }
        },
        computed: {
            remindTime() {
                let rTime = this.totalCount - this.pastTime;
                if(rTime < 0) {
                    this.endCount();
                    return;
                }
                return this.totalCount - this.pastTime;
            }
        },
        watch: {
            isStart(value) {
                if(value) {
                    this.startCount()
                }
            }
        },
        mounted() {
            this.totalCount = this.countTime;
            if(this.isStart) {
                this.startCount()
            }
        },
        destroyed() {
            this.endCount()
        },
        methods: {
            startCount(){
                console.log("try set start")
                if(this.interval) return;
                this.interval = window.setInterval(() => {
                    this.pastTime = this.pastTime + 1;
                },this.intervalTime)
            },
            endCount() {
                window.clearInterval(this.interval);
                this.$emit('close');
            },
            addCount() {
                this.totalCount = this.totalCount + this.extendTime;
                this.useExtendCount++;
                this.$emit('extend', this.useExtendCount)
            }
        }
    }
</script>

<style lang="scss">
    .hw-countdown {
        .result-time {
            .count {
                color: #2985DB;
            }
        }
    }
</style>