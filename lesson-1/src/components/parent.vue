/**
* @description: 文件或模块描述
* @author: zengtiansheng
* @update: 2017/8/14
*/
<style scoped>

</style>
<template>
    <div>
        <p>{{msg}}</p>
        <sun ﻿@commit='responseChild'></sun>
        <other_1></other_1>
        <other_2></other_2>
    </div>
</template>
<script>
    import sun from './sun.vue'
    import other_1 from './other_1.vue'
    import other_2 from './other_2.vue'

    export default {
        data() {
            return {
                msg: 'something msg'
            }
        },
        methods: {
            responseChild(msg) {
                console.log(msg)
                this.msg = msg
            }
        },
        mounted() {

        },
        created() {

        },
        components: {
            sun,
            other_1,
            other_2
        }
    }
</script>
