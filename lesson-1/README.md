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
这里套用网上的一张图来说明：
[img-1]()

由上面流程图中绿色框的 Vuex 可以看出 Vuex 的工作流程大概是这样的：
Vuex 有个 Store ，你可以当作一个数据中央处理器，专门负责数据的收集和分发，Store 内有个 state用来管理数据，
state一变化就会响应组件更新，这个跟 Vue 组件的 data 属性具有相同的功能；Vue组件的 data 数据一发生变化，会
响应组件的 computed 属性方法调用，同样的 Vuex 的 Store 的 state 变化也会使 computed 属性方法重新计算，
前提使你的组件导入了 Store 实例，就像下面这样：

```
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: '<App/>'
})
```
上面泛泛而谈不太直观，可以跳转这个链接查看 [例子](https://jsfiddle.net/n9jmu5v7/1269/)
我把代码贴到下面分析：
```
<div id="app">
  <p>{{ count }}</p>
  <p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </p>
</div>

-----------------------------------------------(

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
  	increment: state => state.count++,
    decrement: state => state.count--
  }
})

new Vue({
  el: '#app',
  computed: {
    count () {
	    return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
    	store.commit('decrement')
    }
  }
})
```
由例子看出，组件事件触发 Vuex 的 store 来 commit 一个事件，而 store 在 mutations 属性已经注册了
该事件，所以事件响应执行又使 store 的 state 属性发生变化，而回到组件这边，组件在 computed 属性也已经
订阅了 state 属性发生变化，所以触发了 computed 的 count 方法重新计算，结果更新到了组件 😷

如果你上面对 Vuex 的状态管理模式有了大概的了解，那下面来细谈下 Vuex store的各个属性

### 2、state （Vuex 的数据状态属性）

当 state 数据更新触发有订阅该 state 数据的组件的 computed属性重新计算
```
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```
每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

### 3、state （Vuex 的数据状态属性）

