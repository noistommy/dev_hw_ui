<template>
    <div class="canvas-wrap">
      <div :style="wrapStyle">
        <canvas
          class="canvas"
          :style="{ border: `1px dashed ${itemColor}` }"
          :class="[cursor]"
          :width="canvasWidth" 
          :height="canvasHeight" 
          ref="canvas"
          @mousedown.stop="onGrabStart"
          @mousemove.stop="onGrabWork"
          @mouseup.stop="onGrabEnd"
          @mouseleave.stop="onGrabEnd"
        ></canvas>
        <input
          type="file"
          accept="image/*"
          v-show="false"
          ref="image-input"
          @change="addImage"
        >
          <hw-range-input
            v-if="useRange"
            :min="minScale"
            :max="maxScale"
            :numStep="rangeStep"
            :propValue="scaleValue"
            :itemColor="itemColor"
            @value-changed="onRangeChange"
          ></hw-range-input>
      </div>
    </div>
</template>
<script>
export default {
  name: 'hw-avatar-editor',
  data () {
    return {
      canvas: null,
      ctx: null,
      niWidth: null,
      niHeight: null,
      blobURL: null,
      imageIn: null,
      isImageLoaded: false,
      isImageBrowsing: false,
      isGrabbing: false,
      scaleValue: 1.0,
      rotation: 0,
      movementX: 0,
      movementY: 0,
      lastX: null,
      lastY: null,
      fileName: ''
    }
  },
  props: {
    canvasWidth: {
      type: Number,
      default: 250
    },
    canvasHeight: {
      type: Number,
      default: 250
    },
    imageQuality: {
      type: Number,
      default: 1
    },
    imageExtension: {
      type: String,
      default: 'png'
    },
    minScale: {
      type: Number,
      default: 1.0
    },
    maxScale: {
      type: Number,
      default: 3.0
    },
    useWheel: {
      type: Boolean,
      default: true
    },
    useRange: {
      type: Boolean,
      default: false
    },
    wheelStep: {
      type: Number,
      default: 0.05
    },
    rangeStep: {
      type: Number,
      default: 10
    },
    itemColor: {
      type: String,
      default: '#2985db'
    }
  },
  computed: {
    cursor () {
      return {
        'cursor-grab': this.isImageLoaded && !this.isGrabbing,
        'cursor-grabbing': this.isImageLoaded && this.isGrabbing
      }
    },
    wrapStyle () {
      return {
        width: (this.canvasWidth + 2) + 'px',
        margin: '0 auto'
      }
    },
  },
  beforeCreate(){
    if(!('toBlob' in HTMLCanvasElement.prototype)){
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function(callback, type, quality){
          var dataURL = this.toDataURL(type, quality).split(',')[1];
          setTimeout(function() {
            var binStr = atob(dataURL);
            var len = binStr.length;
            var arr = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }
            callback(new Blob([arr], { type: type || 'image/png' }));
          });
        }
      })
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    this.canvas.addEventListener('wheel', this.wheelScale)
    this.ctx = this.canvas.getContext('2d')
  },
  beforeDestroy () {
    this.clearFile()
  },
  methods: {
    onGrabStart () {
      this.isGrabbing = true
    },
    onGrabWork (event) {
      if (!this.isGrabbing || !this.isImageLoaded) return
      if (this.rotation !== 0) return this.$emit('not-movable')
      this.movementX = event.movementX
      this.movementY = event.movementY
      this.repaint()
    },
    onGrabEnd () {
      this.isGrabbing = false
    },
    loadImage () {
      this.clearFile()
      this.clearCanvas()
      this.clearControlValue()
      this.$refs['image-input'].click()
      this.isImageBrowsing = true
    },
    addImage (event) {
      if (!event.target.files || !event.target.files[0].type.startsWith('image')) return
      this.imageIn = new Image()
      this.imageIn.addEventListener('load', () => {
        this.isImageLoaded = true
        this.$emit('image-loaded')
        this.repaint()
      })
      this.fileName = event.target.files[0].name
      this.blobURL = URL.createObjectURL(event.target.files[0])
      this.imageIn.src = this.blobURL
    },
    saveImage () {
      if (!this.isImageLoaded) return
      this.canvas.toBlob(
        (blob) => {
          let payload = null
          try {
            payload = new File([blob], this.fileName,{
            type : `image/${this.imageExtension}`
            })
          } catch {
            payload = blob
          } finally {
            this.$emit('save-image', payload)
          }
        },
        `image/${this.imageExtension}`,
        this.imageQuaility
      )
    },
    clearFile () {
      if (this.blobURL) URL.revokeObjectURL(this.blobURL)
      if (this.image) this.image.remove()
      this.image = null
      this.isImageLoaded = false
      this.fileName = ''
      if (this.$refs['image-input']) this.$refs['image-input'].value = null
    },
    clearCanvas () {
      this.ctx.save()
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.ctx.restore()
    },
    clearControlValue () {
      this.scaleValue = 1.0
      this.rotation = 0
      this.lastX = null
      this.lastY = null
      this.movementX = 0
      this.movementY = 0
      this.isImageLoaded = false
      this.isGrabbing = false
    },
    wheelScale (event) {
      if (!this.isImageLoaded || !this.useWheel) return
      event.stopPropagation()
      event.preventDefault()
      this.scaleValue = this.calcScale(this.scaleValue + (this.wheelStep * (event.deltaY < 0 ? 1 : -1)))
      this.$emit('scale-changed', this.scaleValue)
      this.repaint()
    },
    rotate () {
      if (!this.isImageLoaded) return
      this.rotation = (this.rotation + 90) % 360
      this.repaint()
    },
    calcScale (formula) {
      return Math.max(this.minScale, Math.min(formula, this.maxScale))
    },
    calcRotation (angle) {
      return (Math.PI / 180) * angle
    },
    calcNextPaint () {
      /* 원본 이미지 가로 세로 길이의 비율을 확인한다. */
      const ratio = this.imageIn.width / this.imageIn.height

      /* 이미지의 가로가 더 길다고 가정한다. */
      let newWidth = this.canvasWidth

      /*
       * 이미지의 세로길이는 캔버스의 가로길이를 전부 할당했을때
       * 이전에 구한 비율에 따라 할당하여 본다.
       */
      let newHeight = newWidth / ratio

      /*
       * 만약 세로길이에 비율을 적용한 값이 캔버스의 높이보다 크다면
       * 이 이미지는 세로 길이가 더 길었다는 것을 알 수 있게 된다.
       * 따라서 세로를 캔버스 높이 전체로 주고 가로길이에 비율을 적용한다.
       */
      if (newHeight > this.canvasHeight) {
        newHeight = this.canvasHeight
        newWidth = newHeight * ratio
      }

      /*
       * 이미지를 캔버스의 정중앙에 배치하기 위한 절대 좌표를 계산한다.
       * 이미지의 가로길이가 캔버스의 가로길이보다 짧다면 (캔버스의 가로길이 - 이미지의 가로길이) / 2 그렇지 않다면 0
       * 이미지의 세로길이가 캔버스의 세로길이보다 짧다면 (캔버스의 세로길이 - 이미지의 세로길이) / 2 그렇지 않다면 0
       */
      const xOffset = newWidth < this.canvasWidth ? ((this.canvasWidth - newWidth) / 2) : 0
      const yOffset = newHeight < this.canvasHeight ? ((this.canvasHeight - newHeight) / 2) : 0

      return {
        xOffset,
        yOffset,
        newWidth,
        newHeight
      }
    },
    calcLastPos () {
      const { xOffset, yOffset, newWidth, newHeight } = this.calcNextPaint()
      this.lastX ? (this.lastX += this.movementX) : (this.lastX = (this.canvasWidth / -2) + xOffset)
      this.lastY ? (this.lastY += this.movementY) : (this.lastY = (this.canvasHeight / -2) + yOffset)
      this.movementX = 0
      this.movementY = 0
      return {
        lastX: this.lastX,
        lastY: this.lastY,
        newWidth,
        newHeight
      }
    },
    repaint () {
      if (!this.isImageLoaded) return
      this.clearCanvas()
      this.ctx.save()
      const { lastX, lastY, newWidth, newHeight } = this.calcLastPos()
      this.ctx.translate((this.canvasWidth) / 2, (this.canvasHeight) / 2)
      this.ctx.scale(this.scaleValue, this.scaleValue)
      this.ctx.rotate(this.calcRotation(this.rotation))
      this.ctx.drawImage(
        this.imageIn,
        lastX,
        lastY,
        newWidth,
        newHeight
      )
      this.ctx.restore()
    },
    onRangeChange (value) {
      this.scaleValue = value
      this.repaint()
    }
  }
}
</script>
<style lang="scss" scoped>
.canvas-wrap{
  overflow-x: auto;
}
.input-wrap{
  margin-top: 6px;
}
.cursor-grab {
  cursor: grab;
  cursor: -webkit-grab;
  cursor: -moz-grab;
}
.cursor-grabbing {
  cursor: grabbing;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
}
.control-row{
  display: flex;
  margin-bottom: 5px;
}
.btn-block{
  display: block;
  flex: 1;
  font-size: 12px;
}
</style>
