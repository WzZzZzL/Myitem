<template>
    <div class="main">
        <div class="title" style="margin-bottom:10px;">
            <div class="left" @click="back"><i class="iconfont icon-arrow-lift"></i></div>
            <div class="center">卖座券</div>
        </div>
        <div class="no">
            <img src="data:image/png;base64,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" alt="" class="no-card-img">
            <span>你还没有卖座券哦~</span>
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
.no{
    width:100%;
    text-align:center;
    height: 180px;
    img{
        display: block;
        margin: 0 auto;
        width: 95px;
        height: 95px;
        margin-top: 50%;
        margin-bottom: 5%;
    }
    span{
        font-size: 16px;
        color: #bdc0c5;
    }
}

</style>