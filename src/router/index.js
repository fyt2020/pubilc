import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: "exactActive",
  linkActivesClass: "active",
  routes: [
    {
      path: '/newLayout',
      name: 'newLayout',
      component:  () => import("@/pages/newLayout"),
      redirect: "/newLayout/newShootC",
      meta:{
        needTooken:false
      },
      children:[
        {
          path: 'newShootC',
          name: 'newShootC',
          component: () => import("@/pages/portraitCollection/newShootC"),
          meta:{
            needTooken:false
          },
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/pages/login/login"),
      meta:{
        needTooken:false
      },
    },
    
    {
      path: '/home',
      name: 'home',
      component: () => import("@/pages/home/home"),
      meta:{
        needTooken:true
      },
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import("@/pages/layout"),
      meta:{
        needTooken:true
      },
      children: [
        {
          path: 'data',
          name: 'data',  //数据统计
          component: () => import("@/pages/data/ShootData"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'shootC',
          name: 'shootC',//拍摄采集
          component: () => import("@/pages/portraitCollection/shootCollection2"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'shootList',
          name: 'shootList',//采集列表
          component: () => import("@/pages/portraitCollection/shootList"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'shootD',
          name: 'shootD',//拍摄设备
          component: () => import("@/pages/portraitCollection/shootDevice"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'addDec',
          name: 'addDec',//添加设备
          component: () => import("@/pages/addDec/addDec"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'wactchDev',
          name: 'wactchDev',//查看设备
          component: () => import("@/pages/addDec/wactchDev"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'editDec',
          name: 'editDec',//编辑设备
          component: () => import("@/pages/addDec/editDec"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'modelList',
          name: 'modelList',//建模列表
          component: () => import("@/pages/modelList/modelList"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'syncMan',
          name: 'syncMan',//同步管理
          component: () => import("@/pages/modelList/syncMan"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'faceM',
          name: 'faceM',//人像模型库
          component: () => import("@/pages/3dHumDB/faceModel"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'faceDetalis',
          name: 'faceDetalis',//模型详情
          component: () => import("@/pages/3dHumDB/faceDetalis"),
          meta:{
            needTooken:true
          },
          redirect:'/layout/faceDetalis/cenLeftRight',
          children:[
            {
              path: 'cenLeftRight',
              name: 'cenLeftRight',//一正两侧
              component: () => import("@/pages/3dHumDB/cenLeftRight"),
              meta:{
                needTooken:true
              },
            },
            {
              path: 'modelShow',
              name: 'modelShow',//模型详情
              component: () => import("@/pages/3dHumDB/modelShow"),
              meta:{
                needTooken:true
              },
            },
            {
              path: 'photoes',
              name: 'photoes',//43张图片
              component: () => import("@/pages/3dHumDB/photoes"),
              meta:{
                needTooken:true
              },
            },
          ]
        },
        {
          path: 'imgRec',
          name: 'imgRec',//图像识别
          component: () => import("@/pages/3dHumUse/imgRec"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'acc',
          name: 'acc',//账户管理
          component: () => import("@/pages/sysSet/accountMange"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'labelM',
          name: 'labelM',//标签管理
          component: () => import("@/pages/sysSet/laberMan"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'intellRec',
          name: 'intellRec',//智能识别
          component: () => import("@/pages/3dHumUse/intellRec"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'video',
          name: 'video',//视频识别
          component: () => import("@/pages/3dHumUse/monitorDec"),
          meta:{
            needTooken:true
          },
        },
        // {
        //   path: 'videoDetail',
        //   name: 'videoDetail',//视频识别详情
        //   component: () => import("@/pages/3dHumUse/videoDetail"),
        // },
        {
          path: 'faceChar',
          name: 'faceChar',//人脸特征库
          component: () => import("@/pages/3dHumUse/faceChar"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'faceDB',
          name: 'faceDB',//人脸特征库
          component: () => import("@/pages/3dHumUse/faceDB"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'faceDBdetail',
          name: 'faceDBdetail',//人脸特征库
          component: () => import("@/pages/3dHumUse/faceDBdetail"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'userList',
          name: 'userList',//用户列表
          component: () => import("@/pages/userMange/userList"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'organizational',
          name: 'organizational',//组织机构
          component: () => import("@/pages/userMange/organizational"),
          meta:{
            needTooken:true
          },
        },
        {
          path: 'userm',
          name: 'userm',//用户管理
          component: () => import("@/pages/userMange/roleMange"),
          meta:{
            needTooken:true
          },
        },
      ]
    },
    {
      path: '/faceShow',
      name: 'faceShow',
      component: () => import("@/pages/faceShow/faceShow"),
      meta:{
        needTooken:true
      },
    },
    {
      path: '/faceShow2',
      name: 'faceShow2',//智能识别
      component: () => import("@/pages/faceShow/faceShow2"),
      meta:{
        needTooken:true
      },
    },
    {
      path: '/faceShow3',
      name: 'faceShow3',//智能识别
      component: () => import("@/pages/faceShow/faceShow3"),
      meta:{
        needTooken:true
      },
    },
    {
      path: '/notFound',
      name: 'notFound',//404页面
      component: () => import("@/pages/404"),
      meta:{
        needTooken:false
      },
    },
    {
      path: '*',
      redirect(to) {
        if (to.path == '/') {
          return '/login'
        } 
        if(to.path == 'newShootC'){
          return '/newLayout'
        }else{
          return '/notFound' 
        }
      }
    }
  ]
})
