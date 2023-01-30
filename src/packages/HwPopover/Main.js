import Vue from 'vue'
import HwPopover from './HwPopover.vue'

const HW_POPOVER_REFRESH_FREQUENCY = (1000 / 60)
const HW_POPOVER_PLACEMENTS = [
    'top-start', 'top-center', 'top-end',
    'right-start', 'right-center', 'right-end',
    'bottom-start', 'bottom-center', 'bottom-end',
    'left-start', 'left-center', 'left-end'
]

const hwPopoverGlobalOptions = {
    distance: 20,
    placement: 'bottom-center',
    responsive: true,
    useArrow: true,
    containerClass: '',
    arrowClass: ''
}

const Popover = Vue.extend(HwPopover)
export let refreshShow = null
let popoverRef = null

const open = (component, componentProps, popoverProps, eventTarget) => {

    window.removeEventListener('click', close)
    window.removeEventListener('resize', refreshShow)
    window.removeEventListener('scroll', refreshShow)

    refreshShow = async function () {
        if (popoverRef) { hide() }
        const params = processPopoverParams(component, componentProps, popoverProps, eventTarget)
        popoverRef = new Popover({ data: params })
        popoverRef.$mount()
        await popoverRef.$nextTick()

        if (popoverRef.$el) {
            setVisibility(popoverRef.$el, 'hidden')
            document.body.appendChild(popoverRef.$el)

            const placements = HW_POPOVER_PLACEMENTS.slice()
            swap(0, placements.indexOf(params.popoverProps.placement), placements)
            const bestPlacement = {
                top: 0,
                left: 0,
                placement: placements[0],
                damage: Number.MAX_SAFE_INTEGER
            }
            for (let i = 0; i < placements.length; i++) {
                const { top, left, damage } = calcPosition(
                    popoverRef.$el,
                    params.eventTarget,
                    placements[i],
                    params.popoverProps.distance
                )
                if (bestPlacement.damage > damage) {
                    bestPlacement.top = top
                    bestPlacement.left = left
                    bestPlacement.placement = placements[i]
                    bestPlacement.damage = damage
                    if (damage === 0) {
                        break
                    }
                }
            }

            locateElement(popoverRef.$el, bestPlacement.top, bestPlacement.left)
            if (params.popoverProps.useArrow) {
                params.popoverProps.placement = bestPlacement.placement
            }
            setVisibility(popoverRef.$el, 'visible')
        }
    }

    refreshShow = throttle(refreshShow, HW_POPOVER_REFRESH_FREQUENCY)
    refreshShow()

    if(hwPopoverGlobalOptions.responsive){
        window.addEventListener('resize', refreshShow)
        window.addEventListener('scroll', refreshShow, true)
    } else {
        window.addEventListener('resize', close)
        window.addEventListener('scroll', close, true)
    }

    window.addEventListener('click', (e) => {
        if(popoverRef){
            if(!popoverRef.$el.contains(e.target)) close()
        }
    })

}

const hide = () => {
    if (popoverRef) {
        if (popoverRef.$el.parentNode) popoverRef.$el.parentNode.removeChild(popoverRef.$el)
        popoverRef.$destroy()
        popoverRef = null
    }
}

const close = () => {
    window.removeEventListener('resize', refreshShow)
    window.removeEventListener('scroll', refreshShow, true)
    hide()
}

const setGlobalOptions = (globalOptions = {}) => {
    for (const option in globalOptions) {
        if (option in hwPopoverGlobalOptions) {
            hwPopoverGlobalOptions[option] = globalOptions[option]
        }
    }
}

const processPopoverParams = (component, componentProps, popoverProps, eventTarget) => {
    // if (!(component instanceof Object) || !component.__file.endsWith('vue')) {
    //   return console.error('[HwPopover] : 입력된 component 파라미터가 유효한 Vue component가 아닙니다.')
    // }
    if (!eventTarget) {
        return console.error('[HwPopover] : 이벤트를 발생시킨 객체가 존재하지 않습니다.')
    }

    const result = {}
    result.component = component
    result.componentProps = componentProps || {}
    result.popoverProps = popoverProps || {}
    result.eventTarget = eventTarget

    for (const option in hwPopoverGlobalOptions) {
        result.popoverProps[option] =
            popoverProps && option in popoverProps
                ? popoverProps[option]
                : hwPopoverGlobalOptions[option]
    }

    return result
}

const calcPosition = (popover, eventTarget, placement, distance) => {
    const pO = popover.getBoundingClientRect()
    const eO = eventTarget.getBoundingClientRect()
    const iW = window.innerWidth
    const iH = window.innerHeight
    const p = placement.split('-')
    const d = distance
    let top = 0
    let left = 0
    let damage = 0

    switch (p[0]) {
        case 'top':
            top = (eO.top - pO.height - d)

            if (p[1] === 'start') left = eO.left
            else if (p[1] === 'center') left = (eO.left + ((eO.width - pO.width) / 2))
            else if (p[1] === 'end') left = (eO.right - pO.width)

            if (top < 0 || left < 0 || (left + pO.width) > iW) {
                damage += (top < 0 ? Math.abs(top) : 0)
                damage += (left < 0 ? Math.abs(left) : 0)
                damage += ((left + pO.width) > iW ? (left + pO.width) - iW : 0)
            }
            break

        case 'bottom':
            top = (eO.bottom + d)

            if (p[1] === 'start') left = eO.left
            else if (p[1] === 'center') left = (eO.left + ((eO.width - pO.width) / 2))
            else if (p[1] === 'end') left = (eO.right - pO.width)

            if ((top + pO.height) > iH || left < 0 || (left + pO.width) > iW) {
                damage += (left < 0 ? Math.abs(left) : 0)
                damage += ((top + pO.height) > iH ? (top + pO.height) - iH : 0)
                damage += ((left + pO.width) > iW ? (left + pO.width) - iW : 0)
            }
            break

        case 'right':
            left = (eO.right + d)

            if (p[1] === 'start') top = eO.top
            else if (p[1] === 'center') top = (eO.top + ((eO.height - pO.height) / 2))
            else if (p[1] === 'end') top = (eO.bottom - pO.height)

            if (top < 0 || (top + pO.height) > iH || (left + pO.width) > iW) {
                damage += (top < 0 ? Math.abs(top) : 0)
                damage += ((top + pO.height) > iH ? (top + pO.height) - iH : 0)
                damage += ((left + pO.width) > iW ? (left + pO.width) - iW : 0)
            }
            break

        case 'left':
            left = (eO.left - pO.width - d)

            if (p[1] === 'start') top = eO.top
            else if (p[1] === 'center') top = (eO.top + ((eO.height - pO.height) / 2))
            else if (p[1] === 'end') top = (eO.bottom - pO.height)

            if (top < 0 || (top + pO.height) > iH || left < 0) {
                damage += (top < 0 ? Math.abs(top) : 0)
                damage += (left < 0 ? Math.abs(left) : 0)
                damage += ((top + pO.height) > iH ? (top + pO.height) - iH : 0)
            }

            break
        default:
            return console.error('[HwPopover] : 잘못된 방향값 입력입니다.')
    }

    return {
        top,
        left,
        damage
    }
}

const swap = (i, j, arr) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

const setVisibility = (el, value) => {
    el.style.visibility = value
}

const locateElement = (el, top, left) => {
    el.style.top = top + 'px'
    el.style.left = left + 'px'
}

const throttle = (fn, frequency) => {
    let timerId = null
    return (...args) => {
        if (timerId) return
        timerId = setTimeout(() => {
            fn(...args)
            timerId = null
        }, frequency)
    }
}

export function initialize (initialOptions) {
    setGlobalOptions(initialOptions)

    return {
        open,
        close,
        setGlobalOptions
    }
}
