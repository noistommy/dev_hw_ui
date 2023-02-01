<template>
  <div class="text-editor-wrapper">
    <!--        <div class="control-wrapper">-->
    <!--            <div class="hw-button icon" @click="undo"><i class="fa fa-chevron-left"></i></div>-->
    <!--            <div class="hw-button icon" @click="redo"><i class="fa fa-chevron-right"></i></div>-->
    <!--        </div>-->
    <div class="floating-panel-wrapper">
      <div class="menu-container" :style="menuPos">
        <div class="drop-menu context-menu" v-if="dropMenu" ref="menu" :tabindex="0" :class="popDirection"
             @keypress.stop.enter.prevent="updateSelectedEnter"
             @keydown.stop.up.prevent="moveUpItem"
             @keydown.stop.down="moveDownItem">
          <div class="menu-item context-menu" v-if="searchedList.length === 0">대상 없음</div>
          <div class="menu-item context-item ellipsis" v-for="(item, index) in searchedList" :key="item[mentionKey]"
               :class="{select:(index) === currentIndex}"
               @mouseenter="currentIndex = index"
               @click="setMenuItem(item)">
            <span><i class="fa" :class="`fa-at`"></i></span>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="popover-container" :style="popoverPos">
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
      </div>
    </div>
    <div :tabindex="0" ref="editor" id="TextEditor" class="text-editor" :class="[{default: isEmpty},{borderLine: borderLine},{autoLine: !isExtend}]"
         contenteditable="true"
         spellcheck="false"
         :placeholder="placeHolder"
         @click="onFocus"
         @blur="onBlur"
         @input="onInput"
         @keydown="onKeydown"
         @keyup="onKeyup"
         @paste="onPaste"
         @keypress.stop.enter="updateSelectedEnter"
         @keydown.stop.up="moveUpItem"
         @keydown.stop.down="moveDownItem"
    ></div>
  </div>
</template>

<script>
const isIE = () => {
  return /(msie|trident)/gi.test(navigator.userAgent)
}
// const expHtml = /<[^>]*>/g;
// const expUrl = /((?:http(s)?:\/\/)?[\w.-]+((?:\.[\w.]+)[/a-z?].+){2}|(?:http(s)?:\/\/)[\w.-]+((?:\.[\w.-]+)[/a-z]+))(\s|^)/gi;
const expUrl = /((?:http(s)?:\/\/)?[\w.-]+((?:\.[\w.-]+)[/a-z0-9:?=&%#-._@]+){2}|(?:http(s)?:\/\/)[\w.-]+((?:\.[\w.-]+)[/a-z0-9?=&%#-._@]+))/gi
export default {
  name: 'hw-text-editor2',
  data () {
    return {
      insertedHtml: '',
      menuPos: {
        top: 0,
        left: 0
      },
      popover: false,
      popoverPos: {
        top: 0,
        left: 0
      },
      searchKey: '',
      searchedList: [],
      dropMenu: false,
      selectPos: null,
      selectNode: null,
      mentionMenu: [],
      mentionStyle: 'color:#2985db; font-weight:600; padding: 0 3px;',
      linkStyle: 'color:#2985db; text-decoration: underline; padding: 0 3px; display: inline',
      codeString: '',
      currentIndex: 0,
      maxHeight: 200,
      optionHeight: 45,
      insertPos: {
        start: 0,
        end: 0
      },
      matchLink: {},
      currentLink: {
        title: '',
        url: ''
      },
      allItem: {}
    }
  },
  props: {
    contentData: {
      type: String,
      default: null
    },
    placeHolder: String,
    mentionList: Array,
    borderLine: Boolean,
    mentionAll: {
      type: Boolean,
      default: true
    },
    mentionKey: String,
    isExtend: Boolean,
    isActive: Boolean,
    popDirection: {
      type: String,
      default: 'down'
    }
  },
  computed: {
    isEmpty () {
      return this.insertedHtml === ''
    },
    selectPosition () {
      return this.currentIndex * this.optionHeight
    }
    // setSearchedList() {
    // let key = this.searchKey.split('@');
    // let filtered = [];
    // this.mentionList.forEach(el => {
    //     if(el.name.match(new RegExp(key[1], "i"))) {
    //         filtered.push(el);
    //     }
    // });
    //
    // return filtered !== [] ? filtered : this.mentionList;
    // }
  },
  created () {
    this.mentionMenu = this.mentionList
    if (this.mentionAll) {
      this.allItem[this.mentionKey] = 'all'
      this.allItem.name = '모두'
      // let allItem = {};
      // allItem[this.mentionKey] = 'all';
      // allItem.name = '모두';
      this.mentionMenu.unshift(this.allItem)
    }
    this.searchedList = this.mentionMenu
    console.log('CurrentAgent:', isIE())
  },
  mounted () {
    this.$refs.editor.addEventListener('DOMNodeInserted', this.nextLineSelection, false)
    if (this.contentData !== null) {
      this.$refs.editor.innerHTML = this.contentData
    } else {
      this.init()
    }
  },
  methods: {
    init () {
      console.log('init')
      this.$refs.editor.focus()
    },
    onFocus () {
      this.$refs.editor.focus()
    },
    onBlur (e) {
      this.checkLinkUrl()
      // this.insertedHtml = this.convertToNode();
      if (isIE()) {
        this.insertedHtml = this.convertToNode()
      } else {
        this.insertedHtml = e.target.innerHTML
        // this.insertedHtml = this.convertToNode();
      }
      // console.log(e)
      this.$emit('update', this.insertedHtml)
    },
    onInput (e) {
      const empty = e.target.innerHTML.trim().length === 0
      this.$emit('empty', empty)
      if (empty) {
        e.target.innerHTML = ''
      }
      this.insertedHtml = e.target.innerHTML
    },
    onKeydown (e) {
      // '@' 키 클릭 시
      if (e.keyCode === 50 && e.shiftKey) {
        this.saveSelection()
        this.searchKey = ''
        // if(window.getSelection().anchorNode.length > 0 || this.$refs.editor.innerHTML === '') {
        if (window.getSelection()) {
          setTimeout(() => {
            this.setSelectPosition()
            this.openMention()
          }, 250)
        }
      }
      // Enter key (only)
      if ((e.keyCode === 13 && !e.shiftKey) || e.keyCode === 32) {
        let hasLinkUrl = false
        if(this.$refs.editor.hasChildNodes()){
          const initialChildNodes = new Array();
          this.$refs.editor.childNodes.forEach(node => {
            initialChildNodes.push(node)
          })
          hasLinkUrl = this.checkLinkUrl(initialChildNodes);
        }
        if (hasLinkUrl) {
          e.preventDefault()
        }
      }
      if (e.keyCode === 13 && e.shiftKey) {
        this.$emit('submit', this.$refs.editor.innerHTML)
        e.preventDefault()
      }
      // empty char input
      // if (e.keyCode === 32) {
      //   this.checkLinkUrl()
      // }
      // escape key
      if (e.keyCode === 27 || e.keyCode === 46) {
        console.log(this.searchKey)
        this.closeMenu()
        this.closePopover()
      }
      // backspace key
      // if(e.keyCode === 8) {
      //     console.log(e)
      //     if(this.searchKey === '@') {
      //         this.closeMenu();
      //     }
      //     // console.log(window.getSelection())
      //
      // }
      if (e.keyCode === 90 && e.metaKey) {
        console.log('undo')
        e.preventDefault()
      }
    },
    onKeyup (e) {
      const selection = window.getSelection()
      if (this.dropMenu) {
        console.log(e)
        if (e.keyCode === 38 || e.keyCode === 40) return
        const node = this.selectPos.startContainer
        this.searchKey = node.textContent.slice(this.selectPos.startOffset, selection.anchorOffset)
        console.log('searchKey:', node, this.searchKey)
        if (this.searchKey === '') {
          this.closeMenu()
        } else {
          this.findOption(this.searchKey)
        }
      }
      const empty = e.target.innerHTML.trim().length === 0
      if (empty) {
        e.target.innerHTML = ''
      }
      this.insertedHtml = e.target.innerHTML
      this.$emit('empty', empty)
    },
    onPaste (e) {
      if (isIE()) return
      e.preventDefault()
      const paste = e.clipboardData.getData('Text')
      document.execCommand('insertHTML', false, paste)
      const anchorNode = window.getSelection().anchorNode
      const links = window.getSelection().anchorNode.textContent.match(expUrl)
      if (Array.isArray(links)) {
        let iterCount = links.length
        let nextNode = anchorNode
        while (iterCount > 0) {
          nextNode = this.insertLinkNode(nextNode)
          iterCount--
        }
      }
    },
    checkLinkUrl (childNodes = []) {
      let hasLink = false
      while(childNodes.length !== 0){
        const nextNode = childNodes.shift();
        if(nextNode.hasChildNodes()){
          nextNode.childNodes.forEach(node => {
            if(!(node instanceof HTMLAnchorElement)){
              childNodes.push(node)
            }
          })
        } else {
          if(nextNode instanceof Text && nextNode.textContent.match(expUrl)){
            this.insertLinkNode(nextNode)
            hasLink = true
          }
        }
      }
      return hasLink
    },
    convertToNode () {
      const childNodes = this.$refs.editor.childNodes
      const updateText = []
      childNodes.forEach((node) => {
        console.log('NODE:', node, node)
        let pNode = ''
        if (node.nodeType > 1) {
          pNode = node.textContent
        } else {
          pNode = node.outerHTML.replace(/<\/?[p|div|br^>]*>/gi, '') + '\n'
        }
        updateText.push(pNode)
        console.log(pNode)
      })
      return updateText.join('')
    },
    setMenuItem (target) {
      this.insertTextAtCaret('mention', target)
      this.closeMenu()
    },
    closeMenu () {
      console.log('close')
      if (!this.dropMenu) return
      this.dropMenu = false
      this.menuPos.top = 0
      this.menuPos.left = 0
      this.currentIndex = 0
      this.searchKey = ''
    },
    openMention () {
      this.searchedList = this.mentionMenu
      this.dropMenu = true
    },
    openPopover (linkNode) {
      this.setSelectRange(linkNode)
      this.popover = true
    },
    closePopover () {
      this.popover = false
      this.currentLink = {}
    },
    setSelectPosition () {
      const selection = window.getSelection()
      const range = document.createRange()
      range.setStart(selection.anchorNode, selection.anchorOffset)
      const pos = range.getBoundingClientRect()
      this.menuPos.top = pos.top + 'px'
      this.menuPos.left = pos.left + 'px'
      console.log(this.menuPos)
    },
    setSelectRange (linkNode) {
      const pos = linkNode.getBoundingClientRect()
      this.currentLink.target = linkNode
      this.currentLink.title = linkNode.innerText
      this.currentLink.url = linkNode.href
      this.popoverPos = {
        top: pos.top + 'px',
        left: pos.left + 'px'
      }
    },
    saveSelection () {
      console.log(window.getSelection().anchorNode)
      if (window.getSelection) {
        const selection = window.getSelection()
        const range = document.createRange()
        range.setStart(selection.anchorNode, selection.anchorOffset)
        this.selectPos = range.cloneRange()
        console.log('SAVE:', selection, this.selectPos)
      }
    },
    nextLineSelection (e) {
      console.log(e)
      // const newNode = e.target
      // const sel = window.getSelection()
      // const range = document.createRange()

      // if (newNode instanceof HTMLDivElement) {
      //   this.$refs.editor.removeEventListener('DOMNodeInserted', this.nextLineSelection)
      // const nlNode = document.createTextNode('\n')

      // newNode.parentNode.insertBefore(nlNode, newNode)
      // nlNode.after(docFragment)
      // range.selectNode(nlNode)
      // console.log(docFragment)
      // sel.removeAllRanges()
      // sel.addRange(range)
      // sel.collapseToStart()
      // const placeCursor = function () {
      //   // range.selectNode(tNode)
      //   range.setStart(docFragment, 0)
      //   sel.removeAllRanges()
      //   sel.addRange(range)
      // }
      // setTimeout(placeCursor, 1)
      //   this.$refs.editor.addEventListener('DOMNodeInserted', this.nextLineSelection)
      // } else if (newNode instanceof HTMLBRElement) {
      //   newNode.parentNode.removeChild(newNode)
      // }
    },
    insertTextAtCaret (type, text) {
      const insertNode = this.createMentionNode(text)
      if (window.getSelection) {
        if (this.searchKey === '') {
          this.searchKey = '@'
        }
        if (this.selectPos) {
          const range = this.selectPos
          range.insertNode(insertNode)
          const nextNode = insertNode.nextSibling
          console.log('NEXT', insertNode.length, nextNode.length)
          range.selectNode(nextNode)

          // range.setStart(nextNode, 0);
          // range.setEnd(nextNode, this.searchKey.length);
          // range.deleteContents();

          const nextText = nextNode.textContent.replace(this.searchKey, ' ')
          const newNode = document.createTextNode(nextText)
          nextNode.parentNode.replaceChild(newNode, nextNode)

          range.setStart(newNode, 1)

          const selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
          selection.collapseToEnd()

          // setTimeout(() => {
          //
          // },150)
        }
      } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = insertNode
      }
    },
    insertLinkNode (node) {
      /**
       * 1. 텍스트노드를 인자로 받아서 링크 노드를 생성하고 기존 텍스트 노드의 앞에 삽입한다.
       * 2. 기존 텍스트 노드 만큼 레인지를 재조정한다.
       * 3. 재조정된 레인지 범위에 해당하는 요소를 삭제한다.
       * 4. 결과적으로 링크 노드만 남고 텍스트 노드는 사라진다.
       * 5. 링크 텍스트를 삭제한 노드(trashNode)를 반환한다.
       */
      if (!node) return
      const nodeText = node.textContent
      const matchState = nodeText.match(expUrl)

      if (matchState !== null) {
        const linkURL = matchState[0]
        const linkNode = this.createLinkNode(linkURL)
        const range = document.createRange()
        range.setStart(node, expUrl.exec(nodeText).index)
        range.insertNode(linkNode)
        const trashNode = linkNode.nextSibling
        range.selectNode(trashNode)

        range.setStart(trashNode, 0)
        range.setEnd(trashNode, linkURL.length)
        range.deleteContents()
        range.collapse()

        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)

        return trashNode
      }
    },
    insertLinkAtCaret (type, matched) {
      const prevNode = document.createTextNode(matched.prev)
      const insertNode = this.createLinkNode(matched.link)

      let range
      if (window.getSelection) {
        if (this.selectPos) {
          range = this.selectPos
          range.deleteContents()
          range.insertNode(insertNode)
          range.insertNode(prevNode)
          console.log(range)
        }
      } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = insertNode
      }
      this.lastSelection()
    },
    createMentionNode (value) {
      const node = document.createElement('span')
      node.setAttribute('data-id', value[this.mentionKey])
      node.setAttribute('data-title', value.name)
      node.setAttribute('contenteditable', false)
      node.setAttribute('style', this.mentionStyle)
      node.classList.add('mention')
      node.innerText = `@${value.name}`
      return node
    },
    createLinkNode (text) {
      const node = document.createElement('a')
      node.setAttribute('contenteditable', false);
      let linkText = ''
      let link = ''
      if (text.indexOf('//') > -1) {
        linkText = link = text
      } else {
        linkText = text
        link = `http://${text}`
      }
      // node.addEventListener('mouseover', (e) => {
      //     e.stopPropagation();
      //     this.openPopover(node);
      // });
      node.setAttribute('style', this.linkStyle)
      node.setAttribute('href', link)
      node.setAttribute('target', '_blank')
      node.classList.add('hyper-link', 'edit-link')
      node.innerText = linkText
      return node
    },
    updateSelectedEnter (e) {
      if (!this.dropMenu) return
      e.preventDefault()
      const selectedItem = this.searchedList[this.currentIndex]
      this.setMenuItem(selectedItem)
    },
    moveUpItem (e) {
      if (!this.dropMenu) return
      e.preventDefault()
      const direction = -1
      const updateIndex = this.currentIndex + direction
      if (updateIndex < 0) {
        this.currentIndex = this.mentionMenu.length - 1
        this.$refs.menu.scrollTop = this.$refs.menu.scrollHeight - this.maxHeight
      } else {
        this.currentIndex = updateIndex
        console.log(this.currentIndex)
        if (this.selectPosition + this.optionHeight <= this.$refs.menu.scrollTop) {
          this.$refs.menu.scrollTop -= this.optionHeight
        }
      }
    },
    moveDownItem (e) {
      if (!this.dropMenu) return
      e.preventDefault()
      // this.$refs.menu.focus();
      const direction = 1
      const updateIndex = this.currentIndex + direction

      if (updateIndex > this.mentionMenu.length - 1) {
        this.currentIndex = 0
        this.$refs.menu.scrollTop = 0
      } else {
        this.currentIndex = updateIndex
        console.log(this.currentIndex)
        if (this.selectPosition >= this.$refs.menu.scrollTop + (this.maxHeight - this.optionHeight)) {
          this.$refs.menu.scrollTop += this.optionHeight
        }
      }
    },
    findOption (keyword) {
      console.log(keyword)
      const key = keyword.split('@')
      const filtered = []
      this.mentionList.forEach(el => {
        if (el.name.match(new RegExp(key[1], 'i'))) {
          filtered.push(el)
        }
      })
      this.searchedList = filtered !== [] ? filtered : this.mentionMenu
    },
    editLink () {
      const target = this.currentLink.target
      target.href = this.currentLink.url
      target.innerText = this.currentLink.title
      this.closePopover()
    },
    undo () {
      document.execCommand('undo', false, null)
    },
    redo () {
      document.execCommand('redo', false, null)
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
  width: 100%;
  height: 100%;
  padding: 6px 10px;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
  &.borderLine {
    border:1px solid #D6D6D6;
  }
  &.borderLine:focus {
    border:1px solid #2985DB;
  }
  &.autoLine {
    position: static;
  }
  &.scrollable {
    position: absolute;
    top:0;
    left:0;
    overflow-y: auto;
  }
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
.mention {
  color: #2985DB;
  /*font-weight: 600;*/
  display: inline-block;
  padding: 5px 0;
}
a.hyper-link {
  &:hover {
    background-color: #F8F8F8 !important;
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