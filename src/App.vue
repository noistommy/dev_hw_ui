<template lang="pug">
  #app
    hw-modal-container
    hw-pane-layout( :layout="layoutType", :handle-class="handleName", :class="`app-layout`")
      .main-menu(:class="{hide: isMobile}")
        main-menu(:active="activeMenu")
      hw-resize-handle( :handle-class="handleName" :hide-handle="true")
      .main-contents
        .contents-header
          .header-title {{activeMenu}}

        .contents-body
          router-view
</template>

<script>
import MainMenu from '@/views/MainMenu.vue';
import HwPaneLayout from "@/packages/HwResizablePane/HwPaneLayout";
import HwResizeHandle from "@/packages/HwResizablePane/HwResizeHandle";

export default {
  name: 'hiworks-ui',
  data() {
    return {
      layoutType: 'vertical',
      handleName: 'resize-bar',
      isMobile: false
    }
  },
  components:{MainMenu, HwPaneLayout, HwResizeHandle},
  computed: {
    activeMenu() {
      return this.$route.name;
    }
  },
  created() {
    let locale = navigator.language || navigator.userLanguage;
    locale = locale.substring(0, 2);
    console.log(`다국어 설정 : ${locale} ${locale === 'ko' ? '한국어' : '국외'}`)
    // if (locale !== 'ko') locale = 'en';
    let lo = '';
    switch (locale) {
      case "ko":
        lo = "ko-KR";
        break;
      case "en":
        lo = "en-US";
        break;
      case "zh":
        lo = "zh-CN";
        break;
      default:
        lo = "en-US"
    }
    //lo = "en-US"; // only dev
    this.$i18n.locale = lo;
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1280;
    })
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;

  width: 100vw;
  height: 100vh;
  display: flex;
  color:#333;
  min-width: 1280px;
  overflow-x: auto;
}
body {
  background-color: #fff;
}
.dark {
  /*filter:invert(100%);*/
}
.blur {
  filter:blur(10px);
}
.app-layout.hw-pane-layout {
  width: 100%;
  height: 100%;
  display: flex;
}
.main-menu {
  min-width: 276px;
  max-width: 484px;
  border-right: 1px solid #d6d6d6;
  &.hide {
    min-width: 0;
    width: 0;
  }
}
.main-contents {
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  .contents-header {
    height: 140px;
    padding: 25px;
    border-bottom: 1px solid #d6d6d6;
    .header-title {
      font-size: 2em;
      font-weight: 400;
    }
  }
  .contents-body {
    height: 100%;
    & > div {
      max-height: calc(100% - 140px);
      padding: 25px;
      // height: 100%;
      overflow-y: auto;
      scroll-behavior: smooth;
    }
  }
}
.contents-detail-view {
  min-width: 700px;
  max-width: 1024px;
  .tab-item {
    font-size: 15px;
    color: #909090;
    min-width: 100px;
    text-align: center;
    padding: 10px 20px;
  }
  .contents-section {
    margin-bottom: 100px;
    .section-title {
      font-size: 1.5em;
      font-weight: 600;
      border-bottom: 1px solid #d6d6d6;
      margin: 20px 0 40px 0;
    }
    .info-wrapper {
      .info-title {
        padding-bottom: 20px;
      }
    }
    .type-wrapper, .info-wrapper {
      position: relative;
      margin-top:30px;
      font-size: 1rem;
      .type-btn {
        cursor: pointer;
        position: absolute;
        width: 45px;
        height: 45px;
        padding: 8px;
        top:0;
        right: 0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        i {
          margin: 0 3px;
        }
        &:hover {
          background-color: #efefef;
        }
      }
      .type-title, .info-title {
        font-weight: 600;
        font-size: 1.2em;
      }
      .type-desc {
        font-size: 1em;
        color: #909090;
      }
      .type-preview {
        background-color: #fff;
        padding: 40px 25px;
        &.invert {
          background-color: #333;
        }
      }
      .type-code {
        /*display: none;*/
        /*transform: scaleY(0);*/
        height: 30px;
        opacity: 0;
        transition: all 250ms ease-in-out;
        &.show {
          /*display: block;*/
          height: auto;
          transform: translateY(-10px);
          opacity: 1;
        }
      }
      .type-msg {
        margin: 20px 0;
        font-size: 0.9em;
      }
    }

  }
}
.panel-body {
  .table {
  }
  .table .tr {
    display: flex;
    /*margin-bottom: 4px;*/
    .td, .th {
      width: 180px;
      padding: 8px 12px;
      border-bottom: 1px solid #efefef;
      /*border-right: 1px solid #efefef;*/
      &:last-child {
        flex-grow: 1;
        border-right:0;
      }
      &:first-child {
        font-weight: 700;
      }
    }
    .th {
      background-color: #efefef;
      border-bottom: 1px solid #d6d6d6;
      font-weight: 700;
      padding: 6px 8px;
    }
    &:last-child {
      margin:0;
      .td {
        border-bottom:0
      }
    }
  }
  &.table {
    padding: 0;
  }
}
.connect-link a{
  color: #d4b2de;
  font-weight: 700;
  text-decoration: underline;
}

.template-view {
  min-width: 700px;
  max-width: 1024px;
  .contents-section {
    margin-bottom: 100px;

    .section-title {
      font-size: 1.5em;
      font-weight: 600;
      border-bottom: 1px solid #d6d6d6;
      margin: 20px 0 40px 0;
    }
  }
  .type {
    &-title {
      font-size: 20px;
      font-weight: 400;
      color: #333;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    &-description {
      font-size: 14px;
      color: #c4c4c4;
    }
    &-contents {
      margin-top:30px;
      padding: 25px;
    }
  }
  /*.type-title {*/
  /*    font-size: 1.2em;*/
  /*    font-weight: 500;*/
  /*    margin: 40px 0 10px 0;*/
  /*}*/
}
</style>
