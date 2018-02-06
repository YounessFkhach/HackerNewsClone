import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Submit from '@/views/Submit'
import Topic from '@/views/Topic'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home/:tab?/:page?',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
      path: '/submit',
      name: 'submit',
      component: Submit
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },
  ]
})
