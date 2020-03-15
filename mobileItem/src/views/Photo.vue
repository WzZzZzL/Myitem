<template>
    <div class="mphoto">
        <div style="height:37px; width:100%; position:fixed;top:0; backgroung-color:white; ">
            <div class="title">剧照({{photonum}})</div>
            <div @click="back" class="back iconfont icon-arrow-lift"></div>
        </div>
        <div class="a">
            <li v-for="(a,index) in photos" :key="index" class="pli" @click="photolook(index)">
                <img :src="a" alt="">
            </li>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import {mapMutations} from "vuex"
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
export default {
    props: {
    photonum: {
      type: Number,
      default: 0
    },
    photos: {
      type: Array
    }
  },
    mounted(){
        this.hide()
    },
    methods:{
        ...mapMutations(["show","hide"]),
        back(){
        this.$emit("isphotoshow")  
    },
    photolook(index){
        ImagePreview({
            images: this.photos,
            startPosition: index,
            closeable:true,
            closeIconPosition:'top-left',
            });
    }
    },
    destroyed(){
        this.show()
    }
}
</script>

<style lang="scss" scoped>
    .mphoto{
        height: 100%;
        width: 100%;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        background:white;
        z-index:10;
    }
    .title{
        width: 100%;
        text-align: center;
        line-height: 37px;
        background: rgb(255, 255, 255);
    }
    .back{
        height: 30px;
        width: 30px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        position: absolute;
        top: 5px;
        text-align: center;
        line-height: 30px;
        font-size: 30px;
    }
    .pli{
        height: 124px;
        width: 33.333%;
        flex: 33.333%;
        float: left;
        list-style: none;
        margin-bottom: 3px;
        }
    .a{
        margin-top: 37px;
    }
    img{
        height: 100%;
        width: 100%;
    }
</style>