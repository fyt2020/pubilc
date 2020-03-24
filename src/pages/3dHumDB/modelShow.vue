<template>
  <div class="modelShow__wrap">
    <div class="modelAear">
      <div id="WebGL-output"></div>
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
</template>

<script>
import * as URL from "@/plugins/env.js";
export default {
  props: {},
  data() {
    return {
      id: "",
      animationId: "",
      status: "1",
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
      GLwidth: "",
      GLheight: "",
      camera:null,
      renderer: null,
      source:null,
    };
  },
  computed: {},
  created() {
    if (!this.$route.params.id) {
      this.id = JSON.parse(localStorage.getItem("id"));
    } else {
      this.id = this.$route.params.id;
    }
  },
  mounted() {
    this.GLwidth = $("#WebGL-output").width();
    this.GLheight = $("#WebGL-output").height();
    this.getStatus();
    window.addEventListener("resize",this.onWindowResize);
  },
  methods: {


    getStatus() {
      let VM = this;
      this.$http.api
        .get(window.BASEURL.testUrl1 + `parent-police/api/v1/tasks/${this.id}`)
        .then(function(res) {
          if (res.data.code === 0) {
            // console.log(res.data.result.result)
            VM.modelDetalis = res.data.result.result;
            VM.status = VM.modelDetalis.status;
            VM.source = VM.modelDetalis.source;
            if (VM.modelDetalis.status == 1) {
              VM.status = 1;
              if(VM.source == '1'){
                  VM.INIT_15(VM.GLwidth, VM.GLheight);
              }else if(VM.source == '0'){
                  VM.INIT(VM.GLwidth, VM.GLheight);
              }
            }
            // console.log(VM.modelDetalis.status);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    INIT(width, height) {
      let VM = this;
      //场景构建
      var scene = new THREE.Scene();
      //相机构建
      VM.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000); //四个参数 视场角 方向 最近距 最远距  fov对应着图中的视角，是上下两面的夹角。aspect是近平面的宽高比。
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
      console.log(ambientLight)
      scene.add(ambientLight);

       //添加坐标系
      // var axes = new THREE.AxisHelper(100);
      // scene.add(axes);

      //添加网格
      // var helper = new THREE.GridHelper( 1000, 50 ,0x0000ff, 0xff8080);
      // scene.add(helper);

      var controls = new THREE.OrbitControls(VM.camera, VM.renderer.domElement);
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
      // console.log(this.id)
      var isObj = true;
      var objLoader = new THREE.OBJLoader2();
      var callbackOnLoad = function(event) {
      var modelObj = event.detail.loaderRootNode;
        VM.camera.position.z = 130;
        VM.camera.position.y = 0;
        VM.camera.position.x = 70;

        modelObj.scale.set(1.9, 1.9, 1.9);
        modelObj.children[0].geometry.computeBoundingBox();
        modelObj.rotation.x = THREE.Math.degToRad(88);
        modelObj.rotation.y = THREE.Math.degToRad(181);
        modelObj.rotation.z = THREE.Math.degToRad(203);
        modelObj.children[0].geometry.center();

        //边框
        // var border =  new THREE.BoxHelper(modelObj, 0xffffff);
        // scene.add(border);
        
        scene.add(modelObj);
       };
        let typeObj = VM.source == '1' ? 'textured' : 'cut';


        objLoader.loadMtl(
        window.BASEURL.oss + modelPath + `/${typeObj}_mesh.mtl`,
        null,
        function(materialCreator) {
          materialCreator[`${typeObj}_mesh`].opacity = 1; // new THREE.Color(1,1,1)
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
      VM.camera.lookAt(scene.position);
      //在页面上添加渲染器，dom元素
      $("#WebGL-output").append(VM.renderer.domElement);
      renderScene();
      VM.getModelTxt();
     
      function renderScene() {
        var clock = new THREE.Clock();
        var delta = clock.getDelta(); //三角点
        controls.update();
        VM.camera.updateProjectionMatrix();
        VM.animationId = requestAnimationFrame(renderScene); //请求动画框架
        VM.renderer.render(scene, VM.camera);
      }
    },
    INIT_15(width, height) {
      let VM = this;
      //场景构建
      var scene = new THREE.Scene();
      //相机构建
      VM.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000); //四个参数 视场角 方向 最近距 最远距  fov对应着图中的视角，是上下两面的夹角。aspect是近平面的宽高比。
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

      var controls = new THREE.OrbitControls(VM.camera, VM.renderer.domElement);
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
      var isObj = true;
      var objLoader = new THREE.OBJLoader2();
      var callbackOnLoad = function(event) {
        var modelObj = event.detail.loaderRootNode;
        VM.camera.position.z = 80;
        VM.camera.position.y = 120;
        VM.camera.position.x = 30;
        modelObj.scale.set(1.9, 1.9, 1.9);
        modelObj.children[0].geometry.computeBoundingBox();
        modelObj.rotation.x = THREE.Math.degToRad(130);
        modelObj.rotation.y = THREE.Math.degToRad(30);
        modelObj.rotation.z = THREE.Math.degToRad(-20);
        modelObj.children[0].geometry.center();
        scene.add(modelObj);
      };
        let typeObj = VM.source == '1' ? 'textured' : 'cut';
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
              VM.renderer.render(scene, VM.camera);
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
      VM.camera.lookAt(scene.position);
      //在页面上添加渲染器，dom元素
      $("#WebGL-output").append(VM.renderer.domElement);
      renderScene();
      VM.getModelTxt();
      function renderScene() {
        var clock = new THREE.Clock();
        var delta = clock.getDelta(); //三角点
        controls.update();
        VM.camera.updateProjectionMatrix();
        VM.animationId = requestAnimationFrame(renderScene); //请求动画框架
        VM.renderer.render(scene, VM.camera);
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

    //
    onWindowResize(){

      if(this.renderer != null){
            this.GLwidth = $("#WebGL-output").width();
            this.GLheight = $("#WebGL-output").height();
            this.camera.aspect = this.GLwidth / this.GLheight ;	
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.GLwidth , this.GLheight );

      }
       console.log( this.GLwidth );
       console.log( this.GLheight );
           
    },

    clearRenderer() {
      let VM = this;
      VM.renderer.dispose();
      VM.renderer.forceContextLoss();
      VM.renderer.context = null;
      VM.renderer.domElement = null;
      VM.renderer = null;
      
    }
  },
  beforeDestroy() {
    let VM = this;
    if (VM.status == 1) {
      window.cancelAnimationFrame(VM.animationId);
      VM.clearRenderer();
      THREE.Cache.clear();
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">

@import "@/assets/css/func.scss";
.modelShow__wrap {
  // width: 100%;
  height: px2Rem(520px);
  display: flex;
  justify-content: flex-start;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  overflow: hidden;
    @media screen and (max-width:1366px){
          height: 333px;
  }
  .modelAear {
    width: px2Rem(760px);
    height: 100%;
    position: relative;
    #WebGL-output {
      width: px2Rem(760px);
        height: 100%;
    }
  }
  .WebGL-bg {
    width: px2Rem(760px);
    height: 100%;
    background: #484b5f;
    position: absolute;
    z-index: 0;
    text-align: center;
    line-height: 520px;
    font-size: 30px;
    color: #fff;
  }
  .modelInfo {
    width: px2Rem(520px);
    height: 100%;
    background: #484b5f;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    overflow: hidden;
    position: relative;
    .modelInfo__img {
      width: px2Rem(520px);
      height: 498px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
         @media screen and (max-width:1366px){
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
          right: px2Rem(48px);
          top: px2Rem(63px);
        }
        &:nth-of-type(2) {
          right: px2Rem(193px);
          top: px2Rem(124px);
        }
        &:nth-of-type(3) {
          right: px2Rem(48px);
          top: px2Rem(175px);
        }
        &:nth-of-type(4) {
          right: px2Rem(48px);
          top: px2Rem(245px);
        }
        &:nth-of-type(5) {
          right: px2Rem(48px);
          top: px2Rem(293px);
        }
        &:nth-of-type(6) {
          right: px2Rem(48px);
          top: px2Rem(414px);
        }
        &:nth-of-type(7) {
          right: px2Rem(48px);
          top: px2Rem(353px);
        }
        &:nth-of-type(8) {
          right: px2Rem(48px);
          top: px2Rem(458px);
        }
      @media screen and (max-width:1366px){
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
</style>
