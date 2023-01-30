import HwLazyLoadDirective from './HwLazyLoadDirective'
import './HwLazyLoadStyle.scss'
export default {
    install (Vue) {
        if (typeof window !== 'undefined' && window.Vue) {
            Vue = window.Vue
        }
        Vue.directive('hw-lazyload', HwLazyLoadDirective)
    }
}