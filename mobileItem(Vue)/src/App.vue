<template>
  <div>
   <transition name="app" mode="out-in">
        <router-view></router-view>
    </transition>
    <tabbar v-show="isTabbarShow"></tabbar>
  </div>
</template>

<script>
import {mapState} from "vuex"
import tabbar from '@/components/Tabbar'
export default {
  computed:{
    ...mapState(["isTabbarShow"])
  },
  components: {
    tabbar
  },
  computed: {
    //从tabbar命名空间中直接找 isTabbarShow
    ...mapState("tabbar",["isTabbarShow"])
  },
}
</script>

<style lang="scss" scoped>
div{
  height: 100%;
}
.app-enter-active {
  animation: aaa .2s;
}
.app-leave-active {
  animation: aaa .2s reverse;
}
@keyframes aaa {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>