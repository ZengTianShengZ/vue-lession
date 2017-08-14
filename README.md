

# lesson-1

## Vuex 状态管理模式
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它可以对各个组件的状态进行统一管理，在介绍Vuex
之前，可以先来看看 Vue 是怎么进行组件间数据的传递的。

## 前言

### 1、父组件向子组件传递数据


### 2、子组件向父组件传递数据


### 3、兄弟组件间传递数据


### 4、随便组件间传递数据 -_- \\\


## 利用 Vuex 传递数据
根据 上面 `前言` 部分讲的数据传递方式基本上能满足项目组件间的数据传递，那 Vuex 的出现又能解决什么问题呢，如果
你的项目是一个简单的应该，相信上面提到的数据传递方式已经适合大部分场景的使用了，顶多以一个 global event bus
就足够了，但如果你开发的是一个较大型的单页项目，或许使用 Vuex 能更好地在组件外部管理状态，比如 项目的登录登出
功能啊，购物车啊等较为复杂的状态管理就可以考虑 Vuex 了

### 1、开始 Vuex


