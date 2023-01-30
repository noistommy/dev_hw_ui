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
                            hw-tree-view(
                                v-bind="type.option"
                                @g-create="onCreate"
                                @g-edit="onUpdate"
                                @g-delete="onDelete"
                                @g-drop="onDrop"
                            )

</template>
<script>
    import InformationView from './InformationView';
    export default {
        name: 'hw-treeview-view',
        data () {
            return {
                usage: `<hw-tree-view :container="String" :treeData="Object" @g-create="Function" @g-edit="Function" @g-delete="Function" @g-drop="Function"></hw-tree-view>`,
                propsData: [
                    {name: 'container', type:'String', default:'Null', desc: '트리뷰 UI를 발생시킬 부모 컨테이너 선택자' },
                    {name: 'treeData', type: 'Object', default: 'Null', desc: '트리뷰 렌더링을 위한 데이터 인스턴스'},
                    {name: 'treeData.name', type: 'String', default: 'New Node', desc: '트리의 노드 이름'},
                    {name: 'treeData.children', type: 'Array', default: '[] || undefined', desc: '트리의 자식 노드 리스트'},
                    {name: 'defaultNodeName', type: 'String', default: 'New Node', desc: '새로운 트리노드 생성시 기본 노드 이름'},
                    {name: 'createIcon', type: 'String', default: 'gi gi-plus', desc: '노드 생성 버튼 아이콘 클래스'},
                    {name: 'deleteIcon', type: 'String', default: 'gi gi-trash', desc: '노드 삭제 버튼 아이콘 클래스'},
                    {name: 'editIcon', type: 'String', default: 'gi gi-pencil', desc: '노드 수정 버튼 아이콘 클래스'},
                    {name: 'updateIcon', type: 'String', default: 'gi gi-check', desc: '노드 수정 완료 버튼 아이콘 클래스'},
                    {name: 'maxLevel', type: 'Number', default: '4', desc: '트리의 최대 깊이'}
                ],
                eventData: [
                    {name: 'g-create', type: 'Object', desc: '{done(트리 데이터 조작을 막는 락을 해제하는 함수 파라미터), name(노드 생성시 입력한 노드 이름), path(생성한 노드로부터 루트노드까지의 경로)}'},
                    {name: 'g-edit', type: 'Object', desc: '{done, name, path}'},
                    {name: 'g-delete', type: 'Object', desc: '{done, path}'},
                    {name: 'g-drop', type: 'Object', desc: '{done, path}'},
                ],
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                contentList: [
                    {
                        title: 'Standard',
                        description: 'A Standard TreeView',
                        option: {
                            container: '.type-preview',
                            treeData: {
                                name: 'Root Node',
                                children: []
                            }
                        }
                    },
                    {
                        title: 'MaxLevel = 6',
                        description: '트리의 최대 깊이를 설정합니다.',
                        option: {
                            container: '.type-preview',
                            maxLevel: 6,
                            treeData: {
                                name: 'Root Node',
                                children: []
                            }
                        }
                    },
                    {
                        title: 'DefaultNodeName = \'새 노드\'',
                        description: '트리 노드 생성시 노드의 기본 이름을 설정합니다.',
                        option: {
                            container: '.type-preview',
                            defaultNodeName: '새 노드',
                            treeData: {
                                name: 'Root Node',
                                children: []
                            }
                        }
                    },
                    {
                        title: 'createIcon = \'gis gi-star\'',
                        description: 'gtris-icon 클래스 목록중 선택하여 노드 생성 아이콘을 설정합니다.',
                        option: {
                            container: '.type-preview',
                            createIcon: 'gis gi-star',
                            treeData: {
                                name: 'Root Node',
                                children: []
                            }
                        }
                    },
                    {
                        title: 'deleteIcon = \'gis gi-star\'',
                        description: 'gtris-icon 클래스 목록중 선택하여 노드 삭제 아이콘을 설정합니다.',
                        option: {
                            container: '.type-preview',
                            deleteIcon: 'gis gi-star',
                            treeData: {
                                name: 'Root Node',
                                children: []
                            }
                        }
                    },
                    {
                        title: 'editIcon = \'gis gi-star\'',
                        description: 'gtris-icon 클래스 목록중 선택하여 노드 수정 아이콘을 설정합니다.',
                        option: {
                            container: '.type-preview',
                            editIcon: 'gis gi-star',
                            treeData: {
                                name: 'Root Node',
                                children: []
                            }
                        }
                    },
                    {
                        title: 'updateIcon = \'gis gi-star\'',
                        description: 'gtris-icon 클래스 목록중 선택하여 노드 수정 완료 아이콘을 설정합니다.',
                        option: {
                            container: '.type-preview',
                            updateIcon: 'gis gi-star',
                            treeData: {
                                name: 'Root Node',
                                children: []
                            }
                        }
                    },{
                        title: 'insert data',
                        description: 'A Standard TreeView',
                        option: {
                            container: '.type-preview',
                            treeData: {
                                name: 'Root Node',
                                children: [
                                    {id:0, name: 'node1',children:[]},
                                    {id:1, name: 'node2',children:[]},
                                    ]
                            }
                        }
                    },
                ],
                previewSize: {'width': '1000px'}
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
            onCreate({done, name, path}){
                console.log(name, path)
                done()
            },
            onUpdate({done, name, path}){
                console.log(name, path)
                done()
            },
            onDelete({done, path}){
                console.log(path)
                done()
            },
            onDrop({done, path}){
                console.log(path)
                done()
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
    .type-preview{
        border: 1px dashed #ccc;
    }
</style>
