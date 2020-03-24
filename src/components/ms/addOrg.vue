<template>
  <div class="im-box">
    <el-dialog
      :title=" con.type == 'add' ? '新增组织': '编辑组织'"
      :visible.sync="con.key"
      width="25%"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="addOrg"
    >
      <div class="task-con">

        <div class="shoot-inp">
            <div class="inp-con">

                <input type="text" v-model="val" class="inp">
            </div>
           
        </div>
        <!-- <div class="shoot-inp">
          <div class="inp-con">
            <label for="one3">
              <span class="f-w">所属区域</span>
              <el-select class="org" v-model="area" @change="handleChange">
                <el-option
                  @click.native="selectArea(item)"
                  v-for="(item,index) in newArea"
                  :key="index"
                  :value="item.name"
                ></el-option>
              </el-select>
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one3">
              <span class="f-w">机构名称</span>
              <input type="text" id="one3" class="inp" v-model="orgData.orgName" autocomplete="off" />
            </label>
          </div>
          <div class="inp-con">
            <label for="one2">
              <span class="f-w">单位编码</span>
              <input type="text" id="one2" class="inp" v-model="orgData.orgId" autocomplete="off" />
            </label>
          </div>
        </div>
        <div class="shoot-inp">
          <div class="inp-con">
            <label for="one">
              <span class="f-w">负责人</span>
              <input type="text" id="one" class="inp" v-model="orgData.linkman" autocomplete="off" />
            </label>
          </div>
          <div class="inp-con">
            <label for="five">
              <span class="f-w">手机号</span>
              <input
                type="text"
                id="one1"
                class="inp"
                v-model="orgData.linkPhone"
                autocomplete="off"
              />
            </label>
          </div>
        </div>

        <div class="shoot-inp">
          <div class="inp-con1">
            <span class="f-w1">状态</span>
          </div>
          <div class="inp-con2">
            <RadioGroup v-model="statusArr">
              <Radio label="禁用"></Radio>
              <Radio label="启用"></Radio>
            </RadioGroup>
          </div>
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp" class="dialogBtn">放弃</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as URL from "@/plugins/env.js";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  props: ["con"],
  data() {
    return {
      options: regionData,
      val:'',
      selectedOptions: [],
      newArr: [],
      oldArea: "",
      area: "",
      newArea: [],
      statusArr: "",
      orgData: {
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        belongOrgId: "",
        area: ""
      },
      options3: [],
      city: [],
      province: []
    };
  },
  computed: {},
  created() {},

  methods: {
    getInf(data) {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations/${data}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            //   console.log(res)
            VM.area = res.data.result.area.split(" ")[0];
            VM.oldArea = res.data.result.area.split(" ")[0];
            let len = res.data.result.area.split(" ").length;

            // let newOne = `湖北省`;
            // let newObj = TextToCode[newOne];
            // let arr2 = [];
            // for (var prop in newObj) {
            //   let len = prop.length;
            //   if (prop.indexOf("市") == len - 1) {
            //     let obj = {};
            //     let arr22 = [];
            //     let newOBJ2 = TextToCode[newOne][prop];
            //     for (var p in newOBJ2) {
            //       let len = p.length;
            //       let obj = {};
            //       if (p.indexOf("区") == len - 1) {
            //         obj.name = p;
            //         arr22.push(obj);
            //       }
            //     }
            //     obj.name = prop;
            //     obj.children = arr22;
            //     arr2.push(obj);
            //   }
            // }
            // console.log(arr2);
            let one = "";
            let two = "";
            let three = "";
            if (len == 2) {
              VM.newArr = res.data.result.area.split(" ");
              one = res.data.result.area.split(" ")[0];
              two = "市辖区";
              three = res.data.result.area.split(" ")[1];
              let obj = TextToCode[one][two];

              for (var prop in obj) {
                let len = prop.length;
                if (prop.indexOf("区") == len - 1) {
                  let obj = {};
                  obj.name = prop;
                  VM.newArea.push(obj);
                }
              }

            } else {
              VM.newArr = res.data.result.area.split(" ");
              one = res.data.result.area.split(" ")[0];
              two = res.data.result.area.split(" ")[1];
              three = res.data.result.area.split(" ")[2];
              let obj = TextToCode[one][two];
              let obj1 = TextToCode[one][two][three];
              // console.log(obj1);
              for (var prop in obj) {
                let len = prop.length;
                if (prop.indexOf("区") == len - 1) {
                  let obj = {};
                  obj.name = prop;
                  VM.newArea.push(obj);
                }
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectArea(data) {
      this.area = this.oldArea + ` ${data.name}`;
    },
    handleChange(value) {
        // console.log(value)
      // let  str = '市辖区';
      // let  arr = [];
      // this.area = [];
      //  this.selectedOptions.forEach(item =>{
      //       arr.push(CodeToText[item])
      //  })
      //  arr.forEach(item =>{
      //         if(item.indexOf('辖') !== 1)
      //           this.area.push(item)
      //  })
      // console.log(this.selectedOptions)
    },

    save() {
      this.$parent.roleInf.key = false;
    },
    handleClose() {
      this.orgData = {
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        belongOrgId: "",
        area: ""
      };
      (this.selectedOptions = []), (this.$parent.roleInf.key = false);
    },
    giveUp() {
      this.orgData = {
        orgId: "",
        orgName: "",
        parentId: "",
        linkman: "",
        linkPhone: "",
        status: "",
        belongOrgId: "",
        area: ""
      };
      (this.selectedOptions = []), (this.$parent.roleInf.key = false);
    },
    add() {
      if (
        !this.orgData.orgName ||
        !this.orgData.linkman ||
        !this.orgData.orgId ||
        !this.orgData.linkPhone ||
        !this.statusArr
      ) {
        this.$message({
          message: "新增内容不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      if (this.area.length == 0) {
        this.$message({
          message: "所属区域不能为空",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
       if (this.area.length < 4 ) {
        this.$message({
          message: "请选择具体的所属区域",
          type: "warning",
          customClass: "zZindex"
        });
        return;
      }
      this.orgData.id = this.con.id;
      this.orgData.parentId = this.con.parentId;
      this.orgData.belongOrgId = this.con.belongOrgId;
      this.orgData.area = this.area;

      if (this.statusArr == "禁用") {
        this.orgData.status = 0;
      } else if (this.statusArr == "启用") {
        this.orgData.status = 1;
      }
     
      let VM = this;
      this.$http.api
        .post(
          window.BASEURL.testUrl1 +
            `parent-police/farsee2/api/v1/organizations`,
          VM.orgData
        )
        .then(function(res) {
          console.log(res);
          if (res.data.code === 0) {
            VM.$Message.success(`添加成功`);
            VM.$parent.roleInf.key = false;

            VM.$parent.getOrgList();
            VM.orgData = {
              orgId: "",
              orgName: "",
              parentId: "",
              linkman: "",
              linkPhone: "",
              status: "",
              belongOrgId: "",
              area: ""
            };
            VM.selectedOptions = [];
          } else {
            VM.$message({
              message: `${res.data.msg}`,
              type: "warning",
              customClass: "zZindex"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.im-box {
  .task-con {
    width: 100%;
    height: 50px;


    .shoot-inp {
      margin: 20px 0;
      display: flex;
      align-items: center;

      .inp-con {
        display: flex;
        align-items: center;
        margin-right: 36px;
        .f-w {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          margin-right: 10px;
          color: #252a2a;
        }
        .f-w1 {
          display: inline-block;
          width: 70px;
          text-align: right;
          font-size: 14px;
          margin-right: 15px;
          color: #252a2a;
        }
        .el-cascader {
          width: 190px;
        }
        .inp {
          width: 190px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
        }

        .addDec {
          outline: none;
          border: none;
          width: 88px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background: #2bd2a8;
          border-radius: 6px;
          margin-right: 20px;
        }
      }

      .inp-con1 {
        width: 70px;
        text-align: right;
        height: 50px;
        margin-right: 15px;
        padding-left: 15px;
      }

      .inp-con2 {
        width: 500px;
        height: 50px;
      }
    }
  }
}
</style>
