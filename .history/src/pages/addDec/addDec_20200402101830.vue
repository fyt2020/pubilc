<template>
  <div class="addDec-wrapper">
    <div class="addDec-header">
      <m-crums :con="crumsData" />
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="15%"
        center
        :show-close="false"
        :close-on-click-modal="false"
        class="check"
      >
        <div
          class="suc-box"
          v-loading="loading2"
          element-loading-text="检测中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <span class="suc-w" v-if="newBadDevArr.length == 0 ">{{decStatus}}</span>
          <span class="suc-w" v-if="newBadDevArr.length > 0">
            <span v-for="(v,i) in newBadDevArr" :key="i" class="suc-w1">{{v}},</span>
            <span>号机器故障</span>
          </span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sure">确 定</el-button>
        </span>
      </el-dialog>

      <p class="header-title">设备基础信息</p>
      <div class="shoot-inp">
        <!-- <div class="inp-con">
          <label for="one">
            <span>设备编号</span>
            <input type="text" id="one" class="inp" v-model="data.deviceNo" autocomplete="off"/>
          </label>
        </div>-->

        <div class="inp-con">
          <label for="five">
            <span class="must">设备型号</span>
            <!-- <input type="text" id="one" class="inp" v-model="data.deviceVersion" autocomplete="off"/> -->
            <el-select v-model="deviceVersion" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click.native="selectDevice(item)"
              ></el-option>
            </el-select>
          </label>
        </div>

        <div class="inp-con">
          <label for="five">
            <span class="must">所属单位</span>
            <el-select v-model="data.orgName" placeholder="请选择">
              <el-option
                @click.native="selectOrg(item)"
                v-for="item in options3"
                :key="item.value"
                :label="item.orgName"
                :value="item.orgName"
              ></el-option>
            </el-select>
          </label>
        </div>
      </div>

      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one">
            <span class="must">所在场地</span>
            <input type="text" id="one" class="inp" v-model="data.address" autocomplete="off" />
          </label>
        </div>

        <div class="inp-con">
          <span class="must">是否禁用</span>
          <RadioGroup v-model="labelArr">
            <Radio label="禁用"></Radio>
            <Radio label="启用"></Radio>
          </RadioGroup>
        </div>

        <div class="inp-con">
          <!-- <button class="upload-video-btn" @click="uploadVideo">
                {{"点击上传"}}
                <input type="file" hidden  @change="beforeUploadVideoFile" name="file1"  id="upload-video" class="file-inp" />
          </button>-->
        </div>
      </div>

      <div class="addDec-content">
        <p class="header-title">新增摄像头</p>
        <div class="shoot-inp">
          <div class="inp-con">
            <RadioGroup v-model="disabledGroup" @on-change="tagChange">
              <!-- <Radio label="初始化添加"></Radio> -->
              <Radio label="服务器获取" @click.native.prevent="clickitem('服务器获取')"></Radio>
              <Radio label="手动添加" @click.native.prevent="clickitem('手动添加')"></Radio>
              
            </RadioGroup>
            <span class="add__tip">(*两种方式不选设备也能新增成功)</span>
          </div>
         
        </div>

        <div class="shoot-inp" v-if="disabledGroup == ''">
          <div class="one">
            <div class="inp-con">
              <button :class="['link-btn',{'deg':isSend}]" @click="addDec">
                <span v-if="!isSend" class="link-btn__w">新增设备</span>
                <span v-if="isSend" class="link-btn__w">添加中</span>
                <i class="el-icon-loading" v-if="isSend"></i>
              </button>
              <!-- <button class="ce-btn" @click="test" v-if="isAdd">测试</button> -->
            </div>
          </div>
        </div>

        <div class="shoot-inp" v-if="disabledGroup == '服务器获取'">
          <div class="one">
            <div class="inp-con">
              <label for="one1">
                <span class="cen">拍照服务IP地址</span>
                <input
                  type="text"
                  id="one1"
                  class="inp"
                  v-model="deviceIp"
                  placeholder="如:192.168.1.71:8080"
                  autocomplete="off"
                />
              </label>
            </div>
            <div class="inp-con">
              <label for="one2">
                <span class="cen">视频流镜头IP地址</span>
                <input
                  type="text"
                  id="one2"
                  class="inp"
                  v-model="strUrl"
                  placeholder="如:192.168.20.30:8080"
                  autocomplete="off"
                />
              </label>
            </div>
            <div class="inp-con">
              <button :class="['link-btn',{'deg':isSend}]" @click="addDec">
                <span v-if="!isSend" class="link-btn__w">新增设备</span>
                <span v-if="isSend" class="link-btn__w">添加中</span>
                <i class="el-icon-loading" v-if="isSend"></i>
              </button>
              <button class="ce-btn" @click="test" v-if="isAdd">测试</button>
            </div>
          </div>
        </div>

        <div class="shoot-inp" v-if="disabledGroup == '手动添加'">
          <div class="one">
            <div class="inp-con">
              <label for="one3">
                <span class="cen">拍照服务IP地址</span>
                <input
                  type="text"
                  id="one3"
                  class="inp"
                  v-model="deviceIp"
                  placeholder="如:192.168.1.71:8080"
                  autocomplete="off"
                />
              </label>
            </div>

            <div class="inp-con">
              <label for="one">
                <span class="cen">视频流镜头IP地址</span>
                <input
                  type="text"
                  id="one"
                  class="inp"
                  v-model="strUrl"
                  placeholder="如:192.168.20.30:8080"
                  autocomplete="off"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="shoot-inp" v-if="disabledGroup == '手动添加'">
          <div class="one">
            <div class="inp-con">
              <label for="one4">
                <span class="cen">网段地址</span>
                <input
                  type="text"
                  id="one4"
                  class="inp"
                  v-model="network"
                  placeholder="如:192.168.1"
                  autocomplete="off"
                />
              </label>
            </div>
            <div class="inp-con">
              <label for="one5">
                <span class="cen">主机地址范围</span>
                <input type="text" id="one5" class="inp1" v-model="start" autocomplete="off" />
                <Icon type="ios-remove" />
                <input type="text" id="one6" class="inp1" v-model="end" autocomplete="off" />
              </label>
            </div>

            <div class="inp-con">
              <label for="one7">
                <span class="cen">主机地址自定义</span>
                <input
                  type="text"
                  id="one7"
                  class="inp"
                  v-model="customIp"
                  placeholder="如:20,30"
                  autocomplete="off"
                />
              </label>
            </div>
            <div class="inp-con">
              <button :class="['link-btn',{'deg':isSend}]" @click="addDec">
                <span v-if="!isSend" class="link-btn__w">新增设备</span>
                <span v-if="isSend" class="link-btn__w">添加中</span>
                <i class="el-icon-loading" v-if="isSend"></i>
              </button>
              <button class="ce-btn" @click="test" v-if="isAdd">测试</button>
            </div>
          </div>
        </div>

        <div class="dec-list" v-if="showTable1">
          <el-table :data="userdata" stripe style="width: 100%" highlight-current-row>
            <el-table-column prop="cameraNo" label="序号" width="100" height="40" align="center"></el-table-column>
            <el-table-column prop="cameraNo" label="摄像头编号" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="ip" label="IP地址" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="user" label="用户" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="password" label="密码" width="350" height="40" align="center"></el-table-column>
          </el-table>

          <div class="slot-box">
            <el-pagination
              class="slot"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import * as URL from "@/plugins/env.js";
export default {
  props: [],
  data() {
    return {
      isSend: false,
      disabledGroup: "",
      loading2: true,
      centerDialogVisible: false,
      isAdd: false, //是否新增
      showTable1: false,
      showTable2: false,
      deviceVersion: "雪山三号33",
      decStatus: "",
      data: {
        deviceVersion: "",
        orgId: "",
        orgName: "",
        //deviceNo: "",
        status: "",
        address: "",
        tag: "" //手动还是自动
      },

      deviceIp: "", //设备ip
      network: "", //网段
      ipScope: "", //范围
      customIp: "", //自定义
      strUrl: "", //视频流镜头IP地址
      start: "",
      end: "",
      labelArr: "启用",

      currentPage: 1,
      pagesize: 5,

      crumsData: {
        one: "人像采集",
        two: "拍摄设备",
        thr: "编辑设备",
        now: 1,
        pathGP: "shootD"
      },

      badDevArr: [],
      newBadDevArr: [],
      tableData: [],
      devInf: {},
      options2: [
        {
          value: "雪山三号33",
          label: "雪山三号33"
        },
        {
          value: "雪山三号15",
          label: "雪山三号15"
        }
      ],
      options3: []
    };
  },

  created() {
    this.getOrg();
  },
  computed: {
    userdata: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods: {
    /**
     * @Author fyt
     * @Description
     * @Date 2020-04-02 10:11:34 星期四
     */
    clickitem(data){
       if(!this.disabledGroup ){
          this.disabledGroup = data;
          return
       }else{
          this.disabledGroup = '';
       }
    },
    /**
     * @Author fyt
     * @Description 
     * @Date 2020-03-26 11:42:11 星期四
     */
    tagChange(){
        this.showTable1 = false;
        this.data.deviceIp = "";
        this.data.strUrl = "";
    },

    /**
     * @Author fyt
     * @Description 获取组织
     * @Date 2020-03-26 11:42:03 星期四
     */
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
            // console.log(data)
            VM.options3 = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addDec() {
      //新增设备
      let VM = this;
      let params;
      let reg1 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g;
      if (this.deviceVersion == "雪山三号33") {
        this.data.deviceVersion = "0";
      }
      if (
        !this.data.orgId ||
        !this.data.deviceVersion ||
        !this.data.address
      ) {
        VM.$Message.error("添加设备基础信息不能为空!");
        return;
      }

      if (this.labelArr == "禁用") {
        this.data.status = 0;
      } else if (this.labelArr == "启用") {
        this.data.status = 1;
      }
      if (this.disabledGroup == "服务器获取") {
        this.data.tag = 0;
        let key1 = reg1.test(this.deviceIp);
        let key2 = reg1.test(this.strUrl);
        // console.log(key1)
        // console.log(key2)
        if (!key1) {
          this.$Message.error("拍照服务IP地址不正确!");
          return;
        }
        if (!key2) {
          this.$Message.error("视频流镜头IP地址格式不正确!");
          return;
        }
        // params = [this.data];
      } else if (this.disabledGroup == "手动添加") {
        this.data.tag = 1;
        let key1 = reg1.test(this.deviceIp);
        let key2 = reg1.test(this.strUrl);
        let key = reg.test(this.network);
        if (!key1) {
          this.$Message.error("中心服务链接地址不正确!");
          return;
        }
        if (!key2) {
          this.$Message.error("视频流地址格式不正确!");
          return;
        }
        if (!key) {
          this.$Message.error("网段格式不对!");
          return;
        }
        this.data.network = this.network;
        if (!this.start || !this.end) {
          this.data.ipScope = "";
        } else {
          this.data.ipScope = `${this.start}-${this.end}`;
        }
        this.data.customIp = this.customIp;
      }else if(this.disabledGroup == ""){
           delete(this.data['tag'])
      }
      this.data.deviceIp = this.deviceIp;
      this.data.strUrl = this.strUrl;
      params = [this.data];
      console.log(params);

      this.isSend = true;
      this.$http.api
        .post(window.BASEURL.testUrl1 + `parent-police/api/v1/devices`, params)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.isAdd = true;
            VM.id = res.data.result[0].id;
            VM.isSend = false;
            VM.$Message.success("添加成功!");

            if(params[0].tag == 1 || params[0].tag == 0 ){
               VM.tableData = res.data.result[0].cameras;
               VM.showTable1 = true;
            }  
            VM.$router.push({name:'shootD'})
          } else {
            VM.isSend = false;
            VM.$Message.error(`${res.data.msg}`);
          }
        })
        .catch(function(err) {
          // VM.$Message.error(`${}`);
          console.log(err);
        });
    },
    test() {
      let VM = this;
      VM.centerDialogVisible = true;
      if (!this.isAdd) {
        VM.$Message.success("还未添加设备!");
        return;
      }
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/devices/checkCamera?id=${VM.id}&deviceIp=${VM.data.deviceIp}`
        )
        .then(function(res) {
          if (res.data.code == 0) {
            VM.badDevArr = res.data.result;
            VM.loading2 = false;

            if (VM.badDevArr.length > 0) {
              VM.badDevArr.forEach((ele, index) => {
                for (var i in ele) {
                  VM.newBadDevArr.push(i);
                }
              });
            }
            if (VM.badDevArr.length == 0) {
              VM.decStatus = "设备正常";
              VM.loading2 = false;
            }
          } else {
            VM.decStatus = `${res.data.msg}`;
            VM.loading2 = false;
          }
        })
        .catch(function(error) {
          VM.decStatus = `拍照服务未启动`;
          VM.loading2 = false;
          console.log(error);
        });
    },

    handleClick() {},
    selectOrg(data) {
      this.data.orgId = data.orgId;
    },
    selectDevice(data) {
      if (data.value == "雪山三号33") {
        this.data.deviceVersion = "0";
      } else if (data.value == "雪山三号15") {
        this.data.deviceVersion = "1";
      }
    },
    sure() {
      if (this.loading2) {
        this.$message({
          message: "在检测中,还不能进行其他操作",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      this.centerDialogVisible = false;
      this.loading2 = true;
      this.newBadDevArr = [];
      this.decStatus = "";
    },
    save() {
      let key = reg.test(this.data2.ip);
      // console.log(key);
      if (!key) {
        this.$Message.error("网段格式不对!");
        return;
      }

      this.showTable2 = true;
    },
    link() {
      this.showTable1 = true;
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //  console.log(this.userdata)
    }
  },
  components: {
    MCrums
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/addDec/addDec.scss";
</style>
