import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo' // 用户模块信息
import createPersistedState from 'vuex-persistedstate'

 
Vue.use(Vuex)
 
const state = {     // 全局管理的数据存储
    isLogin:'0',
    ser:null,
    token:localStorage.getItem('token') ? localStorage.getItem('token'):'',   // token
};
 
 
const store = new Vuex.Store({
    modules:{
        userInfo
    },
    getters: {
		isLogined: state => {
			return state.userInfo.isLogined
		},
        user: state => {
            return state.userInfo
        },
        getStorage(state){   // 获取本地存储的登录信息
            if(!state.token){
              state.token =JSON.parse(localStorage.getItem(key))
            }
            return state.token
          }
 
	},
    plugins: [createPersistedState({ // 插件配置信息
	    key: 'store', // key对象存储的key值可以自定义
	    storage: window.localStorage, // storage对象存储的value值，采用HTML5中的新特性localStorage属性实现
	})],
    state:{
        currentPathName:''
    },
    mutations:{
        setPath(state){
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        	$_setToken(state, value) { // 设置存储token
	        state.token = value;
	        localStorage.setItem('token', value);
	    },
	    $_removeStorage(state, value){  // 删除token
		      localStorage.removeItem('token');
	    }

    }
})
 
 
export default store