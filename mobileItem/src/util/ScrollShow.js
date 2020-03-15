import Vue from 'vue'
Vue.directive('title', {
  inserted (el, bind) {
    // 插入到dom之后的钩子函数
    // console.log(bind.value)
    el.style.display = 'none'
    window.onscroll = () => {
      // console.log(document.documentElement.scrollTop)
      if ((document.documentElement.scrollTop || document.body.scrollTop) > bind.value) {
        // 显示
        el.style.display = 'block'
      } else {
        // 隐藏
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    // 指令的解绑的生命周期 钩子函数
    window.onscroll = null
  }
})