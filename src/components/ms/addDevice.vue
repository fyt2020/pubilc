<template>
  <div class="im-box">
    <el-dialog title="新增设备" :visible.sync="con" width="36%" center :before-close="handleClose" :close-on-click-modal="false">
      <div class="task-con">
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">设备名称</span>
              <input type="text" id="one" class="inp" v-model="deviceData.deviceName" />
            </label>
          </div>

          <div class="inp-con">
            <label for="one">
              <span class="f-w">设备编号</span>
              <input type="text" id="one" class="inp" v-model="deviceData.deviceNo" />
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">IP地址</span>
              <input type="text" id="one" class="inp" v-model="deviceData.ip" />
            </label>
          </div>
        </div>


          <div class="shoot-inp">

           <div class="inp-con">
          <label for="five">
            <span class="f-w">所属单位</span>
            <el-select v-model="deviceData.orgName" placeholder="请选择">
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

          <div class="inp-con">
            <label for="one">
              <span class="f-w">地理位置</span>
              <input type="text" id="one" class="inp" v-model="deviceData.location" />
            </label>
          </div>
        </div>




        <div class="shoot-inp">
          <div class="inp-con1">
            <span class="f-w1">状态</span>
          </div>
          <div class="inp-con2">
            <CheckboxGroup v-model="deviceData.style" @on-change="checkAllGroupChange2">
              <Checkbox label="禁用"></Checkbox>
              <Checkbox label="启用"></Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp">放弃</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
export default {
  props: ["con"],
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      deviceData: {
        deviceName: "",
        deviceNo: "",
        orgName:'',
        ip: "",
        orgId: "",
        location: "",
        style: []
      },
      options3:[],
    };
  },
  computed: {},
  created() {
    //    this.centerDialogVisible = this.con;
    this.getOrg();
  },

  methods: {
    save() {
      this.$parent.dialogKey = false;
    },
    handleClose() {
      this.$parent.dialogKey = false;
    },
    giveUp() {
      this.$parent.dialogKey = false;
    },
     selectOrg(data){
      this.deviceData.orgId = data.orgId;
    },
    getOrg() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/farsee2/api/v1/organizations`)
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

    checkAllGroupChange(data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.deviceData.deviceIds = [
          "HBWH0081654",
          "HBWH0081655",
          "HBWH0081656",
          "HBWH0081657",
          "HBWH0081658"
        ];
      } else {
        this.deviceData.deviceIds = [];
      }
    },
    checkAllGroupChange2(data) {}
  },
  components: {}
};
</script>

<style scoped lang="scss">
.im-box {
  .task-con {
    width: 100%;
    height: 200px;

    .shoot-inp {
      margin: 20px 0;
      display: flex;
      align-items: center;

      .inp-con {
        display: flex;
        align-items: center;
        margin-right: 36px;
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
        }

        .addDec {
          outline: none;
          border: none;
          width: 80px;
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
        width: 70px;
        text-align: right;
        height: 50px;
        margin-right: 15px;
        padding-left: 15px;
      }

      .inp-con2 {
        width: 500px;
        height: 50px;
      }
    }
  }
}
</style>
