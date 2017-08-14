/**
* @description: 文件或模块描述
* @author: zengtiansheng
* @update: 2017/8/14
*/
<style scoped>

</style>
<template>
    <div>o 1</div>
</template>
<script>

    export default {
        data() {
            return {
                msg: ''
            }
        },
        methods: {},
        mounted() {
            this.bus.$emit('busData', 'commit msg to other components 2')
        },
        created() {

        }
    }
</script>
