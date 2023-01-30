<template>
    <div class="hw-error-view">
        <img class="error-image" src="../assets/not-supported.png" alt="not-supported">
        <p class="error-text">{{languageMap[location].notSupported}}</p>
        <p class="error-text">{{languageMap[location].lockedOrExceeded}}</p>
        <button class="hw-button primary" @click.stop="emitDownload">{{languageMap[location].download}}</button>
    </div>
</template>
<script>
export default {
    name: 'hw-error-view',
    data(){
        return {
            languageMap: {
                'ko': {
                    'notSupported': '미리보기가 지원되지 않습니다.',
                    'lockedOrExceeded': '비밀번호가 설정되어 있거나 처리할 수 있는 페이지 수를 초과하였습니다.',
                    'download': '다운로드'
                },
                'en': {
                    'notSupported': 'No preview available.',
                    'lockedOrExceeded': '',
                    'download': 'Download'
                },
                'zh': {
                    'notSupported': '无法预览',
                    'lockedOrExceeded': '',
                    'download': '下载'
                }
            }
        }
    },
    props: {
        location: {
            type: String,
            default: 'ko'
        }
    },
    methods: {
        emitDownload () {
            this.$emit('file-download')
        }
    }
}
</script>