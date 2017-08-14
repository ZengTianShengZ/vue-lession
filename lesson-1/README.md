# lesson-1

## Vuex 状态管理模式
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它可以对各个组件的状态进行统一管理，在介绍Vuex
之前，可以先来看看 Vue 是怎么进行组件间数据的传递的。

## 前言

### 1、父组件向子组件传递数据
子组件通过 `props` 拿到父组件的数据
> parent.vue

```
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
        components: {
            sun
        }
    }
</script>
```
> sun.vue

```
<template>
    <div>{{message}}</div>
</template>
<script>
    export default {
        props: {
            message: ''
        }
    }
</script>
```

### 2、子组件向父组件传递数据
利用子组件的 `this.$emit  `

> parent.vue

```
<template>
    <div>
        <p>{{msg}}</p>
        <sun ﻿@commit='responseChild'></sun>
    </div>
</template>
<script>
    import sun from './sun.vue'
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
        components: {
            sun
        }
    }
</script>
```
> sun.vue

```
<script>
    export default {
        mounted() {
            this.$emit('commit', 'commit msg to parent')
        }
    }
</script>
```

### 3、非父子组件传递数据
对于非父子组件通信，在简单的场景下，可以使用一个空的 Vue 实例作为中央事件总线：eventBus
在 main.js 下面注册一个 `eventBus`
```
Vue.prototype.bus = new Vue();
```

> other_1.vue
$emit 提交一个事件

```
<script>
    export default {
        mounted() {
            this.bus.$emit('busData', 'commit msg to other components 2')
        }
    }
</script>
```
> other_2.vue
$on 订阅一个事件

```
<script>
    export default {
        created() {
            this.bus.$on('busData',(data)=>{
                console.log(data)
            })
        }
    }
</script>
```

## 利用 Vuex 传递数据
根据 上面 `前言` 部分讲的数据传递方式基本上能满足项目组件间的数据传递，那 Vuex 的出现又能解决什么问题呢，如果
你的项目是一个简单的应该，相信上面提到的数据传递方式已经适合大部分场景的使用了，顶多以一个 global event bus
就足够了，但如果你开发的是一个较大型的单页项目，或许使用 Vuex 能更好地在组件外部管理状态，比如 项目的登录登出
功能啊，购物车啊等较为复杂的状态管理就可以考虑 Vuex 了

### 1、开始 Vuex


