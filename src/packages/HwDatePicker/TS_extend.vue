<template>
    <div class="time-selector extend">
        <div class="ts-icon"><i class="gi gi-clock"></i></div>
        <div class="ts-hours">
            <hw-select v-model="hList[0]" :option-list="hList" :key-name="`value`" :option-name="`option`" :type="`float`" :min-width="`4em`" />
<!--            <div class="select-time-wrap hw-select hw-group icon right" @click="showTimeSelect">-->
<!--                -->
<!--            </div>-->
        </div>
        <span>:</span>
        <div class="ts-minutes" v-if="timeUnit > 0">
            <hw-select v-model="mList[0]" :option-list="mList" :key-name="`value`" :option-name="`option`" :type="`float`" :min-width="`4em`" />
        </div>
        <div class="ts-minutes" v-else>00</div>
        <div class="ts-ampm" v-if="hourType === 12">
            <hw-switch v-model="switchData" :on-value="ampmText[0]" :off-value="ampmText[0]" :type="`text`" @switch="setTextValue" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'time-selector',
        data () {

            return {
                isTimeOpen: false,
                timeList: [],
                hList: [],
                mList: [],
                selectedTime: {
                    value: 0,
                    option: '오전 00:00'
                },
                timeSelStyle: {},
                switchData: true,
                switchText: 'AM',
                ampmText : ['오전', '오후']
            }
        },
        props: {
            location: {
                type:String,
                default: 'ko'
            },
            timeUnit: {
               type: Number,
                default: 0
            },
            hourType: {
               type: Number,
                default: 12
            }

        },
        created() {
            // this.timeList = this.getTimeList();
            this.hList = this.setHoursList();
            if(this.timeUnit > 0) {
                this.mList = this.setMinutesList();
            }
            if(this.location === 'en') {
                this.ampmText = ['AM', 'PM']
            }
        },
        methods: {
            showTimeSelect () {
                this.isTimeOpen = !this.isTimeOpen;
                this.$emit('onTime', this.isTimeOpen)
            },
            getTimeList () {
                let times = [];

                for(let i=0; i<24; i++) {
                    let t = 0;
                    let ap = '';
                    if(i>12) {
                        t = i - 12;
                        ap = this.location === 'en' ? 'PM' : '오후';
                    } else if (i === 12) {
                        t = i;
                        ap = this.location === 'en' ? 'PM' : '오후';
                    } else {
                        t = i;
                        ap = this.location === 'en' ? 'AM' : '오전';
                    }
                    times.push({value:i,option: `${ap} ${(t<10) ? '0'+t : t}:00`});
                    if(this.timeUnit <= 30) {
                        if(this.timeUnit === 15) {
                            times.push({value:i+0.25,option: `${ap} ${(t<10) ? '0'+t : t}:15`});
                            times.push({value:i+0.5,option: `${ap} ${(t<10) ? '0'+t : t}:30`});
                            times.push({value:i+0.75,option: `${ap} ${(t<10) ? '0'+t : t}:45`});
                        } else {
                            times.push({value:i+0.5,option: `${ap} ${(t<10) ? '0'+t : t}:30`});
                        }
                    }

                }
                return times
            },
            setHoursList() {
                let hours = [];
                for(let i=0; i<this.hourType; i++) {
                    hours.push({value:i, option: i});
                }
                return hours;

            },
            setMinutesList() {
                let minutes = [];
                let minute = 0;
                while(minute < 60) {
                    minute = minute + this.timeUnit;
                    minutes.push({value:minute, option: minute});
                }
                return minutes;
            },
            selectTime(timeObj) {
                this.selectedTime = timeObj;
                this.$emit('setTime', this.selectedTime)
                this.showTimeSelect();
            },
            setTextValue(value) {
                this.switchText = value;
            }
        }
    }
</script>

<style lang="scss">
.time-selector {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
</style>