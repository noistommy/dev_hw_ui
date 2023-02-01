<template>
    <div class="select-time-wrap hw-select hw-group icon right" @click="showTimeSelect">
        <i class="fa fa-clock"></i>
        <div class="item-option default" v-if="!isTimeOpen">
            {{selectedTime !== null ? selectedTime.option :  '시간(옵션)'}}
        </div>
        <div v-else class="time-list" :class="{open: isTimeOpen}" :style="timeSelStyle">
            <div class="item-option" :class="{active:selectedTime.value == item.value}" v-for="(item) in timeList" :key="item.value" @click.stop="selectTime(item)">
                {{item.option}}
            </div>
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
                selectedTime: {
                    value: 0,
                    option: '오전 00:00'
                },
                timeSelStyle: {}
            }
        },
        props: {
            isOpen: Boolean,
            location: String,
            dateType: {
               type: String,
                default: 'single'
            },
            timeUnit: {
               type: Number,
                default: 60
            },
            value: Number
        },
        watch: {
            isOpen(value) {
                this.isTimeOpen = value
            },
            value() {
                this.selectedTime = this.timeList.find(item => item.value === this.value)
            }
        },
        created() {
            this.timeList = this.getTimeList();
            this.selectedTime = this.timeList.find(item => item.value === this.value);
            this.isTimeOpen = this.isOpen;
        },
        methods: {
            showTimeSelect () {
                // this.isTimeOpen = !this.isTimeOpen;
                this.$emit('onTime', !this.isTimeOpen, this.dateType)
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
            selectTime(timeObj) {
                this.selectedTime = timeObj;
                this.$emit('setTime', this.selectedTime.value, this.dateType)
                this.showTimeSelect();
            }
        }
    }
</script>