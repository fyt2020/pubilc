<template>
  <div class="record-wrapper">
    <div class="record-header">
      <p class="header-con">
        <span class="record-con-word">访问记录</span>
        <img src="../../assets/img/img/Visit.png" alt class="record-con-img" />
      </p>
    </div>
    <div class="record-content">
      <ul class="rec-content-box">
        <transition-group name="el-fade-in-linear">
          <li class="rec-content-item" v-for="(item,index) in baseArr" :key="index+item.id">
            <div class="item-left">
              <img :src="url+item.md5" alt class="item-left-img" />
            </div>
            <div class="item-mid">
              <p class="item-mid-name">{{item.username}}</p>
              <p class="item-mid-about">
                <span >相似度:{{item.possibility}}</span>
                <span >所属:{{item.dept_name}}</span>
              </p>
            </div>

            <div class="item-right">
              <span class="point"></span>
              <span class="item-right-time">{{new Date(item.createTime).toLocaleDateString()}}</span>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";

export default {
  props: ["con"],
  created() {
    let VM = this;
    console.log(this.baseArr)
    
  },
  
  data() {
    return {
      baseArr: [],
      url:''
    };
  },
  methods: {

  }
    
  
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/record/record.scss";
</style>