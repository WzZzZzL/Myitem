<template>
    <v-touch @swiperight="right" @swipeleft="left" tag="div" class="box">
     <p>
         <img src="https://static.maizuo.com/v5/upload/f2d0a106ad0574fb544494cfe444027e.jpg" alt="">
         <img src="https://static.maizuo.com/v5/upload/6928d6f40c89735b821e7fd570ace0fb.jpg" alt="">
         <img src="https://static.maizuo.com/v5/upload/7278c394d686fbe818f11a246f9ff61e.jpg" alt="">
    </p>   
    <p>
        <img src="https://static.maizuo.com/v5/upload/e1144eb750ad1d48455d25909e4362dd.jpg" alt="">
        <img src="https://static.maizuo.com/v5/upload/e40ba2cedccfbde644fa12d94303d630.jpg" alt="">
        <img src="https://static.maizuo.com/v5/upload/f2c75c342260d4cea4ada7c30f5509c4.jpg" alt="">
        <img src="https://static.maizuo.com/v5/upload/2514b008f5089a8fca683b17c9a0da5f.jpg" alt="">
        <img src="https://static.maizuo.com/v5/upload/b63ef678c7693903b0543a05ea125c4b.jpg" alt="">
        <img src="https://static.maizuo.com/v5/upload/e40ba2cedccfbde644fa12d94303d630.jpg" alt="">
        <img src="https://static.maizuo.com/v5/upload/e40ba2cedccfbde644fa12d94303d630.jpg" alt="">
    </p>
    </v-touch>
</template>

<script>
import Vue from 'vue'
import {mapMutations} from "vuex"
export default {
    methods:{
        ...mapMutations("tabbar",["show","hide"]),
        left(){
            this.$router.push('/center')
        },
        right(){
            this.$router.push('/cinema')
        }
    },
    mounted() {
        this.hide()
    },
    destroyed(){
        this.show()
    },
    
}
</script>

<style lang="scss" scoped>
    .box{
        width: 100%;
        overflow: hidden;
        p{
            img{
                font-size: 12px;
                max-width: 100%;
            }
        }
    }
</style>