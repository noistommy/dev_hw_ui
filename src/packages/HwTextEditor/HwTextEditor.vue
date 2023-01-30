<template>
  <div class="text-editor-wrapper">
    <div class="floating-panel-wrapper">
      <div class="menu-container" :style="menuPos">
        <div class="drop-menu context-menu" v-if="dropMenu" ref="menu" :tabindex="0" :class="popDirection">
          <div class="menu-item context-menu" v-if="searchedList.length === 0">대상 없음</div>
          <div class="menu-item context-item ellipsis" v-for="(item, index) in searchedList" :key="item[mentionKey]"
               :class="{select:(index) === currentIndex}"
               @mouseenter="currentIndex = index"
               @click="selectItem(item)">
            <span><i class="gi" :class="`gi-mention`"></i></span>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="popover-container" :style="popoverPos">
          <div class="pop-over" v-if="popover" ref="popover" :class="popDirection">
              <div class="form-field link-title">
                  <div class="label">링크 이름</div>
                  <div class="hw-input">
                      <input class="hw-input underline" placeholder="이름" v-model="currentLink.title">
                  </div>
              </div>
              <div class="form-field link-url">
                  <div class="label">URL</div>
                  <div class="hw-input">
                      <input class="hw-input underline" placeholder="URL" v-model="currentLink.url">
                  </div>
              </div>
              <div class="popover-btn-wrap">
                  <div @click="editLink" class="hw-button primary small">적용</div>
                  <div @click="closePopover"  class="hw-button secondary small">취소</div>
              </div>
          </div>
      </div> -->
    </div>
    <div
        :style="{minHeight: `${extendHeight}px`}"
        class="text-editor"
        :class="[{default: isEmpty},{borderLine: borderLine},{autoLine: isExtend}]"
        :spellcheck="false"
        :contenteditable="true"
        :placeholder="placeHolder"
        ref="editor"
        id="editor"
    >
    </div>
  </div>
</template>
<script>
const expUrl = /(https?:\/\/[^\s]+|www.[^\s]+)/gi
// const expUrl = /((?:http(s)?:\/\/)?[www.-]+((?:[.:][\w.-]+)[/a-z0-9:?=&%#-._@]+){2}|(?:http(s)?:\/\/)[\w.-]+((?:[.:][\w.-]+)[/a-z0-9:?=&%#-._@]+))/gi
export default {
  name: 'hw-text-editor',
  props: {
    contentHtml: {
      type: String,
      default: '',
      required: false
    },
    spellCheck: {
      type: Boolean,
      default: false,
      required: false
    },
    contentEditable: {
      type: Boolean,
      default: true,
      required: false
    },
    placeHolder: String,
    mentionList: {
      type: Array,
      default: () => [],
      required: false
    },
    borderLine: Boolean,
    useMention: {
      type: Boolean,
      default: true
    },
    mentionAll: {
      type: Boolean,
      default: true
    },
    mentionKey: String,
    isExtend: {
      type: Boolean,
      default: true,
      required: false
    },
    isActive: Boolean,
    popDirection: {
      type: String,
      default: 'down'
    },
    extendHeight: {
      type: Number,
      default: 33
    },
    closeAll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      editor: null,
      editable: true,
      savedSelection: null,
      mentionStyle: 'color:#2985db; padding: 0 3px;',
      linkStyle: 'color:#2985db; padding: 0 3px; display: inline; word-break: break-all;',
      dropMenu: false,
      menuPos: {
        top: 0,
        left: 0
      },
      searchKey: '',
      searchedList: [],
      selectPos: null,
      selectNode: null,
      mentionMenu: [],
      codeString: '',
      currentIndex: 0,
      maxHeight: 200,
      optionHeight: 45,
      matchLink: {},
      currentLink: {
        title: '',
        url: ''
      },
      allItem: {},
      isPasted: false
    }
  },
  computed: {
    isIE () {
      return /(msie|trident)/gi.test(navigator.userAgent)
    },
    isEmpty () {
      return this.editor ? this.editor.textContent.length === 0 : false
    },
    hasChildNodes () {
      return this.editor ? this.editor.hasChildNodes() : false
    },
    selectPosition () {
      return this.currentIndex * this.optionHeight
    }
  },
  watch: {
    closeAll (newVal, oldVal) {
      if (newVal === true && oldVal === false) {
        this.closeMenu()
      }
    },
    mentionList: {
      immediate: true,
      handler () {
        this.searchedList = this.mentionList.slice()
        if (this.mentionAll) {
          const allItem = {}
          allItem[this.mentionKey] = 'all'
          allItem.name = '모두'
          this.searchedList.unshift(allItem)
        }
      }
    }
  },
  created () {
    console.log('Editor stat!!')
    // this.mentionMenu = this.mentionList
    // if (this.mentionAll) {
    //   this.allItem[this.mentionKey] = 'all'
    //   this.allItem.name = '모두'
    //   this.mentionMenu.unshift(this.allItem)
    // }
    // this.searchedList = this.mentionMenu
  },
  beforeMount () {
    if (this.isIE) {
      document.execCommand('AutoUrlDetect', false, false)
    }
  },
  mounted () {
    this.editor = this.$refs.editor
    this.editor.innerHTML = this.contentHtml || this.getFirstLineHTML()
    /*
    * 에디터상의 링크를 복사했을때 링크 양옆의 ZWSP Character가 같이 복사되어
    * 링크를 붙여넣은 후 라우팅 동작을 실시했을 때 오동작하는 이슈를 처리하기 위한
    * 내용입니다. 
    */
    this.editor.addEventListener('copy', (e) => {
      e.preventDefault()
      const selection = window.getSelection()
      const cleanCopyText = selection.toString().trim().replace(/\u200B/g, '')
      e.clipboardData.setData('text', cleanCopyText)
    })
    this.editor.addEventListener('keydown', this.onEditorKeyDown)
    this.editor.addEventListener('keyup', this.onEditorKeyUp)
    this.editor.addEventListener('paste', this.onEditorPaste)
    this.editor.addEventListener('focus', this.onEditorFocus)
    this.editor.addEventListener('blur', this.onEditorBlur)
    this.editor.addEventListener('DOMNodeInserted', (event) => {
      if (this.isLineNode(event.target) && !this.isPasted && !this.isIE) {
        this.checkEntity('enter')
      }
      if (event.target instanceof HTMLBRElement && event.target.parentNode.childNodes.length > 1) {
        event.target.outerHTML = '&#8203;'
      }
      if (this.isIE && event.target instanceof HTMLParagraphElement) {
        event.target.style.margin = '0'
      }
    })
    window.addEventListener('keydown', this.onWindowKeyDown)
    this.editor.focus()
    if (this.contentHtml) {
      const selection = window.getSelection();
      const range = document.createRange();
      const lastLine = this.editor.lastChild;
      const lastLineChild = lastLine.lastChild;
      range.selectNode(lastLineChild);
      selection.removeAllRanges();
      selection.addRange(range);
      selection.collapseToEnd();
    }
  },
  methods: {
    onWindowKeyDown (event) {
      if (!this.dropMenu) return
      const keyCode = event.keyCode || event.which
      if (keyCode === 13) {
        event.preventDefault()
        this.selectItem()
      }
      if (keyCode === 27) {
        this.closeMenu()
        this.restoreSelection()
      }
      if (keyCode === 38) {
        event.preventDefault()
        this.moveUpItem()
      }
      if (keyCode === 40) {
        event.preventDefault()
        this.moveDownItem()
      }
    },
    onEditorKeyDown (event) {
      const keyCode = parseInt(event.keyCode || event.which)
      console.log("KeyCode:",keyCode)
      if (keyCode === 13) {
        this.onEditorEnter()
      } else if (keyCode === 32) {
        this.onEditorSpace()
      } else if (keyCode === 50 && event.shiftKey && this.useMention) {
        setTimeout(this.openMenu, 250)
      } else if (keyCode === 27 || keyCode === 46) {
        this.closeMenu()
      }
      // if (keyCode === 90 && (event.metaKey || event.ctrlKey)){
      //   event.preventDefault()
      // }
      //
      // if(keyCode === 88 && (event.metaKey || event.ctrlKey)){
      //   event.preventDefault()
      // }
      //
      if (keyCode === 46 || (keyCode === 68 && event.ctrlKey) || event.key === 'Delete') {
        const selection = window.getSelection()
        const currLine = this.isLineNode(selection.anchorNode) ? selection.anchorNode : selection.anchorNode.parentNode
        if (
          selection.isCollapsed &&
            currLine.lastChild === selection.focusNode &&
            currLine.nextSibling &&
            selection.focusNode instanceof Text &&
            selection.focusOffset === selection.focusNode.length
        ) {
          const range = document.createRange()
          const nthChild = [...currLine.childNodes].findIndex(childNode => childNode === selection.focusNode)
          this.checkEntity('delete')
          const focusedNode = currLine.childNodes[nthChild]
          // console.log(focusedNode, focusedNode.length)
          range.setStart(focusedNode, focusedNode.length)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }

      // if (keyCode === 13 && event.shiftKey) {
      //   this.$emit('submit', this.$refs.editor.innerHTML)
      //   event.preventDefault()
      // }

      if (keyCode === 8) {
        const selection = getSelection()
        if (
          selection.isCollapsed &&
            selection.anchorNode instanceof Text &&
            selection.anchorNode.textContent.length === selection.anchorOffset &&
            [HTMLSpanElement, HTMLAnchorElement].some(ctr => selection.anchorNode.nextSibling instanceof ctr)
        ) {
          event.preventDefault()
        } else if (this.searchKey === '') {
          this.closeMenu()
        }
      }
    },
    onEditorKeyUp () {
      const selection = getSelection()
      if (!this.editor.hasChildNodes()) {
        // 에디터의 내용을 전부 삭제했을때 첫째줄이 HTMLDivElement ParentNode가 아닌 상황을 방지
        this.editor.innerHTML = this.getFirstLineHTML()
      }

      this.$emit('empty', this.editor.textContent === '')

      if (this.dropMenu) {
        const anchorNode = selection.anchorNode
        const range = document.createRange()
        range.collapse(false)
        range.setStart(anchorNode, this.savedSelection.endOffset)
        range.setEnd(anchorNode, selection.focusOffset)
        if(this.searchKey !== range.toString()){
          this.searchKey = range.toString()
          this.findOption(this.searchKey)
        }
      }
    },
    onEditorEnter () {
      if (!this.hasChildNodes) return
      const childNodes = [...getSelection().anchorNode.parentNode.childNodes]
      this.treeWalkWide(childNodes, [Text], [HTMLAnchorElement, HTMLSpanElement], this.textToAnchor, false)
    },
    onEditorSpace () {
      if (!this.hasChildNodes) return
      const childNodes = [...getSelection().anchorNode.parentNode.childNodes]
      this.treeWalkWide(childNodes, [Text], [HTMLAnchorElement, HTMLSpanElement], this.textToAnchor, false)
    },
    onEditorPaste (event) {
      event.preventDefault()
      event.stopPropagation()
      const clipboardData = event.clipboardData || window.clipboardData
      let pasteText = clipboardData.getData('text')
      pasteText = this.detectZeroWidthSpace(pasteText).join('')
      this.isPasted = true
      if (this.isIE) {
        this.editor.removeEventListener('paste', this.onEditorPaste, false)
        document.execCommand('paste', null, pasteText)
        this.editor.addEventListener('paste', this.onEditorPaste, false)
      } else {
        document.execCommand('insertHTML', null, pasteText)
      }
      this.isPasted = false
      const childNodes = [...this.editor.childNodes]
      this.treeWalkWide(childNodes, [Text], [HTMLAnchorElement, HTMLSpanElement], this.textToAnchor, true)
    },
    onEditorFocus () {
      if (this.dropMenu) this.closeMenu()
    },
    onEditorBlur () {
      this.$emit('update', this.editor.innerHTML)
    },
    getFirstLineHTML () {
      let lineOut = ''
      if (this.isIE) {
        lineOut = '<p style="margin: 0px;"></p>'
      } else {
        lineOut = '<div><br></div>'
      }
      return lineOut
    },
    saveSelection () {
      if (this.savedSelection) this.savedSelection = null
      const selection = getSelection()
      const range = document.createRange()
      range.setStart(selection.anchorNode, selection.anchorOffset)
      this.savedSelection = range.cloneRange()
    },
    restoreSelection () {
      if (!this.savedSelection) return
      const selection = getSelection()
      selection.removeAllRanges()
      selection.addRange(this.savedSelection)
    },
    checkEntity (key) {
      const anchorNode = window.getSelection().anchorNode
      const currLine = this.isLineNode(anchorNode) ? anchorNode : anchorNode.parentNode
      let prevLine = null
      let nextLine = null
      switch (key) {
        case 'enter':
          prevLine = currLine.previousSibling || {}
          this.restoreEntity(prevLine.childNodes || [])
          this.restoreEntity(currLine.childNodes || [])
          break
        case 'delete':
          nextLine = currLine.nextSibling || {}
          this.restoreEntity(currLine.childNodes || [])
          this.restoreEntity(nextLine.childNodes || [])
          break
      }
    },
    restoreEntity (childNodes) {
      const { texts, linkAndMentions } = [...childNodes].reduce((acc, currNode) => {
        if (this.isTextNode(currNode)) {
          acc.texts.push(currNode)
        } else if (this.isTagNode(currNode)) {
          acc.linkAndMentions.push(currNode)
        }
        return acc
      }, { texts: [], linkAndMentions: [] })
      texts.forEach(textNode => { textNode.textContent = textNode.textContent.replace(/\u200B/gi, '') })
      linkAndMentions.forEach(tagNode => { tagNode.outerHTML = '&#8203;' + tagNode.outerHTML + '&#8203;' })
    },
    isLineNode (node) {
      return [HTMLDivElement, HTMLParagraphElement].some(ctr => node instanceof ctr)
    },
    isTagNode (node) {
      return [HTMLSpanElement, HTMLAnchorElement].some(ctr => node instanceof ctr)
    },
    isTextNode (node) {
      return node instanceof Text
    },
    treeWalkWide (childNodes, includes, excludes, fn, deep = false) {
      while (childNodes.length !== 0) {
        const nextChildNode = childNodes.shift()
        if (!excludes.some(exclude => nextChildNode instanceof exclude) && nextChildNode.hasChildNodes() && deep) {
          childNodes.push(...nextChildNode.childNodes)
        } else if (includes.some(include => nextChildNode instanceof include)) {
          fn(nextChildNode)
        }
      }
    },
    textToAnchor (node) {
      if (!node) return
      const matchState = node.textContent.match(expUrl)
      const selection = window.getSelection()
      const range = document.createRange()
      if ((matchState || []).length > 0) {
        const linkText = matchState[0]
        const linkUrl = linkText.indexOf('//') === -1 ? `https://${linkText}` : linkText
        const anchorNode = this.createNode('a', linkText, [], {
          'data-href': linkUrl,
          style: this.linkStyle,
          target: '_blank',
          contenteditable: false
        })
        
        range.setStart(node, node.textContent.indexOf(linkText))
        range.insertNode(anchorNode)
        // if(anchorNode.previousSibling instanceof Text && !anchorNode.previousSibling.textContent){
        //   anchorNode.parentNode.insertBefore(document.createTextNode(" "), anchorNode)
        // }
        // https://a.com https://b.com https://c.com
        let nextSiblingNode = null
        nextSiblingNode = anchorNode.nextSibling
        range.setStart(nextSiblingNode, 0)
        range.setEnd(nextSiblingNode, linkText.length)
        range.deleteContents()

        anchorNode.insertAdjacentHTML('beforebegin', '&#8203;')
        anchorNode.insertAdjacentHTML('afterend', '&#8203;')

        // anchorNode.outerHTML = '&#8203;' + anchorNode.outerHTML + '&#8203;'
        if (this.isIE) {
          this.normalizeLine(anchorNode.parentNode.firstChild)
          nextSiblingNode = anchorNode.nextSibling
        }
        range.setStart(nextSiblingNode, 0)
        selection.removeAllRanges()
        selection.addRange(range)
        this.textToAnchor(nextSiblingNode)
      }
    },
    createNode (tagName, textContent = '', classList = [], attrs = {}) {
      const node = document.createElement(tagName)
      node.textContent = textContent
      classList.forEach(className => node.classList.add(className))
      for (const attr in attrs) {
        node.setAttribute(attr, attrs[attr])
      }
      return node
    },
    insertHTML (domString) {
      if (!this.editor) return
      this.editor.focus()
      document.execCommand('insertHTML', false, domString)
    },
    openMenu () {
      this.$emit('open-menu')
      const selection = window.getSelection()
      const range = document.createRange()
      range.setStart(selection.anchorNode, selection.anchorOffset)
      // this.searchedList = this.mentionMenu;
      const { top, left } = range.getBoundingClientRect()
      this.menuPos.top = `${top}px`
      this.menuPos.left = `${left}px`
      this.searchKey = ''
      this.findOption(this.searchKey)
      this.dropMenu = true
      this.saveSelection()
    },
    closeMenu () {
      if (!this.dropMenu) return
      this.dropMenu = false
      this.menuPos.top = 0
      this.menuPos.left = 0
      this.currentIndex = 0
      this.searchKey = ''
    },
    selectItem (item = null) {
      const selectedItem = item || this.searchedList[this.currentIndex]
      const mentionNode = this.createNode('span', `@${selectedItem.name}`, ['mention'], {
        style: this.mentionStyle,
        'data-id': selectedItem[this.mentionKey],
        'data-title': `@${selectedItem.name}`,
        contenteditable: false
      })
      const selection = window.getSelection()
      const range = document.createRange()
      range.setStart(this.savedSelection.startContainer, this.savedSelection.startOffset - 1)
      range.insertNode(mentionNode)
      range.setStart(this.savedSelection.startContainer, this.savedSelection.startOffset - 1)
      range.setEnd(this.savedSelection.startContainer, this.savedSelection.startOffset)
      range.deleteContents()
      if (this.searchKey.length > 0) {
        const nextSibling = mentionNode.nextSibling
        range.setStart(nextSibling, 0)
        range.setEnd(nextSibling, this.searchKey.length)
        range.deleteContents()
      }

      mentionNode.insertAdjacentHTML('beforebegin', '&#8203;')
      mentionNode.insertAdjacentHTML('afterend', '&#8203;')

      range.setStart(mentionNode.nextSibling, 0)
      range.setEnd(mentionNode.nextSibling, 0)
      selection.removeAllRanges()
      selection.addRange(range)
      selection.collapseToEnd()

      // this.normalizeLine(mentionNode)
      this.closeMenu()
    },
    moveUpItem () {
      const direction = -1
      const updateIndex = this.currentIndex + direction
      if (updateIndex < 0) {
        this.currentIndex = this.searchedList.length - 1
        this.$refs.menu.scrollTop = this.$refs.menu.scrollHeight - this.maxHeight
      } else {
        this.currentIndex = updateIndex
        if (this.selectPosition + this.optionHeight <= this.$refs.menu.scrollTop) {
          this.$refs.menu.scrollTop -= this.optionHeight
        }
      }
    },
    moveDownItem () {
      const direction = 1
      const updateIndex = this.currentIndex + direction
      if (updateIndex > this.searchedList.length - 1) {
        this.currentIndex = 0
        this.$refs.menu.scrollTop = 0
      } else {
        this.currentIndex = updateIndex
        if (this.selectPosition >= this.$refs.menu.scrollTop + (this.maxHeight - this.optionHeight)) {
          this.$refs.menu.scrollTop += this.optionHeight
        }
      }
    },
    findOption (keyword) {
      this.searchedList = this.mentionList.filter(mention => new RegExp(keyword, 'i').test(mention.name))
      if (this.mentionAll && keyword === '') {
        const allItem = {}
        allItem[this.mentionKey] = 'all'
        allItem.name = '모두'
        this.searchedList.unshift(allItem)
      }
    },
    normalizeLine (node) {
      if (!node) { return }
      if (this.isTextNode(node) && this.isTextNode(node.nextSibling)) {
        node.nodeValue += node.nextSibling.nodeValue
        node.parentNode.removeChild(node.nextSibling)
      }
      this.normalizeLine(node.nextSibling)
    },
    // detect 'ZeroWidthSpace' when paste text
    detectZeroWidthSpace(str) {
      return [].filter.call( str, function( c ) {
        return c.charCodeAt( 0 ) !== 8203;
      } );
    }
  }
}
</script>
<style lang="scss" scoped>
.text-editor-wrapper {
  width: 100%;
  height: 100%;
}
.text-editor {
  &:before {
    display: none;
  }
  /*&.default:before {*/
  /*    display: inline-block;*/
  /*    content: attr(placeholder);*/
  /*    color: #C4C4C4;*/
  /*}*/
  a {
    color: #2985DB;
  }
}
[contenteditable=true] {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 6px 10px;
  line-height: 1.5;
  outline: none;
  white-space: pre-wrap;
  word-break: break-all;
  overflow-y: auto;
  &.borderLine {
    border:1px solid #D6D6D6;
  }
  &.borderLine:focus {
    border:1px solid #2985DB;
  }
  &.autoLine {
    position: static;
  }
}
[contenteditable=false] {
  white-space: normal;
}
.save-mark {
  position: fixed;
  left: 0;
  top: 0;
  border: 10px solid #efefef;
  border-top: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  height: 28px;
  margin-left: -8px;
}
.floating-panel-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  .menu-container {
    position: relative;
    height: 1.5em;
    .drop-menu {
      max-height: 200px;
      overflow-y: auto;
      position: absolute;
      width: 150px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
      &.down {
        top: 100%;
        left: 0;
      }
      &.up {
        bottom: 2em;
        left: 0
      }
      .menu-item {
        padding: 8px 10px;
        i {
          margin-right: 5px;
        }
      }
    }
  }
  .popover-container {
    position: relative;
    .pop-over {
      margin-top: 5px;
      position: absolute;
      border: 1px solid #D6D6D6;
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
      width: 300px;
      z-index: 9999;
      &.down {
        top:100%;
        left: 0;
      }
      &.up {
        bottom: 2em;
        left: 0;
      }
      .form-field {
        margin-bottom: 5px;
        .label {
          margin-bottom: 3px;
          font-weight: 600;
        }
      }
    }
    .popover-btn-wrap {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
.context-menu {
  outline: none;
  border: 1px solid #dbdbdb;

  .context-group {
    border-bottom: 1px solid #efefef;
    &:last-child {
      border: 0;
    }
  }

  .context-item {
    color: #676767;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #eff4fc;
    }
    &.select {
      background-color: #EFEFEF;
    }
  }
}

.setting-info {
  position: absolute;
  top:100%;
  padding: 10px;
  border:1px solid #d6d6d6;
  .title {
    font-size: 1rem;
    border:0;
    margin-right: 10px;
  }
}
.editor-guide {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.2;

  .guide > div {
    padding: 5px 0;
    .key {
      font-size: 0.6em;
      display: inline-block;
      border: 1px solid #333;
      padding: 3px 5px 2px 5px;
      border-radius: 3px;
    }
  }
}
.control-wrapper {
  position: absolute;
  right: 0;
}
</style>
