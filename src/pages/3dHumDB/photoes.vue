<template>
  <div class="fDetalis-content-thr">
    <div class="cen-box">
      <div
        class="img-box"
        :style="{backgroundImage:`url(${cenPath}) `,backgroundSize:`100% 100%`}"
        v-if="source == '0'"
      ></div>
      <div
        class="img-box"
        :style="{backgroundImage:`url(${cenPath15}) `,backgroundSize:`100% 100%`}"
        v-if="source == '1'"
      ></div>
      <div class="img-box" v-for="(item,index) in photo1" :key="item">
        <img :src="item" alt />
        <p class="cencen" v-if="source == '0'">
          <!-- <span class="cir"></span> -->
          正面—{{index+1}}号摄像头
        </p>
        <p class="cencen" v-if="source == '1'">
          <!-- <span class="cir"></span> -->
          {{index+1}}号摄像头
        </p>
      </div>
    </div>
    <div class="left-box" v-show="source == '0'">
      <div
        class="img-box"
        :style="{backgroundImage:`url(${leftPath}) `,backgroundSize:`100% 100%`}"
      ></div>
      <div class="img-box" v-for="(item,index) in photo2" :key="item">
        <img :src="item" alt />
        <p class="cencen">
          <!-- <span class="cir"></span> -->
          左面—{{index+1}}号摄像头
        </p>
      </div>
    </div>
    <div class="right-box" v-show="source == '0'">
      <div
        class="img-box"
        :style="{backgroundImage:`url(${rightPath2}) `,backgroundSize:`100% 100%`}"
      ></div>
      <div class="img-box" v-for="(item,index) in photo3" :key="item">
        <img :src="item" alt />
        <p class="cencen">
          <!-- <span class="cir"></span> -->
          右面—{{index+1}}号摄像头
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as URL from "@/plugins/env.js";
import jsZip from "jszip";
export default {
  data() {
    return {
      id: "",
      cenPath: require("@/assets/img/cen.png"),
      cenPath15: require("@/assets/img/cen15.png"),
      leftPath: require("@/assets/img/leftOne.png"),
      rightPath2: require("@/assets/img/rightOne.png"),
      photo1: [],
      photo2: [],
      photo3: [],
      modelDetalis: {},
      status: "",
      source: ""
    };
  },
  computed: {},
  created() {
    if (!this.$route.params.id) {
      this.id = JSON.parse(localStorage.getItem("id"));
    } else {
      this.id = this.$route.params.id;
    }
    this.getAllImg(this.id);
    this.getStatus();
  },
  beforeDestroy() {
    this.photo1 = this.photo2 = this.photo3 = [];
    this.modelDetalis = {};
    this.status = "";
    this.source = "";
  },

  methods: {
    
    getStatus() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/tasks/${this.id}`)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.modelDetalis = res.data.result.result;
            VM.status = VM.modelDetalis.status;
            VM.source = VM.modelDetalis.source;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     //解压图片
    getAllImg(data) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.oss + `${data}_data/snap_${data}.zip`, {
          headers: {
            "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
            "Content-Type": "text/plain;charset=utf-8"
          },
          timeout: 0,
          responseType: "arraybuffer"
        })
        .then(function(res) {
          if (res.status === 200) {
            let file = res.data;
            let Zip = new jsZip();
            Zip.loadAsync(file).then(function(zip) {
              // console.log(zip.forEach);
              zip.forEach(function(relativePath, zipEntry) {
                console.log(zipEntry.name.indexOf("images/"));
                if (
                  zipEntry.name == "images/" ||
                  zipEntry.name == "images-2/" ||
                  zipEntry.name == "images-3/" ||
                  zipEntry.name == "info.txt" ||
                  zipEntry.name == "output/"
                )
                  return;
                if (zipEntry.name.indexOf("images/") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.photo1.push("data:image/jpeg;base64," + content);
                    });
                }
                if (zipEntry.name.indexOf("images-2/") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.photo2.push("data:image/jpeg;base64," + content);
                    });
                }
                if (zipEntry.name.indexOf("images-3/") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.photo3.push("data:image/jpeg;base64," + content);
                    });
                }
              });
            });
          } else {
            VM.$Message.error(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          VM.$Message.error(`not found`);
          console.log(error);
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/func.scss";
.fDetalis-content-thr {
  width: 100%;
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  height: px2Rem(510px);
  overflow-y: auto;
  @media screen and (max-width: 1366px) {
    height: 335px;
  }
  @media screen and (max-width: 1280px) {
    height: 550px;
  }
  .cen-box {
    display: flex;
    flex-wrap: wrap;
    .img-box {
      width: px2Rem(186px);
      height: px2Rem(330px);
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      border-radius: 6px;
      @media screen and (max-width: 1280px) {
        margin-right: 25px;
        margin-bottom: 25px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      .cencen {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: px2Rem(14px);
        background: rgba(0, 0, 0, 0.4);
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        color: #fff;
        .cir {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #5f8ffd;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: px2Rem(10px);
        }
      }
    }
  }
  .left-box {
    display: flex;
    flex-wrap: wrap;
    .img-box {
      width: px2Rem(186px);
      height: px2Rem(330px);
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      border-radius: 6px;
      @media screen and (max-width: 1280px) {
        margin-right: 25px;
        margin-bottom: 25px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      .cencen {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: px2Rem(14px);
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        .cir {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #5f8ffd;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: px2Rem(10px);
        }
      }
    }
  }

  .right-box {
    display: flex;
    flex-wrap: wrap;
    .img-box {
      width: px2Rem(186px);
      height: px2Rem(330px);
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;
      border-radius: 6px;
      @media screen and (max-width: 1280px) {
        margin-right: 25px;
        margin-bottom: 25px;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
      .cencen {
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: px2Rem(14px);
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        .cir {
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #5f8ffd;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: px2Rem(10px);
        }
      }
    }
  }
}

.fDetalis-content-thr::-webkit-scrollbar {
  width: 8px;
  height: 2px;
  position: absolute;
  right: -10px;
  top: -10px;
}
/*正常情况下滑块的样式*/

.fDetalis-content-thr::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.fDetalis-content-thr:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.fDetalis-content-thr::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/

.fDetalis-content-thr::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
}
/*鼠标悬浮在滚动条上的主干部分*/

.fDetalis-content-thr::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
