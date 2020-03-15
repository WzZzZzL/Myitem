<template>
  <v-touch @swiperight="handleSwipeRight" style="height:100%">
  <div>
    <div class="title">
      <div class="left" @click="back"><i class="iconfont icon-close"></i></div>
      <div class="center"><span>当前城市</span></div>
    </div>
    <div class="serach">
      <van-search
      v-model="searchValue"
      shape="round"
      background="#f4f4f4"
      placeholder="请输入城市名或拼音"
      />
      <div v-show="searchValue">
        <ul v-if="searchCityList.length">
          <van-cell :title="data.name" v-for="data in searchCityList" :key="data.cityId"
          :data="data" @click="handleClick(data)"/>
        </ul>
        <div v-else class="noSearch">
        <img src="data:image/png;base64,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" alt="">
        <p>没有找到匹配的城市</p>
        </div>
      </div>   
    </div>
    <div class="content" v-show="!searchValue" :style="{height:scrollHeight}">
      <div>
        <div class="popular">
          <div>热门城市</div>
            <div class="city">
              <ul>
                <li @click="searchTo('北京')">北京</li>
                <li @click="searchTo('上海')">上海</li>
                <li @click="searchTo('广州')">广州</li>
                <li @click="searchTo('深圳')">深圳</li>
              </ul>
            </div>
          </div>
          <van-index-bar :index-list="indexList">
            <div v-for="(data,index) in datalist" :key="index">
              <van-index-anchor :index="data.index" class="index">{{data.index}}</van-index-anchor>
              <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index" @click="handleClick(item)"/>
            </div>
          </van-index-bar>
      </div>
    </div>
  </div>
  </v-touch>
</template>
<script>
import Vue from 'vue';
import { IndexBar, IndexAnchor } from 'vant';
import http from '@/util/http'
import {mapMutations,mapState} from 'vuex'
import BetterScroll from 'better-scroll'
Vue.use(IndexBar);
Vue.use(IndexAnchor);

export default {
  data(){
    return {
      indexList:[],
      datalist:[],
      searchValue:"",
      citylist:[],
      scrollHeight:"0px"
    }
  },
  mounted(){
    http.request({
      url:"gateway?k=2551865",
      headers:{
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res=>{
      // console.log(res.data.data.cities)
      this.citylist=res.data.data.cities
      this.dataFilter(res.data.data.cities)
      // console.log(this.citylist)
    }),
    this.hide()
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
  methods:{
    ...mapMutations("tabbar",["hide","show"]), //把tabbar命名空间的hide,show 截出
    dataFilter(cities){
      // var arr =["A","B","C","D","E"]
      var letterArr = []
      for(var i=65;i<91;i++){
        letterArr.push(String.fromCharCode(i))
      }
      // console.log(letterArr)

      //filter 遍历26个字母， 跟cities数据.pinyin.首字母.大写 进行过滤
      var cityArr = []
      for(var j=0;j<letterArr.length;j++){
        // console.log()
        var temparr = cities.filter(item=>item.pinyin.substring(0,1).toUpperCase()===letterArr[j])
        //收集datalist数据
        temparr.length && cityArr.push({
          index:letterArr[j],
          list:temparr
        })

        // 收集indexList，右边的数据
        temparr.length && this.indexList.push(letterArr[j])
      }

      this.datalist = cityArr
    },
    //点击城市处理函数
    handleClick(item){
      // 修改vuex 共享的 城市数据
      this.setCityName(item.name)
      this.setCityId(item.cityId)
      this.$router.back();
    },
      
    ...mapMutations("city",["setCityName","setCityId"]), //city命名空间中，取出setCityName

    //点击x返回上一级页面
    back(){
      this.$router.back();
    },

    //点击热门城市
    searchTo(data){
      let city = this.citylist.filter(item=>item.name===data)
      // console.log(city)
      this.handleClick(...city)
    },
    handleSwipeRight(){
      this.$router.back()
    }
  },
  computed:{
    searchCityList(){
      return this.citylist.filter(item=>item.pinyin.includes(this.searchValue) || item.pinyin.toUpperCase().includes(this.searchValue)
      || item.pinyin.toLowerCase().includes(this.searchValue)||item.name.includes(this.searchValue))
    }
  },
  destroyed(){
    this.show()
  }
}
</script>
<style lang="scss" scoped>
.title{
  position:fixed;
  left: 0;
  top: 0;
  width:100%;
  height:44px;
  z-index:10;
  background-color: white;
  .left{
    height: 44px;
    float: left;
    width: 14%;
    text-align: center;
    line-height: 44px;
    .iconfont{
      font-size: 20px;
    }
  }
  .center{
    height: 44px;
    width:72%;
    float: left;
    text-align: center;
    font-size: 17px;
    line-height: 44px;
  }
}
.serach{
  position: fixed;
  left: 0;
  top: 44px;
  width:100%;
  height: 49px;
  z-index:10;
  .noSearch{
    position: absolute;
    top: 107px;
    width: 100%;
    text-align: center;
    img{
      width:90px;
    }
    p{
      color: #bdc0c5;
      font-size: 14px;
      margin: 0;
    }
  }
}
.content{
  position: relative;
  top:98px;
  .index{
    background-color: #f4f4f4;
  }
  .popular{
    padding-left:16px;
    padding-right:16px;
    padding-top:15px;
    font-size: 13px;
    color: #797d82;
    margin-bottom: 10px;
    ul{
      width: 100%;
      height:100px;

      li{
        width:30%;
        height:30px;
        background-color: #f4f4f4;
        color: #191a1b;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        float: left;
        margin-right: 3%;
        margin-bottom: 10px;
        margin-top:10px;
      }
    }
  }
}
</style>
