<template lang="pug">
div.calendar-view
    .contents-detail-view
        hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
            span(@click="setContents(tab.key)") {{tab.name}}
        .contents-section
            template(v-if="showInfo")
                components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
            template(v-else)
                .section-title Types
                .type-wrapper(v-for="(type, index) in contentsList", :key="`calendar_${index}`", :id="`type_${index}`")
                    .type-title {{type.title}}
                    .type-desc {{type.description}}
                    .type-preview
                        .date-picker-box(:style="{width:`${type.option.pickerSize + 2 || size + 2}px`}")
                            template(v-if="type.option.type === 'range'")
                                hw-calendar(v-bind="type.option", v-model="rangeNow", @onClick="resultRangeValue")
                            template(v-else-if="type.title === '일정'")
                                hw-calendar(v-bind="type.option", v-model="now" :planner="true", :plan-info="planData", @move="changeDate")
                            template(v-else-if="type.title === 'Slot'")
                                hw-calendar(v-bind="type.option", v-model="now", :planner="true", :plan-info="planData", :location="localLang")
                                    template(v-slot:currentDate="slotProps")
                                        .current-date
                                            template(v-if="localLang === 'en'")
                                                .date-text {{monthEn[slotProps.month - 1]}} {{slotProps.year}}
                                            template(v-else-if="localLang === 'zh'")
                                                .date-text {{slotProps.year}}年 {{slotProps.month}}月
                                            template(v-else)
                                                .date-text {{slotProps.year}}년 {{slotProps.month}}월
                            template(v-else-if="type.title === '사용자 지정 날짜'")
                                hw-calendar(v-bind="type.option", v-model="customDate")
                            template(v-else)
                                hw-calendar(v-bind="type.option", v-model="now", @onClick="userSelectedDate")

                    //.type-result
                        p {{resultRange.start}}
                        p {{resultRange.end}}
                    .type-btn(@click="toggleCode")
                        i.fas.fa-code
                    .type-code.panel
                        .panel-header code
                        .panel-body
                            pre.language-css
                                code(v-text="type.source")
                    .type-msg.panel(v-if="type.message", :class="`panel-${type.message.type}`")
                        .panel-body {{type.message.text}}




</template>

<script>
    import InformationView from './InformationView';
    import JsonData from './schedules.json';
    import moment from "moment-timezone";
    export default {
        name: 'hw-calendar-view',
        components: {InformationView},
        data () {
            return {
                monthLength: 30,
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                open: false,
                planData: [],
                usage: "<hw-calendar></hw-calendar>",
                now: new Date(),
                //customDate: new Date('1983-02-14'),
                customDate: '1983-02-14',
                rangeNow: {
                    start: new Date(),
                    end: new Date()
                },
                size: 330,
                contentsList: [
                    {
                        title: '기본 달력',
                        description: 'A Standard Calendar. 기본 켈린더',
                        option: {type: 'standard', gridLine: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: '외부 테두리',
                        description: 'A Standard Calendar. 기본 켈린더',
                        option: {type: 'standard', gridLine: false, borderWrap: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: '일정',
                        description: 'A Standard Calendar with planner. 일정 데이터 추가',
                        option: {type: 'standard', pickerSize:330},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                        message:  {
                            text: "planData = [{shared: true, special: true},{shared: false, special: true}....]",
                            type: 'gray'
                        }
                    },
                    {
                        title: '상단 타입',
                        description: '해더 스타일 (컨트롤러 위치) [Center || Right]. 기본값: Center',
                        option: {type: 'standard', controlAlign: 'right'},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                        message:  {
                            text: "Right 적용 시",
                            type: 'gray'
                        }
                    },
                    {
                        title: '사용자 지정 날짜',
                        description: '사용자 지정 날짜 표시. 기본값:스스템 기준 당일 날짜',
                        option: {type: 'standard', pickerSize:300},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                        message:  {
                            text: "예시 날짜: 1983-02-14",
                            type: 'lightblue'
                        }
                    },
                    {
                        title: '사용자 지정 Class명',
                        description: '사용자 지정 클래스 이름 사용. 기본값 "hw-date-picker"',
                        option: {type: 'standard', setName: 'user-date-picker', pickerSize:300},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: 'Slot',
                        description: '현재 월(Month) 표시 Slot',
                        option: {type: 'standard'},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                        message:  {
                            text: "template(v-slot:currentDate=\"slotProps\")\n" +
                                "                                .current-date\n" +
                                "                                    .date-text {{slotProps.year}}년 {{slotProps.month}}월",
                            type: 'gray'
                        }
                    },
                    {
                        title: '격자 레이아웃',
                        description: '격자 레이아웃 사용 ',
                        option: {type: 'standard', gridLine: true},
                        source: "<hw-calendar type='standard'></hw-calendar>",
                    },
                    {
                        title: '날짜 범위 지정 - 시작 날짜 기준 ',
                        description: 'A Range Calendar.',
                        option: {type: 'range', selectedType: 'start'},
                        source: "<hw-calendar type='range'></hw-calendar>",
                    },
                    {
                        title: '날짜 범위 지정 - 종료 날짜 기준',
                        description: 'A Range Calendar.',
                        option: {type: 'range', selectedType: 'end'},
                        source: "<hw-calendar type='range'></hw-calendar>",
                    },
                    {
                        title: '달력(선택기능 없음)',
                        description: 'Minimum Calendar. 화면 표시용 켈린더',
                        option: {type: 'simple'},
                        source: "<hw-calendar type='simple'></hw-calendar>"
                    },
                    {
                        title: '오늘 선택',
                        description: 'Support Button for Selecting Today. 오늘 날짜 선택을 위한 버튼 제공',
                        option: {today: true, select: false},
                        source: "<hw-calendar v-bind:today='true'></hw-calendar>"
                    },
                    {
                        title: '선택된 날짜 표시 ',
                        description: 'Highlight Selected Date. 선택된 날짜 표시',
                        option: {select: true},
                        source: "<hw-calendar v-bind:select='true'></hw-calendar>"
                    },
                    {
                        title: '날짜 변경',
                        description: 'Support Button and Input Box for Edit Date. 날짜 변경을 위한 버튼 및 입력 창 제공',
                        option: {edit: true},
                        source: "<hw-calendar v-bind:edit='true'></hw-calendar>"
                    },
                    {
                        title: '영문 요일',
                        description: 'Support another languages. 다른 언어 제공 [영문]',
                        option: {today: true, location: 'en'},
                        source: "<hw-calendar v-bind:location='en'></hw-calendar>"
                    },
                    {
                        title: '요일 타입',
                        description: 'Display Full/Short Weeks Name. 요일 표시 변경. 기본값 [s] ',
                        option: {weekType: 'f', pickerSize: 400},
                        source: "<hw-calendar v-bind:week-type='f'></hw-calendar>",
                        message:  {
                            text: "* 전체 이름 표시 시 켈린더 사이즈 조정 필요 함",
                            type: 'lightblue'
                        }
                    },
                    {
                        title: '크기 지정 ',
                        description: 'Support for Setting Calendar width 켈린더 사이즈 설정. 기본값 [300] ',
                        option: { pickerSize: 500},
                        source: "<hw-calendar v-bind:picker-size=500></hw-calendar>",
                        message:  {
                            text: " * 최소값 300px",
                            type: 'gray'
                        }
                    },
                    {
                        title: '일정표',
                        description: 'Support for Setting Calendar width 켈린더 사이즈 설정. 기본값 [300] ',
                        option: { type:'plan', pickerSize:700, gridLine: true, controlAlign: 'right'},
                        source: "<hw-calendar></hw-calendar>",
                        message:  {
                            text: " * 최소값 300px",
                            type: 'gray'
                        }
                    },
                    {
                        title: '다국어 지원(영문)',
                        description: ' ',
                        option: { type:'standard', location:'en'},
                        source: "<hw-calendar :location='`en`'></hw-calendar>"
                    },
                    {
                        title: '다국어 지원(중문)',
                        description: ' ',
                        option: { type:'standard', location:'zh'},
                        source: "<hw-calendar :location='`zh`'></hw-calendar>"
                    }
                ],
                propsData: [
                    {name: 'v-model', type:'String || Date', default:'YYYY-MM-DD', desc: 'Date 객체 또는 date string(YYYY-MM-DD)' },
                    {name: 'type', type:'String', default:'simple', desc: '[simple, standard, range, plan]' },
                    {name: 'today', type:'Boolean', default:'false', desc: '"오늘" 버튼 활성 유무' },
                    {name: 'select', type:'Boolean', default:'false', desc: '선택된 날 표시 유무 ' },
                    {name: 'edit', type:'Boolean', default:'false', desc: '캘린더 년 월 변경 기능 활성 유무' },
                    {name: 'location', type:'String', default:'ko', desc: '[ko, en]  // ko:한글, en: 영어' },
                    {name: 'weekType', type:'String', default:'', desc: '[f, s]  // ex) f: 월요일 , s: 월 ' },
                    {name: 'pickerSize', type:'Number || String', default:'300', desc: '최소값 300.' },
                    {name: 'borderWrap', type:'Boolean', default:'false', desc: 'DatePicker 외부 테두리 적용' },
                    {name: 'gridLine', type:'Boolean', default:'false', desc: 'calender 내부 격자 레이아웃 적용' },
                    {name: 'selectedType', type:'String', default:'start', desc: 'range 타입일때 선택 기준 지정' },
                    {name: 'planner', type:'Boolean', default:'false', desc: '일정 데이터 표시' },
                    {name: 'planInfo', type:'Array', default:'null', desc: '일정 데이터 목록' },
                    {name: 'controlAlign', type:'String', default:'center', desc: '컨트롤 버튼 위치 설정' },
                    {name: 'setName', type:'String', default:'hw-calendar', desc: '사용자 지정 클레스명 설정' },
                ],
                eventData: [
                    {name: '@onClick', type: 'Date', desc: '선택된 날짜 데이터를 상위 컴포넌트로 전달'},
                    {name: '@select', type: 'Date', desc: '선택된 날짜 데이터와 일정 여부를 상위 컴포넌트로 전달'},
                ],
                resultRange: {},
                lastDayList: [31,28,31,30,31,30,31,31,30,31,30,31],
                localLang: 'en',
                monthEn: ['January','February','March','April','May','June','July','August','September','October','November','December']
            }
        },
        created() {
            setTimeout(() => {
                this.dummyPlan(this.monthLength)
            },1000)
            // console.log(JsonData)
            // this.setScheduleList()
            this.language = navigator.language.slice(0, 2)
        },
        methods: {
            toggleCode (evt) {
                let classArr = evt.target.nextSibling.classList.value;
                if(classArr.indexOf('show') > -1) {
                    evt.target.nextSibling.classList.remove('show')
                } else {
                    evt.target.nextSibling.classList.add('show')
                }
                //console.log(evt.target.nextSibling.classList)
            },
            resultRangeValue(value) {
                this.resultRange = value
            },
            changeDate(payload) {
                console.log(payload)
                this.dummyPlan(payload.last)
            },
            setContents(type) {
                if (type === 'info') {
                    this.showInfo = true;
                    this.infoComp = InformationView
                } else {
                    this.showInfo = false;
                    this.infoComp = null;
                }
            },
            dummyPlan(length) {
                console.log(length)
                this.planData = [];
                let dummyPlan = {shared: false,special: false};
                for(let i=0;i<length;i++) {
                    if(i%3 === 0 ) {
                        this.planData.push({shared: true, special: false});
                    } else if(i < 15 && i> 12){
                        this.planData.push({shared: true, special: true});
                    } else {
                        this.planData.push(dummyPlan)
                    }

                }
            },
            moveMonth(curr) {
                console.log(curr)

                console.log(this.now = new Date(this.now.setMonth( curr - 1)))
                this.dummyPlan(this.lastDayList[curr - 1])
                // if(type==='prev') {
                //     this.now = this.now.setMonth(currMonth - 1)
                // } else{
                //     this.now = this.now.setMonth(currMonth + 1)
                // }
            },
            setScheduleList() {
                let newArr = []
                JsonData.forEach((item) => {
                    console.log(item.category, item.start, new Date(item.start).getDate() )
                    let obj = {};
                    if(item.category === 'schedule') {

                        obj[new Date(item.start).getDate()] = item.subject
                        newArr.push(obj);
                    }

                })
                console.log(newArr)
            },
            userSelectedDate(date) {
                console.log(moment(date).locale('ko').format('llll'))

            }
        }
    }
</script>

<style lang="scss">
    .date-picker-box {
        min-width: 330px;

    }
    .date-picker {
        .calendar-wrapper {

        }
        .date-picker-container {
            /*padding: 30px;*/

        }
        .date-cell {
            /*margin:0;*/
        }

    }
    .user-date-picker {

        .date-picker-container {
            border-radius: 10px;
            padding: 15px;
            border:1px solid #ebebeb;
        }
    }
    /*.user-date-text {*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    font-size: 1.2em;*/
    /*    color: #333;*/
    /*    font-weight: 900;*/

    /*}*/
</style>
