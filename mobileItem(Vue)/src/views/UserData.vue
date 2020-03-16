<template>
    <div class="main">
        <div class="title">
            <div class="left" @click="back"><i class="iconfont icon-arrow-lift"></i></div>
            <div class="center">我的资料</div>
        </div>
        <div class="tabs">
            <div class="tab1">
                <span>头像</span>
                <img src="https://mall.s.maizuo.com/343e03528520399b9de18b164d980d1f.jpg" width="50px" height="50px" class="head-icon">
            </div>
            <div class="tab2">
                <span>昵称</span>
                <span class="ic">{{name}}</span>
            </div>
            <div class="tab2">
                <span>性别</span>
                <span class="ic">未设置</span>
            </div>
            <div class="tab2">
                <span>出生日期</span>
                <span class="ic">未设置</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name:''
        }
    },
    methods: {
        back(){
            this.$router.back()
        },
    },
    mounted(){
        let name=JSON.parse(localStorage.getItem('username'))
        this.name=name
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
    background-color: white;
    .tab1{
        height:80px;
        border-bottom: 1px solid #f4f4f4;
        padding-left: 15px;
        position: relative;
        span{
            line-height: 80px;
            float: left;
        }
        img{
            position: absolute;
            right: 15px;
            top:15px;
        }
    }
    .tab2{
        height:50px;
        padding-left: 15px;
        line-height: 50px;
        border-bottom: 1px solid #f4f4f4;
        .ic{
            float: right;
            margin-right: 15px;
            font-size: 13px;
            color: #797d82;
        }
    }
}
</style>