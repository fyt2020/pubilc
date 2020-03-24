<template>
  <div class="home__wrapper" id="home__wrapper">
    <!-- <canvas id="canvas__bg"></canvas> -->
    <div class="home__nav">
      <m-time />
      <img src="../../assets/img/home/title.png" alt class="nav__title" />
    </div>

    <div class="home__content">
      <div class="home__contentW">
        <div class="homeCon__left">
          <div class="homeConL__photoes">
            <div class="shoot__inp">
              <span class="shoot__w">一键采集</span>
              <div class="inp-con">
                <el-dropdown class="home__dropdown">
                  <span class="el-dropdown-link">
                    {{shootVal}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item,index) in options3"
                      :key="index"
                      @click.native="choseOrg(item)"
                    >{{item.orgName}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>

            <div class="homeConL__imgBox">
              <img
                src="../../assets/img/home/shoot.png"
                alt
                :class="['shootImg',{'active':showBtn1}]"
                @mouseenter="() => {showBtn1 = false}"
              />
              <!-- <img
                src="../../assets/img/home/shootdown.png"
                alt
                class="shootImg1"
                v-show="!showBtn1"
                @mouseleave="() => {showBtn1 = true}"
              />-->
              <span :class="['shootImg__w',{'active':showBtn1}]">人像采集</span>
              <div :class="['homeConL__imgMain',{'active':mainKey}]">
                <img :src="`${imgUrl}/${imgMain.imageUrl}`" alt class="imgMain" v-if="imgMain"/>
                <img :src="imgMain2" alt class="imgMain" v-if="imgMain2"/>
              </div>
              <div class="homeConL__imgWBox">
                <ul class="homeConL__imgWait" v-if="imgWait.length > 0" >
                  <li class="imgWait__box" v-for="(item,index) in imgWait" :key="index">
                    <img :src="`${imgUrl}/${item.imageUrl}`" alt class="imgWait" />
                  </li>
                </ul>
                <ul class="homeConL__imgWait" v-if="imgWait2.length > 0" >
                  <li class="imgWait__box" v-for="(item,index) in imgWait2" :key="index">
                    <img :src="item" alt class="imgWait" />
                  </li>
                </ul>
              </div>
            </div>
            <div class="homeConL__info">
              <span class="homeConL__name">{{info.useName}}</span>
              <span class="homeConL__name">{{info.sex}}</span>
              <span class="homeConL__name">{{info.orgName}}</span>
            </div>
          </div>
          <div class="homeConL__progress">
            <img src="../../assets/img/home/big.png" alt class="progressImg" />
            <img
              src="../../assets/img/home/ai3d.png"
              alt
              :class="['shootImg',{'active':showBtn2}]"
              @mouseenter="() => {showBtn2 = false}"
            />
            <!-- <img
              src="../../assets/img/home/ai3ddown.png"
              alt
              class="shootImg1"
              v-show="!showBtn2"
              @mouseleave="() => {showBtn2 = true}"
            />-->
            <span :class="['shootImg__w',{'active':showBtn2}]">AI3D建模</span>
            <div class="speed__wrap">
              <ul class="homeConLspeed__box">
                <li class="speed__item" v-for="(item,index) in speedData" :key="index">
                  <div class="top">
                    <span class="logo"></span>
                    <span class="speed__name">{{item.name}}</span>
                    <span class="speed__name">{{item.status}}</span>
                    <span class="speed__name">{{item.address}}</span>
                  </div>
                  <div class="bottom">
                    <span class="speed__timeY">{{item.dateY}}</span>
                    <span class="speed__time">{{item.date}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="homeConL__shootNum">
            <div class="homeConL__left">
              <img src="../../assets/img/home/small.png" alt class="shootNum__BG" />
              <span class="left__title">今日采集</span>
              <span :class="['left__num',{'active':nowKey}]">{{fromData.nowShootNum}}</span>
            </div>
            <div class="homeConL__left">
              <img src="../../assets/img/home/small.png" alt class="shootNum__BG" />
              <span class="left__title">昨日采集</span>
              <span class="left__num active">{{fromData.yesShootNum}}</span>
            </div>
          </div>
        </div>
        <div class="homeCon__mid">
          <div class="homeConM__model">
            <span class="model__title">人像模型</span>
            <!-- <img src="../../assets/img/home/1111.gif" alt=""> -->
            <div class="modelAear__wrap">
              <img src="../../assets/img/home/cri.png" alt class="modelAear__cri" id />
              <div :class="['modelAear',{'loading':modelLoading}]">
                <Spin v-if="modelLoading" class="spin"></Spin>
                <div id="home__WebGL"></div>
              </div>
            </div>

            <!-- <div class="face__loader">
                <div class="modelAear__face1">
                   <div class="modelAear__circle"></div>
                  
                </div>
                 <div class="modelAear__face2">
                   <div class="modelAear__circle"></div>
                </div>
            </div>-->
          </div>
          <div class="homeConM__num">
            <div class="homeConM__left">
              <span class="right__title">三维人像总数</span>
              <span class="right__num">{{fromData.modelNum}}</span>
            </div>
            <div class="homeConM__right">
              <span class="right__title">人像入库数</span>
              <div id="home__demo1"></div>
            </div>
          </div>
        </div>
        <div class="homeCon__right">
          <div class="homeConR__recg">
            <div class="shoot__inp">
              <span class="shoot__w">大角度人脸识别</span>
              <div class="inp-con">
                <el-dropdown class="home__dropdown">
                  <span class="el-dropdown-link">
                    {{mainTask}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item,index) in taskData"
                      :key="index"
                      @click.native="choseTask(item)"
                    >{{item.name}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div
              class="recg__box"
              v-loading="isloading"
              element-loading-text="连接中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.9)"
            >
              <img
                src="../../assets/img/home/recg.png"
                alt
                :class="['shootImg',{'active':showBtn3}]"
                @mouseenter="() => {showBtn3 = false}"
              />
              <!-- <img
                src="../../assets/img/home/recgdown.png"
                alt
                class="shootImg1"
                v-show="!showBtn3"
                @mouseleave="() => {showBtn3 = true}"
              />-->
              <span :class="['shootImg__w',{'active':showBtn3}]">大角度人脸识别</span>
              <img :src="`data:image/png;base64,${imgBody}`" alt class="img__recg" v-if="imgBody" />
              <div class="recg__detail" v-show="recgShow">
                <div class="recg__detailLeft">
                  <img
                    :src="`data:image/png;base64,${resultData.facePic}`"
                    alt
                    class="recgImg"
                    v-if="resultData.facePic"
                  />
                </div>
                <div class="recg__detailMin">
                  <span class="recg__name">{{resultData.username}}</span>
                  <span class="likely">相似度:{{resultData.likely}}%</span>
                </div>
                <div class="recg__detailRight">
                  <img
                    :src="`data:image/png;base64,${resultData.angle_pic}`"
                    alt
                    class="recgImg"
                    v-if="resultData.angle_pic"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="homeConR__body">
            <img
              src="../../assets/img/home/face.png"
              alt
              :class="['shootImg',{'active':showBtn4}]"
              @mouseenter="() => {showBtn4 = false}"
            />
            <!-- <img
              src="../../assets/img/home/facedown.png"
              alt
              class="shootImg1"
              v-show="!showBtn4"
              @mouseleave="() => {showBtn4 = true}"
            />-->
            <span :class="['shootImg__w',{'active':showBtn4}]">人像特征</span>

            <img src="../../assets/img/home/peo2.gif" alt class="Rbody__charImg" />
            <div
              :class="['Rbody__charData',{'active':ischange,'noActive':!ischange}]"
              v-if="charData.length > 0"
            >
              <ul class="charData__box">
                <li
                  class="charData__item"
                  v-for="(item,index) in charData"
                  :key="index"
                >{{item.name}}{{item.data}}厘米</li>
              </ul>
            </div>
          </div>
          <div class="homeConR__shootNum">
            <div class="homeConR__left">
              <img src="../../assets/img/home/small.png" alt class="shootNum__BG" />
              <span class="left__title">识别任务数</span>
              <span class="left__num">{{taskTotal}}</span>
            </div>
            <div class="homeConR__right">
              <span class="right__title">识别成功数</span>
              <div id="home__demo2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MTime from "@/components/ms/time.vue";
export default {
  props: {},
  data() {
    return {
      showBtn1: false,
      showBtn2: false,
      showBtn3: false,
      showBtn4: false,

      shootVal: "全部",
      orgId: "", //采集单位

      //采集数据
      fromData: {
        orgName: "",
        nowShootNum: 0,
        yesShootNum: 0,
        modelNum: 0
      },

      //人物信息
      info: {
        useName: "邓超",
        orgName: "上海市青浦区派出所",
        sex: "男"
      },

      imgMain: null, //主图
      imgWait: [],
      imgMain2: null, //主图
      imgWait2: [],

      mainKey: false,
      modelLoading: true, //模型加载
      options3: [], //采集单位
      animationId: null,
      animationId1: null,
      bgTimer: null,

      renderer: null, //渲染器构建
      scene: null, //场景构建
      modelObj: null, //模型文件
      camera: null, //场景相机
      controls: null, //控制器
      objLoader: null,

      speedData: [], //采集信息列表
      tableData: [], //采集照片列表

      modelList: [], //模型列表
      modelIndex: 0, //展示当前模型索引
      modelTimer: null, //定时器
      meshList:[],//加载的模型

      taskData: [], //识别任务
      taskTotal: 0, //识别任务总数
      mainTask: "无", //正在认识的任务
      taspUrl: "", //正在认识的任务地址
      isloading: true, //识别正在连接
      imgBody: "", //实时流

      ischange: false, //人脸特征切换
      charNumData: null,

      //人脸特征点
      charData: [],

      //识别数据
      resultData: {
        username: "",
        angle_pic: "",
        facePic: "",
        likely: 0
      },
      webSocket1: "", //采集数据
      webSocket2: "", //视频流
      nowKey: false, //数字动画锁

      imgUrl: "",
      id: "", //模型id
      recgShow: false, //识别目标key

      //识别成功数实时数据
      xAxisDate: [],
      yAxisDate: [],
      option: {
        color: ["#ffa028"],
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{c}"
        // },
        grid: {
          left: 50
        },
        xAxis: {
          type: "category",
          offset: 5,
          data: [],
          axisLabel: {
            rotate: 0,
            color: "#74520f"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            lineStyle: {
              color: "#74520f",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          splitNumber: 2,
          minInterval: 1,
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: true, //显示坐标轴线
            color: "#74520f",
            lineStyle: {
              color: "#74520f",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#74520f"
            }
          }
        },

        series: [
          {
            data: [],
            type: "bar",
            barWidth: "10",

            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    { offset: 0, color: "#0e0d12" },
                    { offset: 0.6, color: "#726019" },
                    { offset: 1, color: "#724918" }
                  ],
                  false
                ),
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#36dbf9",
                    fontSize: 12
                  }
                }
              },
              emphasis: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    { offset: 0, color: "#0e0d12" },
                    { offset: 0.6, color: "#ffdd28" },
                    { offset: 0.7, color: "#ffbe28" },
                    { offset: 1, color: "#ffa028" }
                  ],
                  false
                )
              }
            }
          }
        ]
      },
      myChart: null,
      isLeaved: false,//是否离开该页面
      refreshTimer:null,
    };
  },
  watch: {
    xAxisDate(newValue, oldValue) {
      if (newValue) {
        // console.log(newValue)
      }
    },
    yAxisDate(newValue, oldValue) {
      if (newValue) {
        // console.log(newValue)
        this.option.series[0].data = newValue;
        this.myChart.setOption(this.option);
      }
    }
  },

  created() {
    this.init();
    this.modelIndex = 0;
    this.modelTimer = null;
  },
  mounted() {
    this.launchFullscreen(document.documentElement);
    //this.initCanvas();
  },
  beforeDestroy() {
    let VM = this;
    window.cancelAnimationFrame(VM.animationId);
    window.clearTimeout(VM.modelTimer);
    window.clearInterval(this.bgTimer);
    window.clearInterval(this.refreshTimer);

    this.modelIndex = 0;
    this.modelTimer = null;
    this.animationId = null;
    this.bgTimer = null;
    this.isLeaved = true;

    VM.clearRenderer();
    THREE.Cache.clear();
    this.webSocket1.close();
    this.webSocket2.close();
  },
  methods: {
    /**
     * @Author fyt
     * @Description 初始化数据
     * @Date 2020-03-04 14:55:07 星期三
     */
    init() {
      window.cancelAnimationFrame(this.animationId);
      this.imgUrl = window.BASEURL.imgUrl;
      THREE.Cache.clear();
      this.INIT(468, 468);
      this.getHistoryData();
      this.getCollectionData();
      this.getShootList();
      this.getTask();
      this.getOrg();
      this.getInitRecg();
      this.startBg();
      this.onRefresh();
      this.initSocket1(window.BASEURL.testUrl1);
    },
    /**
     * @Author fyt
     * @Description 获取模型列表
     * @Date 2020-03-04 14:55:20 星期三
     */
    getModelList() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `/parent-police/api/v1/modelsFace?pageNum=${1}&pageSize=${12}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.data;
            let feature = res.data.result.feature;
            feature.forEach((item, index) => {
              item.forEach((v, i) => {
                v.data = parseFloat(v.data).toFixed(2);
              });
            });
            VM.modelList = data;
            // console.log(VM.modelList);
            VM.charNumData = feature;
            VM.changeModel();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    

    //改变模型
    changeModel(data) {
      let VM = this;
      if (VM.modelTimer != null) {
        window.clearTimeout(VM.modelTimer);
        VM.modelTimer = null;
      }
      if (VM.modelIndex != VM.modelList.length) {
        //console.log('VM.modelIndex', VM.modelIndex)
        VM.createMolde(
          VM.modelList[VM.modelIndex].id,
          VM.modelList[VM.modelIndex].source,
          VM.onProgress,
          VM.onError
        );
        VM.modelIndex = VM.modelIndex + 1;
        VM.modelTimer = window.setTimeout(VM.changeModel, 10000);
      } else {
        window.clearTimeout(VM.modelTimer);
        VM.modelIndex = 0;
        VM.modelTimer = null;
        if (!VM.isLeaved) {
          VM.getModelList();
        }
      }
    },
    //初始化模型
    INIT(width, height) {
      let VM = this;
      //场景构建
      VM.scene = new THREE.Scene();
      //相机构建
      VM.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000); //四个参数 视场角 方向 最近距 最远距  fov对应着图中的视角，是上下两面的夹角。aspect是近平面的宽高比。
      // camera.lookAt( new THREE.Vector3(0, 0, 0));
      //渲染器构建
      VM.renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        preserveDrawingBuffer: false
      });
      VM.modelLoading = false;
      //设置背景颜色
      VM.renderer.setClearColor(0x000000, 0);
      //三个参数 width height updateStyle第三个选填
      VM.renderer.setSize(width, height);
      //激活阴影
      VM.renderer.shadowMapEnabled = true;
      //添加材质灯光阴影
      var ambiColor = "ffffff";
      var ambientLight = new THREE.AmbientLight(ambiColor);
      VM.scene.add(ambientLight);

      //添加坐标系
      // var axes = new THREE.AxisHelper(100);
      // scene.add(axes);

      //添加网格
      // var helper = new THREE.GridHelper( 1000, 50 ,0x0000ff, 0xff8080);
      // scene.add(helper);

      VM.controls = new THREE.OrbitControls(VM.camera, VM.renderer.domElement);
      //controls.target = new THREE.Vector3(0, 0, 0);
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      VM.controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      VM.controls.dampingFactor = 0.25;
      //是否可以缩放
      VM.controls.enableZoom = false;
      //是否自动旋转
      VM.controls.autoRotate = false;
      //设置相机距离原点的最近距离
      //controls.minDistance = 200;
      //设置相机距离原点的最远距离
      //controls.maxDistance = 600;
      //是否开启右键拖拽
      VM.controls.enablePan = false;
      //上下旋转范围
      VM.controls.minPolarAngle = 0;
      VM.controls.maxPolarAngle = Math.PI * (90 / 180);
      //左右旋转范围
      VM.controls.minAzimuthAngle = -Math.PI * (360 / 180);
      VM.controls.maxAzimuthAngle = Math.PI * (360 / 180);

      VM.controls.panSpeed = 0.2;
      VM.controls.rotateSpeed = 0.1;
      //模型
      //var onProgress = function(xhr) {
      // if (xhr.lengthComputable) {
      //   //可计算的长度
      //   var percentCompvare = (xhr.loaded / xhr.total) * 100; //加载程度百分比
      //   var elem = document.getElementById("myBar");
      //   var width = parseInt(percentCompvare);
      //   elem.style.width = width + "%";
      //   $(".loading").text("正在下载:" + parseInt(percentCompvare) + "%");
      // }
      //};
      //var onError = function(xhr) {
      // $(".loading")
      //   .show()
      //   .text("下载失败");
      //return;
      //};
      //VM.objLoader =  new THREE.OBJLoader2();
      this.getModelList();
    },
    onProgress(xhr) {},
    onError(xhr) {},
    //生成模型
    createMolde(data, source,callbackOnProgress, callbackonError) {

      console.log('id',data)
      console.log('source',source)

      let VM = this;

      if (!this.camera || !this.renderer || !this.scene || !this.controls) {
        //  console.log('场景没有初始化');
        return;
      }

      if (this.modelObj) {
        window.cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.removeEntity(this.modelObj);
        this.clearScene();
      }

      //模型路径
      var modelPath = `${data}_ai3d`;
      var objLoader = new THREE.OBJLoader2();
      var callbackOnLoad = function(event) {
        VM.modelObj = event.detail.loaderRootNode;
        VM.camera.position.z = 130;
        VM.camera.position.y = 0;
        VM.camera.position.x = 70;
        VM.modelObj.name = `${data}`;
        VM.modelObj.scale.set(1.9, 1.9, 1.9);
        VM.modelObj.children[0].geometry.computeBoundingBox();
        VM.modelObj.rotation.x = THREE.Math.degToRad(88);
        VM.modelObj.rotation.y = THREE.Math.degToRad(181);
        VM.modelObj.rotation.z = THREE.Math.degToRad(150);//203
        VM.modelObj.children[0].geometry.center();

        //边框
        // var border =  new THREE.BoxHelper(modelObj, 0xffffff);
        // scene.add(border);

        console.log('modelObj',VM.modelObj);


        VM.meshList.push(VM.modelObj);
        VM.scene.add(VM.modelObj);
        VM.ischange = true;
        VM.charData = VM.charNumData[VM.modelIndex];
      };

      let typeObj = source == "1" ? "textured" : "cut";

      if(source == "1"){
       console.log('加载15');
      objLoader.loadMtl(
        window.BASEURL.oss + modelPath + `/${typeObj}_mesh.mtl`,
        null,
        function(materialCreator) {
          materialCreator[`${typeObj}_mesh`].opacity = 1; // new THREE.Color(1,1,1)
          var materialCreator = {
            textured_mesh: {}
          };
          var texture = THREE.ImageUtils.loadTexture(
            window.BASEURL.oss + modelPath + `/${typeObj}_mesh.jpg`,
            {},
            function() {
              VM.renderer.render(scene, camera);
            }
          );
          var material = new THREE.MeshLambertMaterial({
            map: texture
          });
          materialCreator["textured_mesh"] = material;
          objLoader.setMaterials(materialCreator);
          objLoader.setLogging(true, true);
          objLoader.load(
            window.BASEURL.oss + modelPath + `/${typeObj}_mesh.obj`,
            callbackOnLoad,
            onProgress,
            onError,
            null,
            false
          );
        }
      );
      }else if(source == "0"){
        console.log('加载30')
        objLoader.loadMtl(
        window.BASEURL.oss + modelPath + `/${typeObj}_mesh.mtl`,
        null,
        function(materialCreator) {
          materialCreator[`${typeObj}_mesh`].opacity = 1; // new THREE.Color(1,1,1)
          // var materialCreator = {
          //   textured_mesh: {}
          // };
          // var texture = THREE.ImageUtils.loadTexture(
          //   URL.ossUrl + modelPath + "/cut_mesh.jpg",
          //   {},
          //   function() {
          //     VM.renderer.render(scene, camera);
          //   }
          // );
          // var material = new THREE.MeshLambertMaterial({
          //   map: texture
          // });
          // materialCreator["textured_mesh"] = material;

          objLoader.setMaterials(materialCreator);
          objLoader.setLogging(true, true);
          objLoader.load(
            window.BASEURL.oss + modelPath + `/${typeObj}_mesh.obj`,
            callbackOnLoad,
            callbackOnProgress,
            callbackonError,
            null,
            false
          );
        }
      );
         
      }
      VM.camera.lookAt(VM.scene.position);
      //在页面上添加渲染器，dom元素
      $("#home__WebGL").append(VM.renderer.domElement);

      renderScene();

      function renderScene() {
        if (VM.animationId != null) {
          window.cancelAnimationFrame(VM.animationId);
          VM.animationId = null;
        }

        if(VM.modelObj){
            let deg = THREE.Math.radToDeg(VM.modelObj.rotation._z);
            if (deg >= -30 && deg < 90 || deg == 150) {
             VM.modelObj.rotateZ(0.0035);
            //  console.log(deg);
            }
        }
        VM.controls.update();
        VM.camera.updateProjectionMatrix();
        VM.animationId = requestAnimationFrame(renderScene); //请求动画框架
        VM.renderer.render(VM.scene, VM.camera);
      }
    },
    

  // 从scene中删除模型并释放内存
    clearScene(){
      let len = this.meshList.length;
       if (len > 0) {
        for (var i = 0; i < len; i++) {
          let currObj = this.meshList[i];
          //console.log('currObj',currObj)
          // 判断类型
          if (currObj instanceof THREE.Scene) {
            // console.log('Scene1')
            var children = currObj.children;
            for (var i = 0; i < children.length; i++) {
              this.deleteGroup(children[i]);
            }
          } else {
            this.deleteGroup(currObj);
          }
          this.scene.remove(currObj);
         }
        }
    },
    // 删除group，释放内存
    deleteGroup(group) {
      if ( !group ) return;
      // 删除掉所有的模型组内的mesh
      group.traverse(function(item) {
        if (item instanceof THREE.Mesh) {
          item.geometry.dispose(); // 删除几何体
          item.material.dispose(); // 删除材质
        }
      });
    },

    //移除模型
    removeEntity(object) {
      let selectedObject = this.scene.getObjectByName(object.name);
      // console.log('renderer.renderLists',this.renderer.renderLists)
      selectedObject.traverse(function(item) {
        if (item instanceof THREE.Mesh) {
          item.geometry.dispose(); //删除几何体
          //item.material.dispose(); //删除材质
          if(Array.isArray(item.material)){
               item.material.forEach(function (i) {
               i.dispose(); //删除材质
             })
          }else{
            item.material.dispose(); 
          }
        }
      });
      this.scene.remove(selectedObject);
      this.renderer.dispose();
      this.renderer.clear();
      this.renderer.renderLists.dispose();
      this.modelObj = null;
      THREE.Cache.clear();
      this.ischange = false;
    },
    

    //折线图
    createEcharts1(data) {
      let xdata = [],
        ydata = [];
      data.forEach(item => {
        let newArr = item.date.split("-");
        let str = newArr[1] + "/" + newArr[2];
        ydata.push(item.num);
        xdata.push(str);
      });
      if (document.getElementById("home__demo1") == null) {
        return;
      }
      var myChart = this.$echarts.init(document.getElementById("home__demo1"));
      myChart.setOption({
        xAxis: {
          offset: 2,
          type: "category",
          boundaryGap: false,
          data: xdata,
          axisLabel: {
            rotate: 0,
            color: "#74520f"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            lineStyle: {
              color: "#74520f"
              //width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          // max:200,
          // min: 1,
          // splitNumber: 2,
          minInterval: 1, 
          axisTick: {
            show: false
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: true, //显示坐标轴线
            color: "#ffa028",
            lineStyle: {
              color: "#74520f",
              width: 1 //这里是为了突出显示加上的
            }
          },
          // minInterval: 10,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#74520f"
            }
          }
        },
        series: [
          {
            data: ydata,
            type: "line",
            smooth: true,
            //symbol: true,
            lineStyle: {
              normal: {
                color: "#ffa028"
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#36dbf9",
                    fontSize: 12
                  }
                }
              }
            },
            // itemStyle : {
            //   normal:
            //    {
            //       label: {
            //       show: true, //开启显示
            //       position: "top", //在上方显示
            //       textStyle: {
            //         //数值样式
            //         color: "#36dbf9",
            //         fontSize: 12
            //       }
            //     }
            //   }
            // },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#ffa028 " },
                  { offset: 1, color: "#000000" }
                ])
              }
            }
          }
        ]
      });
    },
    //柱状图
    createEcharts3(data1, data2) {
      let VM = this;
      if (document.getElementById("home__demo2") == null) {
        return;
      }
      this.myChart = this.$echarts.init(document.getElementById("home__demo2"));
      this.option.xAxis.data = this.xAxisDate;
      this.option.series[0].data = this.yAxisDate;
      this.myChart.setOption(this.option);
    },
    //昨日采集+建模成功数
    getCollectionData() {
      let VM = this;
      let mStartTime, mEndTime;
      mStartTime = new Date().getTime();
      mEndTime = mStartTime - 604800000;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/collectionData`)
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "SUCCESS") {
            let data = res.data.result;
            VM.fromData.modelNum = data[3].modelNum.num;
            VM.fromData.yesShootNum = data[5].lastDayNum.num;
            VM.fromData.nowShootNum = data[0].dayCollectionNum.num;
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/collectionTrend?mStartTime=${mEndTime}&mEndTime=${mStartTime}`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "SUCCESS") {
            let data = res.data.result;
            // console.log(data)
            data.forEach((item, index) => {
              if (item.modelingNum) {
                // console.log(item.modelingNum);
                VM.createEcharts1(item.modelingNum);
              }
            });
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //实时识别任务
    getTask() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 +
            `/face-task-manager/api/v1/tasks?taskType=1&pageNum=${1}&pageSize=${10}`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            if (res.data.result.total) {
              VM.taskTotal = res.data.result.total;
            } else {
              VM.taskTotal = 0;
            }

            let data = res.data.result.list;
            if (data && data.length > 0) {
              VM.taskData = data;
              VM.mainTask = data[0].name;
              VM.taspUrl = data[0].java_addr;

              VM.initSocket2(VM.taspUrl);
            } else {
              VM.taskData = [];
            }
            // console.log(VM.taskData);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择实时任务
    choseTask(data) {
      this.webSocket2.close();
      this.isloading = true;
      this.recgShow = false;
      this.taspUrl = data.java_addr;
      this.mainTask = data.name;
      this.imgBody = "";
      this.initSocket2(this.taspUrl);
    },
    //采集数据推送
    initSocket1(data) {
      let url = `ws://${data.split("//")[1]}parent-police/websocket`;
      // 没有参数的情况:接口
      // let url1 = 'ws://localhost:9998'
      this.webSocket1 = new WebSocket(url);
      this.webSocket1.onopen = this.webSocketOnOpen;
      this.webSocket1.onclose = this.webSocketOnClose;
      this.webSocket1.onmessage = this.webSocketOnMessage;
      this.webSocket1.onerror = this.webSocketOnError;
    },
    //建立连接成功后的状态
    webSocketOnOpen() {
      console.log("websocket1连接成功");
    },
    //获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      // res就是后台实时传过来的数据
      let VM = this;
      let data = JSON.parse(res.data);
      let dayCollectionNum = data.dayCollectionNum;
      let modelInfo = data.modelInfo;
      let collectTask = data.collectTask;
      if (dayCollectionNum) {
        VM.nowKey = true;
        VM.fromData.nowShootNum++;
        setTimeout(() => {
          VM.nowKey = false;
        }, 1500);
      }
      if (modelInfo) {
        let newArr = modelInfo.split(" ");
        let str1 = `<li class="speed__item active">
                  <div class="top">
                    <span class="logo"></span>
                    <span class="speed__name">${newArr[0]}</span>
                    <span class="speed__name">${newArr[1]}</span>
                    <span class="speed__name">${newArr[2]}</span>
                  </div>
                  <div class="bottom">
                    <span class="speed__timeY">${newArr[3]}</span>
                    <span class="speed__time">${newArr[4]}</span>
                  </div>
                </li>`;
        $(".homeConLspeed__box").prepend(str1);
      }

      if (
        (collectTask && this.shootVal == "全部") ||
        (collectTask && collectTask.orgId == this.orgId)
      ) {
        let newMain = "";
        newMain = this.imgMain;
        let str = `<li class="imgWait__box active">
                      <img src="${this.imgUrl}/${newMain.imageUrl}" alt class="imgWait" />
                     </li>`;
        $(".homeConL__imgWait").prepend(str);
        this.imgMain = collectTask;
        this.mainKey = true;
        setTimeout(() => {
          VM.mainKey = false;
        }, 1000);
        this.info.useName = collectTask.username;
        this.info.sex = collectTask.sex;
        this.info.orgName = collectTask.orgName;
      }
    },
    //关闭连接
    webSocketOnClose() {
      console.log("websocket1连接已关闭");
    },
    //连接失败的事件
    webSocketOnError(res) {
      console.log("websocket1连接失败");
      //打印失败的数据
    },
    //视频流1
    initSocket2(data) {
      let url = `ws://${data}/police-recognition/websocket`;
      // 没有参数的情况:接口
      // let url1 = 'ws://localhost:9998'
      this.webSocket2 = new WebSocket(url);
      this.webSocket2.onopen = this.webSocketOnOpen2;
      this.webSocket2.onclose = this.webSocketOnClose2;
      this.webSocket2.onmessage = this.webSocketOnMessage2;
      this.webSocket2.onerror = this.webSocketOnError2;
    },
    //建立连接成功后的状态
    webSocketOnOpen2() {
      console.log("websocket2连接成功");
    },
    //获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage2(res) {
      // res就是后台实时传过来的数据
      let data = JSON.parse(res.data);
      let VM = this;
      let key1 = false;
      let rtsp_imgBody = data["rtsp_img"];
      let recg_result = data["recg_result"];
      let recg_num = data["recg_num"];
      // console.log(data)
      if (rtsp_imgBody) {
        this.imgBody = rtsp_imgBody.body;
        this.isloading = false;
      } else {
        this.isloading = true;
      }
      if (recg_num) {
        let i,
        newData = [];
        newData = VM.yAxisDate;
        VM.yAxisDate = [];
        VM.xAxisDate.forEach((item, index) => {
          if (item == recg_num.X) {
            i = index;
            newData[i]++;
            VM.yAxisDate = newData;
          }
        });
        // console.log('recg_num',recg_num);
        // console.log('VM.yAxisDate:',VM.yAxisDate);
      }
      if (!recg_result) {
        return;
      } else {
        this.isloading = false;
        this.recgShow = true;
        this.resultData.username = recg_result.username;
        this.resultData.facePic = recg_result.facePic;
        this.resultData.angle_pic = recg_result.angle_pic;
        this.resultData.likely = this.likely(recg_result.possibility * 100);
      }
    },
    //相似度函数
    likely(data) {
      let newdata = Math.floor(data);
      if (newdata >= 100) {
        return newdata - 10;
      }
      return newdata;
    },
    //关闭连接
    webSocketOnClose2() {
      console.log("websocket2连接已关闭");
    },
    //连接失败的事件
    webSocketOnError2(res) {
      console.log("websocket2连接失败");
      // 打印失败的数据
    },
    clearRenderer() {
      let VM = this;
      VM.renderer.dispose();
      VM.renderer.forceContextLoss();
      VM.renderer.context = null;
      VM.renderer.domElement = null;
      VM.renderer = null;
    },
    //全屏
    launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    //获取初始识别成功数
    getInitRecg() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl2 + `/face-task-manager/api/v1/recgData?type=1`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result;
            VM.xAxisDate = data.X;
            VM.yAxisDate = data.Y;
            VM.createEcharts3();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //获取组织
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
            if (data.length > 0) {
              let obj = {
                orgId: "",
                orgName: "全部"
              };
              data.unshift(obj);
              VM.options3 = data;
            } else {
              VM.$Message.error(`没有采集单位`);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择组织
    choseOrg(data) {
      this.shootVal = data.orgName;
      if (data.orgId == "") {
        this.orgId = "";
      } else {
        this.orgId = data.orgId;
      }
      this.getShootList();
    },
    //采集历史数据
    getHistoryData() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/message?pageNum=1&pageSize=5`
        )
        .then(function(res) {
          if (res.status === 200 && res.data.code == 0) {
            let data = res.data.result.list;
            data.forEach((item, index) => {
              let msgInfo = item.msgInfo;
              let newArr = msgInfo.split(" ");
              let obj = {};
              obj.name = `${newArr[0]}`;
              obj.status = `${newArr[1]}`;
              obj.address = `${newArr[2]}`;
              obj.dateY = `${newArr[3]}`;
              obj.date = `${newArr[4]}`;
              VM.speedData.push(obj);
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //采集数据
    getShootList() {
      let VM = this;
      this.$http.api
        .get(
          window.BASEURL.testUrl1 +
            `parent-police/api/v1/tasks?pageNum=${1}&pageSize=${10}&orgId=${
              VM.orgId
            }`
        )
        .then(function(res) {
          if (res.data.code === 0) {
            let data = res.data.result.list;

            console.log(data);
            if (data.length > 3) {
              VM.tableData = data;
              VM.imgMain2 = null;
              VM.imgWait2 = [];
              VM.imgMain = data[0];
              VM.info.useName = VM.imgMain.username;
              VM.info.sex = VM.imgMain.sex;
              VM.info.orgName = VM.imgMain.orgName;
              VM.imgWait = data.slice(1, 4);
              // VM.imgMain = null;
              // VM.imgWait = [];
            } else if (data.length == 3) {
                VM.imgMain = data[0];
                VM.imgWait = [];
                VM.imgMain2 = null;
                VM.info.useName = VM.imgMain.username;
                VM.info.sex = VM.imgMain.sex;
                VM.info.orgName = VM.imgMain.orgName;
                VM.imgWait2 = [`${imgUrl}/${data[1].imageUrl}`,
               `${imgUrl}/${data[2].imageUrl}`,
                require("@/assets/img/home/defaultImg.jpg")];
            
            } else if (data.length == 2) {

                VM.imgMain = data[0];
                VM.imgWait = [];
                VM.imgMain2 = null;

                VM.info.useName = VM.imgMain.username;
                VM.info.sex = VM.imgMain.sex;
                VM.info.orgName = VM.imgMain.orgName;

                VM.imgWait2 = [`${imgUrl}/${data[1].imageUrl}`,
                require("@/assets/img/home/defaultImg.jpg"),
                require("@/assets/img/home/defaultImg.jpg")];
            } else if (data.length == 1) {
                VM.imgMain = data[0];
                VM.imgWait = [];
                VM.imgMain2 = null;

                VM.info.useName = VM.imgMain.username;
                VM.info.sex = VM.imgMain.sex;
                VM.info.orgName = VM.imgMain.orgName;

                VM.imgWait2 = [require("@/assets/img/home/defaultImg.jpg"),
                require("@/assets/img/home/defaultImg.jpg"),
                require("@/assets/img/home/defaultImg.jpg")];
             
            } else if (data.length == 0) {

                VM.imgMain = null;
                VM.imgWait = [];
                VM.imgMain2 = require("@/assets/img/home/mainDefault.jpg");
                VM.info.useName = '无';
                VM.info.sex = '无';
                VM.info.orgName = '无';
                VM.imgWait2 = [require("@/assets/img/home/defaultImg.jpg"),
                require("@/assets/img/home/defaultImg.jpg"),
                require("@/assets/img/home/defaultImg.jpg")];
              
            }

            // console.log(data);
            // console.log(VM.imgWait);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //监听bg旋转角度
    startBg() {
      if (this.bgTimer != null) {
        window.clearInterval(this.bgTimer);
        this.bgTimer = null;
      }
      this.bgTimer = window.setInterval(this.getBgMatrix, 1000);
    },
    //获取bg旋转角度
    getBgMatrix(a, b, c, d, e, f) {
      let VM = this;
      let material = $(".modelAear__cri")
        .css("transform")
        .split("(")[1]
        .split(")")[0]
        .split(",");
      let aa = Math.round((180 * Math.asin(material[0])) / Math.PI);
      let bb = Math.round((180 * Math.acos(material[1])) / Math.PI);
      let cc = Math.round((180 * Math.asin(material[2])) / Math.PI);
      let dd = Math.round((180 * Math.acos(material[3])) / Math.PI);
      let deg = 0;
      if (aa == bb || -aa == bb) {
        deg = dd;
      } else if (-aa + bb == 180) {
        deg = 180 + cc;
      } else if (aa + bb == 180) {
        deg = 360 - cc || 360 - dd;
      }
      deg >= 360 ? 0 : deg;

      if (deg >= 300 && deg <= 330) {
        this.showBtn1 = true;
        setTimeout(() => {
          VM.showBtn1 = false;
        }, 3000);
      }
      if (deg >= 230 && deg <= 260) {
        this.showBtn2 = true;
        setTimeout(() => {
          VM.showBtn2 = false;
        }, 3000);
      }
      if (deg >= 50 && deg <= 80) {
        this.showBtn3 = true;
        setTimeout(() => {
          VM.showBtn3 = false;
        }, 3000);
      }
      if (deg >= 120 && deg <= 165) {
        this.showBtn4 = true;
        setTimeout(() => {
          VM.showBtn4 = false;
        }, 3000);
      }

      //console.log(deg)
    },
    onRefresh(){
      let VM = this;
          this.refreshTimer = setInterval(()=>{
                 window.location.reload();
                 VM.launchFullscreen(document.documentElement);

          },600000)
    }
 

  },
  components: {
    MTime
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/home/home.scss";
</style>
