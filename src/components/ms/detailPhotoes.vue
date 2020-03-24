<template>
  
    <el-dialog
      title="图片详情"
      :visible.sync="con"
      width="1100px"
      center
      class="Vdetail-box"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      :before-close="handleClose"
    >

    <div class="img__box">
         <canvas class="canvasId" id="canvasId2" v-show="con"></canvas>
         <i class="el-icon-arrow-left v__left"></i>
         <i class="el-icon-arrow-right v__right"></i>
    </div>
    </el-dialog>
 
</template>

<script>
export default {
    props: ['con',"obj"],
    data() {
        return {
             regImgKey:false, 
             imgUrl:'',
             w:0,
             h:0,
        };
    },
    computed: {

    },
    created() {

        this.imgUrl = window.BASEURL.imgUrl;
    },
    mounted() {
    
    },
    watch: {

    },
    methods: {
    handleClose() {
      let canvas = document.getElementById("canvasId2");
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,this.w,this.h);
      this.$parent.dialogKey = false;
    },
    createdImg(imgUrl1, data) {
      let len = data.length;
      let VM = this;
      let canvas = document.getElementById("canvasId2");
      let ctx = canvas.getContext("2d");
      console.log(ctx)
      let img = new Image();
      img.src = `${this.imgUrl}/${imgUrl1}`;
      let spX, spY;
      let W = $('.img__box').width();
      let H = $('.img__box').height();
      img.onload = function() {
        let imgW = img.width;
        let imgH = img.height;
        let targetW, targetH;
        spX = W / img.width;
        spY = H / img.height;
        if (imgW > W) {
          targetW = imgW * spX;
          targetH = imgH * spX;
          if (imgH > H) {
            targetW = imgW * spY;
            targetH = imgH * spY;
          }
        } else {
          if (imgH > H) {
            targetW = imgW * spY;
            targetH = imgH * spY;
          } else {
            targetW = imgW;
            targetH = imgH;
          }
        }

        canvas.width = targetW;
        canvas.height = targetH;
        VM.w = targetW;
        VM.h = targetH;

        ctx.drawImage(img, 0, 0, targetW, targetH);
        ctx.strokeStyle = "#FF0000";
        ctx.strokeWidth = 1;
        ctx.lineWidth = 2;
        if (len > 0) {
          if (imgW > W && imgH < H) {
            console.log(1);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spX,
                item.y * spX,
                item.w * spX,
                item.h * spX
              );
            });
          } else if (imgW > W && imgH > H) {
            console.log(2);
            data.forEach((item, index) => {
              ctx.strokeRect(
                item.x * spY,
                item.y * spY,
                item.w * spY,
                item.h * spY
              );
            });
          } else {
            if (imgH > H) {
              console.log(3);
              data.forEach((item, index) => {
                ctx.strokeRect(
                  item.x * spY,
                  item.y * spY,
                  item.w * spY,
                  item.h * spY
                );
              });
            } else {
              console.log(4);
              data.forEach((item, index) => {
                ctx.strokeRect(item.x, item.y, item.w, item.h);
              });
            }
          }
        }
      };
    },
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.Vdetail-box{
     height:flex;
     justify-content: center;
    .img__box{
         width: 1000px;
         height: 562px;
        //  border: 1px solid black;
         position: relative;
         margin: 0 auto;

         .v__left{
           position: absolute;
           top:50%;
           left: 10px;
           transform: translateY(-50%);
           cursor: pointer;
           font-size: 40px;
           &:hover{
               background: rgba(0,0,0,0.2);
               border-radius: 50%;
           }
         }
         .v__right{
           position: absolute;
           top:50%;
           right:10px;
           transform: translateY(-50%);
           font-size: 40px;
           cursor: pointer;
            &:hover{
               background: rgba(0,0,0,0.2);
               border-radius: 50%;
           }
         }

        .canvasId{
                position: absolute;
                left: 50%;
                top:50%;
            transform: translate(-50%,-50%);
        }
    }
}
</style>
