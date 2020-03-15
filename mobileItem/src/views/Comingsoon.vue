<template>
    <div>
        <v-touch  @swiperight="tonow" tag="div" class="list">
            <ul>
                <li v-for="a in list" :key="a.filmId" @click="changepage(a.filmId)">
                <div class="a">
                    <div class="img">
                        <img :src="a.poster" alt="">
                    </div>
                    <div class="info">
                        <div class="name">
                            <span class="name1">{{a.name}}</span>
                            <span class="item">{{a  | gradeFilter}}</span>
                        </div>
                        <div class="actors">
                            <span>主演：{{a.actors | actorFilter}}</span>
                        </div>
                        <div class="time">
                            <span>上映日期：{{a.premiereAt | time}}</span>
                        </div>
                    </div>
                </div>
                </li>
            </ul>
            <div class="nomore">- 无更多电影 -</div>
        </v-touch>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'YYYY年MM月DD日',
        LLL: 'YYYY年MM月DD日Ah点mm分',
        LLLL: 'YYYY年MM月DD日ddddAh点mm分',
        l: 'YYYY-M-D',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
            meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem: function (hour, minute, isLower) {
        const hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar: {
        sameDay: '[今天]LT',
        nextDay: '[明天]LT',
        nextWeek: '[下]ddddLT',
        lastDay: '[昨天]LT',
        lastWeek: '[上]ddddLT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
    week: {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
})
Vue.filter('actorFilter', function (data) {
  return data.map(item => item.name).join(' ')
})
Vue.filter('gradeFilter', function (a) {
  return a.filmType.name
})
Vue.filter('time', (value) => {
  return moment(value * 1000).format('周dd M月D日')
})
import {mapState} from 'vuex'
export default {
    data() {
        return {
            list:[]
        }
    },
    mounted () {
        axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=7907166`,
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
      changepage(id){
          this.$router.push(`/comingdetail/${id}`)
      },
      tonow(){
          this.$router.push(`/film/nowplaying`)        
      }
  },
  computed:{
      ...mapState("city",["cityId"])
  }
}
</script>

<style scoped lang="scss">
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
                            .time{
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
</style>