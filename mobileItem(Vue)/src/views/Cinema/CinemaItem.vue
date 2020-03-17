<template>
    <li @click="handleclick(data)">
        <div class="left">
        <p class="nm">{{data.name}}</p>
        <p class="sm">{{data.address}}</p>
        </div>
        <div class="right" v-if="ticketFlag==='1'?true:false">
        <span>￥{{data.lowPrice/100}}起</span>
        </div>
    </li>
</template>
<script>
export default {
  props:["data","ticketFlag"],
  methods:{
      handleclick(data){
          this.$emit("GoFilm",data)
      }
  }
}
</script>
<style lang="scss" scoped>
li{
    padding:15px;
    width: 100%;
    height: 75px;
    box-sizing: border-box;
    .left{
    float: left;
    width: calc(100% - 70px);
    height: 41px;
    box-sizing: border-box;
    .nm{
        font-size: 15px;
        color: #191a1b;
    }
    .sm{
        color: #797d82;
        font-size: 12px;
        margin-top: 5px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    }
    .right{
    width: 70px;
    float:right;
    font-size: 15px;
    color: #ff5f16;
    text-align: center;
    }
}
</style>
