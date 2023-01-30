<template>
    <div class="dropdown-result">
        <div class="dropdown-search">
            <div class="selected-item" :class="{avatar:imageKey}" v-if="selectedItem != null && !multiple" @click.stop="removeSelect()">
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
    </div>
</template>