<template>
  <div class="shoot-wrapper">
    <el-dialog :visible.sync="centerDialogVisible" width="15%" center :show-close="false">
      <div class="suc-box">
        <span class="suc-w">拍照成功!</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="seeAll">查看全部照片</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>

    <div class="shoot-header" id="shoot-header">
      <m-crums :con="crumsData" />
      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one">
            <span class="must">采集编号</span>
            <input type="text" id="one" class="inp" v-model="fromData.collectNo" readonly disabled />
          </label>
        </div>

        <div class="inp-con">
          <label for="two">
            <span class="must">
              采集机构
              <span style="color:red">*</span>
            </span>
            <el-select v-model="fromData.orgName" placeholder="请选择" v-if="!isCenTake"  @change="handleChange" filterable >
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
          <label for="thr1" v-if="!id && devArr.length > 0">
            <span class="must">采集设备</span>
            <el-select v-model="devObj.deviceVersion" placeholder="请选择" v-if="!isProhibit">
              <el-option
                @click.native="selectDev(item)"
                v-for="(item,index) in devArr"
                :key="index"
                :label="item.deviceVersion"
                :value="item.deviceVersion"
              ></el-option>
            </el-select>
            <input
              type="text"
              id="thr1"
              class="inp"
              v-model="devObj.deviceVersion"
              readonly
              v-if="isProhibit"
            />
          </label>
          <label for="four1" v-if="id">
            <span class="must">采集设备</span>
            <el-select v-model="devObj.deviceVersion" placeholder="请选择" v-if="!isProhibit">
              <el-option
                @click.native="selectDev(item)"
                v-for="(item,index) in devArr"
                :key="index"
                :label="item.deviceVersion"
                :value="item.deviceVersion"
              ></el-option>
            </el-select>
            <input
              type="text"
              id="four1"
              class="inp"
              v-model="devObj.deviceVersion"
              readonly
              v-if="isProhibit"
            />
          </label>
        </div>
      </div>

      <div class="shoot-inp">
        <div class="inp-con">
          <el-tooltip content="请输入2-20位中文或英文" placement="bottom">
            <label for="thr">
              <span class="must">
                姓名
                <span style="color:red">*</span>
              </span>
              <input
                type="text"
                id="thr"
                class="inp inp1"
                v-model="fromData.username"
                @blur="handleBlur"
                autocomplete="off"
              />
            </label>
          </el-tooltip>
        </div>

        <div class="inp-con">
          <el-tooltip content="18位身份证号" placement="bottom">
            <label for="four">
              <span class="must">
                证件号码
                <span style="color:red">*</span>
              </span>
              <input
                type="text"
                id="four"
                class="inp inp1"
                v-model="fromData.idNo"
                @blur="handleBlur1"
                autocomplete="off"
              />
            </label>
          </el-tooltip>
        </div>

        <div class="inp-con">
          <label for="five">
            <span class="must">
              选择性别
              <span style="color:red">*</span>
            </span>

            <el-select v-model="fromData.sex" placeholder="请选择" readonly v-if="!isProhibit">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <input
              type="text"
              id="five"
              class="inp"
              v-model="fromData.sex"
              readonly
              v-if="isProhibit"
            />
          </label>
        </div>
      </div>

      <div class="shoot-inp">
        <div class="inp-con">
          <label for="six">
            <span class="must">
              年龄
              <span style="color:red">*</span>
            </span>
            <input
              type="text"
              id="six"
              class="inp inp1"
              v-model.number="fromData.age"
              @blur="handleBlur2"
              autocomplete="off"
            />
          </label>
        </div>

        <div class="inp-con">
          <label for="sen">
            <span class="must">民族</span>
            <input type="text" id="sen" class="inp inp1" v-model="fromData.ethnicity" autocomplete="off" />
          </label>
        </div>

        <div class="inp-con">
          <label for="eni">
            <span class="must">住址</span>
            <input type="text" id="eni" class="inp inp1" v-model="fromData.address"  autocomplete="off" />
          </label>
        </div>
      </div>

      <div class="shoot-sec">
        <span class="label">标签</span>
        <CheckboxGroup v-model="fromData.tag">
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
          <span class="label-item" v-for="(item,index) in labelArr" :key="index">
            <span class="label-w">{{item}}</span>
            <i class="el-icon-close" style="color:red" @click="deleteLabel(index)"></i>
          </span>

          <span class="edit" @click="edit()" v-if="labelArr.length > 0">
            <Icon type="md-create" />
            <span class="edit-w">编辑</span>
          </span>
        </div>
      </div>


    </div>

    <div class="shoot-content">
      <div class="shoot-top">
        <div class="left1">
          <img :src="`http://${livePreUrl}/?action=stream`" class="liveImg" v-if="livePreUrl" />
          <!-- <img src="../../assets/img/text.png" alt v-if="!livePreUrl"/> -->
          <Spin class="loading" v-if="!livePreUrl"></Spin>
        </div>

        <div class="right">
          <p class="header">
            <span class="yul">拍照预览</span>
            <!-- <span class="seeAll" @click="seeAll">
              <img src="../../assets/img/up.png" alt />
              查看全部照片
            </span>-->
          </p>
          <div class="content">
            <div class="content-item">
              <div :class="['btn',{'now':!cenClassKey}]" @click="takeCenter">
                <!-- <Icon type="ios-camera-outline" size="25px"/> -->
                <span>拍正面</span>
              </div>
              <div
                class="content-item-img"
                v-loading="loading1"
                element-loading-text="拍照中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
              >
                <img
                  :src="`data:image/png;base64,${cenImgPath}`"
                  alt
                  v-if="cenImgPath"
                  class="takeImg"
                />
                <img src="../../assets/img/text1.png" alt class="cen-bg" v-else />
              </div>
            </div>
            <div class="content-item">
              <div :class="['btn',{'now':!leftClassKey}]" @click="takeLeft">
                <!-- <Icon type="ios-camera-outline" size="25px"/> -->
                <span>拍左面</span>
              </div>
              <div
                class="content-item-img"
                v-loading="loading2"
                element-loading-text="拍照中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
              >
                <img
                  :src="`data:image/png;base64,${leftImgPath}`"
                  alt
                  v-if="leftImgPath"
                  class="takeImg"
                />
                <img src="../../assets/img/text2.png" alt class="cen-bg" v-else />
              </div>
            </div>
            <div class="content-item">
              <div :class="['btn',{'now':!RightClassKey}]" @click="takeRight">
                <!-- <Icon type="ios-camera-outline" size="25px"/> -->
                <span>拍右面</span>
              </div>
              <div
                class="content-item-img"
                v-loading="loading3"
                element-loading-text="拍照中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
              >
                <img
                  :src="`data:image/png;base64,${rightImgPath}`"
                  alt
                  v-if="rightImgPath"
                  class="takeImg"
                />
                <img src="../../assets/img/text3.png" alt class="cen-bg" v-else />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fDetalis-content-shoot" v-if="showAllImgKey">
        <p class="title">照片预览</p>
        <div class="cen-box">
          <div
            class="img-box"
            :style="{backgroundImage:`url(${cenPath}) `,backgroundSize:`100% 100%`}"
          ></div>
          <!-- <div class="img-box" v-for="(item,index) in 33" :key="item">
            <img :src="`${cenImgPath}${collectNo}_${index+1}.jpg`" alt />
            <p class="cencen">正面—{{index+1}}号摄像头</p>
          </div>-->
          <div class="img-box" v-for="(item,index) in cenImgArr" :key="index">
            <img :src="`data:image/png;base64,${item[index]}`" alt />
            <p class="cencen">正面—{{index+1}}号摄像头</p>
          </div>
        </div>
        <div class="left-box">
          <div
            class="img-box"
            :style="{backgroundImage:`url(${leftPath}) `,backgroundSize:`100% 100%`}"
          ></div>
          <!-- <div class="img-box" v-for="(item,index) in imgArr" :key="index">
            <img :src="`${leftImgPath}${collectNo}_${item}-2.jpg`" alt />
            <p class="cencen">左面—{{index+1}}号摄像头</p>
          </div>-->

          <div class="img-box" v-for="(item,index) in leftImgArr" :key="index">
            <img :src="`data:image/png;base64,${item[index]}`" alt />
            <p class="cencen">左面—{{index+1}}号摄像头</p>
          </div>
        </div>
        <div class="right-box">
          <div
            class="img-box"
            :style="{backgroundImage:`url(${rightPath2}) `,backgroundSize:`100% 100%`}"
          ></div>
          <!-- <div class="img-box" v-for="(item,index) in imgArr" :key="index">
            <img :src="`${rightImgPath}${collectNo}_${item}-3.jpg`" alt />
            <p class="cencen">右面—{{index+1}}号摄像头</p>
          </div>-->

          <div class="img-box" v-for="(item,index) in rightImgArr" :key="index">
            <img :src="`data:image/png;base64,${item[index]}`" alt />
            <p class="cencen">右面—{{index+1}}号摄像头</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import * as URL from "@/plugins/env.js";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    MCrums
  },
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false,

      isCenTake: false,
      isLeftTake: false,
      isRightTake: false,
      isTakeDone: false,

      isProhibit: false, //是否禁用and拍了正面

      key1: false,
      key2: false,
      key3: false,

      cenClassKey: true,
      leftClassKey: false,
      RightClassKey: false,

      otherKey: false, //是否显示其他
      
      otherVal: false, //是否点其他
      labelVal: "", //新标签
      initLabel: [],
      labelArr: [],
      collectNo: "",
      takeUrl: "",

      crumsData: {
        one: "人像采集",
        two: "拍摄采集",
        istake: true
      },
      fromData: {
        collectNo: "",
        orgName: "",
        orgId: "",
        tag: [],
        username: "",
        idNo: "",
        type: 1,
        sex: "男",
        age: null,
        ethnicity: "",
        address: "",
        accessToken: "",
        dataUrl: ""
      },

      cenImgPath: "",
      cenImgArr: [],
      leftImgPath: "",
      leftImgArr: [],
      rightImgPath: "",
      rightImgArr: [],
      livePreUrl: "",
      takeUrl: "",

      cenPath: require("@/assets/img/cen.png"),
      leftPath: require("@/assets/img/leftOne.png"),
      rightPath2: require("@/assets/img/rightOne.png"),

      showAllImgKey: false,

      options3: [],
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
      centerDialogVisible: false,
      imgArr: [],
      devArr: [], //设备数组
      devObj: {},
      id: "" //设备id
    };
  },
  created() {

   
    this.changIndex({val:'1-1'})

    this.getOrg();
    this.getUserInfro();
    this.getCategorys(); //获取标签
    this.id = this.$route.query.id;
    if (this.id) {
      console.log(this.id)
      this.getDevById(this.id);
    }
    // console.log(this.id)
  },
  methods: {
    ...mapMutations(['changIndex']),
    getCategorys() {
      //获取标签
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/api/v1/categorys`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            // console.log(data);
            VM.initLabel = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getOrg() {
      //获取组织
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/farsee2/api/v1/organizations`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            VM.options3 = data;
            VM.newOrgArr = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectOrg(data) {
      //选择组织
      let time = this.creatTime();
      this.fromData.orgId = data.orgId;
      this.fromData.collectNo = data.orgId.slice(0, 4) + time;
      this.orgId = data.orgId;
      this.collectNo = data.orgId.slice(0, 4) + time;

      this.rightImgPath = "";
      this.leftImgPath = "";
      this.cenImgPath = "";
      this.livePreUrl = "";
      this.reSetData();

      this.getDev(data.orgId);
    },
    selectDev(data) {
      //根据设备换Ip
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      if (data.status == 0 || data.cRunStatus == "故障") {
        this.$Message.error("该设备是禁用状态");
        this.setAttr(inpArr, "readOnly");
        this.setAttr(check, "disabled");
        this.isProhibit = true;
        this.takeUrl = "";
        this.livePreUrl = "";
        this.fromData.collectNo = "";
        return;
      }

      this.removeAttr(inpArr, "readOnly");
      this.removeAttr(check, "disabled");
      this.isProhibit = false;
      this.takeUrl = data.deviceIp;
      this.livePreUrl = data.strUrl;

      // this.livePreUrl = `http://192.168.20.30:8080`;
      // console.log(this.takeUrl);
    },
    getDevById(data) {
      //根据id换IP
      console.log(data);
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/devices/${data}`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;
            let time = VM.creatTime();
            VM.takeUrl = data.deviceIp;
            VM.devObj.deviceVersion = data.deviceVersion;
            VM.fromData.orgName = data.orgName;
            VM.fromData.orgId = data.orgId;
            VM.fromData.collectNo = data.orgId.slice(0, 4) + time;
            VM.collectNo = data.orgId.slice(0, 4) + time;
            VM.livePreUrl = data.strUrl;
            // console.log(data.strUrl);
            // console.log(VM.fromData);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getDev(data) {
      // console.log(data)
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/devices?orgId=${data}`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            // console.log(data);
            VM.devArr = data;
            if (VM.devArr.length == 1) {
              VM.devObj.deviceVersion = VM.devArr[0].deviceVersion;
              VM.selectDev(data[0]);
            }
            if (VM.devArr.length > 1) {
              VM.$Message.success("请选择设备");
            }
            if (VM.devArr.length == 0) {
              VM.devObj.deviceVersion = "";
              VM.setAttr(inpArr, "readOnly");
              VM.setAttr(check, "disabled");
              VM.isProhibit = true;
              VM.takeUrl = "";
              VM.livePreUrl = "";
              VM.fromData.collectNo = "";
              VM.$Message.error("该机构没有设备,请添加设备");
              return;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
    reSetData() {
      //重置数据
      this.fromData.tag = [];
      this.fromData.username = "";
      this.fromData.idNo = "";
      this.fromData.sex = "";
      this.fromData.age = null;
      this.fromData.address = "";
      this.fromData.ethnicity = "";

      this.cenClassKey = true;
      this.RightClassKey = false;
      this.leftClassKey = false;
    },
    //拍正面
    takeCenter() {
      let VM = this;
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      if (this.isCenTake) {
        return;
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
      if (!this.fromData.age) {
        VM.$Message.error("请填写年龄!");
        return;
      }
      //加锁
      if (this.key1) {
        return;
      }
      this.key1 = true;
      this.isProhibit = true;
      this.loading1 = true;
      let params = {
        req: "front"
      };
      params.identifier = VM.fromData.collectNo;
      // console.log(params);
      this.$http.api
        .post(`http://${this.takeUrl}/camera_server/api/snap/v1`, params)
        .then(function(res) {
          console.log(res);
          if (res.status == 200) {
            if (res.data.msg == "ok") {
              VM.loading1 = false;
              VM.isCenTake = true;
              VM.cenClassKey = false;
              VM.leftClassKey = true;
              VM.cenImgPath = JSON.parse(res.data.data)[1][1];
              VM.cenImgArr = JSON.parse(res.data.data);
              //console.log(JSON.parse(res.data.extra))
              VM.$Message.success(`正面拍摄成功!`);
              VM.setAttr(inpArr, "readOnly");
              VM.setAttr(check, "disabled");
            } else {
              VM.loading1 = false;
              VM.$Message.error(`正面拍照失败!`);
            }
            //console.log(VM.cenImgPath);
            VM.key1 = false;
          }
        })
        .catch(function(error) {
          VM.key1 = false;
          VM.loading1 = false;
          VM.$Message.error(`正面拍照失败!`);
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
      if (!this.fromData.age) {
        VM.$Message.error("请填写年龄!");
        return;
      }
      if (this.isLeftTake) {
        return;
      }
      if (this.key2) {
        return;
      }
      this.key2 = true;
      VM.loading2 = true;
      let params = {
        req: "left"
      };
      params.identifier = VM.fromData.collectNo;
      // console.log(params);
      this.$http.api
        .post(`http://${this.takeUrl}/camera_server/api/snap/v1`, params)
        .then(function(res) {
          // console.log(res);
          if (res.status == 200) {
            if (res.data.msg == "ok") {
              VM.isLeftTake = true;
              VM.leftClassKey = false;
              VM.RightClassKey = true;
              VM.loading2 = false;
              VM.leftImgPath = JSON.parse(res.data.data)[1][1];
              VM.leftImgArr = JSON.parse(res.data.data);
              VM.$Message.success(`左面拍摄成功!`);
            } else {
              VM.loading2 = false;
              VM.leftClassKey = false;
              VM.$Message.error(`左面拍摄失败!`);
            }
            VM.key2 = false;
            //console.log(VM.leftImgPath);
          }
        })
        .catch(function(error) {
          VM.key2 = false;
          VM.loading2 = false;
          VM.$Message.error(`左面拍摄失败!`);
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
      if (this.isRightTake) {
        return;
      }
      if (this.key3) {
        return;
      }
      this.key3 = true;
      VM.loading3 = true;
      this.fromData.tag = this.fromData.tag.concat(this.labelArr);
      let data = [this.fromData];
      let params = {
        req: "right",
        data
      };
      params.identifier = VM.fromData.collectNo;
      this.$http.api
        .post(`http://${this.takeUrl}/camera_server/api/snap/v1`, params)
        .then(function(res) {
          if (res.status == 200) {
            let data = JSON.parse(res.data.data);
            if (res.data.msg == "ok") {
              VM.rightImgPath = data[1][1];
              VM.rightImgArr = data;
              VM.loading3 = false;
              VM.isRightTake = true;
              VM.centerDialogVisible = true;
              VM.RightClassKey = true;
              VM.isTakeDone = true;
            } else {
              if (data.length < 0) {
                VM.loading3 = false;
                VM.isCenTake = false;
                VM.$Message.error(`右面拍摄失败!`);
              } else {
                VM.loading3 = false;
                VM.isCenTake = false;
                VM.rightImgPath = data[1][1];
                VM.$Message.error(`上传失败!`);
              }
            }
            VM.key3 = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sure() {
      let inpArr = $(".inp1");
      let check = $(".ivu-checkbox-input");
      this.removeAttr(inpArr, "readOnly");
      this.removeAttr(check, "disabled");

      this.isCenTake = false;
      this.isLeftTake = false;
      this.isRightTake = false;

      this.isProhibit = false;
      this.fromData.collectNo = "";
      this.fromData.orgName = "";
      this.fromData.orgId = "";
      this.reSetData();

      this.centerDialogVisible = false;
    },

    addLabel() {
      if (this.otherVal) {
        this.otherKey = true;
      } else {
        this.otherKey = false;
      }
    },
    saveLabel() {
      if (!this.labelVal) {
        this.$Message.error("标签不能为空!");
        return;
      }
      this.labelArr.push(this.labelVal);
      this.otherKey = false;
      this.labelVal = "";
    },
    deleteLabel(data) {
      this.labelArr.splice(data, 1);
    },
    edit() {
      this.otherKey = true;
    },
    creatTime() {
      return new Date().getTime();
    },
    seeAll() {
      this.sure();
      this.showAllImgKey = true;
    },
    getUserInfro() {
      let token = JSON.parse(sessionStorage.getItem("token"));
      if (!token) {
        return;
      }
      this.fromData.accessToken = token.accessToken;
    },
    handleBlur() {
      let reg = /^[\u4E00-\u9FA5]{2,20}$/g;
      let reg1 = /^[a-zA-Z\/ ]{2,20}$/g;
      let key = reg.test(this.fromData.username);
      let key1 = reg1.test(this.fromData.username);
      if (!key||!key1) {
        this.$Message.error("请输入2-20位中文或英文");
      }
    },
    handleBlur1() {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g;
      let key = reg.test(this.fromData.idNo);
      if (!key) {
        this.$Message.error("身份证填写有误");
      }
    },
    handleBlur2() {
      let reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/g;
      let key = reg.test(this.fromData.age);
      if (!key) {
        this.$Message.error("年龄填写有误");
      }
    },
    handleChange(){
       console.log(this.fromData.orgName)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/portraitCollection/shootCollection.scss";
</style>
