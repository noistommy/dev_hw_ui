import Main from './Main'
export default {
  install (Vue, initialOptions = {}) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.prototype.$toast = Main(initialOptions)
  }
}
