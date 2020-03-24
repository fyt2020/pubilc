<template>
  <div class="wapper2">
    <!-- 下拉框 -->
    <div class="sec">
      <el-select v-model="secVal" :placeholder="deviceInfor.name" class="secOne">
        <el-option v-for="(item,index) in cities" :key="index" :label="item.name" :value="item.name" @click.native="choseTask(item)"></el-option>
      </el-select>
    </div>
    <!-- 背景 -->
    <img :src="bgImg" alt class="wapper-bg" />
    <!-- 内容区 -->
    <div class="content">
      <!-- 左 -->
      <div class="left">
        <!-- 时间组件 -->
        <div class="head">
          <m-time />
        </div>
        <!-- 显示区域 -->
        <div class="con">
          <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
        </div>

        <div class="footer">
          <m-footer :con="deviceInfor" />
        </div>
      </div>
      <!-- 右 -->
      <div class="right">
        <div class="top">
          <!-- 最近访问 -->
          <div class="recently-wrapper">
            <div class="rec-header">
              <img src="../../assets/img/img/Rightline.png" alt class="header-img" />
              <p class="header-con">
                <span class="rec-con-word">正在识别</span>
              </p>
            </div>
            <div class="rec-content">
              <div class="rec-content-left">
                <div :class="['rcli-box',{'now':isFacing}]">
                  <img
                    :src="`data:image/png;base64,${resultData.facePic}`"
                    alt
                    class="rcli"
                    v-if="resultData.facePic"
                  />
                  <img :src="`data:image/png;base64,${initData.facePic}`" alt class="rcli" v-else />
                </div>
                <span
                  class="rclw"
                  v-if="resultData.createTime"
                >访问时间:{{ new Date(resultData.createTime).getHours() > 9 ? new Date(resultData.createTime).getHours() : '0' + ( Number.isNaN(new Date(resultData.createTime).getHours()) ? 0 :new Date(resultData.createTime).getHours() )}}:{{ new Date(resultData.createTime).getMinutes() > 9 ? new Date(resultData.createTime).getMinutes() : "0" + (Number.isNaN(new Date(resultData.createTime).getMinutes()) ? 0 : new Date(resultData.createTime).getMinutes())}}:{{new Date(resultData.createTime).getSeconds() > 9 ? new Date(resultData.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(resultData.createTime).getSeconds()) ? 0 :new Date(resultData.createTime).getSeconds())}}</span>
                <span
                  class="rclw"
                  v-else
                >访问时间:{{ new Date(initData.createTime).getHours() > 9 ? new Date(initData.createTime).getHours() : '0' + ( Number.isNaN(new Date(initData.createTime).getHours()) ? 0 :new Date(initData.createTime).getHours() )}}:{{ new Date(initData.createTime).getMinutes() > 9 ? new Date(initData.createTime).getMinutes() : "0" + (Number.isNaN(new Date(initData.createTime).getMinutes()) ? 0 : new Date(initData.createTime).getMinutes())}}:{{new Date(initData.createTime).getSeconds() > 9 ? new Date(initData.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(initData.createTime).getSeconds()) ? 0 :new Date(initData.createTime).getSeconds())}}</span>
              </div>

              <div class="rec-content-right">
                <ul :class="['rec-content-box',{'isOne':true}]">
                  <li :class="['rec-content-item',{'isOne':true}]">
                    <div class="item-left">
                      <img
                        :src="`data:image/png;base64,${resultData.angle_pic}`"
                        v-if="resultData.angle_pic"
                        alt
                        class="item-left-img"
                      />
                      <img
                        :src="`data:image/png;base64,${initData.angle_pic}`"
                        v-else
                        alt
                        class="item-left-img"
                      />
                    </div>
                    <div class="item-right">
                      <p class="item-right-name" v-if="resultData.username">{{resultData.username}}</p>
                      <p class="item-right-name" v-if="initData.username">{{initData.username}}</p>
                      <p
                        class="item-right-about"
                        v-if="resultData.dept_name"
                      >所属:{{resultData.dept_name}}</p>
                      <p
                        class="item-right-about"
                        v-if="initData.dept_name"
                      >所属:{{initData.dept_name}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <!-- 访问记录 -->
          <div class="record-wrapper">
            <div class="record-header">
              <p class="header-con">
                <span class="record-con-word">历史记录</span>
                <img src="../../assets/img/img/Visit.png" alt class="record-con-img" />
              </p>
            </div>
            <div class="record-content">
              <ul class="rec-content-box">
                <transition-group name="el-fade-in-linear">
                  <li
                    class="rec-content-item"
                    v-for="(item,index) in recordList"
                    :key="index+item.id"
                  >
                    <div class="item-left">
                      <img
                        :src="`data:image/png;base64,${item.angle_pic}`"
                        alt
                        class="item-left-img"
                      />
                    </div>
                    <div class="item-mid">
                      <p class="item-mid-name">{{item.username}}</p>
                      <p class="item-mid-about">
                        <span>相似度:{{Math.floor(item.possibility*100)}}%</span>
                        <span>所属:{{item.dept_name}}</span>
                      </p>
                    </div>

                    <div class="item-right">
                      <span class="point"></span>
                      <span
                        class="item-right-time"
                      >{{new Date(item.createTime).toLocaleDateString()}}</span>
                    </div>
                  </li>
                </transition-group>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
import MTime from "@/components/time/time.vue";
import MFooter from "@/components/footer/footer.vue";

export default {
  components: {
    MTime,
    MFooter
  },
  data() {
    return {
      secVal: "",
      keyOne: false,
      cities: [],
      bgImg: require("@/assets/img/img/BG.jpg"),
      webSocket: null,
      imgBody: "",
      imgArr: [],
      isFacing: false,
      likelying: "",
      deviceInfor: {
        no: "ddsaewc745464",
        address: "武汉市洪山区珞狮路3号学府鑫苑2号楼7楼 710-720室",
        name: "天远视科技701门禁"
      },
      resultData: {},
      recordList: [],
      initData: [],
      id: "",
      address:'',
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getTask();
    // this.initSocket()
  },
  mounted() {
     if (this.id) {
      this.getSev(this.id)
    }
  },
  methods: {
    choseTask(data){
         let id = data.id;
        //  console.log(id)
         this.webSocket.close();
         this.initData.facePic = "";
         this.initData.username = "";
         this.initData.dept_name = "";
         this.initData.possibility = "";
         this.initData.angle_pic = "";
         this.initData.createTime = "";


         this.resultData.facePic = "";
         this.resultData.username = "";
         this.resultData.dept_name = "";
         this.resultData.possibility = "";
         this.resultData.angle_pic = "";
         this.resultData.createTime = "";

         this.getSev(id);
    },
    getSev(data) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/api/v1/rtspTasks/${data}`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.result;
            // console.log(data)
            VM.address = data.java_addr;
            VM.deviceInfor.address = java_addr;
            VM.deviceInfor.name = data.name;
            if(VM.address){
              // console.log(VM.address)
                VM.fristInit(VM.address);
                VM.getRocordList(VM.address);
                VM.initSocket(VM.address);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fristInit(data) {
   
      let VM = this;
      this.$http.api
        .get(
          `http://${data}/police-recognition/api/v1/historyResults?pageNum=${1}&pageSize=${6}&flag=1`
        )
        .then(res => {
          if (res.status == 200) {
            // console.log(res)
            if (res.data.result.list.length > 0) {
              VM.imgArr = res.data.result.list;
              VM.initData = res.data.result.list[0];
              // console.log(VM.imgArr)
            } else {
              VM.initData = {
                facePic: null,
                possibility: null,
                username: null,
                dept_name: null
              };
            }
            // console.log(VM.imgArr);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRocordList(data) {
      let VM = this;
      this.$http.api
        .get(
          `http://${data}/police-recognition/api/v1/historyResults?pageNum=${1}&pageSize=${4}&flag=1`
        )
        .then(res => {
          if (res.status == 200) {
            if (res.data.result.list.length > 0) {
              VM.recordList = res.data.result.list;
              //   console.log(VM.recordList);
            } else {
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getRocordNews() {
      // console.log(this.address)
      let VM = this;
      this.$http.api
        .get(
          `http://${VM.address}/police-recognition/api/v1/historyResults?pageNum=${1}&pageSize=${1}&flag=1`
        )
        .then(res => {
          if (res.status == 200) {
            if (res.data.result.list.length > 0) {
              let data = res.data.result.list[0];
              VM.recordList.unshift(data);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTask() {
      let VM = this;
      this.$http.api
        .get(URL.testUrl2 + `/parent-police/api/v1/rtspTasks`)
        .then(function(res) {
          // console.log(res)
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.cities = data;
            // console.log(VM.cities)
          }
        })
        .catch(function(error) {
          console.log(error);
      });
  },
    // 建立连接
    initSocket(data) {
      // 无参数的情况下：
      console.log(data)
      let Lurl = `192.168.1.197:8877`
      let url = `ws://${Lurl}/police-recognition/websocket`;
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
      let rtsp_imgBody = data.rtsp_img;
      let recg_result = data["recg_result"];

      if (rtsp_imgBody) {
        this.keyOne = true;
        this.imgBody = rtsp_imgBody.body;
      }
      if (!recg_result) {
        return;
      } else {
        this.resultData.angle_pic = recg_result.angle_pic;
        this.resultData.dept_name = recg_result.dept_name;
        this.resultData.username = recg_result.username;
        this.resultData.md5 = recg_result.md5;
        this.resultData.facePic = recg_result.facePic;
        this.resultData.createTime = recg_result.createTime;
        this.likelying =
        recg_result.possibility > this.possibility
            ? this.likely(recg_result.possibility * 100)
            : recg_result.possibility * 100;
        this.likelying = Math.floor(this.likelying);
          console.log(recg_result)

        if (this.resultData.facePic) {
          this.isFacing = true;
          this.initData = {};
          this.getRocordNews();
          setTimeout(() => {
            this.isFacing = false;
          }, 2000);
        }
      }
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
    destroyed() {
      this.webSocket.close();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/layout/face.scss";
</style>
