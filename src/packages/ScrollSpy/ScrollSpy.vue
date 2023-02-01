<template>
  <div class="scrollspy">
    <div class="mini-map"></div>
    <div class="nav-title">{{title}}</div>
    <ul :class="[menuClassName, type]">
      <li class="type-nav" v-for="(nav, index) in navList" :key="nav.title"
          :class="[{active: index === currentType}]"
          @click="setGoto(nav, index)"
      >
        <span class="name">{{nav.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name:'ScrollSpy',
  data() {
    return {
      container: null,
      currentTop: 0,
      currentType: 0,
      navList: []
    }
  },
  props: {
    containerKey: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'list', //dot
    },
    // navList: {
    //   type: Array
    // },
    sectionKey: {
      type: String,
      default: 'section'
    },
    titleKey: {
      type: String,
      default: '.title'
    },
    initOffset: {
      type: Number,
      default: 0
    },
    menuClassName: {
      type: String,
      default: 'nav-list'
    },
    miniMap: {
      type: Boolean,
      default: false,
    }
  },
  mounted() {
    this.container = document.querySelector(this.containerKey) || window;
    this.container.style.scrollBehavior = 'smooth';
    this.setPosition();
    this.setActive();
    window.addEventListener('resize', this.setPosition);
    this.container.addEventListener('scroll', this.setActive);
  },
  destroyed() {
    window.removeEventListener('resize', this.setPosition);
    this.container.removeEventListener('scroll', this.setActive);
  },
  methods: {
    setGoto(target, i) {
      this.$emit('select', {target, i})
    },
    setPosition() {
      console.log('resize')
      const typeList = document.querySelectorAll(this.sectionKey);
      const setPos = [];
      typeList.forEach(type => {
        const typeItem = {};
        typeItem.title = type.querySelector(this.titleKey).textContent;
        typeItem.offset = type.offsetTop - this.initOffset;
        setPos.push(typeItem);
      });
      this.navList = setPos;
    },
    setActive() {
      this.currentTop = this.container.scrollTop;
      for (let i = 0; i < this.navList.length; i++) {
        if (this.currentTop < this.navList[i].offset) {
          this.currentType = i - 1;
          break;
        } else {
          this.currentType = i;
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.scrollspy {
  z-index: 9999;
  .dot {
    position: fixed;
    top: 50%;
    right: 0;
    padding: 30px;
    transform: translate(0, -50%);
    z-index: 9999;
    .type-nav {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin: 10px;
      position: relative;
      background: #454545;
      border: 1px solid #ffffff;
      opacity: .16;
      span.name {
        display: none;
        position: absolute;
        //font-size: 0.8em;
        font-weight: 600;
        padding: 5px 10px;
        border-radius: 4px;
        margin-right: 10px;
        width: max-content;
        top: 50%;
        right: 100%;
        background-color: #454545;
        color: #ffffff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.16);
        transform: translate(0, -50%);
        &:after {
          content: '';
          border-bottom: 5px solid #454545;
          border-top: 5px solid transparent;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          position: absolute;
          top: calc(50% - 5px);
          left: 100%;
          transform: rotate(90deg);
        }
      }
      &:hover {
        opacity: 1;
        span.name {
          display: inline-block;
        }
      }
      &.active {
        opacity: 1;
      }
    }
  }
  .mini-map {
    position: absolute;
    width: 5px;
    height: 100%;
    background-color: #f2f2f2;
    top:0;
    right: 0;
    z-index: 9999;
  }
}
</style>