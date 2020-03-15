<template>
    <div class="main">
        <div class="title" style="margin-bottom:10px;">
            <div class="left" @click="back"><i class="iconfont icon-arrow-lift"></i></div>
            <div class="center">余额明细</div>
        </div>
        <div class="head">
            <p>当前余额</p>
            <span>￥0.00</span>
        </div>
        <div class="no">
            <img data-v-ee664480="" src="data:image/png;base64,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" alt="">
            <span>暂无余额使用明细</span>
        </div>
    </div>
</template>
<script>
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    methods:{
        ...mapMutations("tabbar",["hide","show"]), //把tabbar命名空间的hide,show 截出
         back(){
            this.$router.back()
        }
    },
     mounted(){
        this.hide()
    },
    destroyed(){
        this.show()
    }
}
</script>
<style lang="scss" scoped>
.title{
    width:100%;
    height: 44px;
    background-color: white;
    .left{
        width:10%;
        float: left;
        line-height: 44px;
        padding-left: 10px;
        .iconfont{
            font-size: 30px;
        }
    }
    .center{
        width:80%;
        float: left;
        text-align: center;
        line-height: 44px;
        font-size: 17px;
    }
}
.head{
    height:140px;
    background-image: url(https://assets.maizuo.com/h5/v5/public/app/img/head-bg.424c804.png);
    background-size: cover;
    text-align: center;
    padding-top: 50px;
    box-sizing: border-box;
    color: white;
    p{
        font-size: 13px;
        margin-bottom: 5px;
    }
    span{
        font-size: 30px;;
    }
}
.no{
    width:100%;
    text-align:center;
    height: 180px;
    img{
        display: block;
        margin: 0 auto;
        width: 95px;
        height: 95px;
        margin-top: 20%;
        margin-bottom: 5%;
    }
    span{
        font-size: 16px;
        color: #bdc0c5;
    }
}

</style>