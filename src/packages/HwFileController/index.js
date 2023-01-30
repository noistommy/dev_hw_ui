import HwFileController from './HwFileController'
export default {
  install (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('hw-file-controller', HwFileController)
  }
}
