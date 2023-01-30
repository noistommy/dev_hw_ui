export const processParams = (param, option) => {
  param.prop = {}
  param.prop.placement = checkPlacement(param.modifiers, param.rawName) || 'bottom-center'
  param.prop.maxWidth = option.maxWidth || 200
  param.prop.fontSize = 'fontSize' in option ? option.fontSize : 'normal'
  param.prop.animate = 'animate' in option ? option.animate : true
  param.prop.animationType = option.animationType || 'fade'
  param.prop.animationDuration = option.animationDuration || 0.25
  param.prop.theme = option.theme || 'dark'
  // param.prop.text = param.value || '텍스트가 입력되지 않았습니다.'
  param.prop.text = param.value || false
  param.prop.distance = (8 + checkDistance(option.distance))
  param.prop.ref = param.prop.ref || null
}

const checkPlacement = (modifiers = {}, rawName = '') => {
  if (Object.keys(modifiers).length <= 0) return false
  const arr = rawName.split('.')
  if (arr.length > 3 || arr.legnth <= 1) return false
  if (['top', 'right', 'bottom', 'left'].includes(arr[1])) {
    if (arr.length === 2) return `${arr[1]}-center`
    if (arr.length === 3) return `${arr[1]}-${['start', 'center', 'end'].includes(arr[2]) ? arr[2] : 'center'}`
    return false
  } else {
    console.error('V-Tooltip : 기준 방향을 먼저 입력해야 합니다. (top, right, bottom, left)')
    return false
  }
}

const checkDistance = (distance) => {
  if (!Number.isSafeInteger(distance)) return false
  if (distance < 0) return false
  return distance
}

export const showTooltip = (el, prop) => {
  clearRef(prop.ref)
  if(!prop.text) return;
  const $Box = document.createElement('div')
  setBoxAttributes($Box, prop)
  setVisibility($Box, 'hidden')
  document.body.appendChild($Box)
  setBoxOffset(el, $Box, prop)
  if (prop.animate) setAnimation($Box, prop)
  setVisibility($Box, 'visible')
}

const setBoxAttributes = ($Box, prop) => {
  $Box.innerHTML = prop.text
  $Box.classList.add('hw-tooltip-box')
  $Box.classList.add(`--font-size-${prop.fontSize}`)
  $Box.setAttribute('data-tooltip-placement', prop.placement)
  $Box.setAttribute('data-tooltip-animation', prop.animationType)
  $Box.setAttribute('data-tooltip-theme', prop.theme)
  $Box.style.maxWidth = `${prop.maxWidth}px`
  prop.ref = $Box
}

const setBoxOffset = (el, $Box, prop) => {
  const eO = el.getBoundingClientRect()
  const bO = $Box.getBoundingClientRect()
  const { top, left } = checkLocatable(eO, bO, prop, $Box)
  locateElement($Box, top, left)
}

const checkLocatable = (eO, bO, prop, $Box) => {
  let top = 0
  let left = 0
  let isOverflowed = false
  const iW = window.innerWidth
  const iH = window.innerHeight
  const p = prop.placement.split('-')
  const d = prop.distance
  switch (p[0]) {
    case 'top':
      top = (eO.top - bO.height - d)
      switch (p[1]) {
        case 'start':
          left = eO.left
          break
        case 'center':
          left = (eO.left + ((eO.width - bO.width) / 2))
          break
        case 'end':
          left = (eO.right - bO.width)
          break
      }
      if (top < 0 || left < 0 || (left + bO.width) > iW) isOverflowed = true
      break
    case 'bottom':
      top = (eO.bottom + d)
      switch (p[1]) {
        case 'start':
          left = eO.left
          break
        case 'center':
          left = (eO.left + ((eO.width - bO.width) / 2))
          break
        case 'end':
          left = (eO.right - bO.width)
          break
      }
      if ((top + bO.height) > iH || left < 0 || (left + bO.width > iW)) isOverflowed = true
      break
    case 'left':
      left = (eO.left - bO.width - d)
      switch (p[1]) {
        case 'start':
          top = eO.top
          break
        case 'center':
          top = (eO.top + ((eO.height - bO.height) / 2))
          break
        case 'end':
          top = (eO.bottom - bO.height)
          break
      }
      if (top < 0 || (top + bO.height > iH) || left < 0) isOverflowed = true
      break
    case 'right':
      left = (eO.right + d)
      switch (p[1]) {
        case 'start':
          top = eO.top
          break
        case 'center':
          top = (eO.top + ((eO.height - bO.height) / 2))
          break
        case 'end':
          top = (eO.bottom - bO.height)
          break
      }
      if (top < 0 || (top + bO.height > iH) || (left + bO.width > iW)) isOverflowed = true
      break
  }

  /*
   * 놓았을때 OVERFLOW가 발생 하는가?
   * 전방향 데미지 계산 -> (가로 세로 오버플로우 픽셀의 합)
   * 데미지가 가장 낮은쪽으로 방향 전환후 재배치
   */
  if (isOverflowed) {
    const result = checkMinDamage(eO, bO, prop)
    $Box.setAttribute('data-tooltip-placement', result.placement)
    top = result.top
    left = result.left
  }

  return {
    top,
    left
  }
}

const checkMinDamage = (eO, bO, prop) => {
  const PLACEMENTS = [
    'top-start',
    'top-center',
    'top-end',
    'left-start',
    'left-center',
    'left-end',
    'right-start',
    'right-center',
    'right-end',
    'bottom-start',
    'bottom-center',
    'bottom-end'
  ]

  const calcObj = {
    placement: '',
    top: 0,
    left: 0,
    minDamage: Number.MAX_SAFE_INTEGER
  }
  const iW = window.innerWidth
  const iH = window.innerHeight
  const d = prop.distance
  for (let i = 0; i < PLACEMENTS.length; i++) {
    const p = PLACEMENTS[i].split('-')
    let top = 0
    let left = 0
    let damage = 0
    switch (p[0]) {
      case 'top':
        top = (eO.top - bO.height - d)
        switch (p[1]) {
          case 'start':
            left = eO.left
            break
          case 'center':
            left = (eO.left + ((eO.width - bO.width) / 2))
            break
          case 'end':
            left = (eO.right - bO.width)
            break
        }
        if (top < 0 || left < 0 || (left + bO.width) > iW) {
          damage += (top < 0 ? Math.abs(top) : 0)
          damage += (left < 0 ? Math.abs(left) : 0)
          damage += ((left + bO.width) > iW ? (left + bO.width) - iW : 0)
        }
        break
      case 'bottom':
        top = (eO.bottom + d)
        switch (p[1]) {
          case 'start':
            left = eO.left
            break
          case 'center':
            left = (eO.left + ((eO.width - bO.width) / 2))
            break
          case 'end':
            left = (eO.right - bO.width)
            break
        }
        if ((top + bO.height) > iH || left < 0 || (left + bO.width) > iW) {
          damage += (left < 0 ? Math.abs(left) : 0)
          damage += ((top + bO.height) > iH ? (top + bO.height) - iH : 0)
          damage += ((left + bO.width) > iW ? (left + bO.width) - iW : 0)
        }
        break
      case 'left':
        left = (eO.left - bO.width - d)
        switch (p[1]) {
          case 'start':
            top = eO.top
            break
          case 'center':
            top = (eO.top + ((eO.height - bO.height) / 2))
            break
          case 'end':
            top = (eO.bottom - bO.height)
            break
        }
        if (top < 0 || (top + bO.height) > iH || left < 0) {
          damage += (top < 0 ? Math.abs(top) : 0)
          damage += (left < 0 ? Math.abs(left) : 0)
          damage += ((top + bO.height) > iH ? (top + bO.height) - iH : 0)
        }
        break
      case 'right':
        left = (eO.right + d)
        switch (p[1]) {
          case 'start':
            top = eO.top
            break
          case 'center':
            top = (eO.top + ((eO.height - bO.height) / 2))
            break
          case 'end':
            top = (eO.bottom - bO.height)
            break
        }
        if (top < 0 || (top + bO.height) > iH || (left + bO.width) > iW) {
          damage += (top < 0 ? Math.abs(top) : 0)
          damage += ((top + bO.height) > iH ? (top + bO.height) - iH : 0)
          damage += ((left + bO.width) > iW ? (left + bO.width) - iW : 0)
        }
        break
    }

    if (calcObj.minDamage > damage) {
      calcObj.placement = p.join('-')
      calcObj.top = top
      calcObj.left = left
      calcObj.minDamage = damage
      if (damage === 0) return calcObj
    }
  }
  return calcObj
}

const locateElement = (el, top, left) => {
  el.style.top = top + 'px'
  el.style.left = left + 'px'
}

const setAnimation = (el, prop) => {
  el.style.animation = `${prop.animationType}In ${prop.animationDuration}s ease 0s 1`
}

const setVisibility = (el, value) => {
  el.style.visibility = value
}

export const hideTooltip = (prop) => {
  if (prop.animate && prop.ref) {
    prop.ref.addEventListener('animationend', () => {
      clearRef(prop.ref)
    })
    prop.ref.style.animation = `${prop.animationType}Out ${prop.animationDuration}s ease 0s 1`
  } else {
    clearRef(prop.ref)
  }
}

const clearRef = (ref) => {
  if (ref) {
    ref.remove()
  }
}
