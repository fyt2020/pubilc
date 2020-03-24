<template>
  <div class="recently-wrapper">
    <div class="rec-header">
      <img src="../../assets/img/img/Rightline.png" alt class="header-img" />
      <p class="header-con">
        <span class="rec-con-word">最近访问</span>
        <!-- <img :src="`data:image/png;base64,${con.body}`" alt class="rec-con-img" /> -->
      </p>
    </div>
    <div class="rec-content">
      <div class="rec-content-left">
        <div class="rcli-box">
           <img :src="`data:image/png;base64,${con.facePic}`" alt class="rcli" />
        </div>
        <!-- <span class="rclw">访问时间:{{ new Date(item.createTime).toLocaleDateString() }}</span> -->
        <span class="rclw" v-if="con.createTime">访问时间:{{ new Date(con.createTime).getHours() > 9 ? new Date(con.createTime).getHours() : '0' + (  Number.isNaN(new Date(con.createTime).getHours()) ? 0 :new Date(con.createTime).getHours() )}}:{{ new Date(item.createTime).getMinutes() > 9 ? new Date(item.createTime).getMinutes() : "0" + (Number.isNaN(new Date(item.createTime).getMinutes()) ? 0 : new Date(item.createTime).getMinutes())}}:{{new Date(item.createTime).getSeconds() > 9 ? new Date(item.createTime).getSeconds() : '0' + ( Number.isNaN(new Date(item.createTime).getSeconds()) ? 0 :new Date(item.createTime).getSeconds())}}</span>
      </div>

      <div class="rec-content-right">

          <ul :class="['rec-content-box',{'isOne':true}]">
          <li :class="['rec-content-item',{'isOne':true}]" >
            <div class="item-left" >
              <img :src="`data:image/png;base64,${con.angle_pic}`" alt class="item-left-img" />
            </div>
            <div class="item-right">
              <p class="item-right-name"  v-if="con.username">{{con.username}}</p>
              <p class="item-right-about"  v-if="con.dept_name">所属:{{con.dept_name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
export default {
  props:['con'],
  data() {
    return {
       isOne:false,
       VisitTime:'',
       imgData:[],
       body:'',
       url:'',
    };
  },
 created(){
    this.url = URL.imgPath;
 },
 mounted(){
  //  setInterval(()=>{
  //      console.log(this.con)
  //  },2000)
 },
 updated(){
  //  console.log(this.con.body.body)
 
 },

  methods: {

    getTimeStamp(){
       if(this.con.createTime){
          this.VisitTime = new Date().toLocaleDateString();
       }
    },

    getImgMd5(){
      let imgArr=[];
      //  console.log(this.con.list)
      if(!this.con.list){
        return
      }else{    
          for(var k in this.con.list){
            // console.log(this.con.list[k])
            if(typeof (this.con.list[k]) == 'object'){
                   imgArr.push(this.con.list[k])
            }
       };
         this.imgData = imgArr;
        //  this.imgData.forEach((item,index,self)=>{        
        //  })
      }
    },
    
  },
};
</script>



<style lang="scss" scoped>
@import "@/assets/css/recently/recently.scss";
</style>