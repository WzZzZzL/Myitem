<template>
    <div class="main">
        <div class="title" style="margin-bottom:10px;">
            <div class="left" @click="back"><i class="iconfont icon-arrow-lift"></i></div>
            <div class="center">组合红包</div>
        </div>
        <div class="no">
            <img src="data:image/png;base64,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" width="95px" height="95px">
            <span>你还没有组合红包哦~</span>
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