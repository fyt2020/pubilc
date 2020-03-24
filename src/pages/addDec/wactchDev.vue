<template>
  <div class="addDec-wrapper">
    <div class="addDec-header">
      <m-crums :con="crumsData" />

      <p class="header-title">设备基础信息</p>
      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one">
            <span>设备编号</span>
            <input type="text" id="one" class="inp disable" v-model="data.deviceNo" readonly />
          </label>
        </div>
        <div class="inp-con">
          <label for="five">
            <span>设备型号</span>
            <input type="text" id="one" class="inp disable" v-model="data.versionName" readonly />
          </label>
        </div>

        <div class="inp-con">
          <label for="five">
            <span>所属机构</span>
            <input type="text" id="one" class="inp disable" v-model="data.orgName" readonly />
          </label>
        </div>
      </div>

      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one">
            <span>所在场地</span>
            <input type="text" id="one" class="inp disable" v-model="data.address" readonly />
          </label>
        </div>

        <!-- <div class="inp-con">
          <label for="one">
            <span>IP地址</span>
            <input type="text" id="one" class="inp" v-model="data.ip" />
          </label>
        </div>-->

        <div class="inp-con">
          <span class="label">是否禁用</span>
          <RadioGroup v-model="data.deviceStatusCname">
            <Radio label="禁用" disabled></Radio>
            <Radio label="启用" disabled></Radio>
          </RadioGroup>
        </div>
      </div>

      <div class="addDec-content">
        <p class="header-title">摄像头信息</p>
        <div class="dec-list" v-if="showTable1">
        <el-table :data="userdata" stripe style="width: 100%" highlight-current-row>
          <el-table-column prop="index" label="序号" width="100" height="40" align="center"></el-table-column>
          <el-table-column prop="cameraNo" label="摄像头编号" width="350" height="40" align="center"></el-table-column>
          <el-table-column prop="ip" label="IP地址" width="350" height="40" align="center"></el-table-column>
          <el-table-column prop="user" label="用户" width="350" height="40" align="center"></el-table-column>
          <el-table-column prop="password" label="密码" width="350"  height="40" align="center"></el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="300" height="40" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                style="color:red"
              >编辑</el-button>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">拍摄</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        </div>
      </div>

       <div class="slot-box">
      <el-pagination
        class="slot"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8]"
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
      showTable1: true,
      id: "",
      deviceVersion:'',
      data: {
        deviceVersion: "",
        type: 1,
        orgId: "",
        orgName: "",
        deviceNo: "",
        status: "",
        location: "",
        ip: ""
      },
      currentPage: 1,
      pagesize: 8,
      labelArr: "",
      tableData: [],
      crumsData: {
        one: "人像采集",
        two: "拍摄设备",
        thr: "设备详情",
        now:1,
        pathGP:'shootD'
      }
    };
  },

  created() {
    this.id = this.$route.query.id;
    // console.log(this.id)
    this.getDev(this.id);
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
            console.log(res)
            let data = res.data.result;
            VM.data = data;
            VM.tableData =  data.cameras;
            // console.log(data.cameras)
            VM.tableData.forEach((ele,index) =>{
                   ele.index = index + 1;
            });

            console.log(VM.data)
            
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
