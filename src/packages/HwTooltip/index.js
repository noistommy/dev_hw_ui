import HwTooltipDirective from './HwTooltipDirective'
import './HwTooltipStyle.scss'
export default {
  install (Vue, options = {}) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.directive('hw-tooltip', HwTooltipDirective(options))
  }
}
