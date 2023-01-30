<template lang="pug">
div.date-picker-view
    .contents-detail-view
        .contents-section
            .section-title Types
            .type-wrapper(v-for="content in contentsList", :key="content.no" )
                .type-title {{content.title}}
                .type-desc {{content.description}}
                .type-preview(:style="previewSize")
                    hw-date-picker(v-model="content.data", v-bind="content.option", @select="setDateTime")
                        template(v-slot:insertDate="slotProps")
                            .hw-input.single
                                input.hw-input.insert-date(type="text", autocomplete="off", :placeholder="`날짜입력`", :value="slotProps.dateTime")
                .type-option(v-if="content.no === 4")
                    .hw-tags-wrapper
                        hw-tags(:tags="tagList", type="label", @select="selectTag")
            .type-wrapper(v-for="content in contentsList2", :key="content.no" )
                .type-title {{content.title}}
                .type-desc {{content.description}}
                .type-preview(:style="previewSize")
                    hw-date-picker(v-model="content.data", v-bind="content.option", @select="setRangeDate")
                        template(v-slot:insertStart="slotProps")
                            .hw-input.start-date
                                input.hw-input.insert-date(type="text", autocomplete="off", :placeholder="`날짜입력`", :value="slotProps.startDate")
                        template(v-slot:insertEnd="slotProps")
                            .hw-input.end-date
                                input.hw-input.insert-date(type="text", autocomplete="off", :placeholder="`날짜입력`", :value="slotProps.endDate")
            .type-wrapper
                .type-title 날짜 선택 팝업
                .typw-desc * Hw-Calendar 참조 (today, edit, location, weekType, pickerSize)
            .type-wrapper
                .type-title TEST Range
                .type-desc New Picker Range Test
                .type-format {{formatRange.start}} - {{formatRange.end}}
                .type-result Start: {{rangeDate.start}}
                .type-format End: {{rangeDate.end}}
                .type-format Interval: {{intervalTime}}
                .type-preview(:style="previewSize")
                    hw-date-picker(:inline="true", v-model="rangeDateData", :is-range="true",:time-selector="true", @selects="setRangeDate")
                        template(v-slot:insertStart="slotProps")
                            .hw-input.start-date
                                input.hw-input.insert-date(type="text", autocomplete="off", :placeholder="`날짜입력`", :value="slotProps.startDate")
                        template(v-slot:insertEnd="slotProps")
                            .hw-input.end-date
                                input.hw-input.insert-date(type="text", autocomplete="off", :placeholder="`날짜입력`", :value="slotProps.endDate")
</template>

<script>
    import moment from "moment-timezone";
    import {setFormatTime} from "../packages/HwDatePicker/util";

    export default {
        name: 'hw-date-picker-view',
        data () {
            return {
                contentsList: [
                    {
                        no: 0,
                        title: '기본 날짜 선택',
                        description: '기본 날짜 선택',
                        option: {},
                        data: null
                    },
                    {
                        no: 1,
                        title: '기본 날짜 선택 (Floating)',
                        description: '기본값: false',
                        option: {inline: true},
                        data: null
                    },
                    {
                        no: 2,
                        title: '시간 선택',
                        description: '시간 값 사용자 설정. 기본값: false',
                        option: {inline: true, timeSelector: true},
                        data: null
                    },
                    {
                        no: 3,
                        title: '날짜 형식 지정',
                        description: '날짜 형식 사용자 설정. 예) \'YYYY.MM.DD\'. 기본값: \'YYYY-MM-DD\'',
                        option: {inline: true, dateFormat: 'YYYY년MM월DD일'},
                        data: null
                    },
                    {
                        no: 4,
                        title: '다국어 지원',
                        description: '다국어 지원 (ko, en, zh-cn ...)',
                        option: {inline: true,dateFormat:'ll', location: 'ko'},
                        data: null
                    },


                ],
                contentsList2: [
                    {
                        no: 5,
                        title: '기간 지정',
                        description: '날짜 범위 지정  기본값: \'false\'',
                        option: {inline: true, isRange: true},
                        data: {start: null, end: null}
                    },
                    {
                        no: 6,
                        title: '기간 지정 + 시간 선택',
                        description: '',
                        option: {inline: true, isRange: true, timeSelector: true},
                        data: {start: null, end: null}
                    }
                ],
                previewSize: {
                    width: '500px'
                },
                rangeDate: {
                    start:null,
                    end: null
                },
                rangeDateData: {
                    start: '2021-01-13T21:00:00',
                    end: '2021-01-15T11:30:00'
                },
                singleDate: null,
                resultDate: null,
                resultRange:{},
                intervalTime: 0,
                locales: ['ko','en','zh-cn'],
                locale: 'ko',
                tagList: [
                    {id:0, color: 'green', tagText:'ko'},
                    {id:1, color: 'red', tagText:'en'},
                    {id:2, color: 'blue', tagText:'zh-cn'},
                ]

            }
        },
        computed: {
            formatDate() {
                return this.resultDate
            },
            formatRange() {
                console.log("computed")
                return this.resultRange
            }
        },
        created() {
            console.log(this.resultDate)
            this.singleDate = new Date()
            this.resultDate = this.convertDate(new Date());

        },
        methods: {
            setDateTime(value) {
                console.log("userView", value)
                this.singleDate = value;
                this.resultDate = this.convertDate(value);
            },
            setRangeDate(value) {
                console.log(value)
                this.rangeDate = value
                this.resultRange.start = this.convertDate(value.start);
                this.resultRange.end = this.convertDate(value.end);
                // this.rangeDate[`${type}`] = value;
                // if(type === 'start') {
                //     console.log('only start')
                //     this.rangeDate.end = value;
                // }
                if(value.end !== null) {
                    let interval = parseInt(setFormatTime(this.rangeDate.end, 'd')- setFormatTime(this.rangeDate.start, 'd'));
                    this.intervalTime = `${interval}일간`
                    // this.convertInterval(interval)
                } else {
                    this.intervalTime = '0일'
                }
                
            },
            // setDateValue(value) {
            //     console.log(value)
            //     if(value.type === 'start') {
            //         this.startDate = value.date;
            //     } else if (value.type === 'end'){
            //         this.endDate = value.date;
            //     } else {
            //         this.resultDate = new Date()
            //     }
            //
            //     console.log("data update", this.startDate, this.endDate)
            // },

            convertDate(date) {
                console.log("converted",date)
                return moment(date).locale(this.locale).format('YYYY-MM-DD hh:mm:ss a dd')
            },
            convertInterval(interval) {
                let normal = -interval/1000;
                console.log(normal/60, normal/3600, normal/3600/24)
            },
            selectTag(lang) {
                console.log(lang)
                this.contentsList[4].option.location = lang.tagText
            }
        }
    }
</script>

<style lang="scss">
    .range-wrapper {
        display: flex;
    }
</style>
