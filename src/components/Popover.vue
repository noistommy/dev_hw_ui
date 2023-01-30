<template lang="pug">
    div.date-picker-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                template(v-if="showInfo")
                    components(:is="infoComp", :usage="usage", :props-data="propsData", :event-data="eventData")
                template(v-else)
                    .title methods
                    .flex-wrapper
                        .flex-item
                            span 기본 방향
                            hw-select(:option-list="sideOption", v-model="sideOption[0]", :key-name="'option'", :option-name="'option'", @update="onSideUpdate")
                        .flex-item
                            span 다음 방향
                            hw-select(:option-list="sideOption2", v-model="sideOption2[0]", :key-name="'option'", :option-name="'option'", @update="onSideUpdate2")
                    .preview-wrapper
                        .hw-button.primary(@click="open") {{side}}-{{side2}}
                
</template>

<script>
    import InformationView from "./InformationView";
    import Sample from './Sample'
    export default {
        name: 'hw-popover-view',
        components: {
            Sample,
            InformationView
        },
        data () {
            return {
                usage: `this.$popover.open(component, componentProps, popoverProps, eventTarget)`,
                contentsList: [
                ],
                propsData: [
                    {name: 'distance', type:'Number', default:'20', desc: '이벤트를 발생시킨 엘리먼트와 팝오버 사이의 간격' },
                    {
                        name: 'placement', 
                        type:'String', 
                        default:'bottom-center', 
                        desc: `이벤트를 발생시킨 엘리먼트를 기준으로 한 팝오버 생성 방향 [
                            'top-start','top-center','top-end',
                            'right-start','right-center','right-end',
                            'bottom-start','bottom-center','bottom-end',
                            'left-start','left-center','left-end'
                        ]`
                    },
                    {name: 'responsive', type:'Boolean', default:'true', desc: '윈도우 리사이징으로 인해 엘리먼트의 위치가 변화할 경우 팝오버의 위치도 갱신여부' },
                    {name: 'useArrow', type:'Boolean', default:'true', desc: '팝오버 화살표 UI 표시 여부' },
                    {name: 'containerClass', type: 'String', default:'', desc: '팝오버 컨테이너에 적용할 커스텀 클래스 이름'},
                    {name: 'arrowClass', type: 'String', default: '', desc: '팝오버 화살표 UI에 적용할 커스텀 클래스 이름'},
                ],
                eventData: [
                    {name: 'open(...args)', return: 'Null', desc: '팝오버를 이벤트를 발생시킨 엘리먼트를 기준으로 표시.'},
                    {name: 'close()', return: 'Null', desc: '표시하고 있는 팝오버 제거.'},
                    {name: 'setGlobalOptions(arg)', return: 'Null', desc: '팝오버 생성시 적용되는 설정값 변경.'}
                ],
                previewSize: {
                    width: '725px',
                },
                sideOption: [
                    {value: 'top', option: 'top'},
                    {value: 'bottom', option: 'bottom'},
                    {value: 'left', option: 'left'},
                    {value: 'right', option: 'right'},
                ],
                sideOption2: [
                    {value: 'start', option: 'start'},
                    {value: 'center', option: 'center'},
                    {value: 'end', option: 'end'},
                ],
                side: 'top',
                side2: 'start',
                showInfo: false,
                infoComp: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
            }
        },
        methods: {
            open(event){
                this.$popover.open(Sample,null,{placement: `${this.side}-${this.side2}`}, event.target);
            },
            onSideUpdate(option){
                this.side = option.value
            },
            onSideUpdate2(option){
                this.side2 = option.value
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
    .date-picker-view{
        .contents-detail-view{
            height: 2000px;
            overflow-y: scroll;
        }
        .hw-button{
            /*margin-right: 80px;*/
        }
    }
    .flex-wrapper{
        display: flex;
        .flex-item:first-child{
            margin-right: 10px;
        }
    }
    .preview-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 600px;
    }
</style>
