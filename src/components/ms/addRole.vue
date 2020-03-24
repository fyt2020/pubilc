<template>
  <div class="im-box">
    <el-dialog
      title="新增角色"
      :visible.sync="con"
      width="35%"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="addRole"
    >
      <div class="task-con">
        <m-rearchTip ref="rearchTip" />
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">角色名称</span>
              <input
                type="text"
                id="one"
                class="inp"
                v-model="taskData.rolename"
                autocomplete="off"
              />
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one1">
              <span class="f-w">角色描述</span>
              <textarea name id="one1" rows="3" v-model="taskData.description"></textarea>
            </label>
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
import MRearchTip from "@/components/ms/rearchSuss.vue";
export default {
  props: ["con"],
  data() {
    return {
      taskData: {
        rolename: "",
        description: "",
        type: 1,
        identify:''
      }
    };
  },
  computed: {},
  created() {},

  methods: {
    /**
     * @Author fyt
     * @Description 保存
     * @Date 2020-03-12 16:19:11 星期四
     */
    save() {
      let VM = this;
      if (!this.taskData.rolename || !this.taskData.description) {
        this.$message({
          message: "新增内容不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      this.taskData.identify = JSON.parse(window.sessionStorage.getItem("token")).orgId;
      let params = [this.taskData];
      this.$http.api
        .post(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles`, params)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$parent.getRoleArr();
            VM.$parent.dialogKey = false;
            VM.$Message.success(`添加成功`);
            VM.reSet();
          } else {
            if (res.data.code == 14030102) {
              VM.$refs.rearchTip.toggleShow(
                "show",
                "error",
                true,
                "新增失败,该角色名称已存在!",
                "-180px"
              );
              setTimeout(() => {
                VM.$refs.rearchTip.toggleShow("hidden", "", false, "", "");
              }, 1500);
            } else {
              VM.$refs.rearchTip.toggleShow(
                "show",
                "error",
                true,
                res.data.msg,
                "-180px"
              );
              setTimeout(() => {
                VM.$refs.rearchTip.toggleShow("hidden", "", false, "", "");
              }, 1500);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 重置数据
     * @Date 2020-03-12 16:13:59 星期四
     */
    reSet() {
      this.taskData.rolename = "";
      this.taskData.description = "";
      this.taskData.type = 1;
    },

    /**
     * @Author fyt
     * @Description 关闭
     * @Date 2020-03-12 16:18:40 星期四
     */
    handleClose() {
      this.$parent.dialogKey = false;
      this.reSet();
    },

    /**
     * @Author fyt
     * @Description 放弃
     * @Date 2020-03-12 16:18:52 星期四
     */
    giveUp() {
      this.$parent.dialogKey = false;
      this.reSet();
    }
  },
  components: { MRearchTip }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/func.scss";
.im-box {
  .task-con {
    width: 90%;
    height: 130px;
    position: relative;
    .shoot-inp {
      margin: 20px 0;
      display: flex;
      align-items: center;
      .inp-con {
        display: flex;
        align-items: center;
        // margin-right: 36px;
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
        #one1 {
          width: px2Rem(350px);
          outline: none;
          vertical-align: middle;
          border: 1px solid #e3e3e6;
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
  }
}
</style>
