import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'
import Login from '../views/Login.vue'

Vue.use(VueRouter)


const routes = [
  // 登录页
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // 首页
  {
    path: '/home',
    name: 'home',
    component: ()=> import('../views/HomeView.vue'),
    children:[{
      path: '/user',name: '用户管理', component: ()=> import('../components/User.vue'),meta: {title: '用户管理'}
    },{
      path: '/home',name: '主页', component: ()=> import('../components/Home.vue'),meta: {title: '主页'}
    },{
      path: '/person',name: '个人信息', component: ()=> import('../views/Person.vue'),meta: {title: '个人信息'}
    },{
      path: '/qiuduiManage',name: '球队管理', component: ()=> import('../tiyu/qiuduiManage.vue'),meta: {title: '球队管理'}
    },{
      path: '/file',name: '文件管理', component: ()=> import('../components/File.vue'),meta: {title: '文件管理'}
    },{
      path: '/role',name: '角色管理', component: ()=> import('../components/Role.vue'),meta: {title: '角色管理'}
    },{
      path: '/menu',name: '菜单管理', component: ()=> import('../components/Menu.vue'),meta: {title: '菜单管理'}
    }
  ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



 
//路由守卫
router.beforeEach((to, from , next ) =>{
//如果去往登录页则放行 
if (to.path === '/') {
  next();
} else {
  // 从本地存储里获取token
  let token = localStorage.getItem('token');
  // 判断token是否为空如果为空则跳转到登录页 如果有则放行
  if (token === null || token === '') {
    next({path:'/'});
  } else {
    next();
  }
}
 

})
 
export default router
