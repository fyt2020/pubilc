<template>
  <div class="im-box">
    <el-dialog
      title="新增任务"
      :visible.sync="con"
      width="33%"
      center
      :before-close="handleClose"
      class="addTask"
      :close-on-click-modal="false"
    >
      <div class="task-con" id="task-con" v-show="key1">
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one1">
              <span class="f-w">任务名称</span>
              <el-tooltip class="item" effect="dark" content="任务名称不能超过20字" placement="top-start">
                <input
                  type="text"
                  id="one1"
                  class="inp"
                  v-model="taskData.name"
                  autocomplete="off"
                  maxlength="20"
                />
              </el-tooltip>
            </label>
          </div>
        </div>

        <div class="shoot-inp top">
          <div class="inp-con">
            <span class="f-w1">有效时间段</span>
            <DatePicker
              class="data__picker3"
              type="datetimerange"
              format="yyyy-M-d-HH:mm:ss"
              ref="producetime1"
              @on-change="showTimePanel1('producetime1')"
              @on-clear="clearStart"
              confirm
              placeholder="请选择时间"
              :options="options5"
              v-model="dateVal1"
            ></DatePicker>
            <!-- <span class="time__line">至</span> -->
            <!-- <DatePicker
              type="date"
              format="yyyy-M-d-HH:mm:ss"
              ref="producetime2"
              @on-change="showTimePanel2('producetime2')"
              @on-clear="clearEnd"
              confirm
              placeholder="结束时间"
              :options="options5"
              v-model="dateVal2"
            ></DatePicker> -->
            <!-- <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00','23:59:59']"
            ></el-date-picker>-->
          </div>
        </div>

        <div class="shoot-inp1">
          <div class="inp-con2">
            <RadioGroup v-model="style">
              <Radio label="每天"></Radio>
              <Radio label="所有时间段"></Radio>
            </RadioGroup>
          </div>
        </div>

        <!-- <div class="shoot-inp"> -->
        <!-- <div class="inp-con">
            <label for="one">
              <span class="f-w">任务设备</span>
              <input type="text" id="one" class="inp" v-model="taskData.address" />
            </label>
        </div>-->
        <!-- <div class="inp-con1">
            <span class="f-w1">任务设备</span>
        </div>-->

        <!-- <div class="inp-con2">
            <CheckboxGroup v-model="taskData.deviceIds" @on-change="checkAllGroupChange">
              <Checkbox label="HBWH0081654"></Checkbox>
              <Checkbox label="HBWH0081655"></Checkbox>
              <Checkbox label="HBWH0081656"></Checkbox>
              <Checkbox label="HBWH0081657"></Checkbox>
              <Checkbox label="HBWH0081658"></Checkbox>
              <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
              >全选</Checkbox>
            </CheckboxGroup>
        </div>-->
        <!-- </div> -->

        <!-- <div class="shoot-inp bottom">
           <div class="inp-con">
            <label for="one">
              <span class="f-w">监控设备</span>
              <input type="text" id="one" class="inp" v-model="deviceIds"  />
            </label>
          </div>
          <div class="inp-con">
            <label for="one">
              <span class="f-w">设备地址</span>
              <input type="text" id="one" class="inp" v-model="taskData.address" />
            </label>
          </div>
        </div>-->
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">主码流</span>
              <input
                type="text"
                id="one"
                class="inp rtsp"
                v-model="taskData.main_stream"
                autocomplete="off"
              />
            </label>
          </div>
        </div>
        <div class="shoot-inp bottom">
          <div class="inp-con">
            <label for="one2">
              <span class="f-w">子码流</span>
              <input
                type="text"
                id="one2"
                class="inp rtsp"
                v-model="taskData.sub_stream"
                autocomplete="off"
              />
            </label>
          </div>
        </div>
        <!-- <div class="shoot-inp">
          <div class="inp-con1">
            <span class="f-w1">任务类型</span>
          </div>
          <div class="inp-con2">
            <RadioGroup v-model="rule">
              <Radio label="预警提示"></Radio>
              <Radio label="门禁"></Radio>
            </RadioGroup>
          </div>
        </div>-->

        <!-- <div class="shoot-inp">
          <div class="inp-con">
            <span class="f-w1">设备地点</span>
              <input type="text" id="one" class="inp" v-model="taskData.address"  />
          </div>
        </div>-->
      </div>
      <div class="task-con2" v-show="key2">
        <m-rearchTip :con="rearchData" />
        <div class="nav">
          <div class="nav__title">识别人脸库</div>
          <div class="shoot-inp">
            <div class="inp-con">
              <label for="five">
                <span class="w">库名称</span>
                <el-tooltip content="根据库名查询" placement="bottom">
                  <input type="text" class="inp" v-model="name" autocomplete="off" />
                </el-tooltip>
              </label>
            </div>
            <div class="inp-con">
              <button class="addDec1" @click="rearch">查询</button>
            </div>
          </div>
        </div>
        <div class="dec-list">
          <div style="margin-top: 20px" v-show="0">
            <el-button @click="toggleSelection">取消选择</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            style="width: 100%"
            highlight-current-row
            :row-key="getRowKeys"
            @selection-change="handleSelectionChange"
            tooltip-effect="dark"
            class="addTask"
          >
            <el-table-column
              type="selection"
              width="30"
              :reserve-selection="true"
              :selectable="selec"
            ></el-table-column>
            <el-table-column prop="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column
              prop="libName"
              label="库名称"
              width="160"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="personNum"
              label="库中人数"
              width="160"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="更新时间"
              width="250"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.faceUpdateTime}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px" v-show="0">
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
        </div>
        <div class="slot-box">
          <el-pagination
            class="slot"
            background
            @size-change="_handleSizeChange"
            @current-change="_handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[5]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp" v-if="key1" class="dialogBtn">放弃</el-button>
        <el-button
          @click="next"
          v-if="key1"
          type="primary"
          v-loading="nextKey"
          element-loading-spinner="el-icon-loading"
          element-loading-customClass="myLoading"
        >
          <span v-show="!nextKey">下一步</span>
        </el-button>
        <el-button @click="back" v-if="key2" class="dialogBtn">上一步</el-button>
        <el-button type="primary" @click="save" v-if="key2">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MRearchTip from "@/components/ms/rearchSuss.vue";
export default {
  props: ["con"],
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      value1: "",
      rule: "",
      style: "所有时间段",
      targets: "",
      deviceIds: "",
      key1: true,
      key2: false,
      dateVal1: "",
      dateVal2: "",
      start:"",
      end:"",
      tableData: [],
      total: 0,
      currentPage: 1,
      pagesize: 5,
      multipleSelection: [], //多选
      choseTargets: [],
      name: "", //库名称
      taskData: {
        name: "",
        targets: [],
        //rtsp://admin:passwd123@192.168.1.60
        // rtsp://admin:passwd123@192.168.1.60/h264/ch1/sub/av_stream
        main_stream: "",
        sub_stream: "",
        //rule: "",
        validStartTime: "",
        validEndTime: "",
        status: 1,
        type: "",
        // address:'',
        // deviceIds:[],
        id: ""
      },
      rearchData: {
        rearchType: "",
        rearchKey: false,
        rearchCon: "",
        style: { top: "-100px" }
      },
      options5: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 24 * 60 * 60 * 1000;
        },
        shortcuts: [
          {
            text: "今天",
            value() {
              const end = new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000);
              const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "本周",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "本月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          },
          {
            text: "最近7天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          },
          {
            text: "最近30天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      nextKey: false
    };
  },
  computed: {},
  created() {},
  mounted() {},

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    //查询
    rearch() {
      this.currentPage = 1;
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/faceLibrary?&pageNum=${1}&pageSize=${10}&libNames=${
              VM.name
            }`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
            let len = data.length;
            if (len <= 0) {
              VM.rearchData.rearchCon = "没有该人脸库!";
              VM.rearchData.rearchType = "error";
              VM.rearchData.rearchKey = true;
              setTimeout(() => {
                VM.rearchData.rearchKey = false;
                VM.rearchData.rearchType = "";
                VM.rearchData.rearchCon = "";
              }, 1500);
              VM.tableData = [];
              return;
            }
            VM.rearchData.rearchCon = "查询成功!";
            VM.rearchData.rearchType = "suss";
            VM.rearchData.rearchKey = true;
            setTimeout(() => {
              VM.rearchData.rearchKey = false;
              VM.rearchData.rearchType = "";
              VM.rearchData.rearchCon = "";
            }, 1500);

            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取ku列表
    getFaceLibrary() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/faceLibrary?&pageNum=${VM.currentPage}&pageSize=${VM.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            // console.log(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //下一步
    next() {
      let key = this._judgeImg();

      let VM = this;

      if (key) {
        return;
      }
      if (this.rule == "预警提示") {
        this.taskData.rule = 1;
      } else if (this.rule == "门禁") {
        this.taskData.rule = 2;
      }
      if (this.style == "每天") {
        this.taskData.type = 1;
      } else if (this.style == "所有时间段") {
        this.taskData.type = 2;
      }

      if (this.nextKey) {
        return;
      }
      this.nextKey = true;
      VM.$notify({
        title: "提示",
        message: `正在检测摄像头地址,请稍等...`,
        duration: 2000,
        customClass: "zZindex_f",
        type: "success",
        onClose: function() {
          VM.$http.api
            .get(
              window.BASEURL.testUrl2 +
                `/face-task-manager/api/v1/detection?main_stream=${VM.taskData.main_stream}&sub_stream=${VM.taskData.sub_stream}`
            )
            .then(function(res) {
              // console.log(res)
              if (res.data.code === 0) {
                VM.taskData.validStartTime = VM.start;
                VM.taskData.validEndTime = VM.end;
                VM.getFaceLibrary();
                VM.key1 = false;
                VM.key2 = true;
                VM.$notify({
                  title: "提示",
                  message: `${res.data.msg}`,
                  duration: 2500,
                  customClass: "zZindex_f",
                  type: "success"
                });
              } else {
                VM.$notify({
                  title: "提示",
                  message: `${res.data.msg}`,
                  duration: 8000,
                  customClass: "zZindex_f",
                  type: "error"
                });
              }
              VM.nextKey = false;
            })
            .catch(function(error) {
              VM.nextKey = false;
              VM.$notify({
                title: "提示",
                message: `服务异常`,
                duration: 2500,
                customClass: "zZindex_f",
                type: "error"
              });
              console.log(error);
            });
        }
      });
    },
    //上一步
    back() {
      this.key1 = true;
      this.key2 = false;
      this.name = "";
      this.pagesize = 5;
      this.total = 0;
      this.currentPage = 1;
      this.multipleSelection = [];
      this.choseTargets = [];
      this.toggleSelection();
    },

    //新建任务
    save() {
      let VM = this;
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "识别目标不能为空!",
          type: "warning",
          customClass: "zZindex"
        });

        return;
      }

      this.multipleSelection.forEach((ele, index) => {
        this.choseTargets.push("" + ele.id);
      });
      this.choseTargets = Array.from(new Set(this.choseTargets));
      this.taskData.targets = this.choseTargets;
      // this.taskData.deviceIds.push(this.deviceIds);
      this.taskData.id = `rtsp_${new Date().getTime()}`;
      let params = this.taskData;
      // console.log(params);
      this.$http.api
        .post(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/tasks`,
          params
        )
        .then(function(res) {
          // console.log(res);
          if (res.data.code === 0) {
            VM.$Message.success("添加成功");
            VM.retData();
            VM.$parent.getTask();
            VM.$parent.dialogKey = false;
          } else {
            VM.$Message.error("添加失败");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    retData() {
      let VM = this;

      VM.taskData.name = "";
      VM.taskData.targets = [];
      VM.targets = "";
      VM.taskData.main_stream = "";
      VM.taskData.sub_stream = "";
      VM.taskData.validStartTime = "";
      VM.taskData.validEndTime = "";
      VM.value1 = "";
      VM.rule = "";
      this.nextKey = false;
      this.dateVal1 = "";
      this.dateVal2 = "";
      this.multipleSelection = [];
      this.choseTargets = [];
      this.toggleSelection();
      this.key1 = true;
      this.key2 = false;
      this.pagesize = 5;
      this.total = 0;
      this.currentPage = 1;
    },
    _judgeImg() {
      let key = false;
      if (!this.taskData.name) {
        this.$message({
          message: "任务名不能为空!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (this.taskData.name.length > 20) {
        this.$message({
          message: "任务名字数不能超过20!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }

      if (!this.taskData.main_stream || !this.taskData.sub_stream) {
        this.$message({
          message: "主码流与子码流不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }

      if (!this.dateVal1 || !this.dateVal2) {
        this.$message({
          message: "时间段不能为空!",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      let now = new Date().getTime();
      this.start = new Date(this.dateVal1).getTime();
      this.end = new Date(this.dateVal2).getTime();
      if (this.start < now) {
        this.$message({
          message: "开始时间不能选择过去的时间",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (this.start == this.end) {
        this.$message({
          message: "结束时间不能等于开始时间",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      if (this.start > this.end) {
        this.$message({
          message: "结束时间不能早于开始时间",
          type: "warning",
          customClass: "zZindex"
        });
        key = true;
        return key;
      }
      return key;
    },
    handleClose() {
      this.retData();
      this.$parent.dialogKey = false;
    },
    giveUp() {
      this.retData();
      this.$parent.dialogKey = false;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //改变每页显示条数
    _handleSizeChange(size) {
      this.pagesize = size;
      this.getFaceLibrary();
    },
    //跳到某一页//
    _handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.pageNum = currentPage;
      this.getFaceLibrary();
    },
    getRowKeys(row) {
      return row.id;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    selec(row) {
      if (row.personNum == 0) {
        return false;
      } else {
        return true;
      }
    },
    showTimePanel1(refName) {
      this.$refs[refName].onSelectionModeChange("time");
    },
    showTimePanel2(refName) {
      this.$refs[refName].onSelectionModeChange("time");
    },
    clearStart(){
      console.log(this.dateVal1)
      this.dateVal1 = "";
      console.log(this.dateVal1)
    },
    clearEnd(){
      console.log(this.dateVal2)
      this.dateVal2 = "";
      console.log(this.dateVal2)
      
    }
  },
  components: {
    MRearchTip
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/func.scss";
.im-box {
  .task-con {
    width: 100%;
    // height: 200px;
    .shoot-inp {
      margin: 20px 0;
      display: flex;
      align-items: center;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      &:nth-of-type(4) {
        margin-top: 10px;
      }
      &.top {
        margin-bottom: 0px;
      }
      // &.bottom{
      //   margin-top: 0px;
      // }
      .inp-con {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .time__line {
          display: flex;
          font-size: 12px;
          margin: 0 20px;
        }
        .f-w {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          margin-right: 10px;
          color: #252a2a;
        }
        .f-w1 {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          margin-right: 15px;
          color: #252a2a;
        }
        .inp {
          width: 190px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
          &.rtsp {
            width: 430px;
          }
        }

        .addDec {
          outline: none;
          border: none;
          width: 88px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background: #2bd2a8;
          border-radius: 6px;
          margin-right: 20px;
        }
      }

      .inp-con1 {
        height: 50px;
        margin-right: 15px;
        padding-left: 15px;
      }

      .inp-con2 {
        width: 500px;
        height: 50px;
      }
    }
    .shoot-inp1 {
      box-sizing: border-box;
      padding-left: 86px;
      margin-top: 5px;
    }
  }
  .task-con2 {
    width: 100%;
    position: relative;
    .nav {
      .nav__title {
        font-size: 18px;
        color: #000;
      }
      .shoot-inp {
        display: flex;
        align-items: center;
        margin: 15px 0;
        padding-left: 10px;
        .inp-con {
          display: flex;
          align-items: center;
          margin-right: 39px;
          .w {
            font-size: 14px;
            color: #252a2a;
            display: inline-block;
            margin-right: 10px;
          }
          .inp {
            width: 220px;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            border: 1px solid #e3e3e6;
            border-radius: 8px;
            outline: none;
          }
          .addDec1 {
            outline: none;
            border: 1px solid #2761ea;
            width: 88px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #2761ea;
            background: #f1f4fc;
            border-radius: 6px;
            margin-right: 20px;
          }
          .addDec {
            outline: none;
            border: none;
            width: 88px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: url("#{$img}/btn.png") center no-repeat;
            border-radius: 6px;
            margin-right: 20px;
          }
        }
      }
    }
    .dec-list {
      width: 100%;
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 20px;
    }
    .slot-box {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
  }
}
</style>
