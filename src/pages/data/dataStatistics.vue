<template>
  <div class="data__warp">
    <div class="data__con">
      <div class="left">
        <div class="data__seclet">
          <p class="seclet__title">区域三维人像采集量</p>
          <div class="seclet__con">
            <div class="con__left">
              <span class="seclet__org">采集单位</span>
              <input type="text" v-model="newArea" class="seclet__inp" readonly />
              <el-select class="data" v-model="area" placeholder="全部" filterable>
                <el-option
                  @click.native="selectArea(item)"
                  v-for="(item,index) in options3"
                  :key="index"
                  :value="item.area"
                ></el-option>
              </el-select>
              <el-select
                class="data"
                v-model="fromData.orgName"
                placeholder="全部"
                filterable
                v-if="orgShowKey"
              >
                <el-option
                  @click.native="selectOrg(item)"
                  v-for="(item,index) in options1"
                  :key="index"
                  :value="item.orgName"
                ></el-option>
              </el-select>
            </div>
            <div class="con__right">
              <span
                :class="['day',{'active':item.active},{'day__one':index == 0}]"
                @click="choseTime(index)"
                v-for="(item,index) in dayArr"
                :key="index"
              >{{item.name}}</span>
              <DatePicker
                type="daterange"
                :options="options2"
                placement="bottom-end"
                placeholder
                class="data__picker"
                v-model="dateVal"
                @on-change="dataChange($event)"
              ></DatePicker>
              <button class="outBtn" @click="exportExcel" v-if="power[5022]"></button>
            </div>
          </div>

          <div class="data__table1">
            <span v-if="hasNo" class="hasNo">暂无采集数据</span>
            <div id="demo3"></div>
          </div>
        </div>
        <div class="data__table2">
          <div class="table2__left">
            <p class="left__title">
              建模成功数
              <span class="title1">上海市</span>
            </p>
            <div id="demo1"></div>
          </div>
          <div class="table2__right">
            <p class="right__title">
              采集区域占比(上海市)
              <span class="right__day">近15天</span>
            </p>
            <div class="demo2__con">
              <div id="demo2"></div>
              <div class="demo2__conR">
                <div class="conR_one">
                  <p class="conR_area">{{AreaObj1.area}}</p>
                  <p class="conR_pass">
                    <span class="conR_logo1" v-show="AreaObj1.percentum"></span>
                    <span class="conR_num" v-show="AreaObj1.percentum">{{AreaObj1.percentum}}%</span>
                  </p>
                </div>
                <div class="conR_one">
                  <p class="conR_area">{{AreaObj2.area}}</p>
                  <p class="conR_pass">
                    <span class="conR_logo1 two" v-show="AreaObj2.percentum"></span>
                    <span class="conR_num" v-show="AreaObj2.percentum">{{AreaObj2.percentum}}%</span>
                  </p>
                </div>
                <div class="conR_one">
                  <p class="conR_area">{{AreaObj3.area}}</p>
                  <p class="conR_pass">
                    <span class="conR_logo1 thr" v-show="AreaObj3.percentum"></span>
                    <span class="conR_num" v-show="AreaObj3.percentum">{{AreaObj3.percentum}}%</span>
                  </p>
                </div>

                <div class="conR_one">
                  <p class="conR_area">{{AreaObj4.area}}</p>
                  <p class="conR_pass">
                    <span class="conR_logo1 other" v-show="AreaObj4.percentum"></span>
                    <span class="conR_num" v-show="AreaObj4.percentum">{{AreaObj4.percentum}}%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="collect__box">
          <div class="collect__boxTop">
            <img src="../../assets/img/newUp.png" alt class="img" />
            <!-- <img src="../../assets/img/newDown.png" alt class="img" v-if="rightData.keyOne1" />
            <img src="../../assets/img/newUp.png" alt class="img" v-if="rightData.keyThr1" />-->
            <p class="collect__boxNum">{{rightData.dayCollectionNum.num}}</p>
            <p class="collect__boxW">今日总采集量</p>
          </div>
          <div class="collect__boxBot">
            <div class="collect__boxBotL">
              <p class="collect__w">本周采集总数</p>
              <div>
                <span>{{rightData.weekRise.num}}</span>
                <!-- <img src="../../assets/img/bbss.png" alt class="img" v-if="rightData.keyTwo" />
                <img src="../../assets/img/tbxj.png" alt class="img" v-if="rightData.keyOne" />
                <img src="../../assets/img/tbbb.png" alt class="img" v-if="rightData.keyThr" />-->
              </div>
            </div>
            <div class="collect__boxBotL">
              <p class="collect__w">昨日采集总数</p>
              <div>
                <span>{{rightData.dayRise.num}}</span>
                <!-- <img src="../../assets/img/bbss.png" alt class="img" v-if="rightData.keyTwo1 " />
                <img src="../../assets/img/tbxj.png" alt class="img" v-if=" rightData.keyOne1" />
                <img src="../../assets/img/tbbb.png" alt class="img" v-if="rightData.keyThr1" />-->
              </div>
            </div>
          </div>
          <div class="collect__num">
            <div class="num__left">
              <p class="num__num">{{rightData.modelNum.num}}</p>
              <p class="num__text">三维人像数量</p>
              <!-- <img src="../../assets/img/fnum.png" alt class="img" /> -->
            </div>
            <div class="num__mid">
              <p class="num__num">{{rightData.CollectionTotal.num}}</p>
              <p class="num__text">累计采集量</p>
              <!-- <img src="../../assets/img/cnum.png" alt class="img" /> -->
            </div>
            <div class="num__right">
              <p class="num__num">{{rightData.CollectionAvg.num}}</p>
              <p class="num__text">日均采集量(本月)</p>
              <img src="../../assets/img/Rightpic.png" alt class="img" />
            </div>
          </div>
        </div>
        <div class="collect_speed">
          <p class="speed__title">建模进度</p>
          <img
            src="../../assets/img/img3/nodemodel.png"
            alt
            class="speed__img"
            v-if="speedData.length == 0"
          />
          <ul class="speed__box">
            <li class="speed__item" v-for="(item,index) in speedData" :key="index">
              <span class="logo"></span>
              <span class="speed__name">{{item.name}}</span>
              <span class="speed__status">{{item.status}}</span>
              <span class="speed__add">{{item.address}}</span>
              <span class="speed__timeY">{{item.dateY}}</span>
              <span class="speed__time">{{item.date}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      now:false,
      webSocket: "",
      sliderKey: false, //半年时出现滚动条
      newArea: "上海市",
      //newArea: "无锡市",
      fromData: {
        startTime: "",
        endTime: "",
        area: "",
        orgId: "",
        mStartTime: "",
        mEndTime: "",
        rStartTime: "",
        rEndTime: "",
        orgName: ""
      },
      hasNo: false,
      xData: [],
      XData: [],
      yData: [],
      oldArea: "上海市",
      area: "",
      dateVal: "",
      nowDate: "",
      orgShowKey: false,
      rightData: {
        dayCollectionNum: "",
        CollectionTotal: "",
        CollectionAvg: "",
        modelNum: "",
        weekRise: "",
        dayRise: "",
        keyOne: false,
        keyTwo: false,
        keyThr: false,
        keyOne1: false,
        keyTwo1: false,
        keyThr1: false
      },
      speedData: [],
      modelingNum: [],
      CollectionAreaNum: [],
      AreaObj1: {
        area: "",
        percentum: ""
      },
      AreaObj2: {
        area: "",
        percentum: ""
      },
      AreaObj3: {
        area: "",
        percentum: ""
      },
      AreaObj4: {
        area: "",
        percentum: ""
      },
      dayArr: [
        {
          name: "日",
          active: true
        },
        {
          name: "近一周",
          active: false
        },
        {
          name: "近半月",
          active: false
        },
        {
          name: "近半年",
          active: false
        }
      ],
      options3: [],
      options2: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: "1 week",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 month",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3 months",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      options1: []
    };
  },
  computed: {

        ...mapState(["power"])
  },
  created() {
    this.getPower();
    this.getArea();
    this.getHistoryData();
    this.initSocket(window.BASEURL.testUrl1);
    this.dateVal = [new Date(), new Date()];
  },
  mounted() {
    this.getCollectionLeft();
    this.getCollectionData();
    this.getCollectionTrendL();
    this.getCollectionTrendR();
    this.now = true;
    if(this.now){
         window.addEventListener("resize", this.resizefun);
         this.resizefun = () => {
         this.$echarts.init(document.getElementById("demo1")).resize();
         this.$echarts.init(document.getElementById("demo2")).resize();
         this.$echarts.init(document.getElementById("demo3")).resize();
      };
    }
    //图标自适应
  },

  methods: {

       ...mapMutations(["set_power"]),

    /**
     * @Author fyt
     * @Description 获取权限
     * @Date 2020-03-17 10:18:25 星期二
     */
    getPower() {
      let VM = this;
      let resourceList = new Map();
      let roleId = JSON.parse(window.sessionStorage.getItem("token")).roleId;

      if (roleId) {
        this.$http.api
          .get(
            window.BASEURL.roleUrl +
              `/yyqxzx/api/v1/permissions?id=${roleId}&type=2`
          )
          .then(function(res) {
            if (res.data.code === 0) {
              let data = res.data.result.data;
              if (data.resourceList && data.resourceList.length > 0) {
                data.resourceList.forEach(item => {
                 let key = item.checked * 1 == 1;
                 resourceList[item.id] = key;
                });
              }
              VM.set_power({ val: resourceList });
               console.log(VM.power[5001])
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        throw new Error("roleId");
      }
    },

    //历史数据
    getHistoryData() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/message?pageNum=1&pageSize=5`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.code == 0) {
            let data = res.data.result.list;
            data.forEach((item, index) => {
              let msgInfo = item.msgInfo;
              let newArr = msgInfo.split(" ");
              let obj = {};
              obj.name = `${newArr[0]}`;
              obj.status = `${newArr[1]}`;
              obj.address = `${newArr[2]}`;
              obj.dateY = `${newArr[3]}`;
              obj.date = `${newArr[4]}`;
              VM.speedData.push(obj);
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择区域
    selectArea(data) {
      let inp = $(".ivu-input");
      let start = new Date();
      let end = new Date();
      start = new Date(new Date(new Date().toLocaleDateString()).getTime());
      this.dateVal = [start, end];
      $("#demo3")
        .removeAttr("_echarts_instance_")
        .empty();
      if (data.area == "全部") {
        this.hasNo = false;
        this.fromData.orgId = "";
        this.fromData.startTime = "";
        this.fromData.endTime = "";
        this.fromData.area = "";
        this.sliderKey = false;
        this.dayArr[0].active = true;
        this.dayArr[1].active = false;
        this.dayArr[2].active = false;
        this.dayArr[3].active = false;
        this.options1 = [];
        this.fromData.orgName = "";
        this.orgShowKey = false;

        this.getCollectionLeft();
      } else {
        let area = `${this.oldArea} ${data.area}`;
        // this.dateVal = "";
        // inp.val("");
        this.sliderKey = false;
        this.dayArr[0].active = true;
        this.dayArr[1].active = false;
        this.dayArr[2].active = false;
        this.dayArr[3].active = false;

        this.fromData.orgId = "";
        this.fromData.startTime = "";
        this.fromData.endTime = "";
        this.fromData.orgName = "";
        this.fromData.area = area;
        this.collectionLeftByArea(area);
        this.getOrgByArea(area);
      }
    },
    //选择派出所
    selectOrg(data) {
      //  console.log(data);
      $("#demo3")
        .removeAttr("_echarts_instance_")
        .empty();
      this.fromData.orgId = data.orgId;
      this.fromData.orgName = data.orgName;
      this.dayArr[0].active = false;
      this.dayArr[1].active = false;
      this.dayArr[2].active = true;
      this.dayArr[3].active = false;
      let start, end;
      start = new Date();
      end = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
      this.dateVal = [start, end];
      this.fromData.startTime = start.getTime();
      this.fromData.endTime = end.getTime();
      this.getCollectionLeft();
    },
    //根据区获取派出所
    getOrgByArea(data) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/all?area=${data}`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.code == 0) {
            let data = res.data.result.datas;
            let obj = {
              orgId: "",
              orgName: "全部"
            };
            data.unshift(obj);
            VM.options1 = data;
            // console.log(data)
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //根据区域获取柱状图数据
    collectionLeftByArea(data) {
      let VM = this;
      VM.xData = [];
      VM.yData = [];
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/collectionTrend?area=${data}`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "SUCCESS") {
            VM.orgShowKey = true;
            let data = res.data.result[0].orgCollectNum;
            console.log(data);
            if (data.length < 1) {
              VM.hasNo = true;
              VM.options1 = [];
              VM.xData = [];
              VM.yData = [];
              VM.fromData.orgName = "";
              VM.orgShowKey = false;
              VM.createEcharts3(VM.xData, VM.yData);
            } else {
              VM.hasNo = false;
              data.forEach((item, index) => {
                VM.xData.push(item.orgName);
                VM.yData.push(item.num);
              });
              VM.createEcharts3(VM.xData, VM.yData);
            }
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //监听时间改变
    dataChange(e) {
      let len = this.dateVal.length;
      if (this.dateVal[0] == "" || this.dateVal[1] == "") {
        this.getCollectionLeft();
        return;
      }
      $("#demo3")
        .removeAttr("_echarts_instance_")
        .empty();
      let start = this.dateVal[0];
      let end = this.dateVal[1];

      let startS = this.dateVal[0].getTime();
      let endS = this.dateVal[1].getTime();

      let nowday = new Date().getDate();
      let choseDayStart = this.dateVal[0].getDate();
      let choseDayEnd = this.dateVal[1].getDate();

      if (nowday == choseDayStart && choseDayStart == choseDayEnd) {
        console.log(1);
        let st = new Date(new Date(new Date().toLocaleDateString()).getTime());
        this.fromData.startTime = st.getTime();
        this.fromData.endTime = new Date().getTime();
        console.log(new Date(this.fromData.startTime));
        console.log(new Date(this.fromData.endTime));
      } else if (nowday != choseDayStart && choseDayEnd == nowday) {
        console.log(2);
        let day = Math.floor((endS - startS) / 86400000);
        let st = new Date();
        st = st.getTime() - 3600 * 1000 * 24 * day;
        let newSt = new Date(st).setHours(0, 0, 0, 0);
        this.fromData.startTime = new Date(newSt).getTime();
        this.fromData.endTime = new Date().getTime();
        console.log(new Date(this.fromData.startTime));
        console.log(new Date(this.fromData.endTime));
      } else {
        if (startS == endS) {
          console.log(31);
          this.fromData.startTime = startS;
          this.fromData.endTime = startS + (3600 * 1000 * 24 - 1000);
          console.log(new Date(this.fromData.startTime));
          console.log(new Date(this.fromData.endTime));
        } else {
          console.log(32);
          this.fromData.startTime = startS;
          this.fromData.endTime = endS + (3600 * 1000 * 24 - 1000);
          console.log(new Date(this.fromData.startTime));
          console.log(new Date(this.fromData.endTime));
        }
      }
      this.dayArr[0].active = false;
      this.dayArr[1].active = false;
      this.dayArr[2].active = false;
      this.dayArr[3].active = false;
      this.getCollectionLeft();
    },
    //选择时间
    choseTime(data) {
      $("#demo3")
        .removeAttr("_echarts_instance_")
        .empty();
      let start, end;
      this.dayArr[data].active = true;
      this.dayArr.forEach((item, index) => {
        if (index != data) {
          item.active = false;
        }
      });

      switch (this.dayArr[data].name) {
        case "日":
          let str = "";
          start = new Date();
          end = new Date();
          start = new Date(new Date(new Date().toLocaleDateString()).getTime());
          this.fromData.startTime = start.getTime();
          this.fromData.endTime = end.getTime();
          console.log(new Date(this.fromData.startTime));
          console.log(new Date(this.fromData.endTime));
          this.dateVal = [start, end];
          this.getCollectionLeft();
          break;
        case "近一周":
          start = new Date();
          end = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
          start.setHours(0, 0, 0, 0);

          this.fromData.startTime = start.getTime();
          this.fromData.endTime = end.getTime();
          console.log(new Date(this.fromData.startTime));
          console.log(new Date(this.fromData.endTime));
          this.dateVal = [start, end];
          this.getCollectionLeft();
          break;

        case "近半月":
          start = new Date();
          end = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
          start.setHours(0, 0, 0, 0);
          this.fromData.startTime = start.getTime();
          this.fromData.endTime = end.getTime();
          console.log(new Date(this.fromData.startTime));
          console.log(new Date(this.fromData.endTime));
          this.dateVal = [start, end];
          this.getCollectionLeft();
          break;

        case "近半年":
          start = new Date();
          end = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
          start.setHours(0, 0, 0, 0);
          this.dateVal = [start, end];
          this.fromData.startTime = start.getTime();
          this.fromData.endTime = end.getTime();
          console.log(new Date(this.fromData.startTime));
          console.log(new Date(this.fromData.endTime));
          this.getCollectionLeft();
          break;
      }
    },
    //左上柱状图数据
    getCollectionLeft() {
      let VM = this;
      VM.xData = [];
      VM.yData = [];
      VM.XData = [];
      let TYPE;
      if (
        this.fromData.area &&
        this.fromData.orgId &&
        this.fromData.startTime &&
        this.fromData.endTime
      ) {
        TYPE = "time";
      } else if (this.fromData.area && this.fromData.orgId) {
        TYPE = "org";
      } else if (
        this.fromData.area &&
        this.fromData.startTime &&
        this.fromData.endTime
      ) {
        TYPE = "area";
      } else {
        // let start = new Date();
        // let end = new Date();
        // start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        // this.fromData.startTime = start.getTime();
        // this.fromData.endTime = end.getTime();
      }

      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/collectionTrend?startTime=${this.fromData.startTime}&endTime=${this.fromData.endTime}&area=${this.fromData.area}&orgId=${this.fromData.orgId}&mStartTime=${this.fromData.mStartTime}&mEndTime=${this.fromData.mEndTime}&rStartTime=${this.fromData.rStartTime}&rEndTime=${this.fromData.rEndTime}`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "SUCCESS") {
            let data = res.data.result[0].orgCollectNum;

            switch (TYPE) {
              case "org":
                data.forEach((item, index) => {
                  let str = item.date.split("-");
                  VM.XData.push(item.date);
                  VM.xData.push(`${str[1]}/${str[2]}`);
                  VM.yData.push(item.num);
                });
                break;
              case "area":
                data.forEach((item, index) => {
                  VM.xData.push(item.orgName);
                  VM.yData.push(item.num);
                });
                break;
              case "time":
                data.forEach((item, index) => {
                  let str = item.date.split("-");
                  VM.XData.push(item.date);
                  VM.xData.push(`${str[1]}/${str[2]}`);
                  VM.yData.push(item.num);
                });
                break;
              case undefined:
                data.forEach((item, index) => {
                  VM.xData.push(item.area);
                  VM.yData.push(item.num);
                });
                break;
            }
            VM.createEcharts3(VM.xData, VM.yData);
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //右侧采集数据
    getCollectionData() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/collectionData`)
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "SUCCESS") {
            let data = res.data.result;

            VM.rightData.dayCollectionNum = data[0].dayCollectionNum;
            VM.rightData.CollectionTotal = data[1].CollectionTotal;
            VM.rightData.CollectionAvg = data[2].CollectionAvg;
            VM.rightData.modelNum = data[3].modelNum;
            VM.rightData.weekRise = data[4].nowWeekNum;
            VM.rightData.dayRise = data[5].lastDayNum;
            // if (VM.rightData.weekRise.avg.indexOf("-") > -1) {
            //   VM.rightData.keyOne = true;
            // } else if (VM.rightData.weekRise.avg.indexOf("0") == 0) {
            //   VM.rightData.keyThr = true;
            // } else {
            //   VM.rightData.keyTwo = true;
            // }
            // if (VM.rightData.dayRise.avg.indexOf("-") > -1) {
            //   VM.rightData.keyOne1 = true;
            // } else if (VM.rightData.dayRise.avg.indexOf("0") == 0) {
            //   VM.rightData.keyThr1 = true;
            // } else {
            //   VM.rightData.keyTwo1 = true;
            // }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //左下数据左
    getCollectionTrendL() {
      let VM = this;
      let mStartTime, mEndTime;
      mStartTime = new Date().getTime();
      mEndTime = mStartTime - 604800000;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/collectionTrend?mStartTime=${mEndTime}&mEndTime=${mStartTime}`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "SUCCESS") {
            let data = res.data.result;
            data.forEach((item, index) => {
              if (item.modelingNum) {
                VM.modelingNum = item.modelingNum;
              }
            });
            VM.createEcharts1(VM.modelingNum);
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //左下数据右
    getCollectionTrendR() {
      let VM = this;
      let rStartTime, rEndTime, start, end;
      rStartTime = new Date();
      rEndTime = new Date();
      rStartTime.setTime(rStartTime.getTime() - 3600 * 1000 * 24 * 14);
      rStartTime.setHours(0, 0, 0, 0);
      start = rStartTime.getTime();
      end = rEndTime.getTime();
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/collectionTrend?rStartTime=${start}&rEndTime=${end}`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "SUCCESS") {
            let data = res.data.result;
            data.forEach((item, index) => {
              if (item.CollectionAreaNum) {
                VM.CollectionAreaNum = item.CollectionAreaNum;
              }
            });
            // let data1 = [
            //   {
            //   area: "黄浦区",
            //   num: 1,
            //   percentum: "91.03%"
            // },
            //   {
            //   area: "其他",
            //   num: 0,
            //   percentum: "91.03%"
            // },
            // ]
            //  let data2 = [
            //   {
            //   area: "黄浦区",
            //   num: 71,
            //   percentum: "91.03%"
            // },
            //  {
            //   area: "撒打算",
            //   num: 71,
            //   percentum: "91.03%"
            // },
            //   {
            //   area: "其他",
            //   num: 71,
            //   percentum: "91.03%"
            // },
            // ]
            VM.createEcharts2(VM.CollectionAreaNum);
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //柱状
    createEcharts3(data1, data2) {
      console.log(data1)
      console.log(data2)
      let startMonth = new Date(this.fromData.startTime).getMonth();
      let endMonth = new Date(this.fromData.endTime).getMonth();
      let val = endMonth - startMonth;
      if (this.fromData.area && this.fromData.orgId && val == 6) {
        this.sliderKey = true;
      } else {
        this.sliderKey = false;
      }
      if (document.getElementById("demo3") == null) {
        return;
      }
      var myChart = this.$echarts.init(document.getElementById("demo3"));
      let obj1 = {
        color: ["#5f8ffd"],
        tooltip: {
          trigger: "item",
          formatter: "{c}"
        },
        xAxis: {
          type: "category",
          offset: 15,
          data: data1,
          axisLabel: {
            rotate: 18,
            color: "#000"
          },
          axisLine: {
            lineStyle: {
              color: "#e7e7e7",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLine: {
            show: false //不显示坐标轴线
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            data: data2,
            type: "bar",
            barWidth: "32",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#5f8ffd" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#1a5fff" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                label: {
                  show: false, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#5f8ffd",
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      };
      let obj2 = {
        color: ["#5f8ffd"],
        tooltip: {
          trigger: "item",
          formatter: "{c}"
        },
        xAxis: {
          type: "category",
          data: data1,
          axisLabel: {
            rotate: 18,
            color: "#000"
          },
          axisLine: {
            lineStyle: {
              color: "#e7e7e7",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLine: {
            show: false //不显示坐标轴线
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            start: 0,
            end: 10,
            height: "15",
            handleSize: 8
          },
          {
            type: "inside",
            start: 0,
            height: "15",
            end: 10
          }
        ],
        series: [
          {
            data: data2,
            type: "bar",
            barWidth: "34",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#5f8ffd" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#1a5fff" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                label: {
                  show: false, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#5f8ffd",
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      };
      if (this.sliderKey) {
        myChart.setOption(obj2);
      } else {
        myChart.setOption(obj1);
      }
    },
    //折线
    createEcharts1(data) {
      let xdata = [],
        ydata = [];
      data.forEach(item => {
        let newArr = item.date.split("-");
        let str = newArr[1] + "/" + newArr[2];
        ydata.push(item.num);
        xdata.push(str);
      });
      if (document.getElementById("demo1") == null) {
        return;
      }
      var myChart = this.$echarts.init(document.getElementById("demo1"));
      myChart.setOption({
        xAxis: {
          offset: 15,
          type: "category",
          boundaryGap: false,
          data: xdata,
          axisLabel: {
            rotate: 0,
            color: "#000"
          },
          axisLine: {
            lineStyle: {
              color: "#e7e7e7",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          splitNumber: 3,
          axisLine: {
            show: false //不显示坐标轴线
          },
          minInterval: 1,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            data: ydata,
            type: "line",
            smooth: true,
            lineStyle: {
              normal: {
                color: "#e84239"
              }
            },
            itemStyle: { normal: { label: { show: true } } },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#f9c8c5 " },

                  { offset: 1, color: "#fffcfc" }
                ])
              }
            }
          }
        ]
      });
    },
    //饼图
    createEcharts2(data) {
      // console.log(data)
      let newArr = [];
      let num = 0;
      data.forEach((item, index) => {
        if(item.num){
            num += item.num;
        }
      });
      data.forEach((item, index) => {
        let obj = {};
        obj.value = item.num;
        obj.name = item.area;
        newArr.push(obj);
        let name = `AreaObj${index + 1}`;
        this[name].area = item.area;
        this[name].percentum = ((item.num / num) * 100).toFixed(2);
      });
      if (data.length == 2) {
        newArr[1].percentum = 100 - newArr[0].percentum;
      } else if (data.length == 3) {
        newArr[2].percentum = 100 - newArr[0].percentum - newArr[1].percentum;
      } else {
        newArr[3].percentum = 100 - newArr[0].percentum - newArr[1].percentum - newArr[2].percentum;
      }

      if (document.getElementById("demo2") == null) {
        return;
      }
      var myChart = this.$echarts.init(document.getElementById("demo2"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: function(datas) {
            // let numArr = datas.percent.toString().split('.')[1].length;
            let newStr = ((datas.value / num) * 100).toFixed(2);
            var res = datas.seriesName + "<br/>";
            res += datas.name + "：" + newStr + "%<br/>";

            return res;
          }
        },
        color: ["#1b76ff", "#ee684f", "#ffbf58", "#e5e5e5"],
        series: [
          {
            name: "采集区域占比",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: newArr
          }
        ]
      });
    },
    //获取区域
    getArea() {
      let VM = this;
      let one = "上海市";
      let two = "市辖区";
      let obj = TextToCode[one][two];
      for (var prop in obj) {
        let len = prop.length;
        if (prop.indexOf("区") == len - 1) {
          let obj = {};
          obj.area = prop;
          VM.options3.push(obj);
        }
      }
      VM.options3.unshift({ area: "全部" });
    },
    //导出Excel
    exportExcel() {
      if (this.xData.length == 0) {
        this.$Message.error(`无数据不能导出!`);
        return;
      }
      if (!this.fromData.area) {
        let len = this.xData.length;
        let data = new Array(len + 1);
        let startTime, endTime;
        if (!this.fromData.startTime) {
          startTime = new Date().toLocaleDateString();
          endTime = new Date().toLocaleDateString();
        } else {
          startTime = new Date(this.fromData.startTime).toLocaleDateString();
          endTime = new Date(this.fromData.endTime).toLocaleDateString();
        }
        let titleArr = ["采集区域", "采集开始时间", "采集结束时间", "采集数量"];
        data[0] = titleArr;
        this.xData.forEach((item, index) => {
          let newArr = [item, startTime, endTime, this.yData[index]];
          data[index + 1] = newArr;
        });
        this.$outputXlsxFile(
          data,
          [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }],
          "采集数据1"
        );
      } else if (this.fromData.area && !this.fromData.orgId) {
        let len = this.xData.length;
        let data = new Array(len + 1);
        let startTime, endTime;
        if (!this.fromData.startTime) {
          startTime = new Date().toLocaleDateString();
          endTime = new Date().toLocaleDateString();
        } else {
          startTime = new Date(this.fromData.startTime).toLocaleDateString();
          endTime = new Date(this.fromData.endTime).toLocaleDateString();
        }
        let titleArr = [
          "采集区域",
          "采集单位",
          "采集开始时间",
          "采集结束时间",
          "采集数量"
        ];
        data[0] = titleArr;
        this.xData.forEach((item, index) => {
          let newArr = [this.area, item, startTime, endTime, this.yData[index]];
          data[index + 1] = newArr;
        });
        this.$outputXlsxFile(
          data,
          [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }],
          "采集数据2"
        );
      } else if (this.fromData.area && this.fromData.orgId) {
        let len = this.xData.length;
        let data = new Array(len + 1);
        let titleArr = [
          "采集区域",
          "采集单位",
          "采集开始时间",
          "采集结束时间",
          "采集数量"
        ];
        data[0] = titleArr;
        this.XData.forEach((item, index) => {
          let newArr = [
            this.area,
            this.fromData.orgName,
            item,
            item,
            this.yData[index]
          ];
          data[index + 1] = newArr;
        });
        this.$outputXlsxFile(
          data,
          [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }],
          "采集数据3"
        );
      }
    },
    initSocket(data) {
      let url = `ws://${data.split("//")[1]}parent-police/websocket`;
      // 没有参数的情况:接口
      // let url1 = 'ws://localhost:9998'
      this.webSocket = new WebSocket(url);
      this.webSocket.onopen = this.webSocketOnOpen;
      this.webSocket.onclose = this.webSocketOnClose;
      this.webSocket.onmessage = this.webSocketOnMessage;
      this.webSocket.onerror = this.webSocketOnError;
    },
    // 建立连接成功后的状态
    webSocketOnOpen() {
      console.log("websocket连接成功");
    },
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      // res就是后台实时传过来的数据
      let VM = this;
      let data = JSON.parse(res.data);
      let dayCollectionNum = data.dayCollectionNum;
      let modelInfo = data.modelInfo;
      if (dayCollectionNum) {
        VM.rightData.dayCollectionNum.num++;
      }
      if (modelInfo) {
        let newArr = modelInfo.split(" ");
        let obj = {};
        obj.name = `${newArr[0]}`;
        obj.status = `${newArr[1]}`;
        obj.address = `${newArr[2]}`;
        obj.dateY = `${newArr[3]}`;
        obj.date = `${newArr[4]}`;
        VM.speedData.unshift(obj);
      }
    },
    // 关闭连接
    webSocketOnClose() {
      console.log("websocket连接已关闭");
    },
    //连接失败的事件
    webSocketOnError(res) {
      console.log("websocket连接失败");
      // 打印失败的数据
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.resizefun);
      this.resizefun = null;
    },
    destroyed() {
      this.webSocket.close();
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/data/dataStatistics.scss";
</style>
