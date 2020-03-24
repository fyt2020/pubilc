<template>
    <div class="foot-wapper">
        <p class="header">
             <span class="left"> 
                 <img src="../../assets/img/img/Camera.png" alt="" class="img">
                 <span class="word">{{con.name}}</span>
            </span>

            <span class="right">
                  <img src="../../assets/img/img/ip.png" alt="" class="img">
                  <span class="word">设备编号:{{con.no}}</span>
            </span>
            
        </p>
        <p class="foot">
             <span class="right">
                  <img src="../../assets/img/img/address.png" alt="" class="img">
                  <span class="word"> 设备地址：{{con.address}}</span>
            </span>
        </p>
    </div>
</template>

<script>
export default {
    props:['con']
}
</script>


<style lang="scss" scoped>
   @import "@/assets/css/footer/footer.scss"; 
</style>