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
                            hw-avatar-editor(
                                v-bind="type.option"
                                @image-loaded="onImageLoad"
                                @save-image="onImageSave"
                                @scale-changed="onScaleChange"
                                ref="editor"
                            )
                            .type-interface
                                .hw-button.primary(@click="loadImage($refs['editor'][index])") 이미지 불러오기
                                .hw-button.secondary(@click="saveImage($refs['editor'][index])") 이미지 저장하기

</template>

<script>
    import InformationView from './InformationView'
    export default {
        name: 'hw-avatar-editor-view',
        data () {
            return {
                usage: `<hw-avatar-editor :canvasWidth='250' :canvasHeight='250' ... ></hw-avatar-editor>`,
                contentList: [
                    {
                        title: 'Standard',
                        description: '기본 편집기',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                        },  
                    },
                    {
                        title: 'CanvasWidth',
                        description: '편집기 캔버스 엘리먼트의 너비를 설정합니다.',
                        option: {
                            canvasWidth: 540,
                            canvasHeight: 190,
                        },
                    },
                    {
                        title: 'CanvasHeight',
                        description: '편집기 캔버스 엘리먼트의 높이를 설정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 380
                        },
                    },
                    {
                        title: 'ImageQuality',
                        description: '편집한 이미지를 저장시 반환받는 Blob 데이터의 품질을 결정합니다. 0.0 ~ 1.0',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            imageQuality: 0.5
                        },
                    },
                    {
                        title: 'ImageExtension',
                        description: '편집한 이미지를 저장시 반환받는 Blob 데이터의 확장자를 결정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            imageExtension: 'jpg'
                        },
                    },
                    {
                        title: 'MinScale',
                        description: '이미지 확대/축소시 축소할 수 있는 최대 배율을 설정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            minScale: 0.2
                        },
                    },
                    {
                        title: 'MaxScale',
                        description: '이미지 확대/축소시 확대할 수 있는 최대 배율을 설정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            maxScale: 5
                        },
                    },
                    {
                        title: 'UseWheel',
                        description: '마우스 휠 이벤트를 통해 이미지를 확대/축소하는 기능을 활성화 할지 결정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            useWheel: true
                        },
                    },
                    {
                        title: 'WheelStep',
                        description: '마우스 휠 이벤트 발생시 확대/축소 배율의 증감량을 설정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            useWheel: true,
                            wheelStep: 0.1
                        },
                    },
                    {
                        title: 'UseRange',
                        description: '레인지 인터페이스를 통해 이미지를 확대/축소하는 기능을 활성화 할지 결정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            useRange: true
                        },
                    },
                    {
                        title: 'RangeStep',
                        description: '전체 레인지중 몇개의 단계로 나눌 것인지를 설정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            useRange: true,
                            rangeStep: 20
                        },
                    },
                    {
                        title: 'ItemColor',
                        description: '캔버스의 테두리와 레인지 인터페이스의 게이지 색상을 설정합니다.',
                        option: {
                            canvasWidth: 270,
                            canvasHeight: 190,
                            useRange: true,
                            itemColor: '#D75757'
                        },
                    },
                ],
                propsData: [
                    {name: 'canvasWidth', type:'Number', default:'250', desc: '편집기의 가로 너비' },
                    {name: 'canvasHeight', type:'Number', default:'250', desc: '편집기의 세로 높이' },
                    {name: 'imageQuality', type:'Number', default:'1', desc: '편집후 반환되는 이미지의 품질 0 ~ 1' },
                    {name: 'imageExtension', type:'String', default:'jpg', desc: '편집후 반환되는 이미지의 파일 확장자 [jpg | jpeg | png | bmp]' },
                    {name: 'scale', type: 'Number', default:'1.0', desc: '편집기에 이미지 로드시 적용되는 기본 배율'},
                    {name: 'minScale', type: 'Number', default: '1.0', desc: '이미지 배율 적용시 최소 축소 배율'},
                    {name: 'maxScale', type: 'Number', default: '3.0', desc: '이미지 배율 적용시 최대 확대 배율'},
                    {name: 'wheelStep', type: 'Number', default: '0.05', desc: '마우스 휠 이벤트가 동작시 적용되는 배율 증감량'},
                    {name: 'useWheel', type: 'Boolean', default: 'true', desc: '마우스 휠을 통한 이미지 배율 조정기능 활성화 여부'}, 
                    {name: 'useRange', type: 'Boolean', default: false, desc: '범위 인풋 UI 렌더링 여부'},
                    {name: 'itemColor', type: 'String', default: '#2985db', desc: '테마 컬러 색상값'}
                ],
                eventData: [
                    {name: 'image-loaded', type: 'Null', desc: '편집기에 이미지가 온전히 로드되었을 때 발생.'},
                    {name: 'save-image', type: 'Blob', desc: '편집기의 저장기능을 동작시켰을 때 발생.'},
                    {name: 'wheel-scale', type: 'Number', desc: '마우스 휠을 통해 이미지 배율을 조정했을 때 발생.'},
                    {name: 'not-movable', type: '', desc: '이미지를 회전시킨 상태에서 이동시키려 하는 경우 발생.'}
                ],
                previewSize: {
                    width: '725px',
                },
                blobURL: null,
                tabList: [
                    {name:'Types', key: 'type'},
                    {name:'Information', key: 'info'}
                ],
                showInfo: false
            }
        },
        beforeDestroy(){
            if (this.blobURL) URL.revokeObjectURL(this.blobURL)
        },
        methods: {
            toggleCode (evt) {
                let classArr = evt.target.nextSibling.classList.value;
                if(classArr.indexOf('show') > -1) {
                    evt.target.nextSibling.classList.remove('show')
                } else {
                    evt.target.nextSibling.classList.add('show')
                }
            },
            loadImage(editorRef){
                editorRef.loadImage();
            },
            saveImage(editorRef){
                editorRef.saveImage().then(this.onImageSave)
            },
            onImageLoad(){
                console.log("이미지가 편집기에 로드되었습니다.");
            },
            onImageSave(blob){
                this.blobURL = URL.createObjectURL(blob);
                window.location.href = this.blobURL;
            },
            onScaleChange(scale){
                console.log(scale)
            },
            setContents(type) {
                if (type === 'info') {
                    this.showInfo = true;
                    this.infoComp = InformationView
                } else {
                    this.showInfo = false;
                    this.infoComp = null;
                }
            }
        }
    }
</script>

<style lang="scss">
    .range-wrapper {
        display: flex;
    }
    .control-button{
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ccc;
      border-radius: 2px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .text-center{
        text-align: center;
    }
    .type-interface{
        margin-top: 20px;
        text-align: center;
    }
    
</style>
