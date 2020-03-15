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
                <input type="password" placeholder="密码" v-model="userPassword"><i class="iconfont icon-reeor-fill" v-show="userPassword" @click="noPsd"></i>
            </form>
        </div>
        <div class="login" @click="check">
            <span>登陆</span>
        </div>
        <div class="reg" @click="toRegister">
            <span>没有账号?点击注册</span>
        </div>
        <div :class="ok==true?'ok':'fail'">
            <span>{{end}}</span>
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
            end:'',
            ok:false
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
        toRegister(){
            this.$router.push('/register')
        },
        check(){
            let obj=JSON.parse(localStorage.getItem('userinfo'))
            let str=''
            if(obj==null){
                this.end='账号或密码错误！'
                return
            }
            if(obj.filter(item=>{return item.id==this.userId})){
                str=obj.filter(item=>{
                    return item.id==this.userId
                })
                if(str[0].password==this.userPassword){
                    // console.log('登陆成功！')
                    this.ok=true
                    this.end='登陆成功！'
                    localStorage.setItem('islog',true)
                    localStorage.setItem('username',this.userPassword)
                    this.goCenter()
                }else{
                    // console.log('登陆失败！')
                    this.ok=false
                    this.end='账号或密码错误！'
                }
            }else{
                this.end='账号或密码错误！'
            }
        },
        goCenter(){
            const _this =this
            setTimeout(function(){
                _this.$router.push('/center')
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
        .login{
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
        .reg{
            display: inline-block;
            position: absolute;
            right: 25px;
            font-size: 10px;
            color:gray;
            opacity: .9;
            z-index: 10;
        }
    }
.ok{
    text-align: center;
    color:green;
    opacity: .9;
    font-size: 14px;
}
.fail{
    text-align: center;
    color:red;
    opacity: .9;
    font-size: 14px;
} 
</style>