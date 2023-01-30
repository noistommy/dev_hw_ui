<template>
    <div class="text-editor-wrapper">
<!--        <div class="control-wrapper">-->
<!--            <div class="hw-button icon" @click="undo"><i class="gis gi-short-arrow-left"></i></div>-->
<!--            <div class="hw-button icon" @click="redo"><i class="gis gi-short-arrow-right"></i></div>-->
<!--        </div>-->
        <div class="editor-guide">
            <div class="guide">
                <div> 즉시 등록: control + enter // command + return </div>
                <div> 줄바꿈 : enter // return </div>
                <div> 멘션 : (공백)@ 입력 </div>
            </div>
        </div>
        <div class="floating-panel-wrapper">
            <div class="menu-container" :style="menuPos">
                <div class="drop-menu context-menu" v-if="dropMenu" ref="menu" :tabindex="0" :class="popDirection"
                     @keypress.stop.enter.prevent="updateSelectedEnter"
                     @keydown.stop.up.prevent="moveUpItem"
                     @keydown.stop.down="moveDownItem">
                    <div class="menu-item context-menu" v-if="setSearchedList.length === 0">대상 없음</div>
                    <div class="menu-item context-item ellipsis" v-for="(item, index) in setSearchedList" :key="item[mentionKey]"
                         :class="{select:(index) === currentIndex}"
                         @mouseenter="currentIndex = index"
                         @click="setMenuItem(item)">
                        <span><i class="gi" :class="`gi-mention`"></i></span>
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
        <div :tabindex="0" ref="editor" class="text-editor" :class="[{default: isEmpty},{borderLine: borderLine}]"
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
    import axios from 'axios';
    // const expHtml = /<[^>]*>/g;
    // const expUrl = /((?:http(s)?:\/\/)?[\w.-]+((?:\.[\w.]+)[/a-z?].+){2}|(?:http(s)?:\/\/)[\w.-]+((?:\.[\w.-]+)[/a-z]+))(\s|^)/gi;
    const expUrl = /((?:http(s)?:\/\/)?[\w.-]+((?:\.[\w.-]+)[/a-z0-9:?=&%-]+){2}|(?:http(s)?:\/\/)[\w.-]+((?:\.[\w.-]+)[/a-z0-9?=&%-]+))/gi;
    const observer = new MutationObserver((mutation) => {
        console.log(mutation)
        mutation.forEach(node => {
            // if(node.addedNodes)
            console.log(node)
        })

    });
    export default {
        name: "hw-text-editor",
        data() {
            return {
                insertedHtml: "",
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
                mentionMenu: this.mentionList,
                mentionStyle: "color:#2985db; font-weight:600; padding: 0 3px;",
                linkStyle: "color:#2985db; text-decoration: underline; padding: 0 3px; display: inline",
                codeString: '',
                currentIndex: 0,
                maxHeight: 200,
                optionHeight: 45,
                insertPos: {
                    start: 0,
                    end:0
                },
                matchLink: {},
                currentLink: {
                    title: '',
                    url: ''
                }
            };
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
            isActive: Boolean,
            popDirection: {
                type: String,
                default: 'down'
            }
        },
        computed: {
            isEmpty() {
                return this.insertedHtml === ''
            },
            selectPosition() {
                return this.currentIndex * this.optionHeight
            },
            getSelectPos() {
                if(this.selectPos === null) return;
                let pos = this.selectPos.getBoundingClientRect();
                let sel = {
                    top: pos.y + 'px',
                    left: pos.x + 'px'
                };
                return sel
            },
            setSearchedList() {
                let key = this.searchKey.split('@');
                let filtered = [];
                this.mentionList.forEach(el => {
                    if(el.name.match(new RegExp(key[1], "i"))) {
                        filtered.push(el);
                    }
                });

                return filtered !== [] ? filtered : this.mentionList;
            }
        },
        created() {
            this.mentionMenu = [];
            this.mentionMenu = this.mentionList;
            if(this.mentionAll) {
                let allItem = {};
                allItem[this.mentionKey] = 'all';
                allItem.name = '모두';
                this.mentionMenu.unshift(allItem)
            }
        },
        mounted() {
            this.init();
            document.body.addEventListener('mouseover', (e) => {this.openPopover(e)});
            document.body.removeEventListener('mouseover', (e) => {this.openPopover(e)});
            // document.body.addEventListener('mouseout', (e) => {
            //     console.log(e,this.popover);
            //     if(this.popover) { this.popover = false;}
            // })


            // let editor = document.getElementById('TextEditor');
            let editor = this.$refs.editor;
            editor.addEventListener('DOMNodeInserted', this.nextLineSelection, false)
            // editor.addEventListener('DOMNodeRemoved', (e) => {
            //     console.log('REMOVE:', e.target)
            // }, false)

            if(this.contentData !== null) {
                this.$refs.editor.innerHTML = this.contentData;
            } else {
                this.init()
            }

        },
        methods: {
            init() {
                // let initNode = document.createTextNode(' ');
                // this.$refs.editor.appendChild(initNode)
                this.$refs.editor.innerHTML = ' '
                this.$refs.editor.focus();
            },
            onFocus() {
                this.$refs.editor.focus();
                this.popover = false;
                this.setSelectPosition();
                this.setSelectRange();
            },
            onBlur(e) {
                this.checkLinkUrl();
                this.insertedHtml = e.target.innerHTML;
                this.$emit("update", this.insertedHtml);
            },
            onInput(e) {
                this.popover = false;
                if(this.insertedHtml === '' && e.target.innerHTML !== '') {
                    this.$emit('empty', false)
                }
                if(this.insertedHtml !== '' && e.target.innerHTML === '') {
                    this.$emit('empty', true)
                }
                this.insertedHtml = e.target.innerHTML;
            },
            onKeydown(e) {
                // console.log(e)
                // '@' 키 클릭 시
                if(e.keyCode === 50 && e.shiftKey) {
                    this.searchKey = '';

                    console.log("TARGET",window.getSelection())
                    if(window.getSelection().anchorNode.length > 0 || this.$refs.editor.innerHTML === '') {

                        setTimeout(() => {
                            this.setSelectPosition();
                            this.dropMenu = true;
                        }, 250)

                        this.saveSelection();
                    }

                }
                // Enter key (only)
                if(e.keyCode === 13 && !e.shiftKey) {
                    this.checkLinkUrl()
                }
                if(e.keyCode === 13 && e.shiftKey) {
                    this.onBlur(e)
                    this.$emit('submit', this.$refs.editor.innerHTML)
                    e.preventDefault()
                }
                // empty char input
                if(e.keyCode === 32) {
                    this.checkLinkUrl()
                }
                //escape key
                if(e.keyCode === 27 || e.keyCode === 46) {
                    console.log(this.searchKey)
                    this.closeMenu();
                    this.closePopover();
                    
                }
                //backspace key
                if(e.keyCode === 8) {
                    if(this.searchKey === '@') {
                        this.closeMenu();
                    }
                    // observer.observe(this.$refs.editor, { attributes: true, childList: true, characterData: true });
                }
                if(e.keyCode === 90 && e.metaKey) {
                    console.log('undo')

                    observer.observe(this.$refs.editor, { attributes: true, childList: true, characterData: true });
                    e.preventDefault()
                }
            },
            onKeyup() {
                let selection = window.getSelection();
                if(this.dropMenu) {
                    // this.setSelectPosition();
                    let node = selection.getRangeAt(0).startContainer;
                    let range = document.createRange();
                    range.collapse(false)
                    range.setStart(node, this.selectPos.startOffset);
                    range.setEnd(node, selection.anchorOffset);
                    this.searchKey = range.toString();
                    this.findOption(this.searchKey)
                }

            },
            onPaste(e) {
                e.preventDefault();
                let paste = e.clipboardData.getData('Text');
                document.execCommand('insertHTML',false, paste);
                const links = window.getSelection().anchorNode.textContent.match(expUrl);
                if(Array.isArray(links)){
                    let iterCount = links.length;
                    let nextNode = window.getSelection().anchorNode;
                    while(iterCount > 0){
                        nextNode = this.insertLinkNode(nextNode);
                        iterCount--;
                    }
                }
            },
            checkLinkUrl() {
                let editor_child = this.$refs.editor.childNodes;
                editor_child.forEach((node) => {
                    if (node.textContent.match(expUrl) && node.nodeType > 1) {
                        this.insertLinkNode(node)
                    }
                })
            },
            setMenuItem(target) {
                this.insertTextAtCaret('mention', target);
                this.closeMenu();
            },
            closeMenu() {
                setTimeout(() => {
                    this.dropMenu = false;
                    this.menuPos.top = 0;
                    this.menuPos.left = 0;
                },150)

                this.currentIndex = 0;
                this.searchKey = ''



            },
            openPopover (e) {
                if(e.target.className.indexOf('edit-link') > -1) {
                    this.setSelectRange(e);
                    window.setTimeout(() => {
                        this.popover = true;
                    },300)

                }
            },
            closePopover() {
                this.popover = false;
                this.currentLink = {};
            },
            setSelectPosition() {
                let pos = window.getSelection().getRangeAt(0).getBoundingClientRect();
                this.menuPos.top = pos.y + "px";
                this.menuPos.left = pos.x + "px";
            },
            setSelectRange(evt) {
                let pos = {};
                if(evt) {
                    pos = evt.target.getBoundingClientRect();
                    this.currentLink.target = evt.target;
                    this.currentLink.title = evt.target.innerText;
                    this.currentLink.url = evt.target.href
                } else {
                    if(window.getSelection().isCollapsed) return;
                    pos = window.getSelection().getRangeAt(0).getBoundingClientRect();
                }
                this.popoverPos = {
                    top: pos.y + 'px',
                    left: pos.x + 'px',
                    // height: pos.height +'px'
                };
            },
            saveSelection() {
                this.insertPos.start = this.insertPos.end;
                if (window.getSelection) {
                    let selection = window.getSelection();
                    if (selection.getRangeAt && selection.rangeCount) {
                        this.selectPos = selection.getRangeAt(0);
                        this.selectNode = selection.anchorNode;
                        this.insertPos.end = this.selectPos.endOffset;
                    }
                } else if (document.selection && document.selection.createRange) {
                    this.selectPos = document.selection.createRange();
                }
            },
            nextLineSelection(e) {
                let newNode = e.target;
                let sel = window.getSelection();
                let range = document.createRange();
                let tagName = newNode.tagName ? newNode.tagName.toLowerCase() : newNode.tagName;
                let tagData = newNode.textContent.trim();

                let nlNode = document.createTextNode('\n');
                let tNode = document.createTextNode(' ');
                if(tagName === 'div' && newNode.getAttribute('id') === null) {
                    this.$refs.editor.removeEventListener('DOMNodeInserted', this.nextLineSelection);

                    newNode.parentNode.replaceChild(tNode, newNode);
                    tNode.insertData(0, tagData);
                    tNode.parentNode.insertBefore(nlNode, tNode);
                    // tNode.textContent = tagData;

                    let placeCursor = function () {
                        // range.selectNode(tNode)
                        range.setStart(tNode, 0);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    };
                    setTimeout(placeCursor,1);
                    this.$refs.editor.addEventListener('DOMNodeInserted', this.nextLineSelection)
                } else if(tagName === 'br') {
                    newNode.parentNode.removeChild(newNode)
                }


            },
            insertTextAtCaret(type, text) {
                let insertNode = this.createMentionNode(text);
                if (window.getSelection) {
                    if(this.searchKey === '') {
                        this.searchKey = '@'
                    }
                    if (this.selectPos) {
                        let range = this.selectPos;
                        range.insertNode(insertNode);
                        let nextNode = insertNode.nextSibling;
                        range.selectNode(nextNode);
                        range.setStart(nextNode, 0);
                        range.setEnd(nextNode, this.searchKey.length);

                        range.deleteContents();


                        let selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                } else if (document.selection && document.selection.createRange) {
                    document.selection.createRange().text = insertNode;
                }

            },
            insertLinkNode(node) {
              /**
               * 1. 텍스트노드를 인자로 받아서 링크 노드를 생성하고 기존 텍스트 노드의 앞에 삽입한다.
               * 2. 기존 텍스트 노드 만큼 레인지를 재조정한다.
               * 3. 재조정된 레인지 범위에 해당하는 요소를 삭제한다.
               * 4. 결과적으로 링크 노드만 남고 텍스트 노드는 사라진다.
               * 5. 링크 텍스트를 삭제한 노드(trashNode)를 반환한다.
               */
              if(!node) return
              const nodeText = node.textContent;
              const matchState = nodeText.match(expUrl);
              if(matchState !== null) {
                const linkURL = matchState[0];
                const linkNode = this.createLinkNode(linkURL);
                let range = new Range();
                range.setStart(node, expUrl.exec(nodeText).index);
                range.insertNode(linkNode);
                const trashNode = linkNode.nextSibling;
                range.selectNode(trashNode);
                range.setStart(trashNode, 0);
                range.setEnd(trashNode, linkURL.length);
                range.deleteContents();
                return trashNode;
              }
            },
            createMentionNode(value) {
                let node = document.createElement('span');
                node.setAttribute('data-id', value[this.mentionKey]);
                node.setAttribute('data-title', value.name);
                node.setAttribute('contenteditable', false);
                node.setAttribute('style', this.mentionStyle);
                node.classList.add('mention');
                node.innerText = `@${value.name}`;
                return node;

            },
            createLinkNode(text) {
                let node = document.createElement('a');
                let linkText='';
                let link = '';
                if(text.indexOf('//')>-1) {
                    linkText = link = text
                } else {
                    linkText = text;
                    link = `http://${text}`
                }
                node.setAttribute('style', this.linkStyle)
                node.setAttribute('href', link);
                node.setAttribute('target', '_blank');
                node.classList.add('hyper-link', 'edit-link');
                node.innerText = linkText;
                return node;

            },
            checkLink(link) {
                axios.get(link).then(response => {
                    console.log(response.data)
                }).catch(error => {
                    console.log(error.response.data)
                })
            },
            updateSelectedEnter(e) {
                if(!this.dropMenu) return;
                e.preventDefault();
                let selectedItem = this.setSearchedList[this.currentIndex]
                this.setMenuItem(selectedItem)
            },
            moveUpItem (e) {
                if(!this.dropMenu) return;
                e.preventDefault();
                let direction = -1;
                let updateIndex = this.currentIndex + direction;
                if(updateIndex < 0) {
                    this.currentIndex = this.mentionMenu.length - 1;
                    this.$refs.menu.scrollTop = this.$refs.menu.scrollHeight - this.maxHeight;
                } else {
                    this.currentIndex = updateIndex;
                    console.log(this.currentIndex);
                    if(this.selectPosition + this.optionHeight <= this.$refs.menu.scrollTop) {
                        this.$refs.menu.scrollTop -= this.optionHeight
                    }
                }
            },
            moveDownItem (e) {
                if(!this.dropMenu) return;
                e.preventDefault();
                // this.$refs.menu.focus();
                let direction = 1;
                let updateIndex = this.currentIndex + direction;

                if(updateIndex > this.mentionMenu.length - 1) {
                    this.currentIndex = 0;
                    this.$refs.menu.scrollTop = 0
                } else {
                    this.currentIndex = updateIndex;
                    console.log(this.currentIndex);
                    if(this.selectPosition >= this.$refs.menu.scrollTop + (this.maxHeight - this.optionHeight)) {
                        this.$refs.menu.scrollTop += this.optionHeight
                    }
                }
            },
            findOption (keyword) {
                let key = keyword.split('@');
                let filtered = [];
                this.mentionList.forEach(el => {
                    if(el.name.match(new RegExp(key[1], "i"))) {
                        filtered.push(el);
                    }
                });
                this.searchedList = filtered !== [] ? filtered : this.mentionMenu;
            },
            editLink() {
                let target = this.currentLink.target;
                target.href = this.currentLink.url;
                target.innerText = this.currentLink.title;
                this.closePopover();
            },
            undo() {
                document.execCommand('undo', false, null)
            },
            redo() {
                document.execCommand('redo', false, null)
            }
        }
    };
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
        &.default:before {
            display: inline-block;
            content: attr(placeholder);
            color: #C4C4C4;
        }
    }
    [contenteditable=true] {
        width: 100%;
        height: 100%;
        padding: 6px 10px;
        outline: none;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-y: auto;
        &.borderLine {
            border:1px solid #D6D6D6;
        }
        &.borderLine:focus {
            border:1px solid #2985DB;
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

