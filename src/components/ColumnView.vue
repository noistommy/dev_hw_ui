<template>
    <div class="type-wrapper">
<!--        <div class="column-view-option">-->
<!--            <div class="hw-button icon outline"><i class="fa fa-chevron-left"></i></div>-->
<!--        </div>-->
        <div class="hw-column-view">
            <template v-for="(column, index) in columnList" >
                <div class="column-panel" v-if="index >= setHideColumn" :key="column.level" :class="[{pColumn: index === columnList.length - 2}]" :style="{zIndex: `${10 - index}`}" >
                    <div class="directory-wrapper" :class="`level_${index}`">
                        <div class="no-data" v-if="column.dataList.length === 0">
                            <i class="fa fa-folder-reception"></i>
                        </div>
                        <div v-else class="dir-item" v-for="item in column.dataList" :class="{selected: item.id === column.pid}" :key="item.id" @click="selectItem(index, item)" >
                            <div class="file-icon"><i class="gis" :class="`${item.icon}`"></i></div>
                            <div class="dir-title ellipsis">{{item.title}}</div>
                            <div class="dir-icon tiny" v-if="item.children.length > 0"><i class="fa fa-chevron-right"></i></div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="path">
            <hw-breadcrumb :parents-list="pathList" :id-key="`id`" @move="moveByPath">
                <i class="fa fa-chevron-right" slot="divider" />
            </hw-breadcrumb>
        </div>
    </div>
</template>

<script>
    const treeList = [
        {id:'1-1', type: 'file', title: 'node1-1 긴 타이틀 작성 시 속성 값에 따라 말줄임 표시를 한다.',isExpanded: false, children:[], icon: 'fa fa-paper' },
        {id:'1-2',type: 'folder', title: 'node1-2',isExpanded: false, children:[
                {id:'1-2-1', title: 'node1-2-1',isExpanded: false, children:[
                        {id:'1-2-1-1', title: 'node1-2-1-1',isExpanded: false, children:[],icon: 'fa fa-folder' },
                        {id:'1-2-1-2', title: 'node1-2-1-2',isExpanded: false, children:[
                                {id:'1-2-3-2-1', title: 'node1-2-3-2-1',isExpanded: false, children:[], icon: 'fa fa-server' },
                            ],icon: 'fa fa-folder' },
                    ],icon: 'fa fa-folder' },
                {id:'1-2-2', title: 'node1-2-2',isExpanded: false, children:[],icon: 'fa fa-folder' },
                {id:'1-2-3', title: 'node1-2-3',isExpanded: false, children:[
                        {id:'1-2-3-1', title: 'node1-2-3-1',isExpanded: false, children:[],icon: 'fa fa-folder' },
                        {id:'1-2-3-2', title: 'node1-2-3-2',isExpanded: false, children:[
                                {id:'1-2-3-2-1', title: 'node1-2-3-2-1',isExpanded: false, children:[
                                        {id:'1-2-3-2-1-1', title: 'node1-2-3-2-1',isExpanded: false, children:[],icon: 'fa fa-folder' },
                                    ], icon: 'fa fa-folder' },
                            ],icon: 'fa fa-folder' },
                    ],
                    icon: 'fa fa-folder' },
                {id:'1-2-4', title: 'node1-2-4',isExpanded: false, children:[],icon: 'fa fa-folder' },
                {id:'1-2-5', title: 'node1-2-5',isExpanded: false, children:[], icon: 'fa fa-folder' },
                {id:'1-2-6', title: 'node1-2-6',isExpanded: false, children:[],icon: 'fa fa-folder' }
            ],icon: 'fa fa-folder' }
    ]

    export default {
        name: 'column-view',
        data () {
            return {
                type: 'extend',//slide, push
                maxLevel: 100,
                columnList: [
                    {level:0, dataList:treeList, pId: '0', title: 'TestTree'},
                ],
                pathList: [
                    {level: 0, title: 'Root'}
                ]
            }
        },
        computed: {
            getPath() {
                return this.columnList
            },
            setHideColumn() {
                return this.columnList.length - this.maxLevel
            },
        },
        methods: {
            selectItem(lev, target) {
                const {id, children, title} = target;
                // if(children.length === 0) return;
                this.columnList = this.columnList.slice(0, lev + 1);
                this.pathList = this.setPath(this.columnList);
                this.columnList[lev].pid = id;

                let new_level = lev + 1;
                let new_column = {level:new_level, title, dataList:children};
                this.columnList.push(new_column);
                this.pathList = [...this.pathList, {level: lev, title: target.title}]
                this.$nextTick(() => {
                    let container = this.$el.querySelector('.hw-column-view')
                    container.scrollLeft = container.scrollWidth
                })
            },
            moveByPath(target) {
                this.columnList = this.columnList.slice(0, target.level + 1);
                this.pathList = this.setPath(this.columnList)
                this.columnList[target.level].pid = '';
                this.pathList = [...this.pathList, {level: target.level + 1, title: target.title}]
            },
            setPath(list) {
                let pathArr = []
                list.forEach(el => {
                    pathArr = [...pathArr,{level:el.level, title:el.title}]
                })
                return pathArr
            }
        }
    }
</script>

<style lang="scss" scoped>
    .type-wrapper {
        width: 100%;
        height: 500px;
        position: relative;
        .column-view-option {
            position: absolute;
            margin-bottom: 10px;
            top:0;
            left: 20px;
        }
    }
    .hw-column-view {
        width: 100%;
        height: 100%;
        display: flex;
        border: 1px solid #D6D6D6;
        overflow: auto;
        .column-panel {
            background-color: #fff;
            min-width: 250px;
            max-width: 250px;
            border-right: 1px solid #D6D6D6;
            /*box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.16);*/
            .directory-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                padding: 4px;
                .dir-item {
                    display: flex;
                    align-items: center;
                    border-radius: 4px;
                    padding: 8px 10px;
                    margin-bottom: 4px;
                    .file-icon{
                        padding-right:  10px;
                        line-height: 1;
                        color: #FDC036;
                    }
                    .dir-icon {
                        font-size: 0.7em;
                        padding: 5px;
                    }
                    &:hover {
                        background-color: #f2f2f2;
                    }
                    &.selected {
                        color: #909090;
                        font-weight: 500;
                    }

                }
                .no-data {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3em;
                    color: #EBEBEB;
                }
            }


            &.pColumn {
                .directory-wrapper {
                    .dir-item.selected {
                        background-color: #2985DB;
                        color: #fff;
                    }
                }

            }
            &:last-child {
                flex-grow: 1;
                box-shadow: none;
                /*max-width: 100%;*/
                .directory-wrapper {
                    .dir-item.selected {
                        color: #333;
                    }
                }
            }
        }

    }
</style>
