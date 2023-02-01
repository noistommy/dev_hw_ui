import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Theme',
        component: () => import('../components/Theme.vue')
    },
    {
        path: '/color-palette',
        name: 'ColorPalette',
        component: () => import('../components/ColorPalette.vue')
    },
    {
        path: '/test',
        name: 'TestView',
        component: () => import('../components/TestView.vue')
    },
    {
        path: '/theme',
        name: 'Theme',
        component: () => import('../components/Theme.vue')
    },
    {
        path: '/hover-effect',
        name: 'HoverEffect',
        component: () => import('../components/HoverEffect.vue')
    },
    {
        path: '/colors',
        name: 'Colors',
        component: () => import('../components/Colors.vue')
    },
    {
        path: '/buttons',
        name: 'Button',
        component: () => import('../components/Buttons.vue')
    },
    {
        path: '/input',
        name: 'Input',
        component: () => import('../components/Input.vue')
    },
    {
        path: '/select_box',
        name: 'SelectBox',
        component: () => import('../components/SelectBox.vue')
    },
    {
        path: '/button_component',
        name: 'Buttons',
        component: () => import('../components/ButtonComp.vue')
    },
    {
        path: '/input_component',
        name: 'Inputs',
        component: () => import('../components/InputComp.vue')
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('../components/Calendar.vue')
    },
    {
        path: '/date_picker',
        name: 'DatePicker',
        component: () => import('../components/DatePicker.vue')
    },
    {
        path: '/dropdown',
        name: 'Dropdown',
        component: () => import('../components/DropDown.vue')
    },
    {
        path: '/context-menu',
        name: 'ContextMenu',
        component: () => import('../components/ContextMenu.vue')
    },
    {
        path: '/tooltip',
        name: 'Tooltip',
        component: () => import('../components/Tooltip.vue')
    },
    {
        path: '/tags',
        name: 'Tags',
        component: () => import('../components/Tags.vue')
    },
    {
        path: '/switch',
        name: 'Switch',
        component: () => import('../components/Switch.vue')
    },
    {
        path: '/text_editor',
        name: 'TextEditor',
        component: () => import('../components/TextEditor.vue')
    },
    {
        path: '/tabs',
        name: 'Tabs',
        component: () => import('../components/Tabs.vue')
    },
    {
        path: '/data-table',
        name: 'DataTable',
        component: () => import('../components/DataTable.vue')
    },
    {
        path: '/pagination',
        name: 'Pagination',
        component: () => import('../components/Pagination.vue')
    },
    {
        path: '/file_controller',
        name: 'FileController',
        component: () => import('../components/FileController.vue')
    },
    {
        path: '/avatar_editor',
        name: 'AvatarEditor',
        component: () => import('../components/AvatarEditor.vue')
    },
    {
        path: '/popover',
        name: 'Popover',
        component: () => import('../components/Popover.vue')
    },
    {
        path: '/loading',
        name: 'Loading',
        component: () => import('../components/Loading.vue')
    },
    {
        path: '/text_editor_research',
        name: 'TextEditorResearch',
        component: () => import('../components/TextEditorResearch.vue')
    },
    {
        path: '/gauge_bar',
        name: 'GaugeBar',
        component: () => import('../components/ProgressBar.vue')
    },
    {
        path: '/lazy_load',
        name: 'LazyLoad',
        component: () => import('../components/LazyLoad.vue')
    },
    {
        path: '/expand_list',
        name: 'ExpandList',
        component: () => import('../components/ExpandList.vue')
    },
    {
        path: '/list',
        name: 'List',
        component: () => import('../components/List.vue')
    },
    {
        path: '/modal',
        name: 'Modal',
        component: () => import('../components/Modal.vue')
    },
    {
        path: '/badge',
        name: 'Badge',
        component: () => import('../components/Badge.vue')
    },
    {
        path: '/treeview',
        name: 'TreeView',
        component: () => import('../components/TreeView.vue')
    },
    {
        path: '/draggable',
        name: 'Draggable',
        component: () => import('../components/Draggable.vue')
    },
    {
        path: '/check_box',
        name: 'CheckBox',
        component: () => import('../components/CheckBox.vue')
    },
    {
        path: '/breadcrumb',
        name: 'Breadcrumb',
        component: () => import('../components/Breadcrumb.vue')
    },
    {
        path: '/tree_list',
        name: 'TreeList',
        component: () => import('../components/TreeList.vue')
    },
    {
        path: '/chips',
        name: 'Chips',
        component: () => import('../components/Chips.vue')
    },
    {
        path: '/resize_layout',
        name: 'ResizeLayout',
        component: () => import('../components/ResizeLayout.vue')
    },
    {
        path: '/countdown',
        name: 'Countdown',
        component: () => import('../components/Countdown.vue')
    },
    // template route
    {
        path: '/templates/navigation',
        name: 'Navigation',
        component: () => import('../components/templates/Navigation.vue')
    },
    {
        path: '/templates/transfer',
        name: 'Transfer',
        component: () => import('../components/templates/Transfer.vue')
    },
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('../components/Layout.vue')
    },
    {
        path: '/toast',
        name: 'Toast',
        component: () => import('../components/Toast.vue')
    },
    {
        path: '/table',
        name: 'Table',
        component: () => import('../components/Table.vue')
    },
    {
        path: '/grid',
        name: 'Grid',
        component: () => import('../components/Grid.vue')
    },
    {
        path: '/vue_grid',
        name: 'GridComp',
        component: () => import('../components/GridComp.vue')
    },
    {
        path: '/column_view',
        name: 'ColumnView',
        component: () => import('../components/ColumnView.vue')
    },
    {
        path: '/carousel_view',
        name: 'Carousel',
        component: () => import('../components/Carousel.vue')
    },
    {
        path: '/color_generator',
        name: 'ColorGenerator',
        component: () => import('../components/ColorGenerator.vue')
    },
    {
        path: '/slider',
        name: 'Slider',
        component: () => import('../components/Slider.vue')
    },
    {
        path: '/cards',
        name: 'Cards',
        component: () => import('../components/Cards.vue')
    },
    {
        path: '/gooey_effect',
        name: 'GooeyEffect',
        component: () => import('../components/GooeyEffect.vue')
    },
    {
        path: '/2048',
        name: '2048',
        component: () => import('../components/Games/2048/2048.vue')
    },
    {
        path: '/css_draw',
        name: 'CssDraw',
        component: () => import('../components/CSSDraw/cssDraw.vue')
    },
    {
        path: '/charts',
        name: 'Charts',
        component: () => import('../components/Charts/ChartsView.vue')
    },
    {
        path: '/counter',
        name: 'Counter',
        component: () => import('../components/Counter.vue')
    },
    {
        path: '/form',
        name: 'Form',
        component: () => import('../components/Form.vue')
    },
    {
        path: '/convert_number',
        name: 'ConvertNumber',
        component: () => import('../components/ConvertNumber.vue')
    },
    {
        path: '/scrollspy',
        name: 'Scrollspy',
        component: () => import('../components/Scrollspy.vue')
    },

];

const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes
});


export default router
