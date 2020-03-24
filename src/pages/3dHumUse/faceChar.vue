<template>
  <div class="faceChar-wrapper">
    <m-delete :con="tipsData" />
    <div class="faceChar-con">
      <m-crums :con="crumsData" ref="crums" />
      <m-ms :con="centerDialogVisible" />
      <div class="shoot-inp">
        <div class="shoot_left" v-if="power[5009]">
          <div class="inp-con">
            <label for="five">
              <span class="w">库名称</span>
              <el-tooltip content="根据库名查询" placement="bottom">
                <input type="text" class="inp" v-model="name" autocomplete="off" />
              </el-tooltip>
            </label>
          </div>
          <div class="inp-con">
            <button class="addDec1" @click="rearch">查询</button>
          </div>
          <!-- <div class="upDate" @click="upDate">
          </div> -->
        </div>
        <div class="shoot_right">
          <button class="addDec" @click="goToAddMo" v-if="power[5010]">新增人脸库</button>
        </div>
      </div>
      <div class="dec-list">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row height="530">
          <el-table-column prop="index" label="序号" width="150" height="40" align="center"></el-table-column>
          <el-table-column prop="libName" label="库名称" width="380" height="40" align="center" :show-overflow-tooltip='true'></el-table-column>
          <el-table-column prop="personNum" label="库中人数" width="380" height="40" align="center"></el-table-column>
          <!-- <el-table-column prop="status" label="生成人脸特征" width="270" height="40" align="center">
               <template slot-scope="scope">
              <span>{{scope.row.status == 0 ? '未生成' : (scope.row.status == 1  ? '生成中' : '已完成') }}</span>
               </template>
          </el-table-column> -->
          <el-table-column prop="faceUpdateTime" label="更新时间" width="380" height="40" align="center">
            <!-- <template slot-scope="scope">
              <span>{{ scope.row.faceTime == 0 ? '' : new Date(scope.row.faceTime).toLocaleString()}}</span>
            </template> -->
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="220" height="40" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" class="tableBtn" v-if="power[5011]">删除</el-button>
              <el-button @click="goTo(scope.row)" type="text" size="small"  class="tableBtn" v-if="power[5012]">查看</el-button>
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
import MRearchTip from "@/components/ms/rearchSuss.vue";
import MDelete from "@/components/ms/delete.vue";
import MMs from "@/components/ms/dataImport.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      crumsData: {
        one: "三维人像应用",
        two: "人脸库",
        thr:"",
        now:null,
        pathGP:''
      },
      dialogKey1: false,
      dialogKey2: false,
      tagVal: "",
      tagId: "",
      tagArr: [],
      choseTagArr: [],
      start: "",
      end: "",
      collectSno: "",
      people: "",
      belongTo: "",
      options3: [], //机构
      orgId: "", //机构id
      currentPage: 1,
      pagesize: 10,
      name: "",//库名称
      tableData: [],
      total: 0,
      centerDialogVisible: false,
      tipsData:{
         key:false,
         id:'',
         value:'人脸库'
      },

  
    };
  },
  computed: {
      ...mapState(["power"])
  },
  created() {
    this.getFaceLibrary();
    this.getPower();
  },
  mounted() {},

  methods: {
    ...mapMutations(["changNow","set_power"]),

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

     //新增人脸库
    goToAddMo() {
      this.centerDialogVisible = true;
    },
    //获取ku列表
    getFaceLibrary() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/faceLibrary?&pageNum=${VM.currentPage}&pageSize=${VM.pagesize}&libNames=${VM.name}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
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

    goTo(data) {
      this.$router.push({ name: "faceDB",params:{id:data.id,name:data.libName} });
      localStorage.setItem('libId', JSON.stringify({id:data.id,name:data.libName}));
      this.changNow({ val: 4 });
    },
    rearch(type) {
      // let reg = /^[\s]*$/g;
      // let key = reg.test(this.name);
      // if(key){
      //    this.$Message.error("搜索内容不能有空格");
      //    return
      // }

      let VM = this;
      this.currentPage = 1;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/faceLibrary?&pageNum=${1}&pageSize=${VM.pagesize}&libNames=${VM.name}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
            let len = data.length;
               VM.crumsData.thr = '查询结果';
            VM.crumsData.now = 1;
            VM.crumsData.pathGP = 'upDate';
            if (len <= 0) {
              VM.$Message.error("没有该人脸库!");
              VM.tableData = [];
              return;
            }
            if(type != 'update'){
              VM.$Message.success(`查询成功`);
            }
            
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
    upDate(){
      this.name = '';
      this.crumsData = {
          one: "三维人像应用",
          two: "人脸库",
          thr: "",
          now: null,
          pathGP: ""
      };
      this.getFaceLibrary();
    },
    handleClick(data){
        this.tipsData.key = true;
        this.tipsData.id = data.id;
    },
    deleteItem(data) {
      let VM = this;
      this.$http.api
        .delete(window.BASEURL.testUrl1 + `parent-police/api/v1/faceLibrary/${data}`)
         .then(function(res) {
          if (res.data.code === 0) {
                VM.$Message.success(`删除成功`);
          }else{
                VM.$Message.success(`${res.data.msg}`);
          }
          VM.getFaceLibrary();
        })
        .catch(function(error) {
          console.log(error);
        });

    },
    //改变每页显示条数
    handleSizeChange(size) {
      this.pagesize = size;
      this.getFaceLibrary();
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getFaceLibrary();
    }
  },
  components: {
    MCrums,
    MMs,
    MDelete,
    MRearchTip
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumUse/faceChar.scss";
</style>
