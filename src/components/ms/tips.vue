<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="con.key"
      width="20%"
      center
      :close-on-click-modal="false"
      :before-close="handleClose"
      class="close"
    >
      <div class="tips__content">
        <div class="tips__nav" v-if="con.severStatus == 'false' && con.type=='status'">
          <i class="el-icon-warning"></i>
          很抱歉,{{con.c}}识别服务未开启
        </div>
        <div class="tips__nav" v-if="con.severStatus == 'false' && con.type=='status'">请联系管理员!</div>
        <div class="tips__nav" v-if="con.severStatus == 'suc' && con.type=='status'">
          <i class="el-icon-success"></i>
          {{con.c}}识别服务已开启,共{{con.severNum}}个
        </div>
        <div class="tips__nav" v-if=" con.type=='close'">
          <i class="el-icon-warning"></i>
          {{con.c}}识别服务正在进行中,确认关闭?
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["con"],
  data() {
    return {};
  },
  methods: {
    save() {
      if (this.con.type == "close") {
        this.$parent.closed();
        this.$parent.tipsData.key = false;
      } else {
        this.$parent.tipsData.key = false;
      }
    },
    handleClose() {
      if (this.con.type == "close") {
        this.$parent.tipsData.key = false;
      } else {
        this.$parent.tipsData.key = false;
        this.$parent.tipsData.type = "";
        this.$parent.tipsDataseverNum = "";
        this.$parent.tipsDataseverStatus = null;
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.tips__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tips__nav {
    font-size: 14px;
    display: flex;
    align-items: center;
    // font-weight: 550;
    .el-icon-warning {
      color: #e6a23c;
      font-size: 18px;
      margin-right: 5px;
    }
    .el-icon-success {
      color: green;
      font-size: 18px;
      margin-right: 5px;
    }
  }
}
</style>
