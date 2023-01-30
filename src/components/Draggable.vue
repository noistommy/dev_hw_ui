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
                    .title Types
                    .type-wrapper(v-for="(type, index) in contentList", :key="index")
                        .type-title {{type.title}}
                        .type-desc {{type.description}}
                        .type-preview(:style="previewSize")
                            hw-draggable(v-bind="type.option")
                                div.apple-item(v-for="item in type.option.list", :key="item.id")
                                    span.item-handle(v-if="type.option.handleClass")
                                        i(class="gis gi-grab") 
                                    span {{item.name}}
</template>
<script>
    import InformationView from './InformationView';
    export default {
        name: 'hw-draggable-view',
        data () {
            return {
                usage: `<hw-draggable><slot></slot></hw-draggable>`,
                propsData: [
                    {name: 'list', type:'Array', default:'[]', desc: '리스트 데이터 인스턴스' },
                    {name: 'itemClass', type:'String', default: '\'\'', desc: '드래그 & 드롭 대상으로 지정할 아이템 클래스 선택자'},
                    {name: 'ghostClass', type:'String', default: '\'\'', desc: '드래그중인 아이템을 강조 표시하기 위한 클래스'},
                    {name: 'handleClass', type:'String', default: '\'\'', desc: '핸들 UI를 이용하는 경우 해당 Element의 클래스 선택자 입력을 통해 해당 영역을 통해서만 드래그 & 드롭이 동작'}
                ],
                eventData: [],
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                contentList: [
                    {
                        title: 'Standard',
                        description: 'A Standard Draggable',
                        option: {
                            list: [ 
                                { id: 1, name: 'apple1' },
                                { id: 2, name: 'apple2' },
                                { id: 3, name: 'apple3' },
                                { id: 4, name: 'apple4' },
                                { id: 5, name: 'apple5' }
                            ],
                            itemClass: 'apple-item'
                        }
                    }, 
                    {
                        title: 'Ghost',
                        description: '드래그중인 아이템이 놓여질 위치를 표시하기 위해 적용할 클래스를 설정합니다.',
                        option: {
                            list: [ 
                                { id: 1, name: 'apple1' },
                                { id: 2, name: 'apple2' },
                                { id: 3, name: 'apple3' },
                                { id: 4, name: 'apple4' },
                                { id: 5, name: 'apple5' }
                            ],
                            itemClass: 'apple-item',
                            ghostClass: 'ghost'
                        }
                    },
                    {
                        title: 'Handle',
                        description: '핸들 UI 영역을 통해서만 드래그 앤 드롭 기능을 사용할 수 있게 합니다.',
                        option: {
                            list: [ 
                                { id: 1, name: 'apple1' },
                                { id: 2, name: 'apple2' },
                                { id: 3, name: 'apple3' },
                                { id: 4, name: 'apple4' },
                                { id: 5, name: 'apple5' }
                            ],
                            itemClass: 'apple-item',
                            ghostClass: 'ghost',
                            handleClass: 'item-handle'
                        }
                    }
                ],
                previewSize: {
                    width: '100%'
                }
            }
        },
        mounted(){
            setTimeout(() => {
                this.contentList[2].option.list.push({
                    id: 6,
                    name: 'apple6'
                })
            }, 2000)
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
    .apple-item{
        height: 50px;
        display: flex;
        align-items: center;
        border: 1px dashed #ccc;
        padding-left: 10px;
        &:not(:last-child){
            margin-bottom: 10px;
        }
    }
    .ghost{
        border: 2px dashed #2985db !important;
    }
    .item-handle{
        position: relative;
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border: 1px solid #ccc;
        i{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
