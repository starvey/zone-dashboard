import Vue from 'vue'
import Router from 'vue-router'
import ProjectList from '@/components/ProjectList'
import Project from '@/components/Project'
import Login from '@/components/Login'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectList,
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/:projectId',
      name: 'Project',
      component: Project,
      meta: { requiresAuth: true },
      props: (route) => {
        return {...route.params, expanded: true}
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user) {
    return next('/')
  }
  return next()
})

export default router
