<template>
  <div class="wapper">
    <!-- 下拉框 -->
    <!-- <div class="sec">
      <el-select v-model="secVal" placeholder="天远视西门门禁" class="secOne">
        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>-->
    <!-- 背景 -->
    <img :src="bgImg" alt class="wapper-bg" />

    <div class="header">
      <div class="left">
        <img src="../../assets/img/img2/logo.png" alt class="logo" />
      </div>
      <div class="mid">
        <img src="../../assets/img/img2/logo2.png" alt class="logo2" />
      </div>
      <div class="right">
        <img src="../../assets/img/logonew.png" alt class="logo3" />
        <img src="../../assets/img/img2/off.png" alt class="off" @click="backTo" />
      </div>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <img src="../../assets/img/img2/bg2.png" alt class="bg" />
      <!-- 左部 -->
      <div class="left">
        <div class="top">
          <p class="title">摄像头编号：WH1520230</p>
          <div class="con">
            <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            <!-- <m-video :show="!keyOne" /> -->
          </div>
        </div>
        <div class="bottom">
          <p class="title">
            <span>实时抓拍</span>
            <!-- <span>查看更多</span> -->
          </p>

          <div class="nowList">
            <!-- <div class="prev" @click="prev">
              <img src="../../assets/img/img2/left.png" alt />
            </div>-->

            <div class="slide-wrapper">
              <ul class="list-box">
                <transition-group name="none" class="list-BOX" v-if="imgArr.length > 0">
                  <li v-for="(v,i) in imgArr" :key="i+0" class="list-item">
                    <img
                      :src="`data:image/png;base64,${v.facePic}`"
                      alt class="img-item" v-if="v.facePic" />
                  </li>
                </transition-group>
              </ul>
            </div>
            <!-- 
            <div class="next" @click="next">
              <img src="../../assets/img/img2/right.png" alt />
            </div>-->
          </div>
        </div>
      </div>
      <!-- 右部 -->
      <div class="right">
        <div class="recently">
          <p class="title">当前识别</p>

          <div class="recently-con">
            <div :class="['recently-left',{'now':isFacing}]">
              <img
                v-if="resultData.facePic"
                :src="`data:image/png;base64,${resultData.facePic}`"
                alt class="img"
                />
              <img :src="`data:image/png;base64,${initData.facePic}`" alt class="img2" v-else />
            </div>

            <div class="recently-right">
              
              <div class="one" v-if="likelying > possibility*100 || initData.possibility*100 > possibility*100">
                <img :src="`data:image/png;base64,${resultData.angle_pic}`" alt class="img" v-if="resultData.angle_pic" />
                <img :src="`data:image/png;base64,${initData.angle_pic}`" alt class="img" v-else />
              </div>
              <div class="one" v-else>
                <img src="../../assets/img/morenx.png" alt class="img2" />
              </div>

              <!-- <div class="one">
                <img :src="`data:image/png;base64,${resultData.angle_pic}`" alt class="img" v-if="resultData.angle_pic" />
                <img :src="`data:image/png;base64,${initData.angle_pic}`" alt class="img" v-else />
              </div> -->


              <div class="two">

                <p class="name" v-if="resultData.username">
                  <span v-if="likelying > 40" class="name-w">{{resultData.username}}</span>
                  <span v-else class="name-w">未知</span>
                </p>
                <p class="name" v-else>{{initData.username}}</p>
                <div class="tag">
                  <p class="tag-w">所属:</p>
                  <div class="label-box">
                    <span class="tag-item" v-if="resultData.dept_name">
                      <span v-if="likelying > 40" class="name-w">{{resultData.dept_name}}</span>
                      <span v-else class="name-w">未知</span>
                    </span>
                    <span class="tag-item" v-else>{{initData.dept_name}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="recently-like" v-if="likelying > possibility*100 || initData.possibility*100 > possibility*100">
              <span class="recently-w" v-if="likelying">相似度:{{likelying}}%</span>
              <span class="recently-w" v-else>相似度:{{ likely(initData.possibility*100) }}%</span>
            </div>


            <!-- <div class="recently-like">
              <span class="recently-w" v-if="likelying">相似度:{{likelying}}%</span>
              <span class="recently-w" v-else>相似度:{{ likely(initData.possibility*100) }}%</span>
            </div> -->

          </div>
        </div>

        <div class="record">
          <p class="title">历史记录</p>

          <ul class="record-box" v-if="recordList.length > 1">
            <li class="record-item" v-for="(item,index) in recordList" :key="index" >
              <div class="record-top">
                <div class="top-left">
                  <img
                    :src="`data:image/png;base64,${item.facePic}`"
                    alt
                    class="img"
                    v-if="item.facePic"
                  />
                  <img src="../../assets/img/morend.png" alt class="img2" v-else />
                </div>
                <div class="top-right">
                  <img :src="`data:image/png;base64,${item.angle_pic}`" alt class="img" v-if="item.angle_pic" />
                  <img src="../../assets/img/morend.png" alt class="img2" v-else />
                </div>

                <div class="recently-like">
                  <span class="recently-w">相似度:{{ Number.isNaN( likely(item.possibility*100) ) ? 0 : likely(item.possibility*100)}}%</span>
                </div>
              </div>

              <div class="record-bottom">
                <div class="b-left">
                  <p
                    class="top-title"
                  >{{ Number.isNaN( new Date(item.createTime).getFullYear() ) ? 0 : new Date(item.createTime).getFullYear()}}-{{ new Date(item.createTime).getMonth() > 9 ? new Date(item.createTime).getMonth() :"0" + ( Number.isNaN(new Date(item.createTime).getMonth()) ? 0 : new Date(item.createTime).getMonth()) }}-{{ new Date(item.createTime).getDate() > 9 ? new Date(item.createTime).getDate() : "0" + ( Number.isNaN(new Date(item.createTime).getDate())? 0 :new Date(item.createTime).getDate() )}}</p>
                  <p
                    class="top-con"
                  >{{ new Date(item.createTime).getHours() > 9 ? new Date(item.createTime).getHours() : '0' + (  Number.isNaN(new Date(item.createTime).getHours()) ? 0 :new Date(item.createTime).getHours() )}}:{{ new Date(item.createTime).getMinutes() > 9 ? new Date(item.createTime).getMinutes() : "0" + (Number.isNaN(new Date(item.createTime).getMinutes()) ? 0 : new Date(item.createTime).getMinutes())}}:{{new Date(item.createTime).getSeconds() > 9 ? new Date(item.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(item.createTime).getSeconds()) ? 0 :new Date(item.createTime).getSeconds())}}</p>
                </div>
                
                <div class="b-right">
                  <p class="top-title">{{item.username}}</p>
                  <div class="label-box">
                    <span>所属:</span>
                    <span class="label">{{item.dept_name}}</span>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
import MVideo from "@/components/video/video.vue";

export default {
  components: {
    MVideo
  },
  data() {
    return {
      imagePath: "http://3dmaas.farsee2.com/image/api/v1/images",
      secVal: "",
      keyOne: false,
      imgLen: "",
      step: 0,
      imgArr: [],
      initData: {}, //初始数据
      bgImg: require("@/assets/img/img2/Bg.png"),
      webSocket: null,
      imgBody: "",
      isFacing: false,
      likelying: "",
      resultData: {
        facePic:null,
        possibility:null,
      },
      recordList: [ {
         facePic:null,
        possibility:null,
      }, {
         facePic:null,
        possibility:null,
      },
       {
         facePic:null,
        possibility:null,
      },
      
       {
         facePic:null,
        possibility:null,
      }
      ],
      possibility:null,
      rtsp:"",

    };
  },
  created() {
    this.rtsp = this.$route.query.rtsp;
    console.log(this.rtsp)
  },
  mounted() {
     this.possibility = window.BASEURL.possibility;
    // console.log(this.possibility)
    this.initSocket(this.rtsp);   //建立websocket连接
    this.getRocordList(this.rtsp);//获取历史记录
    this.fristInit(this.rtsp);    //获取初始数据
   
  },
  updated(){
    // console.log(window.URL.baseUrl);
    
    // console.log(this.possibility)
  },
  methods: {
    fristInit(data) {
      let VM = this;
      this.$http.api
        .get(`http://${data}`+
            `/police-recognition/api/v1/historyResults?pageNum=${1}&pageSize=${6}&flag=1`
        )
        .then(res => {
          if (res.status == 200) {
            if(res.data.result.list.length > 0){
              VM.imgArr = res.data.result.list;
              VM.initData = res.data.result.list[0];
            }else{
               VM.initData = {
                   facePic:null,
                   possibility:null,
                   username:null,
                   dept_name:null,
               }
            }
            console.log(VM.imgArr)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRocordList(data) {
      let VM = this;
      this.$http.api
        .get( `http://${data}` +`/police-recognition/api/v1/historyResults?pageNum=${1}&pageSize=${4}&flag=1`
        )
        .then(res => {
          if (res.status == 200) {
            if(res.data.result.list.length > 0){
                VM.recordList = res.data.result.list;    
            }else{
            }
          }
        })
        .catch(err => {
          console.log(err);
      });
  },

    getRocordNews() {
      let VM = this;
      VM.getRocordList(VM.rtsp);
    },
    // prev() {
    //   let VM = this;
    //   VM.step++;
    //   $(".list-box").animate(
    //     { left: -VM.imgLen * VM.step },
    //     1000,
    //     "swing",
    //     () => {
    //       console.log("ok");
    //     }
    //   );
    // },

    // next() {
    //   let VM = this;
    //   VM.step--;
    //   $(".list-box").animate(
    //     { left: -VM.imgLen * VM.step },
    //     1000,
    //     "swing",
    //     () => {
    //       console.log("ok");
    //     }
    //   );
    // },

    //相似度函数
    likely(data) {
      let newdata = Math.floor(data);
      // let newdata = Math.floor(data / 4 + 75);
      if (newdata >= 100) {
        return newdata - 10;
      }
      return newdata;
    },

    // 建立连接
    initSocket(data) {
      // 无参数的情况下：
      let url = `ws://${data}/police-recognition/websocket`;
      // 没有参数的情况:接口
      // let url1 = 'ws://localhost:9998'
      this.webSocket = new WebSocket(url);
      this.webSocket.onopen = this.webSocketOnOpen;
      this.webSocket.onclose = this.webSocketOnClose;
      this.webSocket.onmessage = this.webSocketOnMessage;
      this.webSocket.onerror = this.webSocketOnError;
    },

    // 建立连接成功后的状态
    webSocketOnOpen() {
      console.log("websocket连接成功");
    },
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      // res就是后台实时传过来的数据
      let data = JSON.parse(res.data);
      console.log(data)
      let rtsp_imgBody = data.rtsp_img;
      let recg_result = data["recg_result"];
      if (rtsp_imgBody) {
        this.keyOne = true;
        this.imgBody = rtsp_imgBody.body;
      }
      if( !recg_result ){
          return
      }else{
        console.log(recg_result)
        this.resultData.angle_pic = recg_result.angle_pic;
        this.resultData.dept_name = recg_result.dept_name;
        this.resultData.username = recg_result.username;
        this.resultData.md5 = recg_result.md5;
        this.resultData.facePic =  recg_result.facePic;
        this.likelying = recg_result.possibility > this.possibility ? this.likely(recg_result.possibility * 100): recg_result.possibility * 100;
        this.likelying = Math.floor(this.likelying);
        if (this.resultData.facePic) {
                   let obj = { facePic: recg_result.facePic };
                   this.imgArr.unshift(obj);
                   this.isFacing = true;
                   this.initData = {};
                   this.getRocordNews();
                   setTimeout(() => {
                        this.isFacing = false;
                       }, 2000);
                 }
             
      }
      // if (recg_result) {
    
      //   this.resultData.angle_pic = recg_result.angle_pic
      //   if(recg_result.facePic){
      //     this.resultData.facePic = recg_result.facePic;
      //   }
        
      //   this.resultData.dept_name = recg_result.dept_name;
      //   this.resultData.username = recg_result.username;
      //   this.resultData.md5 = recg_result.md5;

      //   this.likelying =
      //     recg_result.possibility > this.possibility
      //       ? this.likely(recg_result.possibility * 100)
      //       : recg_result.possibility * 100;
      //   this.likelying = Math.floor(this.likelying);

      //   if (this.resultData.facePic) {
      //     let obj = { facePic: recg_result.facePic };

      //     this.imgArr.unshift(obj);
      //     this.isFacing = true;
      //     this.initData = {};
      //     this.getRocordNews();
      //     setTimeout(() => {
      //       this.isFacing = false;
      //     }, 2000);
      //   }
      // }
    },
    // 关闭连接
    webSocketOnClose() {
      console.log("websocket连接已关闭");
    },
    //连接失败的事件
    webSocketOnError(res) {
      console.log(res);
      console.log("websocket连接失败");
      // 打印失败的数据
    },

    backTo() {
      this.$router.push({ name: "intellRec" });
    },
    beforeDestroy() {
       this.webSocket.close();
       this.rtsp = "";
    },
    destroyed() {
      this.webSocket.close();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/layout/face2.scss";
</style>