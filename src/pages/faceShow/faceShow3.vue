<template>
  <div class="wapper">
    <audio id="audio" autoplay="autoplay"></audio>
    <span class="out" v-show="isFull" @click="outFull">退出</span>
    <!-- 背景 -->
    <img :src="bgImg" alt class="wapper-bg" />
    <div class="header">
      <div class="header__top">
        <div class="date__box">
          <span class="am">{{new Date().getHours() > 12 ? "PM" : "AM"}}</span>
          <span class="one">0</span>
          <span class="one">0</span>
          <span class="one1">:</span>
          <span class="one">0</span>
          <span class="one end">0</span>
          <span class="date__item">{{yearMonDay}}</span>
          <span class="date__item">{{week}}</span>
        </div>
        <img src="@/assets/img/new/Farsee2logo.png" alt class="face2__logo" />
      </div>
      <img src="@/assets/img/new/Stripe.png" alt class="header__bottom" />
    </div>
    <!-- 内容区 -->
    <div class="content">
      <!-- 左部 -->
      <div class="left">
        <div class="top">
          <div class="title__box">
            <span class="title__left">实时预览</span>
            <el-select v-model="taskVal" placeholder="请选择" class="selectTask">
              <el-option
                v-for="item in taskArr"
                :key="item.id"
                :label="item.name"
                :value="item.name"
                @click.native="choseOne(item)"
                class="selectTask"
              ></el-option>
            </el-select>

            <div class="title__right">
              <div class="right__tag" v-show="1">
                <span
                  :class="['tag__item',{'active':item.active}]"
                  v-for="(item,index) in taskNum"
                  :key="index"
                  @click="choseTask(index)"
                >{{item.num}}</span>
              </div>
              <div class="right__full">
                <img src="../../assets/img/new/enlarge.png" alt class="full__img" @click="toFull" />
              </div>
            </div>
          </div>
          <div
            :class="['con',{'four':fourClass,'nine':nineClass}]"
            v-loading="loading"
            element-loading-text="连接中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.9)"
          >
            <!-- one -->
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showOne">
              <span class="taskTitle">{{taskVal}}</span>
              <img
                :src="`data:image/png;base64,${imgBody}`"
                alt
                :class="['con-img',{'full__img':isFull}]"
                v-if="keyOne"
              />
            </div>
            <!-- one -->
            <!-- four -->
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showFour">
              <span class="taskTitle">{{taskArr[0].name ? taskArr[0].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showFour">
              <span class="taskTitle">{{taskArr.length > 1? taskArr[1].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody2}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showFour">
              <span class="taskTitle">{{taskArr.length > 2 ? taskArr[2].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody3}`" alt class="con-img" v-if="keyOne" />
            </div>

            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showFour">
              <span class="taskTitle">{{taskArr.length > 3 ? taskArr[3].name : '无' }}</span>
              <img :src="`data:image/png;base64,${imgBody4}`" alt class="con-img" v-if="keyOne" />
            </div>
            <!-- four -->

            <!-- nine -->
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr[0].name ? taskArr[0].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 1 ? taskArr[1].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 2 ? taskArr[2].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 3 ? taskArr[3].name : '无' }}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 4 ? taskArr[4].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 5 ? taskArr[5].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 6 ? taskArr[6].name : '无'}}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 7 ? taskArr[7].name : '无' }}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <div :class="['con-imgBox',{'four':fourClass,'nine':nineClass}]" v-show="showNine">
              <span class="taskTitle">{{taskArr.length > 8 ? taskArr[8].name : '无' }}</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="con-img" v-if="keyOne" />
            </div>
            <!-- nine -->
          </div>
        </div>
        <div class="bottom">
          <p class="title">
            <span>实时抓拍</span>
          </p>

          <div class="nowList">
            <div class="slide-wrapper">
              <ul class="slidelist-box">
                <li v-for="(v,i) in imgArr" :key="i+1" class="intellList-item">
                  <div class="img__box">
                    <img
                      :src="`data:image/png;base64,${v.facePic}`"
                      alt
                      class="img-item"
                      v-if="v.facePic"
                    />
                  </div>
                  <div class="time__box">
                    <span
                      class="time"
                    >{{new Date(v.createTime).getHours() > 9 ? new Date(v.createTime).getHours() : '0' + ( Number.isNaN(new Date(v.createTime).getHours()) ? 0 :new Date(v.createTime).getHours() )}}:{{ new Date(v.createTime).getMinutes() > 9 ? new Date(v.createTime).getMinutes() : "0" + (Number.isNaN(new Date(v.createTime).getMinutes()) ? 0 : new Date(v.createTime).getMinutes())}}:{{new Date(v.createTime).getSeconds() > 9 ? new Date(v.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(v.createTime).getSeconds()) ? 0 :new Date(v.createTime).getSeconds())}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 右部 -->
      <div class="right">
        <p class="title1">识别结果</p>
        <div class="recently">
          <div class="recently-con">
            <div :class="['recently-left']">
              <div :class="['img__box',{'now':isFacing}]">
                <img
                  :src="`data:image/png;base64,${resultData.facePic}`"
                  class="img"
                  v-if="resultData.facePic"
                />
                <img :src="`data:image/png;base64,${initData.facePic}`" alt class="img" v-else />
              </div>
              <p
                class="recently__time"
                v-if="resultData.createTime"
              >{{new Date(resultData.createTime).getHours() > 9 ? new Date(resultData.createTime).getHours() : '0' + ( Number.isNaN(new Date(resultData.createTime).getHours()) ? 0 :new Date(resultData.createTime).getHours() )}}:{{ new Date(resultData.createTime).getMinutes() > 9 ? new Date(resultData.createTime).getMinutes() : "0" + (Number.isNaN(new Date(resultData.createTime).getMinutes()) ? 0 : new Date(resultData.createTime).getMinutes())}}:{{new Date(resultData.createTime).getSeconds() > 9 ? new Date(resultData.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(resultData.createTime).getSeconds()) ? 0 :new Date(resultData.createTime).getSeconds())}}</p>
              <p
                class="recently__time"
                v-else
              >{{new Date(initData.createTime).getHours() > 9 ? new Date(initData.createTime).getHours() : '0' + ( Number.isNaN(new Date(initData.createTime).getHours()) ? 0 :new Date(initData.createTime).getHours() )}}:{{ new Date(initData.createTime).getMinutes() > 9 ? new Date(initData.createTime).getMinutes() : "0" + (Number.isNaN(new Date(initData.createTime).getMinutes()) ? 0 : new Date(initData.createTime).getMinutes())}}:{{new Date(initData.createTime).getSeconds() > 9 ? new Date(initData.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(initData.createTime).getSeconds()) ? 0 :new Date(initData.createTime).getSeconds())}}</p>
              <!-- <p class="recently__address">街道口地铁站</p> -->
            </div>
            <div class="recently-mid">
              <p class="min_top">
                <span class="likely__mun" v-if="likelying">{{likelying}}</span>
                <span
                  class="likely__mun"
                  v-else
                >{{Number.isNaN( likely(initData.possibility*100) ) ? 0 : likely(initData.possibility*100)}}</span>
                <span class="likely__fu">%</span>
              </p>
              <p class="min__min">相似度</p>
              <p class="min__num">1号摄像头</p>
            </div>

            <div class="recently-right">
              <div class="img__box">
                <img
                  :src="`data:image/png;base64,${resultData.angle_pic}`"
                  class="img"
                  v-if="resultData.facePic"
                />
                <img :src="`data:image/png;base64,${initData.angle_pic}`" alt class="img" v-else />
              </div>
              <p class="recently__name" v-if="resultData.username">{{resultData.username}}</p>
              <p class="recently__name" v-if="initData.username">{{initData.username}}</p>
              <p class="recently__belong" v-if="resultData.username">所属:{{resultData.dept_name}}</p>
              <p class="recently__belong" v-if="initData.username">所属:{{initData.dept_name}}</p>
            </div>
          </div>
        </div>
        <div class="record">
          <ul class="record-box" v-if="recordList.length > 1">
            <li class="record-item" v-for="(item,index) in recordList" :key="index">
              <div class="record-top">
                <div class="top-left">
                  <div class="img__box">
                    <img
                      :src="`data:image/png;base64,${item.facePic}`"
                      alt
                      class="img"
                      v-if="item.facePic"
                    />
                  </div>
                  <p
                    class="recently__time"
                  >{{ new Date(item.createTime).getHours() > 9 ? new Date(item.createTime).getHours() : '0' + ( Number.isNaN(new Date(item.createTime).getHours()) ? 0 :new Date(item.createTime).getHours() )}}:{{ new Date(item.createTime).getMinutes() > 9 ? new Date(item.createTime).getMinutes() : "0" + (Number.isNaN(new Date(item.createTime).getMinutes()) ? 0 : new Date(item.createTime).getMinutes())}}:{{new Date(item.createTime).getSeconds() > 9 ? new Date(item.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(item.createTime).getSeconds()) ? 0 :new Date(item.createTime).getSeconds())}}</p>
                  <!-- <p class="recently__address">街道口地铁站</p> -->
                </div>
                <div class="top-mid">
                  <p class="min_top">
                    <span
                      class="likely__mun"
                    >{{ Number.isNaN( likely(item.possibility*100) ) ? 0 : likely(item.possibility*100)}}</span>
                    <span class="likely__fu">%</span>
                  </p>
                  <p class="min__min">相似度</p>
                  <p class="min__num">1号摄像头</p>
                </div>
                <div class="top-right">
                  <div class="img__box">
                    <img
                      :src="`data:image/png;base64,${item.angle_pic}`"
                      alt
                      class="img"
                      v-if="item.angle_pic"
                    />
                  </div>
                  <p class="recently__name">{{item.username}}</p>
                  <p class="recently__belong">所属:{{item.dept_name}}</p>
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
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      expires_in: "", //token失效时间
      loading: true,
      audioToken: "",
      audioCon: "",
      taskVal: "任务一", //任务名
      taskStatus: "", //任务状态
      type: "",
      id: "", //任务id
      isFull: false,
      weekArr: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      week: "",
      yearMonDay: "",
      taskNum: [
        { num: 1, active: true },
        { num: 4, active: false },
        { num: 9, active: false }
      ],
      fourClass: false,
      nineClass: false,
      showOne: true,
      showFour: false,
      showNine: false,
      //任务组合
      taskArr: [{ id: "", name: "" }],
      imagePath: "http://3dmaas.farsee2.com/image/api/v1/images",
      secVal: "",
      keyOne: false,
      imgLen: "",
      step: 0,
      imgArr: [],
      initData: {}, //初始数据
      bgImg: require("@/assets/img/new/bottom.png"),
      webSocket: null,
      webSocket1: null,

      imgBody: "",
      imgBody2: "",
      imgBody3: "",
      imgBody4: "",
      isFacing: false,
      timer1: null,
      timer2: null,
      timer3: null,
      timer4: null, //监听任务
      timekey4: true,
      likelying: "",
      sigleData: {},
      isLink: false,
      onLine: null,
      resultData: {
        facePic: null,
        possibility: null
      },
      recordList: [
        {
          facePic: null,
          possibility: null
        },
        {
          facePic: null,
          possibility: null
        },
        {
          facePic: null,
          possibility: null
        }
      ],
      possibility: null,
      rtsp: "",
      tableData: [
        "dsadsaxzx1111",
        "dsadsaxzx1",
        "dsadsaxzx2",
        "dsadsaxzx234",
        "dsadsaxzx222"
      ],
      tableDataId: [],
      deleteId: []
    };
  },
  created() {
    this.setWeek();
    this.onLine = window.navigator.onLine;
    this.type = this.$route.query.type;
    if (this.type == "single") {
      this.id = this.$route.query.id;
      // this.tableDataId.push(this.id);
      this.getTaskById(this.id);
    } else if (this.type == "all") {
      this.taskArr = JSON.parse(this.$route.query.data);
      this.id = this.taskArr[0].id;
      this.getTaskById(this.id);

      //    this.taskArr.forEach(item => {
      //   this.tableDataId.push(item.id);
      // });

      // this.rtsp = this.taskArr[0].java_addr;
      //this.taskVal = this.taskArr[0].name;
      // console.log(this.tableDataId);
      // this.getAudioToken(this.rtsp);
      // this.initSocket(this.rtsp);
      // this.getRocordList(this.rtsp);
      // this.fristInit(this.rtsp);
    }
    // this.watchData();
    this.yearMonDay = new Date().toLocaleDateString();
    this.timer2 = setInterval(() => {
      this.setWeek();
      this.yearMonDay = new Date().toLocaleDateString();
    }, 432000);
    this.initSocketByInfo();
  },

  mounted() {
    this.timer1 = setInterval(this.initTime, 1000);
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.clearInterval(this.timer1);
    window.clearInterval(this.timer2);
    window.clearTimeout(this.timer3);
    window.clearInterval(this.timer4);
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  computed: {},
  watch: {},
  methods: {
    //监听网络变化
    updateOnlineStatus(e) {
      let VM = this;
      const { type } = e;
      VM.onLine = type === "online";
      if (VM.onLine) {
        VM.initSocket(VM.rtsp);
      }
    },
    //全屏
    toFull() {
      let token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        this.$Message.error("账户已经退出");
        return;
      }
      if (!this.isLink) {
        this.$Message.error("没有连接服务");
        return;
      }
      this.isFull = true;
    },
    //退出全屏
    outFull() {
      this.isFull = false;
    },
    /**
     * @Author fyt
     * @Description 选择任务
     * @Date 2020-03-02 15:46:02 星期一
     */
    choseOne(data) {
      let VM = this;
      // console.log(data);
      // this.webSocket.close();
      this.recordList = [];
      this.imgArr = [];
      this.loading = true;
      this.initData = {};
      this.resultData = {};
      this.id = data.id;
      this.likelying = "";

      // if (!data.java_addr) {
      //   VM.rtsp = window.BASEURL.taspUrl;
      // } else {

      //   VM.rtsp = data.java_addr;
      // }
      // this.initSocket(this.rtsp);
      // this.getRocordList(this.rtsp);
      // this.fristInit(this.rtsp);

      this.getTaskById(this.id);
    },

    //获取任务信息
    getTaskById(data) {
      let VM = this;
      if (data) {
        this.$http.api
          .get(
            window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks/${data}`
          )
          .then(function(res) {
            if (res.data.code === 0) {
              let data = res.data.result;
              // console.log(data);
              VM.taskVal = data.name;
              if (!data.java_addr) {
                // VM.rtsp = window.BASEURL.taspUrl;
              } else {
                VM.rtsp = data.java_addr;
                // console.log(VM.rtsp);
              }
              if (VM.type == "single") {
                VM.taskArr = [data];
              }
              if (data.status == "待开启") {
                VM.$Message.error("该任务还未开启");
              }
              VM.getAudioToken(VM.rtsp);
              VM.initSocket(VM.rtsp);
              VM.getRocordList(VM.rtsp);
              VM.fristInit(VM.rtsp);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        // this.tableData = ['dsadsaxzx1111','dsadsaxzx1','dsadsaxzx2','dsadsaxzx234','dsadsaxzx222']

        this.$http.api
          .get(
            window.BASEURL.testUrl2 +
              `/face-task-manager/api/v1/tasks?taskType=1&pageNum=${1}&pageSize=${12}`
          )
          .then(function(res) {
            if (res.data.code === 0) {
              // VM.total = res.data.result.total;
              let data = res.data.result.list;
              if (data.length > 0) {
                let newData = [];
                data.forEach(item => {
                  newData.push(item.id);
                });
                console.log(newData);
                VM.tableDataId.forEach(item => {
                  let key = newData.includes(item);
                  if (!key) {
                    let key2 = VM.deleteId.includes(item);
                    if (!key2) {
                      VM.deleteId.push(item);
                      if (item == VM.id) {
                        console.log(item);
                        console.log(key2);
                        VM.$Message.error("任务已经删除");
                      }
                    }
                  }
                });
              } else {
                VM.$Message.error("无任务!");
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    /**
     * @Author fyt
     * @Description  监听任务是否删除
     * @Date 2020-03-07 18:31:04 星期六
     */
    watchData() {
      let VM = this;
      window.clearInterval(this.timer4);
      if (this.timekey4) {
        this.timer4 = setInterval(this.getTaskById, 4000);
      } else {
        window.clearInterval(this.timer4);
      }
    },

    //获取播放内容
    getAudioToken(data) {
      let VM = this;
      this.$http.api
        .get(`http://${data}` + `/police-recognition/api/v1/baidu/token`)
        .then(res => {
          if (res.status == 200) {
            let data = res.data.result;
            VM.audioToken = data.access_token;
            VM.expires_in = data.expires_in;
            let token1 = JSON.stringify({ token1: VM.audioToken });
            localStorage.setItem("token1", token1);
            //  console.log(VM.expires_in)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //播放音频
    voiceText(str, token) {
      // console.log(str, token);
      let audio = document.getElementById("audio");
      let url =
        "http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=1&tok=" +
        token +
        "&tex=" +
        str +
        "&vol=" +
        2 +
        "&per=" +
        3 +
        "&spd=" +
        3 +
        "&pit=" +
        9;
      //  console.log(str)
      audio.src = url;
    },
    //获取初始数据
    fristInit(data) {
      let VM = this;
      this.$http.api
        .get(
          `${
            window.BASEURL.testUrl2
          }/face-task-manager/api/v1/historyResults?pageNum=${1}&pageSize=${7}&flag=1&taskId=${
            VM.id
          }`
        )
        .then(res => {
          if (res.status == 200) {
            if (res.data.result.list.length > 0) {
              // VM.imgArr = res.data.result.list;
              VM.initData = res.data.result.list[0];
            } else {
              VM.initData = {
                facePic: null,
                possibility: null,
                username: null,
                dept_name: null
              };
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取历史记录
    getRocordList(data) {
      let VM = this;
      this.$http.api
        .get(
          `${
            window.BASEURL.testUrl2
          }/face-task-manager/api/v1/historyResults?pageNum=${1}&pageSize=${7}&flag=1&taskId=${
            VM.id
          }`
        )
        .then(res => {
          if (res.status == 200) {
            if (res.data.result.list.length > 0) {
              VM.imgArr = res.data.result.list;
              let data = res.data.result.list;
              VM.recordList = data.filter((ele, index) => {
                return index != 0;
              });
            } else {
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取new历史记录
    getRocordNews(data) {
      let VM = this;
      this.getRocordList(data);
      // this.$http.api
      //   .get(
      //     `http://${data}` +
      //       `/police-recognition/api/v1/historyResults?pageNum=${1}&pageSize=${1}&flag=1`
      //   )
      //   .then(res => {
      //     console.log(res)
      //     if (res.status == 200) {
      //       if (res.data.result.list.length > 0) {
      //         let a = 0;
      //         let data = res.data.result.list[0];

      //         if (data) {
      //           let str = `<li class="record-item active">
      //                             <div class="record-top">
      //                               <div class="top-left">
      //                                 <div class="img__box">
      //                                   <img
      //                                     src="data:image/png;base64,${
      //                                       data.facePic
      //                                     }"
      //                                     alt
      //                                     class="img"
      //                                   />
      //                                 </div>
      //                                 <p
      //                                   class="recently__time"
      //                                 >${
      //                                   new Date(data.createTime).getHours() > 9
      //                                     ? new Date(data.createTime).getHours()
      //                                     : "0" +
      //                                       (Number.isNaN(
      //                                         new Date(
      //                                           data.createTime
      //                                         ).getHours()
      //                                       )
      //                                         ? 0
      //                                         : new Date(
      //                                             data.createTime
      //                                           ).getHours())
      //                                 }:${
      //             new Date(data.createTime).getMinutes() > 9
      //               ? new Date(data.createTime).getMinutes()
      //               : "0" +
      //                 (Number.isNaN(new Date(data.createTime).getMinutes())
      //                   ? 0
      //                   : new Date(data.createTime).getMinutes())
      //           }:${
      //             new Date(data.createTime).getSeconds() > 9
      //               ? new Date(data.createTime).getSeconds()
      //               : "0" +
      //                 (Number.isNaN(new Date(data.createTime).getSeconds())
      //                   ? 0
      //                   : new Date(data.createTime).getSeconds())
      //           }</p>
      //                               </div>
      //                               <div class="top-mid">
      //                                 <p class="min_top active">
      //                                   <span
      //                                     class="likely__mun"
      //                                   >${
      //                                     Number.isNaN(data.possibility * 100)
      //                                       ? 0
      //                                       : Math.round(data.possibility * 100)
      //                                   }</span>
      //                                   <span class="likely__fu">%</span>
      //                                 </p>
      //                                 <p class="min__min">相似度</p>
      //                                 <p class="min__num">1号摄像头</p>
      //                               </div>
      //                               <div class="top-right">
      //                                 <div class="img__box">
      //                                   <img
      //                                     src="data:image/png;base64,${
      //                                       data.angle_pic
      //                                     }"
      //                                     alt
      //                                     class="img"
      //                                   />
      //                                 </div>
      //                                 <p class="recently__name">${
      //                                   data.username
      //                                 }</p>
      //                                 <p class="recently__belong">所属:${
      //                                   data.dept_name
      //                                 }</p>
      //                               </div>
      //                             </div>
      //                           </li>`;
      //           $(".record-box").prepend(str);
      //         }
      //       } else {
      //       }
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    //相似度函数
    likely(data) {
      let newdata = Math.floor(data);
      // let newdata = Math.floor(data / 4 + 75);
      if (newdata >= 100) {
        return newdata - 10;
      }
      return newdata;
    },

    initSocketByInfo() {
      let url = `ws://`+ window.BASEURL.socketUrl + `/face-task-manager/websocket`;
      this.webSocket1 = new WebSocket(url);
      this.webSocket1.onopen = this.webSocketOnOpen1;
      this.webSocket1.onclose = this.webSocketOnClose1;
      this.webSocket1.onmessage = this.webSocketOnMessage1;
      1;
      this.webSocket1.onerror = this.webSocketOnError1;
    },

    webSocketOnOpen1() {
      console.log("websocket1连接成功");
    },
    webSocketOnMessage1(res) {
      let data = JSON.parse(res.data);
      let faceLibAdd = data["faceLibAdd"]; //更新人脸库后,提示信息
      let delRecgTask = data["delRecgTask"]; //任务已经删除
      let stopRecgTask = data["stopRecgTask"];

      console.log("delRecgTask", delRecgTask);
      console.log("stopRecgTask", stopRecgTask);


      if (faceLibAdd) {
        let { num, present, current, failure, libId } = faceLibAdd;
        this.$Notice.info({
          title: "更新提示",
          desc: `导入总人数为${num}个,成功${present}个,失败${failure}个`,
          duration: 15
        });
      }
      if (delRecgTask) {
        this.$Notice.info({
          title: "更新提示",
          desc: `该任务已经删除`,
          duration: 15
        });
      }
      if (stopRecgTask) {
        this.$Notice.info({
          title: "更新提示",
          desc: `该任务已经结束`,
          duration: 15
        });
      }
    },
    // 关闭连接
    webSocketOnClose1() {
      this.loading = true;
      console.log("websocket1连接已关闭");
    },
    //连接失败的事件
    webSocketOnError1(res) {
      console.log(res);
      console.log("websocket1连接失败");
      // 打印失败的数据
    },

    // 建立连接
    initSocket(data) {
      // console.log(data);
      // let url = "ws://192.168.1.71:8277/face-task-manager/websocket";
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
      // console.log("data:", data);
      //退出账户后
      let token = JSON.parse(localStorage.getItem("token"));
      // console.log(data)
      if (!token) {
        this.loading = true;
        this.imgBody = "";
        this.initData = {};
        this.resultData = { facePic: null, possibility: null };
        this.recordList = [
          { facePic: null, possibility: null },
          { facePic: null, possibility: null },
          { facePic: null, possibility: null }
        ];
        this.imgArr = [];
        this.taskVal = "";
        this.likelying = 0;
        this.taskArr = [{ id: "", name: "" }];
        return;
      }
      if (!res) {
        // this.loading = true;
        // this.imgBody = "";
        // this.initData = {facePic: null,possibility: null,username: null,dept_name: null};
        // this.resultData = {facePic: null,possibility: null};
        // this.recordList = [{facePic: null,possibility: null},{facePic: null,possibility: null},{facePic: null,possibility: null}];
        // this.imgArr = [];
        // this.taskVal = "";
        // this.$Message.error("该任务已经删除");
        // return;
      }
      // console.log(data.rtsp_img);
      if (data.voice) {
        this.audioCon = data.voice;
        // console.log(data.voice);
        this.voiceText(this.audioCon, this.audioToken);
      }
      let rtsp_imgBody = data["rtsp_img"];
      let recg_result = data["recg_result"];
      // let faceLibAdd = data["faceLibAdd"]; //更新人脸库后,提示信息
      // let delRecgTask = data["delRecgTask"]; //任务已经删除
      // let stopRecgTask = data["stopRecgTask"];

      // console.log("delRecgTask", delRecgTask);

      // if (faceLibAdd) {
      //   let { num, present, current, failure, libId } = faceLibAdd;
      //   this.$Notice.info({
      //     title: "更新提示",
      //     desc: `导入总人数为${num}个,成功${present}个,失败${failure}个`,
      //     duration: 15
      //   });
      // }
      // if (delRecgTask) {
      //   this.$Notice.info({
      //     title: "更新提示",
      //     desc: `该任务已经删除`,
      //     duration: 15
      //   });
      // }
      // if (stopRecgTask) {
      //   this.$Notice.info({
      //     title: "更新提示",
      //     desc: `该任务已经结束`,
      //     duration: 15
      //   });
      // }

      if (rtsp_imgBody) {
        this.keyOne = true;
        this.isLink = true;
        this.imgBody = rtsp_imgBody.body;
        this.loading = false;
        // this.getRocordList(this.rtsp);
        // this.fristInit(this.rtsp);
      } else {
      }
      if (!recg_result) {
        return;
      } else {
        let last_angle_pic, last_facePic, last_md5;
        this.resultData.dept_name = recg_result.dept_name;
        this.resultData.username = recg_result.username;
        if (last_md5 == recg_result.md5) {
          this.resultData.angle_pic = last_angle_pic;
          this.resultData.facePic = last_facePic;
        } else {
          this.resultData.facePic = recg_result.facePic;
          this.resultData.angle_pic = recg_result.angle_pic;
          last_angle_pic = recg_result.angle_pic;
          last_facePic = recg_result.facePic;
          last_md5 = recg_result.md5;
        }
        this.resultData.md5 = recg_result.md5;
        this.resultData.createTime = recg_result.createTime;
        this.likelying =
          recg_result.possibility > this.possibility
            ? this.likely(recg_result.possibility * 100)
            : recg_result.possibility * 100;
        this.likelying = Math.floor(this.likelying);
        if (this.resultData.facePic) {
          // let obj = {
          //   facePic: recg_result.facePic,
          //   createTime: recg_result.createTime
          // };
          // this.imgArr.unshift(obj);
          // let str = `<li  class="intellList-item active">
          //           <div class="img__box">
          //             <img
          //               src="data:image/png;base64,${recg_result.facePic}"
          //               alt
          //               class="img-item"

          //             />
          //           </div>
          //           <div class="time__box">
          //             <span
          //               class="time"
          //             >${
          //               new Date(recg_result.createTime).getHours() > 9
          //                 ? new Date(recg_result.createTime).getHours()
          //                 : "0" +
          //                   (Number.isNaN(
          //                     new Date(recg_result.createTime).getHours()
          //                   )
          //                     ? 0
          //                     : new Date(recg_result.createTime).getHours())
          //             }:${
          //   new Date(recg_result.createTime).getMinutes() > 9
          //     ? new Date(recg_result.createTime).getMinutes()
          //     : "0" +
          //       (Number.isNaN(new Date(recg_result.createTime).getMinutes())
          //         ? 0
          //         : new Date(recg_result.createTime).getMinutes())
          // }:${
          //   new Date(recg_result.createTime).getSeconds() > 9
          //     ? new Date(recg_result.createTime).getSeconds()
          //     : "0" +
          //       (Number.isNaN(new Date(recg_result.createTime).getSeconds())
          //         ? 0
          //         : new Date(recg_result.createTime).getSeconds())
          // }</span>
          //           </div>
          //         </li>`;
          // $(".slidelist-box").prepend(str);
          this.isFacing = true;
          this.initData = {};
          this.getRocordNews(this.rtsp);
          this.timer3 = setTimeout(() => {
            this.isFacing = false;
          }, 1500);
        }
      }
    },
    // 关闭连接
    webSocketOnClose() {
      this.loading = true;
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
      this.webSocket1.close();
    },
    setWeek() {
      this.week = this.weekArr[new Date().getDay()];
    },
    initTime() {
      var spans = document.getElementsByClassName("one");
      var date = new Date();
      for (var i = 0; i < spans.length; i++) {
        var str =
          this.toDouble(date.getHours()) +
          this.toDouble(date.getMinutes()) +
          this.toDouble(date.getSeconds());
        spans[i].innerHTML = str.charAt(i);
      }
    },
    toDouble(number) {
      if (number < 10) {
        return "0" + number;
      } else return "" + number;
    },
    //选择几路
    choseTask(data) {
      this.taskNum[data].active = true;
      this.taskNum.forEach((item, index) => {
        if (index != data) {
          item.active = false;
        }
      });
      if (data == 0) {
        this.nineClass = false;
        this.fourClass = false;

        this.showNine = false;
        this.showFour = false;
        this.showOne = true;
      }
      if (data == 1) {
        this.fourClass = true;
        this.nineClass = false;

        this.showFour = true;
        this.showOne = false;
        this.showNine = false;
      }
      if (data == 2) {
        this.nineClass = true;
        this.fourClass = false;

        this.showFour = false;
        this.showNine = true;
        this.showOne = false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/layout/face3.scss";
</style>