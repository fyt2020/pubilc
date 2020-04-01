// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueRouter from 'vue-router';
import store from './store/store';
import ElementUI from 'element-ui';
import axios from './plugins/axios';
import 'element-ui/lib/theme-chalk/index.css';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import $ from 'jquery';
import echarts from 'echarts';
import '@/assets/css/reset.css';
import XLSX from 'xlsx';

Vue.use(ElementUI);
Vue.use(iview);


const outputXlsxFile = (data, wscols, xlsxName) => {
  /* convert state to workbook */
  const ws = XLSX.utils.aoa_to_sheet(data)
  ws['!cols'] = wscols
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, xlsxName)
  /* generate file and send to client */
  XLSX.writeFile(wb, xlsxName + ".xlsx")
  }

Vue.prototype.$outputXlsxFile = outputXlsxFile;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

router.beforeEach((to, from, next) => {

  // console.log('meta',to.meta)
  
  let token = JSON.parse(sessionStorage.getItem("token"));
  if(to.name == 'newShootC'){
    next();
    return
  }
  if(!token && to.name != 'login'){
      let key = window.confirm('还未登陆,去登陆？')
      if(key){
        next({name:'login'})
      }
  }else{
    next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
