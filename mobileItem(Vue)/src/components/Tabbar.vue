<template>
     <ul>
         <router-link v-for="list in title" :key='list.name' :to='{path:list.path}' tag='li' active-class="active">
             <div class="x">
                 <span :class="['a','iconfont',list.icon]"></span>
                 <span class="b">{{list.name}}</span>
             </div>
         </router-link>
     </ul>
</template>

<script>
export default {
  data () {
    return {
      title: [
        { name: '电影', path: '/film', icon: 'icon-scenes' },
        { name: '影院', path: '/cinema', icon: 'icon-company' },
        { name: '资讯', path: '/info', icon: 'icon-image-text' },
        { name: '我的', path: '/center', icon: 'icon-account' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
    .active{
        color: #ff5f16;
    }
    ul{
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        padding: 0;
        margin: 0;
        z-index: 100;
        background: #fff;
        li{
            width: 25%;
            text-align: center;
            color: #797d82;
            .x{
                width: 100%;
                height: 49px;
                float: left;
                line-height: 28px;
                position: relative;
                outline: none;
                text-decoration: none;
                .a{
                    width: 21px;
                    height: 21px;
                    padding-top: 8px;
                    font-size: 30px;
                }
                .b{
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 10px;
                    line-height: 12px;
                    word-break: keep-all;
                    top: 32px;
                }
            }
        }
    }
</style>