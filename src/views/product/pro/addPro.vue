<template>
    <div class="app-container createPost-container">
        <MDinput :maxlength="16">标题</MDinput>
        <span class="word-counter">16字</span>
    </div>
</template>

<script>
    import MDinput from '@/components/MDinput'
    export default {
        name: "addPro",
        components : {
            MDinput
        },
    }
</script>

<style lang="scss" scoped>
    .createPost-container{
        position: relative;
        .word-counter {
            width: 40px;
            position: absolute;
            right: -10px;
            top: 0px;
        }
    }
</style>