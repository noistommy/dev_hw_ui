<template lang="pug">
  .menu-wrapper
    .menu-header
      .title
        router-link(:to="{path: '/'}") Gabia UI
    .menu-contents
      .menu-part(v-for="part in menuArr", :key="part.title")
        .part-title {{part.title}}
        .partition
        .part-item(v-for="item in part.list", :key="item.name", :class="{active: active === item.name}", @click="setActive(item.name)")
          router-link(:to="{name: item.name}") {{item.name}}


</template>

<script>
export default {
  name: 'main-menu',
  data () {
    return {
      activeMenu: 'Calendar',
      menuArr: [
        {
          title: 'Global',
          list: [
            {name:'Theme', path: '/theme'},
            {name:'Colors', path: '/colors'},
            {name:'Button', path: '/buttons'},
            {name:'Input', path: '/input'},
            {name:'Layout', path:'/layout'},
            {name:'Table', path:'/table'},
            {name:'Grid', path:'/grid'},
            {name:'Form', path:'/form'},
            {name:'GridComp', path:'/vue_grid'},
            {name:'CssDraw', path:'/css_draw'},
            {name:'Charts', path:'/charts'},
            {name:'Scrollspy', path:'/scrollspy'},
          ]
        },
        {
          title: 'Components',
          list: [
            {name:'Buttons', path: '/button_component'},
            {name:'Inputs', path: '/input_component'},
            {name:'SelectBox', path: '/select_box'},
            {name:'Chips', path: '/chips'},
            {name:'Tags', path: '/tags'},
            {name:'Switch', path: '/switch'},
            {name:'Calendar', path:'/calendar'},
            {name:'DatePicker', path:'/date_picker'},
            {name:'Dropdown', path:'/dropdown'},
            {name:'ContextMenu', path:'/context_menu'},
            {name:'Tabs', path:'/tabs'},
            {name:'DataTable', path:'/data-table'},
            {name:'Pagination', path:'/pagination'},
            {name:'Popover', path:'/popover'},
            {name:'Loading', path:'/loading'},
            {name:'GaugeBar', path:'/gauge_bar'},
            {name:'ExpandList', path:'/expand_list'},
            {name:'Modal', path:'/modal'},
            {name:'List', path:'/list'},
            {name:'Badge', path:'/badge'},
            {name:'CheckBox', path:'/check_box'},
            {name:'Breadcrumb', path:'/breadcrumb'},
            {name:'TreeList', path:'/tree_list'},
            {name:'ResizeLayout', path:'/resize_layout'},
            {name:'Countdown', path:'/countdown'},
            {name:'Toast', path:'/toast'},
            {name:'ColumnView', path:'/column_view'},
            {name:'Carousel', path:'/carousel_view'},
            {name:'Slider', path:'/slider'},
            {name:'GooeyEffect', path:'/gooey_effect'},

          ]
        },
        {
          title: 'Modules',
          list: [
            {name:'TextEditor', path:'/text_editor'},
            {name:'AvatarEditor', path:'/avatar_editor'},
            {name:'FileController', path:'/file_controller'},
            {name:'TreeView', path:'/tree_view'},
          ]
        },
        {
          title: 'Util',
          list: [
            {name:'LazyLoad', path:'/lazy_load'},
          ]
        },
        {
          title: 'Directives',
          list: [
            {name:'Tooltip', path: '/tooltip'},
          ]
        },
        {
          title: 'Filters',
          list: [
            {name:'ConvertNumber', path:'/convert_number'},
          ]
        },
        {
          title: 'Templates',
          list: [
            {name:'Navigation', path: '/template/navigation'},
            {name:'Transfer', path: '/template/transfer'},
            //{name:'Finder', path: '/template/finder'},
          ]
        },

      ]
    }
  },
  props: {
    active: {type: String, default: ''}
  },
  methods: {
    setActive(menu) {
      this.activeMenu = menu;
    }
  }
}
</script>

<style lang="scss">
.menu-wrapper {
  width: 100%;
  height: 100vh;
  padding: 30px;
  overflow-y: auto;
  .menu-header {
    border-bottom: 1px solid #d6d6d6;
    .title {
      font-size: 2em;
      font-weight: 500;
      margin-top: 10px;
      margin-bottom: 5px;
    }
  }
  .menu-contents {
    .menu-part {
      padding: 20px 0;
      .part-item {
        cursor: pointer;
        &:hover {
          background-color: #f8f8f8;
        }
        &.active {
          background-color: #333;
          a {
            color: #ffffff !important;
            font-weight: 700;
          }
        }
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 10px;
        }
      }
      .part-title {
        font-size: 12px;
        color: #909090;
        padding: 5px;
      }
    }
    .partition {
      border-bottom: 1px solid lighten(#e0e5ee, 10);
      border-top: 1px solid #e0e5ee;
    }
  }
}
</style>
