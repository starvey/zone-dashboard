import Vue from 'vue'
import Router from 'vue-router'
import StoryList from '@/components/StoryList'
import Login from '@/components/Login'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/project-list/',
      name: 'Project',
      component: StoryList
    },
    {
      path: '/project-list/:projectId',
      name: 'StoryList',
      component: StoryList
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(this)
  console.log(store.state.user)
  next()
})

export default router
