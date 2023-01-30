<template>
  <div
    :class="[
      'hw-document-view',
      {'excel-view': isExcel}
    ]">
    <div class="hw-document-view-body">
     <a :class="['body-image', {'excel-image': isExcel}]" :href="entrySrc" target="_blank" v-for="(entrySrc) in imageEntries" :key="entrySrc">
        <img :src="entrySrc" alt="document-image">
      </a>
    </div>
    <div v-if="isExcel" class="hw-document-view-footer">
      <template v-if="!isBroken">
        <div
          v-for="(entry, index) in document.entries"
          :class="[
            'sheet-button',
            {
              'sheet--selected': sheetIndex === index
            }
          ]" 
          :key="index"
          @click.stop="setSheetIndex(index)"
        >
          {{entry.sheetName}}
        </div>
      </template>
      <template v-else>
        <select class="sheet-select" @change="onSelect">
          <option 
            v-for="(entry, index) in document.entries"
            :key="index"
            :value="index"
            :selected="sheetIndex === index"
          >
            {{entry.sheetName}}
          </option>
        </select>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'document-view',
  props: {
    files: Array,
    currentIndex: Number,
    typeKey: String,
  },
  data() {
    return {
      breakPoint: 1024,
      isBroken: false,
      sheetIndex: 0
    } 
  },
  computed: {
    isExcel () {
      return /^xls(x)*?$/.test(this.document[this.typeKey])
    },
    document () {
      return this.files[this.currentIndex]
    },
    imageEntries () {
      if(this.isExcel){
        return this.document.entries[this.sheetIndex].entries
      }
      return this.document.entries
    }
  },
  mounted () {
    this.checkBreakPoint();
    window.addEventListener('resize', this.wrapThrottle(this.checkBreakPoint, 60), false);
  },
  methods: {
    setSheetIndex (index) {
      this.sheetIndex = parseInt(index);
    },
    checkBreakPoint () {
      if(window.innerWidth <= this.breakPoint) {
        this.isBroken = true;
      } else {
        this.isBroken = false;
      }
    },
    onSelect (event) {
      this.setSheetIndex(event.target.value);
    },
    wrapThrottle (fn, frequency = 144) {
      let timerId = null;
      return (...args) => {
        if(timerId !== null) return;
        timerId = setTimeout(() => {
          fn(...args);
          clearTimeout(timerId);
          timerId = null;
        }, 1000/frequency)
      }
    }
  }
}
</script>
