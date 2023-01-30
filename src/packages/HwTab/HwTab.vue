<template>
  <div class="hw-tab-container" :class="[tabContainerClass, {tabLine}]">
    <div class="hw-tab-wrap" ref="wrap">
      <div
              class="hw-tab"
              v-for="(tab, index) in tabList"
              :key="index"
              :class="[tabClass, {[tabActiveClass]: index === activeIndex}]"
              @click="onTabClick($event,index)"
      >
        <slot :tab="tab">
          <span>{{tab.name}}</span>
        </slot>
      </div>
    </div>
    <div
            class="tab-line"
            v-if="tabLine"
            :style="lineStyle"
            :class="[tabLineClass]"
    ></div>
  </div>
</template>
<script>
  export default {
    name: 'hw-tab',
    data () {
      return {
        activeIndex: 0,
        containerWidth: null,
        lineWidth: 0,
        lineX: 0
      }
    },
    props: {
      tabList: {
        type: Array, // tab list default key: name
        default: () => []
      },
      tabLine: {
        type: Boolean, //use active underline
        default: true
      },
      tabClass: {
        type: String, //custom class name, tab
        default: 'tab-default'
      },
      tabLineClass: {
        type: String, //custom class name, tab line
        default: 'tab-line-default'
      },
      tabActiveClass: {
        type: String,  //custom class name, tab line active
        default: 'tab-active-default'
      },
      tabContainerClass: String,
      value: Number
    },
    computed: {
      lineStyle () {
        return {
          transform: `translateX(${this.lineX}px)`,
          width: `${this.lineWidth}px`
        }
      }
    },
    created() {
      this.activeIndex = this.value
    },
    mounted(){
      this.setInitialLineWidth()
    },
    methods: {
      onTabClick (event, index) {
        this.activeIndex = index
        this.$emit('tab-click', this.tabList[index], index)
        const wO = this.$refs.wrap
        const eO = (event.target.classList.contains('hw-tab')
                        ? event.target
                        : event.target.parentNode
        )
        this.lineWidth = eO.scrollWidth
        this.lineX = eO.offsetLeft - wO.offsetLeft
      },
      setInitialLineWidth(){
        if(this.tabList.length > 0){
          this.lineWidth = this.$refs.wrap.firstChild.scrollWidth
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .hw-tab-container{
    position: relative;
    display: inline-block;
    .hw-tab-wrap{
      white-space: nowrap;
      //display: inline-block;
      .hw-tab{
        display: inline-block;
        cursor: pointer;
        &.tab-default{
          height: 40px;
          background-color: transparent;
          padding: 0 20px;
          text-align: center;
        }
        &.tab-active-default{
          color: #2985db !important;
        }
      }
    }

    .tab-line{
      position: absolute;
      left: 0;
      transition: transform 500ms cubic-bezier(0.68, -0.6, 0.32, 1.6);;
    }
    .tab-line-default{
      height: 2px;
      bottom: -2px;
      background-color: #2985db;
    }
    &.tabLine {
      border-bottom: 2px solid #ebebeb;
    }

  }
</style>
