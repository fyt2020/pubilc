<template>
  <div class="screen" v-if="con.key">
    <div class="screen__title">人脸库</div>
    <div class="screen__boby">
      <CheckboxGroup v-model="choseData" class="screen__checkGroup" @on-change="changeAll">
        <Checkbox
          border
          :label="item.id"
          v-for="(item,index) in faceChar"
          :key="index"
          class="screen__box"
        >
          <span>{{item.libName}}</span>
        </Checkbox>
      </CheckboxGroup>
    </div>
    <div class="screen__footer">
      <el-button @click="reset" class="dialogBtn">重置</el-button>
      <el-button type="primary" @click="sure">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["con"],
  data() {
    return {
      faceChar: [
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 100,
          libName: "测试1_王强测试1_王强",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 101,
          libName: "测试2_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 102,
          libName: "测试0_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 103,
          libName: "测试3_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 104,
          libName: "测试4_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 105,
          libName: "测试5_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 106,
          libName: "测试6_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 107,
          libName: "测试7_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        },
        {
          createTime: 1582893255549,
          description: "",
          faceTime: 1583485823592,
          faceUpdateTime: "2020-03-06 17:10",
          flag: 0,
          id: 108,
          libName: "测试8_杨刚",
          personNum: 3,
          status: 0,
          updateTime: 1582893255549
        }
      ],
      choseData: []
    };
  },
  computed: {},
  created() {},
  methods: {
    /**
     * @Author fyt
     * @Description
     * @Date 2020-03-11 14:07:57 星期三
     */
    changeAll(data) {
      this.choseData = data;
    },
    /**
     * @Author fyt
     * @Description 获取人脸库
     * @Date 2020-03-11 13:39:47 星期三
     */

    getLibrary() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/faceLibrary`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            if (data && data.length > 0) {
              VM.faceChar = data;
            } else {
              VM.faceChar = [];
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /**
     * @Author fyt
     * @Description 重置
     * @Date 2020-03-11 12:38:43 星期三
     */
    reset() {
      this.choseData = [];
      // this.faceChar = [];
    },

    /**
     * @Author fyt
     * @Description 确定
     * @Date 2020-03-11 12:38:45 星期三
     */
    sure() {
      let VM = this;
      let str = "";
      if(this.choseData.length == 0){
         VM.$Message.error(`所选人脸库不能为空！`);
         return
      }
      if (this.choseData.length > 1) {
        str = this.choseData.join(",");
      } else if (this.choseData.length == 1) {
        str = this.choseData[0];
      }
      switch (this.con.form) {
        case "image":
          console.log("image");
          this.$parent.screenByLibs(str);
          break;
        case "video":
          console.log("video");
          this.$parent.screenByLibs(str);
          break;
        default:
          console.log("no form");
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/func.scss";
.screen {
  position: absolute;
  right: 10px;
  top: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(112, 46, 46, 0.1);
  box-sizing: border-box;
  padding: 15px 20px;
  z-index: 2000;
  width: px2Rem(520px);
  .screen__title {
    width: 100%;
    line-height: 27px;
    font-size: 18px;
    color: #000;
    font-weight: 600;
  }
  .screen__boby {
    margin: 10px 0 20px 0;
    width: 100%;
    max-height: 350px;
    overflow-y: auto;
  }
  .screen__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
