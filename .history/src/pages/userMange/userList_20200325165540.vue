<template>
  <div class="user-wrapper">
    <m-madd :con="addData" ref="addUser" />
    <!-- <m-mrest :con="dialogKey1" /> -->
    <div class="user-content">
      <m-crums :con="crumsData" />
      <!-- 
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="15%"
        center
        :show-close="false"
        class="check"
      >
        <div class="suc-box">
          <span class="suc-w">重置的密码为:123456</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sure">确 定</el-button>
        </span>
      </el-dialog>-->

      <div class="user__box">
        <div class="user__tree">
          <div class="userTree__box">
            <span class="userTree__til">组织机构</span>
          </div>
          <el-tree
            :data="data1"
            :props="defaultProps"
            node-key="parentId"
            :default-expanded-keys="['','1.']"
            :highlight-current="true"
            :expand-on-click-node="false"
            ref="tree1"
            @node-click="choseOne"
          ></el-tree>
        </div>

        <div class="user__Rcon">
          <div class="user__title">用户列表</div>
          <div class="shoot-inp">
            <div class="inp-con">
              <label for="five">
                <label for="five">
                  <span class="must">用户名</span>
                  <input type="text" class="inp" v-model="username" placeholder="用户名" />
                </label>
              </label>
            </div>
            <div class="inp-con">
              <label for="five">
                <span class="must">角色</span>
                <el-select v-model="roleVal" placeholder="请选择">
                  <el-option
                    @click.native="selectRole(item)"
                    v-for="item in roleArr"
                    :key="item.rolename"
                    :label="item.rolename"
                    :value="item.rolename"
                  ></el-option>
                </el-select>
              </label>
            </div>
            <!-- <div class="inp-con">
              <label for="five">
                <span class="must">状态</span>
                <el-select v-model="statusVal" placeholder="请选择">
                  <el-option
                    @click.native="selectStatus(item)"
                    v-for="item in statusArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </label>
            </div> -->
            <div class="inp-con found">
              <button class="addDec1" @click="foundUser">查询</button>
            </div>
            <div class="inp-con add">
              <button class="addDec" @click="addUser" v-if="power[5023]">新增用户</button>
            </div>
          </div>

          <div class="dec-list">
            <el-table :data="tableData" stripe style="width: 100%" highlight-current-row height="540">
              <el-table-column prop="index" label="序号" width="80" height="40" align="center"></el-table-column>
              <el-table-column
                prop="name"
                label="用户名"
                width="220"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="orgName"
                label="所属机构"
                width="220"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="accountName"
                label="登录账号"
                width="220"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="telephone"
                label="手机号码"
                width="220"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>

              <el-table-column
                prop="rolename"
                label="角色"
                height="40"
                width="190"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <!-- <el-table-column
                prop="status"
                label="状态"
                height="40"
                width="180"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{(scope.row.status == 0 ||  scope.row.status == "禁用") ? "禁用" : "启用"}}</span>
                </template>
              </el-table-column> -->


              <el-table-column fixed="right" label="操作" width="160" height="40" align="center">
                <template slot-scope="scope">
                  <el-button @click="editRole(scope.row)" type="text" size="small" v-if="power[5025]">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>

         
          </div>

             <div class="slot-box">
              <div class="slot-con">
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
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MMadd from "@/components/ms/addUser.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      data1: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      tableData: [],
      addData: {
        key: false,
        type: "",
        orgId:"",
        OrgId:"",
      },

      username: "",

      dialogKey1: false,
      centerDialogVisible: false,
      currentPage: 1,
      pagesize: 10,
      total: 0,

      roleVal: "全部",

      roleId: "",
      roleArr: [],

      orgId: "", //机构id
      orgName: "", //机构名称
      parentId:"",

      idNo: "",
      collecOrg: "",
      collecOrgArr: [],

      crumsData: {
        one: "用户管理",
        two: "用户列表"
      },
      statusVal: "全部",
      statusArr: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "启用",
          value: 1
        },
        {
          name: "禁用",
          value: 0
        }
      ],
      OrgId:"",
    };
  },
  computed: {
     ...mapState(["power"])
  },
  created() {
    this.getOrg();
    this.getPower();
    this.OrgId = JSON.parse(window.sessionStorage.getItem("token")).orgId;

    

    // this.tableData = [
    //   {
    //     orgName: "上海市刑侦总队",
    //     accountName: "adminAccount",
    //     rolename: "超级管理员",
    //     description: null,
    //     telephone: "18645658966",
    //     updateTime: 1577243006049,
    //     accessToken: "d11d29fbaee74a379a694ce68396bc6a",
    //     parentId: "",
    //     orgId: "otgywab6uqa2g2a5",
    //     imgURL:
    //       "http://192.168.1.246/image/api/v1/images/90414d175d05ebf7c15916d107cc59ea",
    //     accountId: "134ca61f6c95412bb52e7f6c1e2df627",
    //     extendedProperties: { roleId: "545", name: "超管" },
    //     tenantName: null,
    //     createTime: 0,
    //     tenantId: "otgywab6uqa2g2a5",
    //     ifSelf: 0,
    //     name: "超管",
    //     projectId: "",
    //     email: "2323@qq.com",
    //     status: 1
    //   }
    // ];
    // this.data1 = [
    //   {
    //     id: 1,
    //     orgId: "otgywab6uqa2g2a5",
    //     orgName: "上海市刑侦总队",
    //     createTime: 1555400472000,
    //     updateTime: 1575860551783,
    //     orgDescription: "市局",
    //     status: "1",
    //     area: "上海市 虹口区",
    //     address: "上海市",
    //     linkman: "张三",
    //     linkPhone: "15888888885",
    //     linkEmail: "test@qq.com",
    //     parentId: "",
    //     belongOrgName: "上海",
    //     cStatus: "启用",
    //     value: "otgywab6uqa2g2a5",
    //     label: "上海市刑侦总队",
    //     children: [
    //       {
    //         id: 103,
    //         orgId: "qpkss",
    //         orgName: "青浦看守所",
    //         createTime: 1575860689772,
    //         updateTime: 1575860689772,
    //         orgDescription: "",
    //         status: "1",
    //         area: "上海市 青浦区",
    //         address: "",
    //         linkman: "无",
    //         linkPhone: "18204125563",
    //         linkEmail: "",
    //         parentId: "1.",
    //         belongOrgName: "上海市刑侦总队",
    //         cStatus: "启用",
    //         value: "qpkss",
    //         label: "青浦看守所",
    //         children: [
    //           {
    //             id: 109,
    //             orgId: "das",
    //             orgName: "das",
    //             createTime: 1576575379302,
    //             updateTime: 1576575379302,
    //             orgDescription: "",
    //             status: "1",
    //             area: "上海市 青浦区",
    //             address: "",
    //             linkman: "dasdas",
    //             linkPhone: "13437160811",
    //             linkEmail: "",
    //             parentId: "1.103.",
    //             belongOrgName: "青浦看守所",
    //             cStatus: "启用",
    //             value: "das",
    //             label: "das",
    //             children: []
    //           },
    //           {
    //             id: 113,
    //             orgId: "ewda",
    //             orgName: "测试",
    //             createTime: 1582272871524,
    //             updateTime: 1582272871524,
    //             orgDescription: "",
    //             status: "1",
    //             area: "上海市 青浦区",
    //             address: "",
    //             linkman: "da",
    //             linkPhone: "13566778877",
    //             linkEmail: "",
    //             parentId: "1.103.",
    //             belongOrgName: "青浦看守所",
    //             cStatus: "启用",
    //             value: "ewda",
    //             label: "测试",
    //             children: []
    //           }
    //         ]
    //       },
    //       {
    //         id: 104,
    //         orgId: "srlpcs",
    //         orgName: "松润路派出所",
    //         createTime: 1575860739106,
    //         updateTime: 1575860739106,
    //         orgDescription: "",
    //         status: "1",
    //         area: "上海市 青浦区",
    //         address: "",
    //         linkman: "无",
    //         linkPhone: "15423695562",
    //         linkEmail: "",
    //         parentId: "1.",
    //         belongOrgName: "上海市刑侦总队",
    //         cStatus: "启用",
    //         value: "srlpcs",
    //         label: "松润路派出所",
    //         children: []
    //       },
    //       {
    //         id: 111,
    //         orgId: "TYSKJ01",
    //         orgName: "天远视科技",
    //         createTime: 1577434881380,
    //         updateTime: 1577434881380,
    //         orgDescription: "",
    //         status: "1",
    //         area: "上海市 浦东新区",
    //         address: "",
    //         linkman: "张三",
    //         linkPhone: "15821563214",
    //         linkEmail: "",
    //         parentId: "1.",
    //         belongOrgName: "上海市刑侦总队",
    //         cStatus: "启用",
    //         value: "TYSKJ01",
    //         label: "天远视科技",
    //         children: []
    //       }
    //     ]
    //   }
    // ];
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
              // console.log(VM.power[5001]);
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
     * @Description 新增用户
     * @Date 2020-02-27 10:29:17 星期四
     */
    addUser() {
      this.addData.key = true;
      this.addData.type = "add";
      this.addData.orgId = this.orgId;
      this.addData.OrgId = this.OrgId;
 


      if(this.addData.orgId == this.OrgId){
         this.$refs.addUser.getOrg()
         this.$refs.addUser.getRoleArr(this.orgId)

      }else{
         this.$refs.addUser.getRoleArr(this.orgId)
      }
      this.$refs.addUser.deviceData.orgId = this.orgId;
      this.$refs.addUser.deviceData.orgName= this.orgName;


    },

    /**
     * @Author fyt
     * @Description 选择组织机构
     * @Date 2020-02-27 10:28:33 星期四
     */
    choseOne(data) {
    
      this.username = "";
      this.roleVal = "全部";
      this.statusVal = "全部";

      this.orgId = data.orgId;
      this.orgName = data.orgName;
      this.parentId = data.parentId;

      this.$refs.addUser.orgData = data;
      // this.$refs.addUser.deviceData.orgId = data.orgId;
      // this.$refs.addUser.deviceData.orgName = data.orgName;

      

      if(this.OrgId == data.orgId){
         this.getUserList("");
      }else{
         this.getUserList(this.orgId);
         
      }
      this.getRoleArr(this.orgId)
      
      
    },

    /**
     * @Author fyt
     * @Description 查询
     * @Date 2020-02-27 10:30:12 星期四
     */
    foundUser() {
      let VM = this,id;
      this.currentPage = 1;
      let status;
      if (this.statusVal == "启用") {
        status = 1;
      } else if (this.statusVal == "禁用") {
        status = 0;
      }
      if(this.parentId == ""){
         id = ""
      }else{
         id = this.orgId
      }
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/accounts?&pageNum=${
              this.currentPage
            }&pageSize=${this.pagesize}&names=${VM.username}&orgId=${
              id
            }&status=${VM.statusVal == "全部" ? "" : status}&roleId=${
              VM.roleId
            }`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            let len = data.length;
            if (len <= 0) {
              VM.$Message.error("没有该用户!");
              VM.tableData = [];
              VM.total = 0;
              return;
            } else {
              data.forEach((item, index) => {
                item["index"] = index + 1;
              });
              VM.tableData = data;
              VM.total = res.data.result.total;
              VM.$Message.success("查询成功!");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 选择角色查询
     * @Date 2020-02-27 10:30:27 星期四
     */
    selectRole(data) {
      // console.log(data)
      this.roleId = data.id;
    },
    /**
     * @Author fyt
     * @Description 选择状态查询
     * @Date 2020-02-27 10:30:40 星期四
     */
    selectStatus(data) {
      // console.log(data)
    },
    /**
     * @Author fyt
     * @Description  初始化获取数据
     * @Date 2020-02-27 10:31:11 星期四
     */
    getUserList(id) {
      //获取用户lie'biao
      if (id == undefined || id == null) id = "";
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/accounts?pageNum=${this.currentPage}&names=${VM.username}&orgId=${id}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            VM.total = res.data.result.total;
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            // VM.total = res.data.result.total;
            // console.log(res);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 获取机构
     * @Date 2020-02-27 11:35:57 星期四
     */
    getOrg() {
      let VM = this;
      let newArr = [];
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `/parent-police/farsee2/api/v1/organizations?flag=1`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;
            VM.orgId = data.orgId;
            VM.orgName = data.orgName;
            VM.parentId = data.parentId;

            VM.$refs.addUser.orgData = data;
            // VM.$refs.addUser.deviceData.orgId = data.orgId;
            // VM.$refs.addUser.deviceData.orgName = data.orgName;

            newArr.push(data);

            VM.data1 = newArr;
            VM.getRoleArr(VM.orgId);
            VM.getUserList();

          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 获取角色
     * @Date 2020-02-27 11:36:19 星期四
     */
    getRoleArr(data) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.roleUrl + `/yyqxzx/api/v1/roles?type=1&filter=identify=${data}&extend=true`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            // console.log(data);
            let obj = {
              cKey: "",
              cValue: "",
              description: "",
              rolename: "全部",
              id: "",
              value: ""
            };
            VM.roleArr = data;
            VM.roleArr.unshift(obj);
            // console.log(data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 改变每页显示条数
     * @Date 2020-02-27 14:39:14 星期四
     */

    handleSizeChange(size) {
      this.pagesize = size;
        if(this.parentId == ""){

         this.getUserList("");
      }else{
         this.getUserList(this.orgId);
         
      }
      // this.getUserList(this.orgId);
    },
    /**
     * @Author fyt
     * @Description 跳到某一页
     * @Date 2020-02-27 14:39:27 星期四
     */
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;

     
      if(this.parentId == ""){

         this.getUserList("");
      }else{
         this.getUserList(this.orgId);
         
      }
      //  console.log(this.userdata)
    },
    /**
     * @Author fyt
     * @Description 编辑角色
     * @Date 2020-02-27 14:21:35 星期四
     */
    editRole(data) {
      console.log(data);
      
      this.addData.key = true;
      this.addData.type = "edit";
      this.$refs.addUser.getUserInfo(data.accountId);
      this.$refs.addUser.getRoleArr(data.orgId)

      // this.$refs.addUser.deviceData = data;
      // this.$refs.addUser.saveOrgData = data;

      // this.$refs.addUser.deviceData.accountPasswd = "******";
      // this.$refs.addUser.roleVal = data.rolename;


      // if (data.status == 1) {

      //   this.$refs.addUser.deviceData.status = "启用";
      // } else {
      //   this.$refs.addUser.deviceData.status = "禁用";
      // }
    },
    /**
     * @Author fyt
     * @Description 确认重置密码
     * @Date 2020-02-27 14:21:04 星期四
     */
    handleClick(data) {
      let sure = window.confirm("确认重置密码？");
      if (!sure) {
        return;
      }
      let accountId = data.accountId;
      let VM = this;
      this.$http.api
        .put(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/accounts/password/${accountId}`
        )
        .then(function(res) {
          // console.log(res)
          if (res.data.code === 0 && res.status == 200) {
            VM.$refs.addUser.deviceData.accountPasswd = "123456";
            VM.$refs.addUser.resetPassw = "重置成功";
            setTimeout(() => {
              VM.$refs.addUser.resetPassw = "重置密码";
            }, 4000);
            // VM.centerDialogVisible = true;
          } else {
            VM.$Message.success(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log(accountId);
      //  this.dialogKey1 = true;
    },

    sure() {
      this.centerDialogVisible = false;
    }
  },
  components: {
    MCrums,
    MMadd
    // MMrest
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/userMange/userList.scss";
</style>
