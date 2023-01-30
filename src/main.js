import '@babel/polyfill'
import './polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/scss/vendor/font-awesome-6.1.1.scss';
import '@/assets/fonts/Pretendard/pretendard.css';
import '@/assets/fonts/SpoqaHanSans/spoqahansans.scss';
import '@/assets/scss/reset.scss';
import '@/assets/scss/style.scss';

import HiworksUI from './packages'
import HwTooltip from './packages/HwTooltip'
import HwPopover from './packages/HwPopover'
import HwLazyLoad from './packages/HwLazyLoad'
import HwModal from './packages/HwModal'
import i18n from './i18n'

import HwToast from './packages/HwToast'


// import VuePrism from 'vue-prism'
// Vue.use(VuePrism);

import 'prismjs/themes/prism.css'

import '@/filters'

Vue.use(HiworksUI);
Vue.use(HwTooltip, {
  theme: 'dark',
  fontSize: 'small',
  animationType: 'scale'
});
Vue.use(HwPopover, {
  useArrow: true,
  responsive: false
});
Vue.use(HwLazyLoad);
Vue.use(HwModal, {
  useStack: false,
  clickToClose: false,
  escapeToClose: false
});

Vue.use(HwToast, {
  offset: 0, // 토스트 생성 위치 (px)
  gap: 10, // 토스트 메세지 간 간격 (px)
  position: 'top-center', // message-box position 
  width: 80, // message-box width (%)
  type: 'info', //state type (success, info, error, warning)
  duration: 3000, //animation duration
  message: '' // default message
});
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  Vue.prototype.$toast.deleteToastAll();
  Vue.prototype.$hwModal.closeAll();
  next();
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
