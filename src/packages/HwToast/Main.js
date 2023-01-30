import Vue from 'vue'
import ToastTemplate from './ToastTemplate.vue'
import ToastController from './ToastController'

const HW_TOAST_TYPES = [
  'success',
  'warning',
  'info',
  'error'
]

const HW_TOAST_POSITIONS = [
  'top-left',
  'top-right',
  'top-center',
  'bottom-left',
  'bottom-right',
  'bottom-center'
]

const HW_TOAST_OPTIONS = {
  message: '',
  offset: 0,
  gap: 0,
  position: 'top-center',
  type: 'info',
  duration: 3000,
  width: 50
}

const toastController = new ToastController(HW_TOAST_OPTIONS)
const Toast = Vue.extend(ToastTemplate)

export default function (initialOptions) {
  const toastMessage = async (options) => {
    options = processOptions(options)
    const toastInstance = new Toast({ data: options })
    toastInstance.$mount()
    document.body.appendChild(toastInstance.$el)
    toastInstance.$data.isVisible = true
    await toastInstance.$nextTick()
    toastInstance.$data.height = toastInstance.$el.offsetHeight
    toastInstance.toastController.addToast(toastInstance)
    toastInstance.setTimer()
  }

  const processOptions = (options = {}) => {
    // 해당 옵션은 Vue Toast 인스턴스의 초기 데이터로 설정될 것입니다.
    options.toastController = toastController
    options.height = 0
    options.timerId = null
    options.isVisible = false

    if (options.component instanceof Object && options.component.__file.endsWith('vue')) {
      delete options.message
      delete options.type
    } else {
      options.component = null
      options.message =
      'message' in options
        ? (options.message + '')
        : HW_TOAST_OPTIONS.message
      options.type =
      'type' in options
        ? isValidValue(HW_TOAST_TYPES, (options.type + ''))
          ? options.type
          : HW_TOAST_OPTIONS.type
        : HW_TOAST_OPTIONS.type
    }

    options.position =
    'position' in options
      ? isValidValue(HW_TOAST_POSITIONS, (options.position + ''))
        ? options.position
        : HW_TOAST_OPTIONS.position
      : HW_TOAST_OPTIONS.position

    options.duration =
    'duration' in options
      ? Number.isSafeInteger(options.duration)
        ? options.duration
        : HW_TOAST_OPTIONS.duration
      : HW_TOAST_OPTIONS.duration

    options.width = options.width || HW_TOAST_OPTIONS.width
    options.location = toastController.getNextLocation(options.position, options.width)

    return options
  }

  const setGlobalOption = (options = {}) => {
    for (const key in options) {
      if (key in HW_TOAST_OPTIONS) {
        HW_TOAST_OPTIONS[key] = options[key]
      }
    }
    toastController.setGlobalOption(HW_TOAST_OPTIONS)
  }

  const deleteToastAll = () => {
    toastController.deleteToastAll()
  }

  const isValidValue = (list, value) => {
    return list.includes(value)
  }

  setGlobalOption(initialOptions)

  return {
    toastMessage,
    setGlobalOption,
    deleteToastAll
  }
}
