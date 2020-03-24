<template>
  <div class="fm-wrapper">
    <m-delete :con="tipsData" />
    <div class="faceM-wrapper">
      <div class="faceM__nav">
        <m-crums :con="crumsData" />
        <div class="shoot-inp" v-if="power[5007]">
           <div class="inp-con">
            <label for="two">
              <span class="must">采集单位</span>
              <el-select v-model="orgName" placeholder="请选择" filterable>
                <el-option
                  @click.native="selectOrg(item)"
                  v-for="(item,index) in options3"
                  :key="index"
                  :value="item.orgName"
                ></el-option>
              </el-select>
            </label>
          </div>
           <div class="inp-con">
          
            <label for="five">
                <span class="must">采集时间</span>
                <!-- <el-date-picker v-model="startTime" type="datetime" placeholder="选择日期时间"></el-date-picker> -->
                <DatePicker
                  format="yy/M/d"
                  type="daterange"
                  :options="options2"
                  placement="bottom-end"
                  placeholder
                  class="data__picker"
                  v-model="dateVal"
                  @on-change="dataChange($event)"
                  @on-clear = "clear"
                ></DatePicker>
            </label>
             
          </div>
          <div class="inp-con">
            <label for="one">
              <span class="must">采集编号</span>
              <input
                type="text"
                id="one"
                class="inp"
                v-model="collectNo"
                placeholder
                autocomplete="off"
              />
            </label>
          </div>
          <div class="inp-con">
            <el-tooltip content="请输入2-20位中文或英文" placement="bottom">
              <label for="thr">
                <span class="must name">姓名</span>
                <input type="text" id="thr" class="inp inp1" v-model="username" autocomplete="off" />
              </label>
            </el-tooltip>
          </div>

          <div class="inp-con">
            <label for="five">
              <span class="must">选择性别</span>
              <el-select v-model="sex" placeholder="请选择" class="sex">
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
            <el-tooltip :content="type == 0 ? `18位身份证号`: `9位护照号`" placement="bottom">
              <label for="four">
                <span class="must">证件号码</span>
                <input
                  type="text"
                  id="four"
                  class="inp inp1"
                  @input="onInput"
                  v-model="idNo"
                  autocomplete="off"
                />
              </label>
            </el-tooltip>
          </div>
         
     
          <!-- <div class="inp-con">
            <label for="five">
              <span class="must">证件类型</span>
              <el-select v-model="idType" placeholder="请选择">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                   @click.native="selectIdType(item)"
                ></el-option>
              </el-select>
            </label>
          </div>-->

         <div class="inp-con search">
            <button class="addDec1" @click="foundFaceM">查询</button>
          </div>
        </div>
        <div class="shoot-inp">
            
            <!-- <div class="inp-con">
            <label for="five">
              <span class="must">建模状态</span>
              <el-select v-model="modelStatusVal" placeholder="请选择">
                <el-option
                  @click.native="selectStauts(item)"
                  v-for="(item,index) in modelStatus"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </label>
          </div> -->
       
         
         
          <!-- <div class="inp-con">
            <label for="five">
              <label for="five">
                <span class="must">结束时间</span>
        
                <el-date-picker v-model="endTime" type="datetime" placeholder="选择日期时间" @change="change"></el-date-picker>
              </label>
            </label>
          </div>-->

      
         
        </div>
      </div>

      <div class="model-img-war">
        <p class="model-title-box">
          <span class="model-title">模型预览</span>
          <!-- <img src="../../assets/img/img3/B-Ellipse.png" alt class="model__status" />
          <span class="model-item">建模成功</span>
          <img src="../../assets/img/img3/R-Ellipse.png" alt class="model__status" />
          <span class="model-item">建模失败</span>-->
        </p>
        <div class="model-img-box">
          <img
            src="../../assets/img/img3/bbbbbbb.png"
            alt
            class="model__bg"
            v-if="modelArr.length == 0"
          />
          <div
            class="model-item"
            v-for="(item,index) in modelArr"
            :key="item.id+index"
            @mouseenter="getIn(item.id)"
            @mouseleave="getOut(item.id)"
          >
            <div v-show="item.id == showKey" class="show__box">
              <button class="show__btn" @click="goDetails(item)">查看</button>
              <button class="show__btn" @click="goTop(item)" v-if="item.stickTime == 0">置顶</button>
              <button class="show__btn" @click="cancelTop(item)" v-if="item.stickTime != 0">取消置顶</button>
              <button class="show__btn detele" @click="deteleModel(item)" v-if="power[5008]">删除</button>
            </div>
            <p class="tag-box">
              <span :class="['tag-item']" v-if="item.stickTime != 0">置顶</span>
            </p>
            <img :src="`${imgUrl}/${item.imageUrl}`" alt class="model-item-img" />
            <p class="username">
              <el-tooltip class="item" effect="dark" :content="item.username" placement="top-start" v-if="item.username.length>5">
                   <span class="username__item">{{item.username}}</span>
              </el-tooltip>
                 <span class="username__item" v-else>{{item.username}}</span>
              <!-- <img src="../../assets/img/img3/B-Ellipse.png" alt v-if="item.status == 1" />
              <img src="../../assets/img/img3/R-Ellipse.png" alt v-if="item.status == 0" />-->
              
            </p>
          </div>
        </div>

        <div class="slot-box">
          <el-pagination
            class="slot"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[12,14]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCrums from "@/components/crums/crums.vue";
import MDelete from "@/components/ms/delete.vue";
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      modelArr: [], //模型列表
      modelArrLen: "", //模型总数
      startTime: "", //采集日期
      endTime: "",
      showTime:'',
      dateVal:'',
      status: 1, //建模状态
      username: "", //采集人
      collectNo: "", //采集编号
      idNo: "", //证件号
      sex: "", //性别
      type:'',//证件类型
      orgName:'',
      orgId:'',
      showKey: null,
      modelStatusVal: "",
      modelStatus: ["全部", "成功", "失败"], //建模状态
      idType:'身份证',
      options3:[],
      options4: [{type:0,name:`身份证`},{type:1,name:`护照`}],
      options: [{value: "请选择",label: "请选择"},{value: "男",label: "男"},{value: "女",label: "女"}],
      crumsData: {one: "三维人像库",two: "人像模型库"},
      currentPage: 1,
      pagesize: 14,
      total: 0,
      imgUrl: "",
      options2: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: "1 个星期",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3 个月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      tipsData:{
         key:false,
         id:'',
         value:'模型'
      },
    };
  },
  computed: {...mapState(["power"])},
    created() {
    this.imgUrl = window.BASEURL.imgUrl;
    this.getModelList();
    this.getOrg();
    this.getPower();

  },
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






    //  change(){
    //    if(this.startTime){
    //      let end,start;
    //      end = this.endTime.getTime();
    //      start = this.startTime.getTime();
    //       if(end < start){
    //            this.$Message.error("不能选择比开始时间更早的时间!");
    //            this.endTime = '';
    //       }
    //    }  
    //  },
    //清空
    clear(){
        this.startTime ="";
        this.endTime ="";
        console.log(this.startTime )
    },
    //监听事件变化
    dataChange(e){
      
     console.log(this.dateVal)
        
                
  
    },
    //获取组织
    getOrg() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `/parent-police/farsee2/api/v1/organizations`)
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
    //获取组织
    selectOrg(data){
      this.orgId = data.orgId;
    },
    selectIdType(data){
      this.type = data.type;
      this.idNo = ''
    },
    //获取模型列表
    getModelList() {
      let VM = this;
      // let startTime, endTime;
      // if (!this.startTime || !this.endTime) {
      //   startTime = this.startTime;
      //   endTime = this.endTime;
      // } else {
      //   startTime = this.startTime.getTime();
      //   endTime = this.endTime.getTime();
      // }
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/models?sex=${VM.sex}&collectNo=${VM.collectNo}&startTime=${this.startTime}&endTime=${this.endTime}&username=${VM.username}&status=${VM.status}&idNo=${VM.idNo}&stateGroup=1&pageNum=${this.currentPage}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            if (data) {
              VM.modelArr = data;
              VM.total = res.data.result.total;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deteleModel(data){
        this.tipsData.key = true;
        this.tipsData.id = data.id;
    },
    //删除模型
    deleteItem(data) {
      let VM = this;
        this.$http.api
          .delete(window.BASEURL.testUrl1 + `parent-police/api/v1/models/${data}`)
          .then(function(res) {
            if (res.data.code === 0) {
              VM.$Message.success("删除成功!");
              VM.getModelList();
            } else {
              VM.$Message.error("删除失败!");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      
    },
    //置顶
    goTop(data) {
      let newTime = new Date().getTime();
      let VM = this;
      let params = { stickTime: newTime };
      this.$http.api
        .put(window.BASEURL.testUrl1 + `parent-police/api/v1/models/${data.id}`, params)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$Message.success("置顶成功!");
            VM.getModelList();
          } else {
            VM.$Message.success("置顶失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //取消置顶
    cancelTop(data) {
      let newTime = new Date().getTime();
      let VM = this;
      let params = { stickTime: 0 };
      this.$http.api
        .put(window.BASEURL.testUrl1 + `parent-police/api/v1/models/${data.id}`, params)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.$Message.success("取消置顶成功!");
            VM.getModelList();
          } else {
            VM.$Message.success("取消置顶失败!");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      this.pagesize = size;
      this.getModelList();
    },
    //跳到某一页//
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getModelList();
    },
    //查询模型
    foundFaceM() {
      let VM = this;
      let reg = /^[\u4e00-\u9fa5_a-zA-Z_]{2,20}$/g;
      let reg2 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g;
      let reg3 = /^[a-zA-Z0-9]{9}$/g;//护照
      this.pageNum = 1;
      this.currentPage = 1;
    
      if(this.dateVal[0] ==  '' || this.dateVal[1] == ''){
         this.startTime = "";
         this.endTime = "";
      }else{
         this.startTime = this.dateVal[0].getTime();
         this.endTime= this.dateVal[1].getTime()+24*60*60*1000-1;
      }
      
      
      // let startTime, endTime;
      // if (this.endTime && !this.startTime) {
      //     this.$Message.error("请选择开始时间");
      //     return
      // } else if(!this.endTime && this.startTime){
      //   this.$Message.error("请选择结束时间");
      //   return
      // }else if(!this.endTime && !this.startTime){
      //   startTime = "";
      //   endTime = "";
      // }else{
      //   startTime = this.startTime.getTime();
      //   endTime = this.endTime.getTime();
      // }
      if(this.sex == "请选择"){
           this.sex = ""
      };
      let key = reg.test(this.username);
      let key2 = reg2.test(this.idNo);
      let key3 = reg3.test(this.idNo);
      if(this.type == 0){
        if (!key2&&this.idNo) {
        this.$Message.error("身份证填写有误");
        return
      }
      }else if(this.type == 1){   
      if (!key3&&this.idNo) {
        this.$Message.error("护照填写有误");
        return
        }
      }
      if (!key&&this.username) {
        this.$Message.error("请输入2-20位中文或英文");
        return
      }
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/models?orgId=${this.orgId}&stateGroup=1&type=${VM.type}&sex=${VM.sex}&collectNo=${VM.collectNo}&startTime=${this.startTime}&endTime=${this.endTime}&username=${VM.username}&status=${VM.status}&idNo=${VM.idNo}&pageNum=${VM.pageNum}&pageSize=${this.pagesize}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;
            let len = data.length;
            if (len <= 0) {
              VM.$Message.error("没有该模型!");
              VM.modelArr = [];
              VM.total = 0;
              return;
            } else {
              VM.$Message.success("查询成功");
            }
            VM.modelArr = data;
            VM.total = res.data.result.total;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
    selectStauts(data) {
      switch (data) {
        case "全部":
          this.status = "";
          break;
        case "成功":
          this.status = 1;
          break;
        case "失败":
          this.status = 0;
          break;
      }
  },
    getIn(data) {
      this.showKey = data;
    },
    getOut(data) {
      this.showKey = null;
    },
    goDetails(data) {
      if(data.source == '1'){
        this.$router.push({
        name: "modelShow",
        params: { id: data.id }
        });
      }else{
        this.$router.push({
        name: "faceDetalis",
        params: { id: data.id }
        });
      }
      localStorage.setItem("id", JSON.stringify(data.id));
      this.changNow({val:3})
    },
    onInput(e) {
      if(this.type == 0){
        if (e.target.value.length > 18) {
            e.target.value = e.target.value.slice(0, 18);
            this.idNo = e.target.value;
        }
        }else if(this.type == 1){
          if (e.target.value.length > 9) {
            e.target.value = e.target.value.slice(0, 9);
            this.idNo = e.target.value;
        }
    }
  }
},
  components: {
    MCrums,
    MDelete
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/3dHumDB/faceModel.scss";
</style>
