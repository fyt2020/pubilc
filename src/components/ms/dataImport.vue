<template>
  <div class="im-box">
    <el-dialog
      title="新增人脸库"
      :visible.sync="con"
      width="22%"
      center
      :before-close="handleClose"
      class="dataImport"
      :close-on-click-modal="false"
    >
      <div class="import_box">
        <span class="w">请输入库名称</span>
        <el-tooltip content="库名称,字符长度不能超过20" placement="bottom">
          <input type="text" class="inp" v-model="name" autocomplete="off"  maxlength="20"/>
        </el-tooltip>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp" class="giveUp">放弃</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["con"],
  data() {
    return {
      name: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    giveUp() {
      this.name = "";
      this.$parent.centerDialogVisible = false;
    },
    // onIput(e) {
    //   if (e.target.value.length > 20) {
    //     this.name = e.target.value.slice(0, 20);
    //     // this.name = e.target.value;
    //   }
    // },
    save() {
      let VM = this;
      let reg = /(^\s)|(\s$)/g;
      let key = reg.test(this.name);
      if (key) {
        this.$message({
          message: "库名称不能有空格",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (!this.name) {
        this.$message({
          message: "库名称不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (this.name.length > 20) {
        this.$message({
          message: "字符长度不能超过20",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      let params = [{ libName: this.name }];
      this.$http.api
        .post(
          window.BASEURL.testUrl1 + `parent-police/api/v1/faceLibrary`,
          params
        )
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$parent.getFaceLibrary();
            VM.$parent.centerDialogVisible = false;
            VM.name = "";
            VM.$Message.success(`新增成功`);
          } else {
            VM.$Message.error(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClose() {
      this.name = "";
      this.$parent.centerDialogVisible = false;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.import_box {
  display: flex;
  flex-direction: column;
  // height: 40px;
  // align-items: center;
  // justify-content: center;
  .w {
    font-size: 14px;
    color: #000;
    display: inline-block;
    margin-right: 20px;
  }
  .inp {
    width: 390px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid #e3e3e6;
    border-radius: 4px;
    outline: none;
    margin-top: 20px;
  }
}
</style>
