<template lang="pug">
    div.date-picker-view
        .contents-detail-view
            hw-tab(:tab-list="tabList", v-slot="{tab}", :tab-class="`tab-item`")
                span(@click="setContents(tab.key)") {{tab.name}}
            .contents-section
                .section-title Types
                    .type-wrapper
                        .type-title 기본 트리 리스트
                        .type-desc
                        .type-preview
                            .hw-tree-list-container
                                hw-tree-list(v-for="child in treeData", :key="child.id", :tree-data="child", :level="0", @location="getPathStr")
                    .type-wrapper
                        .type-title 트리 리스트 선택
                        .type-desc
                        .type-preview
                            .hw-tree-list-container
                                hw-tree-list(v-for="child in treeData", :key="child.id", :tree-data="child", :level="0", :selected-node="selectedItem" @location="getPathStr" @select="setSelect")
                    .type-wrapper
                        .type-title 트리 타이틀 Ellipsis
                        .type-desc 200px 적용. (기본값: 300px)
                        .type-preview
                            .hw-tree-list-container
                                hw-tree-list(v-for="child in treeData", :key="child.id", :tree-data="child", :level="0", :max-wrap-size="250")
                    .type-wrapper
                        .type-title 전체 트리 Expand / Collapse
                        .type-desc
                        .type-controll
                            .hw-button.secondary.small(@click="toggleAll")
                                .label 전체 {{allOpen ? '닫기' : '열기'}}
                        .type-preview
                            .hw-tree-list-container
                                hw-tree-list(v-for="child in treeData", :key="child.id", :tree-data="child", :level="0", :all-expanded="allOpen")
                    .type-wrapper
                        .type-title 트리 레벨 지정
                        .type-desc 3레벨 적용. 지정된 레벨 수 만큼 표시하고 표시된 레벨의 상위 레벨은 Collapse 처리 (기본값: -1(false))
                        .type-preview
                            .hw-tree-list-container
                                hw-tree-list(v-for="child in treeData", :key="child.id", :tree-data="child", :level="currentLevel", :set-limit="3", @change="setLevel")

</template>
<script>
    import InformationView from './InformationView';
    export default {
        name: 'hw-tree-list-view',
        data () {
            return {
                selectedItem: '',
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                currentLevel: 0,
                allOpen: true,
                treeData: [
                    {
                        id: 1,
                        title: 'Node1',
                        isExpanded: false,
                        children: [
                            {id:'1-1', title: 'node1-1 긴 타이틀 작성 시 속성 값에 따라 말줄임 표시를 한다.',isExpanded: false, children:[], icon: 'fa fa-server' },
                            {id:'1-2', title: 'node1-2',isExpanded: false, children:[
                                    {id:'1-2-1', title: 'node1-2-1',isExpanded: false, children:[],icon: 'fa fa-server' },
                                    {id:'1-2-2', title: 'node1-2-2',isExpanded: false, children:[],icon: 'fa fa-server' },
                                    {id:'1-2-3', title: 'node1-2-3',isExpanded: false, children:[
                                            {id:'1-2-3-1', title: 'node1-2-3-1',isExpanded: false, children:[],icon: 'fa fa-server' },
                                            {id:'1-2-3-2', title: 'node1-2-3-2',isExpanded: false, children:[
                                                    {id:'1-2-3-2-1', title: 'node1-2-3-2-1',isExpanded: false, children:[], icon: 'fa fa-server' },
                                                ],icon: 'fa fa-server' },
                                        ],
                                        icon: 'fa fa-server' },
                                    {id:'1-2-4', title: 'node1-2-4',isExpanded: false, children:[],icon: 'fa fa-server' },
                                    {id:'1-2-5', title: 'node1-2-5',isExpanded: false, children:[], icon: 'fa fa-server' },
                                    {id:'1-2-6', title: 'node1-2-6',isExpanded: false, children:[],icon: 'fa fa-server' }
                                ],icon: 'fa fa-server' }
                        ],
                        icon: 'fa fa-server'
                    },{
                        id: 2,
                        title: 'Node2',
                        isExpanded: false,
                        children: [
                            {id:'2-1', title: 'node2-1',isExpanded: false, children:[],icon: 'fa fa-server' },
                            {id:'2-2', title: 'node2-2',isExpanded: false, children:[
                                    {id:'1-2', title: 'node1-2',isExpanded: false, children:[
                                            {id:'1-2-1', title: 'node1-2-1',isExpanded: false, children:[],icon: 'fa fa-server' },
                                            {id:'1-2-2', title: 'node1-2-2',isExpanded: false, children:[],icon: 'fa fa-server' },
                                            {id:'1-2-3', title: 'node1-2-3',isExpanded: false, children:[
                                                    {id:'1-2-3-1', title: 'node1-2-3-1',isExpanded: false, children:[],icon: 'fa fa-server' },
                                                ],icon: 'fa fa-server' }
                                        ],icon: 'fa fa-server' }
                                ],icon: 'fa fa-server' }
                        ],
                        icon: 'fa fa-server'
                    }
                ]
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
            setLevel(value) {
                if(!value && this.currentLevel === 0) return;
                let state = value ? -1 : 1;
                this.currentLevel = this.currentLevel + state;
            },
            toggleAll() {
                this.allOpen = !this.allOpen;
            },
            getPathStr(pathArr) {
                // console.log(pathArr)
                let pathStr = pathArr.join('>');
                console.log(pathStr)
            },
            setSelect(payload) {
                console.log(payload)
                this.selectedItem = payload.id
            }
        }
    }
</script>

<style lang="scss" scoped>
    $list-border-color: #d6d6d6;
    $title-background-color: #f8f8f8;
    .content-wrap{
        min-height: 500px;
    }

    .hw-tree-list-container {
        position: relative;
        width: 300px;
        overflow: hidden;
        border: 1px solid #ebebeb;
    }
</style>
