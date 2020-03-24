<template>
  <div class="newShootC">
   
    <m-dialog ref="cenLeft" :con="dialogKey" :photoes="photoesArr" :loading="loadObj" :name="beTo" />
    <audio src="./static/mp3/FacePhoto.wav" id="myAudio1" @ended="sendCen"></audio>
    <audio src="./static/mp3/LeftPhoto.wav" id="myAudio2" @ended="sendLeft"></audio>
    <audio src="./static/mp3/RightPhoto.wav" id="myAudio3" @ended="sendRight"></audio>
    <div class="newShootC__con">
      <div :class="['newShootC__left']">
        <img
          :src="`http://${fromData.strUrl}/?action=stream`"
          class="liveImg"
          v-if="fromData.strUrl && devStatus == 'success'"
        />
          <div class="tips__imgBox" v-if="devStatus != 'success'">
          <img
            src="../../assets/img/img3/wait.png"
            alt
            class="tips__img check"
            v-if="devStatus == 'test'"
          />
          <img
            src="../../assets/img/img3/cameras_addition.png"
            alt
            class="tips__img"
            v-if="devStatus == 'add'"
          />
          <img
            src="../../assets/img/img3/cameras_trouble.png"
            alt
            class="tips__img"
            v-if="devStatus == 'trouble'"
          />
          <img
            src="../../assets/img/img3/camerasSever.png"
            alt
            class="tips__img"
            v-if="devStatus == 'serverTrouble'"
          />
          <button class="btn__item" v-if="devStatus == 'add'" @click="goAdd">去添加</button>
        </div>
        <Spin class="loading" v-if="!fromData.strUrl && devStatus == 'test'"></Spin>
        <div class="line" v-if="fromData.strUrl & devStatus == 'success'"></div>
      </div>
      <div class="newShootC__right">
        <div class="shoot__top">
          <p class="shoot__topTittle">基础信息</p>
          <div class="shoot__box">
            <div class="shoot__info">

              <span class="collectSno">采集编号:{{fromData.collectNo}}</span>
               <el-tooltip class="item" effect="dark" :content="fromData.username" placement="top-start">
               <span class="collectSno">姓名:{{fromData.username}}</span>
               </el-tooltip>
              

              <span class="collectSno">证件号:{{fromData.idNo}}</span>
              <span class="collectSno">性别:{{fromData.sex}}</span>
            </div>

            <div class="shoot_btn">
              <button
                :class="['btn__item',{'now':!cenClassKey},{'deg':loading1}]"
                @click="takeCenter"
              >
                <span v-if="!loading1">拍正</span>
                <span v-if="loading1">拍摄中</span>
                <i class="el-icon-loading" v-if="loading1"></i>
              </button>
              <button
                :class="['btn__item',{'now':!leftClassKey},{'deg':loading2}]"
                @click="takeLeft"
              >
                <span v-if="!loading2">拍左</span>
                <span v-if="loading2">拍摄中</span>
                <i class="el-icon-loading" v-if="loading2"></i>
              </button>
              <button
                :class="['btn__item',{'now':!RightClassKey},{'deg':loading3}]"
                @click="takeRight"
              >
                <span v-if="!loading3">拍右</span>
                <span v-if="loading3">拍摄中</span>
                <i class="el-icon-loading" v-if="loading3"></i>
              </button>

              <button class="end" @click="takeEnd">结束拍摄</button>
            </div>
          </div>
        </div>

        <div class="shoot__bottom">
          <p class="shoot__bottomTittle">采集拍摄</p>
          <img src="../../assets/img/img3/left.png" alt class="shoot__bottom__bg" v-if="isTake" />
          <img src="../../assets/img/img3/aaa.png" alt class="shoot__bottom__bg1" v-if="!isTake" />

          <div class="shoot__imgBox" v-if="isCenTakeDone">
            <p class="subTitle">{{cenWord.one}}</p>
            <div class="img__box">
              <div class="img__wrap" v-for="(item,index) in cenImgArr" :key="index">
                <img
                  :src="`data:image/png;base64,${item[index]}`"
                  alt
                  class="img__item"
                  v-if="item[index]"
                />
                <img src="../../assets/img/account_icon.png" alt class="img__item" v-else />

                <p class="img__ms">
                  <!-- <span class="cir"></span> -->
                  <span class="img__ms__word">
                    {{cenWord.two}}:
                    <!-- <Icon type="md-remove" /> -->
                    {{index+1}}号摄像头
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="shoot__imgBox" v-if="isLeftTakeDone">
            <p class="subTitle">{{leftWord.one}}</p>
            <div class="img__box">
              <div class="img__wrap" v-for="(item,index) in leftImgArr" :key="index">
                <img
                  :src="`data:image/png;base64,${item[index]}`"
                  alt
                  class="img__item"
                  v-if="item[index]"
                />
                <img src="../../assets/img/account_icon.png" alt class="img__item" v-else />
                <p class="img__ms">
                  <!-- <span class="cir"></span> -->
                  <span class="img__ms__word">
                    {{leftWord.two}}:
                    <!-- <Icon type="md-remove" /> -->
                    {{index+1}}号摄像头
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="shoot__imgBox" v-if="isRightTakeDone">
            <p class="subTitle">{{rightWord.one}}</p>
            <div class="img__box">
              <div class="img__wrap" v-for="(item,index) in rightImgArr" :key="index">
                <img
                  :src="`data:image/png;base64,${item[index]}`"
                  alt
                  class="img__item"
                  v-if="item[index]"
                />
                <img src="../../assets/img/account_icon.png" alt class="img__item" v-else />
                <p class="img__ms">
                  <!-- <span class="cir"></span> -->
                  <span class="img__ms__word">
                    {{rightWord.two}}:
                    <!-- <Icon type="md-remove" /> -->
                    {{index+1}}号摄像头
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MDialog from "@/components/ms/photoes.vue";

export default {
  props: {},
  data() {
    return {
      dialogKey: false,
      id: 133,
      beTo: "yc",
      takeWhich: "",
      newData:"",//结束拍照点击确认传的数据
      
      duration1: "",//正面音频时长
      duration2: "",//左面音频时长
      duration3: "",//右面音频时长

      audio1: "",//正面音频
      audio2: "",//正面音频
      audio3: "",//正面音频

      cenWord: { one: "正面预览", two: "正面" },
      leftWord: { one: "左面预览", two: "左面" },
      rightWord: { one: "右面预览", two: "右面" },

      cenImgPath: "",
      cenImgArr: [],
      saveCen:[],
      leftImgPath: "",
      leftImgArr: [],
      saveLeft:[],
      rightImgPath: "",
      rightImgArr: [],
      saveRight:[],
      showAllKey:false,

      photoesArr: {
        front: "",
        frontFail:false,
        left: "",
        leftFail:false,
        right: "",
        rightFail:false,
        isCreate: false
      },

      livePreUrl: "",//预览地址
      takeUrl: "",  //拍照地址
      isTake: false,
      fromData: {},

      isCenTake: false,
      isLeftTake: false,
      isRightTake: false,

      isTakeDone: false,

      isCenTakeDone: false,
      isLeftTakeDone: false,
      isRightTakeDone: false,

      cenClassKey: true,
      leftClassKey: false,
      RightClassKey: false,

      key1: false,//锁1
      key2: false,//锁2
      key3: false,//锁3

      key11: false,
      key22: false,
      key33: false,

      loading1: false,//在拍正面中
      loading2: false,
      loading3: false,

      loadObj: {
        one: true,
        two: true,
        three: true
      },
      devStatus:'test',
    };
  },

  created() {

    this.getInfo();
    this.getServerStatus();
  },

  methods: {
      //检测
    getServerStatus(){
       let VM = this;
       let params = {
           "req":"check","data":"all"
       }
       this.$http.api
        .post(`http://192.168.1.183:8000/camera_server/api/checkcamera/v1`, params,{
          headers: {
            "Content-Type":"application/json"
          },})
        .then(function(res) {
          if (res.status === 200) {
                 let data =JSON.parse(res.data.data);
                 if(data.length > 0){
                    VM.devStatus = 'trouble';//设备有问题
                 }else{
                    VM.devStatus = 'success'
                 }
              console.log(  VM.devStatus  ) 
          }
         
        })
        .catch(function(error) {
           VM.devStatus = 'serverTrouble';//拍照服务有问题

           console.log( VM.devStatus );
        });
    },
    getInfo() {
      let VM = this;
      let params = {
        req: "params"
      };
      this.$http.api
        .post(window.BASEURL.infoUrl + `camera_server/api/browser/v1`, params)
        .then(function(res) {
          // console.log(res)
          if (res.status === 200 && res.data.msg == "ok") {
            let data = JSON.parse(res.data.data);
            // console.log(data);
            data.collectNo = data.orgId.substring(0, 4) + new Date().getTime();
            VM.fromData = data;
            // console.log(VM.fromData);
          } else {
         
            console.log(res.data.msg);
          }
        })
        .catch(function(error) {
         
          console.log(error);
        });
    },
    //拍正面
    takeCenter() {
      let VM = this;

      if (!VM.fromData.collectNo) {
        VM.$Message.error(`无采集编号!`);
        return;
      }
      if (this.isLeftTake) {
        //是否拍过左面
        VM.$Message.error(`拍过左面后,不能拍正面!`);
        return;
      }
      if (this.key1) {
        return;
      }
      
      this.audio1 = document.getElementById("myAudio1");
      this.audio1.play();
      this.key1 = true;
      this.loading1 = true;

      if (this.audio1) {
        this.audio1.loop = false;
        if (this.key11) {
          return;
        }
        this.key11 = true;
     
      }
    },

    //请求正面
    sendCen() {
      let VM = this;
      let params = {
        req: "front",
        data: this.fromData.username,
        identifier: this.fromData.collectNo
      };
      console.log("cen");
      VM.loading1 = false;
      VM.$http.api
        .post(
          `http://${VM.fromData.deviceIp}/camera_server/api/snap/v1`,
          params
        )
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "ok") {
              console.log("正面");
              VM.isCenTake = true;
              VM.leftClassKey = true;
              VM.isCenTakeDone = true;

              VM.cenImgArr = JSON.parse(res.data.data);
              VM.saveCen = JSON.parse(res.data.data);
              
              VM.key1 = false;
              VM.$Message.success(`正面拍摄成功!`);
              VM.isTake = true;
            } else {
              VM.loading1 = false;
              VM.$Message.error(`正面拍照失败!`);
            }
            VM.key1 = false;
            VM.key11 = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //拍左面
    takeLeft() {
      let VM = this;
      
      if (!VM.isCenTake) {
        this.$Message.error("还未拍正面");
        return;
      }
      if(VM.loading1){
        this.$Message.error("在拍正面时不能拍左面");
        return;  
      }
      if (this.isRightTake) {
        //是否拍过左面
        VM.$Message.error(`拍过右面后,不能拍左面!`);
        return;
      }
      if (this.key2) {
        return;
      }
      VM.isLeftTake = true;
      this.audio2 = document.getElementById("myAudio2");
      this.audio2.play();
      this.key2 = true;
      this.loading2 = true;
      if (this.audio2) {
        this.audio2.loop = false;
      }
    },
    //请求左面
    sendLeft() {
      let VM = this;
      let params = {
        req: "left",
        data: this.fromData.username,
        identifier: this.fromData.collectNo
      };

      VM.loading2 = false;
      VM.$http.api
        .post(
          `http://${VM.fromData.deviceIp}/camera_server/api/snap/v1`,
          params
        )
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "ok") {
              console.log("左面");
              
              VM.cenWord.one = "左侧预览";
              VM.cenWord.two = "左面";
              VM.isLeftTakeDone = true;
          
              VM.cenImgArr = JSON.parse(res.data.data);
              VM.saveLeft = JSON.parse(res.data.data);
              VM.leftImgArr = VM.saveCen;

              VM.leftWord.one = "正面预览";
              VM.leftWord.two = "正面";
              VM.key2 = false;
              
              VM.RightClassKey = true;
              VM.cenClassKey = false;
              VM.$Message.success(`左面拍摄成功!`);
            } else {
              VM.loading2 = false;
              VM.$Message.error(`左面拍照失败!`);
            }
            VM.key2 = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //拍右面
    takeRight() {
      let VM = this;
      if (!VM.isLeftTake) {
        this.$Message.error("还未拍左面");
        return;
      }
       if(VM.loading2){
        this.$Message.error("在拍左面时不能拍右面");
        return;  
      }
      if (this.key3) {
        return;
      }
      this.key3 = true;
      VM.isRightTake = true;
      this.audio3 = document.getElementById("myAudio3");
      this.audio3.play();
      this.loading3 = true;
      if (this.audio3) {
        this.audio3.loop = false;
      }
    },
    //请求右面
    sendRight() {
      let VM = this;
      let params = {
        req: "right",
        data: this.fromData.username,
        identifier: this.fromData.collectNo
      };
      VM.loading3 = false; 
      VM.$http.api
        .post(
          `http://${VM.fromData.deviceIp}/camera_server/api/snap/v1`,
          params
        )
        .then(function(res) {
          if (res.status == 200 && res.data.msg == "ok") {
            console.log("右面");
            
            VM.leftClassKey = false;
            VM.isRightTakeDone = true;

            VM.cenWord.one = "右侧预览";
            VM.cenWord.two = "右面";
          
            VM.cenImgArr = JSON.parse(res.data.data);
            VM.saveRight = JSON.parse(res.data.data);

            VM.leftImgArr = VM.saveLeft;
            VM.rightImgArr = VM.saveCen;

            VM.leftWord.one = "左面预览";
            VM.leftWord.two = "左面";
            VM.rightWord.one = "正面预览";
            VM.rightWord.two = "正面";
            VM.$Message.success(`右面拍摄成功!`);
            VM.key3 = false;
          } else {
            VM.loading3 = false;
            VM.$Message.error(`右面拍照失败!`);
          }
          VM.key3 = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //结束拍摄
    takeEnd() {
      let VM = this;

      if (!this.isCenTake) {
        VM.$Message.error(`还未拍正面!`);
        return;
      }
      if (!this.isLeftTake) {
        VM.$Message.error(`还未拍左面!`);
        return;
      }
      if (!this.isRightTake) {
        VM.$Message.error(`还未拍右面!`);
        return;
      }
      if (!this.isRightTakeDone) {
        VM.$Message.error(`右面还未拍摄完毕!`);
        return;
      }

      
      this.newData = {
        collectNo: VM.fromData.collectNo,
        deviceNo: VM.fromData.deviceNo,
        idNo: VM.fromData.idNo,
        orgId: VM.fromData.orgId,
        orgName: VM.fromData.orgName,
        sex: VM.fromData.sex,
        username: VM.fromData.username,
        place: VM.fromData.place,
        name:'yc'
      };
      this.$refs.cenLeft.data = this.newData;
      this.$refs.cenLeft.getInfo(this.newData.idNo)
      this.dialogKey = true;
      let params1 = {
        req: "front_complete",
        identifier: VM.fromData.collectNo
      };
      let params2 = {
        req: "left_complete",
        identifier: VM.fromData.collectNo
      };
      let params3 = {
        req: "right_complete",
        identifier: VM.fromData.collectNo,
      
      };

      this.$http.api
        .post(
          `http://${this.fromData.deviceIp}/camera_server/api/snap/v1`,
          params1
        )
        .then(function(res) {
          if (res.status == 200 && res.data.msg == "ok") {
            let data = JSON.parse(res.data.data);
            // console.log(data);
            VM.loadObj.one = false;
            if (!data.front) {
              VM.$refs.cenLeft.ms("正面");
              VM.photoesArr.frontFail = true;
            }
            VM.photoesArr.front = data.front;
            VM.$http.api
              .post(
                `http://${VM.fromData.deviceIp}/camera_server/api/snap/v1`,
                params2
              )
              .then(res => {
                if (res.status == 200 && res.data.msg == "ok") {
                  let data = JSON.parse(res.data.data);
                  // console.log(data);
                  if (!data.left) {
                    VM.$refs.cenLeft.ms("左侧");
                    VM.photoesArr.leftFail = true;
                  }
                  VM.loadObj.two = false;
                  VM.photoesArr.left = data.left;
                  VM.$http.api
                    .post(
                      `http://${VM.fromData.deviceIp}/camera_server/api/snap/v1`,
                      params3
                    )
                    .then(res => {
                      if (res.status == 200 && res.data.msg == "ok") {
                        let data = JSON.parse(res.data.data);
                        // console.log(data);
                        if (!data.right) {
                          VM.$refs.cenLeft.ms("右侧");
                          VM.photoesArr.rightFail = true;
                        }
                        VM.loadObj.three = false;
                        VM.photoesArr.right = data.right;
                        VM.photoesArr.isCreate = true;
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    sure() {
      this.isCenTake = false;
      this.isLeftTake = false;
      this.isRightTake = false;
       

      this.isCenTakeDone = false;
      this.isLeftTakeDone = false;
      this.isRightTakeDone = false;

      this.cenClassKey = true;
      this.RightClassKey = false;
      this.leftClassKey = false;

      this.photoesArr = {
        front: "",
        frontFail:false,
        left: "",
        leftFail:false,
        right: "",
        rightFail:false,
        isCreate: false
      };
      this.cenWord = { one: "正面预览", two: "正面" };
      this.leftWord = { one: "左面预览", two: "左面" };
      this.rightWord = { one: "右面预览", two: "右面" };

      this.isTake = false,

      this.loadObj = {
        one: true,
        two: true,
        three: true
      };
    },
    createdAudio() {
      let VM = this;
      this.audio1 = new Audio("./static/mp3/FacePhoto.wav");
      this.audio2 = new Audio("./static/mp3/LeftPhoto.wav");
      this.audio3 = new Audio("./static/mp3/RightPhoto.wav");

      this.audio1.loop = false;
      this.audio1.loop = false;
      this.audio1.loop = false;

      this.audio1.oncanplay = e => {
        VM.duration1 = e.target.duration;
      };
      this.audio2.oncanplay = e => {
        VM.duration2 = e.target.duration;
      };
      this.audio3.oncanplay = e => {
        VM.duration3 = e.target.duration;
      };
    }
  },
  components: {
    MDialog,
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/portraitCollection/newShootC.scss";
</style>
