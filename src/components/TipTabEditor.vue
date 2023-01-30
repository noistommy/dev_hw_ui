<template>
    <div>
        <editor-menu-bar :editor="editor" v-slot="{ commands }">
            <div class="menubar">
                <button class="menubar__button" @click="commands.mention({ id: 1, label: '사용자1' })">
                    <icon name="mention" />
                    <span>Insert Mention</span>
                </button>
            </div>
        </editor-menu-bar>
        <div class="editor" :class="{open: isActive}" @click="activeEditor">

            <editor-content class="editor__content" :editor="editor" />
        </div>

        <div class="suggestion-list" v-show="showSuggestions" ref="suggestions">
            <template v-if="hasResults">
                <div
                        v-for="(user, index) in filteredUsers"
                        :key="user.id"
                        class="suggestion-list__item"
                        :class="{ 'is-selected': navigatedUserIndex === index }"
                        @click="selectUser(user)"
                >
                    {{ user.name }}
                </div>
            </template>
            <div v-else class="suggestion-list__item is-empty">
                No users found
            </div>
        </div>

    </div>
</template>

<script>
    import Fuse from 'fuse.js';
    import tippy, {sticky} from 'tippy.js';
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
    import {
        HardBreak,
        Heading,
        Mention,
        Code,
        Bold,
        Italic,
    } from 'tiptap-extensions'

    export default {
        components: {
            EditorContent,EditorMenuBar
        },
        data() {
            return {
                editor: new Editor({
                    extensions: [
                        new HardBreak(),
                        new Heading({ levels: [1, 2, 3] }),
                        new Mention({
                            // a list of all suggested items
                            items: async () => {
                                await new Promise(resolve => {
                                    setTimeout(resolve, 500)
                                })
                                return [
                                    { id: 1, name: '사용자1' },
                                    { id: 2, name: '사용자2' },
                                    { id: 3, name: '사용자3' },
                                    { id: 4, name: '사용자4' },
                                    { id: 5, name: '사용자5' },
                                    { id: 6, name: '사용자6' },
                                    { id: 7, name: '사용자7' },
                                    { id: 8, name: '사용자8' },
                                ]
                            },
                            // is called when a suggestion starts
                            onEnter: ({
                                          items, query, range, command, virtualNode,
                                      }) => {
                                this.query = query
                                this.filteredUsers = items
                                this.suggestionRange = range
                                this.renderPopup(virtualNode)
                                // we save the command for inserting a selected mention
                                // this allows us to call it inside of our custom popup
                                // via keyboard navigation and on click
                                this.insertMention = command
                            },
                            // is called when a suggestion has changed
                            onChange: ({
                                           items, query, range, virtualNode,
                                       }) => {
                                this.query = query
                                this.filteredUsers = items
                                this.suggestionRange = range
                                this.navigatedUserIndex = 0
                                this.renderPopup(virtualNode)
                            },
                            // is called when a suggestion is cancelled
                            onExit: () => {
                                // reset all saved values
                                this.query = null
                                this.filteredUsers = []
                                this.suggestionRange = null
                                this.navigatedUserIndex = 0
                                this.destroyPopup()
                            },
                            // is called on every keyDown event while a suggestion is active
                            onKeyDown: ({ event }) => {
                                if (event.key === 'ArrowUp') {
                                    this.upHandler()
                                    return true
                                }
                                if (event.key === 'ArrowDown') {
                                    this.downHandler()
                                    return true
                                }
                                if (event.key === 'Enter') {
                                    this.enterHandler()
                                    return true
                                }
                                return false
                            },
                            // is called when a suggestion has changed
                            // this function is optional because there is basic filtering built-in
                            // you can overwrite it if you prefer your own filtering
                            // in this example we use fuse.js with support for fuzzy search
                            onFilter: async (items, query) => {
                                if (!query) {
                                    return items
                                }
                                await new Promise(resolve => {
                                    setTimeout(resolve, 500)
                                })
                                const fuse = new Fuse(items, {
                                    threshold: 0.2,
                                    keys: ['name'],
                                })
                                return fuse.search(query).map(item => item.item)
                            },
                        }),
                        new Code(),
                        new Bold(),
                        new Italic(),
                    ],
                    content: `<h1>TIPTAB TEST</h1>`,
                }),
                query: null,
                suggestionRange: null,
                filteredUsers: [],
                navigatedUserIndex: 0,
                insertMention: () => {},
                isActive: false
            }
        },
        computed: {
            hasResults() {
                return this.filteredUsers.length
            },
            showSuggestions() {
                return this.query || this.hasResults
            },
        },
        mounted() {
        },
        beforeDestroy() {
            this.editor.destroy()
        },
        methods: {
            activeEditor () {
                this.isActive = true;
            },
            upHandler() {
                this.navigatedUserIndex = ((this.navigatedUserIndex + this.filteredUsers.length) - 1) % this.filteredUsers.length
            },
            // navigate to the next item
            // if it's the last item, navigate to the first one
            downHandler() {
                this.navigatedUserIndex = (this.navigatedUserIndex + 1) % this.filteredUsers.length
            },
            enterHandler() {
                const user = this.filteredUsers[this.navigatedUserIndex]
                if (user) {
                    this.selectUser(user)
                }
            },
            // we have to replace our suggestion text with a mention
            // so it's important to pass also the position of your suggestion text
            selectUser(user) {
                this.insertMention({
                    range: this.suggestionRange,
                    attrs: {
                        id: user.id,
                        label: user.name,
                    },
                })
                this.editor.focus()
            },
            // renders a popup with suggestions
            // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
            renderPopup(node) {
                if (this.popup) {
                    return
                }
                // ref: https://atomiks.github.io/tippyjs/v6/all-props/
                this.popup = tippy('.page', {
                    getReferenceClientRect: node.getBoundingClientRect,
                    appendTo: () => document.body,
                    interactive: true,
                    sticky: true, // make sure position of tippy is updated when content changes
                    plugins: [sticky],
                    content: this.$refs.suggestions,
                    trigger: 'mouseenter', // manual
                    showOnCreate: true,
                    theme: 'dark',
                    placement: 'top-start',
                    inertia: true,
                    duration: [400, 200],
                })
            },
            destroyPopup() {
                if (this.popup) {
                    this.popup[0].destroy()
                    this.popup = null
                }
            },
        }
    }
</script>

<style lang="scss">
    .editor {
        width: 800px;
        height: 34px;
        border: 1px solid #d6d6d6;
        color: #333;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        overflow: hidden;
        transform-origin: top;
        overflow-y: auto;
        .editor__content {
            > [contenteditable="true"] {
                width: 100%;
                height: 100%;
                padding: 6px 10px;
                outline: none;
            }

        }
        &.open {
            height: 165px;
            min-height: 165px;
            border: 1px solid #2985DB;
        }
    }

    .mention {
        color:#2985DB;
        font-weight: bold;
        border-radius: 5px;
        padding: 0.2rem 0.5rem;
        white-space: nowrap;
    }
    .mention-suggestion {
        //color: rgba($color-black, 0.6);
    }
    .suggestion-list {
        max-height: 200px;
        overflow-y: auto;
        width: 150px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
        &__no-results {
            padding: 0.2rem 0.5rem;
        }
        &__item {
            padding: 8px 10px;
            cursor: pointer;
            &:last-child {
                margin-bottom: 0;
            }
            &.is-selected,
            &:hover {
                background-color: #EFEFEF;
            }
            &.is-empty {
                opacity: 0.5;
            }
        }
    }
    .tippy-box[data-theme~=dark] {
        background-color: #909090;
        padding: 0;
        font-size: 1rem;
        text-align: inherit;
        color: #ffffff;
        border-radius: 5px;
    }

</style>