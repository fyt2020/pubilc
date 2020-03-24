<template>
  <div class="acc-wrapper">
    <div class="acc-header">
      <m-crums :con="crumsData" />
      <p class="title">基础信息</p>

      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one1">
            <span>用户名</span>
            <input type="text" id="one1" class="inp" v-model="accName" readonly />
          </label>
        </div>

        <div class="inp-con">
          <label for="one2">
            <span>登录账号</span>
            <input type="text" id="one2" class="inp" v-model="account" readonly />
          </label>
        </div>

        <div class="inp-con">
          <label for="one3">
            <span>所属单位</span>
            <input type="text" id="one3" class="inp" v-model="betongTo" readonly />
          </label>
        </div>
      </div>
    </div>

    <div class="acc-content">
      <p class="title">安全信息</p>

      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one">
            <span>原始密码</span>
            <input  id="one" class="inp" v-model="oldPass"  type="text"  autocomplete="off"/>
          </label>
        </div>
      </div>

       <div class="shoot-inp">
        <div class="inp-con">
          <label for="two">
            <span>修改密码</span>
            <input  id="two" class="inp" v-model="newPass"  type="text"  autocomplete="off"/>
          </label>
        </div>
         <div class="inp-con">
          <label for="thr">
            <span>确认密码</span>
            <input  id="thr" class="inp" v-model="surePass"  type="text"  autocomplete="off"/>
          </label>
        </div>

        <div class="inp-con">
           <button class="addDec" @click="sure">确认修改</button>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import * as URL from "@/plugins/env.js";
export default {
  props: {},
  data() {
    return {
      accName: "",
      account: "",
      betongTo: "",
      id:'',
      orgId:'',
      oldPass:'',
      newPass:'',
      surePass:'',
      crumsData: {
        one: "系统设置",
        two: "账号信息"
      }
    };
  },
  computed: {},
  created() {
    this.getUserInfo();
  },

  methods: {
    sure(){
        let VM = this;
        let params = {
                       accountId:this.id,
                       accountPasswd:'',
                       oldPasswd:'',
                       orgId:this.orgId,
                       orgName:this.betongTo,
                       name:this.accName,
                     };
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(!this.oldPass){
             VM.$Message.error("请输入原始密码");
             return
        }
        if(!this.newPass){
             VM.$Message.error("请输入新密码");
             return
        }
        let key = reg.test(this.newPass);
        if(!key){
          VM.$Message.error("密码为6-16数字字母");
             return
        }
        if(!this.surePass){
             VM.$Message.error("请再次输入新密码");
             return
        }
        if(this.newPass != this.surePass){
             VM.$Message.error("新密码与确认密码不一样");
             return
        }
       if(this.id){
            let sha1 = require('sha1');
            params.accountPasswd = sha1(this.newPass);
            params.oldPasswd = this.oldPass;
    
       this.$http.api
        .put(window.BASEURL.testUrl1 + `/parent-police/farsee2/api/v1/accounts/${VM.id}`,params)
        .then(function(res) {
            console.log(res)
          if (res.data.code === 0) {
                VM.$Message.success('修改成功!');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
       }
    },
    getUserInfo() {
      let token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        this.accName = token.name;
        this.account = token.accountName;
        this.betongTo = token.orgName;
        this.id = token.accountId;
        this.orgId = token.orgId;
      
      }
    }
  },
  components: {
    MCrums
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/sysSet/accountMange.scss";
</style>
