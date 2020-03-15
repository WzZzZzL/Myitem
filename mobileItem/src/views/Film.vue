<template>
    <div class="main">
     <div class="list">
         <div class="area">
             <span @click="tocimema" class="iconfont icon-arrow-down">{{cityName}}</span>
         </div>
         <div class="banner">
             <swiper></swiper>
         </div>
         <div class="tab">
             <div class="tab1">
                 <ul>
                     <router-link to="/film/nowplaying" tag="li" active-class="active"><span>正在热映</span></router-link>
                     <router-link to="/film/comingsoon" tag="li" active-class="active"><span>即将上映</span></router-link>
                 </ul>
             </div>
         </div>
         <transition name="app" mode="out-in">
             <router-view></router-view>
         </transition>
     </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import swiper from '@/components/Swiper'
export default {
  components: {
    swiper
  },
  computed:{
      ...mapState("city",["cityName"])
  },
  methods:{
      tocimema(){
          this.$router.push(`/cinema`)
      }
  }
}
</script>

<style lang="scss" scoped>
.app-enter-active {
  animation: aaa .2s;
}
.app-leave-active {
  animation: aaa .2s reverse;
}
@keyframes aaa {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
    .main{
        height: 100%;
        background-color: #f4f4f4;
        box-sizing: border-box;
        .list{
            position: relative;
            top: 0px;
            box-sizing: border-box;
            .banner{
                height: 56vw;
                box-sizing: border-box;
            }
            .tab{
                position: relative;
                z-index: 100;
                width: 100%;
                overflow-x: hidden;
                background: #fff;
                box-sizing: border-box;
                .tab1{
                    height: 49px;
                    display: flex;
                    align-items: center;
                    overflow-x: auto;
                    overflow-y: hidden;
                    position: relative;
                    ul{
                        display:flex;
                        justify-content: flex-start;
                        align-items: center;
                        position: relative;
                        width: 100%;
                        list-style: none;
                        li{
                            width: 50%;
                            color: #191a1b;
                            text-align: center;
                            height: 16px;
                            line-height: 16px;
                            font-size: 14px;
                            
                        }
                        .active{
                            color: #ff5f16;
                            span{
                                border-bottom:2px solid;
                                color: #ff5f16;
                                display: inline-block;
                                height: 30px;
                            }
                        }
                    }
                }
            }
            .area{
                position: absolute;
                top: 18px;
                left: 7px;
                color: #fff;
                z-index: 10;
                font-size: 13px;
                background: rgba(0,0,0,.5);
                height: 30px;
                line-height: 30px;
                border-radius: 15px;
                text-align: center;
                padding: 0 5px;
            }
        }
    }
</style>