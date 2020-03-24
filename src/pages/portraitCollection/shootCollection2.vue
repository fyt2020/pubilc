<template>
  <div class="newShootCo">
    <m-dialog ref="cenLeft" :con="dialogKey" :photoes="photoesArr" :loading="loadObj" :name="beTo" />
    <audio src="./static/mp3/FacePhoto.wav" id="myAudio1" @ended="sendCen"></audio>
    <audio src="./static/mp3/LeftPhoto.wav" id="myAudio2" @ended="sendLeft"></audio>
    <audio src="./static/mp3/RightPhoto.wav" id="myAudio3" @ended="sendRight"></audio>

    <div class="newShootCo__con">
      <div class="newShootC__left">
        <img :src="`http://${livePreUrl}/?action=stream`" class="liveImg" v-if="livePreUrl" />
        <div class="line" v-if="livePreUrl"></div>
        <div class="tips__imgBox" v-if="!livePreUrl">
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
            src="../../assets/img/img3/cameras_choose.png"
            alt
            class="tips__img"
            v-if="devStatus == 'chose'"
          />
         
          <img
            src="../../assets/img/img3/camerasSever.png"
            alt
            class="tips__img"
            v-if="devStatus == 'serverTrouble'"
          />
           <img
            src="../../assets/img/img3/cameras_disabled.png"
            alt
            class="tips__img"
            v-if="devStatus == 'disabled'"
          />
          <button class="btn__item" v-if="devStatus == 'add'" @click="goAdd">去添加</button>
        </div>
        <Spin class="loading" v-if="!livePreUrl && devStatus == 'test'"></Spin>
      </div>

      <div class="newShootCo__right">
        <div class="shoot__top">
          <p class="shoot__topTittle">拍摄采集</p>
          <div class="shoot__box">
            <div class="shoot-inp">
              <div class="inp-con">
                <label for="two">
                  <span class="must">采集单位</span>
                  <el-select
                    v-model="fromData.orgName"
                    placeholder="请选择"
                    @change="handleChange"
                    filterable
                    v-if="!isCenTake"
                  >
                    <el-option
                      @click.native="selectOrg(item)"
                      v-for="(item,index) in options3"
                      :key="index"
                      :value="item.orgName"
                    ></el-option>
                  </el-select>
                  <input
                    type="text"
                    id="two"
                    class="inp"
                    v-model="fromData.orgName"
                    readonly
                    v-if="isCenTake"
                  />
                </label>
              </div>

              <div class="inp-con">
                <label for="thr1">
                  <span class="must">采集设备</span>
                  <el-select v-model="devObj.deviceNo" placeholder="请选择" v-if="!isProhibit">
                    <el-option
                      @click.native="selectDev(item)"
                      v-for="(item,index) in devArr"
                      :key="index"
                      :label="item.deviceNo"
                      :value="item.deviceNo"
                    ></el-option>
                  </el-select>

                  <input
                    type="text"
                    id="thr1"
                    :class="['inp',{'disabled':devArr.length == 0 || disabled}]"
                    v-model="devObj.deviceNo"
                    readonly
                    v-if="isProhibit"
                  />
                </label>
                <!-- <label for="four1" v-if="id">
                  <span class="must">采集设备</span>
                  <el-select v-model="devObj.deviceNo" placeholder="请选择" v-if="!isProhibit">
                    <el-option
                      @click.native="selectDev(item)"
                      v-for="(item,index) in devArr"
                      :key="index"
                      :label="item.deviceNo"
                      :value="item.deviceNo"
                    ></el-option>
                  </el-select>
                  <input
                    type="text"
                    id="four1"
                    class="inp"
                    v-model="devObj.deviceNo"
                    readonly
                    v-if="isProhibit"
                  />
                </label>-->
              </div>

                 <div class="inp-con">
                <label for="one">
                  <span class="must">采集编号</span>
                  <input
                    type="text"
                    id="one"
                    class="inp"
                    v-model="fromData.collectNo"
                    readonly
                    disabled
                  />
                </label>
              </div>

              <div class="inp-con">
                <el-tooltip content="请输入2-20位中文或英文" placement="bottom">
                  <label for="thr">
                    <span class="must__name">姓名</span>
                    <input
                      type="text"
                      id="thr"
                      class="inp inp1"
                      v-model="fromData.username"
                      autocomplete="off"
                    />
                  </label>
                </el-tooltip>
              </div>
              <div class="inp-con sex">
                <label for="five">
                  <span class="must__sex">性别</span>
                  <RadioGroup v-model="fromData.sex">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                  </RadioGroup>
                </label>
              </div>

              <div class="inp-con">
                <label for="two">
                  <span class="must">证件类型</span>
                  <el-select
                    v-model="idType"
                    placeholder="请选择"
                    @change="handleChange"
                    filterable
                    v-if="!isCenTake"
                  >
                    <el-option
                      @click.native="selectIdType(item)"
                      v-for="(item,index) in options4"
                      :key="index"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                  <input
                    type="text"
                    id="two"
                    class="inp"
                    v-model="idType"
                    readonly
                    v-if="isCenTake"
                  />
                </label>
              </div>
              <div class="inp-con">
                <el-tooltip :content="fromData.type == 0 ? `18位身份证号`: `最多9位护照号`" placement="bottom">
                  <label for="four">
                    <span class="must">证件号码</span>
                    <input
                      @input="onInput"
                      type="text"
                      id="four"
                      class="inp"
                      v-model="fromData.idNo"
                      autocomplete="off"
                    />
                  </label>
                </el-tooltip>
              </div>

              <div class="inp-con take">
                <!-- 十五个镜头 -->
                <div class="shoot_btn1" v-if="fromData.deviceVersion == '1'">
                  <button
                    :class="['btn__item',{'now':!cenClassKey},{'deg':loading1}]"
                    @click="takePhotoes_15"
                  >
                    <span v-if="!loading1">拍摄</span>
                    <span v-if="loading1">拍摄中</span>
                    <i class="el-icon-loading" v-if="loading1"></i>
                  </button>
                  <button class="end" @click="takeEnd_15">结束拍摄</button>
                </div>
                <!-- 十五个镜头 -->

                <!-- 三十三个镜头 -->
                <div class="shoot_btn1" v-else>
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

            <!-- <div class="shoot-inp">
            </div>-->

            <div class="shoot-sec">
              <span class="label">标签</span>
              <CheckboxGroup v-model="tag2" @on-change="tu_chanege">
                <Checkbox
                  :label="item.value"
                  class="label1"
                  v-for="(item,index) in initLabel"
                  :key="index"
                ></Checkbox>
              </CheckboxGroup>
              <Checkbox @on-change="addLabel" v-model="otherVal">其他:</Checkbox>

              <div class="add" v-if="otherKey">
                <input type="text" class="add-inp" v-model="labelVal" />
                <button class="addbtn" @click="saveLabel">保存</button>
              </div>

              <div class="label-box">
                <div class="label__wrap">
                  <div class="label-item" v-for="(item,index) in labelArr" :key="index">
                    <span class="label-w">{{item}}</span>
                    <i class="el-icon-close" style="color:red" @click="deleteLabel(index,item)"></i>
                  </div>
                </div>

                <span class="edit" @click="edit()" v-if="labelArr.length > 0">
                  <Icon type="md-create" />
                  <span class="edit-w">新增</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="shoot__bottom">
          <p class="shoot__bottomTittle">照片预览</p>
          <img src="../../assets/img/img3/aaa.png" alt class="shoot__bottom__bg1" v-if="!isTake" />

          <div class="shoot__imgBox" v-if="fromData.deviceVersion == '1'">
            <div class="img__boxfifteen">
              <div class="img__wrap" v-for="(item,index) in fifteenImgArr" :key="index">
                <img
                  :src="`data:image/png;base64,${item[index]}`"
                  alt
                  class="img__item"
                  v-if="item[index]"
                />
                <img src="../../assets/img/BG-min.png" alt class="img__item" v-else />
                <p class="img__ms">
                  <!-- <span class="cir"></span> -->
                  <span class="img__ms__word">{{index+1}}号摄像头</span>
                </p>
              </div>
            </div>
          </div>

          <div class="shoot__imgBox" v-if="isCenTakeDone && fromData.deviceVersion == '0'">
            <p class="subTitle">{{cenWord.one}}</p>
            <div class="img__box">
              <div class="img__wrap" v-for="(item,index) in cenImgArr" :key="index">
                <img
                  :src="`data:image/png;base64,${item[index]}`"
                  alt
                  class="img__item"
                  v-if="item[index]"
                />
                <img src="../../assets/img/BG-min.png" alt class="img__item" v-else />

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

          <div class="shoot__imgBox" v-if="isLeftTakeDone && fromData.deviceVersion == '0'">
            <p class="subTitle">{{leftWord.one}}</p>
            <div class="img__box">
              <div class="img__wrap" v-for="(item,index) in leftImgArr" :key="index">
                <img
                  :src="`data:image/png;base64,${item[index]}`"
                  alt
                  class="img__item"
                  v-if="item[index]"
                />
                <img src="../../assets/img/BG-min.png" alt class="img__item" v-else />
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

          <div class="shoot__imgBox" v-if="isRightTakeDone && fromData.deviceVersion == '0'">
            <p class="subTitle">{{rightWord.one}}</p>
            <div class="img__box">
              <div class="img__wrap" v-for="(item,index) in rightImgArr" :key="index">
                <img
                  :src="`data:image/png;base64,${item[index]}`"
                  alt
                  class="img__item"
                  v-if="item[index]"
                />
                <img src="../../assets/img/BG-min.png" alt class="img__item" v-else />
                <p class="img__ms">
                  <!-- <span class="cir"></span> -->
                  <span class="img__ms__word">
                    {{rightWord.two}}
                    <Icon type="md-remove" />
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
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      beTo: "self",
      dialogKey: false,
      id: "", //设备id
      newData: "", //结束拍照点击确认传的数据
      disabled: false, //设备是否禁用

      cenImgPath: "",
      cenImgArr: [],
      saveCen: [],
      leftImgPath: "",
      leftImgArr: [],
      saveLeft: [],
      rightImgPath: "",
      rightImgArr: [],
      saveRight: [],
      fifteenImgArr: [],

      photoesArr: {
        front: "",
        frontFail: false,
        left: "",
        leftFail: false,
        right: "",
        rightFail: false,
        isCreate: false
      },

      livePreUrl: "",
      takeUrl: "",
      isTake: false,

      isCenTake: false,
      isLeftTake: false,
      isRightTake: false,

      isCenTakeDone: false,
      isLeftTakeDone: false,
      isRightTakeDone: false,

      isTakeDone: false,
      isProhibit: false, //是否禁用and拍了正面

      key1: false,
      key2: false,
      key3: false,
      key15: false,

      key11: false,
      key22: false,
      key33: false,

      cenClassKey: true,
      leftClassKey: false,
      RightClassKey: false,

      loading1: false,
      loading2: false,
      loading3: false,

      fromData: {
        collectNo: "",
        orgName: "",
        orgId: "",
        tag: [],
        username: "",
        idNo: "",
        type: 0,
        sex: "男",
        age: null,
        ethnicity: "",
        address: "",
        accessToken: "",
        dataUrl: "",
        place: "",
        deviceVersion: "",
        placeTag:"",
        deviceId:'',
      },

      tag2: [],
      otherKey: false, //是否显示其他
      otherVal: false, //是否点其他
      labelVal: "", //新标签
      initLabel: [],
      labelArr: [],

      options3: [],
      idType: "身份证",
      options4: [
        {
          type: 0,
          name: `身份证`
        },
        {
          type: 1,
          name: `护照`
        }
      ],
      options: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      imgArr: [],
      devArr: [], //设备数组
      devObj: {
        deviceNo:''
      },
      devStatus: "test", //设备状态 拍摄引导
      loadObj: {
        one: true,
        two: true,
        three: true
      },
      cenWord: { one: "正面预览", two: "正面" },
      leftWord: { one: "左面预览", two: "左面" },
      rightWord: { one: "右面预览", two: "右面" }
    };
  },
  created() {
    let token = JSON.parse(localStorage.getItem("token"));
    let orgName = token.orgName;
    let orgId = token.orgId;
    let rolename = token.rolename;
    this.getUserInfro();
    this.getCategorys();
    this.id = this.$route.query.id;
    if (this.id) {
      this.getDevById(this.id);
    } else if (rolename != "超级管理员") {
      // let time = this.creatTime();
      // this.reSetData();
      // this.fromData.orgId = orgId;
      // this.fromData.collectNo = orgId.slice(0, 4) + time;
      // this.fromData.orgName = orgName;
      // this.orgId = orgId;
      // this.collectNo = orgId.slice(0, 4) + time;
      // this.rightImgPath = "";
      // this.leftImgPath = "";
      // this.cenImgPath = "";
      // this.livePreUrl = "";
      // this.getDev(orgId); 
      this.getOrg();
    }else{
      this.getOrg();
    }
  },
  beforeDestroy() {
    this.reSetData();
    this.reSetData_15();
  },
  methods: {
    ...mapMutations(['changNow']),
    //雪山33号15开始拍摄
    takePhotoes_15() {
      let VM = this;
      let reg = /^[\u4e00-\u9fa5_a-zA-Z_]{2,20}$/g; //名字
      let reg2 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g; //身份证
      let reg3 = /^[a-zA-Z0-9]{8,9}$/g; //护照
      // if(this.fromData.placeTag == 0){
      //     VM.$Message.error("未上传控场文件!");
      // }
      if (!this.fromData.collectNo) {
        VM.$Message.error("请设置采集编号!");
        return;
      }
      if (!this.fromData.username) {
        VM.$Message.error("请填写姓名!");
        return;
      }
      if (!this.fromData.idNo) {
        VM.$Message.error("请填写身份证号!");
        return;
      }
      if (!this.fromData.username) {
        VM.$Message.error("请输入姓名");
        return;
      }
      if (!this.fromData.sex) {
        VM.$Message.error("请选择性别");
        return;
      }
      if (this.isLeftTake) {
        //是否拍过左面
        VM.$Message.error(`拍过左面后,不能拍正面!`);
        return;
      }
      let key = reg.test(this.fromData.username);
      let key2 = reg2.test(this.fromData.idNo);
      let key3 = reg3.test(this.fromData.idNo);
      if (this.fromData.type == 0) {
        if (!key2) {
          this.$Message.error("身份证填写有误");
          return;
        }
      } else if (this.fromData.type == 1) {
        if (!key3) {
          this.$Message.error("护照填写有误");
          return;
        }
      }
      if (!key) {
        this.$Message.error("请输入2-20位中文或英文");
        return;
      }

      if (this.key15) {
        return;
      }
      this.key15 = true;
      this.loading1 = true;
      this.beforeSendCen(this.fromData.deviceVersion);
    },
    //雪山33号15接收数据
    sendTake() {
      let VM = this;
      let params = {
        req: "front",
        data: this.fromData.username,
        identifier: this.fromData.collectNo
      };
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      VM.$http.api
        .post(`http://${VM.takeUrl}/camera_server/api/snap/v1`, params)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "ok") {
              VM.fifteenImgArr = JSON.parse(res.data.data);
              VM.isTake = true;
              VM.isCenTake = true;
              VM.setAttr(inpArr, "readOnly");
              VM.setAttr(check, "disabled");
            } else {
              VM.loading1 = false;
              VM.$Message.error(`拍照失败!`);
            }
            VM.loading1 = false;
            VM.key15 = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //雪山33号15结束拍摄
    takeEnd_15() {
      let VM = this;
      if (!this.isCenTake) {
        this.$Message.error(`还未拍照!`);
        return;
      }
      let key = window.confirm("确定结束拍摄?");
      let newdata = {
        collectNo: VM.fromData.collectNo,
        deviceNo: VM.fromData.deviceNo,
        type: VM.fromData.type,
        idNo: VM.fromData.idNo,
        orgId: VM.fromData.orgId,
        orgName: VM.fromData.orgName,
        sex: VM.fromData.sex,
        username: VM.fromData.username,
        place: VM.fromData.place,
        name: "xsy",
        source: VM.fromData.deviceVersion
      };
      let params = {
        req: "close",
        data: [newdata],
        identifier: newdata.collectNo
      };
      if (key) {
        this.$http.api
          .post(`http://${VM.takeUrl}/camera_server/api/browser/v1`, params)
          .then(function(res) {
            if (res.status === 200 && res.data.msg == "ok") {
              VM.reSetData_15();
            } else {
              VM.$message({
                message: `${res.data.data}`,
                type: "error",
                customClass: "zZindex"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    reSetData_15() {
      this.fromData.username = "";
      this.fromData.idNo = "";
      this.fromData.sex = "男";
      let time = this.creatTime();
      this.fromData.collectNo = this.fromData.orgId.slice(0, 4) + time;
      //this.collectNo = this.fromData.orgId.slice(0, 4) + time;
      //this.fromData.collectNo = "";
      //this.fromData.orgName = "";
      //this.fromData.orgId = "";
      //this.fromData.deviceVersion = "";
      //.devObj.deviceNo = "";
      
      //this.devArr = [];
      this.isTake = false;
      this.isCenTake = false;
      this.fifteenImgArr = [];

      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      this.removeAttr(inpArr, "readOnly");
      this.removeAttr(check, "disabled");
    },
    //拍正面
    takeCenter() {
      let VM = this;
      let reg = /^[\u4e00-\u9fa5_a-zA-Z_]{2,20}$/g; //名字
      let reg2 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g; //身份证
      let reg3 = /^[a-zA-Z0-9]{8,9}$/g; //护照
      if(this.fromData.placeTag == 0){
          VM.$Message.error("未上传控场文件!");
      }
      if (!this.fromData.collectNo) {
        VM.$Message.error("请设置采集编号!");
        return;
      }
      if (!this.fromData.username) {
        VM.$Message.error("请填写姓名!");
        return;
      }
      if (!this.fromData.idNo) {
        VM.$Message.error("请填写身份证号!");
        return;
      }
      if (!this.fromData.username) {
        VM.$Message.error("请输入姓名");
        return;
      }
      if (!this.fromData.sex) {
        VM.$Message.error("请选择性别");
        return;
      }
      if (this.isLeftTake) {
        //是否拍过左面
        VM.$Message.error(`拍过左面后,不能拍正面!`);
        return;
      }

      let key = reg.test(this.fromData.username);
      let key2 = reg2.test(this.fromData.idNo);
      let key3 = reg3.test(this.fromData.idNo);
      if (this.fromData.type == 0) {
        if (!key2) {
          this.$Message.error("身份证填写有误");
          return;
        }
      } else if (this.fromData.type == 1) {
        if (!key3) {
          this.$Message.error("护照填写有误");
          return;
        }
      }
      if (!key) {
        this.$Message.error("请输入2-20位中文或英文");
        return;
      }

      if (this.key1) {
        return;
      }

      this.audio1 = document.getElementById("myAudio1");
      this.audio1.play();
      this.key1 = true;
      this.loading1 = true;
      this.beforeSendCen();
      if (this.audio1) {
        this.audio1.loop = false;
        if (this.key11) {
          return;
        }
        this.key11 = true;
      }
    },
    beforeSendCen(type) {
      let VM = this;
      let params = {
        req: "open",
        identifier: this.fromData.collectNo
      };
      let newData = {
        collectNo: VM.fromData.collectNo,
        deviceNo: VM.fromData.deviceNo,
        type: VM.fromData.type,
        idNo: VM.fromData.idNo,
        orgId: VM.fromData.orgId,
        orgName: VM.fromData.orgName,
        sex: VM.fromData.sex,
        username: VM.fromData.username,
        place: VM.fromData.place,
        name: "xsy",
        source: VM.fromData.deviceVersion
      };
      params.data = newData;
      this.$http.api
        .post(`http://${VM.takeUrl}/camera_server/api/browser/v1`, params)
        .then(function(res) {
          // console.log(res.data)
          if (res.data.msg == "ok") {
            if (type == "1") {
              VM.sendTake();
            }
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //请求正面
    sendCen() {
      let VM = this;
      let params = {
        req: "front",
        data: this.fromData.username,
        identifier: this.fromData.collectNo
      };
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      console.log("cen");
      VM.loading1 = false;
      VM.$http.api
        .post(`http://${VM.takeUrl}/camera_server/api/snap/v1`, params)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "ok") {
              VM.isCenTake = true;
              VM.leftClassKey = true;
              VM.isCenTakeDone = true;
              VM.isProhibit = true;
              VM.cenImgArr = JSON.parse(res.data.data);
              VM.saveCen = JSON.parse(res.data.data);
              VM.key1 = false;
              VM.$Message.success(`正面拍摄成功!`);
              VM.isTake = true;
              VM.setAttr(inpArr, "readOnly");
              VM.setAttr(check, "disabled");
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
      this.isLeftTake = true;

      if (!VM.isCenTake) {
        this.$Message.error("还未拍正面");
        return;
      }
      if (VM.loading1) {
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
      this.key2 = true;
      this.audio2 = document.getElementById("myAudio2");
      this.audio2.play();
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
        .post(`http://${VM.takeUrl}/camera_server/api/snap/v1`, params)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "ok") {
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
            //console.log(VM.cenImgPath);
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
      this.isRightTake = true;
      if (!VM.isLeftTake) {
        this.$Message.error("还未拍左面");
        return;
      }
      if (VM.loading2) {
        this.$Message.error("在拍左面时不能拍右面");
        return;
      }
      if (this.key3) {
        return;
      }
      this.key3 = true;
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
        .post(`http://${VM.takeUrl}/camera_server/api/snap/v1`, params)
        .then(function(res) {
          if (res.status == 200) {
            if (res.data.msg == "ok") {
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
          }
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
      VM.fromData.tag = this.tag2;
      this.newData = {
        collectNo: VM.fromData.collectNo,
        deviceNo: VM.fromData.deviceNo,
        type: VM.fromData.type,
        idNo: VM.fromData.idNo,
        orgId: VM.fromData.orgId,
        orgName: VM.fromData.orgName,
        sex: VM.fromData.sex,
        username: VM.fromData.username,
        place: VM.fromData.place,
        name: "xsy",
        source: VM.fromData.deviceVersion,
        tag: VM.fromData.tag
      };
      this.$refs.cenLeft.data = this.newData;
      this.$refs.cenLeft.getInfo(this.newData.idNo);
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
        identifier: VM.fromData.collectNo
      };
      console.log(this.newData);
      this.$http.api
        .post(`http://${VM.takeUrl}/camera_server/api/snap/v1`, params1)
        .then(function(res) {
          // console.log(res);
          if (res.status == 200 && res.data.msg == "ok") {
            let data = JSON.parse(res.data.data);
            VM.loadObj.one = false;
            if (!data.front) {
              VM.$refs.cenLeft.ms("正面");
              VM.photoesArr.frontFail = true;
            }
            VM.photoesArr.front = data.front;
            VM.$http.api
              .post(`http://${VM.takeUrl}/camera_server/api/snap/v1`, params2)
              .then(res => {
                if (res.status == 200 && res.data.msg == "ok") {
                  let data = JSON.parse(res.data.data);
                  if (!data.left) {
                    VM.$refs.cenLeft.ms("左侧");
                    VM.photoesArr.leftFail = true;
                  }
                  VM.loadObj.two = false;
                  VM.photoesArr.left = data.left;
                  VM.$http.api
                    .post(
                      `http://${VM.takeUrl}/camera_server/api/snap/v1`,
                      params3
                    )
                    .then(res => {
                      if (res.status == 200 && res.data.msg == "ok") {
                        let data = JSON.parse(res.data.data);
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
    //获取组织
    getOrg() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `/parent-police/farsee2/api/v1/organizations`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            if (data.length > 0) {
              //console.log(res.data.result)
              VM.options3 = data;
              VM.newOrgArr = data;
              //let time = VM.creatTime();
              VM.fromData.orgId = data[0].orgId;
              //VM.fromData.collectNo = data[0].orgId.slice(0, 4) + time;
              VM.fromData.orgName = data[0].orgName;
              VM.getDev(VM.fromData.orgId,"go");
            } else {
              VM.$Message.error(`没有采集单位`);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择组织
    selectOrg(data) {
      this.reSetData('org');
      this.fromData.orgId = data.orgId;
      this.fromData.orgName = data.orgName;
      this.orgId = data.orgId;
      this.devStatus = "test";
      this.devObj.deviceNo = "";
      this.rightImgPath = "";
      this.leftImgPath = "";
      this.cenImgPath = "";
      this.livePreUrl = "";
      this.getDev(data.orgId,"go");
      // console.log(this.fromData);
    },
    //根据设备换Ip
    selectDev(data) {
      console.log(data)
      this.fromData.placeTag = data.placeTag;
      this.fromData.deviceId = data.id;
      
      this.devObj.deviceNo = data.deviceNo;
      if(data.deviceStatusCname == '禁用'){
         this.$Message.error("该设备已经禁用!");
         this.devStatus = "disabled";
         return
      }

      this.getServerStatus(data);

      // console.log(this.takeUrl);
      // console.log(this.livePreUrl);
    },
    //选择证件类型
    selectIdType(data) {
      this.fromData.type = data.type;
      this.fromData.idNo = "";
      // console.log(this.fromData)
    },
    //根据id换IP
    getDevById(data) {
      // console.log(data);
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/devices/${data}`)
        .then(function(res) {
          if (res.data.code === 0) {
           
            let data = res.data.result;
             console.log(data)
            let time = VM.creatTime();
            VM.fromData.collectNo = data.orgId.slice(0, 4) + time;
            VM.collectNo = data.orgId.slice(0, 4) + time;
        
            VM.takeUrl = data.deviceIp;
            VM.devObj.deviceNo = data.deviceNo;
            VM.fromData.orgName = data.orgName;
            VM.fromData.orgId = data.orgId;
            VM.getDev(data.orgId,"jump");
            VM.fromData.deviceVersion = data.deviceVersion;
            VM.livePreUrl = data.strUrl;
            VM.fromData.place = data.place;
            VM.fromData.deviceNo = data.deviceNo;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取某机构下的设备
    getDev(data,type) {
      // console.log(data)
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 + `parent-police/api/v1/devices?orgId=${data}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            //console.log(data);
            VM.devArr = data;
            if (VM.devArr.length == 1) {
              console.log(1)
              VM.devObj.deviceNo = VM.devArr[0].deviceNo;
              VM.selectDev(data[0]);
            }
            if (VM.devArr.length > 1) {
               if(type == "go"){
                    VM.$Message.success("请选择设备");
                    VM.devStatus = "chose";
               }
            }
            if (VM.devArr.length == 0) {
              VM.devObj.deviceNo = "暂无";
              VM.setAttr(inpArr, "readOnly");
              VM.setAttr(check, "disabled");
              VM.isProhibit = true;
              VM.takeUrl = "";
              VM.livePreUrl = "";
              VM.fromData.collectNo = "";
              VM.$Message.error("该机构没有设备,请添加设备");
              VM.devStatus = "add";
              return;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    creatTime() {
      return new Date().getTime();
    },
    setAttr(dom, attr) {
      //增加属性readonly
      if (!dom) {
        return;
      }
      dom.each((index, ele) => {
        $(ele).attr(attr, true);
      });
    },
    removeAttr(dom, attr) {
      //
      if (!dom) {
        return;
      }
      dom.each((index, ele) => {
        $(ele).removeAttr(attr);
      });
    },
    giveUpReSetData(){

    },
    //重置数据
    reSetData(data) {
      // this.fromData.type = 0;
      if(data != 'giveUp'){
        this.fromData.username = "";
        this.fromData.idNo = ""; 
      }
     
      this.fromData.sex = "男";
      //this.fromData.deviceVersion = "";

      //this.fromData.age = null;
      //this.fromData.address = "";
      //.fromData.ethnicity = "";

      this.cenClassKey = true;
      this.RightClassKey = false;
      this.leftClassKey = false;

      this.isCenTake = false;
      this.isLeftTake = false;
      this.isRightTake = false;

      this.isCenTakeDone = false;
      this.isLeftTakeDone = false;
      this.isRightTakeDone = false;

      this.cenWord = { one: "正面预览", two: "正面" };
      this.leftWord = { one: "左面预览", two: "左面" };
      this.rightWord = { one: "右面预览", two: "右面" };

      this.isProhibit = false;
      this.isTake = false;

      this.loadObj = {
        one: true,
        two: true,
        three: true
      };

      this.photoesArr = {
        front: "",
        frontFail: false,
        left: "",
        leftFail: false,
        right: "",
        rightFail: false,
        isCreate: false
      };
      this.cenImgArr = [];
      this.saveCen = [];
      this.leftImgArr = [];
      this.saveLeft = [];
      this.rightImgArr = [];
      this.saveRight = [];
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      this.removeAttr(inpArr, "readOnly");
      this.removeAttr(check, "disabled");
      if(data != "org"){
           if(data == 'giveUp'){
             return
           }
      let time = this.creatTime();
      this.fromData.collectNo = this.fromData.orgId.slice(0, 4) + time;
      this.collectNo = this.fromData.orgId.slice(0, 4) + time;
      }
    },
    getUserInfro() {
      let token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        console.log('无token')
        return;
      }
      this.fromData.accessToken = token.accessToken;
    },
    handleChange() {

    },
    //获取标签
    getCategorys() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/api/v1/categorys`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            if (data.length > 4) {
              VM.initLabel = data.slice(0, 4);
            } else {
              VM.initLabel = data;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //加标签
    addLabel() {
      if (this.otherVal) {
        this.otherKey = true;
      } else {
        this.otherKey = false;
      }
    },
    //保存标签
    saveLabel() {
      if(this.labelVal){
          let reg = /^[0-9]*$/g;
          let key1 = reg.test(this.labelVal);
          if (key1) {
          this.$Message.error("标签不能为数字!");
          return;
        }
      }
      if (this.labelVal.length > 6) {
          this.$Message.error("标签字符长度超过6!");
          return;
      }
      if(this.labelVal.indexOf(' ') > -1 ){
          this.$Message.error(`标签类别不合法,为中英文或下划线,1-12字!`);
          return;
      }
      if (!this.labelVal) {
        this.$Message.error(`标签不能为空!`);
        return;
      }
      if (this.tag2.length >= 5) {
         this.$Message.error(`标签最多为5个!`);
         return;
      }
      if( this.labelArr.includes(this.labelVal) ){
         this.$Message.error(`不能添加相同标签!`);
         return
      }
      this.labelArr.push(this.labelVal);
      this.tag2.push(this.labelVal);
      // console.log(this.tag2);
      this.otherKey = false;
      this.labelVal = "";
    },
    //删除标签
    deleteLabel(data, data2) {
      this.labelArr.splice(data, 1);
      this.tag2 = this.tag2.filter((ele, index) => {
        return ele != data2;
      });
    },
    //编辑标签
    edit() {
      this.otherKey = true;
    },
    tu_chanege(data) {
      console.log(this.tag2);
    },
    onInput(e) {
      if (this.fromData.type == 0) {
        if (e.target.value.length > 18) {
          e.target.value = e.target.value.slice(0, 18);
          this.fromData.idNo = e.target.value;
        }
      } else if (this.fromData.type == 1) {
        if (e.target.value.length > 9) {
          e.target.value = e.target.value.slice(0, 9);
          this.fromData.idNo = e.target.value;
        }
      }
    },
    //去添加设备
    goAdd() {
      this.$router.push({ name: "addDec" });
      this.changNow({val:1})
    },
    //检测
    getServerStatus(data) {
      // console.log(data)
      let VM = this;
      let params = {
        req: "check",
        data: "all"
      };
      this.$http.api.post(`http://${data.deviceIp}/camera_server/api/checkcamera/v1`,params,
            {
            headers: {"Content-Type": "application/json"}
            }
        )
        .then(function(res) {
          //console.log(res);
          if (res.status === 200) {
            let data1 = JSON.parse(res.data.data);
            //console.log(data);
            if (data1.length > 0) {
              VM.devStatus = "trouble";
              VM.$Message.error("该设备是故障状态");
              VM.livePreUrl = '';
              VM.takeUrl = '';
              VM.fromData.collectNo = '';
              VM.collectNo = '';
              console.log(VM.fromData)
              VM.upDateDev(VM.fromData.deviceId,0);
              
            } else {
              VM.devStatus = "";
              let time = VM.creatTime();
              VM.fromData.collectNo = data.orgId.slice(0, 4) + time;
              VM.collectNo = data.orgId.slice(0, 4) + time;
              VM.upDateDev(VM.fromData.deviceId,1)
              // if (data.status == 0) {
              //   VM.$Message.error("该设备是禁用状态");
              //   VM.setAttr(inpArr, "readOnly");
              //   VM.setAttr(check, "disabled");
              //   VM.disabled = true;
              //   VM.isProhibit = true;
              //   VM.takeUrl = "";
              //   VM.livePreUrl = "";
              //   VM.fromData.collectNo = "";
              //   VM.fromData.place = "";
              //   VM.fromData.deviceNo = "";
              //   return;
              // }
              // if (data.cRunStatus == "故障") {
              //   VM.$Message.error("该设备是故障状态");
              //  VM.setAttr(inpArr, "readOnly");
              //  VM.setAttr(check, "disabled");
              //   VM.isProhibit = true;
              //   VM.takeUrl = "";
              //   VM.livePreUrl = "";
              //   VM.fromData.collectNo = "";
              //   VM.fromData.place = "";
              //   VM.fromData.deviceNo = "";
              //   return;
              // 
              //VM.removeAttr(inpArr, "readOnly");
              //VM.removeAttr(check, "disabled");

              VM.isProhibit = false;
              VM.fromData.place = data.place;
              VM.fromData.deviceNo = data.deviceNo;
              VM.fromData.deviceVersion = data.deviceVersion;
              VM.takeUrl = data.deviceIp;
              VM.livePreUrl = data.strUrl;
            }
          }
        })
        .catch(function(error) {
          VM.$Message.error("拍摄服务没有开启");
          VM.livePreUrl = '';
          VM.takeUrl = '';
          VM.fromData.collectNo = '';
          VM.collectNo = '';
          VM.devStatus = "serverTrouble";
          console.log(error);
        });
    },
    //更新设备状态
    upDateDev(id,data) {
      let VM = this;
      let params = {
         runStatus:data
      }
      this.$http.api
        .put(window.BASEURL.testUrl1 + `parent-police/api/v1/devices/${id}`,params)
        .then(function(res) {
          if (res.data.code === 0) {
             console.log(res.data.msg)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

  },
  components: {
    MDialog
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/portraitCollection/shootCollection2.scss";
</style>
