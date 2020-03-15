<template>
    <div class="main">
        <div class="title" style="margin-bottom:10px;">
            <div class="left" @click="back"><i class="iconfont icon-arrow-lift"></i></div>
            <div class="center">设置</div>
        </div>
        <div class="tabs">
            <div class="tab2" style="margin-bottom:10px;">
                <span>账号ID</span>
                <span class="ic">{{name}}</span>
            </div>
            <div class="tab2">
                <span>登录密码</span>
                <span class="ic">修改   <i class="iconfont icon-arrow-right"></i></span>
            </div>
            <div class="tab2" style="margin-bottom:10px;">
                <span>安全密码</span>
                <span class="ic">未设置   <i class="iconfont icon-arrow-right"></i></span>
            </div>
            <div class="tab2">
                <span>版本软件</span>
                <span class="ic"><i class="iconfont icon-arrow-right"></i></span>
            </div>
            <div class="tab2">
                <span>隐私政策</span>
                <span class="ic"><i class="iconfont icon-arrow-right"></i></span>
            </div>
            <div class="tab2">
                <span>用户协议</span>
                <span class="ic"><i class="iconfont icon-arrow-right"></i></span>
            </div>
            <div class="tab2" style="margin-bottom:10px;">
                <span>意见反馈</span>
                <span class="ic"><i class="iconfont icon-arrow-right"></i></span>
            </div>
            <div class="tab2">
                <span>清除缓存</span>
                <span class="ic">0.8 KB</span>
            </div>
            <div class="tab3" @click="logOut">
                <span>退出登录</span>
                <span class="ic"></span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data() {
        return {
            name:''
        }
    },
    methods: {
    ...mapMutations("tabbar",["hide","show"]), //把tabbar命名空间的hide,show 截出
        back(){
            this.$router.back()
        },
        logOut(){
            localStorage.removeItem('islog')
            localStorage.removeItem('username')
            this.$router.push('/center')
        }
    },
    mounted(){
        this.hide()
        let name=JSON.parse(localStorage.getItem('username'))
        this.name=name
    },
    destroyed(){
        this.show()
    }
}
</script>
<style lang="scss" scoped>
.main{
    background-color: #f4f4f4;
}
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
.tabs{
    width:100%;
    margin-top:10px;
    font-size: 15px;
    .tab2{
        height:50px;
        padding-left: 15px;
        line-height: 50px;
        border-bottom: 1px solid #f4f4f4;
        background-color: white;
        .ic{
            float: right;
            margin-right: 15px;
            font-size: 13px;
            color: #797d82;
        }
    }
    .tab3{
        width: 100%;
        height:50px;
        line-height: 50px;
        background-color: white;
        color: red;
        text-align: center;
        position: absolute;
        bottom: 0;
    }
}
</style>