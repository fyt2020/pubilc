<template>
  <div class="m-wrapper">
    <div class="model-wrapper">
      <m-crums :con="crumsData" />
      <div class="shoot-inp">
        <div class="inp-con">
          <el-tooltip content="请输入2-20位中文或英文" placement="bottom">
                  <label for="thr">
                    <span class="must">姓名</span>
                    <input
                      type="text"
                      id="thr"
                      class="inp"
                      v-model="people"
                      @blur="handleBlur"
                      autocomplete="off"
                      placeholder="姓名"
                    />
                  </label>
                </el-tooltip>
        </div>

        <div class="inp-con">
            <el-tooltip content="18位身份证号或9位护照号" placement="bottom">
                  <label for="four">
                    <span class="must">证件号</span>
                    <input
                      @input="onInput"
                      type="text"
                      id="four"
                      class="inp"
                      v-model="idNo"
                      @blur="handleBlur1"
                      autocomplete="off"
                      placeholder="证件号"
                    />
                  </label>
                </el-tooltip>
        </div>

        <div class="inp-con">
          <label for="five">
            <span class="must">采集单位</span>
            <el-select v-model="orgin" placeholder="请选择">
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
          <button class="addDec1" @click="rearch">查询</button>
        </div>
      </div>
      <div class="dec-list">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row>
          <el-table-column prop="index" label="序号" width="80" height="40" align="center"></el-table-column>
          <el-table-column prop="sourceName" label="数据来源" width="100" height="40" align="center"></el-table-column>
          <el-table-column prop="collectNo" label="采集编号" width="180" height="40" align="center"></el-table-column>
          <el-table-column prop="username" label="姓名" width="100" height="40" align="center"></el-table-column>
          <el-table-column prop="idNo" label="证件号" width="180" height="40" align="center"></el-table-column>
          <el-table-column prop="time" label="采集时间" height="40" width="180" align="center"></el-table-column>
          <el-table-column prop="orgName" label="采集单位" width="180" height="40" align="center"></el-table-column>
          <!-- <el-table-column  prop="tag" label="标签" width="150" height="40" align="center">
              <template slot-scope="scope">
                 <span >{{scope.row.tag.length == 0 ? "" : scope.row.tag.join(',')}}</span>
              </template>
          </el-table-column> -->
          <el-table-column
            prop="modelStatusCname"
            label="建模状态"
            width="180"
            height="40"
            align="center"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="300" height="40" align="center">
            <template slot-scope="scope">
              <el-button class="btn" type="text" size="small" @click="handleUp(scope.row)" v-if="scope.row.status == 3">优先处理</el-button>
                <el-button
                @click="handleTo(scope.row)"
                type="text"
                size="small"
                class="btn"
              >查看</el-button>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                class="btn"
              >删除</el-button>
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
          :page-sizes="[10]"
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
import * as URL from "@/plugins/env.js";
export default {
  components: {
    MCrums
  },
  created() {
    this.getModelList();
    this.getOrg();
  },
  data() {
    return {
      people: "", //被采集人
      orgin: "", //采集机构
      orgId: "",
      idNo: "",
      options2: [],
      crumsData: {
        one: "AI3D建模",
        two: "建模列表"
      },
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total:0,
    };
  },
  computed: {
    userdata: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods: {
    _stateFormat1(row,colum){
       console.log(row.tag)
    },
    getOrg() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/farsee2/api/v1/organizations`)
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
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/tasks?stateGroup=0&username=${VM.people}&orgId=${VM.orgId}&idNo=${VM.idNo}&pageNum=${this.currentPage}&pageSize=${this.pagesize}`)
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
    selectOrg(data) {
      this.orgId = data.orgId;
    },
    rearch() {
      let VM = this;
      // if (!this.people && !this.orgId && !this.idNo) {
      //   VM.$Message.error("查询信息不能为空!");
      //   return;
      // }
      this.currentPage =1;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/tasks?stateGroup=0&username=${VM.people}&orgId=${VM.orgId}&idNo=${VM.idNo}&pageNum=${this.currentPage}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            // console.log(res);
            let data = res.data.result.list;
            let len = data.length;
            if( len <= 0 ){
              VM.$Message.error("没有该任务!");
              VM.tableData = [];
              VM.total = 0;
              return;
            }
            VM.$Message.success("查询成功!");
            data.forEach((item, index) => {
              item["index"] = index + 1;
            });
            VM.total = res.data.result.total;
            VM.tableData = data;
            //VM.people = "";
            VM.orgId = "";
            //VM.idNo = "";
            VM.orgin = "";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClick(data) {
      this.deleteItem(data.id);
    },
    handleTo(data){
      console.log(data.id);
      localStorage.setItem('id', JSON.stringify(data.id));
      this.$router.push({
        name: "faceDetalis",
        params: { id: data.id }
      });
    },
    deleteItem(id) {
      let sure = window.confirm("确认删除？");
      if (!sure) {
        return;
      }
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
      console.log(data);
      let VM = this;
      let params = { flag: 1 };
      this.$http.api
        .put(window.BASEURL.testUrl1 + `parent-police/api/v1/tasks/${data.id}`, params)
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
      this.getModelList()
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getModelList()
      //  console.log(this.userdata)
    },

    handleBlur() {
      let reg = /^[\u4E00-\u9FA5]{2,20}$/g;
      let reg1 = /^[a-zA-Z\/ ]{2,20}$/g;
      let key = reg.test(this.fromData.username);
      let key1 = reg1.test(this.fromData.username);
      if (!key && !key1) {
        this.$Message.error("请输入2-20位中文或英文");
      }
    },
    handleBlur1() {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g;
      let key = reg.test(this.fromData.idNo);
      if (!key) {
        this.$Message.error("身份证填写有误");
      }
    },
    onInput(e){
         if(e.target.value.length > 18){
             e.target.value =  e.target.value.slice(0,18);
             this.idNo = e.target.value
         }
    
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/modelList/modelList.scss";
</style>
