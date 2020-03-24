<template>
  <div class="im-box">
    <el-dialog
      title="结束拍摄"
      :visible.sync="con"
      width="38%"
      center
      class="photoes"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="photoes__box" v-if="!showDedailt">
        
        <p class="photoes__subTitle">一正两侧拍摄已经完成</p>

        <div class=""  v-if="name == `yc`">
            <p class="photoes__reuslt" v-if="isSave">
          <span class="reuslt__w1">对比结果</span>
          <span class="reuslt__w2">被采集已存于人像库中</span>
          <span class="reuslt__w3" @click="goToDetail">查看详情</span>
        </p>
        <p class="photoes__reuslt" v-if="!isSave">
          <span class="reuslt__w4">对比结果</span>
          <span class="reuslt__w5">被采集人员非库中人员，将录入三维人像库</span>
        </p>
        </div>
       
        <div class="photoes__img">
          <div
            class="photoes__wrap"
            v-loading="loading.one"
            element-loading-text="正面照片生成中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <img
              :src="`data:image/png;base64,${photoes.front}`"
              alt
              class="photoes__item"
              v-if="photoes.front"
            />
            <img src="../../assets/img/img3/createFail.png" alt class="photoes__item2" v-if="photoes.frontFail" />
          </div>
          <div
            class="photoes__wrap"
            v-loading="loading.two"
            element-loading-text="左侧照片生成中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <img
              :src="`data:image/png;base64,${photoes.left}`"
              alt
              class="photoes__item"
              v-if="photoes.left"
            />
            <img src="../../assets/img/img3/createFail.png" alt class="photoes__item2" v-if="photoes.leftFail" />
          </div>
          <div
            class="photoes__wrap"
            v-loading="loading.three"
            element-loading-text="右侧照片生成中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <img
              :src="`data:image/png;base64,${photoes.right}`"
              alt
              class="photoes__item"
              v-if="photoes.right"
            />
            <img src="../../assets/img/img3/createFail.png" alt class="photoes__item2"  v-if="photoes.rightFail" />
          </div>
        </div>
        <p class="photoes__nav">
          <span class="photoes__nav__item">正面照片</span>
          <span class="photoes__nav__item">左侧照片</span>
          <span class="photoes__nav__item">右侧照片</span>
        </p>
      </div>
      <div class="detail__box" v-else>
        <div class="detail__img">
          <img :src="`${imgUrl}/${infoData.imageUrl}`" alt class="img" />
        </div>
        <div class="detail__left">
          <p class="item__box">
            <span class="name">姓名:</span>
            <el-tooltip class="item" effect="dark" :content="infoData.username" placement="top-start">
               <span class="name con">{{infoData.username}}</span>
            </el-tooltip>
            
          </p>
          <p class="item__box">
            <span class="sex">性别:</span>
            <span class="sex">{{infoData.sex}}</span>
          </p>
          <p class="item__box">
            <span class="collect">采集编号:</span>
            <span class="collect">{{infoData.collectNo}}</span>
          </p>
          <p class="item__box">
            <span class="idNo">证件号:</span>
            <span class="idNo">{{infoData.idNo}}</span>
          </p>
          <p class="item__box">
            <span class="time">采集时间:</span>
            <span class="time con" >{{ infoData.time }}</span>
           
          </p>
          <p class="item__box">
            <span class="time">采集单位:</span>
            <span class="time con">{{infoData.orgName}}</span>
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp"  v-if="!showDedailt">放弃</el-button>
        <el-button type="primary" @click="save"  v-if="!showDedailt">确认</el-button>
        <el-button @click="back"  v-if="showDedailt">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["con", "photoes", "loading", "name"],
  data() {
    return {
      data: "",
      noHas: false,
      showDedailt: false,
      imgUrl: "",
      isSave:false,//是否在库中
      infoData:{},
    };
  },
  created() {
    this.imgUrl = window.BASEURL.imgUrl; 
  },
  methods: {
    //是否生成一正两侧
    ms(data) {
      this.$message({
        message: `一正两侧${data}生成失败`,
        type: "warning",
        customClass: "zZindex"
      });
    },
    //获取信息
    getInfo(id) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/contrast/imageContrast?idNo=${id}`)
        .then(function(res) {
          if(res.status == 200 && res.data.code == 0){
                let data = res.data.result;
                console.log(data)
                if(data == null){ 
                  VM.isSave = false;
                }else{
                  VM.isSave = true;
                  VM.infoData = data;    
                }  
          }
        })
        .catch(function(error) {
          console.log(error);
      });
    },
    //确认上传图片
    save() {
      let VM = this;
      if (this.loading.three) {
        this.$message({
          message: "一正两侧还未生成,不能点击",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if(!this.photoes.front || !this.photoes.left ||!this.photoes.right){
          this.$message({
          message: "一正两侧生成失败，请重新采集！",
          type: "error",
          customClass: "zZindex"
        });
        return;
      }
      let params = {
        req: "close",
        data: [this.data],
        identifier: this.data.collectNo
      };
     
      if (VM.name == "yc") {
        this.$http.api
          .post(window.BASEURL.infoUrl + `camera_server/api/browser/v1`, params)
          .then(function(res) {
            //console.log(res.data);
            if (res.status === 200 && res.data.msg == "ok") {
              VM.$parent.photoesArr = {
                front: "",
                left: "",
                right: "",
                isCreate: true
              },
              VM.$parent.sure();
              VM.$parent.dialogKey = false;
            } else {
              VM.$message({
                message: `${res.data.data}`,
                type: "error",
                customClass: "zZindex"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (VM.name == "self") {
        this.$http.api
          .post(`http://${VM.$parent.takeUrl}/camera_server/api/browser/v1`, params)
          .then(function(res) {
            // console.log(res)
            if (res.status === 200 && res.data.msg == "ok") {
              VM.$parent.photoesArr = {
                front: "",
                left: "",
                right: "",
                isCreate: true
              },
              VM.$parent.reSetData();
              VM.$parent.dialogKey = false;
            } else {
               VM.$message({
                message: `${res.data.data}`,
                type: "error",
                customClass: "zZindex"
              });
            
            }
          })
          .catch(function(error) {
            
            console.log(error);
          });
      }
    },
    //放弃操作
    giveUp() {
      let key = window.confirm("确定要放弃？");
      if (!key) {
        return;
      }
      if (this.name == "yc") {
        this.$parent.sure();
        this.$parent.dialogKey = false;
      } else if (this.name == "self") {
        this.$parent.reSetData('giveUp');
        this.$parent.dialogKey = false;
      }
    },
    //查看详情
    goToDetail() {
      this.showDedailt = true;
    },
    //返回
    back() {
      this.showDedailt = false;
    }
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/func.scss";
.im-box {
  .photoes__box {
    .photoes__subTitle {
      font-size: 16px;
      margin: 0 auto;
      width: px2Rem(660px);
      color: #252a2a;
      // margin-bottom: px2Rem(10px);
    }
    .photoes__reuslt {
      height: px2Rem(36px);
      background: #f3f5fa;
      border-radius: 6px;
      width: px2Rem(660px);
      margin: px2Rem(15px) auto;
      display: flex;
      align-items: center;
      padding: 0 10px;
      .reuslt__w1 {
        font-size: 14px;
        color: #252a2a;
        font-weight: 700;
        margin-right: 20px;
      }
      .reuslt__w2 {
        font-size: 14px;
        color: #252a2a;
        margin-right: 20px;
      }
      .reuslt__w3 {
        font-size: 14px;
        color: #2761ea;
        text-decoration: underline;
        cursor: pointer;
      }
      .reuslt__w4 {
        font-size: 14px;
        color: #2761ea;
        font-weight: 700;
        margin-right: 20px;
      }
      .reuslt__w5 {
        font-size: 14px;
        color: #2761ea;
      }
    }
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    width: 100%;
    .photoes__img {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 15px;
      .photoes__wrap {
        width: px2Rem(200px);
        height: px2Rem(267px);
        background: #f8f8fb;
        border: 1px solid #e8eaf0;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        .photoes__item {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
        .photoes__item2 {
          width: px2Rem(58px);
          height: px2Rem(80px);
          border-radius: 6px;
        }
      }
    }
    .photoes__nav {
      display: flex;
      justify-content: space-around;
      width: 100%;
      .photoes__nav__item {
        display: inline-block;
        width: px2Rem(186px);
        text-align: center;
        font-size: 14px;
        color: #252a2a;
        margin-top: 14px;
      }
    }
  }
  .detail__box {
    padding: 0 40px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
       @media screen and (max-width:1366px){
                margin: 5px 0;
      }
    .detail__img {
      width: px2Rem(200px);
      height: px2Rem(267px);
      margin-right: 30px;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 5px 14px 2px rgba(0, 0, 0, 0.1);
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .detail__left {
      flex: 1;
      .item__box {
        color: #252a2a;
        font-size: 16px;
        margin-top: 8px;
        display: flex;
        align-items: center;
        &.item__box:nth-of-type(1) {
          margin-top: px2Rem(74px);
            @media screen and (max-width:1366px){
               margin-top:20px;
           }
        }
        .name {
          font-size: 23px;
          color: #252a2a;
          font-weight: 540;
          &.con{
             display: inline-block;
             max-width: px2Rem(350px);
             text-overflow: ellipsis;
             overflow: hidden;
             white-space: nowrap;
                @media screen and (max-width:1366px){
                 max-width: 150px;
            }


          }
        }
        .time{
          display: inline-block;
           width: 70px;
         
               &.con{
               display: inline-block;
               width: 350px;
              text-overflow: ellipsis;
             overflow: hidden;
             white-space: nowrap;
                @media screen and (max-width:1366px){
                 max-width: 150px;
            }


          }

        }
      }
    }
  }
}
</style>
