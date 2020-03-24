<template>
  <div class="m-wrapper">
    <m-model :con="modelData" ref="model" />
    <m-delete :con="tipsData" />
    <div class="model-wrapper">
      <m-crums :con="crumsData" />
      <div class="shoot-inp" v-if="power[5001]">
        <div class="inp-con">
          <label for="five">
            <span class="must">采集单位</span>
            <el-select v-model="orgin" placeholder="请选择" class="list">
              <el-option
                @click.native="selectOrg(item)"
                v-for="item in options2"
                :key="item.value"
                :label="item.orgName"
                :value="item.orgName"
              ></el-option>
            </el-select>
          </label>
        </div>
        <div class="inp-con">
          <label for="five">
            <span class="must">数据来源</span>
            <el-select v-model="source1" placeholder="请选择" class="list">
              <el-option
                @click.native="selectSur(item)"
                v-for="item in options3"
                :key="item.val"
                :label="item.val"
                :value="item.val"
              ></el-option>
            </el-select>
          </label>
        </div>

        <div class="inp-con">
          <label for="four">
            <span class="must">采集时间</span>
            <DatePicker
              type="daterange"
              :options="options5"
              placement="bottom-end"
              placeholder
              class="data__picker1"
              v-model="dateVal"
              format="yy/M/d"
            ></DatePicker>
          </label>
        </div>
        <div class="inp-con">
          <label for="thr">
            <span class="must">采集编号</span>
            <input
              type="text"
              id="thr1"
              class="inp"
              v-model="collectNo"
            
              autocomplete="off"
              placeholder="采集编号"
            />
          </label>
        </div>
        <div class="inp-con">
          <el-tooltip content="请输入2-20位中文或英文" placement="bottom">
            <label for="thr">
              <span class="must name">姓名</span>
              <input
                type="text"
                id="thr"
                class="inp"
                v-model="username"
             
                autocomplete="off"
                placeholder="姓名"
              />
            </label>
          </el-tooltip>
        </div>

        <div class="inp-con">
          <label for="five">
            <span class="must">建模状态</span>
            <el-select v-model="status1" placeholder="请选择" class="list">
              <el-option
                @click.native="selectStatus(item)"
                v-for="item in options4"
                :key="item.val"
                :label="item.val"
                :value="item.val"
              ></el-option>
            </el-select>
          </label>
        </div>

        <div class="inp-con">
          <button class="addDec1" @click="rearch">查询</button>
        </div>
        <!-- <div class="upDate" @click="upDate"></div> -->
      </div>
      <div class="dec-list">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
          <el-table-column
            prop="index"
            label="序号"
            width="50"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="orgName"
            label="采集单位"
            width="180"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="120"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="idNo"
            label="证件号"
            width="200"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="采集时间"
            height="40"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="collectNo"
            label="采集编号"
            width="180"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="sourceName"
            label="数据来源"
            width="160"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <el-table-column
            prop="tag"
            label="标签"
            width="140"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.tag.length == 0 ? "" : scope.row.tag.join(',')}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="measStatus"
            label="一正两侧"
            width="140"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.measStatus == 0 ? "无" :"完成"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="modelStatusCname"
            label="建模状态"
            width="100"
            height="40"
            align="center"
          ></el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="115"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-button @click="handleTo(scope.row)" type="text" size="small" class="btn">查看</el-button>
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link drop">
                  更多
                  <Icon type="ios-arrow-down"></Icon>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleClick(scope.row)" class="drop" v-if="power[5002]">删除</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="handleUp(scope.row)"
                    class="drop"
                    v-if="scope.row.status == 3 && power[5003]"
                  >优先处理</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="slot-box">
        <el-pagination
          class="slot"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10,20,50]"
          :page-size="pagesize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MModel from "@/components/ms/model.vue";
import MDelete from "@/components/ms/delete.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    MCrums,
    MModel,
    MDelete
  },
  created() {
    // this.getModelList();
    this.getOrg();
    this.getPower()
  },
  data() {
    return {
      username: "", //被采集人
      collectNo: "",
      orgin: "", //采集机构
      source: "",
      startTime: "", //采集日期
      endTime: "",
      source1: "",
      orgId: "",
      idNo: "",
      dateVal: ["",""],
      status: "",
      status1: "",
      options2: [],
      options3: [
        { name: "全部", val: "全部" },
        { name: "雪山三号33", val: "雪山三号33" },
        { name: "雪山三号15", val: "雪山三号15" }
      ],
      options4: [
        { name: "全部", val: "全部" },
        { name: "已完成", val: "已完成" },
        { name: "建模中", val: "建模中" },
        { name: "排队中", val: "排队中" },
        { name: "失败", val: "失败" }
      ],
      crumsData: {
        one: "人像采集",
        two: "采集列表",
        thr: "",
        now: null,
        pathGP: ""
      },
      tipsData: {
        key: false,
        id: "",
        value: "文件"
      },
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      modelData: {
        key: false
      },
      options5: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: "1 个星期",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3 个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["power"])
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
      let resourceList = new Object();
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
              console.log(VM.power)
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        throw new Error("roleId");
      }
    },







    getOrg() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `/parent-police/farsee2/api/v1/organizations`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            // console.log(data)
            let obj = {
              orgId: "",
              orgName: "全部"
            };
            VM.options2 = data;
            VM.options2.unshift(obj);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getModelList() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/tasks?collectNo=${VM.collectNo}&startTime=${this.startTime}&endTime=${this.endTime}&status=${VM.status}&source=${VM.source}&username=${VM.username}&orgId=${VM.orgId}&idNo=${VM.idNo}&pageNum=${this.currentPage}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            // console.log(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询
    rearch() {
      let VM = this;
      if(this.username){
      let reg = /^[\u4E00-\u9FA5]{2,20}$/g;
      let reg1 = /^[a-zA-Z\/ ]{2,20}$/g;
      let key = reg.test(this.username);
      let key1 = reg1.test(this.username);
      if (!key && !key1) {
        this.$Message.error("请输入2-20位中文或英文");
        return
      }
      }
     
      this.currentPage = 1;
      if (this.dateVal[0] == "" || this.dateVal[1] == "") {
        this.startTime = "";
        this.endTime = "";
      } else {
        this.startTime = this.dateVal[0].getTime();
        this.endTime = this.dateVal[1].getTime() + 24 * 60 * 60 * 1000 - 1;
      }
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/tasks?startTime=${this.startTime}&endTime=${this.endTime}&status=${VM.status}&collectNo=${VM.collectNo}&source=${VM.source}&username=${VM.username}&orgId=${VM.orgId}&idNo=${VM.idNo}&pageNum=${this.currentPage}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            // console.log(res);
            VM.crumsData.thr = "查询结果";
            VM.crumsData.now = 1;
            VM.crumsData.pathGP = "upDate";
            let data = res.data.result.list;
            let len = data.length;
            if (len <= 0) {
              VM.$Message.error("没有该数据!");
              VM.tableData = [];
              VM.total = 0;

              return;
            }
           
            // console.log(VM.crumsData);
            VM.$Message.success("查询成功!");
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.total = res.data.result.total;
            VM.tableData = data;
            //VM.people = "";
            // VM.orgId = "";
            //VM.idNo = "";
            // VM.orgin = "";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //刷新
    upDate() {
      this.collectNo = "";
      this.dateVal = ["",""];
      this.startTime = "";
      this.endTime = "";
      this.status = "";
      this.status1 = "";
      this.username = "";
      this.orgId = "";
      this.idNo = "";
      this.source1 = "";
      this.source = "";
      this.currentPage = 1;
      this.orgin = "";
      this.crumsData = {
        one: "人像采集",
        two: "采集列表",
        thr: "",
        now: null,
        pathGP: ""
      };
      this.getModelList();
    },
    //查看
    handleTo(data) {
      console.log(data);
      this.$refs.model.status = data.status;
      this.$refs.model.getModel(data.id);
      if (data.source == "0") {
        if (data.measStatus == 1) {
          this.$refs.model.getcent(data.id);
          if(data.status == 1 ){
               this.$refs.model.key1 = true;
               this.$refs.model.key2 = false;
               this.$refs.model.key3 = false;
             
          }else{
               //this.$refs.model.key1 = false;
               this.$refs.model.key2 = false;
               //this.$refs.model.key3 = true;
          }
        } else {

           if(data.status == 1 ){
                
               this.$refs.model.key1 = false;
               this.$refs.model.key2 = true;
          }else{
               this.$refs.model.key1 = false;
               this.$refs.model.key2 = false;
               this.$refs.model.key3 = true;
          }
         
        }
      } else {
         if(data.status == 1){
              this.$refs.model.key1 = false;
              this.$refs.model.key2 = true;
         }else{
              this.$refs.model.key1 = false;
              this.$refs.model.key2 = false;
              this.$refs.model.key3 = true;
         }
      }
      this.$refs.model.getAllImg();
      this.modelData.key = true;
      if (data.status == 1) {
        if (data.source == 1) {
          this.$refs.model.INIT_15(650, 345, data.source);
        } else if (data.source == "0") {
          this.$refs.model.INIT(650, 345, data.source);
        }
      }
    },
    handleClick(data) {
      this.tipsData.key = true;
      this.tipsData.id = data.id;
    },
    //删除
    deleteItem(id) {
      let VM = this;
      this.$http.api
        .delete(window.BASEURL.testUrl1 + `parent-police/api/v1/tasks/${id}`)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$Message.success("删除成功!");
            VM.getModelList();
          } else {
            VM.$Message.success("删除失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleUp(data) {
      let VM = this;
      let params = { flag: 1 };
      this.$http.api
        .put(
          window.BASEURL.testUrl1 + `parent-police/api/v1/tasks/${data.id}`,
          params
        )
        .then(res => {
          if (res.status == 200 && res.data.code == 0) {
            VM.$Message.success("更新成功!");
            VM.getModelList();
          } else {
            VM.$Message.success("更新失败!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变每页显示条数
    handleSizeChange(size) {
      this.pagesize = size;
      this.getModelList();
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getModelList();
      //  console.log(this.userdata)
    },
    handleBlur1() {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g;
      let key = reg.test(this.fromData.idNo);
      if (!key) {
        this.$Message.error("身份证填写有误");
      }
    },
    onInput(e) {
      if (e.target.value.length > 18) {
        e.target.value = e.target.value.slice(0, 18);
        this.idNo = e.target.value;
      }
    },
    selectOrg(data) {
      this.orgId = data.orgId;
    },
    selectSur(data) {
      if (data.val == "全部") {
        this.source = "";
      } else if (data.val == "雪山三号15") {
        this.source = 1;
      } else if (data.val == "雪山三号33") {
        this.source = 0;
      }
    },
    selectStatus(data) {
      if (data.val == "全部") {
        this.status = "";
      } else if (data.val == "失败") {
        this.status = 0;
      } else if (data.val == "已完成") {
        this.status = 1;
      } else if (data.val == "建模中") {
        this.status = 2;
      } else if (data.val == "排队中") {
        this.status = 3;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/modelList/modelList.scss";
</style>
