<template>
    <div class="sample-wrapper">
        <div class="sample-image-wrap">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpMocFWxHKuChxROecmyGZywUChmiBuJQnCg&usqp=CAU" alt="">
        </div>
        <div class="sample-text-wrap">
            <h1 class="sample-text-header">This is a Frog.</h1>
            <p class="sample-text-paragraph">
                Frog is Cute. Frog has green color. Frog! Frog! Frog!
                Frog is Cute. Frog has green color. Frog! Frog! Frog!
                Frog is Cute. Frog has green color. Frog! Frog! Frog!
            </p>
        </div>
        <div class="sample-button-row">
            <button class="hw-button primary" @click="onClose">close</button>
            <button class="hw-button primary" @click="onCloseAll">closeAll</button>
            <button class="hw-button primary" @click="onCreate">create</button>
        </div>
    </div>
</template>
<script>
import Sample from './Sample'
export default {
    props: {
        type: String
    },
    methods: {
        onClose(){
            this.$emit('close')
        },
        onCloseAll(){
           this.$emit('closeAll')
        },
        onCreate(){
            let options = {useStack: true};
            let props = {};
            if(this.type === 'clickToClose') {
                options.clickToClose = true;
                props = {type: 'clickToClose'}
            }
            if(this.type === 'escapeToClose') {
                options.escapeToClose = true;
                props = {type: 'escapeToClose'}
            }
            this.$hwModal.show({
                modalComp: Sample,
                modalOptions: options,
                modalProps: props
            })
        }
    }
}
</script> 
<style lang="scss">
.sample-wrapper{
    background-color: white;
    padding: 10px;
    width: 400px;
    .sample-image-wrap{
        height: 250px;
        border-radius: 2px;
        overflow: hidden;
        box-shadow: 2px 2px 4px #ccc;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .sample-text-wrap{
        margin-top: 10px;
        .sample-text-header{
            font-weight: bold;
            text-align: center;
            font-size: 24px;
            margin-bottom: 10px;
            padding-top: 10px;
            border-top: 1px solid #ebeef5;
        }
    }
    .sample-button-row{
        text-align: center;
        margin-top: 10px;
    }
}
</style>