<template lang="pug">
    div.date-picker-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                template(v-if="showInfo")
                    components(
                        :is="infoComp",
                        :usage="usage",
                        :props-data="propsData",
                        :event-data="eventData"
                    )
                template(v-else)
                    .section-title Types
                    .type-wrapper(v-for="(type, index) in contentList", :key="index")
                        .type-title {{type.title}}
                        .type-desc {{type.description}}
                        .type-preview(:style="previewSize")
                            .hw-button.primary(@click="showModal(type.modalOptions, type.modalProps)") 모달 열기
               
</template>
<script>
    import Sample from './Sample'
    import InformationView from './InformationView';
    export default {
        name: 'hw-modal-view',
        data () {
            return {
                usage: `this.$hwModal.show(modalComp, modalProps, modalOptions, modalHandlers)`,
                propsData: [
                    {name: 'modalComp', type:'Object', default:'Null', desc: '모달 컨텐트 영역에 렌더링시킬 컴포넌트' },
                    {name: 'modalProps', type:'Object', default:'{}', desc: '렌더링 되는 컴포넌트에 입력되는 프로퍼티' },
                    {name: 'modalOptions', type:'Object', default:'{}', desc: '모달을 활성화 시킬 때 적용할 옵션' },
                    {name: 'modalOptions.useStack', type:'Boolean', default:'false', desc: '새로운 모달 인스턴스 생성시 기존의 인스턴스를 전부 제거후 발생시킬지 여부' },
                    {name: 'modalOptions.closeWhenClick', type:'Boolean', default:'false', desc: '모달 컨텐트 영역 외부 클릭시 모달 비활성화 여부' },
                    {name: 'modalOptions.closeWhenEscape', type:'Boolean', default:'false', desc: '모달이 활성화 된 이후 ESC키 입력시 모달 비활성화 여부' },
                    {name: 'modalHandlers', type:'Object', default:'{}', desc: '모달을 활성/비활성 하는 단계에서 적용할 훅 함수' },
                    {name: 'modalHandlers.after-show', type:'Function', default: 'undefined', desc: '모달이 도큐먼트에 렌더링 되었을 때 실행할 함수'},
                    {name: 'modalHandlers.before-close', type:'Function', default:'undefined', desc: '모달이 비활성화 되기 전에 실행할 함수' },
                ],
                eventData: [
                    {name: 'close', type: 'Object', desc: '동적으로 렌더링 된 컴포넌트가 $emit(\'close\')를 발생시키면 Wrapper 컴포넌트가 자기 자신을 도큐먼트로부터 삭제.'},
                    {name: 'closeAll', type: 'Array', desc: '동적으로 렌더링 된 컴포넌트가 $emit(\'closeAll\')를 발생시키면 Wrapper 컴포넌트가 자기 자신을 포함한 모든 HwModal 인스턴스를 도큐먼트로부터 삭제.'},
                ],
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                contentList: [
                {
                    title: 'Standard',
                    description: 'A Standard Modal',
                },
                {
                    title: 'clickToClose = true',
                    description: '모달 컨텐트 외부영역 클릭시 비활성화',
                    modalOptions: {
                        clickToClose: true,
                    },
                    modalProps: {
                        type: 'clickToClose'
                    }
                },
                {
                    title: 'escapeToClose = true',
                    description: '모달이 활성화 된 후 ESC키 입력시 비활성화',
                    modalOptions: {
                        escapeToClose: true,
                    },
                    modalProps: {
                        type: 'escapeToClose'
                    }
                }],
                previewSize: '500px'
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
            showModal(options = {}, props = {}){
                this.$hwModal.show({
                    modalComp: Sample,
                    modalOptions: options,
                    modalProps: props
                })
            }
        }
    }
</script>

<style lang="scss">
    .content-wrap{
        min-height: 500px;
    }
</style>
