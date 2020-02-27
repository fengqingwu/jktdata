import Vue from 'vue'
import VueRouter from 'vue-router'

const registerPage = (name = '') => {
  routes.push({
    path: '/' + name,
    name: name,
    component: () => import('../views/pages/' + name + '.vue')
  })
};

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/index.vue')
  }
]

registerPage("sprite");

const router = new VueRouter({ /*$registerPage$*/ //command tag 这一行的内容请勿更改 用于命令行获取标识
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
