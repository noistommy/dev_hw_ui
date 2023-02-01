<template>
  <div
    class="hw-file-controller"
    :class="[dragState]"
    @dragenter.stop="onDragEnter"
    ref="controller"
  >
    <div class="progress-wrap" v-show="useProgress">
      <hw-progress-bar
        :height="10"
        :progress="progress"
        :color-pg-bar="progressColor"
        :progress-message="progressMessage"
      />
    </div>
    <div class="file-control">
      <input
        ref="file-input"
        v-show="false"
        type="file"
        multiple
        @change="addFile"
      >
      <div class="guide-row" :style="guideRowStyle">
        <div class="guide-row-line" v-show="!isDragging">
          <div class="item">
            <div class="hw-button icon circle" @click="browseFile"><i class="fa fa-paperclip"></i></div>
          </div>
          <div class="item">
            <span class="primary-color browse-text guide-text" @click="browseFile">{{languageMap[location].browse}}</span>
          </div>
          <div class="item">
            <span class="guide-text" v-if="!isIE">{{languageMap[location].guide}}</span>
          </div>
        </div>
<!--        <span v-show="!isDragging">-->
<!--          Drag & Drop 또는 <span class="primary-color browse-text" @click="browseFile">탐색기</span>에서 파일추가-->
<!--        </span>-->
        <span class="primary-color" v-show="isDragging" >
          {{languageMap[location].drop}}
        </span>
      </div>
    </div>
    <div>
      <hw-file-preview
        :areaGap="areaGap"
        :imageGap="imageGap"
        :itemInRow="itemInRow"
        :imageFit="imageFit"
        :imageFiles="imageFiles"
        :otherFiles="noImageFiles"
        @remove-file="removeFile"
      />
      <hw-file-name
        :imageGap="imageGap"
        :listGap="listGap"
        :otherFiles="noImageFiles"
        @remove-file="removeFile"
      />
    </div>
    <hw-file-drop-zone
      v-show="isDragging"
      @drop-zone-enter="dropZoneEnter"
      @drop-zone-leave="dropZoneLeave"
      @drop-file="dropFile"
    />
  </div>
</template>
<script>
import HwFileName from './HwFileName'
import HwFilePreview from './HwFilePreview'
import HwFileDropZone from './HwFileDropZone'
import './HwFileController.scss'
export default {
  name: 'hw-file-controller',
  components: {
    HwFileName,
    HwFilePreview,
    HwFileDropZone
  },
  data () {
    return {
      isDragging: false,
      isDraggingIn: false,
      languageMap: {
        'ko': {
          'browse': '파일추가',
          'guide': '파일을 끌어 놓거나, 이미지 붙여넣기(ctrl/cmd+v)',
          'drop': '여기에 파일을 드롭하세요.'
        },
        'en': {
          'browse': 'Attach files',
          'guide': 'Drag and drop files of Paste an image',
          'drop': 'Drop files here.'
        },
        'zh': {
          'browse': '附加文件',
          'guide': '拖放文件, 粘贴图片',
          'drop': '将文件拖至此处'
        }
      }
    }
  },
  provide(){
    return {
      extensions: this.extensions
    }
  },
  props: {
    useProgress: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0
    },
    progressColor: {
      type: String,
      default: '#297FEB'
    },
    progressMessage: {
      type: String,
      default: '',
    },
    imageFiles: {
      type: Array,
      default: () => []
    },
    noImageFiles: {
      type: Array,
      default: () => []
    },
    imageFit: {
      type: String,
      default: 'contain'
    },
    areaGap: {
      type: Number,
      default: 0
    },
    imageGap: {
      type: Number,
      default: 10
    },
    listGap: {
      type: Number,
      default: 0
    },
    itemInRow: {
      type: Number,
      default: 4
    },
    location: {
      type: String,
      default: 'ko'
    },
    extensions: {
      type: Array,
      default: () => [
        'ai','arj','asf','avi','bat',
        'bin','bmp','com','csv','doc',
        'docx','eps','exe','fla','flv',
        'folder','gif','gz','htm','hwp',
        'iso','jpeg','jpg','lha','mov',
        'mp3','mpeg','mpg','pcx','pdf',
        'png','ppt','pptx','psd','ra',
        'ram','rar','rm','rtf','swf',
        'tar','txt','wav','xls','xlsx',
        'zip'
      ]
    }
  },
  computed: {
    dragState () {
      return {
        'file-dragging': this.isDragging && !this.isDraggingIn,
        'file-dragging-in': this.isDragging && this.isDraggingIn,
      }
    },
    guideRowStyle () {
      return {
        padding: `${this.imageGap / 2}px`
      }
    },
    isIE () {
      return /(msie|trident)/gi.test(navigator.userAgent);
    }
  },
  mounted () {
    document.addEventListener('dragover', this.onDragOver)
    document.addEventListener('drop', this.onDrop)
    if(!this.isIE){
      document.addEventListener('paste', this.onPaste)
    }
  },
  beforeDestroy () {
    document.removeEventListener('dragover', this.onDragOver)
    document.removeEventListener('drop', this.onDrop)
    if(!this.isIE){
      document.removeEventListener('paste', this.onPaste)
    }
  },
  methods: {
    addFiles (files = []) {
      if (files.length <= 0) return
      this.$emit('add-files', files)
    },
    removeFile (file) {
      this.$emit('remove-file', file)
    },
    browseFile () {
      this.$refs['file-input'].click()
    },
    addFile (event) {
      this.addFiles([...event.target.files])
      event.target.value = null;
    },
    dropFile (files) {
      this.isDragging = false
      this.isDraggingIn = false
      this.addFiles(files)
    },
    onDragEnter (event) {
      event.stopPropagation();
      this.isDragging = true
    },
    onDragOver (event) {
      event.preventDefault()
    },
    onDragLeave (event) {
      event.stopPropagation()
      this.isDragging = false
    },
    onDrop (event) {
      event.preventDefault()
      this.isDragging = false
      this.isDraggingIn = false
      this.isFocusing = true
    },
    onPaste (event) {
      const items = event.clipboardData.items
      for(const item of items){
        if(item.type.includes('image')){
          const blob = item.getAsFile();
          return this.$emit('paste-image', blob)
        }
      }
      return true
    },
    dropZoneEnter () {
      this.isDragging = true
      this.isDraggingIn = true
    },
    dropZoneLeave () {
      this.isDragging = false
      this.isDraggingIn = false
    }
  }
}
</script>
