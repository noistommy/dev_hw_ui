<template>
    <div class="template-view">
        <div class="contents-section">
            <div class="section-title">Side Navigation</div>
            <div class="type-wrapper">
                <div class="type-title">기본 메뉴</div>
                <div class="type-preview">
                    <div class="hw-navigation">
                        <div class="nav-header">
                            <div class="hw-button primary fluid">
                                <span class="label">기본 버튼</span>
                            </div>
                        </div>
                        <div class="nav-main">
                            <div class="nav-list">
                                <hw-list :list-data="mainList" :with-icon="true"></hw-list>
                            </div>
                            <div class="partition"></div>
                        </div>
                    </div>
                </div>
                <div class="type-title">기본 메뉴 + 메뉴 설명 </div>
                <div class="type-preview">
                    <div class="hw-navigation">
                        <div class="nav-header">
                            <div class="hw-button primary fluid">
                                <span class="label">기본 버튼</span>
                            </div>
                        </div>
                        <div class="nav-main">
                            <div class="nav-list">
                                <hw-list :list-data="mainList" :with-icon="true">
                                    <template v-slot="slotProps">
                                        <div class="main-title">{{slotProps.contentText.title}}</div>
                                        <div class="sub-title">{{slotProps.contentText.text}}</div>
                                    </template>
                                </hw-list>
                            </div>
                            <div class="partition"></div>
                        </div>
                    </div>
                </div>
                <div class="type-title">기본 메뉴 + with Button </div>
                <div class="type-preview">
                    <div class="hw-navigation">
                        <div class="nav-header">
                            <div class="hw-button primary fluid">
                                <span class="label">기본 버튼</span>
                            </div>
                        </div>
                        <div class="nav-main">
                            <div class="nav-list">
                                <hw-list :list-data="mainList" :with-icon="true" :with-buttons="true">
                                    <template slot="buttonSet">
                                        <span class="hw-button icon circle" v-hw-tooltip="`태그편집`">
                                            <i class="gis gi-ellipsis-h"></i>
                                        </span>
                                    </template>
                                </hw-list>
                            </div>
                            <div class="partition"></div>
                        </div>
                    </div>
                </div>
                <div class="type-title">Dropdown </div>
                <div class="type-preview">
                    <div class="hw-navigation">
                        <div class="nav-header">
                            <div class="hw-button primary fluid">
                                <span class="label">기본 버튼</span>
                            </div>
                        </div>
                        <div class="nav-main">
                            <div class="nav-list">
                                <hw-list :type="`extend`" :list-data="extendList" :with-buttons="true">
                                    <template v-slot="slotProps">
                                        <hw-expand-list :data="slotProps.contentText" :contents-type="`list`" :contents-with-icon="true">
                                        </hw-expand-list>
                                    </template>
                                </hw-list>
                            </div>
                            <div class="partition"></div>
                        </div>
                    </div>
                </div>
                <div class="type-title">Dropdown + with Button</div>
                <div class="type-preview">
                    <div class="hw-navigation">
                        <div class="nav-header">
                            <div class="hw-button primary fluid">
                                <span class="label">기본 버튼</span>
                            </div>
                        </div>
                        <div class="nav-main">
                            <div class="nav-list">
                                <hw-list :type="`extend`" :list-data="extendList" :with-buttons="true">
                                    <template v-slot="slotProps">
                                        <hw-expand-list :data="slotProps.contentText">
                                            <div class="list-child-wrapper" slot="content">
                                                <hw-list :list-data="slotProps.contentText.content" :with-icon="true"  class="child-list" />
                                            </div>
                                        </hw-expand-list>
                                    </template>
                                    <template v-slot:buttonSet="slotProps">
                                        <span class="hw-button icon circle" @click="editExpand(slotProps.indexNumber)" v-hw-tooltip="`태그편집`">
                                            <i class="gi gi-plus-alt"></i>
                                        </span>
                                    </template>

                                </hw-list>
                            </div>
                            <div class="partition"></div>
                        </div>
                    </div>
                </div>
                <div class="type-title">트리 리스트 메뉴</div>
                <div class="type-preview">
                    <div class="hw-navigation">
                        <div class="nav-header">
                            <div class="hw-button primary fluid">
                                <span class="label">기본 버튼</span>
                            </div>
                        </div>
                        <div class="nav-main">
                            <div class="nav-list">
                                <hw-list :type="`extend`" :list-data="extendTreeList">
                                    <template v-slot="slotProps">
                                        <hw-expand-list :data="slotProps.contentText" :contents-type="`tree`" :contents-with-icon="true">
                                            <div class="hw-tree-list-container" slot="content">
                                                <hw-tree-list v-for="child in slotProps.contentText.content" :key="child.id" :tree-data="child" :level="0" />
                                            </div>
                                        </hw-expand-list>
                                    </template>
                                </hw-list>
                            </div>
                            <div class="partition"></div>
                        </div>
                        <div class="nav-footer">
                            <div class="hw-button outline withIcon left fluid deepblue">
                                <i class="gi gi-cog"></i>
                                <div class="label">내 공용 메일 관리</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="type-title">하단 메뉴</div>
                <div class="type-preview">
                    <div class="hw-navigation">
                        <div class="nav-header">
                            <div class="hw-button primary fluid">
                                <span class="label">기본 버튼</span>
                            </div>
                        </div>
                        <div class="nav-main">
                            <div class="nav-list">
                                <hw-list :list-data="mainList" :with-icon="true"></hw-list>
                            </div>
                            <div class="partition"></div>
                        </div>
                        <div class="nav-footer">
                            <div class="hw-button outline withIcon left fluid deepblue">
                                <i class="gi gi-cog"></i>
                                <div class="label">내 공용 메일 관리</div>
                            </div>
                        </div>
                    </div>
                </div>
<!--                end-contents-->
            </div>
        </div>
    </div>
</template>

<script>
    import HwExpandList from "../../packages/HwExpandList/HwExpandList";
    import HwTag from "../../packages/HwTags/HwTag";
    export default {
        name: 'navigation-template-view',
        components: {HwExpandList},
        data () {
            return {
                mainList: [
                    {title: '최근 편지함', text: '', iconClass: 'gis gi-clock'},
                    {title: '중요 편지함', text: '', iconClass: 'gis gi-star'},
                    {title: '받은 편지함', text: '하이웍스 개발자 센터', iconClass: 'gis gi-paper-plane'},
                    {title: '보낸 편지함', text: '', iconClass: 'gis gi-inbox'},
                ],
                extendList: [
                    {
                        title: "중요 주소록",
                        content: [],
                        optionIcon: 'gis gi-star'
                    },
                    {
                        title: "개인 주소록",
                        content: [{title: '전체', iconClass: 'gis gi-address-book'}, {title: '하이웍스 TF', iconClass: 'gis gi-tag'}]
                    },
                    {
                        title: "공유 주소록",
                        content: [{title: '전체', iconClass: 'gis gi-address-book'}, {title: '도메인 사업부', iconClass: 'gis gi-tag'}, {title: '하이웍스 사업부', iconClass: 'gis gi-tag'}, {title: '호스팅/IDC 사업부', iconClass: 'gis gi-tag'}]
                    },
                ],
                extendTreeList: [
                    {
                        title: "중요 주소록",
                        content: [],
                        optionIcon: 'gis gi-star'
                    },
                    {
                        title: "개인 주소록",
                        content: [{
                            id: 1,
                            title: 'Node1',
                            isExpanded: false,
                            children: [
                                {id:'1-1', title: 'node1-1 긴 타이틀 작성 시',isExpanded: false, children:[], icon: 'gi gi-server' },
                                {id:'1-2', title: 'node1-2',isExpanded: false, children:[
                                        {id:'1-2-1', title: 'node1-2-1',isExpanded: false, children:[],icon: 'gi gi-server' },
                                        {id:'1-2-2', title: 'node1-2-2',isExpanded: false, children:[],icon: 'gi gi-server' },
                                        {id:'1-2-3', title: 'node1-2-3',isExpanded: false, children:[
                                                {id:'1-2-3-1', title: 'node1-2-3-1',isExpanded: false, children:[],icon: 'gi gi-server' },
                                                {id:'1-2-3-2', title: 'node1-2-3-2',isExpanded: false, children:[
                                                        {id:'1-2-3-2-1', title: 'node1-2-3-2-1',isExpanded: false, children:[], icon: 'gi gi-server' },
                                                    ],icon: 'gi gi-server' },
                                            ],
                                            icon: 'gi gi-server' },
                                        {id:'1-2-4', title: 'node1-2-4',isExpanded: false, children:[],icon: 'gi gi-server' },
                                        {id:'1-2-5', title: 'node1-2-5',isExpanded: false, children:[], icon: 'gi gi-server' },
                                        {id:'1-2-6', title: 'node1-2-6',isExpanded: false, children:[],icon: 'gis gi-server' }
                                    ],icon: 'gi gi-server' }
                            ],
                            icon: 'gis gi-server'
                        }]
                    },
                    {
                        title: "공유 주소록",
                        content: [{
                            id: 2,
                            title: 'Node2',
                            isExpanded: false,
                            children: [
                                {id:'2-1', title: 'node2-1',isExpanded: false, children:[],icon: 'gi gi-server' },
                                {id:'2-2', title: 'node2-2',isExpanded: false, children:[
                                        {id:'1-2', title: 'node1-2',isExpanded: false, children:[
                                                {id:'1-2-1', title: 'node1-2-1',isExpanded: false, children:[],icon: 'gi gi-server' },
                                                {id:'1-2-2', title: 'node1-2-2',isExpanded: false, children:[],icon: 'gi gi-server' },
                                                {id:'1-2-3', title: 'node1-2-3',isExpanded: false, children:[
                                                        {id:'1-2-3-1', title: 'node1-2-3-1',isExpanded: false, children:[],icon: 'gi gi-server' },
                                                    ],icon: 'gi gi-server' }
                                            ],icon: 'gi gi-server' }
                                    ],icon: 'gi gi-server' }
                            ],
                            icon: 'gis gi-server'
                        }]
                    },
                ],
            }
        },
        methods: {
            editExpand(num) {
                let newContent = {
                    title: `새 메뉴 ${this.extendList[num].content.length-3}`,
                    content: [],
                    iconClass: 'gis gi-tag'
                };
                // alert(`ExtendList 의 ${num+1}번째 버튼 클릭`)
                this.extendList[num].content.push(newContent)
                this.$hwModal.show({modalComp:HwTag, modalProps:{tagText:'TEST', type: 'label'}})
            }
        }
    }
</script>

<style lang="scss">
    $navSideWidth: 276px;
    $navBgColor: #eff4fc; //surface1
    $navBgHoverColor: #f7faff;
    $navBgSelectedColor: #dae8f8;
    $navTextSelectedColor: #056ac9;

    .hw-navigation {
        width: $navSideWidth;
        background-color: $navBgColor;
        padding: 20px 0;
        .nav-header {
            padding: 0 24px;
            .hw-button {
                font-size: 18px;
            }
        }
        .nav-main {
            font-size: 15px;
            margin: 16px 0;
            .nav-list {
                padding: 8px 24px;

            }
        }
        .nav-footer {
            padding: 0 24px;
            .hw-button {
                font-size: 15px;
            }
        }
        .hw-list.selection .hw-item {
            &:hover {
                background-color: $navBgHoverColor;
            }
            &.selected {
                background-color: $navBgSelectedColor;
                font-weight: 600;
                .hw-item-title, .sub-title {
                    color: $navTextSelectedColor;
                }
                span.list-icon {
                    color: $navTextSelectedColor;
                }
            }
            .sub-title {
                padding-top: 4px;
            }

        }
        .hw-list .hw-item {
            .btn-set {
                display: none;
            }
            &:hover {
                .btn-set {
                    display: flex;
                }
            }
        }
        .hw-expand-list {
            .hw-expand-list-title {
                &:hover {
                    background-color: $navBgHoverColor;
                }
                .title-wrap {
                    color: #6d88a4;
                    font-weight: 600;
                }
            }
            .hw-expand-list-content {
                padding: 0;
                .list-child-wrapper .hw-item{
                    padding-left: 30px;
                }
            }
        }
        .partition {
            border-bottom: 1px solid lighten(#e0e5ee, 10);
            border-top: 1px solid #e0e5ee;
        }
    }
</style>