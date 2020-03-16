<template>
    <v-touch @swiperight="right" tag="div" class="box">
    <div class="box">
        <div class="logo">
            <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" alt="">
        </div>
        <div class="form">
            <form>
                <input type="tel" placeholder="账号" v-model="userId"><i class="iconfont icon-reeor-fill" v-show="userId" @click="noId"></i>
            </form>
        </div>
        <div class="form">
            <form>
                <input type="tel" placeholder="密码" v-model="userPassword"><i class="iconfont icon-reeor-fill" v-show="userPassword" @click="noPsd"></i>
            </form>
        </div>
        <div class="reg" @click="reg">
            <span>注册</span>
        </div>
        <div class="warn">
            <span>{{warning}}</span><span style="color:green;opacity:1;">{{ok}}</span>
        </div>
    </div>
    </v-touch>
</template>
<script>
import { mapMutations} from 'vuex'
export default {
    data() {
        return {
            userId:'',
            userPassword:'',
            warning:'',
            ok:''
        }
    },
    methods:{
        ...mapMutations("tabbar",["hide","show"]), //把tabbar命名空间的hide,show 截出
        right(){
            this.$router.back()
        },
        noId(){
            this.userId=''
        },
        noPsd(){
            this.userPassword=''
        },
        reg(){
            this.warning=''
            this.ok=''
            let info={id:this.userId,password:this.userPassword}
            if(this.userId.length==0&&this.userPassword.length==0){
                this.warning='请输入账号密码!'
            }else if(this.userId.length==0){
                this.warning='请输入账号!'
            }else if(this.userPassword.length==0){
                this.warning='请输入密码!'
            }else if(this.userId.length<6||this.userPassword.length<6){
                this.warning='账号与密码不能低于6位数!'
            }else if(this.userId.includes(' ')){
                this.warning='账号不能带有空格!'
            }else if(localStorage.getItem('userinfo')){
                let obj=JSON.parse(localStorage.getItem('userinfo'))
                if(obj.every(item=>{return item.id!==info.id})){
                    this.ok='注册成功!'
                    obj.push(info)
                    localStorage.setItem('userinfo',JSON.stringify(obj))
                    this.toLogin()
                }else{
                    this.warning='此帐号已被注册'
                }
            }else{
                this.ok='注册成功!'
                localStorage.setItem('userinfo',JSON.stringify([info]))
                this.toLogin()
            }
        },
        toLogin(){
            const _this =this
            setTimeout(function(){
                _this.$router.push('center/centerloginpage')
            }, 1500)   
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
.box{
    font-size: 15px;
    box-sizing: border-box;
    .logo{
        margin: 79px auto 40px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        img{
            height: 60px;
        }
    }
    .form{
        width: 100%;
        position: relative;
        box-sizing: border-box;
        form{
            line-height: 55px;
            margin: 0 25px;
            position: relative;
            border-bottom: 1px solid #c2c2c2;
            input{
                height: 15px;
                line-height: 15px;
                padding: 20px 0;
                width: 100%;
                font-size: 15px;
                color: #191a1b;
                border: 0;
                outline-width: 0;
            }
            .iconfont{
                position: absolute;
                right: 10px;
                top: 5px;
            }
        }
    }
    .reg{
        margin-top: 70px;
        line-height: 45px;
        font-size: 16px;
        margin-left:25px;
        margin-right:25px;
        margin-bottom: 8px;
        border-radius: 3px;
        text-align: center;
        background-color: #ff5f16;
        height: 44px;
        color: #fff;
        border: none;
    }
}
.warn{
    text-align: center;
    color:red;
    opacity: .5;
    font-size: 14px;
}
</style>