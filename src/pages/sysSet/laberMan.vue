<template>
  <div class="label-wrapper">
    <m-delete :con="tipsData" />
    <div class="label-con">
      <m-crums :con="crumsData" />
      <div class="shoot-inp">
        <div class="inp-con">
          <label for="five">
            <span>新增标签</span>
            <input type="text" class="inp" v-model="label" />
          </label>
        </div>
        <div class="inp-con">
          <button class="addDec" @click="addLabel">新增</button>
        </div>
      </div>
      <ul class="tag-box">
        <li class="tag-item" v-for="(item,index) in tagArr" :key="index">
          <span class="left">{{item.value}}</span>
          <span class="right">
            <span class="edit" @click="edit(index,item)">
              <Icon type="md-create" />
              <span class="edit-w">编辑</span>
            </span>
            <span class="delete" @click="handleClick(item)">
              <Icon type="md-close" />
            </span>
          </span>
          <span class="add" v-if=" i == index">
            <input type="text" name id class="inp" v-model="editValue" />
            <span @click="save">保存</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MDelete from "@/components/ms/delete.vue";
import * as URL from "@/plugins/env.js";
export default {
  props: {},
  data() {
    return {
      i: null,
      label: "",
      crumsData: {
        one: "系统设置",
        two: "标签管理"
      },
      tagArr: [],
      editId: "",
      editValue: "",
      tipsData: {
        key: false,
        id: "",
        value: "标签"
      }
    };
  },
  computed: {},
  created() {
    this.getCategorys();
  },

  methods: {
    //编辑保存
    save() {
      let VM = this;
      let reg = /^[0-9]*$/g;
      if (this.editValue) {
        let key1 = reg.test(this.editValue);
        if (key1) {
          this.$Message.error("标签不能为数字!");
          return;
        }
      }

      if (this.editValue.length > 6) {
        this.$Message.error("标签字符长度超过6!");
        return;
      }
      if (this.editId && this.editValue) {
        let params = {
          description: "类型描述",
          cValue: `_tag_/${this.editValue}`
        };
        this.$http.api
          .put(
            window.BASEURL.testUrl1 +
              `/parent-police/api/v1/categorys/${VM.editId}`,
            params
          )
          .then(function(res) {
            console.log(res);
            if (res.data.code === 0) {
              // console.log(res);
              VM.$Message.success("保存成功");
              VM.i = null;
              VM.getCategorys();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        VM.$Message.error("请编辑");
      }
    },
    //增加标签
    addLabel() {
      let VM = this;
      let reg = /^[0-9]*$/g;
      if (this.label) {
        let key1 = reg.test(this.label);
        if (key1) {
          this.$Message.error("标签不能为数字!");
          return;
        }
      }

      let params = [];
      if (this.label.length > 6) {
        this.$Message.error("标签长度多长!");
        return;
      }

      let obj = {
        cKey: "_tag_",
        description: "类型描述"
      };
      if (this.label) {
        obj.value = this.label;
        obj.cValue = `_tag_/${this.label}`;
        params.push(obj);
        this.$http.api
          .post(
            window.BASEURL.testUrl1 + `/parent-police/api/v1/categorys`,
            params
          )
          .then(function(res) {
            if (res.data.code === 0) {
              // console.log(res);
              VM.$Message.success("添加成功");
              VM.label = "";
              VM.getCategorys();
            } else {
              if (!res.data.result) {
                VM.$Message.error(`${res.data.msg}`);
              } else {
                VM.$Message.error(`${res.data.msg},${res.data.result}`);
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        VM.$Message.error("请输入添加标签");
      }
    },
    edit(data, it) {
      this.i = data;
      this.editId = it.id;
      // console.log(this.editId);
    },
    handleClick(data) {
      this.tipsData.key = true;
      this.tipsData.id = data.id;
    },
    deleteItem(data) {
      let VM = this;
      this.$http.api
        .delete(
          window.BASEURL.testUrl1 + `/parent-police/api/v1/categorys/${data}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            // console.log(res);
            VM.$Message.success("删除成功");
            VM.getCategorys();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCategorys() {
      //获取标签
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/api/v1/categorys`)
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.datas;
            console.log(data);
            VM.tagArr = data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    MCrums,
    MDelete
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/sysSet/laberMan.scss";
</style>
