<template>
  <div class="im-box">
    <el-dialog
      title="导入人脸"
      :visible.sync="con"
      width="1000px"
      center
      :before-close="handleClose"
      class="faceImport"
      :close-on-click-modal="false"
    >
      <div class="import_box">
        <div class="nav__box">
          <m-rearchTip :con="rearchData"/>
          <span :class="['nav__item',{'active':activeKey1}]" @click="modelImport" v-if="power[5014]">模型导入</span>
          <span :class="['nav__item',{'active':activeKey2}]" @click="imgImport" v-if="power[5015]">图片导入</span>
        </div>

        <div class="import__content">
          <div class="one" v-show="activeKey1 && power[5014]">
            <div class="shoot-inp">
              <div class="inp-con">
                <label for="five">
                  <span class="must">姓名</span>
                  <el-tooltip content="根据姓名查询" placement="bottom">
                    <input type="text" class="inp" v-model="fromData1.username" autocomplete="off" />
                  </el-tooltip>
                </label>
              </div>

              <div class="inp-con">
                <label for="five">
                  <span class="must">选择性别</span>
                  <el-select v-model="fromData1.sex" placeholder="请选择" class="faceImport">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </label>
              </div>

              <div class="inp-con">
                <label for="five">
                  <span class="must">标签</span>
                  <el-select v-model="fromData1.tag" placeholder="请选择" class="faceImport">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </label>
              </div>
              <div class="inp-con">
                <button class="addDec" @click="rearch">查询</button>
              </div>
            </div>
            <div class="shoot-inp other">
              <div class="inp-con">
                <label for="five">
                  <span class="must">所属</span>
                  <el-tooltip content="所属字符长度不能超过20" placement="bottom">
                    <input type="text"  class="inp" v-model="fromData1.belong" autocomplete="off" maxlength="20"/>
                  </el-tooltip>
                  <span class="inp__tips">(*必填)</span>
                </label>
              </div>
              <!-- <div class="inp-con">
                <Checkbox v-model="checkAll" @on-change="change1()">全选</Checkbox>
              </div>-->
            </div>

            <div class="model__box">
              <span class="checkAll">全选</span>
              <div style="margin-top: 20px" v-show="0">
                <el-button @click="toggleSelection">取消选择</el-button>
              </div>
              <el-table
                :data="modelArr"
                class="modelList"
                :row-key="getRowKeys"
                ref="multipleTable1"
                @selection-change="handleSelectionChange1"
              >
                <el-table-column
                  width="30"
                  type="selection"
                  :reserve-selection="true"
                  class="checkBox"
                ></el-table-column>
                <el-table-column width="120px" align="center">
                  <template slot-scope="scope">
                    <img :src="`${imgUrl}/${scope.row.imageUrl}`" alt class="model-item-img" />
                    <p class="username">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="scope.row.username"
                        placement="top-start"
                        v-if="scope.row.username.length>5"
                      >
                        <span class="username__item">{{scope.row.username}}</span>
                      </el-tooltip>
                      <span class="username__item" v-else>{{scope.row.username}}</span>
                      <!-- <span class="username__item"> {{scope.row.username}}</span> -->
                    </p>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <div class="model-item" v-for="(item,index) in modelArr" :key="item.id+index">
                <img :src="`${imgUrl}/${item.imageUrl}`" alt class="model-item-img" />
                <p class="username">
                  <img src="../../assets/img/img3/B-Ellipse.png" alt v-if="item.status == 1" />
                  <img src="../../assets/img/img3/R-Ellipse.png" alt v-if="item.status == 0" />
                  {{item.username}}
                </p>
                <Checkbox v-model="item._check" class="checkBox" @on-change="change(item)"></Checkbox>
              </div>-->
            </div>
            <div class="slot-box">
              <el-pagination
                class="slot"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[12]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
          <div class="thr" v-if="activeKey2 && power[5015]">
            <div class="shoot-inp">
              <div class="inp-con">
                <label for="five">
                  <span class="must">姓名</span>
                  <el-tooltip content="姓名字符长度不能超过8" placement="bottom">
                    <input
                      type="text"
                      class="inp"
                      v-model="fromData2.username"
                      autocomplete="off"
                      maxlength="8"
                    />
                  </el-tooltip>
                </label>
              </div>

              <div class="inp-con">
                <label for="five">
                  <span class="must">选择性别</span>
                  <el-select v-model="fromData2.sex" placeholder="请选择" class="tuImport">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </label>
              </div>
            </div>

            <div class="shoot-inp">
              <div class="inp-con">
                <label for="two">
                  <span class="must">证件类型</span>
                  <el-select v-model="idType" placeholder="请选择" filterable class="tuImport2">
                    <el-option
                      @click.native="selectIdType(item)"
                      v-for="(item,index) in options4"
                      :key="index"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </label>
              </div>

              <div class="inp-con">
                <el-tooltip
                  :content="fromData2.type == 0 ? `18位身份证号`: `最多9位护照号`"
                  placement="bottom"
                >
                  <label for="four">
                    <span class="must">证件号码</span>
                    <input
                      @input="onInput"
                      type="text"
                      id="four"
                      class="inp"
                      v-model="fromData2.idNo"
                      autocomplete="off"
                    />
                  </label>
                </el-tooltip>
              </div>
            </div>

            <div class="shoot-inp">
              <div class="inp-con beLong">
                <label for="five">
                  <span class="must">所属</span>
                  <el-tooltip content="所属字符长度不能超过20" placement="bottom">
                    <input
                      type="text"
                   
                      class="inp"
                      v-model="fromData2.belong"
                      autocomplete="off"
                      maxlength="20"
                    />
                  </el-tooltip>
                  <span class="inp__tips">(*必填)</span>
                </label>
              </div>

              <div class="shoot-sec">
                <span class="label">标签</span>
                <!-- <el-select v-model="tag2" placeholder="请选择" class="faceImport">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    @click.native="selectLabel(item)"
                  ></el-option>
                </el-select> -->
                <div class="label__wrap">
                  <div class="label-item" v-for="(item,index) in labelArr" :key="index">
                    <span class="label-w">{{item}}</span>
                    <i class="el-icon-close" style="color:red" @click="deleteLabel(index,item)"></i>
                  </div>
                </div>

                <!-- <CheckboxGroup v-model="tag2" @on-change="tu_chanege">
                  <Checkbox
                    :label="item.value"
                    class="label1"
                    v-for="(item,index) in initLabel"
                    :key="item+index"
                  ></Checkbox>
                </CheckboxGroup>-->
                <!-- <Checkbox @on-change="addLabel" v-model="otherVal">其他:</Checkbox> -->

                <div class="add" v-if="otherKey">
                  <input type="text" class="add-inp" v-model="labelVal" />
                  <button class="addbtn" @click="saveLabel">保存</button>
                </div>
                <!-- 
                <div class="label-box">
                  <span class="edit" @click="edit()" v-if="labelArr.length > 0">
                    <Icon type="md-create" />
                    <span class="edit-w">新增</span>
                  </span>
                </div>-->
              </div>
            </div>

            <div class="shoot-inp">
              <div class="inp-con1">
                <label for="five">
                  <span class="must">图片:</span>

                  <span class="upload_num" v-if="uploadList.length > 0">
                    已上传
                    <span class="num">{{uploadList.length}}</span>
                    张图片
                  </span>
                  <span class="num1" v-else>(需上传一人的一张或多少图片的zip包)</span>
                </label>
              </div>

              <span class="uploading" v-if="isUploading">上传中...</span>
            </div>

            <div class="img__box">
              <button :class="['new__btn']" @click="uploadFile1">
                <input
                  multiple
                  type="file"
                  hidden
                  @change="beforeUploadFile1($event)"
                  id="upload_file1"
                  class="file-inp"
                />
              </button>
              <div class="img__item" v-for="(item,index) in uploadList" :key="index">
                <img :src="item.url" alt class="img" />
              </div>

              <!-- <button class="new__btn1" v-if="showUploadList.length >= 8" @click="moreImg">更多图片</button> -->
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp1" v-if="activeKey1" class="giveUp">放弃</el-button>
        <el-button type="primary" @click="save1" v-if="activeKey1">保存</el-button>

        <el-button @click="giveUp2" v-if="activeKey2" class="giveUp">放弃</el-button>
        <el-button type="primary" @click="save2" v-if="activeKey2">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import jsZip from "jszip";
import MRearchTip from "@/components/ms/rearchSuss.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: ["con"],
  data() {
    return {
      fromData1: {
        username: "",
        sex: "",
        tag: "",
        belong: ""
      },
      fromData2: {
        username: "",
        sex: "",
        tag: "",
        belong: "",
        idNo: "",
        type: 0,
        collectNo: "",
        libId: "",
        source: 1,
        addType: 0
      },
      tag2: [],
      otherKey: false, //是否显示其他
      otherVal: false, //是否点其他
      labelVal: "", //新标签
      initLabel: [],
      labelArr: [],
      activeKey1: false,
      activeKey2: false,

      choseModelArr: [],
      choseModelIdArr: [], //选中的模型id
      checkBoxStatus: [], //单选框的状态
      options: [
        { value: "全部", label: "全部" },
        { value: "男", label: "男" },
        { value: "女", label: "女" }
      ],
    //   options2: [{ value: "男", label: "男" }, { value: "女", label: "女" }],
      options2:[],
      options1: [],
      options3: [],
    //   options4: [{ type: 0, name: "身份证" }, { type: 1, name: "护照" }],
      options4:[],
      modelArr: [],
      total: 0,
      currentPage: 1,
      pagesize: 12,
      imgUrl: "",
      checkAll: false,
      idType: "身份证",
      visible: false,
      uploadList: [], //上传的图片
      zipNameArr: [],
      isUploading: false,
      actionUrl: "",
      uuid: "", //容器id,

      rearchData:{
        rearchType:'',
        rearchKey:false,
        rearchCon:"",
        style:{'top':'-92px'}
      },

      
    };
  },
  computed: {

      ...mapState(["power"]),
    //展示的图片
    showUploadList() {
      let arr = [];
      if (this.uploadList.length > 8) {
        arr = this.uploadList.slice(0, 8);
      } else {
        arr = this.uploadList;
      }
      return arr;
    }
  },
  created() {
    this.imgUrl = window.BASEURL.imgUrl;
  },

  methods: {

     ...mapMutations(["set_power"]),

      /**
     * @Author fyt
     * @Description 获取权限
     * @Date 2020-03-17 10:18:25 星期二
     */
    getPower() {
      let VM = this;
      let resourceList = new Object();
      let roleId = JSON.parse(window.sessionStorage.getItem("token")).roleId;

      if (roleId) {
        this.$http.api
          .get(
            window.BASEURL.roleUrl +
              `/yyqxzx/api/v1/permissions?id=${roleId}&type=2`
          )
          .then(function(res) {
            if (res.data.code === 0) {
              let data = res.data.result.data;
              if (data.resourceList && data.resourceList.length > 0) {
                data.resourceList.forEach(item => {
                  let key = item.checked * 1 == 1;
                  resourceList[item.id] = key;
                });
              }
              VM.set_power({ val: resourceList });
              // console.log(VM.power[5001]);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        throw new Error("roleId");
      }
    },



    //选择的model
    handleSelectionChange1(val) {
      this.choseModelArr = val;
    },
    tu_chanege(data) {
      console.log(this.tag2);
    },
    
    //模型导入返回
    giveUp1() {
      this.reSetModelData();
      this.reSetImgData();
      this.activeKey1 = false;
      this.activeKey2 = false;
      this.$parent.key2 = false;
    },
    //图片导入返回
    giveUp2() {
      this.reSetModelData();
      this.reSetImgData();
      this.activeKey1 = false;
      this.activeKey2 = false;
      this.$parent.key2 = false;
    },
    //模型导入保存
    save1() {
      if (this.choseModelArr.length < 1) {
        this.$message({
          message: "请选择要导入的模型!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (!this.fromData1.belong) {
        this.$message({
          message: "所属不能为空!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (this.fromData1.belong.length > 20) {
        this.$message({
          message: "所属字符长度不能超过20!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      this.choseModelArr.forEach((item, index) => {
        this.choseModelIdArr.push(item.id);
      });
      this.choseModelIdArr = Array.from(new Set(this.choseModelIdArr));
      // console.log(this.choseModelIdArr);

      this.modelUpload(this.choseModelIdArr);
    },
    //模型导入
    modelUpload(data) {
      let id = this.$parent.id;
      let VM = this;
      let params = data;
      this.$http.api
        .post(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/face/modelToFace?libId=${id}&belong=${VM.fromData1.belong}`,
          params
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == 0) {
            VM.$parent.key2 = false;
            VM.$Message.success("导入成功!");
            VM.$parent.getDataInfoById();
            VM.activeKey1 = false;
            VM.activeKey2 = false;
            VM.reSetModelData();
          } else {
            VM.$message({
              message: `${res.data.msg}`,
              type: "warning",
              customClass: "zZindex"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //图片导入保存
    save2() {
      // this.$parent.key1 = false;
      let key = this._judgeImg();
      if (key) {
        return;
      }
      this.fromData2.tag = this.labelArr;
      this.fromData2.collectNo = this.uuid;
      this.fromData2.libId = this.$parent.id;
      this.imgUpload(this.fromData2);
      // console.log(this.fromData2);
    },
    //图片导入
    imgUpload(data) {
      let VM = this;
      let params = [data];
      this.$http.api
        .post(window.BASEURL.testUrl1 + `parent-police/api/v1/face`, params)
        .then(res => {
          if (res.data.code == 0) {
            this.$parent.key2 = false;
            VM.$Message.success("导入成功!");
            VM.$parent.getDataInfoById();
            VM.activeKey1 = false;
            VM.activeKey2 = false;
            VM.reSetImgData();
          } else {
            VM.$message({
              message: `${res.data.msg}`,
              type: "warning",
              customClass: "zZindex"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reSetModelData() {
      this.choseModelArr = [];
      this.choseModelIdArr = [];
      this.checkAll = false;
      this.currentPage = 1;
      this.fromData1 = {
        username: "",
        sex: "",
        tag: "",
        belong: ""
      };
      // this.initLabel = [];
      this.options1 = [];
      this.toggleSelection();
    },
    reSetImgData() {
      this.fromData2 = {
        username: "",
        sex: "",
        tag: "",
        belong: "",
        idNo: "",
        type: 0,
        collectNo: "",
        libId: "",
        source: 1,
        addType: 0
      };
      this.uuid = "";
      this.uploadList = [];
      this.isUploading = false;
      this.idType = "身份证";
      this.tag2 = [];
      this.labelArr = [];
      this.otherKey = false;
      this.otherVal = false;
      this.labelVal = "";
      this.toggleSelection();
    },
    handleClose() {
      this.reSetModelData();
      this.reSetImgData();
      this.activeKey1 = false;
      this.activeKey2 = false;
      this.$parent.key2 = false;
    },
    //查询模型
    rearch() {
      let VM = this;
      if (this.fromData1.sex == "全部") {
        this.fromData1.sex = "";
      }
      if (this.fromData1.tag == "全部") {
        this.fromData1.tag = "";
      }
      this.currentPage = 1;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/models?libId=${
              VM.$parent.id
            }&queryType=1&tags=${VM.fromData1.tag}&sex=${
              VM.fromData1.sex
            }&username=${VM.fromData1.username}&pageNum=${1}&pageSize=${
              this.pagesize
            }&status=1`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            let len = data.length;
            if (len <= 0) {
              VM.rearchData.rearchCon = "查询失败";
              VM.rearchData.rearchKey = true;
              VM.rearchData.rearchType = "error";
              setTimeout(()=>{
              VM.rearchData.rearchKey = false;
              VM.rearchData.rearchType = "";
              },1500)
              VM.total = res.data.result.total;
              VM.modelArr = [];
              return;
            } else {
              VM.rearchData.rearchCon = "查询成功";
              VM.rearchData.rearchKey = true;
              VM.rearchData.rearchType = "suss";
              setTimeout(()=>{
              VM.rearchData.rearchKey = false;
              VM.rearchData.rearchType = "";
              },1500)
            }
            VM.modelArr = data;
            VM.total = res.data.result.total;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择模型上传
    modelImport() {
    //   this.getModelList(this.$parent.id);
    //   this.activeKey1 = false;
    //   this.activeKey2 = false;
    //   this.reSetImgData();
    },
    //选择图片上传
    imgImport() {
        
    //   this.activeKey1 = false;
    //   this.activeKey2 = false;
    //   this.reSetModelData();
    //   this.uuid = this.get_uuid();
    //   this.created(this.uuid);
    //   console.log(this.uuid);
    },
    //获取标签
    getCategorys() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/api/v1/categorys`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            VM.options3 = data;
            if (data.length > 4) {
              VM.initLabel = data.slice(0, 4);
            } else {
              VM.initLabel = data;
            }
            // console.log(data);
            data.forEach((ele, index) => {
              let obj = {
                value: ele.value,
                label: ele.value
              };
              VM.options1.push(obj);
            });
            let obj = {
              value: "全部",
              label: "全部"
            };
            VM.options1.unshift(obj);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 获取模型列表
     * @Date 2020-03-26 14:41:19 星期四
     */
    getModelList(data) {
      console.log(data);
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/models?libId=${data}&queryType=1&sex=${VM.fromData1.sex}&username=${VM.fromData1.username}&stateGroup=1&pageNum=${VM.currentPage}&pageSize=${VM.pagesize}&status=1`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            if (data) {
              VM.modelArr = data;
              VM.total = res.data.result.total;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getModelList(this.$parent.id);
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.checkAll = false;
      this.getModelList(this.$parent.id);
    },
    //输入身份证or护照
    onInput(e) {
      if (this.fromData2.type == 0) {
        if (e.target.value.length > 18) {
          e.target.value = e.target.value.slice(0, 18);
          this.fromData2.idNo = e.target.value;
        }
      } else if (this.fromData2.type == 1) {
        if (e.target.value.length > 9) {
          e.target.value = e.target.value.slice(0, 9);
          this.fromData2.idNo = e.target.value;
        }
      }
    },
    onInput1(e) {
      if (e.target.value.length > 8) {
        e.target.value = e.target.value.slice(0, 8);
        this.fromData2.username = e.target.value;
      }
    },
    // onInput2(e) {
    //   if (e.target.value.length > 20) {
    //     e.target.value = e.target.value.slice(0, 20);
    //     this.fromData2.belong = e.target.value;
    //   }
    // },
    // onInput3(e) {
    //   if (e.target.value.length > 20) {
    //     e.target.value = e.target.value.slice(0, 20);
    //     this.fromData1.belong = e.target.value;
    //   }
    // },
    uploadFile1() {
      let file = document.getElementById("upload_file1");
      if (this.uploadList.length > 0) {
        this.$message({
          message: "已经上传过,请保存!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      file.click();
    },
    //更多图片
    moreImg() {
      // this.showUploadList = this.uploadList;
    },
    //上传之前
    beforeUploadFile1(e) {
      let VM = this;
      let isSame = false;
      let endName = e.target.files[0].name.split(".")[1];
      let stratName = e.target.files[0].name.split(".")[0];
      if (endName != "zip") {
        this.$message({
          message: "文件类型应为zip!!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      let Zip = new jsZip();
      Zip.loadAsync(e.target.files[0])
        .then(function(zip) {
          let key = false;
          zip.forEach(function(relativePath, zipEntry) {
            if (zipEntry.name == `${stratName}/`) return;
            let arr = zipEntry.name.split(".");
            let len = arr.length;
            let format = arr[len - 1];
            if (
              format == "jpg" ||
              format == "JPG" ||
              format == "PNG" ||
              format == "png" ||
              format == "jpeg" ||
              format == "JPEG"
            ) {
              key = true;
            } else {
              key = false;
            }
          });
          return key;
        })
        .then(res => {
          console.log(res);
          if (!res) {
            VM.$message({
              message: "上传的zip中包含不是jpg或png的文件!",
              type: "warning",
              customClass: "zZindex"
            });
            return;
          } else {
            VM.isUploading = true;
            VM.upLoad(VM.uuid, e.target.files[0].name, e.target.files[0]);
          }
        });
      // if (this.zipNameArr.length > 0) {
      //   this.zipNameArr.forEach(ele => {
      //     if (ele == stratName) {
      //       this.$message({
      //         message: "上传zip包不能同名!",
      //         type: "warning",
      //         customClass: "zZindex"
      //       });
      //       isSame = true
      //      }
      //   });
      // }
      // if(isSame){
      //      return
      // }
      // this.zipNameArr.push(stratName);

      // this.isUploading = true;
      // VM.upLoad(this.uuid, e.target.files[0].name, e.target.files[0]);
    },
    //创建容器
    created(Data, Name, File) {
      let Url = `oss/v1/AUTH_FS2Face/${Data}_cap`;
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
          if (res.status == 201 || res.status == 202) {
            console.log("创建容器");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //上传图片
    upLoad(DATA, NAME, FILE) {
      let Url = `oss/v1/AUTH_FS2Face/${DATA}_cap/${NAME}`;
      let VM = this;
      VM.$http.api
        .put(Url, FILE, {
          headers: { "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a" },
          timeout: 40000
        })
        .then(res => {
          if (res.status == 201) {
            console.log("上传成功");
            VM.getUploadImg(DATA, NAME);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //解压图片
    getUploadImg(data, name) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.oss + `${data}_cap/${name}`, {
          headers: {
            "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
            "Content-Type": "text/plain;charset=utf-8"
          },
          timeout: 40000,
          responseType: "arraybuffer"
        })
        .then(function(res) {
          if (res.status === 200) {
            console.log("解压成功");
            let file = res.data;
            let Zip = new jsZip();
            Zip.loadAsync(file).then(function(zip) {
              zip.forEach(function(relativePath, zipEntry) {
                if (zipEntry.name == `${name.split(".")[0]}/`) return;
                Zip.file(zipEntry.name)
                  .async("base64")
                  .then(function(content) {
                    // let name = zipEntry.name.split("/")[1].split(".")[0];
                    let obj = {
                      name: zipEntry.name,
                      url: "data:image/jpeg;base64," + content
                    };
                    VM.uploadList.push(obj);
                  });
              });
            });

            VM.isUploading = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //生成uuid
    get_uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      // s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
    //判断img
    _judgeImg() {
      let key = false;
      if (!this.fromData2.username) {
        this.$message({
          message: "请填写姓名!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (this.fromData2.username.length > 8) {
        this.$message({
          message: "姓名字符长度不能超过8!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (!this.fromData2.sex) {
        this.$message({
          message: "请选择性别!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (!this.fromData2.idNo) {
        this.$message({
          message: "请填写证件号!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (!this.fromData2.belong) {
        this.$message({
          message: "请填写所属!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (this.fromData2.belong.length > 20) {
        this.$message({
          message: "所属字符长度不能超过20!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      // if (this.tag2.length < 1) {
      //   this.$message({
      //     message: "请选择标签!",
      //     type: "warning",
      //     customClass: "zZindex"
      //   });
      //   key = true;
      //   return key;
      // }
      if (this.uploadList.length < 1) {
        this.$message({
          message: "请导入图片zip文件!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      return key;
    },
    getRowKeys(row) {
      return row.id;
    },
    //选择证件类型
    selectIdType(data) {
      this.fromData2.type = data.type;
      this.fromData2.idNo = "";
    },
    //选择标签
    selectLabel(data) {
      console.log(this.tag2);
      if (this.labelArr.indexOf(data.value) > -1) {
        this.$message({
          message: "不能添加重复标签!",
          type: "warning",
          customClass: "zZindex"
        });

        return;
      }
      if (this.labelArr.length >= 5) {
        this.$message({
          message: "标签最多为5个!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }

      this.labelArr.push(data.value);
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
      if (this.labelVal) {
        let reg = /^[0-9]*$/g;
        let key1 = reg.test(this.labelVal);
        if (key1) {
          this.$message({
            message: "标签不能为数字!",
            type: "warning",
            customClass: "zZindex"
          });

          return;
        }
      }
      if (this.labelVal.indexOf(" ") > -1) {
        this.$message({
          message: "标签类别不合法,为中英文或下划线,1-12字!",
          type: "warning",
          customClass: "zZindex"
        });

        return;
      }
      if (this.labelVal.length > 6) {
        this.$message({
          message: "标签字符长度超过6!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (!this.labelVal) {
        this.$message({
          message: "标签不能为空!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (this.labelArr.length >= 5) {
        this.$message({
          message: "标签最多为5个!",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (this.labelArr.indexOf(this.labelVal) > -1) {
        this.$message({
          message: "不能添加重复标签!",
          type: "warning",
          customClass: "zZindex"
        });

        return;
      }
      this.labelArr.push(this.labelVal);
      //this.tag2.push(this.labelVal);
      // console.log(this.tag2);
      // this.otherKey = false;
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
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable1.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable1.clearSelection();
      }
    }
    // change(data) {
    //   if (data._check) {
    //     this.choseModelArr.push(data);
    //   } else {
    //     this.choseModelArr = this.choseModelArr.filter((ele, index) => {
    //       return ele.id != data.id;
    //     });
    //   }
    //   this.modelArr.forEach(() => {});
    // },
    // change1() {
    //   if (this.checkAll) {
    //     this.modelArr.forEach((ele, index) => {
    //       if (!ele._check) {
    //         ele._check = true;
    //       }
    //     });
    //     this.choseModelArr = this.modelArr;
    //   } else {
    //     this.modelArr.forEach((ele, index) => {
    //       if (ele._check) {
    //         ele._check = false;
    //       }
    //     });
    //     this.choseModelArr = [];
    //   }
    // },
  },
  components: {
    MRearchTip
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumUse/faceImport.scss";
</style>
