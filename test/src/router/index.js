import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=> import('../views/HomeView.vue'),
    redirect:"/home", //重定向默认到主页
    children:[{
      path: '/user',name: '用户管理', component: ()=> import('../components/User.vue')
    },{
      path: '/home',name: '主页', component: ()=> import('../components/Home.vue')
    }],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



 
//路由守卫
router.beforeEach((to, from , next ) =>{
  localStorage.setItem("currentPathName",to.name)  //设置当前路由名称
  store.commit("setPath")  //触发store的数据更新
  next()   //放行路由
})
 
export default router
