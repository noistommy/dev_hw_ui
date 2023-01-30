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
                            hw-file-controller(
                                :image-files="[]",
                                :no-image-files="[]",
                                @add-files="onAddFiles",
                                @remove-file="onRemoveFile"
                            )
                        .type-console(v-html="filesLog")
</template>

<script>
    import InformationView from './InformationView'
    export default {
        name: 'hw-file-controller-view',
        data () {
            return {
                usage: `<hw-file-controller :item-in-row='4' :image-files='imageFiles' :no-image-files="noImageFiles" ></hw-file-controller>`,
                propsData: [
                    {name: 'imageFiles', type:'Array', default:'[]', desc: '이미지 파일 데이터 리스트' },
                    {name: 'noImageFiles', type:'Array', default:'[]', desc: '일반 파일 데이터 리스트' },
                    {name: 'imageFit', type:'String', default:'contain', desc: 'CSS object-fit 속성 지정값, 컨테이너 내부 프리뷰 이미지 표시 정책' },
                    {name: 'itemInRow', type: 'Number', default: '4', desc: '이미지 프리뷰 아이템 나열시 한 행에 나열할 아이템의 갯수'},
                    {name: 'areaGap', type:'Number', default:'0', desc: '이미지 프리뷰 영역과 일반 파일 표시 영역간의 여백의 크기' },
                    {name: 'imageGap', type: 'Number', default:'10', desc: '이미지 프리뷰 아이템간 여백의 크기'},
                    {name: 'listGap', type: 'Number', default: '0', desc: '일반 파일 리스트 아이템간 여백의 크기'},
                    {name: 'useProgress', type: 'Boolean', default: 'false', desc: '파일 업로드시 프로그레스 UI 사용여부'},
                    {name: 'progress', type: 'Number', default: '0', desc: '파일 업로드 진행률'},
                    {name: 'progressColor', type: 'String', default: '#297FEB', desc: '프로그레스 게이지 색상'},
                    {name: 'progressMessage', type: 'String', default: '', desc: '프로그레스 상태 메시지'},
                    {name: 'location', type: 'String', default: 'ko', desc: '사용할 랭귀지 선택'},
                    {name: 'file.id', type: 'String', default: '', desc: '파일의 아이디'},
                    {name: 'file.title', type: 'String', default: '', desc: '파일의 이름'},
                    {name: 'file.size', type: 'String', default: '', desc: '파일의 용량'},
                    {name: 'file.is_image', type: 'Boolean', default: '', desc: '업로드 파일이 이미지인지 일반 파일인지 구분'},
                    {name: 'file.thumbnail_link', type: 'String', default: '', desc: '이미지 프리뷰 제공을 위한 소스 링크'},
                    {name: 'file.download_link', type: 'String', default: '', desc: '파일 다운로드 진행을 위한 API 링크'},
                ],
                eventData: [
                    {name: 'add-files', type: 'Array', desc: '파일 컨트롤러에 파일 업로드시 발생. 새롭게 추가된 파일을 리스트에 담아 전달.'},
                    {name: 'remove-file', type: 'Object', desc: '파일 컨트롤러에 추가된 리스트 아이템을 삭제했을때 발생. 삭제한 파일의 정보를 전달.'},
                ],
                contentList: [
                    {
                        title: 'Standard',
                        desc: '기본 파일 컨트롤러',
                        source: "<hw-file-controller :image-files='Array<Object>' :no-image-files='Array<Object>' ></hw-file-controller>",
                    }
                ],
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false,
                previewSize: {
                    width: '100%',
                    height: '450px'
                },
                filesLog: '',
            }
        },
        methods: {
            onAddFiles(files){
                console.log(files)
                this.filesLog += files.map(file => `<p>${file.name} (${file.size})</p>`).join('')
                this.filesLog += '\n'
            },
            onRemoveFile(payload){
               console.log(payload)
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

<style lang="scss" scoped>
    .content-wrap{
        min-height: 250px;
        border: 1px dashed #ccc;
    }
    .type-preview{
        border: 1px dashed #ccc;
    }
    .type-console{
        border: 1px dashed #ccc;
        height: 150px;
        overflow: scroll;
        margin-top: 20px;
    }
</style>
