<template lang="pug">
    div.context-menu-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                template(v-if="showInfo")
                    components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
                template(v-else)
                    .section-title Types
                    .type-wrapper
                        .type-title 기본
                        .type-desc
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-check-box(v-model="radioData", @result="setValue")
                    .type-wrapper
                        .type-title 사용자 지정 라벨
                        .type-desc 라벨 표시
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-check-box(v-model="radioData",label-text="체크박스", @result="setValue")
                    .type-wrapper
                        .type-title 상태별 사용자 지정 라벨
                        .type-desc 선택 상태에 따라 다른 라벨 표시
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-check-box(v-model="radioData",on-value="선택됨", off-value="선택안됨", @result="setValue")
                    .type-wrapper
                        .type-title 라벨 + 상태별 라벨
                        .type-desc
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-check-box(v-model="radioData", :label-text="`이벤트 수신을  `", on-value="설정함", off-value="설정안함", @result="setValue")
                    .type-wrapper
                        .type-title 버튼 타입
                        .type-desc 체크박스 보튼 또는 라디오 버튼
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-check-box(v-model="radioData",label-text="체크박스 버튼", @result="setValue")
                                hw-check-box(v-model="checkData",label-text="라디오 버튼", icon-type="radio", @result="setTextValue")
                    .type-wrapper
                        .type-title 라벨 활성화 표시 선택
                        .type-desc
                        .type-preview(:style="previewSize")
                            .hw-switch-wrapper
                                hw-check-box(v-model="radioData", :is-label-active="true", on-value="라벨 활성 상태", off-value="라벨 활성 상태 아님", @result="setValue")
                    .type-wrapper
                        .type-title 단일선택 (라디오 타입)
                        .type-desc 선택 가능 한 아이템중 한개만 선택가능함.
                        .type-preview(:style="previewSize")
                            .hw-checkbox-group
                                hw-check-box(v-for="(item, index) in setRadioList",
                                    :key="index", :idx="index", v-model="item.value", :is-label-active="true",
                                    :label-text="item.label", icon-type="radio", type="toggle", :gap-size="20",
                                    @result="setTextValue")
                    .type-wrapper
                        .type-title 다중 선택 (체크박스 타입)
                        .type-desc 선택가능한 아이템 모두 선택 가능함.
                        .type-preview(:style="previewSize")
                            .hw-checkbox-group
                                hw-check-box(v-for="(item, index) in checkboxList",
                                    :key="index", :idx="index", v-model="item.value",
                                    :label-text="item.label", type="multi", :gap-size="40",
                                    @result="setTextValue")


</template>

<script>
    import InformationView from "./InformationView";
    export default {
        name: 'hw-checkbox-view',
        components: {InformationView},
        data () {
            return {
                switchData: false,
                switchText: 'ON',
                usage: "<hw-check-box v-model='{switchData}'></hw-check-box>",
                eventData: [
                    {name: '@switch', type: 'String || Boolean', desc: '사용자가 선택한 값 반환'},
                ],
                contentsList: [
                    {
                        title: 'Standard',
                        description: 'A Standard Switch Toggle Button. 기본 토글 버튼  ',
                        option: {},
                        source: "<hw-check-box v-model='{switchData}'></hw-check-box>"
                    },
                    {
                        title: 'Custom Value Text',
                        description: 'User use custom String value Data ex) [\'YES | NO\', \'TRUE | FALSE\', \'ON | OFF\'] ',
                        option: {},
                        source: "<hw-check-box v-model='{switchData}' on-value='{true-value}', off-value='{false-value}'></hw-check-box>"
                    },

                ],
                propsData: [
                    {name: 'v-model', type:'String || Boolean', default:'false', desc: '' },
                    {name: 'onValue', type:'String', default:'', desc: '사용자 지정 True 텍스트' },
                    {name: 'offValue', type:'String', default:'', desc: '사용자 지정 False 텍스트' },
                ],
                previewSize: {
                    width: '100%'
                },
                radioData: true,
                checkData:true,
                radioList: [
                    {label: '사용', value: true},
                    {label: '미사용', value: false},
                ],
                checkboxList: [
                    {label: '메일', value: true},
                    {label: '전자결제', value: false},
                    {label: '근태관리', value: false},
                ],
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
            }
        },
        created() {
        },
        computed: {
            setRadioList() {
                return this.radioList
            }
        },
        methods: {
            toggleCode (evt) {
                let classArr = evt.target.nextSibling.classList.value;
                if(classArr.indexOf('show') > -1) {
                    evt.target.nextSibling.classList.remove('show')
                } else {
                    evt.target.nextSibling.classList.add('show')
                }
            },
            setValue(obj) {
                this.switchData = obj.value;
            },
            setTextValue(obj) {
                console.log(obj)
                if(obj.type === 'toggle') {
                    this.radioList.forEach((item, i)=> {
                        item.value = i === obj.idx ? true : false;
                    });
                }
                else if(obj.type === 'multi') {
                    this.checkboxList[obj.idx].value = obj.value;
                } else {
                    this.switchText = obj.value;
                }

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
        }
    }
</script>

<style lang="scss">


    .hw-switch-wrapper {
        display: flex;
        .result {
            padding: 0 10px;
            font-weight: 600;
        }

    }
    .hw-checkbox-group {
        display: flex;
        .hw-checkbox {
            /*margin-right: 5px;*/
            &:last-child {
                margin:0 !important;
            }
        }
    }



</style>