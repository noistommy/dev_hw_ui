import * as util from './util'

export default (option) => {
  let show = null
  let hide = null

  const removeEvent = (el) => {
    if (show && hide) {
      el.removeEventListener('mouseenter', show)
      el.removeEventListener('mouseleave', hide)
    }
  }

  const createEvent = (el, param) => {
    show = () => { util.showTooltip(el, param.prop) }
    hide = () => { util.hideTooltip(param.prop) }
    el.addEventListener('mouseenter', show)
    el.addEventListener('mouseleave', hide)
  }

  return {
    bind (el, param) {
      removeEvent(el)
      util.processParams(param, option)
    },
    inserted (el, param) {
      createEvent(el, param)
    },
    update (el, param) {
      if (param.value !== param.oldValue) {
        util.processParams(param, option)
        removeEvent(el)
        createEvent(el, param)
      }
    },
    unbind (el) {
      hide()
      removeEvent(el)
    }
  }
}
