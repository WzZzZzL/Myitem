import http from '@/util/http'

const module = {
  namespaced:true, //命名空间
  state :{
    cinemaList:[]
  },
  actions:{
    getCinemaAction(store){
      // console.log(store.rootState)
      http.request({
        url:`/gateway?cityId=${store.rootState.city.cityId}&ticketFlag=1&k=6798623`,
        headers:{
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res=>{
        // console.log("影院",res.data)
        store.commit("setCinemaList",res.data.data.cinemas) //支持传参
        // this.arealist =......
      })
     }

  },
  mutations:{
    setCinemaList(state,data){
      // console.log("setCinemaList",data)
      state.cinemaList = data
    }

  },
  getters:{
    topDataList(state){
      //state形参s， vuex自动调用时候，传来值
      return state.cinemaList.slice(0,5)
    }

  }
}

export default module