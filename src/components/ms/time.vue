<template>
  <div class="home__time">
    <!-- <span class="am">{{new Date().getHours() > 12 ? "PM" : "AM"}}</span> -->
    <div class="home__timeL">
      <!-- <Time :time="time3" type="date" /> -->
      <span class="date__item">{{year}}</span>
      <span class="home__one1">
        <Icon type="ios-remove" />
      </span>
      <span class="date__item">{{Mon}}</span>
      <span class="home__one1">
        <Icon type="ios-remove" />
      </span>
      <span class="date__item">{{Day}}</span>

      <span class="home__one start">0</span>
      <span class="home__one">0</span>
      <span class="home__one1">:</span>
      <span class="home__one">0</span>
      <span class="home__one end">0</span>
      <span class="home__one1">:</span>
      <span class="home__one small">0</span>
      <span class="home__one end small">0</span>
    </div>

    <div class="home__timeR">
      <span class="timeR__con" @click="goTo">控制台</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      year: "",
      Mon: "",
      Day: "",
      week: "",
      time2: null,
      time1: null,
      menuResourceList: []
    };
  },
  computed: {},
  created() {
    this.initTime2();
    this.timer2 = setTimeout(() => {
      this.initTime2();
    }, 432000);
  },
  mounted() {
    this.timer1 = setInterval(this.initTime, 1000);
    this.getPower();
  },
  beforeDestroy() {
    let VM = this;
    window.clearInterval(VM.timer2);
    window.clearInterval(VM.timer1);
  },
  watch: {},
  methods: {
    goTo() {
      let VM = this;
      // let rolename = JSON.parse(localStorage.getItem("token")).rolename;
      this.$parent.exitFullscreen();
      let len = this.menuResourceList.length;
      let key = false;
      if (len > 0) {
        let hasPower = this.menuResourceList.every((item)=>{
           return item.checked === "0"
        })
        if(hasPower){
          VM.$Message.error("该用户没有访问权限");
          return
        }
        for (var i = 0; i < len; i++) {
          let obj = this.menuResourceList[i];
          if (key) {
            break;
          } else {
            if (obj.checked === "1") {
              if (obj.children.length > 0) {
                for (var j = 0; j < obj.children.length; j++) {
                  let path = obj.children[j];
                  if (path.checked === "1" && path.url === "shootC") {
                    VM.$router.push({ name: `${path.url}` });
                    key = true
                    break;
                  } else if (path.checked === "1" && path.url === "faceM") {
                    VM.$router.push({ name: `${path.url}` });
                    key = true
                    break;
                  } else {
                    VM.$router.push({ name: `${path.url}` });
                    key = true
                    break;
                  }
                }
              }
            } else {
              
            }
          }
        }
      }
      // if (rolename == "访客") {
      //   VM.$router.push({ name: "faceM" });
      // } else {
      //   VM.$router.push({ name: "shootC" });
      // }
    },

    /**
     * @Author fyt
     * @Description 获取权限
     * @Date 2020-03-17 10:18:25 星期二
     */
    getPower() {
      let VM = this;
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
              if (data.menuResourceList && data.menuResourceList.length > 0) {
                VM.menuResourceList = data.menuResourceList;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        throw new Error("roleId");
      }
    },

    initTime() {
      var spans = document.getElementsByClassName("home__one");
      var date = new Date();
      for (var i = 0; i < spans.length; i++) {
        var str =
          this.toDouble(date.getHours()) +
          this.toDouble(date.getMinutes()) +
          this.toDouble(date.getSeconds());
        spans[i].innerHTML = str.charAt(i);
      }
    },
    initTime2() {
      var date = new Date();
      this.year = `${this.toDouble(date.getFullYear())}`;
      this.Mon = `${this.toDouble(date.getMonth() + 1)}`;
      this.Day = `${this.toDouble(date.getDate())}`;
    },
    toDouble(number) {
      if (number < 10) {
        return "0" + number;
      } else return "" + number;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.home__time {
  position: absolute;
  width: 1276px;
  display: flex;
  justify-content: space-between;
  left: 50%;
  top: 50%;
  transform: translate(-52%, -50%);
  color: #36dbf9;
  .home__timeL {
    font-size: 16px;
    display: flex;
    align-items: center;
    .date__item {
      vertical-align: middle;
      font-family: "Cri";
    }
    .home__one1 {
    }
    .home__one {
      font-family: "Cri";
      &.start {
        margin-left: 10px;
      }
      &.small {
        font-size: 12px;
        margin-top: 4px;
      }
    }
  }
  .home__timeR {
    font-size: 20px;
    cursor: pointer;
    .timeR__con {
      font-family: "Heavy";
      cursor: pointer;
    }
  }
}
</style>
