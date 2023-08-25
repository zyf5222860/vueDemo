import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import request from "./utils/request";
import store from './store';
import Valid from './utils/valid';

 


Vue.use(ElementUI,{size:"small"});

Vue.config.productionTip = false;

Vue.prototype.axios=request;
Vue.prototype.$Valid = Valid;
Vue.config.productionTip = false

/*引入axios插件*/
import axios from 'axios'
Vue.prototype.$http = axios;


// 实现全局路由守卫
router.beforeEach((to, from, next) => {
	if(to.path === '/login'){
		next();
	  }else{
		let token = localStorage.getItem('token');
		if(token === 'null' || token === '' || token === undefined){
		  next('/login')
		}else{
		  next();
		}
	  }
 
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
