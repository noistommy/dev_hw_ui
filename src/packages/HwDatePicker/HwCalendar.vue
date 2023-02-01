<template>
    <div class="date-picker" :class="[{bordered: borderWrap}, setName, `${type}-type`]">
        <div class="date-picker-header" :class="controlAlign" :style="{width: `${datePickerSize}px`, margin: `0 ${extraSize/2}px`}">
            <div class="dp-header">
                    <span class="dp-control to-prev hw-button icon circle" @click="moveMonthDate('prev')" v-if="editable" v-hw-tooltip="prevMonthText[location]">
                        <i class="fas fa-chevron-left"></i>
                    </span>
                <slot name="currentDate" :year="currentYear" :month="currentSetMonth">
                    <div class="current-date">
                        <div class="date-editor" contenteditable="true" v-if="editable"
                             @keypress.enter.prevent="setCurrent" @click="setEditable" :class="[editCurrent, {editable:editCurrent}]">
                            {{currentYear}}.{{currentSetMonth}}
                        </div>
                        <div class="date-text" v-else>{{currentYear}}.{{currentSetMonth}}</div>
                    </div>
                </slot>

                <span class="dp-control to-next hw-button icon circle" @click="moveMonthDate('next')" v-if="editable" v-hw-tooltip="nextMonthText[location]">
                        <i class="fas fa-chevron-right"></i>
                    </span>
            </div>
            <div class="go-to-now hw-button text" v-show="today" @click="moveMonthDate">{{location === 'en' ? 'Tday' : '오o늘'}}</div>
        </div>
        <div class="date-picker-container">
            <div class="date-picker-wrap"
                 :class="[{limited: limitedDate.y >= currentYear && limitedDate.m > currentMonth}, type, {gridLine:gridLine}]"
                 :style="{width: `${datePickerSize}px`, margin: `0 ${extraSize/2}px`}">
                <div class="date-cell week-cell" v-for = "(week, hidx) in locationWeek" :key="`week_${hidx}`" :style="{width: `${cellSize}px`}">
                    <span :class="[{sun: hidx%7 === 0},{sat: hidx%7 === 6}]">{{week}}</span>
                </div>
                <div class="date-cell day-cell"
                     v-for = "(day, idx) in calendarMatrix"
                     :key="`day_${idx}`"
                     :class="[{
                     selected: isSelectedDay === day && selectable},
                     {disabled: idx < startIndex || idx >= startIndex + lastDayOfMonth},
                     {today: isToday === day},
                     {limitDate: limitedDate.y === currentYear && limitedDate.m === currentMonth && limitedDate.d > day},
                     {selectStart: isSelectedStart === day},{selectEnd: isSelectedEnd === day}
                     ]"
                     :style="{width: `${cellSize}px`, height: `${cellSize}px`}"
                     @click.prevent.stop="selectDate(day)" @mouseenter="setPointedDate(day)" @mouseleave="setPointedDate()"
                >

                    <div class="dp-day">
                        <div class="dp-today" v-if="isToday === day">
                            <span class="today"></span>
                        </div>
                        <div class="dp-day-highlight">
                            <span class="highlight"></span>
                        </div>
                        <div class="dp-day-range" v-if="type === 'range' && ( day <= setRange.rE && day >= setRange.rS)"></div>
                        <div v-if="!planner || planInfo === null" class="day-text">
                            <span :class="[{sun: idx%7 === 0},{sat: idx%7 === 6}]">{{day}}</span>
                        </div>
                        <div v-else-if="planInfo[idx-startIndex] !== undefined" class="day-text" :class="[{s_day:idx >= startIndex && idx < startIndex + lastDayOfMonth && planInfo[idx-startIndex].special },
                        {shared:idx >= startIndex && idx < startIndex + lastDayOfMonth && planInfo[idx-startIndex].shared}]">
                            <span :class="[{sun: idx%7 === 0},{sat: idx%7 === 6}]">{{day}}</span>
                        </div>
                        <div v-else class="day-text">
                            <span :class="[{sun: idx%7 === 0},{sat: idx%7 === 6}]">{{day}}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>

<!--        <div class="date-picker-footer">-->
<!--            <div class="time-selector-wrapper">-->
<!--                <time-selector />-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import moment from 'moment-timezone';
    import {setCalendar, getStartDay, setFormatTime} from "./util";
    //import TimeSelector from './TS_extend'

    export default {
        name: 'hw-calendar',
        //components: {TimeSelector},
        data() {
            return {
                valueDate: new Date,
                now: new Date(),
                editCurrent: false,
                currentYear: new Date().getFullYear(),
                currentMonth: new Date().getMonth() + 1,
                currentDay: new Date().getDate(),
                selectedDate: new Date(),
                rangeDate: {
                    start: null,
                    end: null
                },
                selectedYear: 0,
                selectedMonth: 0,
                selectedDay: 0,
                rangeStart: {
                    y: 0,
                    m: 0,
                    d: 0
                },
                rangeEnd: {
                    y: 0,
                    m: 0,
                    d: 0
                },
                pointedDate: 0,
                // weekNameEn: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
                weekNameEn: ['S','M','T','W','T','F','S'],
                weekFNameEn: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                weekNameZh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                weekFNameZh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                weekName: ['일','월','화','수','목','금','토'],
                weekFName: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
                lastDayList: [31,28,31,30,31,30,31,31,30,31,30,31],
                calendarMatrix: [],
                startIndex: 0,
                selectable: false,
                editable: false,
                todayButton: false,
                limitedDate: {y:null,m:null,d:null},
                prevMonthText: {'ko': '이전달', 'en': 'Previous Month', 'zh': '上个月'},
                nextMonthText: {'ko': '다음달', 'en': 'Next Month', 'zh': '下个月'},
            }
        },
        props: {
            value: {
                type: [String, Object, Date],
                default: null
            },
            type: {
                type: String,
                default : 'simple'
            },
            today: {
                type: Boolean,
                default: false
            },
            select: {
                type: Boolean,
                default: true
            },
            edit: {
                type: Boolean,
                default: false
            },
            // selectedDate: Date,
            minLimited: Date,
            pickerSize: {
                type: Number,
                default: 300
            },
            location: {
                type: String,
                default: 'ko'
            },
            weekType: String,
            borderWrap: {
                type: Boolean,
                default: false
            },
            gridLine: {
                type: Boolean,
                default: false
            },
            selectedType: {
                type: String,
                default: 'start'
            },
            planner: {
                type: Boolean,
                default: false
            },
            planInfo: {
                type: Array,
                default: () => {
                    return null
                }
            },
            controlAlign: {
                type: String,
                default: 'center'
            },
            setName: {
                type: String,
                default: 'hw-calendar'
            }

        },
        computed: {
            lastDayOfMonth() {
                return this.lastDayList[this.currentMonth-1];
            },
            isToday() {
                let obj = moment(this.now).toObject();
                return (this.currentYear === obj.years && this.currentMonth === obj.months + 1) ? obj.date : 0;
            },
            isLeafYear() {
                let year = this.currentYear;
                return (year%4 === 0 && (year%100 !== 0 || year%400 === 0)) ? true : false;
            },
            isSelectedDay() {
                return this.currentYear === this.selectedYear && this.currentMonth === this.selectedMonth ? this.selectedDay : 0;
            },
            isSelectedStart() {
                return this.currentYear === this.rangeStart.y && this.currentMonth === this.rangeStart.m ? this.rangeStart.d : null;
            },
            isSelectedEnd() {
                return this.currentYear === this.rangeEnd.y && this.currentMonth === this.rangeEnd.m && this.rangeDate.end !== null ? this.rangeEnd.d : null;
            },
            currentSetMonth() {
                return this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth;
            },
            locationWeek () {
                if(this.location === 'en') {
                    return this.weekType === 'f' ? this.weekFNameEn : this.weekNameEn;
                } else if (this.location === 'zh') {
                    return this.weekFNameZh;
                } else {
                    return this.weekType === 'f' ? this.weekFName : this.weekName;
                }
            },
            cellSize() {
                return Math.floor(this.pickerSize/7);
            },
            extraSize() {
                return this.pickerSize%7;
            },
            datePickerSize() {
                let borderWith = this.gridLine ? 2 : 0;
                return this.pickerSize + borderWith - this.extraSize;
            },
            setRange() {
                let setFirst =  this.isSelectedStart;
                let setLast = this.isSelectedEnd;
                if(setLast === null) {
                    if (this.rangeDate.end === null) {
                        setLast = this.pointedDate
                    } else {
                        if(this.currentYear > this.rangeEnd.y) {
                            setLast = 0;
                        } else if(this.currentYear < this.rangeEnd.y) {
                            setLast = 32;
                        } else {
                            if(this.currentMonth > this.rangeEnd.m) {
                                setLast = 0
                            } else {
                                setLast = 32
                            }
                        }

                    }
                }
                if(this.setPage < 0) { setFirst = 32}
                if(this.setPage > 0) {
                    setFirst = 0;
                }
                return {
                    rS: Math.min(setFirst, setLast),
                    rE: Math.max(setFirst, setLast)
                }
            },
            setPage() {
                let stateRange = 0;
                let stateYear = this.currentYear - this.rangeStart.y;
                let stateMonth = this.currentMonth - this.rangeStart.m;

                if(stateYear === 0) {
                    stateRange = stateMonth;
                } else {
                    stateRange = stateYear;
                }
                return stateRange
            }
        },
        watch: {
            value() {
                this.initDate()
            }
        },
        created() {
            this.initDate();
            this.typeSetting(this.type);
        },
        methods: {
            //initialize date
            initDate() {
                if(!this.value) {
                    this.valueDate = this.type === 'range' ? {start:new Date(), end: new Date()} : new Date;
                } else {
                    this.valueDate = this.value
                }
                let currentDate = new Date();
                if (this.type === 'range') {
                    this.rangeDate.start = typeof this.valueDate.start === 'object' ? this.valueDate.start : this.convertDate(this.valueDate.start);
                    this.rangeDate.end = typeof this.valueDate.end === 'object' ? this.valueDate.end : this.convertDate(this.valueDate.end);
                    currentDate = this.rangeDate.start;
                } else {
                    this.selectedDate = typeof this.valueDate === 'object' ? this.valueDate : this.convertDate(this.valueDate);
                    currentDate = this.selectedDate;
                }
                if(typeof this.valueDate === 'string') {
                    this.selectedDate = new Date(this.valueDate);
                } else {
                    this.selectedDate = this.valueDate;
                }

                this.currentYear = this.selectedYear = currentDate.getFullYear();
                this.currentMonth = this.selectedMonth = currentDate.getMonth() + 1;
                this.selectedDay = currentDate.getDate();
                this.startIndex = getStartDay(this.currentYear, this.currentMonth);
                this.calendarMatrix = setCalendar(this.currentYear, this.currentMonth);

                if(this.type === 'range') {
                    this.rangeStart.y = this.currentYear;
                    this.rangeStart.m = this.currentMonth;
                    this.rangeStart.d = this.selectedDay;
                    this.pointedDate = this.rangeStart.d;
                    this.rangeEnd.y = this.currentYear;
                    this.rangeEnd.m = this.currentMonth;
                    this.rangeEnd.d = this.rangeDate.end.getDate();
                }
            },
            //Set preview month and next month
            moveMonthDate(type) {
                if(type === 'prev') {
                    if(this.currentMonth === 1) {
                        this.currentYear--;
                        this.currentMonth = 12;
                    } else {
                        this.currentMonth--;
                    }
                }  else if (type === 'next') {
                    if(this.currentMonth === 12) {
                        this.currentYear++;
                        this.currentMonth = 1;
                    } else {
                        this.currentMonth++;
                    }
                } else {
                    this.currentYear = this.selectedYear =  this.now.getFullYear();
                    this.currentMonth = this.selectedMonth = this.now.getMonth()+1;
                    this.currentDay = this.now.getDate();
                    this.selectDate(this.currentDay);
                }
                this.$emit('move', {year:this.currentYear, month:this.currentMonth, last:this.lastDayOfMonth})
                this.startIndex = getStartDay(this.currentYear, this.currentMonth);
                this.calendarMatrix = setCalendar(this.currentYear, this.currentMonth);
                this.setPointedDate()
            },
            // on select event
            selectDate(d) {

                this.selectedYear = this.currentYear;
                this.selectedMonth = this.currentMonth;
                let currentDate = this.setCurrentDate(d);
                this.selectedDay = d;
                this.pointedDate = d;
                if(this.type === 'range') {
                    let rangePoint = {y:this.currentYear,m:this.currentMonth,d:d}
                    if(this.compareDate(this.rangeDate.start, currentDate) > 0) {
                        if(this.selectedType === 'start') {
                            this.rangeStart = rangePoint;
                            this.rangeDate.start = currentDate;
                        } else {
                            this.rangeEnd = this.rangeStart;
                            this.rangeStart = rangePoint
                            this.rangeDate.end = this.rangeDate.start;
                            this.rangeDate.start = currentDate;
                        }
                    } else if(this.compareDate(this.rangeDate.start, currentDate) === 0 ) {
                        if(this.selectedType === 'start') {
                            this.rangeStart = rangePoint
                            this.rangeEnd = rangePoint
                            this.rangeDate.start = currentDate;
                        } else {
                            this.rangeEnd = rangePoint
                        }
                        this.rangeDate.end = currentDate;
                    } else if(this.compareDate(this.rangeDate.start, currentDate) < 0 ) {
                        if(this.selectedType === 'start') {
                            this.rangeStart = rangePoint
                            // this.rangeEnd = rangePoint
                            this.rangeDate.start = currentDate;
                        } else {
                            this.rangeEnd = rangePoint
                            this.rangeDate.end = currentDate;
                        }

                    }
                    if(this.compareDate(this.rangeDate.end, this.rangeDate.start) >= 0 ) {
                        if(this.selectedType === 'start') {
                            this.rangeStart = rangePoint;
                            // this.rangeEnd = rangePoint;
                            this.rangeDate.start = currentDate;
                        } else {
                            this.rangeEnd = rangePoint;
                            this.rangeDate.end = currentDate;
                        }

                    } else {
                        this.swapRange(this.rangeStart, rangePoint.d)
                        this.rangeDate.end = this.rangeDate.start;
                        this.rangeDate.start = currentDate;
                    }


                    // else if(this.rangeDate.end === null ) {
                    //     this.rangeEnd.y = this.currentYear;
                    //     this.rangeEnd.m = this.currentMonth;
                    //     this.rangeEnd.d = d;
                    //     this.rangeDate.end = currentDate;
                    //     this.pointedDate = this.rangeStart.d;
                    // } else {
                    //     this.rangeStart.y = this.currentYear;
                    //     this.rangeStart.m = this.currentMonth;
                    //     this.rangeStart.d = d;
                    //     this.pointedDate = this.rangeStart.d;
                    //     this.rangeEnd.y = this.currentYear;
                    //     this.rangeEnd.m = this.currentMonth;
                    //     this.rangeEnd.d = d
                    //     this.rangeDate.start = currentDate;
                    //     this.rangeDate.end = currentDate;
                    // }
                    this.$emit('onClick', this.rangeDate)

                } else {
                    this.selectedDate = currentDate;

                    this.$emit('onClick', this.selectedDate)
                }
                if(this.planner) {
                    let isPlanData = this.planInfo[d - 1].shared || this.planInfo[d - 1].special;
                    this.$emit('select', this.selectedDate, isPlanData)
                }
            },
            setPointedDate(d) {
                if(this.rangeDate.end !== null) return;
                this.pointedDate = d;
            },
            getDateObject(date) {
                if(date === '' || date === undefined) return;
                let dateArr = date.split('.');
                this.currentYear = Number(dateArr[0]);
                this.currentMonth = Number(dateArr[1]);
                this.currentDay = Number(dateArr[2]);
            },
            setCurrent(evt) {
                let current = evt.target.innerHTML.split('.');
                this.currentYear = Number(current[0]);
                this.currentMonth = Number(current[1]);

                this.startIndex = getStartDay(this.currentYear, this.currentMonth)
                this.calendarMatrix = setCalendar(this.currentYear, this.currentMonth);
                this.setEditable(false);
                evt.target.blur();
            },
            setEditable(value=true) {
                if(this.editCurrent) {
                    value = false;
                }
                this.editCurrent = value;
            },
            typeSetting (type) {

                this.editable = this.edit;
                this.selectable = this.select;
                this.todayButton = this.today;
                if(type === 'standard' || type === 'range') {
                    this.editable = true;
                    this.selectable = true;
                    this.todayButton = true;
                }
                if(this.today) {
                    this.selectable = true;
                }
            },
            convertDate(string) {
                return string === null ? null : new Date(string);
            },
            setCurrentDate(d, t = 0) {
                let monthStr = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth;
                let dayStr = d < 10 ? `0${d}` : d;
                let setDateStr = `${this.currentYear}-${monthStr}-${dayStr}`;
                let currentDate = new Date(setDateStr);
                if (t === 0) currentDate = this.convertTime(currentDate, t);
                console.log("currentDate",currentDate)
                return currentDate;
            },
            convertTime (date, t) {
                let min = {h:t-t%1,m:(t%1>0)?30:0};
                date.setHours(min.h);
                date.setMinutes(min.m);
                date.setSeconds(0);
                return date;
            },
            swapRange(start, end) {
                this.rangeEnd.y = start.y;
                this.rangeEnd.m = start.m;
                this.rangeEnd.d = start.d;
                this.rangeStart.y = this.currentYear;
                this.rangeStart.m = this.currentMonth;
                this.rangeStart.d = end
            },
            compareDate(target, value) {
                let interval = setFormatTime(target, 'd') - setFormatTime(value, 'd');
                return parseInt(interval)
            }
        }
    }
</script>

<style lang="scss" >
    $cellHeight: 42px;
    .date-picker {
        width: 100%;
        border: 0;
        overflow: hidden;
        /*box-sizing: border-box;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        &.bordered {
            border: 1px solid #909090;;
        }
    }
    .date-picker-header {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /*background-color: #fff;*/
        /*border-bottom: 1px solid #ebebeb;*/
        padding: 4px 0;
        min-height: 42px;
        .dp-header {
            display: flex;
            justify-content: center;
            align-items: center;
            .current-date {
                font-size: 1.2em;
                color: #333;
                font-weight: 900;
                padding: 5px 10px;
                .date-editor {
                    box-sizing: border-box;
                    text-align: center;
                    min-width: 100px;
                    outline:none;
                    padding: 0 5px;
                    border:0;
                    &.editable {
                        outline: none;
                        display: inline-block;
                        border: 1px solid #d6d6d6;
                        color: #909090;
                    }
                }
            }
            .dp-control i{
                color: #909090;
            }
        }
        .go-to-now {
            position: absolute;
            height: 100%;
            top: 0;
            right: 0;
            padding: 15px !important;
            font-size: 14px;
            color: #909090;
            margin:0;
        }
        &.right {
            justify-content: flex-end;
            .dp-header {
                .current-date {
                    position: absolute;
                    left: 0;
                    .date-editor {
                        text-align: left;
                    }
                }
            }
        }
    }

    .date-picker-wrap {
        /*display: grid;*/
        /*width: 100%;*/
        /*grid-template-columns: repeat(7, 7fr);*/
        /*grid-template-rows: repeat(7, $cellHeight);*/
        /*gap: 1px;*/
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        /*background-color: #ebebeb;*/
        font-size: 14px;
        overflow: hidden;
        /*border: 1px solid #909090;*/
        /*overflow: hidden;*/
        /*box-sizing: border-box;*/
        &.gridLine {
            border: 1px solid #EBEBEB;
            background-color: transparent;
            .week-cell {
                background-color: #F8F8F8;
                border-right: 1px solid #EBEBEB;
                border-bottom: 1px solid #EBEBEB;
            }
            .day-cell {
                border-right: 1px solid #EBEBEB;
                border-bottom: 1px solid #EBEBEB;
            }
        }
        .week-cell {
            min-width: 42px;
            min-height: 42px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &.limited {
            .date-cell {
                pointer-events: none;
                span{
                    color: #d4d4d4 !important;
                }
            }
        }
        .week-cell {
            /*margin-right:1px;*/
        }
        .date-cell {
            /*display: inline-block;*/
            text-align: center;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            /*background-color: #fff;*/
            box-sizing: border-box;
            /*margin-right: 1px;*/
            /*margin-bottom: 1px;*/
            &:nth-child(7n) {
                /*margin-right:0;*/
                border-right: 0;
            }
            &.week-cell {
                /*background-color: #f8f8f8;*/
                &:nth-child(7) {
                    border-right: 0
                }
            }
            &.disabled, &.limitDate {
                pointer-events: none;
                span{
                    color: #d4d4d4 !important;
                }
            }
            .dp-day {
                position: relative;
                width: 100%;
                height: 100%;
                z-index: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                .day-text {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top:0;
                    left:0;
                }
                .dp-day-range {
                    z-index: 2;
                }
                .dp-day-highlight {
                    z-index: 4;
                }
                .dp-today {
                    z-index: 1;
                }
                .day-plan.planed {
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    background-color: #000;
                }
            }

            .dp-day-highlight {
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left: 0;
                /*right: 0;*/
                /*bottom: 0;*/
                /*pointer-events: none;*/
                display: flex;
                justify-content: center;
                align-items: center;
                .highlight {
                    padding: 1.2em;
                    border-radius: 50px;
                    box-sizing: border-box;
                    display: inline-block;
                }
            }
        }
        .day-cell.disabled {
            .dp-day-highlight {
                display: none;
            }
            .dp-day-range {
                display: none;
            }
        }
        .day-cell:not(.disabled) {
            &:hover {
                .dp-day-highlight .highlight{
                    background-color: #eff4fc;
                }
            }
            &.selected {
                .dp-day-highlight .highlight {
                    background-color: #2985db;
                }
                span {
                    color: #fff;
                    font-weight: 700;
                }
            }
            .dp-day-range {
                position: absolute;
                width: 100%;
                height: 80%;
                background-color: #eff4fc;
                top:10%;
                left:0;
            }
            .dp-today {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                top:0;
                left: 0;
                .today {
                    padding: 1.4em;
                    background-color: #ebebeb;
                    border-radius: 50%;
                }
            }

        }
        .sun {
            color: #dc4444;
        }
        .sat {
            color: #5b81cf;
        }
        .day-text {
            &.s_day span{
                color: #dc4444;
            }
            &.shared:before {
                position: absolute;
                content: '';
                bottom: 0;
                left: calc(50% - 2px);
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #1f8ce8;
                z-index: 1;

            }
        }



    }
    .date-picker-wrap.range {
        .day-cell:not(.disabled) {
            &.selectStart {
                color: #ffffff;
                font-weight: 700;
                .dp-day-highlight .highlight{
                    background-color: #61A475;
                }
                .dp-day-range {
                    width: 50%;
                    left: 50%;
                }
                /*:hover {*/
                /*    .dp-day-highlight {*/
                /*        border: 2px solid #61A475;*/
                /*    }*/
                /*    span {*/
                /*        color: #333;*/
                /*    }*/
                /*}*/
            }
            &.selectEnd {
                color: #ffffff;
                font-weight: 700;
                .dp-day-highlight .highlight{
                    background-color: #EE9033;
                }
                .dp-day-range {
                    width: 50%;
                    left:0;
                }
                /*:hover {*/
                /*    .dp-day-highlight {*/
                /*        border: 2px solid #EE9033;*/
                /*    }*/
                /*    span {*/
                /*        color: #333;*/
                /*    }*/
                /*}*/
            }
            &.selectStart.selectEnd {
                .dp-day-highlight .highlight{
                    background-color: #9180B4;
                }
                .dp-day-range {
                    width: 0;
                    left:0;
                }
                /*:hover {*/
                /*    .dp-day-highlight {*/
                /*        border: 2px solid #9180B4;*/
                /*    }*/
                /*    span {*/
                /*        color: #333;*/
                /*    }*/
                /*}*/
            }
        }
    }
    .date-picker.plan-type {
        width: 100%;
        .date-cell:not(.week-cell) {
            position: relative;
            text-align: left;
            justify-content: flex-start;
            align-items: flex-start;
            .dp-day {
                max-width: 42px;
                max-height: 42px;
                /*position: absolute;*/
                /*display: inline-block;*/
                /*left: 0;*/
                /*top:0;*/
                /*width: 34px;*/
                .day-text {
                    padding: 5px 12px;
                }
            }
        }

    }
</style>