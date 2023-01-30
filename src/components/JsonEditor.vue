<template>
    <div class="jsonDataTest">
<!--        <div class="jsonData-list">-->
<!--            {{typeof jsonData}}-->
<!--            <div class="jsonData-item" v-for="(data, key, idx) in jsonData" :key="idx">-->
<!--                <span class="numbering">-->
<!--                    <hw-tag :tag-text="idx" :color="`gray`" :type="`label`" />-->
<!--                </span>-->
<!--                <span class="key">{{key.slice(5)}}</span>:<span class="value">{{data}}</span>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="json-view-wrapper">-->
<!--            <JsonEditor :is-edit="false" v-model="jsonData"></JsonEditor>-->
<!--        </div>-->
        <div class="json-editor-header">
            <div class="select-list">
<!--                <div class="hw-button basic primary-color" @click="getJsonData('ko-KR')">ko-kr</div>-->
<!--                <div class="hw-button basic primary-color" @click="getJsonData('en-US')">en-US</div>-->
                <hw-tab :tab-list="tabList" v-slot="{tab}" :tab-class="`tab-item`">
                    <span @click="getJsonData(tab.value)">{{tab.name}}</span>
                </hw-tab>
            </div>
            <div class="hw-button primary" @click="toggleEdit">
                <span class="label" v-if="isEditable">확인</span>
                <span class="label" v-else>편집</span>
            </div>
        </div>
        <div class="json-editor-body">
            <div class="json-edit-wrapper">
                <JsonEditor :is-edit="isEditable" v-model="jsonData"></JsonEditor>
            </div>
        </div>
        <div class="test">{{$t('LANG:설정')}}</div>
        <div class="test">{{$t('LANG:회계지원',{user:tabList[0].name})}}</div>

    </div>
</template>

<script>
    import axios from 'axios';
    import KoData from '../locales/ko-KR.json';

    export default {
        name: 'json-editor',
        data () {
            return {
                tabList: [
                    {name: '한국어',value: 'ko-kr'},
                    {name: '영어', value: 'en-US'}
                ],
                currentFile: 'ko-KR',
                isEditable: false,
                jsonData: null
            }
        },
        created() {
            this.jsonData = KoData;
        },
        methods: {
            toggleEdit() {
                if(this.isEditable) {
                    this.setJsonFile();
                }
                this.isEditable = !this.isEditable;
            },
            getJsonData(name) {
                axios.get(`./locales/${name}.json`).then(res => {
                    console.log(res.data);
                    this.jsonData = res.data;
                    this.currentFile = name;
                }).catch(err => {
                    console.log(err.response)
                })
            }
        }
    }
</script>

<style lang="scss">
    .json-editor-header{
        display: flex;
        justify-content: space-between;
        /*border-bottom: 1px solid #d8d8d8;*/
    }
    .tab-item {
        font-size: 15px;
        color: #909090;
        min-width: 100px;
        text-align: center;
        padding: 10px 20px;
    }
    .block {
        margin: 3px;
        border: 1px solid #d4d4d4;
        line-height: 1rem;
    }
    .json-key{
        display: inline-block;
        min-width: 50%;
        background-color: #f8f8f8;
        span {
            display: inline-block;
            padding: 5px;
        }
        .del-btn {
            cursor: pointer;
            width: 35px;
            height: 35px;
            padding: 8px;
        }

    }
    .json-val {

        span {
            display: inline-block;
            padding: 5px;
            outline: none;
        }
    }
</style>