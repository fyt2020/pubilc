<template>
  <div class="faceDBdetail__wrapper">
    <div class="faceDBdetail__nav">
      <m-crums :con="crumsData" />
      <div class="shoot-inp">
        <div class="inp-con">
          <label for="one">
            <span class="must">姓名:</span>
            <span class="must">{{formData.username}}</span>
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">性别:</span>
            <span class="must name">{{formData.sex}}</span>
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">人脸库:</span>
            <span class="must name">{{formData.libName}}</span>
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">入库时间:</span>
            <span class="must">{{formData.time}}</span>
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">所属:</span>
            <span class="must name">{{formData.belong}}</span>
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">标签:</span>
            <span class="must">{{formData.tag.join(',')}}</span>
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">证件类型:</span>
            <span class="must">{{formData.type == 0 ? "身份证" :'护照'}}</span>
          </label>
        </div>

        <div class="inp-con">
          <label for="one">
            <span class="must">证件号:</span>
            <span class="must">{{formData.idNo}}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="faceDBdetail__content">
      <div class="faceDBdetail__title">
        人脸照片
        <span class="sub">
          共
          <span class="sub__num">{{ uploadList.length || modelList }}</span>张
        </span>
      </div>
      <div class="base__box img">
        <div :class="['img__wrap']" v-if="uploadList.length > 0">
          <div class="img__boxImg" v-for="(item,index) in uploadList" :key="index">
            <img :src="item.url" alt class="img__item" />
          </div>
        </div>
        <div :class="['img__wrap']" v-else @mousewheel="imgScroll" id="imgWrap">
          <div class="img__box" v-for="(item,index) in showImgList" :key="index">
            <img src alt class="modelImg__item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import { mapState, mapMutations } from "vuex";
import jsZip from "jszip";
export default {
  props: {},
  data() {
    return {
      crumsData: {
        one: "三维人像应用",
        two: "人脸库",
        thr: "...",
        four: "人脸详情",
        pathGP: "faceChar",
        pathP: "faceDB",
        id: "",
        now: 2
      },
      id: "",
      formData: {
        belong: "所属",
        flag: 0,
        createTime: 1575556250953,
        sex: "性别",
        collectNo: "采集编号",
        description: "描述",
        updateTime: 1575556250953,
        id: 9,
        tag: [],
        source: 0,
        username: "名称6",
        status: 0
      },
      uploadList: [], //图片导入的总图片
      modelList: 0, //图片导入的总数量
      showImgList: [], //展示
      start: 24,
      end: 0,
      getImgKey: false,
      imgAddress: "",
      imgName: "",

      nameArr1: [], //模型上传的img名数组

      wrapHeight1: 550,
      wrapHeight2: 560,
      img__wrap: null
    };
  },
  computed: {},
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.crumsData.id = this.$route.params.fid;
      this.crumsData.thr = this.$route.params.name;
    } else {
      let data = JSON.parse(localStorage.getItem("personId"));
      this.id = data.id;
      this.crumsData.id = data.fid;
      this.crumsData.thr = data.name;
    }
    this.getPeInfoById(this.id);
  },
  mounted() {
    this.img__wrap = document.getElementById("imgWrap");
  },

  methods: {
    imgScroll(e) {
      // let scrollTop ,scrollHeight;
      // scrollTop = this.img__wrap.scrollTop;
      // scrollHeight = this.img__wrap.scrollHeight;
      // let scroll  =  scrollTop + this.wrapHeight1 - scrollHeight;
      // let newArr = [];
      // if(scroll > -1250){
      //     if(this.getImgKey){
      //         return
      //     }
      //     this.getImgKey = true;
      //     this.end = this.start + 24;
      //     console.log('start',this.start)
      //     console.log('end',this.end)
      //     newArr = this.showImgList.slice(this.start, this.end );
      //     console.log(newArr)
      //     newArr.forEach((ele,index)=>{
      //          this.getUploadImgM(this.imgAddress,ele,index+this.start,'more')
      //     })
      // }
    },
    //获取该人的信息
    getPeInfoById(data) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/face/${data}`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;
            // console.log(data)
            VM.formData = data;
            VM.imgAddress = data.collectNo;
            VM.getName(VM.imgAddress, data.source);
          }else{
            VM.$Message.error("获取该人的信息失败!");             
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取文件名
    getName(data, source) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.oss + `${data}_cap/`, {
          headers: {
            "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
            "Content-Type": "text/plain;charset=utf-8"
          },
          responseType: "text/json"
        })
        .then(function(res) {
          if (res.status === 200 && res.data.code == 0) {
            if (source == 0) {
              VM.nameArr1 = res.data.split(/[\s\n]/).filter(item => {
                return item;
              });
              VM.modelList = VM.nameArr1.length;
              if (VM.nameArr1.length > 24) {
                //如果图片多于24张
                VM.showImgList = VM.nameArr1;
                VM.showImgList.forEach((ele, index) => {
                  if (ele) {
                    VM.getUploadImgM(data, ele, index);
                  }
                });
              }
            } else if (source == 1) {
              VM.imgName = res.data;
              VM.getUploadImg(data, VM.imgName);
            }
          }else{
              VM.$Message.error("获取文件地址失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //解压图片导入图片
    getUploadImg(data, name) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.oss + `${data}_cap/${name}`, {
          headers: {
            "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
            "Content-Type": "text/plain;charset=utf-8"
          },
          timeout: 40000,
          responseType: "arraybuffer"
        })
        .then(function(res) {
          if (res.status === 200) {
            console.log("解压成功");
            let file = res.data;
            let Zip = new jsZip();
            Zip.loadAsync(file)
              .then(function(zip) {
                zip.forEach(function(relativePath, zipEntry) {
                  if (zipEntry.name == `${zipEntry.name.split("/")[0]}/`)
                    return;
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      let obj = {
                        name: zipEntry.name,
                        url: "data:image/jpeg;base64," + content
                      };
                      VM.uploadList.push(obj);
                    });
                });
                return VM.uploadList;
              })
              .then(function(res) {
                if (res.length > 18) {
                  //VM.showImgList = res.slice(0,18)
                } else {
                  // VM.showImgList = res
                }
              });
          } else {
            VM.$Message.error("解压失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //解压模型导入图片
    getUploadImgM(data, name, index, type) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.oss + `${data}_cap/${name}`, {
          headers: { "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a" },
          timeout: 40000,
          responseType: "blob"
        })
        .then(function(res) {
          if (res.status === 200 && res.data.code == 0) {
            if (type == "more") {
              VM.getImgKey = false;
              VM.start = VM.start + 24;
            }
            let img = document.getElementsByClassName("modelImg__item")[index];
            img.onload = function(e) {
              window.URL.revokeObjectURL(img.src);
            };
            img.src = window.URL.createObjectURL(res.data);
          } else {
            VM.$Message.error("解压失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查看更多
    wachMore() {
      if (this.watchMore) {
        this.$Message.error(`没有更多图片`);
        return;
      }
      this.watchMore = true;
      //  let start,end;
      //  let arr = [];
      //  if(this.uploadList.length <= 18 || start >= end){
      //       this.$Message.error(`没有更多图片`);
      //       return
      //  }
      //  start = 19;
      //  end = this.uploadList.length;
      //  arr = this.uploadList.slice(start,start+18);
      //  start = start + 18;
      //  this.showImgList = this.showImgList.concat(arr)
    }
  },
  components: {
    MCrums
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumUse/faceDBdetail.scss";
</style>
