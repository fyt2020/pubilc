<template>
  <div class="model-img-war">
    <div class="model-img-box">
      <div class="model-item" v-for="(item,index) in userdata" :key="item.id+index" @click="goDetails(item)">
            <p class="tag-box">
                <span v-for="(v,i) in item.tag" :key="i" :class="['tag-item',{'two':item == '暴力'}]">{{v}}</span>
            </p>
            <img :src="`${imgUrl}/${item.imageUrl}`" alt="" class="model-item-img">
            <p class="username">{{item.username}}</p>
            <p>
                <span class="orgName">采集机构:</span>
                <span class="orgName">{{item.orgName}}</span>
            </p>
      </div>
    </div>
    <div class="slot-box">
      <el-pagination
        class="slot"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="con.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
export default {
  props: ["con"],
  data() {
    return {
      tag:['暴力','偷盗'],
      currentPage: 1,
      pagesize: 6,
      imgUrl:'',
    };
  },
  computed: {
    userdata: function() {
      return this.con.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  created() {
    this.imgUrl = window.BASEURL.imgUrl;
      // console.log(this.con)
  },
  mounted() {},
  watch: {},
  methods: {
    //改变每页显示条数
    handleSizeChange(size) {
      this.pagesize = size;
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //  console.log(this.userdata)
    },
    goDetails(data){
       
       this.$router.push({name:'faceDetalis',query:{id:data.id,path:data.modelPath}})
     
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/modelImg/modelImg.scss";
</style>
