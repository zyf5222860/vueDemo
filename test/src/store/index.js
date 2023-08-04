import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo' // 用户模块信息
import createPersistedState from 'vuex-persistedstate'

 
Vue.use(Vuex)
 
 
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
        }
    }
})
 
 
export default store