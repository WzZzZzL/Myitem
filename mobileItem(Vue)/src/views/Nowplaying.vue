<template>
    <v-touch @swipeleft="tocoming" tag="div" >
        <div class="list">
            <ul>
                <li v-for="a in list" :key="a.filmId" @click="todetail(a.filmId)">
                <div class="a">
                    <div class="img">
                        <img :src="a.poster" alt="">
                    </div>
                    <div class="info">
                        <div class="name">
                            <span class="name1">{{a.name}}</span>
                            <span class="item">{{a  | gradeFilter}}</span>
                        </div>
                        <div class="grade">
                            <span class="grade1">观众评分 </span>
                            <span class="grade2">{{a.grade}}</span>
                        </div>
                        <div class="actors">
                            <span>主演：{{a.actors | actorFilter}}</span>
                        </div>
                        <div class="area">
                            <span>{{a.nation}} | {{a.runtime}}分钟</span>
                        </div>
                    </div>
                    <div @click.stop="tocinema" class="but">购票</div>
                </div>
                </li>
            </ul>
            <div class="nomore">- 无更多电影 -</div>
            <div class="space"></div>
        </div>
    </v-touch>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import {mapState} from 'vuex'
Vue.filter('actorFilter', function (data) {
  return data.map(item => item.name).join(' ')
})
Vue.filter('gradeFilter', function (a) {
  return a.filmType.name
  
})
export default {
    data() {
        return {
            list:[]
        }
    },
    mounted () {
        axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=4003834`,
        method: 'get',
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1582277687167503725352","bc":"310100"}',
            'X-Host': 'mall.film-ticket.film.list'
        }
        }).then(res => {
            this.list = res.data.data.films
        })
  },
  methods:{
      todetail(id){
          this.$router.push(`/detail/${id}`)
      },
      tocoming(){
          this.$router.push(`/film/comingsoon`)
      },
      tocinema(){
          this.$router.push(`/cinema`)
      }
  },
  computed:{
      ...mapState("city",["cityId"])
  }
}
</script>

<style scoped lang="scss">
.space{
    height: 49px;
    background-color: #f4f4f4;
}
    div{
        box-sizing: border-box;
        touch-action: pan-y!important;
        .list{
            background-color: #fff;
            box-sizing: border-box;
            ul{
                list-style: none;
                padding: 0;
                margin-left: 15px;
                margin-bottom: 0;
                margin-top: 0;
                li{
                    padding: 15px 15px 15px 0;
                    height: 94px;
                    position: relative;
                    .a{
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        color: #333;
                        .img{
                            width: 66px;
                            height: 94px;
                            background: rgb(249, 249, 249);
                            float: left;
                            position: relative;
                            box-sizing: border-box;
                            img{
                                width: 64px;
                            }
                        }
                        .info{
                            float: left;
                            width: calc(100% - 116px);
                            padding: 0 10px;
                            box-sizing: border-box;
                            .name{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 100%;
                                .name1{
                                    font-size: 16px;
                                    height: 22px;
                                    line-height: 22px;
                                    margin-right: 5px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                                .item{
                                    font-size: 9px;
                                    color: rgb(0, 0, 0);
                                    background-color: #cecece;
                                    height: 14px;
                                    line-height: 14px;
                                    padding: 0 2px;
                                    border-radius: 2px;
                                }
                            }
                            .grade{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 100%;
                                visibility: visible;
                                .grade1{
                                    font-size: 13px;
                                    margin-top: 4px;
                                    color: #797d82;
                                }
                                .grade2{
                                    color: #ffb232;
                                    font-size: 14px;
                                }
                            }
                            .actors{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 100%;
                                span{
                                    font-size: 13px;
                                    margin-top: 4px;
                                    color: #797d82;
                                }
                            }
                            .area{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                width: 100%;
                                span{
                                    font-size: 13px;
                                    margin-top: 4px;
                                    color: #797d82;
                                }
                            }
                        }
                        .but{
                            float: right;
                            line-height: 25px;
                            height: 25px;
                            width: 50px;
                            color: #ff5f16;
                            font-size: 13px;
                            text-align: center;
                            border-radius: 2px;
                            position: relative;
                            border:1px solid #ff5f16;
                        }
                    }
                }
            }
            .nomore{
                height: 59px;
                background-color: #ededed;
                color: #bdc0c5;
                font-size: 13px;
                text-align: center;
                margin: auto;
                line-height: 59px;
            }
        }
    }
</style>