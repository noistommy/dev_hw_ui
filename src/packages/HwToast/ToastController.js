const TOAST_SIDE = [
  'top-left',
  'top-right',
  'top-center',
  'bottom-left',
  'bottom-right',
  'bottom-center'
]

function ToastController ({ offset, gap }) {
  this.globalOptions = {
    offset: offset || 0,
    gap: gap || 0
  }
  this.toasts = []
  TOAST_SIDE.forEach(side => { this[side] = offset || 0 })
}

ToastController.prototype.setGlobalOption = function (options = {}) {
  for (const key in options) {
    if (key in this.globalOptions && Number.isSafeInteger(options[key])) {
      this.globalOptions[key] = options[key]
      if (key === 'offset') this.setOffset()
    }
  }
}

ToastController.prototype.addToast = function (toast) {
  this.toasts.push(toast)
  this.updateLastValue(toast, 1)
}

ToastController.prototype.deleteToast = function (toast) {
  this.moveToasts(toast, this.updateLastValue(toast, -1))
  this.toasts.splice(this.toasts.indexOf(toast), 1)
}

ToastController.prototype.deleteToastAll = function () {
  if (this.toasts.length > 0) {
    this.toasts.forEach(toast => { toast.$data.isVisible = false })
    this.toasts = []
  }
}

ToastController.prototype.setOffset = function () {
  if (this.toasts.length > 0) {
    this.toasts.forEach(toast => { toast.forceRemove() })
    this.toasts = []
  }
  TOAST_SIDE.forEach(side => { this[side] = this.globalOptions.offset || 0 })
}

ToastController.prototype.getFilteredToasts = function (position) {
  return this.toasts.filter(toast => toast.$data.position === position)
}

ToastController.prototype.getNextLocation = function (position, width) {
  const toastSide = position.split('-')
  const location = {}
  location.isCenter = position.endsWith('center')
  location[toastSide[0] === 'top' ? 'top' : 'bottom'] = this[position]
  if (toastSide[1] === 'left') location.left = 0
  else if (toastSide[1] === 'center') location.left = (100 - width) / 2
  else if (toastSide[1] === 'right') location.right = 0
  return location
}

ToastController.prototype.updateLastValue = function (toast, diff) {
  const { position, height } = toast.$data
  const lastValue = (height + this.globalOptions.gap) * diff
  this[position] += lastValue
  return lastValue
}

ToastController.prototype.moveToasts = function (toast, value) {
  if (this.toasts.length <= 0) return
  const toasts = this.getFilteredToasts(toast.$data.position).slice(this.toasts.indexOf(toast))
  const side = toast.$data.position.startsWith('top') ? 'top' : 'bottom'
  toasts.forEach(toast => { toast.move(side, value) })
}

export default ToastController
