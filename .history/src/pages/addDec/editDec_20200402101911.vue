<template>
  <div class="addDec-wrapper">
    <div class="addDec-header">
      <m-crums :con="crumsData" />

      <el-dialog
        :visible.sync="centerDialogVisible"
        width="15%"
        center
        :show-close="false"
        class="check"
        :close-on-click-modal="false"
      >
        <div
          class="suc-box"
          v-loading="loading2"
          element-loading-text="检测中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <span class="suc-w" v-if="newBadDevArr.length == 0">{{decStatus}}</span>
          <!-- <span class="suc-w1" v-if="textFail">{{textFail}} -->

          <!-- </span> -->
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
        <div class="inp-con">
          <label for="one">
            <span>设备编号</span>
            <input type="text" id="one" class="inp readonly" v-model="data.deviceNo" readonly />
          </label>
        </div>

        <div class="inp-con">
          <label for="five">
            <span>设备型号</span>
            <input type="text" id="one1" class="inp readonly" v-model="data.versionName" readonly />

            <!-- <el-select v-model="data.versionName" placeholder="请选择" class="edit">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </label>
        </div>

        <div class="inp-con">
          <label for="five">
            <span>所属单位</span>
            <el-select v-model="data.orgName" placeholder="请选择" class="edit">
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
            <span>所在场地</span>
            <input type="text" id="one" class="inp" v-model="data.address" />
          </label>
        </div>
        <div class="inp-con">
          <span class="label">是否禁用</span>
          <RadioGroup v-model="labelArr">
            <Radio label="禁用"></Radio>
            <Radio label="启用"></Radio>
          </RadioGroup>
        </div>
      </div>

      <div class="addDec-content">
        <p class="header-title">编辑摄像头</p>
        <div class="shoot-inp">
          <div class="inp-con">
            <RadioGroup v-model="disabledGroup">
              <Radio label="服务器获取"></Radio>
              <Radio label="手动添加"></Radio>
            </RadioGroup>
          </div>
        </div>

        <div class="shoot-inp" v-if="disabledGroup == '服务器获取' || disabledGroup == '初始化添加'">
          <div class="one">
            <div class="inp-con">
              <label for="one">
                <span class="cen">拍照服务IP地址</span>
                <input
                  type="text"
                  id="one"
                  class="inp"
                  v-model="deviceIp"
                  placeholder="如:192.168.1.71:8877"
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
                />
              </label>
            </div>
            <div class="inp-con">
              <button :class="['link-btn',{'deg':isSend}]" @click="update">
                <span v-if="!isSend" class="link-btn__w">保存</span>
                <span v-if="isSend" class="link-btn__w">更新中</span>
                <i class="el-icon-loading" v-if="isSend"></i>
              </button>
              <button class="ce-btn" @click="test">测试</button>
            </div>
          </div>
        </div>
        <div class="shoot-inp" v-if="disabledGroup == '手动添加'">
          <div class="one">
            <div class="inp-con">
              <label for="one">
                <span class="cen">拍照服务IP地址</span>
                <input
                  type="text"
                  id="one"
                  class="inp"
                  v-model="deviceIp"
                  placeholder="如:192.168.1.71:8877"
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
                />
              </label>
            </div>
          </div>
        </div>
        <div class="shoot-inp" v-if="disabledGroup == '手动添加'">
          <div class="one">
            <div class="inp-con">
              <label for="one">
                <span class="cen">网段地址</span>
                <input type="text" id="one" class="inp" v-model="network" placeholder="如:192.168.1" />
              </label>
            </div>
            <div class="inp-con">
              <label for="one">
                <span class="cen">主机地址范围</span>
                <input type="text" id="one" class="inp1" v-model="start" />
                <Icon type="ios-remove" />
                <input type="text" id="one" class="inp1" v-model="end" />
              </label>
            </div>

            <div class="inp-con">
              <label for="one">
                <span class="cen">主机地址自定义</span>
                <input type="text" id="one" class="inp" v-model="customIp" placeholder="如:20,30" />
              </label>
            </div>
            <div class="inp-con">
              <button :class="['link-btn',{'deg':isSend}]" @click="update">
                <span v-if="!isSend" class="link-btn__w">保存</span>
                <span v-if="isSend" class="link-btn__w">更新中</span>
                <i class="el-icon-loading" v-if="isSend"></i>
              </button>
              <button class="ce-btn" @click="test">测试</button>
            </div>
          </div>
        </div>

        <div class="dec-list">
          <el-table :data="userdata" stripe style="width: 100%" highlight-current-row>
            <el-table-column prop="index" label="序号" width="100" height="40" align="center"></el-table-column>
            <el-table-column prop="cameraNo" label="摄像头编号" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="ip" label="IP地址" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="user" label="用户" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="password" label="密码" width="350" height="40" align="center"></el-table-column>
          </el-table>
        </div>

        <!-- <div class="dec-list" v-if="disabledGroup == '手动添加'">
          <el-table :data="userdata" stripe style="width: 100%" highlight-current-row>
            <el-table-column prop="index" label="序号" width="100" height="40" align="center"></el-table-column>
            <el-table-column prop="cameraNo" label="摄像头编号" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="ip" label="IP地址" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="user" label="用户" width="350" height="40" align="center"></el-table-column>
            <el-table-column prop="password" label="密码" width="350" height="40" align="center"></el-table-column>
          </el-table>
        </div> -->
      </div>
      <div class="slot-box">
        <el-pagination
          class="slot"
          background
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
      badDevArr: [], //故障设备数组
      decStatus: "",
      newBadDevArr: [],
      textFail: false,
      centerDialogVisible: false,
      showTable1: false,
      showTable2: false,
      loading2: true,
      deviceVersion: "",
      data: {
        deviceVersion: "雪山三号33",
        orgId: "",
        orgName: "",
        deviceNo: "",
        status: "",
        address: "",
        tag: "" //手动还是自动
      },
      id: "",
      deviceIp: "", //设备ip
      network: "", //网段
      ipScope: "", //范围
      customIp: "", //自定义
      strUrl: "",
      start: "",
      end: "",
      labelArr: "禁用",
      currentPage: 1,
      pagesize: 5,
      crumsData: {
        one: "人像采集",
        two: "拍摄设备",
        thr: "编辑设备",
        now: 1,
        pathGP: "shootD"
      },
      tableData: [],
      options2: [
        // {
        //   value: "雪山一号",
        //   label: "雪山一号"
        // },
        {
          value: "雪山三号15",
          label: "雪山三号15"
        },
        {
          value: "雪山三号33",
          label: "雪山三号33"
        }
        // {
        //   value: "雪山五号",
        //   label: "雪山五号"
        // },
        // {
        //   value: "雪山七号",
        //   label: "雪山七号"
        // }
      ],
      options3: []
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getDev(this.id);
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
    getDev(data) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/devices/${data}`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;
            VM.data = data;

            if ( data.tag == 1) {
              VM.disabledGroup = "手动添加";
            } else if (data.tag == 0) {
              VM.disabledGroup = "服务器获取";
            }
            VM.deviceIp = data.deviceIp;
            VM.strUrl = data.strUrl;
            if (data.cameras.length > 0) {
              VM.tableData = data.cameras;
              VM.tableData.forEach((ele, index) => {
                ele.index = index + 1;
              });
            }

            if (data.ipInfo.length > 0) {
              VM.network = data.ipInfo.network;
              VM.customIp = data.ipInfo.customIp;
              VM.start = data.ipInfo.ipScope.split("-")[0];
              VM.end = data.ipInfo.ipScope.split("-")[1];
            }
            VM.labelArr = data.deviceStatusCname;
            console.log(data.ipInfo.length)
        
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
            VM.options3 = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //更新设备信息
    update() {
      let VM = this;
      let params = {};
      let reg1 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g;
      switch (this.data.versionName) {
        case "雪山三号15":
          this.data.deviceVersion = "1";
          break;
        case "雪山三号33":
          this.data.deviceVersion = "0";
          break;
      }
      if (
        !this.data.deviceNo ||
        !this.data.orgId ||
        !this.data.deviceVersion ||
        !this.data.address
      ) {
        VM.$Message.error("添加设备基础信息不能为空!");
        return;
      }
      if( !this.disabledGroup 
       ){
        VM.$Message.error("请选择方式");
        return;
      }

      if( !this.deviceIp ||
        !this.strUrl){
        VM.$Message.error("拍照服务地址和镜头地址不能为空!");
        return;
      }

  
      params.deviceNo = this.data.deviceNo;
      params.orgId = this.data.orgId;
      params.orgName = this.data.orgName;
      params.deviceVersion = this.data.deviceVersion;
      params.address = this.data.address;

      if (this.labelArr == "禁用") {
        params.status = 0;
      } else if (this.labelArr == "启用") {
        params.status = 1;
      }

      if (this.disabledGroup == "服务器获取") {
        params.tag = 0;
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

        // console.log(params);
      } else if (this.disabledGroup == "手动添加") {
        params.tag = 1;
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
        // params.strUrl = this.strUrl;
        // params.deviceIp = this.deviceIp;
        params.network = this.network;
        if (!this.start && !this.end) {
          params.ipScope = "";
        } else {
          params.ipScope = `${this.start}-${this.end}`;
        }
        params.customIp = this.customIp;
      } else if (this.disabledGroup == "初始化添加") {
        let key1 = reg1.test(this.deviceIp);
        let key2 = reg1.test(this.strUrl);
        // console.log(key1)
        // console.log(key2)
        if (!key1) {
          this.$Message.error("中心服务链接地址不正确!");
          return;
        }
        if (!key2) {
          this.$Message.error("视频流地址格式不正确!");
          return;
        }
      }
      params.deviceIp = this.deviceIp;
      params.strUrl = this.strUrl;

      console.log(params);
      this.isSend = true;
      this.$http.api
        .put(
          window.BASEURL.testUrl1 + `parent-police/api/v1/devices/${this.id}`,
          params
        )
        .then(function(res) {
          VM.isSend = false;
          if (res.data.code == 0) {
            VM.$Message.success("更新成功!");
            VM.getDev(VM.id);
          } else {
            console.log(res.data.msg);
            VM.isSend = false;
            VM.$Message.error(`更新失败!${res.data.msg}`);
          }
        })
        .catch(function(error) {
          VM.isSend = false;
          VM.$Message.error("更新失败!");
          console.log(error);
        });
    },
    handleClick() {},
    addDec() {},
    selectOrg(data) {
      this.data.orgId = data.orgId;
      this.data.orgName = data.orgName;
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
      this.textFail = false;
      this.decStatus = "";
      this.newBadDevArr = [];
    },
    test() {
      // console.log(2);
      let VM = this;
      VM.centerDialogVisible = true;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/devices/checkCamera?id=${VM.data.id}&deviceIp=${VM.data.deviceIp}`
        )
        .then(function(res) {
          console.log(res.data.code);
          if (res.data.code === 0) {
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
          } else if (res.data.code == 400) {
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
    save() {
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
