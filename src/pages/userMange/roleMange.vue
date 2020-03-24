<template>
  <div class="userm-wrapper">
    <div class="userm-content">
      <m-crums :con="crumsData" />
      <m-madd :con="dialogKey" />
      <m-medit :con="dialogKey1" ref="editRole"/>
      <m-delete :con="tipsData" />
      <div class="shoot-inp">
        <div class="inp-con" v-show="1">
          <button class="addDec" @click="addRole" v-if="power[5026]">新增角色</button>
        </div>
      </div>
      <div class="dec-list">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
          <el-table-column prop="index" label="序号" width="80" height="40" align="center"></el-table-column>
          <el-table-column
            prop="rolename"
            label="角色名称"
            width="550"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="角色描述"
            width="580"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="200" height="40" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleDelete(scope.row)"
                type="text"
                size="small"
                class="tableBtn"
                v-if="power[5027]"
              >删除</el-button>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                class="tableBtn"
                v-if="power[5028]"
              >权限编辑</el-button>
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
          :current-page="currentPage"
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
import MMadd from "@/components/ms/addRole.vue";
import MMedit from "@/components/ms/editRole.vue";
import MDelete from "@/components/ms/delete.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      tableData: [],
      username: "",
      dialogKey: false,
      dialogKey1: {
        key: false,
        id: ""
      },
      currentPage: 1,
      pagesize: 10,
      roleVal: "",
      roleId: "",
      roleArr: [],
      total:0,
      orgId: "",
      idNo: "",
      collecOrg: "",
      collecOrgArr: [],
      crumsData: {
        one: "用户管理",
        two: "角色管理"
      },
      tipsData: {
        key: false,
        id: "",
        value: "角色"
      }
    };
  },
  computed: {
      ...mapState(["power"])
  },
  created() {
    this.getRoleArr();
    this.getPower();
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
    /**
     * @Author fyt
     * @Description 新增角色
     * @Date 2020-03-15 13:35:51 星期天
     */
    addRole() {
      this.dialogKey = true;
    },
    
    /**
     * @Author fyt
     * @Description 获取角色列表
     * @Date 2020-03-15 13:36:02 星期天
     */
    getRoleArr() {

      let orgId = JSON.parse(window.sessionStorage.getItem("token")).orgId;
      // this.tableData = [
      //   {
      //     createtime: "2019-09-03 11:26:00",
      //     description: "超级管理员",
      //     id: 545,
      //     identify: "otgywab6uqa2g2a5",
      //     projectid: "police_v1",
      //     rolename: "超级管理员",
      //     type: 1,
      //     updatetime: "2019-09-30 16:48:51"
      //   }
      // ];
      let VM = this;
      this.$http.api
        .get(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles?type=1&pageNum=${VM.currentPage}&pageSize=${VM.pagesize}&filter=identify=${orgId}&extend=true`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            VM.total = res.data.result.totalCounts;
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
    handleDelete(data) {
      this.tipsData.key = true;
      this.tipsData.id = data.id;
    },
    /**
     * @Author fyt
     * @Description 删除某个角色
     * @Date 2020-03-15 13:36:16 星期天
     */
    deleteItem(data) {
      let VM = this;
      this.$http.api
        .delete(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles/${data}`)
        .then(function(res) {
          if (res.status === 200 && res.data.code == 0) {
            VM.$Message.success(`${res.data.msg}`);
            VM.getRoleArr();
          } else {
            VM.$Message.error(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //改变每页显示条数
    handleSizeChange(size) {
      this.pagesize = size;
      this.getRoleArr();
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
       this.getRoleArr();
      //  console.log(this.userdata)
    },
    /**
     * @Author fyt
     * @Description 编辑
     * @Date 2020-03-12 17:17:12 星期四
     */
    handleClick(data) {
      console.log(data);
      this.dialogKey1.key = true;
      this.dialogKey1.id = data.id;
      this.$refs.editRole.getList(data.id);
      this.$refs.editRole.roleId = data.id;
    }
  },
  components: {
    MCrums,
    MMadd,
    MMedit,
    MDelete
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/userMange/roleMange.scss";
</style>
