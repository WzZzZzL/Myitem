const module = {
    namespaced:true, //命名空间
    state:{
      isTabbarShow:true,
    },
    actions:{
  
    },
    mutations:{
      show(state){
        // console.log("show")
        state.isTabbarShow = true
      },
      hide(state){
        // console.log("hide")
        state.isTabbarShow = false
      },
    }
  }
  
  export default module