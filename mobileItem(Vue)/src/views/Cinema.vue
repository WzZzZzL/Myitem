<template>
  <div>
    <div class="title">
        <div class="left" @click="handleChangePage('/city')">{{cityName}} <i class="iconfont icon-arrow-down"></i></div>
        <div>影院</div>
        <div class="right" ><i class="iconfont icon-search" @click="handleChangePage('/cinema/search')" style="font-size:16px;"></i></div>
    </div>

    <div class="select">
        <div @click="isAreaShow=!isAreaShow;isBookingShow=false;ishavebeenShow=false" :class="isAreaShow===true?'active':''">{{current}} <i :class="isAreaShow===true?'iconfont icon-arrow-up':'iconfont icon-arrow-down'"></i></div>
        <div @click="isBookingShow=!isBookingShow;isAreaShow=false;ishavebeenShow=false" :class="isBookingShow===true?'active':''">APP订票 <i :class="isBookingShow===true?'iconfont icon-arrow-up':'iconfont icon-arrow-down'"></i></div>
        <div @click="ishavebeenShow=!ishavebeenShow;isAreaShow=false;isBookingShow=false" :class="ishavebeenShow===true?'active':''">最近去过 <i :class="ishavebeenShow===true?'iconfont icon-arrow-up':'iconfont icon-arrow-down'"></i></div>
    </div>

    <div class="area" v-show="isAreaShow">
      <ul>
        <li v-for="data in arealist" :key="data" @click="handleArea(data)"
        :class="data===current?'active':''">
          {{data}}
        </li>
      </ul>
    </div>
    <div class="booking" v-show="isBookingShow">
      <ul>
        <li @click="handleBooking('1')" :class="ticketFlag==='1'?'active':''"><i :class="ticketFlag==='1'?'iconfont icon-seleted':''"></i><span>APP订票</span></li>
        <li @click="handleBooking('2')" :class="ticketFlag==='1'?'':'active'"><i :class="ticketFlag==='2'?'iconfont icon-seleted':''"></i><span>前台兑换</span></li>
      </ul>
    </div>
    <div class="havebeen" v-show="ishavebeenShow">
      <ul>
        <li @click="handleHavebeen('1')" :class="ishavebeen===true?'active':''"><i :class="ishavebeen===true?'iconfont icon-seleted':''"></i><span>最近去过</span></li>
        <li @click="handleHavebeen('2')" :class="ishavebeen===true?'':'active'"><i :class="ishavebeen===true?'':'iconfont icon-seleted'"></i><span>离我最近</span></li>
      </ul>
    </div>
<v-touch @swiperight="handleSwipeRight" @swipeleft="handleSwipeLeft">
    <div class="content" :style="{height:scrollHeight}">
        <ul>
          <cinema-item   v-for="data in computedDatalist" :key="data.cinemaId"
          :data="data" :ticketFlag="ticketFlag" @GoFilm="GotoFilm"  ></cinema-item>
        </ul>
    </div>
</v-touch>
    <div :class="(isAreaShow||isBookingShow||ishavebeenShow)===true?'overlay':''" ></div>
  </div>
  
</template>
<script>
import http from '@/util/http'
import cinemaItem from './Cinema/CinemaItem'
import Vue from 'vue';
import { Toast } from 'vant';
import { mapState } from 'vuex' //mapState 是vuex提供的切割函数，
import { mapMutations } from 'vuex'
import BetterScroll from 'better-scroll'
Vue.use(Toast);
export default {
  components:{
    cinemaItem
  },
  data(){
    return {
      datalist:[],
      isAreaShow:false,
      current:"全城",//选中是哪个区
      scrollHeight:"0px",
      isBookingShow:false,
      ishavebeen:false,
      ishavebeenShow:false,
      ticketFlag:'1'
    }
  },
  beforeMount(){
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay:true, //是否显示背景遮罩层
      duration:0 //不会消失
    });
  },
  mounted(){
      // disptch 到 vuex中action
      if(this.cinemaList.length===0){
        this.$store.dispatch("cinema/getCinemaAction",this.cityId).then(res=>{
          // console.log("异步结束，已经存到vuex")
          Toast.clear();
        })
      }else{
        // console.log("cinema","使用缓存")
        Toast.clear();
      }

      //betterscroll
      this.scrollHeight = document.documentElement.clientHeight-80-50+"px"
      //初始化betterscroll
      new BetterScroll(".content",{
        scrollbar: {
          fade: true,
          interactive: false // 1.8.0 新增
        },
        click:true //支持click事件
      })
  },
  methods: {
    GotoFilm(data){
      // console.log(data.cinemaId)
      this.$router.push(`/cinema/${data.cinemaId}`)
    },
    ...mapMutations("cinema",["setCinemaList"]),
    handleBooking(data){
      //改变ticketFlag
      this.isBookingShow = false;
      // console.log(this.$store.state.city.cityId)
      let newid = this.$store.state.city.cityId
      if(this.ticketFlag !== data){
        http.request({
          url:`/gateway?cityId=${newid}&ticketFlag=${data}&k=6798623`,
          headers:{
            'X-Host': 'mall.film-ticket.cinema.list'
          }
        }).then(res=>{
          // console.log(res.data.data.cinemas)
          this.$store.commit("cinema/setCinemaList",res.data.data.cinemas) //支持传参
        })
      }  
      this.ticketFlag = data
    },
    handleHavebeen(data){
      if(data === '1'){
        this.ishavebeen = true
      }else{
        this.ishavebeen = false
      }
      this.ishavebeenShow=false
    },
    handleArea(data){
      //改变current值， current值改变， 计算属性自动计算一遍
      this.current = data;
      this.isAreaShow = false; 
    },

    handleChangePage(path){
      // this.$router.push(`/cinema/search`) //跳转路径
      if(path === '/city'){
        //清空共享状态 vuex cinemaList
        this.setCinemaList([]);
      }
      this.$router.push(path) //跳转路径
    },
    handleSwipeRight(){
      this.$router.push('/film')
    },
    handleSwipeLeft(){
      this.$router.push('/info')
    } 
  },
  computed: {
    ...mapState("cinema",["cinemaList"]),
    ...mapState("city",["cityName","cityId"]),
    //所有区的计算属性
    arealist(){
      //对象=>里面的某个属性
      var newarr = this.cinemaList.map(item=>item.districtName)
      //利用set结构进行数组去重，Array.from 把类数组结构转换成数组结构
      var arealist =["全城",...Array.from(new Set(newarr))]
      return arealist
    },
    //根据选择的不同区域，过滤出相应区域的影院
    computedDatalist(){
      if(this.current ==="全城") return this.cinemaList
      return this.cinemaList.filter(item=>item.districtName===this.current)
    }
  },
}
</script>
<style lang="scss" scoped>
ul{
  box-sizing: border-box;
}
.title{
  display: flex;
  position:fixed;
  top:0px;
  left:0px;
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: white;
  z-index:10;
  border-bottom: 1px solid #f9f9f9;
  box-sizing: border-box;
    div{
        flex:1;
        text-align: center;
        font-size: 17px;
    }
    .left{
        text-align: left;
        padding-left: 15px;
        box-sizing: border-box;
        font-size: 13px;
    }
    .right{
        text-align: right;
        padding-right: 15px;
        box-sizing: border-box;
    }
}

.select{
  display: flex;
  position:fixed;
  top:44px;
  left:0px;
  width: 100%;
  height: 49px;
  line-height: 49px;
  background: white;
  z-index: 10;
  font-size: 14px;
  border-bottom: 1px solid #f9f9f9;
  box-sizing: border-box;
    div{
        flex:1;
        text-align: center;
    }
}
.content{
  position: relative;
  top:93px;
  overflow: hidden;
}
.active{
  color:#ff5f16;
}
.area{
  position:fixed;
  top:93px;
  left:0px;
  width: 100%;
  background: white;
  z-index:10;
  padding-top:5px;
  padding-bottom:5px;
  box-sizing: border-box;
    .active{
      border:1px solid #ff5f16 !important;
      box-sizing: border-box;
      color:#ff5f16;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 5px;
        li{
          width: 21%;
          margin-right: 2%;
          margin-left: 2%;
          color: #797d82;
          border-radius: 4px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          border:1px solid #f3f4f6;
          box-sizing: border-box;
          font-size: 12px;
          margin-bottom: 6px;
          overflow: hidden;  
        }
    }
}
.booking{
  position:fixed;
  top:93px;
  left:0px;
  width: 100%;
  background: white;
  z-index:10;
  padding-top:5px;
  box-sizing: border-box;
  .active{
    box-sizing: border-box;
    color:#ff5f16;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    li{
      width: 100%;
      color: #797d82;
      border-radius: 4px;
      height: 44px;
      line-height: 44px;
      box-sizing: border-box;
      font-size: 13px;
      border-bottom: 1px solid #f4f4f4; 
      span{
        position: absolute;
        left: 37px;
      }
    }
  }
  .iconfont{
    font-size: 20px;
    position: absolute;
    left: 5px;
  }
}
.havebeen{
  position:fixed;
  top:93px;
  left:0px;
  width: 100%;
  background: white;
  z-index:10;
  padding-top:5px;
  box-sizing: border-box;
  .active{
    box-sizing: border-box;
    color:#ff5f16;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 100%;
      color: #797d82;
      border-radius: 4px;
      height: 44px;
      line-height: 44px;
      box-sizing: border-box;
      font-size: 13px;
      border-bottom: 1px solid #f4f4f4; 
      span{
        position: absolute;
        left: 37px;
      }
    }
  }
  .iconfont{
    font-size: 20px;
    position: absolute;
    left: 5px;
  }
}
.overlay{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: rgba(0,0,0,.6);
  z-index: 9!important;
}
.iconfont{
  font-size:12px;
}
</style>
