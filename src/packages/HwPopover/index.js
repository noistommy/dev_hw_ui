import { initialize } from './Main.js'
import './HwPopover.scss'
export default {
  install (Vue, options = {}) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.prototype.$popover = initialize(options)
  }
}
