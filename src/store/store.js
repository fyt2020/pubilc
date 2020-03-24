import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        INDEX: "1-1",
        nowActiveArr: [],
        usename: '',
        saveActiveArr: [],
        vkey1: false,//视频识别点击加锁
        vkey2: false,
        intellArr:[],//选择的只能识别任务
        isDiscernde:false,//是否识别完成
        token:window.sessionStorage.getItem('token'),
        power:{5001: true,5002: true,5003: true,5004: true,5005: true,5006: true,5007: true,5008: true,5009: true,5010: true,5011: true,5012: true,5013: true,5014: true,5015: true,5016: true,5017: true,5018: true,5019: true,5020: true,5021: true,5022: true,5023: true,5024: true,5025: true,5026: true,5027: true,5028: true,5029: true,5030: true}
    },

    getters: {

    },
    mutations: {

        /**
         * @Author fyt
         * @Description 设置token
         * @Date 2020-03-13 13:43:54 星期五
         */
        set_token(state, payload){
              console.log(state.token);
              state.token = payload.val;
              window.sessionStorage.setItem('token',payload.val)
        },
        /**
         * @Author fyt
         * @Description 设置权限数据
         * @Date 2020-03-17 09:47:58 星期二
         */
        set_power(state,payload){
             state.power = payload.val
        },

        setUseName(state, payload) {
            state.usename = payload.val;
        },
        changeDataClass(state, payload) {
            if (state.nowActiveArr.length > 0) {
                state.nowActiveArr[payload.val].active = true;
            }
        },
        changIndex(state, payload) {
            state.INDEX = payload.val;
        },
        changArr(state, payload) { //保存侧边栏
            state.nowActiveArr = payload.val;
            state.saveActiveArr = payload.val;
        },
        changNow(state, payload) {//标题active状态
            if (payload.val == 3 || payload.val == 4) {
                state.nowActiveArr[payload.val].children[0].active = true;
            } else {
                state.nowActiveArr[payload.val].children[payload.val+1].active = true;
            }
        },
        changVkey1(state, payload) {//视频识别 prev锁
            state.vkey1 = payload.val
        },
        changVkey2(state, payload) {//视频识别 next锁
            state.vkey2 = payload.val
        },
        changIntellArr(state, payload){
            state.intellArr = payload.val;
        },
        changeDiscern(state, payload){
            state.isDiscernde = payload.val;
        }
    },
    actions: {
    }
})