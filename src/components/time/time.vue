<template>
  <div class="time-war">
    <div class="clock">
      <span class="one">0</span>
      <span class="one">0</span>
      <b>:</b>
      <span class="one">0</span>
      <span class="one">0</span>
      <b>:</b>
      <span class="one">0</span>
      <span class="one">0</span>
    </div>
    <div class="time-mid">
      <p class="one-one">
        <span>{{nowDay}}</span>
      </p>
      <p class="two-w">
        <span>{{new Date().getFullYear()}}</span>
        <span>-</span>
        <span>{{new Date().getMonth()+1}}</span>
        <span>-</span>
        <span>{{new Date().getDate()}}</span>
      </p>
    </div>
    <div class="time-right">
      <img src="../../assets/img/img/Welcome.png" alt class="time-right-img" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weekDay: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      nowDay: ""
    };
  },
  created() {
    this.initDay();
  },
  mounted() {
    setInterval(this.initTime, 1000);
  },
  methods: {
    initTime() {
      var spans = document.getElementsByClassName("one");
      var date = new Date();
      for (var i = 0; i < spans.length; i++) {
        var str =
          this.toDouble(date.getHours()) +
          this.toDouble(date.getMinutes()) +
          this.toDouble(date.getSeconds());
        spans[i].innerHTML = str.charAt(i);
      }
    },
    initDay() {
      let index = new Date().getDay();
      this.nowDay = this.weekDay[index];
    },
    toDouble(number) {
      if (number < 10) {
        return "0" + number;
      } else return "" + number;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/time/time.scss";
</style>