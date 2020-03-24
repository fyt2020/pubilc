<template>
  <div class="crums-wrapper">
    <span class="crums-now">当前页面:</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-if="con.one"
        @click.native="go1(con.path)"
        :class="{'now':con.now == 0 }"
      >{{con.one}}</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="con.two"
        @click.native="go2(con.pathGP)"
        :class="{'now':con.now == 1 }"
      >{{con.two}}</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="con.thr"
        @click.native="go2(con.pathP)"
        :class="{'now':con.now == 2 }"
      >{{con.thr}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="con.four" :class="{'now':con.now == 3}">{{con.four}}</el-breadcrumb-item>
    </el-breadcrumb>
    <span v-if="con.istake" class="topic">(有*号为必填项)</span>
  </div>
</template>

<script>
export default {
  props: ["con"],
  data() {
    return {};
  },
  methods: {
    go1() {},
    go2(data) {
      if (data == "upDate") {
       
        this.$parent.upDate();
     
      } else if(data == "detail"){
        this.$parent.goBack();
      }
        else {
        this.$router.push({
          name: data,
          params: { id: this.con.id, name: this.con.thr }
        });
      }

    }
  }
};
</script>


<style lang="scss">
@import "@/assets/css/func.scss";
.crums-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  .crums-now {
    display: inline-block;
    line-height: 27px;
    font-size: px2Rem(18px);
    color: #000;
    font-weight: 600;
    margin-right: 15px;
    @media screen and (max-width: 1280px) {
      font-size: 16px;
    }
  }
  .topic {
    display: inline-block;
    margin-left: 10px;
    font-size: px2Rem(14px);
    color: red;
  }

  .el-breadcrumb {
    display: flex;
    align-items: center;
    .el-breadcrumb__item {
      display: flex;
      align-items: center;
      &.now {
        .el-breadcrumb__inner {
          color: #2761ea;
          cursor: pointer;
        }
      }
      .el-breadcrumb__inner {
        max-width: px2Rem(130px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        display: inline-block;
        height: 27px;
        box-sizing: border-box;
        line-height: 27px;
        font-size: px2Rem(18px);
        color: #000;
        font-weight: 600;
        @media screen and (max-width: 1280px) {
          font-size: 16px;
        }

        &:hover {
        }
      }
    }
  }
}
</style>