import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index'
import threeGeoVisual from '../views/Layout/threeGeoVisual'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home', // 重定向到默认子路由
    children: [
      { path: '/home', component: threeGeoVisual },
      
    ]
  },
 
]

const router = new VueRouter({
  routes
})



export default router
