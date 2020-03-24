<template>
  <div class="slider__boxOne" v-show="show">
    <div class="slider__prev">
      <Icon type="md-skip-backward" class="big" @click="goFrist" />
      <Icon type="ios-arrow-back" class="sma" @click="goPrev" />
    </div>
    <div class="slider__next">
      <Icon type="ios-arrow-forward" class="sma" @click="goNext" />
      <Icon type="md-skip-forward" class="big" @click="goEnd" />
    </div>

    <!-- <div class="slider" ref="slider">
      <Progress :percent="value" status="active" :text-inside="true" />
      <div class="thunk" ref="trunk" :style="{left}">
        <div class="block"></div>
      </div>
    </div>-->

    <!-- <div class="slider" ref="slider">
      <Progress :percent="value" status="active" :text-inside="true" />
      <div class="slider1" ref="slider1">
        <div class="process1" :style="{width}"></div>
        <div class="thunk1" ref="trunk1" :style="{left}" @mouseenter="goIn" @mouseleave="goOut">
          <div class="block1"></div>
          <div class="tips" v-show="tipsKey">
            <span>{{Math.round(scale*100)}}</span>
            <i class="fas fa-caret-down"></i>
          </div>
        </div>
      </div>
    </div>-->

    <div class="slider" ref="slider">
      <Progress :percent="value" status="active" :text-inside="false" />
      <div
        class="slider1"
        @mousemove="timeMove($event)"
        @mouseleave="timeEnd($event)"
        @mouseup="timeEnd2($event)"
        ref="dragbox"
      >
        <div class="process1" @click="timeClick($event)">
          <div class="progressbar" :style="{width:width+'px',transition:'width '+transTime+'s'}"  @mouseup="timeEnd($event)"></div>
        </div>
        <div
          class="thunk1"
          ref="trunk1"
          @mouseenter="goIn"
          @mouseleave="goOut"
          @mousedown="timeDown($event)"
          @mouseup="timeEnd($event)"
          :style="{left:distance+'px'}"
        >
          <div class="block1"></div>
          <div class="tips" v-show="tipsKey">
            <span>{{Math.round(scale*100)}}%</span>
            <i class="fas fa-caret-down"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
/*
 * min 进度条最小值
 * max 进度条最大值
 * v-model 对当前值进行双向绑定实时显示拖拽进度
 * */
export default {
  props: ["min", "max", "value", "show"],
  data() {
    return {
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      per: 0, //当前值,
      thunkPer: 0,
      Zwidth: 400,
      newWidth: 0,
      orgleft: 0,
      newLeft: 0,
      newScale: 0,
      TotalFrame: 0,
      nowFrame: 0,
      tipsKey: false,

      pos: {},
      startX: null,
      locked: false,
      distance: 0, //当前位置
      endDistance: 0, //上次操作结束位置
      transTime: 0.3, //点击拖动动画
      dragWidth: 0, //进度条宽度
      startNum: 0,
      endNum: 50,
      nowNum: 0,
      customColors: [
      {color: '#f56c6c', percentage: 20},
      {color: '#e6a23c', percentage: 40},
      {color: '#5cb87a', percentage: 60},
      {color: '#409eff', percentage: 80},
      {color: '#6f7ad3', percentage: 100}
      ]
    };
  },
  //渲染到页面的时候
  mounted() {
    // this.init();
    let VM = this;
    // console.log(this.value)
    // setInterval(()=>{
    //     console.log(VM.width)
    // },2000)
  },
  computed: {
    ...mapState(['vkey1','vkey2']),
    // scale() {
    //   return (this.per - this.min) / (this.value - this.min);
    // },

    width() {
      let width = (this.value / 100) * 400;
      return width;
    },
    scale(){

         let scale = this.distance / 400;
         if(scale > 0.94){
          scale = 1
         }
          return  scale
    }
    // left() {
    //   if (this.slider) {
    //     return (
    //       this.slider.offsetWidth * this.scale -
    //       this.thunk.offsetWidth / 2 +
    //       "px"
    //     );
    //   } else {
    //     return 0 + "px";
    //   }
    // }
    // thunkscale() {
    //   return (this.thunkPer - this.min) / (this.Zwidth - this.min);
    // },
    // left() {
    //   if (this.orgleft == 0) {
    //     return 0 + "px";
    //   } else {
    //     if (this.Zwidth * this.thunkscale - this.thunk.offsetWidth / 2 < 0) {
    //       return 0 + "px";
    //     } else if (
    //       this.Zwidth * this.thunkscale - this.thunk.offsetWidth / 2 >
    //       this.Zwidth
    //     ) {
    //       return this.Zwidth + "px";
    //     } else {
    //       return (
    //         this.Zwidth * this.thunkscale - this.thunk.offsetWidth / 2 + "px"
    //       );
    //     }
    //   }
    // }
  },

  methods: {
    ...mapMutations(['changVkey1','changVkey2']),
    mousePos: function(e) {
      var pos = {};
      pos.x = e.pageX;
      this.pos = pos;
      return pos;
    },
    timeDown: function(e) {
      // 当鼠标指针移动到元素上方，并按下鼠标左键时
      this.transTime = 0;
      this.mousePos(e);
      this.startX = this.pos.x;
      this.locked = true;
      this.endDistance = this.distance;
      // console.log(this.pos);
    },
    timeMove: function(e) {
      // 当鼠标指针移动到元素上方移动时
      if (!this.locked) return;
      var pos = this.mousePos(e);
      var moveX = pos.x - this.startX - 10;

      if (this.distance > this.width) {
        this.distance = this.width;
      } else {
        if (
          (this.distance <= 0 && moveX < 0) ||
          (this.distance >= this.width && moveX > 0)
        )
          return;
        this.distance = this.endDistance + moveX;
        // console.log('distance',this.distance);
        // console.log('width',this.width);
        // this.countNum(this.distance);
      }
      if(this.distance <= 0){
              this.distance = 0 ;
      }
      if(this.distance  > 400){
           this.distance = 400 ;
      }
      // console.log(moveX);
    },
    timeEnd: function(e) {
      this.transTime = 0.3;
      this.locked = false;
      this.countNum();
    },
    timeEnd2: function(e) {

    },
    timeClick: function(e) {
      //点击拖动到指定位置
      var x = e.offsetX,
      moveX = x - this.distance;
      this.distance += moveX;
      this.countNum();
    },
    countNum: function(num) {
      // var scale =   num /400;
      this.nowFrame = Math.round(this.TotalFrame * this.scale);
      console.log('nowFrame',this.nowFrame)
      this.$parent.queryByFrame(this.nowFrame);
    },
 
    // init() {
    //   this.slider = this.$refs.slider1;
    //   this.thunk = this.$refs.trunk1;
    //   var VM = this;

    //   this.thunk.onmousedown = function(e) {
    //     var width = parseInt(VM.width);
    //     // console.log("width", width);
    //     var disX = e.clientX;
    //     // VM.newScale = VM.value / 100;
    //     // VM.newWidth = 400 * VM.newScale; //允许拖动距离
    //     // console.log("允许拖动距离", VM.newWidth);
    //     document.onmousemove = function(e) {
    //       var newWidth = e.clientX - disX + width;
    //       if(newWidth < 0){
    //           newWidth = 0;
    //       }
    //       // 拖拽的时候得到新的百分比
    //       var scale = newWidth / VM.slider.offsetWidth;
    //       console.log('newWidth',newWidth)
    //       console.log('VM.slider.offsetWidth',VM.slider.offsetWidth)
    //       console.log('scale',scale)
    //        if(scale == 0){
    //            VM.TotalFrame = 1;
    //        }
    //       VM.per = Math.ceil((VM.value - VM.min) * scale + VM.min);
    //       VM.per = Math.max(VM.per, VM.min);
    //       VM.per = Math.min(VM.per, VM.value);
    //       VM.nowFrame = Math.round(VM.TotalFrame * scale);
    //       // console.log("per", VM.per);
    //       // console.log("scale", VM.scale);
    //       // console.log("nowFrame", VM.nowFrame);
    //       // var newWidth = e.clientX - disX; //拖动距离
    //       // if (newWidth > VM.newWidth) {
    //       //   newWidth = VM.newWidth;
    //       // }
    //       // VM.orgleft = newWidth;
    //       // var scale = newWidth / VM.Zwidth; //拖动比
    //       // VM.thunkPer = Math.ceil(VM.Zwidth * scale);
    //       // VM.nowFrame = Math.round(VM.TotalFrame * scale);
    //       // console.log("TotalFrame", VM.TotalFrame);
    //       // console.log("scale", scale);
    //       // console.log("nowFrame", VM.nowFrame);
    //     };
    //     document.onmouseup = function() {
    //       VM.$parent.queryByFrame(VM.nowFrame);
    //       document.onmousemove = document.onmouseup = null;
    //     };
    //     return false;
    //   };
    // },
    goFrist() {
      if(this.nowFrame == 0){
         
         this.$Message.error("这是第一帧");
          return;
      }
      this.distance = 0;
      this.nowFrame = 0;
      this.$parent.queryByFrame(1);
    },
    goEnd() {
      if(this.value != 100){
          this.$Message.error("还未识别完成!");
          return;
      }
      this.distance = 390;
      this.nowFrame = this.TotalFrame;
      this.$parent.queryByFrame(this.TotalFrame);
    },
    goPrev() {
      if (this.nowFrame == 0) {
        this.$Message.error("到了第一帧");
        return;
      }
      if(this.vkey1){return}
      this.changVkey1({val:true});
      console.log(1)
      this.nowFrame--;
      let scale = 1 / this.TotalFrame;
      this.distance =  this.distance  -  400 *scale;
      this.$parent.queryByFrame(this.nowFrame,'prev');
    },
    goNext() {
      if (this.nowFrame == this.TotalFrame) {
        this.$Message.error("到了最后一帧");
        return;
      }
      if(this.vkey2){return}
      this.changVkey2({val:true});
      this.nowFrame++;
      console.log(this.vkey2)
      let scale = 1 / this.TotalFrame;
      this.distance =  this.distance  +  400 *scale;
       console.log(this.distance)
      this.$parent.queryByFrame(this.nowFrame,'next');
    },
    goIn() {
      this.tipsKey = true;
    },
    goOut() {
      this.tipsKey = false;
    }
  }
};
</script>

<style scoped lang="scss">
.slider__boxOne {
  position: relative;
  width: 400px;
  height: 40px;
  border: 1px solid transparent;
  background: rgba(255,255,255,0.7);
  border:none;
  .slider__prev {
    width: 60px;
    height: 40px;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.7);;
    padding-left: 15px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border:none;
    // padding: 0 15px;

    .big {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
    .sma {
      font-size: 20px;
      margin: 0 10px;
      &:hover {
        transform: scale(1.2);
      }
      cursor: pointer;
    }
  }
  .slider__next {
    box-sizing: border-box;
    height: 40px;
    width: 60px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.7);;
    padding-right: 15px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border:none;
    // position: relative;
    // padding: 0 15px;
    &::after {
      display: inline-block;
      content: "";
      width: 20px;
      height: 100%;
      position: absolute;
      left: -20px;
      bottom: 0;
      border:none;
      background: rgba(255,255,255,0.7);;
    }
    .big {
      font-size: 20px;
      &:hover {
        transform: scale(1.2);
      }
      cursor: pointer;
    }
    .sma {
      font-size: 20px;
      margin: 0 10px;
      &:hover {
        transform: scale(1.2);
      }
      cursor: pointer;
    }
  }
  .slider {
    position: relative;
    height: 40px;
    width: 400px;
    display: flex;
    align-items: center;

    .slider1 {
      position: absolute;
      height: 20px;
      width: 100%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      .process1 {
        height: 20px;
        background: transparent;
        .progressbar {
          background-color: transparent;
          float: left;
          width: 0;
          height: 100%;
          font-size: 12px;
          line-height: 20px;
          color: #fff;
          text-align: center;
          -webkit-transition: width 0.6s ease;
          -o-transition: width 0.6s ease;
          transition: width 0.6s ease;
        }
      }
      .thunk1 {
        position: absolute;
        left: 100px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        cursor: pointer;
        .block1 {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #409eff;
          background: rgba(255, 255, 255, 1);
          transition: 0.2s all;
        }
      }
      .tips {
        position: absolute;
        left: -7px;
        bottom: -30px;
        min-width: 15px;
        text-align: center;
        padding: 4px 8px;
        background: #000;
        border-radius: 5px;
        height: 24px;
        color: #fff;
        i {
          position: absolute;
          margin-left: -5px;
          left: 50%;
          bottom: -9px;
          font-size: 16px;
          color: #000;
        }
      }
    }
  }

  // .process {
  //   position: absolute;
  //   left: 0;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   width: 112px;
  //   height: 10px;
  //   border-radius: 5px;
  //   background: #409eff;
  // }
  // .thunk {
  //   position: absolute;
  //   left: 0px;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   width: 20px;
  //   height: 20px;
  //   cursor: pointer;
  // }
  // .block {
  //   width: 20px;
  //   height: 20px;
  //   border-radius: 50%;
  //   border: 2px solid #409eff;
  //   background: rgba(255, 255, 255, 1);
  //   transition: 0.2s all;
  //   &:hover {
  //     transform: scale(1.1);
  //   }
  // }
}
</style>
