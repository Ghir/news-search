import Vue from 'vue'
import VueRouter from 'vue-router'
import Sources from '../views/Sources.vue'
import Articles from '../views/Articles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sources',
    component: Sources
  },
  {
    path: '/articles/:name',
    name: 'Articles',
    component: Articles,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
