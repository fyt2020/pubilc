<template>
  <div class="shootData__wrapper">
    <div class="shootData__con">
      <m-crums :con="crumsData" />

      <div class="sreach__condition">
        <div class="condition__item">
          <span class="item__w">采集时间</span>
          <DatePicker
            class="data__picker3"
            v-model="dateVal"
            @on-change="showTimePanel1('producetime1')"
            format="yyyy-M-d"
            type="daterange"
            confirm
            placeholder="选择时间"
            :options="options2"
          ></DatePicker>
          <span class="item__w">采集单位</span>

          <el-select v-model="deviceData.orgName" placeholder="请选择" class="add-sec">
            <el-option
              @click.native="selectOrg(item)"
              v-for="item in orgArr"
              :key="item.id"
              :label="item.orgName"
              :value="item.orgName"
            ></el-option>
          </el-select>
        </div>
        <div class="condition__item">
          <span class="item__w">所属区域</span>
          <div class="inp_box">
            <el-select
              v-model="deviceData.province"
              placeholder="请选择"
              class="search__elec2"
              :disabled="Disabled"
            >
              <el-option
                @click.native="selectProvince(item)"
                v-for="item in province"
                :key="item.id"
                :label="item.area_name"
                :value="item.area_name"
              ></el-option>
            </el-select>
          </div>
          <div class="inp_box">
            <el-select
              v-model="deviceData.city"
              placeholder="请选择"
              class="search__elec2"
              :disabled="Disabled"
            >
              <el-option
                @click.native="selectCity(item)"
                v-for="item in city"
                :key="item.id"
                :label="item.area_name"
                :value="item.area_name"
              ></el-option>
            </el-select>
          </div>
          <div class="inp_box">
            <el-select v-model="deviceData.area" placeholder="请选择" class="search__elec2">
              <el-option
                @click.native="selectArea(item)"
                v-for="item in area"
                :key="item.id"
                :label="item.area_name"
                :value="item.area_name"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="condition__item">
          <span class="item__w">字段筛选</span>
        </div>

        <div class="condition__item sreach">
          <div class="sreach__left"></div>

          <div class="sreach__right">
            <ul class="sreach__box">
              <template v-for="(item,index) in currentObj">
                <li class="sreach__item" :key="item.id" v-show="item.key">
                  <el-select v-model="item.value1" placeholder="请选择" class="search__elec">
                    <el-option
                      @click.native="selectFirst(item,index)"
                      v-for="item in item.options"
                      :key="item.id"
                      :label="item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>

                  <el-select v-model="item.value2" placeholder="请选择" class="search__elec">
                    <el-option
                      @click.native="selectSen(v)"
                      v-for="v in item.options2"
                      :key="v.value"
                      :label="v.value"
                      :value="v.value"
                    ></el-option>
                  </el-select>

                  <div class="inp__BOX">
                    <el-select
                      class="search__elec"
                      v-if="item.value1 === '标签' || item.value1 === '性别' || item.value1 === '数据来源'"
                      v-model="item.value3"
                      :multiple="item.value1 === '标签'"
                      filterable
                      allow-create
                      default-first-option
                      placeholder="请选择标签"
                    >
                      <el-option
                        v-for="item in item.options3"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                      ></el-option>
                    </el-select>

                    <input
                      type="text"
                      class="inp"
                      v-model="item.value3"
                      v-if="item.value1 === '采集数量'"
                    />
                  </div>

                  <el-button
                    type="text"
                    icon="el-icon-error"
                    @click="sub(item,index)"
                    v-show="item.value1"
                  ></el-button>
                </li>
              </template>
            </ul>
            <el-button type="text" icon="el-icon-circle-plus" @click="add">筛选条件</el-button>
          </div>
        </div>

        <div class="condition__item">
          <button class="addDec" @click="found">查询</button>
        </div>

        <div class="condition__item time">
          <div class="condition__left">
            <span class="item__w">采集数据</span>

            <div class="time__box">
              <span class="time__w">按</span>
              <el-select v-model="time" placeholder="请选择" class="search__time">
                <el-option
                  @click.native="selectTime(item)"
                  v-for="item in timeArr"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="time__w">展示</span>
            </div>
          </div>

          <div class="condition__right">
            <button class="outBtn" @click="exportExcel"></button>
          </div>
        </div>
      </div>
      <div class="data__table">
        <el-table :data="tableData" border style="width: 100%" max-height="330">
          <el-table-column
            fixed
            type="index"
            :index="indexMethod"
            label="序号"
            width="100"
            height="50"
            align="center"
          ></el-table-column>
          <el-table-column
            fixed
            prop="areaName"
            label="所属区域"
            width="180"
            height="50"
            align="center"
          ></el-table-column>
          <el-table-column fixed prop="orgName" label="采集单位" width="180" height="50" align="center"></el-table-column>
          <el-table-column
            fixed
            prop="cityName"
            label="所在城市"
            width="180"
            height="50"
            align="center"
          ></el-table-column>

          <!-- <el-table-column fixed prop="orgName" label="采集单位" width="180" height="50" align="center"></el-table-column> -->
          <el-table-column fixed prop="num" label="合计" height="50" align="right" fit>
            <template slot="header">
              <span>合计</span>
              <i
                :class="{'el-icon-circle-plus':!sumKey,'el-icon-remove':sumKey}"
                style="cursor:pointer"
                @click="sum()"
              ></i>
            </template>
            <template slot-scope="scope">
              <span>{{scope.row.num}}</span>
            </template>
          </el-table-column>

          <template v-if="sumKey">
            <el-table-column
              v-for="(item,index) in day"
              :key="index"
              :label="item"
              height="50"
              align="right"
            >
              <template slot-scope="scope" v-if="sumKey">
                <span>{{scope.row.list[index][item]}}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      type: 0,
      screen: [],
      orgId: "",
      sumKey: false,
      day: [
        // "0312",
        // "0313",
        // "0314",
        // "0315",
        // "0316",
        // "0317",
        // "0312",
        // "0313",
        // "0314",
        // "0315",
        // "0316",
        // "0317"
      ],

      tableData: [
        // {
        //   orgName: "上海市",
        //   sum: "9090",
        //   day: [
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     }
        //   ]
        // },
        // {
        //   orgName: "上海市",
        //   sum: "9090",
        //   day: [
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     },
        //     {
        //       day1: 1111
        //     }
        //   ]
        // }
      ],
      time: "天",
      crumsData: {
        one: "数据统计",
        two: "采集统计"
      },
      timeArr: [
        { id: 0, value: "天", type: 0 },
        { id: 1, value: "周", type: 1 },
        { id: 2, value: "月", type: 2 },
        { id: 3, value: "季度", type: 3 }
      ],
      options2: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: "过去1周",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "过去1个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "过去3个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          },
          {
            text: "过去一年",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              return [start, end];
            }
          }
        ]
      },
      dateVal: "",
      orgArr: [],
      deviceData: {
        orgName: "",
        parentId: "",
        orgId: "",
        province: "",
        city: "",
        area: ""
      },
      Disabled: true,
      province: [],
      city: [],
      area: [],
      areaIndex: "",

      currentObj: [
        {
          id: 1,
          key: true,
          value1: "",
          options: [],
          value2: "",
          options2: [],
          value3: "",
          options3: []
        },
        {
          id: 2,
          key: false,
          value1: "",
          options: [],
          value2: "",
          options2: [],
          value3: "",
          options3: []
        },
        {
          id: 3,
          key: false,
          value1: "",
          options: [],
          value2: "",
          options2: [],
          value3: "",
          options3: []
        },
        {
          id: 4,
          key: false,
          value1: "",
          options: [],
          value2: "",
          options2: [],
          value3: "",
          options3: []
        },
        {
          id: 5,
          key: false,
          value1: "",
          options: [],
          value2: "",
          options2: [],
          value3: "",
          options3: []
        },
        {
          id: 6,
          key: false,
          value1: "",
          options: [],
          value2: "",
          options2: [],
          value3: "",
          options3: []
        }
      ],
      nowShowIndex: 0, //当前第几个筛选条件一共6个
      choseIndex: null, //那个条件被选过
      condition: [
        {
          index: 0,
          value: "性别",
          isChoose: false,
          id: 100,
          son: [{ value: "等于" }, { value: "不等于" }],
          grdSon: [{ value: "男" }, { value: "女" }]
        },
        {
          index: 1,
          value: "采集数量",
          isChoose: false,
          id: 101,
          son: [{ value: "等于" }, { value: "不等于" }],
          grdSon: []
        },
        {
          index: 2,
          value: "数据来源",
          isChoose: false,
          id: 102,
          son: [{ value: "包含" }, { value: "不包含" }],
          grdSon: [{ value: "33个摄像头" }, { value: "15个摄像头" }]
        },
        {
          index: 3,
          value: "标签",
          isChoose: false,
          id: 103,
          son: [{ value: "包含" }, { value: "不包含" }],
          grdSon: []
        },
        {
          index: 4,
          value: "一正两侧",
          isChoose: false,
          id: 104,
          son: [{ value: "生成" }, { value: "未生成" }],
          grdSon: []
        },
        {
          index: 5,
          value: "建模状态",
          isChoose: false,
          id: 105,
          son: [
            { value: "建模失败" },
            { value: "建模成功" },
            { value: "建模中" },
            { value: "排队中" }
          ],
          grdSon: []
        }
      ], //筛选条件,
      statusObj: {
        性别: "sex",
        数据来源: "source",
        标签: "tag,",
        一正两侧: "measStatus",
        建模状态: "status",
        等于: 0,
        不等于: 1,
        包含: 0,
        不包含: 1,
        "33个摄像头": 0,
        "15个摄像头": 1,
        未生成: 0,
        生成: 1,
        建模失败: 0,
        建模成功: 1,
        建模中: 2,
        排队中: 3
      },
      tableArr: ["areaName", "cityName", "orgName"]
    };
  },
  computed: {
    choseArr() {
      let VM = this;
      let newArr1 = [];
      let newArr2 = [];
      newArr1 = this.currentObj.filter(item => {
        return (
          item.value3 != "" ||
          (item.value1 === "一正两侧" && item.value2 != "") ||
          (item.value1 === "建模状态" && item.value2 != "")
        );
      });
      newArr1.forEach((item, index) => {
        if (VM.statusObj[item.value1]) {
          let obj = {};
          obj["screenFiled"] = VM.statusObj[item.value1];
          obj["operation"] = VM.statusObj[item.value2];
          if (item.value1 === "一正两侧" || item.value1 === "建模状态") {
            obj["value"] = "";
          } else if (item.value1 == "标签") {
            obj["value"] = item.value3.join(",");
          } else {
            obj["value"] = item.value3;
          }
          newArr2.push(obj);
        }
      });
      return newArr2;
    }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.currentObj[this.nowShowIndex].options = this.condition;
      this.getOrg();
    },

    /**
     * @Author fyt
     * @Description
     * @Date 2020-03-31 16:03:48 星期二
     */
    selectOrg(data) {
      this.orgId = data.orgId;
    },

    /**
     * @Author fyt
     * @Description  点击合计
     * @Date 2020-03-25 12:43:27 星期三
     */

    sum(data) {
      this.sumKey = !this.sumKey;
    },
    /**
     * @Author fyt
     * @Description
     * @Date 2020-03-25 12:00:29 星期三
     */
    indexMethod(index) {
      return index + 1;
    },
    /**
     * @Author fyt
     * @Description 减少筛选条件
     * @Date 2020-03-24 11:05:58 星期二
     */
    sub(data, index) {
      console.log(data);
      if (this.nowShowIndex < 0) {
        return;
      }
      if (data.value1) {
        this.condition.forEach(item => {
          if (item.value === data.value1) {
            item.isChoose = false;
          }
        });

        this.nowShowIndex--;
        this.currentObj[index].value1 = "";
        this.currentObj[index].value2 = "";
        this.currentObj[index].value3 = "";
        this.currentObj[index].options = [];
        this.currentObj[index].options2 = [];
        this.currentObj[index].options3 = [];
        this.currentObj[index].key = false;
      }
    },
    /**
     * @Author fyt
     * @Description 增加筛选条件
     * @Date 2020-03-24 11:05:58 星期二
     */
    add() {
      if (this.choseIndex == null) {
        this.$Message.error(`第一个条件还未设置!`);
        return;
      }
      if (this.nowShowIndex > 4) {
        this.$Message.error(`条件最多为6个!`);
        return;
      }
      this.condition[this.choseIndex].isChoose = true;
      this.nowShowIndex++;
      this.currentObj[this.nowShowIndex].key = true;
      this.currentObj[this.nowShowIndex].options = this.condition;
    },
    /**
     * @Author fyt
     * @Description 监听选择时间
     * @Date 2020-03-24 09:58:14 星期二
     */
    showTimePanel1() {
      this.startTime = new Date(this.dateVal[0]).getTime();
      this.endTime = new Date(this.dateVal[1]).getTime();
    },
    /**
     * @Author fyt
     * @Description 选择第一个条件
     * @Date 2020-03-24 10:12:00 星期二
     */

    selectFirst(data, index) {
      if (this.condition[data.index].isChoose == true) {
        this.$Message.error(`该条件已经选过!`);
        this.currentObj[index].value1 = "";
        this.currentObj[index].value2 = "";
        this.currentObj[index].value3 = "";
        return;
      }
      this.choseIndex = data.index;
      // this.condition[data.index].isChoose = true;
      if (data) {
        this.currentObj[index].value2 = "";
        this.currentObj[index].options2 = data.son;
        this.currentObj[index].value3 = "";
        if (data.grdSon.length > 0)
          this.currentObj[index].options3 = data.grdSon;
      } else {
        this.$Message.error(`请选择!`);
      }
    },
    /**
     * @Author fyt
     * @Description 选择第二个条件
     * @Date 2020-03-24 14:07:38 星期二
     */

    selectSen(data, index) {
      console.log(data);
      // this.condition[data.index].isChoose = true;
      // console.log(this.condition);
    },

    /**
     * @Author fyt
     * @Description 数据展示
     * @Date 2020-03-24 16:19:20 星期二
     */
    selectTime(data) {
      // console.log(data);
      this.type = data.type;
      this.found();
    },

    /**
     * @Author fyt
     * @Description 查询
     * @Date 2020-03-24 16:10:37 星期二
     */

    found() {
      if (!this.startTime || !this.endTime) {
        this.$Message.error(`请选择查询时间!`);
        return;
      }
      if (this.choseArr.length === 0) {
        this.screen = [];
      } else {
        this.screen = this.choseArr;
      }

      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/taskStatistics?startTime=${
              VM.startTime
            }&endTime=${VM.endTime}&orgId=${
              VM.orgId
            }&areaIds=${encodeURIComponent(VM.areaIndex)}&type=${
              VM.type
            }&screen=${
              VM.screen.length == 0
                ? "%5B%5D"
                : encodeURIComponent(JSON.stringify(VM.screen))
            }`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data1 = res.data.result;
            let len = data1.length;
            if (len > 0) {
              VM.day = data1[0].list.map(item => {
                let k = null;
                for (let i in item) {
                  k = i;
                }
                return k;
              });
              VM.tableData = data1;
              VM.tableData.forEach((item, index) => {
                VM.tableArr.forEach(v => {
                  if (item[v] === undefined) {
                    item[v] = "";
                  }
                });
              });
            } else {
              VM.day = [];
              VM.tableData = [];
            }
            console.log(VM.tableData);
          } else {
            VM.day = [];
            VM.tableData = [];
          }
          VM.$Message.success(`查询成功`);
        })
        .catch(function(error) {
          VM.$Message.error(`查询失败`);
          console.log(error);
        });
    },

    /**
     * @Author fyt
     * @Description 选择省
     * @Date 2020-03-04 11:22:17 星期三
     */
    selectProvince(data) {
      this.areaIndex = data.area_code;
      this.deviceData.city = "";
      this.deviceData.area = "";
      this.city = [];
      this.area = [];
      this.getArea(this.areaIndex, 2);
    },
    /**
     * @Author fyt
     * @Description 选择市
     * @Date 2020-03-04 11:22:45 星期三
     */
    selectCity(data) {
      this.areaIndex = `${data.area_index},${data.area_code}`;
      this.getArea(this.areaIndex, 3);
    },
    /**
     * @Author fyt
     * @Description 选择区
     * @Date 2020-03-04 11:31:40 星期三
     */
    selectArea(data) {
      this.areaIndex = `${data.area_index},${data.area_code}`;
      // console.log(this.areaIndex);
    },
    /**
     * @Author fyt
     * @Description 导出
     * @Date 2020-03-24 16:22:40 星期二
     */
    exportExcel() {
      let len = this.tableData.length;

      

      if (len < 0) {
        this.$Message.error(`无数据不能导出!`);
        return;
      }
      let data = new Array(len + 1);
      let dayArr = this.tableData[0].list.map(item => {
        let k = null;
        for (let i in item) {
          k = i;
        }
        return k;
      });

      // let nameF = `三维人像采集数据统计_${dayArr[0]}至${dayArr[1]}`;
      let nameF = `三维人像采集数据统计表`;
      this.tableData.forEach((item, index) => {
        // let arr1 = [index + 1, item.orgName, item.num];
        let arr1 = [index + 1, item.areaName, item.orgName, item.cityName, item.sum];
        item.list.forEach(v => {
          let k = null;
          for (let i in v) {
            k = v[i];
            arr1.push(k);
          }
        });
        data[index + 1] = arr1;
      });
      let titleArr = ["序号","所属区域","采集单位","所在城市","合计"].concat(dayArr);
      let xldata = new Array(titleArr.length);
      titleArr.forEach((item, index) => {
        let obj = null;
        if (item === "采集单位") {
          obj = { wch: 20 };
        } else {
          obj = { wch: 18 };
        }
        xldata[index] = obj;
      });
      data[0] = titleArr;
      console.log(data);
      console.log(xldata);
      this.$outputXlsxFile(data, xldata, nameF);
    },

    /**
     * @Author fyt
     * @Description
     * @Date 2020-03-25 15:00:03 星期三
     */
    getOrg() {
      let VM = this;
      let orgId = JSON.parse(window.sessionStorage.getItem("token")).orgId;

      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `/parent-police/farsee2/api/v1/organizations`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            data.forEach(item => {
              if (item.orgId === orgId) {
                VM.deviceData = item;
              }
            });
            // console.log(VM.deviceData);
            VM.areaIndex = VM.deviceData.areaIds;
            VM.orgId = VM.deviceData.orgId;
            VM.Disabled = VM.deviceData.parentId === "" ? false : true;
            if (VM.Disabled) {
              let areaIdArr = VM.deviceData.areaIds.split(",");
              VM.getArea(`${areaIdArr[0]},${areaIdArr[1]}`, 3);
            } else {
              VM.province = [];
              VM.city = [];
              VM.area = [];
              VM.getArea("", 1);
            }
            VM.orgArr = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 获取省市区
     * @Date 2020-03-05 16:29:14 星期四
     */

    getArea(data, len) {
      // console.log(data)
      // console.log(len)
      let VM = this;
      let url =
        data == ""
          ? "parent-police/api/v1/area"
          : `parent-police/api/v1/area?areaIndex=${data}`;
      this.$http.api
        .get(window.BASEURL.testUrl1 + url)
        .then(function(res) {
          if (res.data.code === 0) {
            let data1 = res.data.result;
            if (len === 1) {
              VM.province = data1;
              // console.log("省", data1);
            } else if (len === 2) {
              VM.city = data1;
              // console.log("市", data1);
            } else if (len === 3) {
              VM.area = data1;
              // console.log("区", data1);
            } else {
              // console.log("无数据");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    MCrums
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/data/shootData.scss";
</style>
