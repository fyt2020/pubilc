<template>
  <div class="faceDB__wrapper">
    <m-delete :con="tipsData" />
    <m-ms :con="key1" ref="faceImport" />
    <m-resst :con="key2" ref="faceImport2"/>
    <div class="faceDB__content">
      <m-crums :con="crumsData" />
      <div class="shoot-inp">
        <div class="shoot_left">
          <div class="inp-con">
            <label for="five">
              <!-- <span class="w">姓名</span> -->
              <el-tooltip content="根据姓名或所属查询" placement="bottom">
                <input type="text" class="inp" v-model="name" autocomplete="off" />
              </el-tooltip>
            </label>
          </div>
          <div class="inp-con">
            <label for="five">
              <!-- <span class="must">选择性别</span> -->
              <el-select v-model="sex" placeholder="请选择性别" class="faceImport">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </label>
          </div>
          <div class="inp-con">
            <button class="addDec1" @click="rearch">查询</button>
          </div>
        </div>
        <div class="shoot_right">
          <button class="addDec" @click="update" v-if="0">更新人脸特征</button>
          <button class="addDec" @click="goToAddMo" v-if="power[5013]">导入人脸</button>
        </div>
      </div>
      <div class="dec-list">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
          <el-table-column prop="index" label="序号" width="100" height="40" align="center"></el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="150"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="200"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="belong"
            label="所属"
            width="200"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="200"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.tag.join(',')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="source"
            label="数据来源"
            width="200"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.source == 0 ? '模型导入': '图片导入'}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="150"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span  style="cursor:pointer"  @click="reUpload(scope.row)">{{ scope.row.status == 0 ? '未生成': ( scope.row.status == 1 ? '生成中' : ( scope.row.status == 2 ? '成功' : (scope.row.status == 3 ? '重新导入':'失败'))) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="time"
            label="入库时间"
            width="160"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <!-- <template slot-scope="scope">
              <span>{{new Date(scope.row.createTime).toLocaleString()}}</span>
            </template>-->
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="220" height="40" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                class="tableBtn"
                v-if="power[5016]"
              >删除</el-button>
              <el-button @click="goTo(scope.row)" type="text" size="small" class="tableBtn">查看</el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MDelete from "@/components/ms/delete.vue";
import { mapState, mapMutations } from "vuex";
import MMs from "@/components/ms/faceImport.vue";
import MReset from "@/components/ms/ResetFace.vue";
export default {
  props: {},
  data() {
    return {
      crumsData: {
        one: "三维人像应用",
        two: "人脸库",
        thr: "...",
        pathGP: "faceChar",
        pathP: "",
        now: 1
      },
      sex: "",
      name: "",
      tableData: [],
      pagesize: 10,
      total: 0,
      pageNum: 1,
      currentPage: 1,
      id: "",
      key1: false,
      key2: false,
      options: [
        { value: "全部", label: "全部" },
        { value: "男", label: "男" },
        { value: "女", label: "女" }
      ],
      tipsData: {
        key: false,
        id: "",
        value: "人员"
      }
    };
  },
  computed: {
    ...mapState(["power"])
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.crumsData.thr = this.$route.params.name;
    } else {
      let data = JSON.parse(localStorage.getItem("libId"));
      this.id = data.id;
      this.crumsData.thr = data.name;
    }
    this.getDataInfoById(this.id);
    this.getPower();
  },
  mounted() {},

  methods: {
    ...mapMutations(["changNow", "set_power"]),


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
              console.log(VM.power[5001]);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        throw new Error("roleId");
      }
    },
    /**
     * @Author fyt
     * @Description 重新导入
     * @Date 2020-03-25 17:05:39 星期三
     */

    reUpload(data){

      console.log(data)
      this.key2 = true;
      if(data.source === 0){
        this.$refs.faceImport2.activeKey2 = true;
        this.$refs.faceImport2.fromData2.username = data.username;
        this.$refs.faceImport2.fromData2.sex = data.sex;
        this.$refs.faceImport2.fromData2.idNo = data.idNo;
        this.$refs.faceImport2.fromData2.belong = data.belong;
        this.$refs.faceImport2.fromData2.labelArr = data.tag;
        this.$refs.faceImport2.uuid = data.collectNo;
        this.$refs.faceImport2.fromData2.type = data.type == 0 ? "身份证":"护照";
      }else if(data.source === 1){
        // this.$refs.faceImport2.activeKey1 = true;   
      }
    },

    getDataInfoById(data) {
      let VM = this;
      this.pageNum = this.currentPage;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/face?flag=1&libId=${VM.id}&pageNum=${VM.pageNum}&username=${VM.name}&pageSize=${VM.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            // console.log(VM.tableData);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //根据姓名查询
    rearch() {
      let VM = this;
      if (this.sex == "全部") {
        this.sex = "";
      }
      this.currentPage = 1;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/face?&pageNum=${1}&pageSize=${
              VM.pagesize
            }&fieldFilter=${VM.name}&libId=${VM.id}&flag=1&sex=${VM.sex}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
            let len = data.length;
            if (len <= 0) {
              VM.$Message.error("没有该人员!");
              VM.tableData = [];
              return;
            }
            VM.$Message.success(`查询成功`);
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //导入人脸库
    goToAddMo() {
      this.key1 = true;
      this.$refs.faceImport.getModelList(this.id);
      this.$refs.faceImport.getCategorys();
      this.$refs.faceImport.getPower();
    },
    //更新人脸库
    update() {},
    //查看某个人
    goTo(data) {
      this.$router.push({
        name: "faceDBdetail",
        params: { id: data.id, fid: this.id, name: this.crumsData.thr }
      });
      localStorage.setItem(
        "personId",
        JSON.stringify({ id: data.id, name: this.crumsData.thr, fid: this.id })
      );
      this.changNow({ val: 4 });
    },
    handleClick(data) {
      this.tipsData.key = true;
      this.tipsData.id = data.id;
    },
    //删除某个人
    deleteItem(data) {
      let VM = this;
      let parmas = { flag: 0 };
      this.$http.api
        .put(
          window.BASEURL.testUrl1 + `parent-police/api/v1/face/${data}`,
          parmas
        )
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$Message.success("删除成功!");
            VM.getDataInfoById();
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取这个库的信息
    // getData() {
    //   let VM = this;
    //   this.$http.api
    //     .get(
    //       window.BASEURL.testUrl1 +
    //         `parent-police/api/v1/models?&pageNum=${VM.currentPage}&pageSize=${VM.pagesize}`
    //     )
    //     .then(function(res) {
    //       if (res.data.code === 0) {
    //         let data = res.data.result.list;
    //         VM.total = res.data.result.total;
    //         data.forEach((item, index) => {
    //           item["index"] = index + 1;
    //         });
    //         VM.tableData = data;
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    //改变每页显示条数
    handleSizeChange(size) {
      this.pagesize = size;
      this.getDataInfoById(this.id);
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getDataInfoById(this.id);
    }
  },
  components: {
    MCrums,
    MMs,
    MDelete,
    MReset
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumUse/faceDB.scss";
</style>
