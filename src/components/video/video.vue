<template>
  <div class="v-warpper" v-if="show">
    <video id="test_video" autoplay  controls></video>
  </div>
</template>


<script>
import * as URL from "@/plugins/env.js";
export default {
  props: ["show"],
  components: {
  },
  mounted() {

    if(this.show){
       this.initPlayer();
    }  
  },
  data() {
    return {
      myPlayer: null,
      playerOptions1: {
        socket: "ws://192.168.1.49:8088/ws/",
        redirectNativeMediaErrors: true,
        bufferDuration: 30,
        errorHandler: null,
        infoHandler: null
      },
      newSource:'rtsp://view:aq1sw2de3@192.168.1.61'
  };
},

  methods: {
    initPlayer(){
        let VM = this;
        this.html5Player = document.getElementById("test_video");
        this.myPlayer = Streamedian.player('test_video', this.playerOptions1);
        this.setPlayerSource();
    },
    setPlayerSource() {
        this.myPlayer.destroy();
        this.myPlayer = null;
        this.html5Player.src = this.newSource;
        this.myPlayer = Streamedian.player("test_video", this.playerOptions1);
    },

    initVideo() {
      let vm = this;
      this.myPlayer = videojs(
        "myVideo",
        this.playerOptions,
        function onPlayerReady() {
          videojs.log("准备好了");
          this.on("play", function() {
            console.log("开始/恢复播放");
          });
          this.on("pause", function() {
            console.log("暂停播放");
          });
          this.on("ended", function() {
            console.log("结束播放");
          });
        }
      );
      setTimeout(() => {
        vm.myPlayer.player();
      }, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.v-warpper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #020202;
  overflow: hidden;
  #test_video {
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    border:none;
  }
}
</style>