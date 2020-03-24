<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="con.key"
      width="24%"
      center
      :close-on-click-modal="false"
      @before-close="close"
      class="close"
    >
      <div class="tips__content">
        <div class="tips__nav">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除该{{con.value}}, 是否继续?</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp" class="dialogBtn">取消</el-button>
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
      this.$parent.deleteItem(this.con.id)
      this.$parent.tipsData.key = false;
     
    },
    // handleClose() {
    //   this.$parent.tipsData.key = false;
    // },
    giveUp(){
       this.$parent.tipsData.key = false;
    },
    close(){
       this.$parent.tipsData.key = false;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.tips__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .tips__nav {
    font-size: 14px;
    display: flex;
    align-items: center;
     .el-icon-warning{
         color: #e6a23c;
         font-size: 20px;
         margin-right: 10px;
      }
   }
}
</style>
