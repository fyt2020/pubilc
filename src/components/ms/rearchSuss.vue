<template>
  <div class="rearch__box" v-if="rearchObj.rearchKey" :style="rearchObj.style">
    <Icon
      type="ios-checkmark-circle"
      v-show="rearchObj.rearchType == 'suss'"
      class="ios-checkmark-circle"
    />
    <Icon type="ios-close-circle" v-show="rearchObj.rearchType == 'error'" class="ios-close-circle" />
    <span
      :class="['con__word',{'suss':rearchObj.rearchType  == 'suss','error':rearchObj.rearchType  == 'error'}]"
    >{{rearchObj.rearchCon}}</span>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      rearchObj: {
        rearchType: "",
        rearchKey: false,
        rearchCon: "",
        style: { top: "-140px" }
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
   

  },
  watch: {},
  methods: {
      /**
       * @Author fyt
       * @Description style显示或隐藏 
       * @Date 2020-03-12 16:26:21 星期四
       */
      toggleShow(style,type,key,con,top){

            if(style == "show"){

            this.rearchObj.rearchType = type;
            this.rearchObj.rearchKey = key;
            this.rearchObj.rearchCon = con;
            this.rearchObj.style.top = top;


            }else if(style == "hidden"){

                this.rearchObj.rearchType = type;
                this.rearchObj.rearchKey = key;
                this.rearchObj.rearchCon = con;
                this.rearchObj.style.top = top;


            }
            
      },
  },
  components: {}
};
</script>

<style scoped lang="scss">
.rearch__box {
  display: flex;
  align-items: center;

  align-items: center;
  pointer-events: all;
  padding: 8px 14px;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  background: #fff;
  position: absolute;
  z-index: 1150;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  .ios-checkmark-circle {
    color: #59ba73;
  }
  .ios-close-circle {
    color: #dc412c;
  }
  .con__word {
    display: inline-block;
    color: #5a516e;
    margin-left: 5px;
  }
}
</style>
