<template>
  <div class="d-wrapper">
    <m-delete :con="tipsData" />
    <div class="device-wrapper">
      <m-crums :con="crumsData" />
      <div class="shoot-inp">
        <div v-if="power[5004]" class="shoot__right">
          <div class="inp-con">
            <label for="five">
              <span class="must">采集单位</span>
              <el-select v-model="belongTo" placeholder="请选择">
                <el-option
                  @click.native="selectOrg(item)"
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.orgName"
                  :value="item.orgName"
                ></el-option>
              </el-select>
            </label>
          </div>
          <div class="inp-con">
            <label for="five">
              <span class="must">设备型号</span>
              <el-select v-model="deviceModle" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </label>
          </div>
          <div class="inp-con">
            <label for="five">
              <span class="must">设备编号</span>
              <input type="text" class="inp" v-model="devSno" />
            </label>
          </div>

          <div class="inp-con">
            <button class="addDec1" @click="foundDec">查询</button>
          </div>
        </div>

        <div class="inp-con add" :class="{'zero':!power[5004]}">
          <button class="addDec" @click="goToAddDec">新增设备</button>
        </div>
      </div>

      <div class="dec-list">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
          <el-table-column prop="index" label="序号" width="80" height="40" align="center"></el-table-column>
          <el-table-column
            prop="deviceNo"
            label="设备编号"
            height="40"
            align="center"
            width="180"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="deviceVersion"
            label="设备型号"
            width="180"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.deviceVersion == "0" ? "雪山三号33" : "雪山三号15" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orgName"
            label="所属单位"
            width="180"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="所在场地"
            width="180"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="deviceStatusCname"
            label="设备状态"
            width="170"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="cRunStatus"
            label="运行情况"
            width="180"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.cRunStatus == '正常' ? "正常" : "不正常"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="placeTag"
            label="控场"
            width="180"
            height="40"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{scope.row.deviceVersion == '0' ? (scope.row.placeTag == 0 ? "未上传" : scope.row.place) :'/'}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180" height="40" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="wactch(scope.row)" class="btn" v-if="power[5005]">查看</el-button>

              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link drop">
                  更多
                  <Icon type="ios-arrow-down"></Icon>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleClick(scope.row)" class="drop">编辑</el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.deviceVersion == '0'">
                    <el-button
                      @click.stop="uploadFile(scope.row,$event)"
                      type="text"
                      size="small"
                      class="btn inp"
                    >
                      {{"上传"}}
                      <input
                        type="file"
                        hidden
                        @change="beforeUploadFile(scope.row,$event)"
                        name="file1"
                        :id="`upload-file${scope.row.id}`"
                        class="file-inp"
                      />
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item
                    class="drop"
                    @click.native="take(scope.row)"
                    v-if="scope.row.deviceStatusCname == '启用'&& scope.row.cRunStatus == '正常'"
                  >拍摄</el-dropdown-item>
                  <el-dropdown-item @click.native="handleDelete(scope.row)" class="drop" v-if="power[5006]">删除</el-dropdown-item>
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
export default {
  components: {
    MCrums,
    MDelete
  },
  created() {
    this.getDevicesList();
    this.getOrg();
    this.getPower();
  },
  computed: {
    ...mapState(["power"])
  },
  data() {
    return {
      devSno: "",
      deviceModle: "",
      belongTo: "",
      orgId: "",
      crumsData: {
        one: "人像采集",
        two: "拍摄设备"
      },
      deviceVersion: "",
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      options2: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "雪山三号15",
          label: "雪山三号15"
        },
        {
          value: "雪山三号33",
          label: "雪山三号33"
        }
      ],
      options3: [],
      tipsData: {
        key: false,
        id: "",
        value: "设备"
      }
    };
  },
  methods: {
    ...mapMutations(["changNow", "set_power"]),

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

    uploadFile(data, e) {
      let file = document.getElementById(`upload-file${data.id}`);
      file.click();
    },

    beforeUploadFile(data, e) {
      let VM = this;
      // console.log(data)
      let endName = e.target.files[0].name.split(".")[1];
      let startName = e.target.files[0].name.split(".")[0];

      if (data.deviceNo != startName) {
        VM.$Message.error("文件名应设置成设备编号!");
        return;
      }
      if (endName != "zip") {
        VM.$Message.error("文件类型为zip!");
        return;
      }

      VM.$http.api
        .put(
          window.BASEURL.oss + `parameters/` + e.target.files[0].name,
          e.target.files[0],
          {
            headers: { "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a" }
          }
        )
        .then(function(res) {
          // console.log(res);
          if (res.status == 201) {
            //  VM.$Message.error("上传成功!");
            VM.updata(startName, data.id);
          } else {
            VM.$Message.error("上传失败!");
          }
        })
        .catch(function(error) {
          VM.$Message.error(`上传失败!`);
          console.log(error);
        });
      // console.log(endName);
    },
    updata(data, id) {
      // console.log(data,id)
      let VM = this;
      let params = {
        place: data,
        placeTag: 1
      };
      this.$http.api
        .put(
          window.BASEURL.testUrl1 + `parent-police/api/v1/devices/${id}`,
          params
        )
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$Message.success("上传成功!");
            VM.getDevicesList();
          } else {
            VM.$Message.success("上传失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //编辑
    handleClick(data) {
      let id = data.id;
      this.$router.push({ name: "editDec", query: { id } });
      this.changNow({ val: 1 });
    },
    //查看
    wactch(data) {
      let id = data.id;
      this.$router.push({ name: "wactchDev", query: { id } });
      this.changNow({ val: 1 });
    },
    //拍照
    take(data) {
      let id = data.id;
      this.refresh();
      this.$router.push({ name: "shootC", query: { id } });
    },
    refresh() {
      let now = $(".nowNow");
      now.removeClass("nowNow");
    },
    handleDelete(data) {
      this.tipsData.key = true;
      this.tipsData.id = data.id;
    },
    //删除
    deleteItem(data) {
      let VM = this;
      this.$http.api
        .delete(
          window.BASEURL.testUrl1 + `parent-police/api/v1/devices/${data}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$Message.success("删除成功!");
            VM.getDevicesList();
          } else {
            VM.$Message.success("删除失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
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
            let obj = {
              orgId: "",
              orgName: "全部"
            };
            VM.options3 = data;
            VM.options3.unshift(obj);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询设备列表
    getDevicesList() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/devices?deviceNo=${VM.devSno}&orgId=${VM.orgId}&deviceVersion=${VM.deviceVersion}&pageNum=${this.currentPage}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            VM.total = res.data.result.total;
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            console.log(VM.tableData);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectOrg(data) {
      this.orgId = data.orgId;
    },
    foundDec() {
      let VM = this;
      switch (this.deviceModle) {
        case "全部":
          this.deviceVersion = "";
          break;
        case "雪山三号15":
          this.deviceVersion = "1";
          break;
        case "雪山三号33":
          this.deviceVersion = "0";
          break;
      }

      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/devices?deviceNo=${VM.devSno}&type=1&orgId=${VM.orgId}&deviceVersion=${VM.deviceVersion}&pageNum=${this.currentPage}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0 && res.data.result.list.length > 0) {
            let data = res.data.result.list;
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.tableData = data;
            VM.total = res.data.result.total;
            //VM.devSno = "";
            VM.orgId = "";
            //VM.deviceModle = "";
            VM.belongTo = "";
            VM.$Message.success("查询成功");
            // console.log(VM.tableData)
          } else {
            VM.$Message.error("没有该设备!");
            VM.tableData = [];
            VM.total = 0;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goToAddDec() {
      this.$router.push({ name: "addDec" });
      this.changNow({ val: 1 });
    },
    //改变每页显示条数
    handleSizeChange(size) {
      this.pagesize = size;
      this.getDevicesList();
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getDevicesList();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/portraitCollection/shootDevice.scss";
</style>
