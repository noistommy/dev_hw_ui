<template>
  <div class="hw-file-viewer-wrapper" :style="wrapperStyle">
    <div class="hw-file-viewer-header">
      <div :class="['header-item', 'header-title']">
        <span class="header-image-wrap">
          <img :src="`https://static.hiworks.com/office/static/images/file_icon/${currentFile[typeKey]}.png`" alt="extension-image">
        </span>
        <span class="header-title-text">{{currentFile[titleKey]}}</span>
      </div>
      <a :class="['header-item', 'header-download']" :href="currentFile[downloadKey]" target="_self">
        <span class="header-download-icon">
            <i class='gi gi-download'></i>
        </span>
        <span class="header-download-text">{{languageMap[location].download}}</span>
      </a>
      <div :class="['header-item', 'header-close']" @click.stop="onClose">
        <span class="header-close-icon">
            <i class='gi gi-cancel'></i>
        </span>
      </div>
    </div>
    <loading-view v-show="isShowLoading"></loading-view>
    <component
      :is="viewMode"
      v-bind="$props"
      @close="onClose"
      @file-change="onFileChange"
      @file-loadend="onFileLoadEnd"
      @file-download="onFileDownload"
    ></component>
  </div>
</template>
<script>
import LoadingView from './ViewModes/LoadingView.vue'
import './HwFileViewer.scss'
export default {
  name: 'hw-file-viewer',
  components: {
    "loading-view": LoadingView,
    "image-view": () => import("./ViewModes/ImageView.vue"),
    "document-view": () => import("./ViewModes/DocumentView.vue"),
    "error-view": () => import("./ViewModes/ErrorView.vue")
  },
  data () {
    return {
      isShowLoading: false,
      languageMap: {
        'ko': {
          download: '다운로드'
        },
        'en': {
          download: 'Download'
        },
        'zh': {
          download: '下载'
        }
      }
    }
  },
  props: {
    files: {
      type: Array,
      default: () => [],
      required: false
    },
    currentIndex: {
      type: Number,
      required: false
    },
    zIndex: {
      type: Number,
      default: 1000,
      required: false
    },
    isShowing: {
      type: Boolean,
      required: true
    },
    downloadKey: {
      type: String,
      default: 'download_link',
      required: false
    },
    thumbnailKey: {
      type: String,
      default: 'thumbnail_link',
      required: false
    },
    titleKey: {
      type: String,
      default: 'title',
      required: false
    },
    typeKey: {
      type: String,
      default: 'ext',
      required: false
    },
    viewMode: {
      type: String,
      default: 'image-view',
      required: false
    },
    location: {
      type: String,
      default: 'ko',
      required: false
    }
  },
  computed: {
    wrapperStyle () {
      return { 'z-index': this.zIndex }
    },
    currentFile () {
      return this.files[this.currentIndex]
    }
  },
  beforeMount () {
    window.history.pushState(null, '', location.href)
    window.addEventListener('popstate', this.onClose)
  },
  beforeDestroy () {
    window.removeEventListener('popstate', this.onClose)
  },
  methods: {
    onClose () {
      this.$emit('close');
    },
    onFileChange (index) {
      this.isShowLoading = true;
      this.$emit('file-change', index);
    },
    onFileLoadEnd () {
      this.isShowLoading = false;
    },
    onFileDownload () {
      window.location.href = this.currentFile[this.downloadKey]
    },
    setLoading (bool) {
      this.isShowLoading = bool;
    }
  }
}
</script>
