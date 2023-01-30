<template lang="pug">
    div.date-picker-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                template(v-if="showInfo")
                    components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
                template(v-else)
                    .section-title Types
                    .content-wrap.type-wrapper
                        .type-title 기본 게이지 바
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`기본`", :data="progressData")
                        .type-title 둥근 게이지 바
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`Round Type: List`", :data="progressData", :round="true")
                                hw-progress-bar(:title="`Round Type: Item`", :data="progressData", :round="true", :round-type="`item`")
                        .type-title 테두리 사용
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`기본 게이지 테두리 `", :data="progressData", :is-border="true")
                                hw-progress-bar(:title="`둥근 게이지 테두리 `", :data="progressData", :round="true", :is-border="true")
                                hw-progress-bar(:title="`둥근 게이지 테두리 `", :data="progressData", :round="true", :round-type="`item`", :is-border="true")
                        .type-title 게이지 두께 사용자화
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`두께 10px `", :data="progressData", :thick-size="thick")
                                hw-progress-bar(:title="`두께 20px`", :data="progressData", :thick-size="20")
                                hw-progress-bar(:title="`두께 30px `", :data="progressData", :thick-size="30")
                                hw-progress-bar(:title="`두께 40px `", :data="progressData", :thick-size="40" )
                        .type-title 범주 데이터 표시 타입
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`기본 범주 표시`", :data="progressData", :use-scale="true")
                                hw-progress-bar(:title="`원 범주 표시`", :data="progressData", :use-scale="true", :scale-type="`circle`")
                                hw-progress-bar(:title="`둥근 범주 표시`", :data="progressData", :use-scale="true", :scale-type="`round`")
                                hw-progress-bar(:title="`선 범주 표시`", :data="progressData", :use-scale="true", :scale-type="`line`")
                        .type-title 범주 데이터 표시 간격
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`범주 표시 간격 조절. 20px`", :data="progressData", :use-scale="true")
                                hw-progress-bar(:title="`범주 표시 간격 조절. 40px`", :data="progressData", :use-scale="true", :scale-gap="40")
                                hw-progress-bar(:title="`범주 표시 간격 조절. 60px`", :data="progressData", :use-scale="true", :scale-gap="60")
                        .type-title 범주 표시 위치
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`왼쪽 범주 표시`", :data="progressData", :use-scale="true", :scale-direction="`start`")
                                hw-progress-bar(:title="`오른쪽 범주 표시`", :data="progressData", :use-scale="true", :scale-direction="`end`")
                                hw-progress-bar(:title="`중앙 범주 표시`", :data="progressData", :use-scale="true", :scale-direction="`center`")
                        .type-title 게이지 텍스트 표시
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`아이템 이름`", :data="progressData", :show-title="true")
                                hw-progress-bar(:title="`아이템 값`", :data="progressData", :show-value="true")
                                hw-progress-bar(:title="`이름 우선 표시 `", :data="progressData", :show-value="true", :show-title="true")
                        .type-title 게이지 텍스트 스타일
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`색상`", :data="progressData", :show-title="true", :value-style="{color: '#fff'}")
                                hw-progress-bar(:title="`색상2`", :data="progressData", :show-title="true", :value-style="{color: '#2985db'}")
                                hw-progress-bar(:title="`색상+두께`", :data="progressData", :show-title="true", :value-style="{color: '#fff', fontWeight: 600}")
                        .type-title 기본 게이지 텍스트 위치
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`Center`", :data="progressData", :show-title="true")
                                hw-progress-bar(:title="`left`", :data="progressData", :show-value="true", :value-pos="`left`")
                                hw-progress-bar(:title="`Right`", :data="progressData", :show-value="true", :show-title="true", :value-pos="`right`")
                                hw-progress-bar(:title="`Top-Center`", :data="progressData", :show-title="true", :value-pos="`top-center`")
                                hw-progress-bar(:title="`Top-left`", :data="progressData", :show-value="true", :value-pos="`top-left`")
                                hw-progress-bar(:title="`Top-Right`", :data="progressData", :show-value="true", :show-title="true", :value-pos="`top-right`")
                                hw-progress-bar(:title="`Bottom-Center`", :data="progressData", :show-title="true", :value-pos="`bottom-center`")
                                hw-progress-bar(:title="`Bottom-left`", :data="progressData", :show-value="true", :value-pos="`bottom-left`")
                                hw-progress-bar(:title="`Bottom-Right`", :data="progressData", :show-value="true", :show-title="true", :value-pos="`bottom-right`")
                        .type-title 게이지 컬러 사용자화
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`사용자 컬러셋`", :data="progressData", :color-set="colorSetClasses")
                        .type-title 제목 사용 안함
                        .type-preview
                            .progress-box
                                hw-progress-bar( :data="progressData")
                        .type-title 제목 슬롯
                        .type-preview
                            .progress-box
                                hw-progress-bar(:title="`none`", :data="progressData")
                                    div.h1.slotTitle(:slot="`title`") 사용자 지정 제목 사용
                        .type-title 게이지 데이터 사용
                        .type-desc
                        .type-preview
                            .insert-value
                                span 게이지 벨류 :
                                .hw-input.inline
                                    input.hw-input(:placeholder="`0`", :class="`standard`", v-model="gauge.ratio", :style="{width: '80px', textAlign: 'center', fontWeight: 600}")
                            .progress-box
                                hw-progress-bar(:title="exTitle", :data="exDataList", :gauge-data="gauge", :show-title="true", :is-border="true", :round="true", :value-pos="`bottom-right`", :value-style="{color: '#999', fontSize: '1.2em'}")
                                hw-progress-bar(:title="exTitle",  :gauge-data="gauge", :show-title="true", :is-border="true", :round="true", :value-pos="`bottom-right`", :value-style="{color: '#999', fontSize: '1.2em'}")



</template>

<script>
    import InformationView from "./InformationView";

    export default {
        name: 'hw-progress-bar-view',
        components:{InformationView},
        data () {
            return {
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                usage: `<hw-progress-bar :title="title" :data="data" :colorSet="colorSetClasses" ></hw-progress-bar>`,
                propsData: [
                    {name: 'title', type: 'String', default: 'Hw-Progress', desc: '프로그레스바 타이틀'},
                    {name: 'titleAlign', type: 'String', default: 'top-left', desc:
                            '프로그레스바 타이틀 표시 위치. [top-left, top-center, top-right]'},
                    {name: 'data', type: 'Array', default:
                            '[{text: defaultText, ratio: 100, progress: 100, backgroundClass: blue}]', desc:
                            '프로그레스바 렌더링을 위한 데이터 인스턴스'},
                    {name: 'data.text', type: 'String', default: '', desc: '프로그레스 아이템 각각의 제목'},
                    {name: 'data.ratio', type: 'Number', default: '', desc: '프로그레스 아이템 각각의 구성비'},
                    {name: 'data.progress', type: 'Number', default: '', desc: '프로그레스 아이템 각각의 내부 비율'},
                    {name: 'data.backgroundClass', type: 'String', default: '', desc: '프로그레스 아이템 색상 적용을 위한 클래스'},
                    {name: 'colorSet', type: 'Array', default: '[' +
                            '        \'red\', \'orange\', \'yellow\', \'lightgreen\'' +
                            '        \'green\', \'lightblue\', \'blue\', \'deepblue\'' +
                            '        \'purple\', \'deeppurple\', \'brown\', \'gray\'' +
                            '      ]', desc: '프로그레스 아이템 컬러셋 클래스 리스트'},
                ],
                eventData: [
                ],
                title: 'Title',
                progressData: [
                    {
                        text: '자는중',
                        textAlign: 'center',
                        ratio: 20,
                        progress: 100,
                        //backgroundClass: 'red'
                    },
                    {
                        text: '일어나는중',
                        textAlign: 'center',
                        ratio: 20,
                        progress: 100,
                        //backgroundClass: 'orange'
                    },
                    {
                        text: '씻는중',
                        textAlign: 'center',
                        ratio: 50,
                        progress: 100,
                        //backgroundClass: 'yellow'
                    },
                    {
                        text: '가는중',
                        ratio: 10,
                        progress: 100,
                        //backgroundClass: 'lightgreen'
                    }
                ],
                colorSetClasses: ['green','orange', 'gray', 'blue', 'deepblue','purple'],
                thick: 10,
                exTitle: '주간 근무 현황 20시간 17분',
                exDataList: [
                    {
                        text: '40h',
                        textAlign: 'bottom-right',
                        ratio: 40*100/52,
                        progress: 100,
                        backgroundClass: 'secondary'
                    },
                    {
                        text: '52h',
                        textAlign: 'bottom-right',
                        ratio: 100 - (40*100/52),
                        progress: 100,
                        backgroundClass: 'secondary'
                    },
                ],
                gauge: {
                    ratio: 50,
                    background: 'primary-bg'
                }
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

        }
    }
</script>

<style lang="scss">
    .content-wrap{
        min-height: 250px;
    }
    .progress-box {
        padding: 20px;
        border: 1px solid #d6d6d6;
        .hw-progress-bar {
            margin-bottom: 20px;
        }
    }
    .slotTitle {
        color: #2985DB;
        font-weight: 500;
        border-radius: 10px;
        padding: 2px 10px;
    }
    .insert-value {
        margin: 5px;
    }
</style>
