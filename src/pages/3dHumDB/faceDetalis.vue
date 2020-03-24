<template>
  <div class="fDetalis-wrapper">
    <div class="fDetalis-head">
      <m-crums :con="crumsData" />
      <!-- <p class="header-title">基础信息</p> -->
      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one">
            <span class="must">采集编号:</span> <span class="must">{{modelDetalis.collectNo}}</span>
            <!-- <input type="text" id="one" class="inp" v-model="modelDetalis.collectNo" readonly /> -->
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">姓名:</span> <span class="must">{{modelDetalis.username}}</span>
            <!-- <input type="text" id="one" class="inp" v-model="modelDetalis.collectNo" readonly /> -->
          </label>
        </div>

         <div class="inp-con">
          <label for="one">
            <span class="must">性别:</span> <span class="must">{{modelDetalis.sex}}</span>
            <!-- <input type="text" id="one" class="inp" v-model="modelDetalis.collectNo" readonly /> -->
          </label>
        </div>

          <div class="inp-con">
          <label for="one">
            <span class="must">证件号码:</span> <span class="must">{{modelDetalis.idNo}}</span>
            <!-- <input type="text" id="one" class="inp" v-model="modelDetalis.collectNo" readonly /> -->
          </label>
        </div>

         <div class="inp-con">
          <label for="one">
            <span class="must">采集时间:</span> <span class="must">{{modelDetalis.time}}</span>
            <!-- <input type="text" id="one" class="inp" v-model="modelDetalis.collectNo" readonly /> -->
          </label>
        </div>

          <div class="inp-con">
          <label for="one">
            <span class="must">采集单位:</span> <span class="must">{{modelDetalis.orgName}}</span>
            <!-- <input type="text" id="one" class="inp" v-model="modelDetalis.collectNo" readonly /> -->
          </label>
        </div>

           <div class="inp-con">
          <label for="one">
            <span class="must">数据来源:</span> <span class="must">{{modelDetalis.source == '0' ? '雪山三号33':'雪山三号15'}}</span>
            <!-- <input type="text" id="one" class="inp" v-model="modelDetalis.collectNo" readonly /> -->
          </label>
        </div>

      
      </div>

    
    </div>

    <div class="fDetalis-content">
      <p class="fDetalis__nav">
        <router-link class="fDetalis__item"  active-class="active"  :to="{name:'cenLeftRight',params:{id:this.id}}" v-if="modelDetalis.source == '0'">一正两侧</router-link>
        <router-link class="fDetalis__item" active-class="active" :to="{name:'modelShow',params:{id:this.id}}">人像模型</router-link>
        <router-link class="fDetalis__item" active-class="active" :to="{name:'photoes',params:{id:this.id}}">拍摄照片</router-link>
      </p>

  
      <div class="fDetalis__con">
           <router-view />
      </div>
    </div>

  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import * as URL from "@/plugins/env.js";
import jsZip from "jszip";
export default {
  props: ["con"],
  data() {
    return {
      id: "",
      modelPath: "",
      crumsData: {
        one: "三维人像库",
        two: "人像模型库",
        thr: "详情",
        pathGP: "faceM",
        now:1
      },
      tag: ["暴力", "小偷"],
      time: "",
      modelDetalis: {},
      rightPath: require("@/assets/img/faceChar.jpg"),
      cenPath: require("@/assets/img/cen.png"),
      leftPath: require("@/assets/img/leftOne.png"),
      rightPath2: require("@/assets/img/rightOne.png"),
      imgOne: "",
      txtUrl: "",
      charData: [
        { name: "眼角距离:", data: "1.2549" },
        { name: "眼宽距离:", data: "1.1424" },
        { name: "鼻子高度:", data: "1.6786" },
        { name: "鼻子宽度:", data: "1.5754" },
        { name: "人中距离:", data: "1.4242" },
        { name: "嘴角宽度:", data: "1.7456" },
        { name: "嘴巴高度:", data: "1.8978" },
        { name: "下巴宽度:", data: "1.1257" }
      ],
      imgArr: [
        { name: "center.jpg", id: "ONE" },
        { name: "right.jpg", id: "TWO" },
        { name: "left.jpg", id: "THR" }
      ],
      photo1: [],
      photo2: [],
      photo3: [],
    };
  },
  computed: {},
  created() {
    if(!this.$route.query.id){
        this.id = JSON.parse(localStorage.getItem('id'))
    }else{
        this.id = this.$route.query.id;
    }
  
    this.modelPath = this.$route.query.path;
    this.getModel();
    // this.getMs();
    // this.getModelTxt();
  },
  mounted() {
    this.modelPath = this.$route.query.path;
    // this.INIT(this.modelPath);
    // this.getAllImg(this.id);
  },

  methods: {
    getModel() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/models/${this.id}`)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.modelDetalis = res.data.result.result;
            console.log(VM.modelDetalis)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMs() {
      let VM = this;
      let params = {};
      this.$http.api
        .get(window.BASEURL.oss + `${VM.id}_ai3d`, {
          headers: {
            "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
            "Content-Type": "text/plain;charset=utf-8"
          },
          responseType: "text"
        })
        .then(function(res) {
          if (res.status === 200) {
            let data = res.data;
            // console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  components: {
    MCrums
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumDB/faceDetalis.scss";
</style>
