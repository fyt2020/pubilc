<template>
  <div class="nav-wrapper">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="this.$route.name"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#242425"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <template v-for="(item,index) in nowActiveArr">
            <el-submenu
              :class="{'first':index == 0,'title__now':homeKey && index ==  0}"
              :index="`${index} + 1`"
              :key="index"
              v-if="item.checked == '1'"
              @click.native="goTo(item)"
            >
              <template slot="title">
                <img :src="logoArr[index]" alt class="ine-img" />
                <span>{{item.name}}</span>
              </template>

              <el-menu-item-group>
                <template v-for="(v,i) in item.children">
                  <el-menu-item :index="v.url" :key="i+1" v-if="v.checked == '1'">
                    <router-link
                      tag="li"
                      :to="{name:v.url}"
                      :class="['nav-item',{'nowNow':v.active}]"
                      v-if="v.checked == '1'"
                      @click.native="refresh(v.url,$event)"
                    >{{v.name}}</router-link>
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>

    <div class="logo__box">
      <img src="../../assets/img/img3/logonew.png" alt=""  class="img__item">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as URL from "@/plugins/env.js";
export default {
  data() {
    return {
      index: "1-1",
      id: "",
      name: "",
      pathArr: [],
      homeKey:null,
      logoArr: [
        require("@/assets/img/1icon.png"),
        require("@/assets/img/2icon.png"),
        require("@/assets/img/3icon.png"),
        require("@/assets/img/4icon.png"),
        require("@/assets/img/5icon.png"),
        require("@/assets/img/6icon.png"),
        require("@/assets/img/7icon.png"),
        require("@/assets/img/8icon.png")
      ],
      //  logoArr: [
      //   require("@/assets/img/home/1icon.png"),
      //   require("@/assets/img/home/2icon.png"),
      //   require("@/assets/img/home/3icon.png"),
      //   require("@/assets/img/home/4icon.png"),
      //   require("@/assets/img/home/5icon.png"),
      //   require("@/assets/img/home/6icon.png"),
      //   require("@/assets/img/home/7icon.png"),
      // ]
    };
  },
  computed: {
    ...mapState(["INDEX", "nowActiveArr"])
  },
  created() {
    let id = JSON.parse(localStorage.getItem("token")).accountId;
	this.homeKey = JSON.parse(localStorage.getItem("homeKey"));
    this.getdata(id);
  },
  mounted() {},
  methods: {
    ...mapMutations(["changArr"]),
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    setKey(){
        this.homeKey = JSON.parse(localStorage.getItem("homeKey"));
    },
    getdata(data) {
	  let VM = this;
	  

    //   var	menuResourceList = [
	// 			{
	// 				"checked":"1",
	// 				"children":[],
	// 				"description":"首页",
	// 				"id":2800,
	// 				"name":"首页",
	// 				"projectid":"police_v1",
	// 				"quence":1,
	// 				"url":"home"
	// 			},
	// 			{
	// 				"checked":"1",
	// 				"children":[
	// 					{
	// 						"checked":"1",
	// 						"description":"拍摄采集",
	// 						"id":2101,
	// 						"name":"拍摄采集",
	// 						"pcode":2100,
	// 						"projectid":"police_v1",
	// 						"quence":1,
	// 						"url":"shootC"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"采集列表",
	// 						"id":2103,
	// 						"name":"采集列表",
	// 						"pcode":2100,
	// 						"projectid":"police_v1",
	// 						"quence":2,
	// 						"url":"shootList"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"拍摄设备",
	// 						"id":2102,
	// 						"name":"拍摄设备",
	// 						"pcode":2100,
	// 						"projectid":"police_v1",
	// 						"quence":3,
	// 						"url":"shootD"
	// 					}
	// 				],
	// 				"description":"人像采集",
	// 				"id":2100,
	// 				"name":"人像采集",
	// 				"projectid":"police_v1",
	// 				"quence":2
	// 			},
	// 			{
	// 				"checked":"0",
	// 				"children":[
	// 					{
	// 						"checked":"0",
	// 						"description":"建模列表",
	// 						"id":2201,
	// 						"name":"建模列表",
	// 						"pcode":2200,
	// 						"projectid":"police_v1",
	// 						"quence":1,
	// 						"url":"modelList"
	// 					}
	// 				],
	// 				"description":"AI3D建模",
	// 				"id":2200,
	// 				"name":"AI3D建模",
	// 				"projectid":"police_v1",
	// 				"quence":3
	// 			},
	// 			{
	// 				"checked":"1",
	// 				"children":[
	// 					{
	// 						"checked":"1",
	// 						"description":"人像模型库",
	// 						"id":2301,
	// 						"name":"人像模型库",
	// 						"pcode":2300,
	// 						"projectid":"police_v1",
	// 						"quence":1,
	// 						"url":"faceM"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"一正两侧库",
	// 						"id":2302,
	// 						"name":"一正两侧库",
	// 						"pcode":2300,
	// 						"projectid":"police_v1",
	// 						"quence":2,
	// 						"url":"syncMan"
	// 					}
	// 				],
	// 				"description":"三维人像库",
	// 				"id":2300,
	// 				"name":"三维人像库",
	// 				"projectid":"police_v1",
	// 				"quence":4
	// 			},
	// 			{
	// 				"checked":"1",
	// 				"children":[
	// 					{
	// 						"checked":"1",
	// 						"description":"人脸库",
	// 						"id":2404,
	// 						"name":"人脸库",
	// 						"pcode":2400,
	// 						"projectid":"police_v1",
	// 						"quence":1,
	// 						"url":"faceChar"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"实时识别",
	// 						"id":2401,
	// 						"name":"实时识别",
	// 						"pcode":2400,
	// 						"projectid":"police_v1",
	// 						"quence":2,
	// 						"url":"intellRec"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"视频识别",
	// 						"id":2402,
	// 						"name":"视频识别",
	// 						"pcode":2400,
	// 						"projectid":"police_v1",
	// 						"quence":3,
	// 						"url":"video"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"图像识别",
	// 						"id":2403,
	// 						"name":"图像识别",
	// 						"pcode":2400,
	// 						"projectid":"police_v1",
	// 						"quence":4,
	// 						"url":"imgRec"
	// 					}
	// 				],
	// 				"description":"三维人像应用",
	// 				"id":2400,
	// 				"name":"三维人像应用",
	// 				"projectid":"police_v1",
	// 				"quence":5
	// 			},
	// 			{
	// 				"checked":"1",
	// 				"children":[
	// 					{
	// 						"checked":"1",
	// 						"description":"数据统计",
	// 						"id":2701,
	// 						"name":"数据统计",
	// 						"pcode":2700,
	// 						"projectid":"police_v1",
	// 						"quence":1,
	// 						"url":"data"
	// 					}
	// 				],
	// 				"description":"数据统计",
	// 				"id":2700,
	// 				"name":"数据统计",
	// 				"projectid":"police_v1",
	// 				"quence":6,
	// 				"url":""
	// 			},
	// 			{
	// 				"checked":"1",
	// 				"children":[
	// 					{
	// 						"checked":"1",
	// 						"description":"用户列表",
	// 						"id":2501,
	// 						"name":"用户列表",
	// 						"pcode":2500,
	// 						"projectid":"police_v1",
	// 						"quence":1,
	// 						"url":"userList"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"角色管理",
	// 						"id":2502,
	// 						"name":"角色管理",
	// 						"pcode":2500,
	// 						"projectid":"police_v1",
	// 						"quence":2,
	// 						"url":"userm"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"组织机构",
	// 						"id":2503,
	// 						"name":"组织机构",
	// 						"pcode":2500,
	// 						"projectid":"police_v1",
	// 						"quence":3,
	// 						"url":"organizational"
	// 					}
	// 				],
	// 				"description":"用户管理",
	// 				"id":2500,
	// 				"name":"用户管理",
	// 				"projectid":"police_v1",
	// 				"quence":7
	// 			},
	// 			{
	// 				"checked":"1",
	// 				"children":[
	// 					{
	// 						"checked":"1",
	// 						"description":"账号信息",
	// 						"id":2601,
	// 						"name":"账号信息",
	// 						"pcode":2600,
	// 						"projectid":"police_v1",
	// 						"quence":1,
	// 						"url":"acc"
	// 					},
	// 					{
	// 						"checked":"1",
	// 						"description":"标签管理",
	// 						"id":2602,
	// 						"name":"标签管理",
	// 						"pcode":2600,
	// 						"projectid":"police_v1",
	// 						"quence":2,
	// 						"url":"labelM"
	// 					}
	// 				],
	// 				"description":"系统设置",
	// 				"id":2600,
	// 				"name":"系统设置",
	// 				"projectid":"police_v1",
	// 				"quence":8
	// 			}
    //   ];
    //   menuResourceList.forEach((item, index) => {
    //           item.active = false;
    //           if (item.children.length > 0) {
    //             item.children.forEach((item, index) => {
    //               item.active = false;
    //             });
    //           }
    //         });
    //    VM.changArr({ val: menuResourceList });


      this.$http.api
        .get(
          window.BASEURL.roleUrl +
            `/yyqxzx/api/v1/permissions?id=${data}&type=1`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.data.menuResourceList;
            // console.log(data)
            data.forEach((item, index) => {
              item.active = false;
              if (item.children.length > 0) {
                item.children.forEach((item, index) => {
                  item.active = false;
                });
              }
            });
            VM.changArr({ val: data });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getName() {
      this.name = this.$route.query.name;
    },
    refresh(data, e) {
      // let now = document.getElementsByClassName("nowNow");
      // now = Array.from(now);
      // if (now.length > 0) {
      //   now.forEach((item, index) => {
      //     item.classList.remove("nowNow");
      //   });
      // }
      let now = $(".nowNow");
      now.removeClass('nowNow');
      let now1 = document.getElementsByClassName("title__now");
      now1 = Array.from(now1);
        if (now1.length > 0) {
          now1.forEach((item, index) => {
            item.classList.remove("title__now");
          });
        }
    },
    goTo(data) {
      let now = $(".nowNow");
      now.removeClass('nowNow');

      // let now = document.getElementsByClassName("nowNow");
      // now = Array.from(now);
      // if (now.length > 0) {
      //   now.forEach((item, index) => {
      //     item.classList.remove("nowNow");
      //   });
      // }

      // if (data.url == "data") {
      //   this.$router.push({ name: data.url });
      //   localStorage.setItem('homeKey', JSON.stringify(true));
      //   this.setKey();
      // }else{
      //   localStorage.setItem('homeKey', JSON.stringify(false));
      // }


      if (data.url == "home") {
        this.$router.push({ name: data.url });
        // localStorage.setItem('homeKey', JSON.stringify(true));
        // this.setKey();
      }else{
        localStorage.setItem('homeKey', JSON.stringify(false));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/navigation/navigation.scss";
</style>