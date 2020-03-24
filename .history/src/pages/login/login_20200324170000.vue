<template>
  <div id="login">
    <div id="login_box">
      <img src="../../assets/img/login/mid_LG.png" alt class="login_boxImg" />
    </div>
    <div id="login_content">
      <img src="../../assets/img/login/SMC_LOGO.png" alt class="SMC_LOGO" />
      <div id="login_form">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
          <FormItem label prop="account">
            <Input prefix="ios-contact" id="account" type="text" v-model="formCustom.account"></Input>
          </FormItem>
          <FormItem label prop="passwd">
            <Input prefix="ios-contact" id="password" type="password" v-model="formCustom.passwd"></Input>
          </FormItem>
          <!-- <FormItem style="text-align: left">
            <Checkbox v-model="autoLanding">自动登陆</Checkbox>
          </FormItem> -->
          <FormItem>
            <div id="login_btn" @click="handleSubmit('formCustom')" style @keyup="Up($event)">登录</div>
          </FormItem>
        </Form>
      </div>
      <p class="copyright">Copyright © 2019 武汉天远视科技有限责任公司</p>
    </div>
  </div>
</template>
<script>
import * as URL from "@/plugins/env.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "login",
  created(){
      let VM = this;
      document.addEventListener('keydown',this.goTo,false)
  },
  beforeDestroy() {
     
      document.removeEventListener("keydown",this.goTo,false);
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    const validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    return {
      formCustom: {
        passwd: "",
        account: ""
      },
      formCustom1: {
        phone: "",
        autoCode: ""
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "blur",message: '请输入密码',required: true, type: 'string'}],
        account: [{ validator: validateAccount, trigger: "blur" ,message: '请输入账号',required: true, type: 'string'}]
      },
      autoLanding: ""
    };
  },

  methods: {
    ...mapMutations(["setUseName","set_token"]),
    goTo(e){
          	let key = e.keyCode;
            if(key == 13){
               this.handleSubmit('formCustom')
					};
    },
    handleSubmit(name) {
      let VM = this;
      if (!this.formCustom.passwd || !this.formCustom.account) {
        VM.$Message.error("账号密码不能为空");
        return
      } else {
           let sha1 = require('sha1');
           let params = {};
            params.accountPasswd = sha1(this.formCustom.passwd);
            params.accountName = this.formCustom.account;

            
            // let data = {
            //   accountId: "134ca61f6c95412bb52e7f6c1e2df627",
            //   bAdmin: true,
            //   orgName: "上海市刑侦总队",
            //   tenantName: null,
            //   accountName: "adminAccount",
            //   rolename: "超级管理员",
            //   roleId: "545",
            //   tenantId: "otgywab6uqa2g2a5",
            //   name: "超管",
            //   accessToken: "d11d29fbaee74a379a694ce68396bc6a",
            //   orgId: "otgywab6uqa2g2a5"
            // }
            // localStorage.setItem('token', JSON.stringify(data));
            // VM.set_token({val:JSON.stringify(data)})
            // VM.$router.push({name: 'shootC'});
            
            this.$http.api.post(window.BASEURL.testUrl1 + 'parent-police/farsee2/api/v1/session', params).then(function (res) {
                if (res.data.code === 0) {
                  let data = res.data.result.datas;
                  let roleId = data.roleId;
                  localStorage.setItem('token', JSON.stringify(data));
                  VM.set_token({val:JSON.stringify(data)})
                  VM.$Message.success('登陆成功!');
                  VM.setUseName({val:data.rolename});
                  VM.$router.push({name: 'home'});
                } else {
                     VM.$Message.error(`${res.data.msg}`);
                }
              }
            ).catch(function (err) {
              VM.$Message.error(`${err}`);
            })
        }
     }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/login/login.scss";
</style>
