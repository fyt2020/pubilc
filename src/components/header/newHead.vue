<template>
  <div class="newHead">
    <div class="newHead__left">
      <img src="../../assets/img/img3/logo.png" alt class="newHead__img" @click="goLogin" />
    </div>
    <div class="newHead__right">
      <div class="newHead__info">
        <span class="deviceSno_wrap">
          <span class="deviceSno_item">设备编号:{{fromData.deviceNo}}</span>
        </span>
        <span class="deviceAddress_wrap">
          <span class="deviceAddress_item">{{fromData.area}}</span>
          <span class="deviceAddress_item">{{fromData.orgName}}</span>
        </span>
      </div>
      <img src="../../assets/img/img3/acc.png" alt class="acc" />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      deviceSno: 1654617,
      city: "",
      area: "",
      orgName: "",
      fromData: {
        collectNo: "aflm1570524718264",
        orgName: "",
        orgId: "",
        tag: [],
        username: "",
        idNo: "",
        type: 1,
        sex: "男",
        age: null,
        ethnicity: "",
        address: "",
        accessToken: "",
        dataUrl: ""
      }
    };
  },
  computed: {},
  created() {
    this.getInfo();
  },
  mounted() {},
  watch: {},
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
    getInfo() {
      let VM = this;
      let params = {
        req: "params"
      };
      this.$http.api
        .post(window.BASEURL.infoUrl + `camera_server/api/browser/v1`, params)
        .then(function(res) {
          if (res.status === 200 && res.data.msg == "ok") {
            let data = JSON.parse(res.data.data);
            VM.fromData = data;
            // console.log(data);
          } else {
            // console.log(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/css/header/newHead.scss";
</style>
