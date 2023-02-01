<template>
    <div class="transfer-view">
<!--        <div class="parts header">-->
<!--            <span class="index">번호 </span>-->
<!--            <span class="id">ID</span>-->
<!--            <span class="name">부서 </span>-->
<!--            <span class="node-left">노드_S</span>-->
<!--            <span class="node-right">노드_E</span>-->
<!--            <span class="node-parent">부모 노드</span>-->
<!--        </div>-->
<!--        <div class="parts" v-for="(part, index) in organization" :key="part.id">-->
<!--            <span class="index">{{index}}</span>-->
<!--            <span class="id">{{part.id}}</span>-->
<!--            <span class="name">{{part.attributes.name}}</span>-->
<!--            <span class="node-left">{{part.attributes.node_left}}</span>-->
<!--            <span class="node-right">{{part.attributes.node_right}}</span>-->
<!--            <span class="node-parent">{{part.attributes.parent_node_id}}</span>-->
<!--        </div>-->
        <div class="trans-left">
            <div class="list-wrapper">
                <test-tree :base="organization" :header="header" :child="child" :level="0" :selected-node="selectedId" @select="setSelect"/>
            </div>
        </div>
        <div class="trans-middle">
            <div class="btn-wrap">
                <div class="hw-button icon outline"><i class="fa fa-chevron-left"></i></div>
                <div class="hw-button icon outline"><i class="fa fa-chevron-right"></i></div>
            </div>
        </div>
        <div class="trans-right">
            <div class="result-wrapper" >
                <div class="result-item" v-for="item in selectedList" :key="item.id">
                    {{item.attributes.name}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Organization from '@/organizations.json';
    import Members from '@/members.json';
    import TestTree from './TestTree';

    export default {
        name: 'transfer-view',
        components: {TestTree},
        data() {
            return {
                organization: [],
                header: {},
                child: [],
                selectedId: '',
                selectedList: [],
                memberList: Members.data
            }
        },
        created() {
            console.log(this.memberList)
            this.organization = Organization.data
            this.header = this.organization[0]
            this.setFilterItem(Organization.data, this.header.id)
        },
        methods: {
            setFilterItem (list, id) {
                this.child = list.filter(item => id === `${item.attributes.parent_node_id}`)
            },
            setTree (list, id) {
                let child = this.setFilterItem(list, id);

                child.forEach(item => {
                    this.setTree(list, item.id)
                    console.log(item.attributes)
                })

            },
            setSelect(payload, state) {
                console.log(payload)
                this.selectedId = payload.id
                // this.selectedList = this.organization.filter(item => item.id === this.selectedId)
                if(state) {
                    this.selectedList.push(payload)
                } else {
                    let idx = this.selectedList.find(item => item.id === payload.id)
                    console.log(idx)

                    this.selectedList.splice(idx, 1)
                }
            }
        }
    }
</script>

<style lang="scss">
    .transfer-view {
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        width: 800px;
        height: 800px;
        display: flex;
        align-items: center;
        /*&> div {padding: 10px}*/
        .trans-left {
            border: 1px solid #d6d6d6;
            width: 40%;
            height: 100%;
            .list-wrapper {
                height: 100%;
                overflow-y: auto;
                .level-0 > .tree-title{
                    background-color: #f2f2f2;
                }

            }

        }
        .trans-middle {
            padding: 10px ;
        }
        .trans-right {
            flex-grow: 1;
            height: 100%;
            .result-wrapper {
                border: 1px solid #d6d6d6;
                width: 100%;
                height: 100%;
                .result-item {
                    padding: 10px;
                }
            }
        }
        .parts {
            display: flex;
            justify-content: space-between;
            padding-left: 5px;
            text-align: center;
            span {
                min-width: 200px;
            }
            &.header {

                background-color: #f2f2f2;
            }
        }
    }
</style>