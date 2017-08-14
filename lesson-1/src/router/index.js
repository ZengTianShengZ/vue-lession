import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import parent from '../components/parent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/parent',
      name: 'parent',
      component: parent
    }
  ]
})
