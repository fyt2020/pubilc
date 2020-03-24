<template>
  <div class="im-box">
    <el-dialog title="编辑" :visible.sync="con" width="36%" center :before-close="handleClose">
      <div class="task-con">
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">姓名</span>
              <input type="text" id="one" class="inp" v-model="deviceData.deviceName" />
            </label>
          </div>

          <div class="inp-con">
            <label for="one">
              <span class="f-w">性别</span>
            <el-select v-model="deviceData.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con1">
            <span class="f-w1">标签</span>
          </div>
          <div class="inp-con2">
            <CheckboxGroup v-model="deviceData.tag" @on-change="checkAllGroupChange2">
              <Checkbox label="禁用"></Checkbox>
              <Checkbox label="启用"></Checkbox>
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
        tag:[],
        style: []
      },
      options3:[],
       options: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ]
    };
  },
  computed: {},
  created() {

  },

  methods: {
    save() {
      this.$parent.dialogKey2 = false;
    },
    handleClose() {
      this.$parent.dialogKey2 = false;
    },
    giveUp() {
      this.$parent.dialogKey2 = false;
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
 
    checkAllGroupChange2(data) {

    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.im-box {
  .task-con {
    width: 100%;
    height: 100px;

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
