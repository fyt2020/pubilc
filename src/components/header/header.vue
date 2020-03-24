<template>
  <div class="header-wrapper">
    <img src="../../assets/img/logo.png" alt class="header-img" />
    <div class="header-right">
      <div class="one">
        <span class="useName">{{userInf.name}},欢迎您!</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span>{{userInf.orgName}}</span>
            <span>{{userInf.rolename}}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in dataOne" :key="index+item.name">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
       <!-- <div class="two-box" @mouseenter="mouseIn1" @mouseleave="mouseOut1">
       <img src="../../assets/img/help.png" alt class="two" v-show="!key1"/>
       <img src="../../assets/img/help2.png" alt class="two" v-show="key1"/>
       </div>
      

      <el-badge  class="item"  @mouseenter.native="mouseIn2" @mouseleave.native="mouseOut2">
        <img src="../../assets/img/ms.png" alt class="thr"  v-show="!key2"/>
        <img src="../../assets/img/ms2.png" alt class="thr"  v-show="key2"/>
      </el-badge> -->
      <div class="four">
       
        <el-dropdown>
          <img src="../../assets/img/img3/acc.png" alt="" class="acc">
          <!-- <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native="handle(item)"
              v-for="(item,index) in dataTwo"
              :key="index+item.name"
            >{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      key1:false,
      key2:false,
      dataOne: [],
      dataTwo: [{ name: "退出登录" }],
      name: "",
      userInf:{
         
      }
    };
  },
  created() {
    this.getUserInfro();
  },
  methods: {
     ...mapMutations(["setUseName"]),
    mouseIn1(){
       this.key1 = true;
    },
    mouseOut1(){
       this.key1 = false;
    },
      mouseIn2(){
       this.key2 = true;
    },
    mouseOut2(){
       this.key2 = false;
    },

    getUserInfro() {
      let token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        return;
      }
      this.name = token.tenantName;
      this.userInf = token;
    },
    handle(data) {
      let VM = this;
      if (data.name == "退出登录") {


       //this.$router.push({name: 'login'})
        this.$http.api
          .delete(window.BASEURL.testUrl1 + "parent-police/farsee2/api/v1/session")
          .then(function(res) {
            if (res.data.code === 0) {
              localStorage.clear();
              sessionStorage.clear();
              VM.setUseName({val:""})
              VM.$router.push({name:'login'})
            } else {
              ts.$Message.error(res.data.msg);
            }
          })
          .catch(function(e) {
            console.log(e);
            VM.$Message.error("Fail!");
          });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/css/header/header.scss";
</style>
