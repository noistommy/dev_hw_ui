<template>
    <div class="hw-date-picker">
        <div class="selected-datetime-wrapper" :class="{range: isRange}">
            <template v-if="isRange">
                <div class="date-picker-input start" @click="setRange('start')">
                    <slot :startDate="rangeDate.start|dateFormat(dateFormat)" name="insertStart">
                        <div class="hw hw-input">
                            <input type="text" name="date_range" class="hw-input insert-date" autocomplete="off" :placeholder="defaultText" :value="setFormatRangeDate.start" @keyup.enter="convertDate">
                        </div>
                    </slot>
                </div>
                <template v-if="timeSelector">
                    <time-selector :time-unit="30" v-model="selectedSTime" :is-open="showRangeTimer.start" :date-type="`start`" @setTime="selectTime" @onTime="isTimeOpen" />
                </template>
                <div>~</div>
                <div class="date-picker-input end" @click="setRange('end')">
                    <slot :endDate="rangeDate.end|dateFormat(dateFormat)" name="insertEnd">
                        <div class="hw hw-input">
                            <input type="text" name="date_range" class="hw-input insert-date" autocomplete="off" :placeholder="defaultText" :value="setFormatRangeDate.end" @keyup.enter="convertDate">
                        </div>
                    </slot>
                </div>
                <template v-if="timeSelector">
                    <time-selector :time-unit="30" v-model="selectedETime" :is-open="showRangeTimer.end" :date-type="`end`" @setTime="selectTime" @onTime="isTimeOpen" />
                </template>
            </template>
            <template v-else>
                <div class="date-picker-input" @click="setCalendar">
                    <slot :dateTime="selectedDate|dateFormat(dateFormat, 'en')" name="insertDate">
                        <div class="hw hw-input">
                            <input type="text" class="hw-input insert-date" autocomplete="off" :placeholder="defaultText" :value="setFormatDate" @keyup.enter="convertDate">
                        </div>
                    </slot>
                </div>
                <template v-if="timeSelector">
                    <time-selector :time-unit="30" v-model="selectedTime" :is-open="showTimer" @setTime="selectTime" @onTime="isTimeOpen"/>
                </template>
            </template>

        </div>
        <transition name="slide-fade">
            <div class="date-picker-wrapper" v-if="showCalendar" :class="[{inline}, {show: showCalendar}, selectedType]">
                <template v-if="isRange">
                    <hw-calendar v-model="rangeDate" type="range" :selected-type="selectedType" :today="today" :edit="edit" :location="location" :week-type="weekType" :picker-size="pickerSize" :border-wrap="true" @onClick="selectRangeDate" />
                </template>
                <template v-else>
                    <hw-calendar v-model="selectedDate" type="standard" :today="today" :edit="edit" :location="location" :week-type="weekType" :picker-size="pickerSize" :border-wrap="true" @onClick="selectDate" />
                </template>


            </div>
        </transition>

    </div>
</template>

<script>
    import HwCalendar from './HwCalendar';
    import TimeSelector from "./TimeSelector";
    import moment from 'moment-timezone';
    export default {
        name: 'hw-date-picker',
        components: {HwCalendar, TimeSelector},
        data () {
            return {
                selectedDate: '',
                selected: {
                    start: '',
                    end: ''
                },
                selectedStart: '',
                selectedEnd: '',
                rangeDate: {
                    start: new Date(),
                    end: new Date(),
                },
                selectedType: 'start',
                formatDate: '',
                showTimer: false,
                showRangeTimer: {
                    start: false,
                    end: false
                },
                showCalendar: false,
                timeList: [],
                // isTimeOpen: false,
                selectedTime: {value: 0, option: '오전 00:00'},
                selectedSTime: {value: 0, option: '오전 00:00'},
                selectedETime: {value: 0, option: '오전 00:00'},
                timeSelStyle: {},
                minValue: null
            }
        },
        props: {
            value: [String, Object, Date],
            type: {
                type: String,
                default: ''
            },
            inline: {
                type: Boolean,
                default: false
            },
            timeSelector: {
                type: Boolean,
                default: false
            },
            dateFormat: {
                type: String,
                default: 'YYYY-MM-DD'
            },
            isRange: {
                type: Boolean,
                default: false
            },
            rangeType: {
                type: String,
                default: 'start'
            },
            defaultText: {
                type: String,
                default: '날짜 선택'
            },
            today : {
                type: Boolean,
                default: true
            },
            edit: {
                type: Boolean,
                default: false
            },
            pickerSize: {
                type: Number,
                default: 300
            },
            location: {
                type: String,
                default: 'ko'
            },
            weekType: {
                type: String,
                default: 's'
            }
        },
        computed: {
            setFormatDate() {
                return moment(this.selectedDate).locale(this.location).format(this.dateFormat)
            },
            setFormatRangeDate() {
                let range = {
                    start: moment(this.selected.start).locale(this.location).format(this.dateFormat),
                    end: moment(this.selected.end).locale(this.location).format(this.dateFormat)
                };
                return range
            }
        },
        watch: {
            value() {
                if(this.isRange) {
                    this.rangeDate = {
                        start: typeof this.value.start === 'string' ? new Date(this.value.start) : this.value.start,
                        end: typeof this.value.end === 'string' ? new Date(this.value.end) : this.value.end
                    };
                } else {
                    this.selectedDate = this.value;
                }
            }
        },
        created() {
            if(this.isRange) {
                let timeS = 0;
                let timeE = 0;
                if(this.value.start !== null) {
                    this.rangeDate = {
                        start: typeof this.value.start === 'string' ? new Date(this.value.start) : this.value.start,
                        end: typeof this.value.end === 'string' ? new Date(this.value.end) : this.value.end
                    };
                    timeS = this.setTimeValue(this.rangeDate.start);
                    timeE = this.setTimeValue(this.rangeDate.end)
                } else {
                    this.rangeDate = {
                        start: new Date(),
                        end: new Date()
                    }
                }
                if(this.timeSelector) {
                    this.selectTime(timeS, 'start');
                    this.selectTime(timeE, 'end');
                }
            } else {
                this.selectedDate = this.value !== null ? this.value : new Date();
                if(this.timeSelector) {
                    this.selectTime(0)
                }
            }
        },
        mounted() {
            document.body.addEventListener('click', this.closeDatePicker);
        },
        destroyed() {
            document.body.removeEventListener('click', this.closeDatePicker);
        },
        methods: {
            isTimeOpen(value, type) {
                if(value) {this.setCalendar(false)}
                if(this.isRange) {
                    if(!type) {
                        this.showRangeTimer.start = value;
                        this.showRangeTimer.end = value
                    } else {
                        this.showRangeTimer[type] = value
                    }
                } else {
                    this.showTimer = value;
                }

            },
            setCalendar (value = true) {
                if(this.showCalendar) value = false;
                this.showCalendar = value;
                this.isTimeOpen(false, null)
            },
            setRange (type) {
                if(this.selectedType === type) {
                    this.setCalendar();
                }
                console.log(this.selectedType, type)
                // this.setCalendar();
                this.selectedType = type;
                // this.isTimeOpen(false, null)
            },
            // showTimeSelect () {
            //     this.setCalendar(false);
            //     this.isTimeOpen = !this.isTimeOpen;
            // },
            selectDate (value) {
                this.selectedDate = value;
                if(this.timeSelector) {
                    // this.convertTime(value, this.selectedTime.value)
                    this.selectedDate = this.selectTime(0)
                }
                this.updateDateTime(this.selectedDate);
                // this.$emit('select', this.selectedDate);
                // this.setCalendar(false);


            },
            selectRangeDate(value) {
                // let updateTime = {};
                // updateTime.start = this.selectTime({option: '오전 00:00', value: 0}, 'start')
                this.rangeDate = value;
                this.convertTime(this.rangeDate.start, 0)
                this.convertTime(this.rangeDate.end, 0)
                // if(value.end !== null) {
                //     this.convertTime(this.rangeDate.end, 0)
                //     // updateTime.end = this.selectTime({option: '오전 00:00', value: 0}, 'end')
                //
                // } else {
                //     this.rangeDate.end = this.convertTime(this.rangeDate.start, 0)
                // }
                // if(value.end === null)

                // this.$emit('selects', this.rangeDate)

                //this.setCalendar(false);
                this.updateDateTime(this.rangeDate);
                this.isTimeOpen(false);
            },
            selectTime(timeValue, type) {

                console.log(timeValue, type)
                let updateTime = '';
                if(this.isRange) {
                    this.convertTime(this.rangeDate[type], timeValue);
                    updateTime = this.rangeDate
                    if(type === 'start') {
                        this.selectedSTime = timeValue;
                    } else {
                        this.selectedETime = timeValue;
                    }
                    this.updateDateTime(this.rangeDate);
                } else {
                    updateTime = this.convertTime(this.selectedDate, timeValue)
                    this.selectedTime = timeValue;
                    this.updateDateTime(this.selectedDate);
                }
                return updateTime;

            },
            closeDatePicker (e) {
                if(this.$el.contains(e.target)) return;
                this.setCalendar(false);
            },
            updateDateTime (date) {
                // let time = this.selectedTime;
                console.log("update:",date);
                // console.log(this.isRange)
                if(this.isRange) {
                    this.$emit('selects', date);
                } else {
                    this.$emit('select', date);
                    this.setCalendar(false);
                }

            },
            convertTime (date, t) {
                let min = {h:t-t%1,m:(t%1>0)?30:0};
                date.setHours(min.h);
                date.setMinutes(min.m);
                date.setSeconds(0);
                return date;
            },
            convertDate(evt) {
                this.selectedDate = new Date(evt.target.value);
            },
            setTimeValue (date) {
                let h = date.getHours();
                let m = date.getMinutes() < 30 ? 0.0 : 0.5;
                // let timeString = {};
                // if (this.timeSelector) {
                //     timeString = this.timeList.find(item => item.value === h+m)
                // } else {
                //     timeString = null
                // }
                // console.log(timeString)
                // let ampm = (this.selectedTime.value < 12) ? '오전' : '오후';
                // return  `${ampm} ${this.selectedTime.option}`
                return h+m;
            }
        }
    }
</script>

<style lang="scss" >
    .hw-date-picker {
        position: relative;
        &.end {
            margin-left: 10px;
        }

    }
    .selected-datetime-wrapper {
        display: flex;
        align-items: center;
        .date-picker-input {
            min-width: 8em;
            flex-grow: 1;
            input {
                font-size: 14px !important;
            }
        }
        .select-time-wrap {
            position:relative;
            margin-left: 10px;
            min-width: 120px;
            height: 34px;
            border: 1px solid #d6d6d6;
            background-color: #fff;
            .default {
                /*position: absolute;*/
                /*width: 100%;*/
                /*top:0;*/
                /*z-index: 2;*/
                /*background-color: #fff;*/
            }
            .time-list {
                position: absolute;
                top:0;
                width: 100%;
                height: 100%;
                z-index: 10;
                background-color: #fff;
                overflow-y: auto;
                transition: height 250ms ease-in-out;
                &.open {
                    height: 300px;
                    box-shadow: 2px 5px 4px 0 rgba(0, 0, 0, 0.16);
                    .item-option.active {
                        background-color: #eff4fc;

                    }
                }
            }
            .item-option {
                cursor: pointer;
                font-size: 14px;
                padding: 0 10px;
                display: flex;
                align-items: center;
                height: 34px;
            }

        }
    }
    .date-picker-wrapper {
        width: fit-content;
        background-color: #fff;
        box-shadow: 2px 5px 4px 0 rgba(0, 0, 0, 0.16) !important;
        margin-top: 10px;
        overflow: hidden;
        display: none;
        /*opacity: 0;*/
        /*transition: all 1000ms ease-in-out;*/
        &.inline {
            position: absolute;
            top:100%;
            left: 0;
            z-index: 99999;
            &.end {
                left: 50%;
            }
        }
        &.show {
            display: block;
            /*opacity: 1;*/
            /*transform: translateY(10px);*/
        }
    }
    .date-picker-container {
        padding: 15px;
    }
    .slide-fade-enter-active {
        transition: all 250ms ease-in-out;
    }
    .slide-fade-leave-active {
        /*transition: all 0ms ease-in-out;*/
    }
    .slide-fade-enter, .slide-fade-leave {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>