<template>
    <div style="height:100%;" class="swiper-container">
    <div class="swiper-wrapper">
        <div v-for="a in url" :key="a.bannerId" class="swiper-slide">
            <img :src="a.imgUrl" alt="">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
</div>
</template>

<script>
import Swiper from 'swiper'
import axios from 'axios'
import 'swiper/css/swiper.min.css'
export default {
    data() {
        return {
            url:[]
        }
    },
    mounted () {
        new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        },
        autoplay: {
            delay: 500,
            disableOnInteraction: false
        }
        })

        axios({
            url: `https://m.maizuo.com/gateway?type=2&cityId=310100&k=7584794`,
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1582277687167503725352","bc":"310100"}',
                'X-Host': 'mall.cfg.common-banner'
            }
            }).then(res => {
                this.url = res.data.data
            })
  }
}
</script>

<style lang="scss" scoped>
    img{
        height: 97%;
        width: 100%;
    }
</style>