<template>
  <div class="scrollspy">
    <div class="nav-list user-nav">
      <div class="type-nav"><span class="name">Selction 1</span></div>
      <div class="type-nav"><span class="name">Selction 2</span></div>
      <div class="type-nav"><span class="name">Selction 3</span></div>
      <div class="type-nav"><span class="name">Selction 4</span></div>
      <div class="type-nav"><span class="name">Selction 5</span></div>
    </div>
    <div>
      <div class="hw-button primary" @click="changeMode">{{type | uppercase}}</div>
<!--      <div class="hw-button primary outline" @click="setUserMode">USER</div>-->
    </div>
    <div class="section-wrapper">
      <section class="s-section" data-title="section 1"><div class="title">SECTION 1</div></section>
      <section class="s-section" data-title="section 2"><div class="title">SECTION 2</div></section>
      <section data-title="section 3"><div class="title">SECTION 3</div></section>
      <section class="s-section" data-title="section 4"><div class="title">SECTION 4</div></section>
      <section data-title="section 5"><div class="title">SECTION 5</div></section>
    </div>
  </div>
</template>
<script>
import Scrollspy from "@/modules/Scrollspy";

export default {
  name: 'ScrollspyView',
  data() {
    return {
      type: 'dot',
      ss: null
    }
  },
  mounted() {
    this.ss = new Scrollspy({
      // section: '.s-section',
      title: '.title',
      offset: 140
    })
    this.ss.init()
  },
  methods: {
    changeMode() {
      const el = document.querySelector(`.nav-list`)
      if(el) {
        el.parentNode.removeChild(el)
      }
      // this.ss.option.section = '.s-section'
      this.ss.option.type = this.type
      this.type = this.type === 'list' ? 'dot' : 'list'
      this.ss.init()
    },
    setUserMode () {
      const el = document.querySelector(`.nav-list`)
      el.parentNode.removeChild(el)
      this.ss.option.type ='user-nav'
      this.ss.init()
    }
  }
}
</script>

<style lang="scss">
section {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  .title {
    font-size: 2em;
    font-weight: 900;
  }
}
.nav-list {
  &.user-nav {
    position: fixed;
    display: flex;
    justify-content: flex-start;
    top: 200px;
    left:320px;
    .type-nav {
      padding: 10px 20px;
      &:hover {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #a1a1a1;
        }
      }
      &.active, &.current {
        font-weight: 700;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #a1a1a1;
        }
      }
    }
  }
  &.list {
    position: fixed;
    right: 0;
    top: 200px;
    margin-top: 30px;
    padding: 10px 20px;
    width: 15%;
    min-width: 300px;
    border-left: 2px solid #ddd;
    .type-nav {
      cursor: pointer;
      padding: 5px;
      &:hover {
        font-weight: 700;
      }
      &.active, &.current {
        font-weight: 700;
      }
    }
  }
  &.dot {
    position: fixed;
    right: 0;
    top: 50%;
    padding: 30px;
    transform: translateY(-50%);
    .type-nav {
      background-color: #454545;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin: 10px;
      position: relative;
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
}
</style>