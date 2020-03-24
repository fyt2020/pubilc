<template>
  <div class="model__wrap" v-show="con.key">
    <!-- <el-dialog
      title="详情"
      :visible.sync="con.key"
      width="55%"
      center
      :close-on-click-modal="false"
      :before-close="handleClose"
      class="model"
    >-->
    <div class="model__content">
      <div class="title__modelBox">
        <span class="title__model">详情</span>
        <i class="el-icon-close" @click="handleClose"></i>
      </div>

     
      <div class="model__nav">
        <!-- <h3 class="model__h3">基础信息</h3> -->
        <div class="shoot-inp">

            <div class="inp-con">
            <label for="one">
              <span class="must">采集单位:</span>
               <el-tooltip class="item" effect="dark" :content="modelDetalis.orgName" placement="top-start">
              <span class="must orgName">{{modelDetalis.orgName}}</span>
              </el-tooltip>
            </label>
          </div>
           <div class="inp-con">
            <label for="one">
              <span class="must">姓名:</span>
               <el-tooltip class="item" effect="dark" :content="modelDetalis.username" placement="top-start">
              <span class="must name">{{modelDetalis.username}}</span>
              </el-tooltip>
            </label>
          </div>

            <div class="inp-con">
            <label for="one">
              <span class="must">性别:</span>
              <span class="must">{{modelDetalis.sex}}</span>
            </label>
          </div>
          
          <div class="inp-con">
            <label for="one">
              <span class="must">证件号码:</span>
              <span class="must">{{modelDetalis.idNo}}</span>
            </label>
          </div>
            <div class="inp-con">
            <label for="one">
              <span class="must">采集时间:</span>
              <span class="must">{{modelDetalis.time}}</span>
            </label>
          </div>
          <div class="inp-con">
            <label for="one">
              <span class="must">采集编号:</span>
              <span class="must">{{modelDetalis.collectNo}}</span>
            </label>
          </div>
          <div class="inp-con">
            <label for="one">
              <span class="must">数据来源:</span>
              <span class="must">{{modelDetalis.sourceName}}</span>
            </label>
          </div>
        

        


        

        
         

        
        </div>
      </div>

      <div class="model__main">
        <p class="main__nav">
          <span
            :class="['mainNav__item',{'active':key1}]"
            v-if="modelDetalis.source == '0' && modelDetalis.measStatus == 1"
            @click="goCen"
          >一正两侧</span>
          <span :class="['mainNav__item',{'active':key2}]" @click="goModel"  v-if="modelDetalis.status == '1'">人像模型</span>
          <span :class="['mainNav__item',{'active':key3}]" @click="goTake">拍摄照片</span>
        </p>

        <div class="main__con">
          <div class="left-con" v-show="key1&&modelDetalis.source == '0'">
            <div class="potho">
              <div class="same">
                <!-- <img :src="imgOne" alt id="one" class="img" /> -->
                <img :src="front" alt id="ONE" class="img" v-if="front" />
              </div>
              <div class="same">
                <!-- <img :src="imgOne" alt id="one" class="img" /> -->
                <img :src="left" alt id="TWO" class="img" v-if="left" />
              </div>
              <div class="same">
                <!-- <img :src="imgOne" alt id="one" class="img" /> -->
                <img :src="right" alt id="THR" class="img" v-if="right" />
              </div>
            </div>

            <p class="potho__info">
              <span class="potho__item">正面照</span>
              <span class="potho__item">左面照</span>
              <span class="potho__item">右面照</span>
            </p>
          </div>

          <div class="modelShow__wrap" v-show="key2">
            <div class="modelAear">
              <div id="WebGL-output2"></div>
            </div>
            <div class="WebGL-bg" v-if="status == 0">建模失败</div>
            <div class="WebGL-bg" v-if="status == 2">建模中</div>
            <div class="WebGL-bg" v-if="status == 3">排队中</div>
            <div class="modelInfo">
              <img src="../../assets/img/img3/identify.png" alt class="modelInfo__img" />
              <ul class="info__box" v-if="status == 1">
                <li v-for="(item,index) in charData" :key="index" class="info__item">
                  <span class="info__itemW">{{item.name}}</span>
                  <span class="info__itemW">{{new Number(item.data).toFixed(2)}}厘米</span>
                </li>
                <li />
              </ul>
            </div>
          </div>

          <div class="fDetalis-content-thr" v-show="key3">
            <div class="cen-box">
              <div
                class="img-box"
                :style="{backgroundImage:`url(${cenPath}) `,backgroundSize:`100% 100%`}"
                v-if="modelDetalis.source == '0'"
              ></div>
              <div
                class="img-box"
                :style="{backgroundImage:`url(${cenPath15}) `,backgroundSize:`100% 100%`}"
                v-if="modelDetalis.source == '1'"
              ></div>
              <div class="img-box" v-for="(item,index) in photo1" :key="item">
                <img :src="item" alt />
                <p class="cencen" v-if="modelDetalis.source == '0'">
                  <!-- <span class="cir"></span> -->
                  正面—{{index+1}}号摄像头
                </p>
                <p class="cencen" v-if="modelDetalis.source == '1'">
                  <!-- <span class="cir"></span> -->
                  {{index+1}}号摄像头
                </p>
              </div>
            </div>
            <div class="left-box" v-show="modelDetalis.source == '0'">
              <div
                class="img-box"
                :style="{backgroundImage:`url(${leftPath}) `,backgroundSize:`100% 100%`}"
              ></div>
              <div class="img-box" v-for="(item,index) in photo2" :key="item">
                <img :src="item" alt />
                <p class="cencen">
                  <!-- <span class="cir"></span> -->
                  左面—{{index+1}}号摄像头
                </p>
              </div>
            </div>
            <div class="right-box" v-show="modelDetalis.source == '0'">
              <div
                class="img-box"
                :style="{backgroundImage:`url(${rightPath2}) `,backgroundSize:`100% 100%`}"
              ></div>
              <div class="img-box" v-for="(item,index) in photo3" :key="item">
                <img :src="item" alt />
                <p class="cencen">
                  <!-- <span class="cir"></span> -->
                  右面—{{index+1}}号摄像头
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <span class="model__footer">
        <el-button @click="giveUp" class="dialogBtn">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span> -->
    </div>

    <!-- </el-dialog> -->
  </div>
</template>

<script>
import jsZip from "jszip";
export default {
  props: ["con"],
  data() {
    return {
      modelDetalis: {},

      cenPath: require("@/assets/img/cen.png"),
      cenPath15: require("@/assets/img/cen15.png"),
      leftPath: require("@/assets/img/leftOne.png"),
      rightPath: require("@/assets/img/faceChar.jpg"),
      rightPath2: require("@/assets/img/rightOne.png"),
      front: "",
      left: "",
      right: "",
      id: "",
      status: "1",
      key1: true,
      key2: false,
      key3: false,
      animationId: "",
      renderer: null,
      source: null,
      charData: [
        { name: "眼角距离:", data: "" },
        { name: "眼宽距离:", data: "" },
        { name: "鼻子高度:", data: "" },
        { name: "鼻子宽度:", data: "" },
        { name: "人中距离:", data: "" },
        { name: "嘴角宽度:", data: "" },
        { name: "嘴巴高度:", data: "" },
        { name: "下巴宽度:", data: "" }
      ],
      photo1: [],
      photo2: [],
      photo3: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    getModel(data) {
      this.id = data;
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/tasks/${this.id}`)
        .then(function(res) {
          if (res.data.code === 0) {
            VM.modelDetalis = res.data.result.result;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goCen() {
      this.key1 = true;
      this.key2 = false;
      this.key3 = false;
    },
    goModel() {
      this.key1 = false;
      this.key2 = true;
      this.key3 = false;
    },
    goTake() {
      this.key1 = false;
      this.key2 = false;
      this.key3 = true;
    },
    //解压图片一正两侧
    getcent(data) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.oss + `${this.id}_data/snap_${this.id}.zip`, {
          headers: {
            "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
            "Content-Type": "text/plain;charset=utf-8"
          },
          timeout: 0,
          responseType: "arraybuffer"
        })
        .then(function(res) {
          // console.log(res.data);
          if (res.status === 200) {
            let file = res.data;
            let Zip = new jsZip();
            Zip.loadAsync(file).then(function(zip) {
              zip.forEach(function(relativePath, zipEntry) {
                // console.log(zipEntry.name);
                if (
                  zipEntry.name == "images/" ||
                  zipEntry.name == "images-2/" ||
                  zipEntry.name == "images-3/" ||
                  zipEntry.name == "info.txt" ||
                  zipEntry.name == "output/"
                )
                  return;
                if (zipEntry.name.indexOf("output/front") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.front = "data:image/jpeg;base64," + content;
                    });
                }
                if (zipEntry.name.indexOf("output/left") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.left = "data:image/jpeg;base64," + content;
                    });
                }
                if (zipEntry.name.indexOf("output/right") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.right = "data:image/jpeg;base64," + content;
                    });
                }
              });
              // console.log(VM.photo)
            });
          }else{

              this.$message({
                 message: `${res.data.msg}`,
                 type: "warning",
                 customClass: "zZindex"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    INIT(width, height,source) {
      console.log(width, height);
      let VM = this;
      //场景构建
      var scene = new THREE.Scene();
      //相机构建
      var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000); //四个参数 视场角 方向 最近距 最远距  fov对应着图中的视角，是上下两面的夹角。aspect是近平面的宽高比。
      // camera.lookAt( new THREE.Vector3(0, 0, 0));
      //渲染器构建
      VM.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      //设置背景颜色
      VM.renderer.setClearColor(0x484b5f);
      //三个参数 width height updateStyle第三个选填
      VM.renderer.setSize(width, height);
      //激活阴影
      VM.renderer.shadowMapEnabled = true;
      //添加材质灯光阴影
      var ambiColor = "ffffff";
      var ambientLight = new THREE.AmbientLight(ambiColor);
      scene.add(ambientLight);

      var controls = new THREE.OrbitControls(camera, VM.renderer.domElement);
      //controls.target = new THREE.Vector3(0, 0, 0);
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      controls.dampingFactor = 0.25;
      //是否可以缩放
      controls.enableZoom = true;
      //是否自动旋转
      controls.autoRotate = false;
      //设置相机距离原点的最近距离
      //controls.minDistance = 200;
      //设置相机距离原点的最远距离
      //controls.maxDistance = 600;
      //是否开启右键拖拽
      controls.enablePan = true;
      //上下旋转范围
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI * (90 / 180);
      //左右旋转范围
      controls.minAzimuthAngle = -Math.PI * (60 / 180);
      controls.maxAzimuthAngle = Math.PI * (60 / 180);

      controls.panSpeed = 0.2;
      controls.rotateSpeed = 0.1;
      //模型
      var onProgress = function(xhr) {
        // if (xhr.lengthComputable) {
        //   //可计算的长度
        //   var percentCompvare = (xhr.loaded / xhr.total) * 100; //加载程度百分比
        //   var elem = document.getElementById("myBar");
        //   var width = parseInt(percentCompvare);
        //   elem.style.width = width + "%";
        //   $(".loading").text("正在下载:" + parseInt(percentCompvare) + "%");
        // }
      };
      var onError = function(xhr) {
        // $(".loading")
        //   .show()
        //   .text("下载失败");
        return;
      };

      var modelPath = `${this.id}_ai3d`;
      console.log(modelPath);
      var isObj = true;
      var objLoader = new THREE.OBJLoader2();
      var callbackOnLoad = function(event) {
        var modelObj = event.detail.loaderRootNode;
        camera.position.z = 130;
        camera.position.y = 0;
        camera.position.x = 70;

        modelObj.scale.set(1.9, 1.9, 1.9);
        modelObj.children[0].geometry.computeBoundingBox();
        modelObj.rotation.x = THREE.Math.degToRad(88);
        modelObj.rotation.y = THREE.Math.degToRad(181);
        modelObj.rotation.z = THREE.Math.degToRad(203);
        modelObj.children[0].geometry.center();
        scene.add(modelObj);
      };
      let typeObj = source == "1" ? "textured" : "cut";
      console.log(typeObj);

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
            onProgress,
            onError,
            null,
            false
          );
        }
      );
      camera.lookAt(scene.position);
      console.log($("#WebGL-output2"));
      //在页面上添加渲染器，dom元素
      $("#WebGL-output2").append(VM.renderer.domElement);
      renderScene();
      VM.getModelTxt();
      function renderScene() {
        window.cancelAnimationFrame(VM.animationId);
        var clock = new THREE.Clock();
        var delta = clock.getDelta(); //三角点
        controls.update();
        camera.updateProjectionMatrix();
        VM.animationId = requestAnimationFrame(renderScene); //请求动画框架
        VM.renderer.render(scene, camera);
      }
    },
    INIT_15(width, height,source) {
      let VM = this;
      //场景构建
      var scene = new THREE.Scene();
      //相机构建
      var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000); //四个参数 视场角 方向 最近距 最远距  fov对应着图中的视角，是上下两面的夹角。aspect是近平面的宽高比。
      // camera.lookAt( new THREE.Vector3(0, 0, 0));
      //渲染器构建
      VM.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      //设置背景颜色
      VM.renderer.setClearColor(0x484b5f);
      //三个参数 width height updateStyle第三个选填
      VM.renderer.setSize(width, height);
      //激活阴影
      VM.renderer.shadowMapEnabled = true;
      //添加材质灯光阴影
      var ambiColor = "ffffff";
      var ambientLight = new THREE.AmbientLight(ambiColor);
      scene.add(ambientLight);

      var controls = new THREE.OrbitControls(camera, VM.renderer.domElement);
      //controls.target = new THREE.Vector3(0, 0, 0);
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      controls.dampingFactor = 0.25;
      //是否可以缩放
      controls.enableZoom = true;
      //是否自动旋转
      controls.autoRotate = false;
      //设置相机距离原点的最近距离
      //controls.minDistance = 200;
      //设置相机距离原点的最远距离
      //controls.maxDistance = 600;
      //是否开启右键拖拽
      controls.enablePan = true;
      //上下旋转范围
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI * (90 / 180);
      //左右旋转范围
      controls.minAzimuthAngle = -Math.PI * (60 / 180);
      controls.maxAzimuthAngle = Math.PI * (60 / 180);

      controls.panSpeed = 0.2;
      controls.rotateSpeed = 0.1;
      //模型
      var onProgress = function(xhr) {
        // if (xhr.lengthComputable) {
        //   //可计算的长度
        //   var percentCompvare = (xhr.loaded / xhr.total) * 100; //加载程度百分比
        //   var elem = document.getElementById("myBar");
        //   var width = parseInt(percentCompvare);
        //   elem.style.width = width + "%";
        //   $(".loading").text("正在下载:" + parseInt(percentCompvare) + "%");
        // }
      };
      var onError = function(xhr) {
        // $(".loading")
        //   .show()
        //   .text("下载失败");
        return;
      };

      var modelPath = `${this.id}_ai3d`;
      console.log(modelPath);
      var isObj = true;
      var objLoader = new THREE.OBJLoader2();
      var callbackOnLoad = function(event) {
        var modelObj = event.detail.loaderRootNode;
        camera.position.z = 80;
        camera.position.y = 120;
        camera.position.x = 30;
        modelObj.scale.set(1.9, 1.9, 1.9);
        modelObj.children[0].geometry.computeBoundingBox();
        modelObj.rotation.x = THREE.Math.degToRad(130);
        modelObj.rotation.y = THREE.Math.degToRad(30);
        modelObj.rotation.z = THREE.Math.degToRad(-20);
        modelObj.children[0].geometry.center();
        scene.add(modelObj);
      };
      let typeObj = source == "1" ? "textured" : "cut";
      console.log(typeObj)
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
      camera.lookAt(scene.position);
      //在页面上添加渲染器，dom元素
      $("#WebGL-output2").append(VM.renderer.domElement);
      renderScene();
      VM.getModelTxt();
      function renderScene() {
        window.cancelAnimationFrame(VM.animationId);
        console.log('Animation')
        var clock = new THREE.Clock();
        var delta = clock.getDelta(); //三角点
        controls.update();
        camera.updateProjectionMatrix();
        VM.animationId = requestAnimationFrame(renderScene); //请求动画框架
        VM.renderer.render(scene, camera);
      }
    },
    //解压图片所有
    getAllImg(data) {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.oss + `${this.id}_data/snap_${this.id}.zip`, {
          headers: {
            "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
            "Content-Type": "text/plain;charset=utf-8"
          },
          timeout: 0,
          responseType: "arraybuffer"
        })
        .then(function(res) {
          if (res.status === 200) {
            let file = res.data;
            let Zip = new jsZip();
            Zip.loadAsync(file).then(function(zip) {
              // console.log(zip.forEach);
              zip.forEach(function(relativePath, zipEntry) {
                // console.log(zipEntry.name.indexOf("images/"));
                if (
                  zipEntry.name == "images/" ||
                  zipEntry.name == "images-2/" ||
                  zipEntry.name == "images-3/" ||
                  zipEntry.name == "info.txt" ||
                  zipEntry.name == "output/"
                )
                  return;
                if (zipEntry.name.indexOf("images/") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.photo1.push("data:image/jpeg;base64," + content);
                    });
                }
                if (zipEntry.name.indexOf("images-2/") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.photo2.push("data:image/jpeg;base64," + content);
                    });
                }
                if (zipEntry.name.indexOf("images-3/") > -1) {
                  Zip.file(zipEntry.name)
                    .async("base64")
                    .then(function(content) {
                      VM.photo3.push("data:image/jpeg;base64," + content);
                    });
                }
              });
            });
          }else{
              VM.$message({
                 message: `${res.data.msg}`,
                 type: "warning",
                 customClass: "zZindex"
            });
          }
        })
        .catch(function(error) {
           VM.$message({
                 message: `服务器无响应`,
                 type: "warning",
                 customClass: "zZindex"
            });
          console.log(error);
        });
    },
    reSetData() {
      this.modelDetalis = {};
      //this.animationId = "";
      this.photo1 = this.photo2 = this.photo3 = [];
      this.id = "";
      this.front = "";
      this.left = "";
      this.right = "";
      this.key1 = true;
      this.key2 = false;
      this.key3 = false;
      this.photo1 = [];
      this.photo2 = [];
      this.photo3 = [];
      $("#WebGL-output2").empty();
      this.clearRenderer();
      if (this.status == 1) {
       
        console.log(this.status);
        window.cancelAnimationFrame(this.animationId);
        THREE.Cache.clear();
      }
    },
    getModelTxt() {
      let VM = this;
      let id = new Date().getTime();
      let params = {
        headers: {
          "X-Auth-Token": "AUTH_d11d29fbaee74a379a694ce68396bc6a",
          "Content-Type": "text/plain;charset=utf-8"
        },
        responseType: "text/json",
        inCharset: "utf-8",
        outCharset: "utf-8",
        timeout: 30000,
        random: id
      };
      this.$http.api
        .get(
          window.BASEURL.oss + `${VM.id}_ai3d/face_points_distance.txt`,
          params
        )
        .then(function(res) {
          // console.log(res);
          if (res.status === 200) {
            let newData = res.data.split("\r\n");
            let len = newData.length;
            for (var i = 0; i < len; i++) {
              let obj = {};
              if (newData[i]) {
                let k = newData[i].split(":")[0];
                let v = newData[i].split(":")[1];
                VM.charData[i].data = v;
                obj[encodeURIComponent(k)] = v;
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clearRenderer() {  
      if(this.status == "1"){
          this.renderer.dispose();
          this.renderer.forceContextLoss();
          this.renderer.context = null;
          this.renderer.domElement = null;
          //this.renderer = null;
      }
    },
    handleClose() {
      this.reSetData();
      this.$parent.modelData.key = false;
    },
    beforeDestroy() {
    let VM = this;
    if (VM.status == 1) {
      window.cancelAnimationFrame(VM.animationId);
      //VM.clearRenderer();
      THREE.Cache.clear();
    }
   },
    save() {
      this.reSetData();
      this.$parent.modelData.key = false;
    },
    giveUp() {
      this.reSetData();
      this.$parent.modelData.key = false;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/func.scss";
.model__wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  .model__content {
    width: 1100px;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20vh;
    border-radius: 6px;
    padding: 20px 20px 15px 20px;
    .title__modelBox{
        display: flex;
        align-items: center;
        padding: 0 5px;
        justify-content: space-between;
        // margin-bottom: 15px;
       .title__model{
          color: #000;
          font-size: 20px;
          font-weight: 550;
       }
       .el-icon-close{
         font-size: 18px;
         cursor: pointer;
       }
    }
   
    .model__nav {
       padding-left:5px;
      .model__h3{
         color: #000;
      }
      .shoot-inp {
        margin-top: 14px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .inp-con {
          display: flex;
          align-items: center;
          margin-right: 32px;
          margin-bottom: 15px;
          justify-content: center;
          // &:nth-of-type(7) {
          //   margin-top: 15px;
          // }
          //  &:nth-of-type(6) {
          //   margin-top: 15px;
          // }
          .must {
            display: inline-block;
            font-size: 14px;
            color: #252a2a;
            vertical-align: middle;
            &.name{
              max-width: 56px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              cursor: pointer;
              // display: flex;
            }
            &.orgName{
              max-width: 70px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              cursor: pointer;
            }
          }
        }
      }
    }
    .model__main {
      // margin-top: 10px;
      .main__nav {
        .model__h3 {
          color: #000;
        }
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e3e3e6;
        .mainNav__item {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          width: 120px;
          color: #909399;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          &.active {
            color: #2761ea;
            border-bottom: 2px solid #2761ea;
          }
        }
      }
      .main__con {
        width: 100%;
        position: relative;
        display: flex;
        padding-top: 24px;
        .left-con {
          width: 100%;
          display: flex;
          flex-direction: column;
          .potho {
            width: 100%;
            display: flex;
            justify-content: space-around;

            .same {
              width: px2Rem(230px);
              height: px2Rem(300px);
              display: flex;
              flex-direction: column;
              align-items: center;
              // margin: 0 px2Rem(70px);

              background: #b1b1b5;
              border-radius: 6px;
              border: solid 1px #dcdfe6;
              box-shadow: 0px 5px 14px 2px rgba(0, 0, 0, 0.1);
              .img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
              }
            }
          }
          .potho__info {
            display: flex;
            justify-content: center;
            width: 100%;
            .potho__item {
              width: px2Rem(230px);
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 0 px2Rem(60px);
              color: #252a2a;
              font-size: 16px;
              margin-top: 15px;
            }
          }
        }
        .modelShow__wrap {
          // width: 100%;
          height: px2Rem(345px);
          display: flex;
          justify-content: flex-start;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          overflow: hidden;
          @media screen and (max-width: 1366px) {
            height: 333px;
          }
          .modelAear {
            width: px2Rem(650px);
            height: 100%;
            position: relative;
            #WebGL-output2 {
              width: px2Rem(650px);
              height: 345px;
            }
          }
          .WebGL-bg {
            width: px2Rem(650px);
            height: 345px;
            background: #484b5f;
            position: absolute;
            z-index: 0;
            text-align: center;
            line-height: 345px;
            font-size: 30px;
            color: #fff;
          }
          .modelInfo {
            width: px2Rem(360px);
            height: 100%;
            background: #484b5f;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            //border-top-right-radius: 6px;
            //border-bottom-right-radius: 6px;
            overflow: hidden;
            position: relative;
            .modelInfo__img {
              width: px2Rem(360px);
              height: 345px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              @media screen and (max-width: 1366px) {
                height: 333px;
              }
            }
            .info__box {
              position: relative;
              width: px2Rem(440px);
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              justify-content: center;
              height: 100%;
              .info__item {
                font-size: px2Rem(14px);
                color: #fff;
                position: absolute;
                &:nth-of-type(1) {
                  right: 7px;
                  top: 42px;
                }
                &:nth-of-type(2) {
                  right: 108px;
                  top: 83px;
                }
                &:nth-of-type(3) {
                  right: 7px;
                  top: 115px;
                }
                &:nth-of-type(4) {
                  right: 7px;
                  top: 158px;
                }
                &:nth-of-type(5) {
                  right: 7px;
                  top: 200px;
                }
                &:nth-of-type(6) {
                  right: 7px;
                  top: 234px;
                }
                &:nth-of-type(7) {
                  right: 7px;
                  top: 278px;
                }
                &:nth-of-type(8) {
                  right: 7px;
                  top: 313px;
                }
                @media screen and (max-width: 1366px) {
                  &:nth-of-type(1) {
                    right: 26px;
                    top: 36px;
                  }
                  &:nth-of-type(2) {
                    right: 128px;
                    top: 80px;
                  }
                  &:nth-of-type(3) {
                    right: 26px;
                    top: 111px;
                  }
                  &:nth-of-type(4) {
                    right: 26px;
                    top: 155px;
                  }
                  &:nth-of-type(5) {
                    right: 26px;
                    top: 194px;
                  }
                  &:nth-of-type(6) {
                    right: 26px;
                    top: 265px;
                  }
                  &:nth-of-type(7) {
                    right: 26px;
                    top: 230px;
                  }
                  &:nth-of-type(8) {
                    right: 26px;
                    top: 300px;
                  }
                }
              }
            }
          }
        }
        .fDetalis-content-thr {
          width: 100%;
          display: flex;
          padding: 0px 20px;
          flex-direction: column;
          height: px2Rem(345px);
          overflow-y: auto;
          @media screen and (max-width: 1366px) {
            height: 335px;
          }
          @media screen and (max-width: 1280px) {
            height: 550px;
          }
          .cen-box {
            display: flex;
            flex-wrap: wrap;
            .img-box {
              width: px2Rem(150px);
              height: px2Rem(267px);
              margin-right: 15px;
              margin-bottom: 15px;
              position: relative;
              border-radius: 6px;
              @media screen and (max-width: 1280px) {
                margin-right: 25px;
                margin-bottom: 25px;
              }
              img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
              }
              .cencen {
                width: 100%;
                position: absolute;
                bottom: 0;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: px2Rem(14px);
                background: rgba(0, 0, 0, 0.4);
                border-bottom-right-radius: 6px;
                border-bottom-left-radius: 6px;
                color: #fff;
                .cir {
                  display: inline-block;
                  width: 5px;
                  height: 5px;
                  background: #5f8ffd;
                  border-radius: 50%;
                  vertical-align: middle;
                  margin-right: px2Rem(10px);
                }
              }
            }
          }
          .left-box {
            display: flex;
            flex-wrap: wrap;
            .img-box {
              width: px2Rem(150px);
              height: px2Rem(267px);
              margin-right: 15px;
              margin-bottom: 15px;
              position: relative;
              border-radius: 6px;
              @media screen and (max-width: 1280px) {
                margin-right: 25px;
                margin-bottom: 25px;
              }
              img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
              }
              .cencen {
                width: 100%;
                position: absolute;
                bottom: 0;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: px2Rem(14px);
                background: rgba(0, 0, 0, 0.4);
                color: #fff;
                border-bottom-right-radius: 6px;
                border-bottom-left-radius: 6px;
                .cir {
                  display: inline-block;
                  width: 5px;
                  height: 5px;
                  background: #5f8ffd;
                  border-radius: 50%;
                  vertical-align: middle;
                  margin-right: px2Rem(10px);
                }
              }
            }
          }

          .right-box {
            display: flex;
            flex-wrap: wrap;
            .img-box {
              width: px2Rem(150px);
              height: px2Rem(267px);
              margin-right: 15px;
              margin-bottom: 15px;
              position: relative;
              border-radius: 6px;
              @media screen and (max-width: 1280px) {
                margin-right: 25px;
                margin-bottom: 25px;
              }

              img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
              }
              .cencen {
                width: 100%;
                position: absolute;
                bottom: 0;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: px2Rem(14px);
                background: rgba(0, 0, 0, 0.4);
                color: #fff;
                border-bottom-right-radius: 6px;
                border-bottom-left-radius: 6px;
                .cir {
                  display: inline-block;
                  width: 5px;
                  height: 5px;
                  background: #5f8ffd;
                  border-radius: 50%;
                  vertical-align: middle;
                  margin-right: px2Rem(10px);
                }
              }
            }
          }
        }
      }
    }
    .model__footer {
      display: flex;
      justify-content: center;
    }
  }
}
.fDetalis-content-thr::-webkit-scrollbar {
  width: 8px;
  height: 2px;
  position: absolute;
  right: -10px;
  top: -10px;
}
/*正常情况下滑块的样式*/

.fDetalis-content-thr::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.fDetalis-content-thr:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*鼠标悬浮在滑块上时滑块的样式*/

.fDetalis-content-thr::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
/*正常时候的主干部分*/

.fDetalis-content-thr::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: white;
}
/*鼠标悬浮在滚动条上的主干部分*/

.fDetalis-content-thr::-webkit-scrollbar-track:hover {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
