<template>
  <div class="video__warpper" v-show="con">
    <div class="video__con">
      <div class="video__nav">
        <m-crums :con="crumsData" />
        <!-- <div class="crums-wrapper">
          <img src="../../assets/img/goback.png" alt=""  @click="goBack" class="img">
          <span class="crums-now1"  @click="goBack">返回</span>
          <span class="crums-now">当前页面:</span>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>三维人像应用</el-breadcrumb-item>
            <el-breadcrumb-item>视频识别</el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div> -->
        <div class="detail__box">
          <div class="detail__img">
            <img :src="`${imgUrl}/${obj.angleImg}`" alt class="img" />
          </div>
          <div class="detail__left">
            <p class="item__box">
              <span class="name">姓名:</span>
              <span class="name">{{obj.username}}</span>
            </p>
            <p class="item__box">
              <span class="sex">性别:</span>
              <span class="sex">{{obj.sex == 1 ? '男' : '女'}}</span>
            </p>
            <p class="item__box">
              <span class="collect">采集编号:</span>
              <span class="collect">{{obj.id}}</span>
            </p>
            <p class="item__box">
              <span class="idNo">证件号:</span>
              <span class="idNo">{{obj.idCard}}</span>
            </p>
            <p class="item__box">
              <span class="time">采集时间:</span>
              <span class="time">{{ new Date(obj.createTime).toLocaleString() }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="video__imgBox">
        <p class="VDetalis__nav">
          <span :class="[`fDetalis__item`,{'active':oneKey}]" @click="goFive">Top50 帧</span>
          <span :class="[`fDetalis__item`,{'active':twoKey}]" @click="goAll">全部识别帧</span>
        </p>
        <div class="fDetalis__con">
          <div
            class="img__box"
            v-for="(item,index) in resultArr"
            :key="index"
            @click="wacthEvery(item,index)"
          >
            <!-- <img
              :src="`${imgUrl}/${item.frameId}?w=${item.w < 30 ?  item.w * 2.5 : item.w }&h=${item.w < 30 ?  item.h * 2.5 : item.h}&x=${item.w < 30 ?  item.x - item.w  : item.x}&y=${item.w < 30 ?  item.y - item.h  : item.h}`"
              alt
              class="item__img"
            /> -->
             <img
              :src="`${imgUrl}/${item.frameId}?w=${ item.w * 2}&h=${ item.h *2}&x=${item.x - item.w/2 }&y=${ item.y - item.h /2}`"
              alt
              class="item__img"
            />
            <p class="info">
              <!-- <span class="cri">●</span> -->
              <span class="posibility">相似度:{{ ((item.possibility* 100).toFixed(2)) }}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="Vdetail__wrapper" v-show="dialogKey">
      <div class="Vdetail__con">
        <div class="title__box">
          <span class="title__w">图片详情</span>
          <i class="el-icon-close close" @click="close"></i>
        </div>
        <div class="img__box" id="img__box">
          <canvas class="canvasId2" id="canvasId2"></canvas>
          <i class="el-icon-arrow-left v__left" @click="left"></i>
          <i class="el-icon-arrow-right v__right" @click="right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
export default {
  props: ["con"],
  data() {
    return {
      oneKey: true,
      twoKey: false,
      dialogKey: false,
      obj: {
        angleImg: '',
      },
      index: 0,
      imgUrl: "",
      pageNum: 1,
      pageSize: 50,
      resultArr: [],
      crumsData: {
        one: "三维人像应用",
        two: "视频识别",
        thr:'详情',
        now:1,
        pathGP:'detail'
      },
      w: 0,
      h: 0
    };
  },
  computed: {},
  created() {
    this.imgUrl = window.BASEURL.imgUrl;
    let detail = JSON.parse(localStorage.getItem("detail"));
    if (detail) {
      this.obj = detail;
      this.getData();
    }
  },
  mounted() {},
  watch: {},
  methods: {
    //返回
    goBack() {
       this.$parent.everyDetailKey = false;
       this.resultArr = [];
       this.$parent.videoHomeKey = true;
    },
    goFive() {
      this.oneKey = true;
      this.twoKey = false;
      this.pageSize = 50;
      this.getData();
    },
    goAll() {
      this.oneKey = false;
      this.twoKey = true;
      this.pageSize = 60;
      this.getData();
    },
    wacthEvery(data, i) {
      this.dialogKey = true;
      this.index = i;
      if (this.dialogKey) {
        let result = [data];
        let img = data.frameId;
        this.createdImg(img, result);
      }
    },
    getData() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/imgRecg?taskId=${VM.obj.taskId}&username=${VM.obj.username}&pageNum=${VM.pageNum}&pageSize=${VM.pageSize}`
        )
        .then(res => {
          if (res.status == 200) {
            let data1 = res.data.result.list;
            VM.resultArr = data1;
            // console.log(data1);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close() {
      this.clearCans();
      this.index = 0;
      this.dialogKey = false;
    },
    clearCans() {
      let canvas = document.getElementById("canvasId2");
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.w, this.h);
    },
    createdImg(imgUrl1, data) {
      let len = data.length;
      let VM = this;
      let canvas = document.getElementById("canvasId2");
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = `${this.imgUrl}/${imgUrl1}`;
      let spX, spY;
      let W = $("#img__box").width();
      let H = $("#img__box").height();
      img.onload = function() {
        let imgW = img.width;
        let imgH = img.height;
        // console.log(imgW);
        // console.log(imgH);
        let targetW, targetH;
        spX = W / img.width;
        spY = H / img.height;
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

        canvas.width = targetW;
        canvas.height = targetH;
        VM.w = targetW;
        VM.h = targetH;
        // console.log(canvas.width);
        // console.log(canvas.height);
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
    left() {
      if (this.index == 0) {
        this.$message({
          message: "已到第一张",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      this.clearCans();
      this.index--;
      let data = this.resultArr[this.index];
      let result = [data];
      let img = data.frameId;
      this.createdImg(img, result);
    },
    right() {
      if (this.index == this.resultArr.length - 1) {
        this.$message({
          message: "已到最后一张",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      this.clearCans();
      this.index++;
      let data = this.resultArr[this.index];
      let result = [data];
      let img = data.frameId;
      this.createdImg(img, result);
    }
  },
  components: {
    MCrums
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumUse/videoDetail.scss";
</style>
