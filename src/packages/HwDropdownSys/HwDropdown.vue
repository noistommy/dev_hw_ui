<template>
    <div class="hw-dropdown" :tabindex="type === 'search' ? -1 : 0" :class="[type, {open: isOpen}, {multiple}, {fluid}, align, directPos, {compact}, {icon:icon !== undefined}, {round}, roundSize]" @click="handleClick">
<!--        dropdown open || close 표시 -->
        <span class="dropdown-icon" v-if="!input && dropdownArrow"><i :class="`gi gi-short-arrow-${isOpen?'up':'down'}-alt`"></i></span>
<!--        search type -->
        <template v-if="type === 'search'">
            <div class="dropdown-search">
                <div class="selected-item" :class="{avatar:imageKey}"
                     v-if="selectedItem !== null && selectedItem !== undefined && !multiple" @click.stop="removeSelect()">
                    <div class="profile" v-if="imageKey">
                        <img :src="selectedItem[imageKey]">
                    </div>
                    {{selectedItem[optionKey]}}
                    <i class="gi gi-cancel"></i>
                </div>
                <input type="text" class="searching" v-model="searchText"
                       @input="searchOption"
                       @keydown.enter.stop="updateSelectedEnter"
                       @keydown.stop.up.prevent="moveUpItem"
                       @keydown.stop.down.prevent="moveDownItem"
                       @compositionend="checkComposition($event,'end')"
                       @compositionstart="checkComposition($event,'start')"
                >
                <span class="type-icon" v-if="icon"><i class="gi" :class="`gi-${icon}`"></i></span>
            </div>
            <div class="default text" v-if="isEmptyText">{{placeHolder}}</div>
        </template>
<!--        filter type -->
        <template v-else-if="type === 'filter'">
            <div class="filter-search">
                <input type="text" class="searching" v-model="searchText" @input="searchFilter" ref="searchBox"
                       @keydown.enter.stop="requestSearch"
                       @keydown.stop.up.prevent="moveUpItem"
                       @keydown.stop.down.prevent="moveDownItem"
                       @compositionend="checkComposition($event,'end')"
                       @compositionstart="checkComposition($event,'start')">
                <span class="type-icon" v-if="icon"><i class="gi" :class="`gi-${icon}`"></i></span>
            </div>
            <div class="default text" v-if="isEmptyText">{{placeHolder}}</div>
        </template>
<!--        button type-->
        <template v-else-if="type === 'button' || type === 'context'">
            <div class="dropdown-link">
                <slot name="button-link">
                    <div class="hw-button info">
                        <span v-if="selectedItem">{{selectedItem.option}}</span>
                        <span v-else>{{defaultText}}</span>
                    </div>
                </slot>
            </div>
        </template>
        <template v-else>
<!--            normal type-->
            <div class="selected text ellipsis" v-if="selectedItem != null">{{selectedItem[optionKey]}}</div>
            <div class="default text" v-if="isEmptyText">{{placeHolder}}</div>
        </template>
<!--        -->
<!--        dropdown menu-->
<!--        -->
        <transition name="slide-down">
            <div class="dropdown-menu" :class="[menuClass, {onSelected:selectedList.length > 0}, `${type}-menu`]" v-if="isOpen" ref="dropMenu" tabindex="0"
                 :style="{maxHeight: `${maximumHeight}px`}"
                 @keypress.enter="updateSelectedEnter"
                 @keydown.stop.up.prevent="moveUpItem"
                 @keydown.stop.down.prevent="moveDownItem" @scroll="onScroll">
                <dropdown-item v-for="(option, index) in searchedList"
                               :select="index === updateCurrent"
                               :selected="option[selectKey]"
                               :disable="disabledList.length > 0 && option[disabledKey]"
                               :selected-option="selectOption"
                               :key="option[keyName]"
                               :data="option"
                               :option="option[optionKey]" :idx="index" :command="option.command"
                               :image="option[imageKey]" @select="updateSelected" @command="commandHandler"
                               @pointed="setPointedCurrent">
                    <div class="ellipsis">{{option[optionKey]}}</div>
                </dropdown-item>
            </div>
        </transition>
        <transition name="slide-down">
            <div class="filter-menu" v-if="isOpenFilter">
                <div class="filter-list" ref="dropMenu" tabindex="0"
                     @keypress.enter="requestSearch"
                     @keydown.stop.up.prevent="moveUpItem"
                     @keydown.stop.down.prevent="moveDownItem">
<!--                    <div class="filter-item all">전체 {{currentIndex}}</div>-->
                    <div class="filter-item" v-for="(filter, index) in filterList" :key="filter.type" :class="{select:currentIndex === index}"
                         @click.stop="requestSearch(index)" @mouseover="currentIndex=index">
                        <i :class="`gis gi-${filter.icon}`"></i>
                        <span class="filter-type">{{filter.title}}</span>
                        <span class="filter-keyword">{{searchText}}</span>
                    </div>
                </div>
            </div>
        </transition>

<!--        if use multiple select, present selected item list-->
        <template v-if="multiple">
            <slot name="selected-list">
                <div class="multi-selected-list" :class="{onList: selectedList.length > 0}">
                    <div class="btn-apply" v-if="isOpen">
                        <div class="hw-button icon circle small">
                            <i class="gis gi-cancel"></i>
                        </div>
                    </div>
                    <div class="selected-item" :class="{avatar:imageKey}" v-for="item in selectedList" :key="item.id" @click.stop="removeSelect(item)">
                        <div class="profile" v-if="imageKey">
                            <img :src="item[imageKey]">
                        </div>
                        {{item[optionKey]}}
                        <i class="gi gi-cancel"></i>
                    </div>
                </div>
            </slot>
        </template>


    </div>
</template>

<script>
    import DropdownItem from "./DropdownItem";
    export default {
        name: 'hw-dropdown',
        components: {DropdownItem},
        data () {
            return {
                selectedItem: null,
                searchText: '',
                isOpen: false,
                isOpenFilter: false,
                selectedList: [],
                searchedList: [],
                currentIndex: 0,
                maximumHeight: 0,
                composition: true,
                directPos: 'down'
            }
        },
        props: {
            defaultText: {
                type: String,
                default: '선택'
            },
            type: {
                type: String,
                default: 'selection'
            },
            selectItem: [Object, String],
            currentData: {
                type: [String, Object, Array],
                default: null
            },
            placeHolder: {
                type: String,
                default: 'Select option'
            },
            multiple: Boolean,
            fluid: {
                type: Boolean,
                default: false
            },
            compact: {
                type: Boolean,
                default: false
            },
            icon: String,
            input: {
                type:Boolean,
                default: false
            },
            align: {
                type: String,
                default:'left'
            },
            direction: {
                type: String,
                default: 'down'
            },
            filterList: Array,
            value: [Array, Object, String],
            //dropdown-item setting props
            menu: {
                type: Array,
                default: () => {
                    return []
                }
            },
            menuClass: String,
            optionKey: String,
            keyName: String,
            imageKey: String,
            selectKey: String,
            selectOption: String,
            maxHeight: {
                type: Number,
                default: 500
            },
            optionHeight: {
                type: Number,
                default: 45
            },
            displayItem: {
                type: Number,
                default: 0
            },
            dropdownArrow: {
                type: Boolean,
                default: true
            },
            itemPerPage: {
                type: Number,
                default: 50
            },
            disabledList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            disabledKey: {
                type: String,
                default: 'disabled'
            },
            round: {
                type: Boolean,
                default: false
            },
            roundSize: {
                type: String,
                default: '' // or 'small'
            }
        },
        computed: {
            isEmptyText () {
                return (!this.selectedItem && !this.searchText);
            },
            screenSize () {
                return {width: window.innerWidth, height: innerHeight}
            },
            selectPosition() {
                return this.currentIndex * this.optionHeight
            },
            updateCurrent() {
                return this.currentIndex
            }
        },
        watch: {
            isOpen(value) {
                this.$emit('visible', value);
            },
            disabledList () {
                this.disabledList.forEach((key) => {
                    this.menu.forEach((item) => {
                        if(item[this.keyName] === key) {
                            item.disabled = true;
                        }
                    })
                })
            },
            currentData() {
                this.selectedItem = this.currentData;
                this.$emit('result', this.currentData)
            }
        },
        created() {
            this.maximumHeight = this.displayItem > 0 ? this.optionHeight * this.displayItem + (this.optionHeight/2) : this.maxHeight;
            if(this.menu.length > 0) {
                this.setSelected();
                this.init();
                this.setData();
            }


        },
        mounted() {

            document.body.addEventListener('click', this.closeMenu);
            document.body.addEventListener('keyup', this.escapeMenu);

        },
        destroyed() {
            document.body.removeEventListener('click', this.closeMenu);
            document.body.removeEventListener('keyup', this.escapeMenu);
        },
        methods: {
            init() {
                this.selectedItem = null;
                this.selectedList = [];
                console.log('INIT')
                this.directPos = this.direction
            },
            setData() {
                if(this.menu.length < 1) return;
                this.disabledList.forEach((key) => {
                    this.menu.forEach((item) => {
                        if(item[this.keyName] === key) {
                            item.disabled = true;
                        }
                    })
                })
                let resultData = null;
                if(this.currentData) {
                    if(this.type === 'multiple') {
                        this.currentData.forEach(el => {
                            this.menu.forEach(item => {
                                if(item[this.keyName] === el[this.keyName]) {
                                    item[this.selectKey] = true;
                                    this.selectedList.push(item);
                                }
                            })
                        });
                        resultData = this.selectedList
                    } else {
                        this.menu.forEach(item => {
                            if(item[this.keyName] === this.currentData[this.keyName]) {
                                item[this.selectKey] = true;
                                this.selectedItem = item;
                            }
                        });
                        resultData = this.selectedItem
                    }
                    this.$emit('result', resultData)
                }

            },
            setPointedCurrent (index) {
                this.currentIndex = index;
            },
            setSelected () {
                if(this.type === 'filter') return;
                let state = false;
                this.menu.forEach(item => {
                    state = this.selectItem === item[this.keyName]
                    this.$set( item, this.selectKey, state)
                });
            },
            setMenu (value=true) {
                let state = this.isOpen;
                if(state) value = false;
                this.isOpen = value;
                if(value) {
                    this.searchedList = this.menu.slice(0, this.itemPerPage)
                }
                this.$nextTick(() => {
                    if(this.isOpen && this.type !== 'search') {
                        this.$refs.dropMenu.focus();
                    }
                })
            },
            setFilterMenu (value=true) {
                let state = this.isOpenFilter;
                if(state) value = false;
                this.isOpenFilter = value;
                if(value) {
                    this.searchedList = this.menu;
                    this.$nextTick(() => {
                        this.$refs.dropMenu.focus();
                    })
                }
                
            },
            closeMenu (e) {
                this.searchText = '';
                if(this.$el.contains(e.target)) return;
                if(this.type === 'filter') {
                    this.setFilterMenu(false);
                } else {
                    this.setMenu(false);
                }
                this.currentIndex = 0;
                this.composition = true;
            },
            escapeMenu (e) {
                if(e.keyCode !== 27) return;
                this.searchText = '';
                if(this.type === 'filter') {
                    this.setFilterMenu(false);
                } else {
                    this.setMenu(false);
                }
                this.currentIndex = 0;
                this.composition = true;
            },
            searchOption (evt) {
                if(!this.isOpen) {this.isOpen = true;}
                this.searchText = evt.target.value;
                this.findOption (this.searchText)
            },
            findOption (keyword) {
                let filtered = [];
                this.menu.forEach(el => {
                    if(el[this.optionKey].match(new RegExp(keyword, "i"))) {
                        filtered.push(el);
                    }
                });
                this.searchedList = filtered !== [] ? filtered : this.menu;
            },
            searchFilter (evt) {
                if(!this.isOpenFilter) {this.isOpenFilter = true;}
                this.searchText = evt.target.value;
                if(evt.target.value === '') {
                    this.isOpenFilter = false;
                    this.composition = true;
                }
                // this.$emit('find', evt.target.value);
            },
            setCurrent(i) {
                this.currentIndex = i
            },
            requestSearch () {
                let requestValue = this.filterList[this.currentIndex];
                requestValue.value = this.searchText;
                this.$emit('request', requestValue);
                this.searchText = '';
                this.setFilterMenu()
            },
            commandHandler(command) {
                this.setMenu(false);
                this.$emit('command', command)
            },
            updateSelected (payload) {
                if(payload.value[this.selectKey]) {
                    this.removeSelect(payload.value)
                } else {
                    if(this.multiple) {
                        payload.value[this.selectKey] = payload.isChecked;
                        this.selectedList.push(payload.value);
                        this.$emit('result', this.selectedList)
                    } else {
                        this.searchedList.forEach((el) => {
                            el[this.selectKey] = false;
                        })
                        payload.value[this.selectKey] = payload.isChecked;
                        this.selectedItem = payload.value;
                        this.$emit('result', this.selectedItem)
                        this.searchText = '';
                        this.setMenu();
                    }
                }


            },
            removeSelect(value={}) {
                if(value === null || value === undefined || value === '') return;
                if(this.multiple) {
                    this.selectedList.forEach((el, idx) => {
                        if(el[this.keyName] === value[this.keyName]) {
                            // console.log(el[this.optionKey])
                            el[this.selectKey] = false;
                            this.selectedList.splice(idx, 1);
                        }
                    });
                    this.$emit('result', this.selectedList)
                } else {
                    this.selectedItem = null;
                    this.$emit('result', this.selectedItem)
                    this.searchedList.forEach((el) => {
                        el[this.selectKey] = false;
                    })
                }
            },
            handleClick (evt) {
                if(this.input || this.type === 'filter') return;
                let state = !this.isOpen;
                this.setMenu(state);
                this.setDropdownPos(evt.target)
                this.composition = true;
                this.$emit('onClick', this.type)
            },
            setDropdownPos(el) {
                let el_pos = el.getBoundingClientRect();
                if(this.screenSize.width - (el_pos.left + el_pos.width) < 150) {
                    this.align = 'right'
                }
                if(this.screenSize.height - (el_pos.bottom) < 150) {
                    // console.log('up');
                    this.directPos = 'up'
                } else {
                    this.directPos = 'down'
                }
            },
            selectFilter(filter) {
                // console.log(filter.title, this.searchText)
                this.$emit('filter', filter.type, this.searchText);
                this.setFilterMenu(false);
                this.searchText = '';
            },
            updateSelectedEnter() {
                // console.log("Enter:",this.searchedList[this.currentIndex])
                let selectedItem = this.searchedList[this.currentIndex]
                if(selectedItem[this.selectKey]) {
                    this.removeSelect(selectedItem)
                } else {
                    if(this.multiple) {
                        selectedItem[this.selectKey] = true;
                        this.selectedList.push(selectedItem);
                        this.$emit('result', this.selectedList)
                        this.searchText = '';
                    } else {
                        this.searchedList.forEach((el) => {
                            el[this.selectKey] = false;
                        })
                        selectedItem[this.selectKey] = true;
                        this.selectedItem = selectedItem;
                        this.$emit('result', this.selectedItem)
                        this.searchText = '';
                        if(this.type === 'filter') {
                            this.setFilterMenu()
                        } else {
                            this.setMenu();
                        }
                    }
                }
            },
            moveUpItem () {
                if(!this.composition) return;
                let listLength = this.type === 'filter' ? 4 : this.searchedList.length;
                // console.log(e.key, this.searchedList.length)
                let direction = -1;
                let updateIndex = this.currentIndex + direction;

                if(updateIndex < 0) {
                    this.currentIndex = listLength - 1;
                    this.$refs.dropMenu.scrollTop = this.$refs.dropMenu.scrollHeight - this.maximumHeight
                } else {
                    this.currentIndex = updateIndex;
                    // console.log(this.currentIndex)
                    if(this.selectPosition + this.optionHeight <= this.$refs.dropMenu.scrollTop) {
                        this.$refs.dropMenu.scrollTop -= this.optionHeight
                    }}



            },
            moveDownItem () {
                if(!this.composition) return;
                let listLength = this.type === 'filter' ? 4 : this.searchedList.length;

                let direction = 1;
                let updateIndex = this.currentIndex + direction;
                if(updateIndex > listLength - 1) {
                    this.currentIndex = 0;
                    this.$refs.dropMenu.scrollTop = 0
                } else {
                    this.currentIndex = updateIndex;
                    // console.log(this.currentIndex)
                    if(this.selectPosition >= this.$refs.dropMenu.scrollTop + (this.maximumHeight - this.optionHeight)) {
                        this.$refs.dropMenu.scrollTop += this.optionHeight
                    }
                }
            },
            moveSelectItem(e) {

                const KEYS = {
                    ENTER: 13,
                    ESCAPE: 27,
                    UP_ARROW: 38,
                    DOWN_ARROW: 40,
                };
                let direction = 1;
                let updateIndex = 0;
                // let targetIndex = 0;
                let endIndex = this.searchedList.length;
                switch (e.keyCode) {
                    case KEYS.ENTER:
                        // console.log("ENTER:",this.currentIndex);
                        // targetIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 'all';

                        break;
                    case KEYS.UP_ARROW:
                        direction = -1;
                        break;
                    case KEYS.DOWN_ARROW:
                        direction = 1;
                        break;
                    default:
                        return;

                }
                updateIndex = this.currentIndex + direction;
                if(updateIndex < 0) {
                    this.currentIndex = endIndex;
                } else if(updateIndex > endIndex) {
                    this.currentIndex = 0;
                } else {
                    this.currentIndex = updateIndex
                }
                // console.log(this.currentIndex)

            },
            checkComposition (e, type) {
                // console.log(e.type, type)
                this.composition = type === 'start' ? false : true;
            },
            onScroll(e) {
                let currentLength = this.searchedList.length;
                if(currentLength == this.menu.length) return;
                if(e.target.scrollTop + this.maximumHeight > e.target.scrollHeight) {
                    this.searchedList = this.searchedList.concat(this.menu.slice(currentLength, currentLength+this.itemPerPage))
                }
            }
            // handleKeypress (evt) {
            //     const KEYS = {
            //         ENTER: 13,
            //         ESCAPE: 27,
            //         UP_ARROW: 38,
            //         DOWN_ARROW: 40,
            //     };
            //
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .hw-dropdown {
        position: relative;
        font-size: 1rem;
        cursor: pointer;
        word-wrap: break-word;
        line-height: 1em;
        white-space: normal;
        display: inline-block;
        .selected {
            width: 100%;
        }
        .dropdown-menu, .filter-menu .filter-list{
            outline: none;
            padding:0;
        }
        &:hover {
            color: #909090;
            border-color: #909090;
        }
        &.open {
            border-color: #2985DB !important;
            box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.16);
            .text {
                color: rgba(0, 0, 0, 0.16);
            }
            .dropdown-menu {
                /*display:block;*/
                opacity: 1;

            }
        }
        &.left .dropdown-menu {
            left:0;
        }
        &.right .dropdown-menu {
            right:0;
        }
        &.up .dropdown-menu {
            top:auto;
            bottom: 100%;
            border-bottom: 0;
            box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.16);
            transform-origin: center bottom;
        }
        &.down .dropdown-menu {
            top:100%;
            border-top: 0;
            box-shadow: 2px 5px 4px rgba(0, 0, 0, 0.16);
        }
        &.round {
            border-radius: 4px;
            .dropdown-menu, .filter-menu {
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
            }
            &.small {
                border-radius: 2px;
                .dropdown-menu, .filter-menu {
                    border-bottom-left-radius: 2px;
                    border-bottom-right-radius: 2px;
                }
            }
        }
        .filter-search,
        .dropdown-search {
            position: relative;
            z-index: 2;
            display: flex;
            input.searching {
                border: none;
                outline: none;
                line-height: 1rem;
                width: 100%;
                padding: 8px 12px;
                background-color: transparent;
                &::placeholder {
                    color: #C4C4C4;
                }
            }
            i {
                color: #C4C4C4;
                position: absolute;
                top: 0;
                left: 0;
                padding: 10px;
            }
            .selected-item {
                i {
                    color: #909090;
                    pointer-events: all;
                    font-size: 10px;
                    position: absolute;
                    top: 0;
                    left: auto;
                    right: 0;
                    padding: 8px;
                }
            }

        }
        .text {
            position: absolute;
            top:0;
        }
        .dropdown-menu {
            position: absolute;
            background-color: #fff;
            width: calc(100% + 2px);
            border: 1px solid #2985DB;

            margin: 0 -1px;
            max-height: 21em;
            overflow-y: auto;
            z-index:11;
            transform-origin: center top;
            &.onSelected {
                border-top: 1px solid #D6D6D6;
            }
        }
        &.button, &.context {
            box-shadow: none;
            outline: none;
            .dropdown-icon {
                display: none !important;
            }
            /*.dropdown-link ,.dropdown-link > span{*/
            /*    !*outline: none;*!*/
            /*}*/
            .dropdown-menu {
                /*min-width: max-content;*/
                margin-top: 10px;
                border-top: 1px solid #2985DB;
                min-width: 14em;
            }
            &.fluid {
                width: 100% !important;
                max-width: 100%;
            }
        }
        &.context {
            .dropdown-menu {
                border: 1px solid #D6D6D6;

            }
        }
        &.filter,
        &.search,
        &.selection {
            outline: 0;
            min-width: 14em;
            min-height: 34px;
            background: #fff;
            color: #333;
            border: 1px solid #d6d6d6;
            box-sizing: border-box;
            margin-bottom: 5px;
            &.fluid {
                width: 100% !important;
                max-width: 100%;
            }
            .text {
                padding: 10px 2em 10px 10px;
                &.default {
                    color: #C4C4C4;
                }
            }
            .dropdown-icon {
                position: absolute;
                top:0;
                right: 0;
                padding: 10px;
                font-size: 0.8em;
                color: #C4C4C4;
                z-index: 10;
                i {
                    right:0;
                }
            }

            .multi-selected-list {
                position: relative;
                top:100%;
                display: flex;
                flex-wrap: wrap;
                max-height: 150px;
                overflow-y: auto;
                &.onList {
                    padding-bottom: 12px;
                    .btn-apply {
                        display: inline-block;
                    }
                }
                .btn-apply {
                    display: none;
                    position: absolute;
                    top:0;
                    right: 0;
                    padding: 10px;
                    color: #909090;
                    /*background-color: #F2F2F2;*/
                    &:hover {
                        /*background-color: #D6D6D6;*/
                    }
                    i {
                        color: #909090;
                    }
                }
                .multi-selected-item {
                    position: relative;
                    font-size: 12px;
                    color: #333;
                    padding: 6px 2.2em 6px 10px;
                    background-color: #f4f4f4;
                    border: 1px solid #d2d2d2;
                    border-radius: 20px;
                    margin: 5px;
                    i {
                        pointer-events: all;
                        font-size: 10px;
                        position: absolute;
                        top:0;
                        right: 0;
                        padding: 8px;
                    }
                    &:hover {
                        border-color: #909090;
                    }
                }
            }
            &.multiple {
                .select {

                }
            }
        }
        &.compact {
            max-width: fit-content;
        }
        &.icon {
            input, .text {
                padding-left: 2.2em !important;
            }
            [class*='-icon'] {
                display:inline-block;
            }
        }
        /*[class*='-icon'] {*/
        /*    display: none;*/
        /*}*/
    }
    .selected-item {
        position: relative;
        font-size: 12px;
        color: #333;
        padding: 6px 2.2em 6px 10px;
        background-color: #f4f4f4;
        border: 1px solid #d2d2d2;
        border-radius: 20px;
        margin: 5px;
        white-space: nowrap;
        .profile {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            overflow: hidden;
            border-radius: 50%;
            img {
                height: 100%;
                width: auto;
            }
        }
        i {
            pointer-events: all;
            font-size: 10px;
            position: absolute;
            top: 0;
            right: 0;
            padding: 8px;
        }
        &.avatar {
            padding-left: 2.5em;
        }
        &:hover {
            border-color: #909090;
        }
    }
    .filter-menu {
        position: absolute;
        width: calc(100% + 2px);
        top: 100%;
        left: 0;
        margin-top: -1px;
        margin-left: -1px;
        border: 1px solid #d6d6d6;
        border-top: 0;
        background-color: #fff;
        /*box-shadow: 2px 5px 4px 0 rgba(0, 0, 0, 0.16);*/
        z-index: 999;
        transform-origin: top;
        .filter-list {
            width: 100%;
            .filter-item {
                display: flex;
                align-items: center;
                padding: 12px 15px;
                color: #999;
                .filter-type {
                    margin: 0 5px;
                }
                .filter-keyword {
                    color: #2985DB;
                }
                &:hover {
                    /*background-color: #eff4fc;*/
                }
                &.select {
                    background-color: #EFEFEF;
                    position: relative;
                    /*&:after {*/
                    /*    content: 'select';*/
                    /*    position: absolute;*/
                    /*    padding: 10px;*/
                    /*    top:0;*/
                    /*    right:0;*/
                    /*    color: #d6d6d6;*/
                    /*}*/
                }
            }
        }
    }


    .slide-down-enter-active {
        transition: all 250ms ease-in-out;

    }
    .slide-down-leave-active {
        transition: all 250ms ease-in-out;
    }
    .slide-down-enter, .slide-down-leave-to {
        opacity: 0;
        transform: scaleY(0);
    }
</style>