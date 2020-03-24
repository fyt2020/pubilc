<template>
  <div class="im-box">
    <el-dialog
      title="权限编辑"
      :visible.sync="con.key"
      width="50%"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="editRole"
    >
      <div class="task-con">
        <m-rearchTip ref="rearchTip" />
        <!-- <el-tree
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          ref="roleTree"
          @check-change="handleCheckChange"
          show-checkbox
          :default-checked-keys="choosedRole"
          :render-content="renderContent"
        ></el-tree> -->

        <Tree
          :data="treeData"
          :class="demo-tree-render"
          show-checkbox
         
          @on-check-change="handleCheckChange"
        ></Tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp" class="dialogBtn">放弃</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MRearchTip from "@/components/ms/rearchSuss.vue";

export default {
  props: ["con"],
  data() {
    return {
      taskData: {
        rolename: "",
        description: "",
        type: 1
      },
      menuResourceList: [],
      resourceList: [],
      treeData: [],
      choosedRole: [],
      permissionList: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      changeflag: false,
      roleId: ""
    };
  },
  computed: {},
  created() {},
  mounted() {},

  methods: {
    /**
     * @Author fyt
     * @Description 改变最底层样式
     * @Date 2020-03-13 19:47:29 星期五
     */
    renderContent(h, { node, data, store }) {
      let classname = "";
      if (node.level == "3") {
        classname = "levelname";
        this.$nextTick(() => {
          var _levelname = document.getElementsByClassName("levelname");
          for (var i = 0; i < _levelname.length; i++) {
            _levelname[i].parentNode.style.cssFloat = "left"; //最底层的节点，包括多选框和名字都让他左浮动
            _levelname[i].parentNode.style.styleFloat = "left";
          }
        });
      }
      return (
        <span class={classname}>
             <span>{node.label}</span>             
        </span>
      );
    },
    /**
     * @Author fyt
     * @Description ivew
     * @Date 2020-03-13 17:54:31 星期五
     */
    handleCheckChange(arrData, curData) {
      if (this.changeflag) {
        console.log("curData", curData);
        if (curData) {
          this.permissionList.forEach(item => {
            if (item.menuid == curData.id) {
              if (curData.checked == true) {
                item.checked = "1";
              } else {
                item.checked = "0";
              }
              console.log(item);
            }
          });
          if (curData.children && curData.children.length > 0) {
            let children1 = curData.children;
            children1.forEach(i => {
              this.permissionList.forEach(v => {
                if (v.menuid == i.id) {
                  if (i.checked == true) {
                    v.checked = "1";
                  } else {
                    v.checked = "0";
                  }
                  console.log(v);
                }
              });
              if (i.children) {
                let children2 = i.children;
                children2.forEach(a => {
                  this.permissionList.forEach(b => {
                    if (b.menuid == a.id) {
                      if (a.checked == true) {
                        b.checked = "1";
                      } else {
                        b.checked = "0";
                      }
                      console.log(b);
                    }
                  });
                });
              }
            });
          }
        }
      }
    },

    /**
     * @Author fyt
     * @Description element
     * @Date 2020-03-16 14:46:27 星期一
     */

    // handleCheckChange(data, checked, indeterminate){

    //    console.log(data)
    //    console.log(checked)
    //    console.log(indeterminate)


    // },



    /**
     * @Author fyt
     * @Description 获取列表
     * @Date 2020-03-13 16:04:28 星期五
     */
    getList(data) {
      let VM = this;
      let newArr = [];
      this.$http.api
        .get(
          window.BASEURL.roleUrl +
            `/yyqxzx/api/v1/permissions?id=${data}&type=2`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.data;
            VM.menuResourceList = data.menuResourceList;
            VM.resourceList = data.resourceList;
            newArr = VM.dellDataToTree(
              data.menuResourceList,
              data.resourceList
            );
            console.log(newArr)
            VM.treeData = VM.extendTree(newArr);
            console.log(VM.treeData)
            VM.dellDataToFlan(VM.menuResourceList, VM.resourceList);
            VM.changeflag = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /**
     * @Author fyt
     * @Description   处理数据偏平
     * @Date 2020-03-15 14:26:17 星期天
     */

    dellDataToFlan(data1, data2) {
      if (data1.length > 0) {
        data1.forEach(item => {
          let { checked } = item;
          let obj1 = {
            checked,
            roleId: this.roleId,
            menuid: item.id
          };
          this.permissionList.push(obj1);
          if (item.children.length > 0) {
            item.children.forEach(i => {
              let { checked } = i;
              let obj2 = {
                checked,
                roleId: this.roleId,
                menuid: i.id
              };
              this.permissionList.push(obj2);
            });
          }
        });
      }

      if (data2.length > 0) {
        data2.forEach(item => {
          let { checked } = item;
          let obj1 = {
            checked,
            roleId: this.roleId,
            menuid: item.id
          };
          this.permissionList.push(obj1);
        });
      }
      // console.log(this.permissionList);
    },

    /**
     * @Author fyt
     * @Description 处理数据=>tree
     * @Date 2020-03-13 16:35:19 星期五
     */

    dellDataToTree(data1, data2) {
      if (data1.length > 0 && data2.length > 0) {
        data1.forEach(item => {
          item.level = "1";
          if (item.children && item.children.length > 0) {
            item.children.forEach(i => {
              let id = i.id;
              i.level = "2";
              i.children = [];
              data2.forEach(a => {
                a.level = "3";
                if (a.pcode == id) {
                  i.children.push(a);
                }
              });
            });
          }
        });
      } else if (data1.length > 0) {
      } else {
        console.log("参数不对");
      }
      return data1;
    },
    /**
     * @Author fyt
     * @Description 跟tree增加属性 checked
     * @Date 2020-03-15 17:50:37 星期天
     */
    extendTree(tree = []) {
      let arr = []
      if (!!tree && tree.length !== 0) {
        tree.map(item => {
          let obj = {};
          obj.title = item.name;
          obj.expand = true;
          obj.id = item.id;
          // obj.checked = item.checked === "1" ? true : false;
          obj.checked = (item.children && item.children.length > 0 || item.checked === "0") ? false : true;
          // if(!obj.checked){
          //   console.log(obj.title,obj.checked)
          // }
          obj.quence = item.quence ? item.quence :"";
          obj.pcode = item.pcode ? item.pcode :"";
          obj.children = item.children ? this.extendTree1(item.children) : ""
          arr.push(obj);
        });
      }
      return arr;
    },

    extendTree1(tree = []) {
      let arr = []
      if (!!tree && tree.length !== 0) {
        tree.map(item => {
          let obj = {};
          obj.title = item.name;
          obj.expand = true;
          obj.id = item.id;
          obj.checked = item.checked === "1" ? true : false;
          // if(!obj.checked){
          //   console.log(obj.title,obj.checked)
          // }
          obj.quence = item.quence ? item.quence :"";
          obj.pcode = item.pcode ? item.pcode :"";
          obj.children = item.children ? this.extendTree2(item.children) : ""
          arr.push(obj);
        });
      }
      return arr;
    },
    
    extendTree2(tree = []) {
      let arr = []
      if (!!tree && tree.length !== 0) {
        tree.map(item => {
          let obj = {};
          obj.title = item.name;
          obj.expand = true;
          obj.id = item.id;
          obj.checked = item.checked === "1" ? true : false;
          //   if(!obj.checked){
          //   console.log(obj.title,obj.checked)
          // }
      
          obj.quence = item.quence ? item.quence :"";
          obj.pcode = item.pcode ? item.pcode :"";
          obj.children = item.children ? this.extendTree(item.children) : ""
          arr.push(obj);
        });
      }
      return arr;
    },



    /**
     * @Author fyt
     * @Description 找到默认findChecked elementUi
     * @Date 2020-03-14 11:24:49 星期六
     *
     */

    findChecked(data1, data2) {
      let checkedArr = [];
      if (data1.length > 0 && data2.length > 0) {
        data1.forEach(item => {
          console.log( item.checked,typeof(item.checked),item.checked*1 === 1)
          if ( item.checked*1 === 1) {

            checkedArr.push(item.id);
           
          }
          if (item.children.length > 0) {
              item.children.forEach(i => {

                console.log( i.checked, typeof(i.checked),i.checked*1 === 1)
                if (i.checked*1 === 1) {
                  checkedArr.push(i.id);
                }
              });
            }
        });
        data2.forEach(item => {
           console.log( item.checked,typeof(item.checked),item.checked*1 === 1)
          if ( item.checked*1 === 1) {
            checkedArr.push(item.id);
          }
        });
      }

      return checkedArr;
    },

    save() {
      let VM = this;
      let params = {
        permissionList: this.permissionList,
        roleid: this.roleId
      };
      this.$http.api
        .post(
          window.BASEURL.roleUrl + `/yyqxzx/api/v1/permissions/roles`,
          params
        )
        .then(function(res) {
          if (res.data.code === 0) {
            VM.giveUp();
            VM.$Message.success("编辑成功!");
            window.history.go(0);
          } else {
            VM.$refs.rearchTip.toggleShow(
              "show",
              "error",
              true,
              res.data.msg,
              "-140px"
            );
            setTimeout(() => {
              VM.$refs.rearchTip.toggleShow("hidden", "", false, "", "");
            }, 1500);
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      console.log(this.permissionList);
    },
    handleClose() {
      this.$parent.dialogKey1.key = false;
      this.reSet();
    },
    giveUp() {
      this.$parent.dialogKey1.key = false;
      this.reSet();
    },
    /**
     * @Author fyt
     * @Description 重置数据
     * @Date 2020-03-15 12:47:42 星期天
     */

    reSet() {
      this.changeflag = false;
      this.menuResourceList = [];
      this.resourceList = [];
      this.treeData = [];
      this.choosedRole = [];
      this.permissionList = [];
    }
  },
  components: {
    MRearchTip
  }
};
</script>

<style scoped lang="scss">
.im-box {
  .task-con {
    width: 90%;
    height: 500px;
    overflow-y: auto;
    padding-left: 20px;
    position: relative;

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
        .inp {
          width: 190px;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border: 1px solid #e3e3e6;
          border-radius: 4px;
          outline: none;
        }
        #one1 {
          width: 350px;
          outline: none;
          vertical-align: middle;
          border: 1px solid #e3e3e6;
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
