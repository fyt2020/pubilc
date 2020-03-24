<template>
  <div class="im-box">
    <el-dialog title="新增用户" :visible.sync="con" width="36%" center :before-close="handleClose">
      <div class="task-con">
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">原密码</span>
              <input type="text" id="one" class="inp" v-model="deviceData.oldpass" />
            </label>
          </div>
        </div>
        <div class="shoot-inp">
        <div class="inp-con">
            <label for="one">
              <span class="f-w">新密码</span>
              <input type="text" id="one" class="inp" v-model="deviceData.newpass" />
            </label>
          </div>
          <div class="inp-con">
            <label for="one">
              <span class="f-w">确认新密码</span>
              <input type="text" id="one" class="inp" v-model="deviceData.surepass" />
            </label>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveup">放弃</el-button>
        <el-button type="primary" @click="add">保存</el-button>
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
        oldpass:"",
        newpass:'',
        surepass:'',
      },
    };
  },
  computed: {},
  created() {
  },
  methods: {
   
    handleClose() {
      this.$parent.dialogKey1 = false;
    },
    add(){
        let VM = this;
        if(!this.deviceData.oldpass||!this.deviceData.newpass||!this.deviceData.surepass){
            this.$Message.error("内容不能为空");
            return
        }
        let params = this.deviceData;
        this.$http.api
        .post(window.BASEURL.testUrl1 + `parent-police/farsee2/api/v1/accounts`,params)
        .then(function(res) {
            console.log(res)
          if (res.data.code === 0) {
               VM.$parent.dialogKey1 = false;
               VM.$Message.success(`${res.data.msg}`);
               VM.deviceData = {
                     oldpass: "",
                     newpass: "",
                     surepass:'',
               };
          }
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    giveup(){
       this.$parent.dialogKey1 = false;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.im-box {
  .task-con {
    width: 100%;
    height: 130px;
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
