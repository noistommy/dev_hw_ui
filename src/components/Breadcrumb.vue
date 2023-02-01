<template lang="pug">
div.context-menu-view
    .contents-detail-view
        hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
            span(@click="setContents(tab.key)") {{tab.name}}
        #HwBreadcrumb.contents-section
            template(v-if="showInfo")
                components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
            template(v-else)
                .section-title Types
                .type-wrapper
                    .type-title 기본
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb(:type="type", :parents-list="parentsLevel", :id-key="`level`" @move="getLink")
                .type-wrapper
                    .type-title 기본 (현재 경로 SLOT)
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb(:type="type", :parents-list="parentsLevel", :active-level="activeLevel", :id-key="`level`")
                            .slot-title 현재 페이지
                .type-wrapper
                    .type-title 기본 (step mode) :: 추후 따로 모듈로 제작 예정
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb(:type="`stepper`", :parents-list="parentsLevel", :active-level="activeLevel",:id-key="`level`")
                .type-wrapper
                    .type-title 기본 (아이콘)
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb( :parents-list="parentsLevel", :active-level="activeLevel", :is-icon="true", :id-key="`level`"  @move="getLink")
                .type-wrapper
                    .type-title 기본
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb( :parents-list="parentsLevel", :active-level="activeLevel", :divider="divider", :id-key="`level`")
                .type-wrapper
                    .type-title 기본 (타이틀 표기 축약)
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb( :parents-list="parentsLevel_long", :active-level="activeLevel", :divider="divider", :id-key="`level`")
                .type-wrapper
                    .type-title 기본 (사용자 구분선 사용)
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb( :parents-list="parentsLevel", :active-level="activeLevel", :divider="`|`", :id-key="`level`")
                .type-wrapper
                    .type-title 기본 (SLOT 구분선 사용)
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb( :parents-list="parentsLevel", :active-level="activeLevel", :divider="`|`", :id-key="`level`")
                            i.fa.fa-chevron-right(slot="divider")
                .type-wrapper
                    .type-title 기본
                    .type-desc
                    .type-preview(:style="previewSize")
                        hw-breadcrumb( :parents-list="convertedPath", :display-path="5", :id-key="`level`")

                //.type-wrapper
                    .blobs(:class="{active:toggle}", @click="switchBtn")
                        .blob-left
                        .switch
                        .blob-right
                    svg
                        filter#gooey
                            feGaussianBlur(in="SourceGraphic", stdDeviation="10", result="blur")
                            feColorMatrix(in="blur", mode="matrix", values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7", result="gooey")
                            feComposite(in="SourceGraphic", in2="gooey", operator="atop")

</template>

<!--<svg>-->
<!--    <filter id="gooey">-->
<!--        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>-->
<!--        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey"></feColorMatrix>-->
<!--        <feComposite in="SourceGraphic" in2="gooey" operator="atop"></feComposite>-->
<!--    </filter>-->
<!--</svg>-->

<script>
    export default {
        name: 'breadcrumb-view',
        data () {
            return {
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                previewSize:{width: '770px'},
                type: 'divider', //divider, stepper, path
                parentsLevel: [
                    {level:0, title: 'Home', link: '/', icon: 'user'},
                    {level:1, title: 'Level1', link: '/level_1', icon: 'pencil'},
                    {level:2, title: 'Level2', link: '/level_1/level_2', icon: 'browser'},
                ],
                parentsLevel_long: [
                    {level:0, title: '개인드라이브', link: '', icon: 'user'},
                    {level:1, title: '김 수한무 거북이와 두루미의 폴더', link: '', icon: 'pencil'},
                    {level:2, title: '아리스토멜레스가 존경하는 소크라테스의 외처조카의 폴더', link: '', icon: 'browser'},
                    {level:3, title: '널 믿었던만큼 난 널 내 친구에게 소개시켜준 사람의 폴더', link: '', icon: 'browser'},
                ],
                parentsLevel_many: [
                    {level:0, title: '개인드라이브', link: '/', icon: 'user'},
                    {level:1, title: '개인 폴더 1', link: '/level_1', icon: 'pencil'},
                    {level:2, title: '개인 폴더 2', link: '/level_1/level_2', icon: 'browser'},
                    {level:3, title: '개인 폴더 3', link: '/level_1/level_2/level_2_1', icon: 'browser'},
                    {level:4, title: '개인 폴더 4', link: '/level_1', icon: 'pencil'},
                    {level:5, title: '개인 폴더 5', link: '/level_1/level_2', icon: 'browser'},
                    {level:6, title: '개인 폴더 6', link: '/level_1/level_2/level_2_1', icon: 'browser'},
                    {level:7, title: '개인 폴더 7', link: '/level_1', icon: 'pencil'},
                    {level:8, title: '개인 폴더 8', link: '/level_1/level_2', icon: 'browser'},
                    {level:9, title: '개인 폴더 9', link: '/level_1/level_2/level_2_1', icon: 'browser'},
                ],
                stringPath: '개인 드라이브/개인폴더1/개인폴더2/개인폴더3/개인폴더4/현재폴더',
                convertedPath: [],
                activeLevel: 'Selected Item',
                divider: '/',
                isIcon: true,
                iconName: 'folder',
                toggle: false
            }
        },
        created() {
            this.setPathArray();
        },
        methods: {
            switchBtn() {
                this.toggle = !this.toggle
            },
            setPathArray () {
                let pathArr = this.stringPath.split('/');

                console.log(pathArr);

                pathArr.forEach((path, index) => {
                    let pathItem = {level:0, title: '', link:'', icon: ''};
                    pathItem.title = path;
                    pathItem.level = index;
                    this.convertedPath.push(pathItem)
                })
            },
            getLink(payload) {
                console.log(payload)
            }
        }
    }

</script>

<style lang="scss">
    #HwBreadcrumb {
        .type-preview {
            padding: 20px;
            border: 1px solid #ebebeb;

        }
    }
    .hw-breadcrumb {
        .level-node {
            &.root .node-wrap {
                color: #da5a15;
                .title {
                    color: #da5a15;
                }
            }
            &.current {
                color: #2985DB;
                .title {
                    color: #2985DB;
                }
            }
        }
    }
</style>