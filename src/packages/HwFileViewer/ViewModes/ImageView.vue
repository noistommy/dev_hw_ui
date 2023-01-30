<template>
  <div class="hw-image-view">
    <div class="hw-image-view-body">
      <div :class="['body-item', 'body-icon-wrap']">
          <span v-show="hasPrev" class="body-icon" @click="movePrev">
            <i class='gi gi-short-arrow-left-alt'></i>
          </span>
      </div>
      <div :class="['body-item', 'body-image-wrap']">
        <a :href="imageLink" target="_blank">
          <img
              :src="currentImage[downloadKey]"
              alt="image"
              @load="onLoadEnd"
          >
        </a>
      </div>
      <div :class="['body-item', 'body-icon-wrap']">
          <span v-show="hasNext" class="body-icon" @click="moveNext">
            <i class='gi gi-short-arrow-right-alt'></i>
          </span>
      </div>
    </div>
    <div class="hw-image-view-footer">
      <div class="footer-item" ref="footer-item">
        <div :class="['thumbnail-wrap', {'thumbnail-selected': currentIndex === index}]" v-for="(image, index) in files" :key="index" @click="moveTo(index)">
          <div v-show="currentIndex !== index" class="thumbnail-lid"></div>
          <img :src="image[thumbnailKey]" alt="image_thumbnail">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'image-view',
  data () {
    return {
      footerItem: null,
      languageMap: {
        'ko': {
          'firstImage': '첫번째 이미지입니다.',
          'lastImage': '마지막 이미지입니다.'
        },
        'en': {
          'firstImage': 'No previous image',
          'lastImage': 'No next image'
        },
        'zh': {
          'firstImage': '没有上一张图片',
          'lastImage': '没有下一张图片'
        }
      }
    }
  },
  props: {
    isShowing: Boolean,
    files: Array,
    currentIndex: Number,
    titleKey: String,
    downloadKey: String,
    thumbnailKey: String,
    location: {
      type: String,
      default: 'ko'
    }
  },
  computed: {
    hasPrev () {
      return this.currentIndex > 0
    },
    hasNext () {
      return this.currentIndex < this.files.length - 1
    },
    currentImage () {
      return this.files[this.currentIndex] || {}
    },
    imageLink () {
      return this.currentImage[this.downloadKey] + '?disposition=inline'
    },
  },
  watch: {
    files () {
      this.moveTo(this.initialIndex)
    },
    initialIndex (newVal) {
      this.moveTo(newVal)
    }
  },
  mounted () {
    this.footerItem = this.$refs['footer-item']
    this.moveTo(this.initialIndex)
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    movePrev () {
      if (!this.isShowing) return
      if (this.currentIndex <= 0) return alert(this.languageMap[this.location].firstImage)
      this.moveTo(this.currentIndex - 1)
    },
    moveNext () {
      if (!this.isShowing) return
      if (this.currentIndex >= this.files.length - 1) return alert(this.languageMap[this.location].lastImage)
      this.moveTo(this.currentIndex + 1)
    },
    moveTo (index) {
      this.$emit('file-change', index)
    },
    handleKeyDown (event) {
      const keyCode = event.keyCode || event.which
      switch (keyCode) {
        case 37: return this.movePrev()
        case 39: return this.moveNext()
      }
    },
    onLoadEnd () {
      this.$emit('file-loadend')
    }
  }
}
</script>
