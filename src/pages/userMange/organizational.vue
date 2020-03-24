<template>
  <div class="org-wrapper">
    <m-madd :con="roleInf" ref="add" />

    <m-maddC :con="roleInfC" ref="addC" :Disabled="sonDisabled" />

    <m-medit :con="roleInf1" ref="edit" />

    <m-delete :con="tipsData" />

    <div class="org-content">
      <m-crums :con="crumsData" />
      <div class="org__box">
        <div class="org__tree">
          <div class="orgTree__box">
            <span class="orgTree__til">组织机构</span>
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

        <div class="dec-list">
          <div class="current__org">
            <div class="current__org__title">
              <span class="org__info">{{ currentOrg.orgName }}</span>
              <span @click="editOrg" class="editOrg" v-if="power[5031]">编辑</span>
            </div>

            <div class="shoot-inp">
              <div class="inp-con">
                <label for="one3">
                  <span class="f-w">单位名称</span>
                  <input
                    type="text"
                    id="one3"
                    :class="['inp',{'readonly':isRead}]"
                    v-model="currentOrg.orgName"
                    autocomplete="off"
                    :readonly="isRead"
                    maxlength="20"
                  />
                </label>
              </div>
              <div class="inp-con">
                <label for="one2">
                  <span class="f-w">单位编号</span>
                  <input
                    type="text"
                    id="one2"
                    :class="['inp',{'readonly':isRead}]"
                    v-model="currentOrg.orgNo"
                    autocomplete="off"
                    readonly="isRead"
                  />
                </label>
              </div>

              <div class="inp-con">
                <label for="one">
                  <span class="f-w">负责人</span>
                  <input
                    type="text"
                    id="one"
                    :class="['inp',{'readonly':isRead}]"
                    v-model="currentOrg.linkman"
                    autocomplete="off"
                    :readonly="isRead"
                    maxlength="20"
                  />
                </label>
              </div>
              <div class="inp-con">
                <label for="five">
                  <span class="f-w">手机号</span>
                  <input
                    type="text"
                    id="one1"
                    :class="['inp',{'readonly':isRead}]"
                    v-model="linkPhone"
                    autocomplete="off"
                    :readonly="isRead"
                    maxlength="20"
                  />
                </label>
              </div>
            </div>

            <div class="shoot-inp">
              <div class="inp-con" v-if="isRead">
                <span class="f-w">单位地址</span>
                <input
                  type="text"
                  id="address1"
                  :class="['inp2',{'readonly':isRead}]"
                  v-model="currentOrg.province"
                  autocomplete="off"
                  :readonly="isRead"
                />
                <input
                  type="text"
                  id="address2"
                  :class="['inp2',{'readonly':isRead}]"
                  v-model="currentOrg.city"
                  autocomplete="off"
                  :readonly="isRead"
                />
                <input
                  type="text"
                  id="address3"
                  :class="['inp2',{'readonly':isRead}]"
                  v-model="currentOrg.area"
                  autocomplete="off"
                  :readonly="isRead"
                />
                <input
                  type="text"
                  id="address4"
                  :class="['inp1',{'readonly':isRead}]"
                  v-model="currentOrg.address"
                  autocomplete="off"
                  :readonly="isRead"
                />
              </div>

              <div class="inp-con" v-if="!isRead">
                <span class="f-w">单位地址</span>
                <div class="inp_box">
                  <el-select
                    v-model="provinceVal"
                    placeholder="请选择"
                    class="province"
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
                    v-model="cityVal"
                    placeholder="请选择"
                    class="province"
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
                  <el-select v-model="areaVal" placeholder="请选择" class="province">
                    <el-option
                      @click.native="selectArea(item)"
                      v-for="item in area"
                      :key="item.id"
                      :label="item.area_name"
                      :value="item.area_name"
                    ></el-option>
                  </el-select>
                </div>
                <input
                  type="text"
                  id="address4"
                  class="inp1"
                  v-model="currentOrg.address"
                  autocomplete="off"
                  :readonly="isRead"
                />
              </div>

              <!-- <div class="inp-con1">
                <span class="f-w1">状态</span>
              </div>
              <div class="inp-con2">
                <RadioGroup v-model="statusArr">
                  <Radio label="禁用" :disabled="isRead"></Radio>
                  <Radio label="启用" :disabled="isRead"></Radio>
                </RadioGroup>
              </div> -->

              <div class="inp-con" v-if="!isRead">
                <button @click="giveUp" class="giveUp">放弃</button>
                <button type="primary" @click="save" class="addDec">保存</button>
              </div>
            </div>
          </div>

          <div class="list__title">
            <span class="list_titleW">下级机构</span>
            <button class="addDec" @click="addNextOrg" v-if="power[5029]">新增采集单位</button>
          </div>

          <div class="table__box">
            <el-table
              id="dec_list"
              :data="tableData"
              style="width: 100%"
              highlight-current-row
              class="tableCss"
            >
              <el-table-column prop="index" label="序号" width="80" height="40" align="center"></el-table-column>
              <el-table-column
                prop="orgName"
                label="单位名称"
                height="40"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="orgNo"
                label="单位编号"
                width="200"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>

              <el-table-column
                prop="address"
                label="单位地址"
                height="40"
                align="center"
                width="260"
                :show-overflow-tooltip="true"
              >
                <!-- <template slot-scope="scope">
                <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}{{scope.row.address}}</span>
                </template>-->
              </el-table-column>
              <el-table-column
                prop="linkman"
                label="负责人"
                width="200"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column
                prop="linkPhone"
                label="手机号"
                width="200"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <!-- <el-table-column
                prop="status"
                label="状态"
                width="120"
                height="40"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.status == 0 ? "禁用" : "启用"}}</span>
                </template>
              </el-table-column> -->
              <el-table-column fixed="right" label="操作" width="180" height="40" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    class="tableBtn"
                    v-if="power[5031]"
                  >编辑</el-button>
                  <el-button
                    @click="handleAdd1(scope.row)"
                    type="text"
                    size="small"
                    class="tableBtn"
                    v-if="power[5030]"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 
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
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MMadd from "@/components/ms/addOrg.vue";
import MMaddC from "@/components/ms/addOrgC.vue";
import MMedit from "@/components/ms/editOrg.vue";
import MDelete from "@/components/ms/delete.vue";
import { mapState, mapMutations } from "vuex";
export default {
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
      isRead: true, //是否可编辑
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      tipsData: {
        key: false,
        id: "",
        value: "文件"
      },
      Disabled: true,
      sonDisabled: true,

      province: [], //省
      city: [], //市
      area: [], //区
      provinceVal: "",
      cityVal: "",
      areaVal: "",

      //当前组织
      currentOrg: {
        orgNo: "",
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        address: "",
        belongOrgId: "",
        province: "",
        city: "",
        area: "",
        children: [],
        areaIds: ""
      },
      linkPhone: "",

      saveCurrentOrg: {
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        address: "",
        belongOrgId: "",
        province: "",
        city: "",
        area: "",
        areaIds: "",
        children: []
      },
      statusArr: "",
      orgVal: "", //新增组织value
      addShow: false,
      parentId: "",
      buttonKey: true, // 组织btn  v-show

      tableData: [],
      orgName: "",

      total: 0,
      currentPage: 1,
      pagesize: 8,

      roleInf: {
        key: false,
        type: "",
        id: "",
        parentId: "",
        belongOrgId: ""
      },
      roleInfC: {
        key: false,
        type: "",
        id: "",
        parentId: "",
        belongOrgId: ""
      },
      roleInf1: {
        key: false,
        id: ""
      },
      orgId: "",
      collecOrg: "",
      collecOrgArr: [],
      crumsData: {
        one: "用户管理",
        two: "组织机构"
      },
      areaIndex: ""
    };
  },
  computed: {
    ...mapState(["power"])
  },

  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["set_power"]),
    /**
     * @Author fyt
     * @Description init初始化
     * @Date 2020-03-05 16:27:49 星期四
     */
    init() {
      this.getOrgList();
      this.getPower();
    },

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
              console.log("省", data1);
            } else if (len === 2) {
              VM.city = data1;
              console.log("市", data1);
            } else if (len === 3) {
              VM.area = data1;
              console.log("区", data1);
            } else {
              console.log("无数据");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /**
     * @Author fyt
     * @Description 选择省
     * @Date 2020-03-03 11:39:43 星期二
     */
    selectProvince(data) {
      this.areaIndex = data.area_code;
      this.cityVal = "";
      this.areaVal = "";
      this.city = [];
      this.area = [];
      this.getArea(this.areaIndex, 2);
    },

    /**
     * @Author fyt
     * @Description 选择市
     * @Date 2020-03-03 11:39:57 星期二
     */
    selectCity(data) {
      this.areaIndex = `${data.area_index},${data.area_code}`;
      this.getArea(this.areaIndex, 3);
      // console.log(data);
    },

    /**
     * @Author fyt
     * @Description  选择区
     * @Date 2020-03-03 11:40:14 星期二
     */
    selectArea(data) {
      this.currentOrg.areaIds = `${data.area_index},${data.area_code}`;
      console.log(data);
    },

    /**
     * @Author fyt
     * @Description 点击编辑 编辑组织
     * @Date 2020-02-28 10:30:29 星期五
     */
    editOrg() {
      this.isRead = !this.isRead;
      let areaIds = this.currentOrg.areaIds;
      if (this.Disabled) {
        let areaIdArr = areaIds.split(",");
        this.getArea(`${areaIdArr[0]},${areaIdArr[1]}`, 3);
      } else {
        this.province = [];
        this.city = [];
        this.area = [];

        this.getArea("", 1);
      }
    },
    /**
     * @Author fyt
     * @Description 放弃编辑
     * @Date 2020-02-28 10:30:53 星期五
     */
    giveUp() {
      this.getCurOrg(this.currentOrg.id);

      // this.currentOrg = this.saveCurrentOrg;
      // console.log(this.currentOrg);
      // console.log(this.saveCurrentOrg);

      this.editOrg();
    },
    /**
     * @Author fyt
     * @Description 重置省市区
     * @Date 2020-03-05 17:13:43 星期四
     */
    resetArea() {},
    /**
     * @Author fyt
     * @Description 保存编辑
     * @Date 2020-02-28 10:31:13 星期五
     */
    save() {
      let VM = this;
      // let status;
      if (
        !this.currentOrg.orgName ||
        !this.currentOrg.linkman ||
        !this.currentOrg.linkPhone ||
        !this.currentOrg.area ||
        !this.provinceVal ||
        !this.cityVal ||
        !this.areaVal
      ) {
        VM.$Message.error(`编辑内容不能为空`);
        return;
      }

      // if (this.statusArr == "禁用") {
      //   status = 0;
      // } else if (this.statusArr == "启用") {
      //   status = 1;
      // }

      let { orgName, linkman, address, areaIds } = this.currentOrg;

      let params = {
        linkman,
        orgName,
        areaIds,
        address
      };
      if (this.linkPhone != this.currentOrg.linkPhone) {
        params.linkPhone = this.linkPhone;
      }
      console.log(params);

      this.$http.api
        .put(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${VM.currentOrg.id}`,
          params
        )
        .then(function(res) {
          console.log(res);
          if (res.data.code === 0) {
            VM.$Message.success(`编辑成功`);
            VM.isRead = true;
            VM.getCurOrg(VM.currentOrg.id);
            VM.getOrgList("edit");
          } else {
            VM.$Message.error(`${res.data.msg}`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 新增下级组织
     * @Date 2020-02-28 10:31:47 星期五
     */
    addNextOrg() {
      this.roleInfC.id = this.currentOrg.id;
      this.roleInfC.parentId = this.currentOrg.parentId;
      this.roleInfC.belongOrgId = this.currentOrg.orgId;

      let areaIds = this.currentOrg.areaIds;
      if (this.currentOrg.parentId == "") {
        this.sonDisabled = false;
        this.$refs.addC.getArea("", 1);
      } else {
        this.sonDisabled = true;

        if (areaIds) {
          let areaIdArr = areaIds.split(",");
          this.$refs.addC.getArea(`${areaIdArr[0]},${areaIdArr[1]}`, 3);
          this.$refs.addC.provinceVal = this.currentOrg.province;
          this.$refs.addC.cityVal = this.currentOrg.city;
        }
      }
      this.roleInfC.key = true;
    },
    /**
     * @Author fyt
     * @Description 查看某一组织的数据
     * @Date 2020-02-28 10:32:11 星期五
     */
    choseOne(data) {
      let data1 = data;
      if (data) {
        this.getCurOrg(data.id);
        this.isRead = true;
        if (data.children) {
          this.tableData = data.children;
          this.tableData.forEach((item, index) => {
            item.index = index + 1;
          });
        } else {
          this.tableData = [];
        }

        // if (data.status == "0") {
        //   this.statusArr = "禁用";
        // } else if (data.status == "1") {
        //   this.statusArr = "启用";
        // }
      }
    },
    /**
     * @Author fyt
     * @Description 获取当前数据
     * @Date 2020-02-28 10:32:28 星期五
     */
    getOrgList(DATA) {
      let VM = this;
      let newArr = [];
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

      // VM.tableData = VM.data1[0].children;
      // VM.currentOrg = VM.data1[0];
      // if (VM.currentOrg.status == "0") {
      //   this.statusArr = "禁用";
      // } else if (VM.currentOrg.status == "1") {
      //   this.statusArr = "启用";
      // }

      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations?flag=1`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;

            if (DATA && DATA == "edit") {
              console.log("更新1");
              newArr.push(data);
              VM.data1 = newArr;
            } else if (DATA) {
              console.log("更新2");
              newArr.push(data);
              VM.data1 = newArr;
              VM.findOrgById(newArr, DATA);
            } else {
              console.log("初始化");
              newArr.push(data);
              VM.data1 = newArr;
              VM.getCurOrg(data.id);
              VM.tableData = data.children;
              VM.tableData.forEach((item, index) => {
                item.index = index + 1;
              });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 获取当前组织
     * @Date 2020-03-06 15:36:06 星期五
     */
    getCurOrg(data) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${data}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data1 = res.data.result;
            VM.currentOrg = data1;
            VM.linkPhone = data1.linkPhone;
            VM.provinceVal = data1.province;
            VM.cityVal = data1.city;
            VM.areaVal = data1.area;

            VM.Disabled = VM.currentOrg.parentId == "" ? false : true;
            // console.log("Disabled", VM.Disabled);
            // if (data1.status == "0") {
            //   VM.statusArr = "禁用";
            // } else if (data1.status == "1") {
            //   VM.statusArr = "启用";
            // }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 每次新增，编辑，删除机构后
     * @Date 2020-02-28 10:33:31 星期五
     */
    findOrgById(data, id) {
      if (data.length == 0) {
        return;
      } else {
        data.forEach(item => {
          if (item.id == id) {
            this.tableData = item.children;
            this.tableData.forEach((item, index) => {
              item.index = index + 1;
            });
          } else {
            this.findOrgById(item.children, id);
          }
        });
      }
    },
    /**
     * @Author fyt
     * @Description 删除某个机构
     * @Date 2020-02-28 10:34:55 星期五
     */
    deleteItem(data) {
      let VM = this;
      // console.log("currentOrg", VM.currentOrg);
      this.$http.api
        .delete(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${data}`,
          VM.currentOrg
        )
        .then(function(res) {
          console.log(res);
          if (res.data.code === 0) {
            VM.$Message.success(`删除成功`);
            VM.getOrgList(VM.currentOrg.id);
          } else {
            VM.$Message.error(`删除失败`);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /**
     * @Author fyt
     * @Description 改变每页显示条数
     * @Date 2020-02-28 10:35:53 星期五
     */
    handleSizeChange(size) {
      this.pagesize = size;
    },
    /**
     * @Author fyt
     * @Description 跳到某一页
     * @Date 2020-02-28 10:36:04 星期五
     */
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //  console.log(this.userdata)
    },
    /**
     * @Author fyt
     * @Description 编辑下级机构
     * @Date 2020-02-28 10:36:21 星期五
     */
    handleClick(data) {
      this.roleInf1.id = this.currentOrg.id;
      this.roleInf1.key = true;
      this.roleInf1.parentId = data.parentId;
      this.roleInfC.belongOrgId = data.belongOrgId;
      this.$refs.edit.getInf(data.id);
    },
    /**
     * @Author fyt
     * @Description 确认删除(下级组织)
     * @Date 2020-02-28 10:36:43 星期五
     */
    handleAdd1(data) {
      // console.log(data)
      this.tipsData.key = true;
      this.tipsData.id = data.id;
      this.tipsData.value = "机构,及该机构下的所有用户!";
    }
  },
  components: {
    MCrums,
    MMadd,
    MMedit,
    MMaddC,
    MDelete
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/userMange/organizational.scss";
</style>
