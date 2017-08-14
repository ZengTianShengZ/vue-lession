/**
* @description: 文件或模块描述
* @author: zengtiansheng
* @update: 2017/8/14
*/
<style scoped>

</style>
<template>
    <sun :message="msg"></sun>
</template>
<script>
    import sun from './sun.vue'

    export default {
        data() {
            return {
                msg: 'something msg'
            }
        },
        methods: {},
        mounted() {

        },
        created() {

        },
        components: {
            sun
        }
    }
</script>
