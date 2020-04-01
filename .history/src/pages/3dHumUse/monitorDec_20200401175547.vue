<template>
  <div class="videoR-warpper">
    <m-ms :con="tipsData" />
    <div class="videoR-content" v-show="videoHomeKey">
      <div class="left">
        <div class="left__wrap">
          <div class="title__box">
            <m-crums :con="crumsData" />
          </div>
          <div
            class="upload__box"
            v-loading="uploading"
            :element-loading-text="((reging) && (percent != 100)) ? '正在识别...' : '上传中...'"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <img
              src="../../assets/img/delete.png"
              alt
              class="delete__img"
              v-show="percent == 100 || closeKey"
              @click="close"
            />
            <img src="../../assets/img/img3/image2.png" alt class="no__img" v-if="btnKey" />
            <button class="btn" @click="uploadFile2" v-if="btnKey">
              导入视频
              <input
                type="file"
                hidden
                @change="beforeUploadFile2($event)"
                id="upload_file2"
                class="file-inp"
              />
            </button>
            <span v-if="btnKey" class="toplic">请导入mp4或avi格式的视频</span>
            <canvas class="canvasId" v-show="regImgKey"></canvas>

            <div class="slider__box">
              <m-slider :min="0" :max="frameNum" :show="sliderKey" ref="slider" :value="percent" />
            </div>
          </div>
        </div>
        <div class="target__box">
          <div class="title1">
            识别目标
            <span class="sub__con" v-show="smallArr.length > 0 ">(共有{{smallArr.length}}个识别目标)</span>
          </div>
          <div class="target__detail" v-if="detailKey">
            <p class="detail__title">
              <span class="title">图片详情</span>
              <i class="el-icon-close" @click="choseDetail"></i>
            </p>
            <div class="detail__con">
              <div class="right__left">
                <img
                  :src="`${imgUrl}/${itemObj.frameId}?w=${itemObj.w}&h=${itemObj.h}&x=${itemObj.x}&y=${itemObj.y}`"
                  alt
                  class="item__img"
                />
              </div>
              <!-- <img :src="`${imgUrl}2460a2c49192251593592c7dd41edea6_file/1111.jpg`" v-if="item.possibility > 0.2"/> -->
              <div class="right__mid">
                <p class="isLibrary__name">{{itemObj.username}}</p>
                <p class="isLibrary__collect">采集编号</p>
                <p class="isLibrary__num">{{itemObj.id}}</p>
                <p class="isLibrary__box">相似度:{{ ((itemObj.possibility* 100).toFixed(2)) }}%</p>
                <!-- <p class="notLibrary" v-if="item.possibility < 0.2">非库中</p>
                    <p class="notLibrary" v-if="item.possibility < 0.2">人员</p>
                    <p class="isLibrary__name" v-if="item.possibility > 0.2">{{item.usename}}</p>
                    <p class="isLibrary__collect" v-if="item.possibility > 0.2">采集编号</p>
                    <p class="isLibrary__num" v-if="item.possibility > 0.2">{{item.id}}</p>
                <p class="isLibrary__box" v-if="item.possibility > 0.2">相似度:{{ (item.possibility.toFixed(2)) * 100 }}%</p>-->
              </div>
              <div class="right__right">
                <img :src="`${imgUrl}/${itemObj.angleImg}`" alt class="item__img" />
                <!-- <img
                    :src="`${imgUrl}/${Md5}?w=${item.w}&h=${item.h}&x=${item.x}&y=${item.y}`"
                    alt
                    class="item__img"
                />-->
              </div>
            </div>
          </div>
          <ul :class="['recently__box',{'now':smallArr.length > 0}]">
            <span class="no__recently" v-if="uploading">识别未开始，暂无目标</span>
            <span class="no__recently" v-show="smallArr.length == 0 && !uploading">未检测到目标人脸</span>
            <template v-for="(item,index) in smallArr">
              <li class="recently__item" :key="index" @click="watchDetail(item)">
                <img
                  :src="`${imgUrl}/${EeveyMd5}?w=${item.w}&h=${item.h}&x=${item.x}&y=${item.y}`"
                  alt
                  class="item__img"
                />
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="r__title">
          <span class="r__titleW">
            识别结果
            <span class="sub__con" v-show="videoArr.length > 0 ">(共有{{videoArr.length}}个识别结果)</span>
          </span>
          <div class="r__titleR">
            <span class="r__titleRw" v-show="uploading&&!reging">上传中...</span>
            <span class="r__titleRw" v-show="(reging) && (percent != 100)">正在识别...</span>
            <span class="r__titleRw" v-show="hasReged">识别完成</span>
            <el-progress type="circle" :percentage="percent" :width="35"></el-progress>
            <el-button
              type="primary"
              size="mini"
              round
              class="screen"
              @click="screen"
              v-if="percent == 100"
            >筛选</el-button>
          </div>
        </div>
        <div :class="['right__con',{'now':videoArr.length > 0}]">
          <m-screen :con="screenData" ref="screen" />
          <span class="no__result" v-if="videoArr.length == 0">暂无识别结果</span>
          <ul :class="['right__conBox']" v-if="!isScreen">
            <template v-for="(item,index) in videoArr ">
              <li class="right__item" :key="index" @click="goTo(item.list[0])">
                <div class="right__left">
                  <img
                    :src="`data:image/png;base64,${item.list[0].angleImg}`"
                    alt
                    class="item__img"
                  />
                  <!-- <img :src="`${imgUrl}/${item.list[0].angleImg}`" alt class="item__img" /> -->
                </div>
                <div class="right__mid">
                  <p class="notLibrary" v-if="0">非库中</p>
                  <p class="notLibrary" v-if="0">人员</p>
                  <p class="isLibrary__name" v-if="1">{{item.username}}</p>
                  <p class="isLibrary__collect" v-if="1">采集编号</p>
                  <p class="isLibrary__num" v-if="1">{{item.list[0].id}}</p>
                  <p
                    class="isLibrary__box"
                    v-if="1"
                  >相似度:{{((item.list[0].possibility* 100).toFixed(2))}}%</p>
                </div>

                <div class="right__right">
                  <div class="img__box" v-if="item.list[0].w < 56">
                    <el-badge :value="item.num" :max="1000" class="item__badge"></el-badge>
                    <img
                      :src="`${imgUrl}/${item.list[0].frameId}?w=${item.list[0].w}&h=${item.list[0].h}&x=${item.list[0].x}&y=${item.list[0].y}`"
                      alt
                      class="item__img"
                    />
                  </div>
                  <div class="img__box" v-if="item.list[0].w > 56">
                    <el-badge :value="item.num" :max="1000" class="item__badge"></el-badge>
                    <img
                      :src="`${imgUrl}/${item.list[0].frameId}?w=${item.list[0].w}&h=${item.list[0].h}&x=${item.list[0].x}&y=${item.list[0].y}`"
                      alt
                      :class="['item__img',{'img__big':(item.list[0].w > 56) && (item.list[0].h / item.list[0].w < 1.68 )}]"
                    />
                  </div>
                </div>
              </li>
            </template>
          </ul>

          <ul :class="['right__conBox']" v-if="isScreen">
            <template v-for="(item,index) in videoArr ">
              <li class="right__item" :key="index" @click="goTo(item)">
                <div class="right__left">
                  <img :src="`data:image/png;base64,${item.angleImg}`" alt class="item__img" />
                  <!-- <img :src="`${imgUrl}/${item.list[0].angleImg}`" alt class="item__img" /> -->
                </div>
                <div class="right__mid">
                  <p class="notLibrary" v-if="0">非库中</p>
                  <p class="notLibrary" v-if="0">人员</p>
                  <p class="isLibrary__name" v-if="1">{{item.username}}</p>
                  <p class="isLibrary__collect" v-if="1">采集编号</p>
                  <p class="isLibrary__num" v-if="1">{{item.id}}</p>
                  <p class="isLibrary__box" v-if="1">相似度:{{((item.possibility* 100).toFixed(2))}}%</p>
                </div>

                <div class="right__right">
                  <div class="img__box" v-if="item.w < 56">
                    <el-badge :value="item.num" :max="1000" class="item__badge"></el-badge>
                    <img
                      :src="`${imgUrl}/${item.frameId}?w=${item.w}&h=${item.h}&x=${item.x}&y=${item.y}`"
                      alt
                      class="item__img"
                    />
                  </div>
                  <div class="img__box" v-if="item.w > 56">
                    <el-badge :value="item.num" :max="1000" class="item__badge"></el-badge>
                    <img
                      :src="`${imgUrl}/${item.frameId}?w=${item.w}&h=${item.h}&x=${item.x}&y=${item.y}`"
                      alt
                      :class="['item__img',{'img__big':(item.w > 56) && (item.h / item.w < 1.68 )}]"
                    />
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <m-detail :con="everyDetailKey" ref="detail" />
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MSlider from "@/components/ms/slider.vue";
import MDetail from "@/pages/3dHumUse/videoDetail.vue";
import MScreen from "@/components/ms/screen.vue";
import MMs from "@/components/ms/tips.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      hasFace: false, //是否有人脸
      hasFaceArr: [],
      hasUpload: true,
      isScreen: false, //是否筛选
      btnKey: true, //上传按钮
      detailKey: false, //识别目标key
      sliderKey: false, //进度条key
      regImgKey: false, //canvaskey
      uploading: false, //正在上传
      reging: false, //正在识别
      hasReged: false, //正在完成
      closeKey: false,
      videoHomeKey: true,
      everyDetailKey: false, //
      firstGet: true,
      crumsData: {
        one: "三维人像应用",
        two: "视频识别"
      },
      itemObj: {}, //识别目标
      Md5: "",
      file: "",
      chunkSize: 1024 * 2 * 1024, // 指定文件分块大小(2M)
      chunks: "", // 计算文件分块总数
      currentChunk: 0, // 指定当前块指针
      fileReader: "", // 创建文件读取对象
      blobSlice: "", // 根据浏览器获取文件分割方法
      spark: "", //创建MD5计算对象
      start: "",
      end: "",
      timer1: null, //status不为5时一直拿
      notLibrary: false,
      imgUrl: "",
      frameNum: 0, //总帧数
      realFrameNum: 0,
      timer2: null, //size!=frameNum时一直拿

      percent: 0, //进度条百分比
      EeveyMd5: "",
      smallArr: [], //小图数组
      videoArr: [], //识别结果
      timer3: null, //识别结果定时器
      tipsData: {
        key: false,
        c: "视频",
        severNum: "",
        severStatus: null,
        type: ""
      },
      screenData: {
        key: false
      }
    };
  },
  computed: {
    ...mapState(["vkey1", "vkey2", "isDiscernde"])
  },
  created() {
    this.imgUrl = window.BASEURL.imgUrl;
    this.getServerStatus();
    if (this.isDiscernde) {
      let md5;
      md5 = window.localStorage.getItem("video_md5");
      this.query1(md5);
      this.Md5 = md5;
    }
  },
  beforeDestroy() {
    let VM = this;
    window.clearTimeout(VM.timer1);
    window.clearTimeout(VM.timer2);
    window.clearTimeout(VM.timer3);
    VM.timer1 = null;
    VM.timer2 = null;
    VM.timer3 = null;
  },
  methods: {
    ...mapMutations(["changVkey1", "changVkey2", "changeDiscern"]),

    /**
     * @Author fyt
     * @Description 通过人脸库筛选
     * @Date 2020-03-16 17:28:46 星期一
     */

    screenByLibs(data) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/recg?libIds=${data}&taskId=${VM.Md5}`
        )
        .then(res => {
          let data = res.data;
          if (data.code == 0) {
            if (data) {
              if (data.result.length > 0) {
                VM.videoArr = data.result;
                VM.isScreen = true;
                VM.screenData.key = !this.screenData.key;
                VM.$refs.screen.reset();
                VM.$Message.success(
                  `根据人脸库筛选成功,共有${data.result.list.length}个结果！`
                );
              } else {
                VM.screenData.key = !this.screenData.key;
                VM.$refs.screen.reset();
                VM.$Message.error(`根据人脸库筛选结果为0个`);
                VM.videoArr = [];
              }
            } else {
            }
          } else {
            VM.$Message.error(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /**
     * @Author fyt
     * @Description 筛选
     * @Date 2020-03-11 11:15:56 星期三
     */

    screen() {
      this.screenData.key = !this.screenData.key;
      this.screenData.form = "video";
      if (this.screenData.key) {
        this.$refs.screen.getLibrary();
      }
    },

    /**
     * @Author fyt
     * @Description 查看服务是否开启
     * @Date 2020-03-10 12:56:05 星期二
     */
    getServerStatus() {
      let VM = this;
      this.$http.api
        .post(`${window.BASEURL.serverUrl}/facerecog/api/v1/getserviceinfo`, {
          headers: { "Content-Type": "application/json" },
          timeout: 15000
        })
        .then(function(res) {
          if (res.status == 200 && res.statusText == "OK") {
            let data = res.data;
            VM.tipsData.key = true;
            VM.tipsData.type = "status";
            if (data.lauch == 1) {
              // VM.tipsData.severNum = data[3];
              // VM.tipsData.severStatus = "suc";

              if (data[3] > 0) {
                VM.tipsData.severNum = data[3];
                VM.tipsData.severStatus = "suc";
              } else {
                VM.tipsData.severStatus = "false";
              }
            } else if (data.lauch == 0) {
              VM.tipsData.severStatus = "false";
            }
          }
        })
        .catch(function(error) {
          VM.tipsData.key = true;
          VM.tipsData.type = "status";
          VM.tipsData.severStatus = "false";
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 关闭
     * @Date 2020-03-10 12:56:20 星期二
     */

    close() {
      if (this.percent == 100) {
        this.closed();
      } else {
        this.tipsData.key = true;
        this.tipsData.type = "close";
      }
    },

    /**
     * @Author fyt
     * @Description 关闭后的操作
     * @Date 2020-03-10 12:57:49 星期二
     */
    closed() {
      window.localStorage.removeItem("detail");
      if (this.percent != 100) {
        this.closeQu(this.Md5);
        return;
      }
      this.reSet();
    },
    /**
     * @Author fyt
     * @Description
     * @Date 2020-03-16 20:52:57 星期一
     */

    reSet() {
      window.clearTimeout(this.timer1);
      window.clearTimeout(this.timer2);
      window.clearTimeout(this.timer3);
      this.timer1 = null;
      this.timer2 = null;
      this.timer3 = null;
      this.hasUpload = true;
      this.btnKey = true;
      this.detailKey = false;
      this.sliderKey = false; //进度条key
      this.regImgKey = false; //canvaskey
      this.uploading = false; //正在上传
      this.reging = false; //正在识别
      this.hasReged = false; //正在完成
      this.closeKey = false;
      this.percent = 0;
      this.frameNum = 0;
      this.realFrameNum = 0;
      this.frameNum = 0;
      this.smallArr = [];
      this.videoArr = [];
      this.end = "";
      this.start = "";
      this.Md5 = "";
      this.EeveyMd5 = "";
      this.chunks = "";
      this.currentChunk = 0;
      this.isScreen = false;
      this.$refs.slider.distance = 0;
    },

    /**
     * @Author fyt
     * @Description 关闭该任务
     * @Date 2020-03-15 10:48:58 星期天
     */

    closeQu(data) {
      let VM = this;
      this.$http.api
        .delete(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/recgTasks/${data}`
        )
        .then(res => {
          if (res.data.code == 0) {
            VM.$notify({
              title: "提示",
              message: `${res.data.msg}`,
              duration: 2500,
              customClass: "zZindex_f",
              type: "success"
            });
            setTimeout(() => {
              window.history.go(0);
              VM.reSet();
            }, 1500);
          } else {
            VM.$notify({
              title: "提示",
              message: `${res.data.msg},还在继续识别!`,
              duration: 2500,
              customClass: "zZindex_f",
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //获取视频识别结果
    getVideoResult(data) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/recg?taskId=${data}`
        )
        .then(res => {
          if (res.status == 200) {
            let data1 = res.data.result;
            VM.videoArr = data1;
            // console.log(VM.videoArr)
            // console.log(data1.list)
            if (VM.percent != 100) {
              window.clearTimeout(VM.timer3);
              VM.timer3 = window.setTimeout(VM.getVideoResult(VM.Md5), 10000);
            } else {
              window.clearTimeout(VM.timer3);
              VM.timer3 = null;
              if (data1.length === 0) {
                VM.$notify({
                  title: "提示",
                  message: `该视频未检测到人脸`,
                  duration: 3000,
                  customClass: "zZindex_f",
                  type: "error"
                });
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //看某一个目标详情
    watchDetail(data) {
      this.itemObj = data;
      this.detailKey = true;
    },
    //关闭一个目标详情
    choseDetail() {
      this.detailKey = false;
    },
    //看一个识别目标详情
    goTo(data) {
      this.everyDetailKey = true;
      this.videoHomeKey = false;
      this.$refs.detail.obj = data;
      this.$refs.detail.getData();
      localStorage.setItem("detail", JSON.stringify(data));
      // this.$router.push({ name: "videoDetail", params: { obj: data } });
    },
    //上传视频事件函数
    uploadFile2() {
      let file = document.getElementById("upload_file2");
      if (this.tipsData.severStatus == "false" || !this.tipsData.severStatus) {
        this.$Message.error(`识别服务没有开启,不能上传视频!`);
        return;
      } else {
        file.click();
      }
    },
    //上传视频事件函数
    beforeUploadFile2(e) {
      let VM = this;
      let endName = e.target.files[0].name.split(".")[1];
      let startName = e.target.files[0].name.split(".")[0];
      if (endName != "mp4" && endName != "avi") {
        VM.$Message.error(`上传视频格式不对!`);
        return;
      }
      if (!document.getElementById("upload_file2").files[0]) {
        return;
      }
      this.btnKey = false;
      this.uploading = true;
      console.log(this.btnKey);
      this.file = document.getElementById("upload_file2").files[0];
      this.chunks = Math.ceil(this.file.size / this.chunkSize);
      this.fileReader = new FileReader();
      this.blobSlice =
        File.prototype.mozSlice ||
        File.prototype.webkitSlice ||
        File.prototype.slice;
      this.spark = new SparkMD5.ArrayBuffer();
      this.loadNext();
      this.fileReader.onload = function() {
        VM.spark.append(this.result);
        VM.currentChunk += 1;
        if (VM.currentChunk < VM.chunks) {
          VM.loadNext();
        } else {
          VM.Md5 = VM.spark.end();
          window.localStorage.setItem("video_md5", VM.Md5);
          VM.query(VM.Md5, e.target.files[0].name, e.target.files[0]);
        }
      };
    },
    //读视频
    loadNext() {
      this.start = this.currentChunk * this.chunkSize;
      this.end =
        this.start + this.chunkSize >= this.file.size
          ? this.file.size
          : this.start + this.chunkSize;
      this.fileReader.readAsArrayBuffer(
        this.blobSlice.call(this.file, this.start, this.end)
      );
    },
    //查询任务
    query(data, name, file) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks/${data}`
        )
        .then(res => {
          let data1 = res.data;
          if (data1.code == 421) {
            console.log("没有任务");
            VM.created(data, name, file);
          } else if (data1.code == 0) {
            console.log("有任务");
            VM.query1(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //有任务，查任务
    query1(data) {
      let VM = this;
      this.frameNum = 0;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks/${data}`
        )
        .then(res => {
          let data1 = res.data;
          if (data1.code == 0) {
            let data2 = data1.result;
            let status = data2.status;
            if (status != 5) {
              window.clearTimeout(VM.timer1);
              VM.timer1 = window.setTimeout(VM.query1(data), 1000);
            } else {
              window.clearTimeout(VM.timer1);
              VM.changeDiscern({ val: true });
              VM.queryFather(data);
              VM.frameNum = data2.frameNum;
              VM.$refs.slider.TotalFrame = data2.frameNum;
              console.log("frameNum:", VM.frameNum);
            }
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查父任务
    queryFather(data) {
      let VM = this;

      window.clearTimeout(VM.timer2);
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/tasks?status=5&pid=${data}`
        )
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            let resData = Object.keys(res.data.result).length;
            // let {hasFace} = res.data.result;
            // VM.hasFaceArr.push(hasFace);

            // let realFrameNum, realFrameNumTime, len, list;
            let len, list;
            if (resData == 0) {
              VM.realFrameNum = 0;
              len = 0;
            } else {
              VM.realFrameNum = res.data.result.realFrameNum;
              list = res.data.result.list;
              len = list.length;
            }
            VM.percent = Math.floor((VM.realFrameNum / VM.frameNum) * 100);
            if (VM.realFrameNum != VM.frameNum) {
              console.log(VM.realFrameNum);
              window.clearTimeout(VM.timer2);
              VM.timer2 = window.setTimeout(VM.queryFather(data), 1000);

              if (len == 0) {
                return;
              }
              if (VM.firstGet) {
                let id = list[0].id;
                VM.EeveyMd5 = id;
                VM.querySon(id, "onframe");
                VM.firstGet = false;
              }
            } else {
              console.log(`相等`);
              // let hasFaceKey = VM.hasFaceArr.every((item)=>{
              //    return item === 0
              // })
              // if(hasFaceKey){
              //      VM.$Message.error(`该视频未检测到人脸!`);
              // }
              VM.changeDiscern({ val: false });
              VM.firstGet = true;
              VM.reging = false;
              VM.hasReged = true;
              let id = list[0].id;
              VM.EeveyMd5 = id;
              VM.querySon(id, "onframe");
              window.clearTimeout(VM.timer2);
              window.clearTimeout(VM.timer3);
              VM.timer2 = null;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查子任务
    querySon(data, name, drie) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/imgRecg?frameId=${data}`
        )
        .then(res => {
          if (res.status == 200) {
            VM.smallArr = res.data.result.list;
            // console.log(VM.smallArr);
            VM.regImgKey = true;
            VM.sliderKey = true;
            VM.uploading = false;
            VM.reging = true;
            VM.closeKey = true;
            VM.createdImg(data, VM.smallArr);
            if (drie == "prev") {
              VM.changVkey1({ val: false });
            }
            if (drie == "next") {
              VM.changVkey2({ val: false });
              console.log(VM.vkey2);
              console.log("进来了");
            }
            if (name == "onframe") {
              VM.getVideoResult(VM.Md5);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //根据帧来查
    queryByFrame(data, drie) {
      if (data == 0) {
        data = 1;
      }
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/tasks?status=5&pid=${VM.Md5}&frameNum=${data}`,
          {},
          { timeout: 30000 }
        )
        .then(res => {
          if (res.status == 200) {
            // console.log(res.data.result.list);
            let id = res.data.result.list[0].id;
            VM.EeveyMd5 = id;
            // VM.clearCans();
            VM.querySon(id, "frame", drie);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
    //创建容器
    created(Data, Name, File) {
      // let Url = `v1/AUTH_FS2Face/${Data}_file`
      let Url = `oss/v1/AUTH_FS2Face/${Data}_file`;
      let VM = this;
      VM.$http.api
        .put(
          Url,
          {},
          {
            headers: { "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a" }
          }
        )
        .then(res => {
          console.log("创建容器");
          if (res.status == 201 || res.status == 202) {
            VM.upLoad(Data, Name, File);
          } else {
            VM.$Message.error(`创建容器失败`);
          }
        })
        .catch(function(error) {
          // VM.$Message.error(`创建容器失败`);

          console.log(error);
        });
    },
    //上传视频
    upLoad(DATA, NAME, FILE) {
      // console.log(DATA, NAME, FILE);
      let Url = `oss/v1/AUTH_FS2Face/${DATA}_file/${NAME}`;
      let VM = this;
      VM.$http.api
        .put(Url, FILE, {
          headers: { "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a" },
          timeout: 1000 * 60 * 30
        })
        .then(res => {
          if (res.status == 201) {
            console.log("上传视频");
            VM.createdTask(DATA, NAME);
          } else {
            VM.$Message.error(`上传视频失败`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //创建任务
    createdTask(id, fileName) {
      let VM = this;
      let params = {
        taskType: 3,
        id,
        fileAddr: `FS2Face/${id}_file/${fileName}`
      };
      VM.$http.api
        .post(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks`,
          params
        )
        .then(res => {
          if (res.status == 200) {
            console.log("创建任务成功");
            VM.query1(id);
          } else {
            VM.$Message.error(`创建任务失败`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 画框
     * @Date 2020-03-18 14:12:31 星期三
     */
    createdImg(imgUrl1, data) {
      let VM = this;
      let len = data.length;
      let canvas = document.getElementsByClassName("canvasId")[0];
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = `${this.imgUrl}/${imgUrl1}`;
      let spX, spY;
      let W = $(".upload__box").width();
      let H = $(".upload__box").height();
      img.onload = function() {
        let imgW = img.width;
        let imgH = img.height;
        let targetW, targetH;
        spX = W / img.width;
        spY = H / img.height;
        // console.log('img.width',img.width);
        // console.log('img.height',img.height);
        if (imgW > W) {
          targetW = imgW * spX;
          targetH = imgH * spX;
          if (imgH > H) {
            targetW = imgW * spX;
            targetH = imgH * spX;
          }
        } else {
          if (imgH > H) {
            targetW = imgW * spY;
            targetH = imgH * spY;
          } else {
            targetW = imgW;
            targetH = imgH;
          }
        }
        // console.log(spX);
        // console.log(spY);
        // console.log(targetW);
        // console.log(targetH);

        canvas.width = targetW;
        canvas.height = targetH;
        VM.w = targetW;
        VM.h = targetH;
        ctx.drawImage(img, 0, 0, targetW, targetH);
        ctx.strokeStyle = "#FF0000";
        ctx.strokeWidth = 1;
        ctx.lineWidth = 2;
        if (len > 0) {
          if (imgW > W && imgH < H) {
            // console.log(1);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spX,
                item.y * spX,
                item.w * spX,
                item.h * spX
              );
            });
          } else if (imgW > W && imgH > H) {
            // console.log(2);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spX,
                item.y * spX,
                item.w * spX,
                item.h * spX
              );
            });
          } else {
            if (imgH > H) {
              // console.log(3);
              data.forEach((item, index) => {
                ctx.strokeRect(
                  item.x * spY,
                  item.y * spY,
                  item.w * spY,
                  item.h * spY
                );
              });
            } else {
              // console.log(4);
              data.forEach((item, index) => {
                ctx.strokeRect(item.x, item.y, item.w, item.h);
              });
            }
          }
        }
      };
    },
    //清理画框
    clearCans() {
      let canvas = document.getElementsByClassName("canvasId")[0];
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.w, this.h);
    }
  },
  components: {
    MCrums,
    MSlider,
    MDetail,
    MMs,
    MScreen
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/3dHumUse/monitorDec.scss";
</style>