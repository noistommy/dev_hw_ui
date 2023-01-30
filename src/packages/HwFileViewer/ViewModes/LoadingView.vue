<template>
    <div class="hw-loading-view">
        <Loading :ws="40" :hs="40" :theme="'secondary'" />
        <p class="loading-message">{{message}}</p>
    </div>
</template>
<script>
import Loading from '../Loading.vue'
export default {
    name: 'hw-loading-view',
    props: {
        message: {
            type: String,
            required: false
        }
    },
    components: {Loading}
}
</script>