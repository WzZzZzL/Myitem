<template>
  <v-touch @swiperight="back" tag="div" v-if="filminfo" class="v-touch main">
    <div class="head">
      <div class="back">
        <span @click="back" class="a iconfont icon-leftarrow"></span>
      </div>
      <transition name="fade">
        <div v-title="40" class="title">{{filminfo.name}}</div>
      </transition>
    </div>
    <div class="banner">
      <div class="img">
        <img :src="filminfo.poster" alt />
      </div>
    </div>
    <div class="detail">
      <div class="col">
        <div class="name">
          <span class="name1">{{filminfo.name}}</span>
          <span class="name2">{{filminfo.filmType.name}}</span>
        </div>
        <div class="grade">
          <span class="grade1">{{filminfo.grade}}</span>
          <span class="grade2">分</span>
        </div>
      </div>
      <div class="leixin">{{filminfo.category}}</div>
      <div class="time">{{filminfo.premiereAt | time}} 上映</div>
      <div class="runtime">{{filminfo.nation}} | {{filminfo.runtime}}分钟</div>

      <div :class="[isShow ? '':'x','info']">{{filminfo.synopsis}}</div>
      
      <div @click="isShow = !isShow" class="switch">
        <span :class="['switch2','iconfont',isShow ? 'icon-arrow-up' : 'icon-arrow-down']"></span>
      </div>
    </div>
    <div class="actors">
      <div class="title">
        <span>演职人员</span>
      </div>
      <div class="list">
        <ul>
          <li v-for="(data,index) in filminfo.actors" :key="index">
            <div>
              <div class="img">
                <img :src="data.avatarAddress" alt />
              </div>
              <span class="name">{{data.name}}</span>
              <span class="role">{{data.role}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="photo">
      <div class="title">
        <span class="photos">剧照</span>
        <span @click="Photoshow" class="all">全部({{filminfo.photos.length}})></span>
      </div>
      <div class="list">
        <ul>
          <li v-for="(list,index) in filminfo.photos" :key="index">
            <div>
              <img @click="photolook(index)" :src="list" alt />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <photo
      v-show="isphotoshow"
      @isphotoshow="wzl()"
      :photonum="filminfo.photos.length"
      :photos="filminfo.photos"
    ></photo>

    <router-link to="/cinema" tag="a">
      <div>选座购票</div>
    </router-link>
  </v-touch>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";
import { ImagePreview } from "vant";
import axios from "axios";
import moment from "moment";
import photo from "./Photo";
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})


moment.locale("zh-cn", {
  months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
    "_"
  ),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
  weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
  weekdaysMin: "日_一_二_三_四_五_六".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY-MM-DD",
    LL: "YYYY年MM月DD日",
    LLL: "YYYY年MM月DD日Ah点mm分",
    LLLL: "YYYY年MM月DD日ddddAh点mm分",
    l: "YYYY-M-D",
    ll: "YYYY年M月D日",
    lll: "YYYY年M月D日 HH:mm",
    llll: "YYYY年M月D日dddd HH:mm"
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === "凌晨" || meridiem === "早上" || meridiem === "上午") {
      return hour;
    } else if (meridiem === "下午" || meridiem === "晚上") {
      return hour + 12;
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem: function(hour, minute, isLower) {
    const hm = hour * 100 + minute;
    if (hm < 600) {
      return "凌晨";
    } else if (hm < 900) {
      return "早上";
    } else if (hm < 1130) {
      return "上午";
    } else if (hm < 1230) {
      return "中午";
    } else if (hm < 1800) {
      return "下午";
    } else {
      return "晚上";
    }
  },
  calendar: {
    sameDay: "[今天]LT",
    nextDay: "[明天]LT",
    nextWeek: "[下]ddddLT",
    lastDay: "[昨天]LT",
    lastWeek: "[上]ddddLT",
    sameElse: "L"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function(number, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return number + "日";
      case "M":
        return number + "月";
      case "w":
      case "W":
        return number + "周";
      default:
        return number;
    }
  },
  relativeTime: {
    future: "%s内",
    past: "%s前",
    s: "几秒",
    ss: "%d秒",
    m: "1分钟",
    mm: "%d分钟",
    h: "1小时",
    hh: "%d小时",
    d: "1天",
    dd: "%d天",
    M: "1个月",
    MM: "%d个月",
    y: "1年",
    yy: "%d年"
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
});
Vue.use(ImagePreview);

Vue.filter("time", value => {
  return moment(value * 1000).format("YYYY-MM-D");
});

export default {
  data() {
    return {
      isShow: false,
      filminfo: null,
      isphotoshow: false
    };
  },
  methods: {
    ...mapMutations("tabbar",["show","hide"]),
    photolook(index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: "top-left"
      });
    },
    back() {
      this.$router.back();
    },
    Photoshow() {
      this.isphotoshow = true;
    },
    wzl() {
      this.isphotoshow = false;
    }
  },
  components: {
    photo
  },
  mounted() {
    this.hide(),
      axios({
        url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.wzlid}&k=4867813`,
        method: "get",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1582277687167503725352","bc":"310100"}',
          "X-Host": "mall.film-ticket.film.info"
        }
      }).then(res => {
        this.filminfo = res.data.data.film;
      });
  },
  destroyed() {
    this.show();
  }
};
</script>

<style lang="scss" scoped>
.x {
  height: 35px !important;
  transition: height 1s linear;
}
.main {
  height: 100%;
  background-color: #f4f4f4;
  touch-action: pan-y!important;
  .head {
    position: fixed;

    color: transparent;
    transition: all 0.3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
    box-sizing: border-box;
    .back {
      height: 30px;
      position: absolute;
      top: 5px;
      left: 5px;
      .a {
        width: 30px;
        color: #000;
        font-size: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
      }
    }
    .title {
      font-size: 17px;
      line-height: 44px;
      width: 100vw;
      text-align: center;
      color: #000;
      background-color: #fff;
    }
  }
  .banner {
    width: 100%;
    background: rgb(249, 249, 249);
    .img {
      width: 100%;
      background: rgb(249, 249, 249);
      opacity: 1;
      display: block;
      img {
        width: 100%;
      }
    }
  }
  .detail {
    padding-top: 12px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    background-color: #fff;
    box-sizing: border-box;
    .col {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      .name {
        width: 256px;
        .name1 {
          color: #191a1b;
          font-size: 18px;
          height: 24px;
          line-height: 24px;
          margin-right: 7px;
        }
        .name2 {
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .grade {
        width: calc(100% - 250px);
        text-align: right;
        color: #ffb232;
        .grade1 {
          font-size: 18px;
          font-style: italic;
        }
        .grade2 {
          font-size: 10px;
        }
      }
    }
    .leixin {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    .time {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    .runtime {
      font-size: 13px;
      color: #797d82;
      margin-top: 4px;
    }
    .info {
      margin-top: 12px;
      font-size: 13px;
      color: #797d82;
      background: #fff;
      overflow: hidden;
    }
    .switch {
      text-align: center;
      display: block;
      height: auto;
      .switch2 {
        font-size: 23px;
        width: 8px;
        margin: auto;
        line-height: 23px;
        margin-top: 0px;
      }
    }
  }
  .actors {
    margin-top: 10px;
    background-color: #fff;
    box-sizing: border-box;
    .title {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      span {
        font-size: 16px;
        text-align: left;
        color: #191a1b;
        display: inline-block;
        height: 22.5px;
        line-height: 22px;
      }
    }
    .list {
      height: 140px;
      background: rgb(255, 255, 255);
      overflow-x: auto;
      overflow-y: hidden;
      ul {
        display: flex;
        justify-content: flex-start;
        box-align: center;
        align-items: center;
        position: relative;
        width: 100%;
        margin: 0;
        padding-left: 15px;
        list-style: none;
        box-sizing: border-box;
        li {
          width: 85px;
          min-width: 85px;
          position: relative;
          margin-right: 10px;
          cursor: pointer;
          display: block;
          float: left;
          div {
            text-align: center;
            box-sizing: border-box;
            .img {
              width: 85px;
              height: 85px;
              background: rgb(249, 249, 249);
              img {
                height: 100%;
                text-align: center;
              }
            }
            .name {
              display: block;
              text-align: center;
              padding-top: 10px;
              font-size: 12px;
              color: #191a1b;
              width: 85px;
              height: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .role {
              font-size: 10px;
              color: #797d82;
            }
          }
        }
      }
    }
  }
  .photo {
    margin-top: 10px;
    margin-bottom: 60px;
    background-color: #fff;
    box-sizing: border-box;
    .title {
      height: 62px;
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      .photos {
        font-size: 16px;
        text-align: left;
        color: #191a1b;
        display: inline-block;
        height: 22.5px;
        line-height: 22px;
      }
      .all {
        font-size: 13px;
        color: #797d82;
        float: right;
        height: 22.5px;
        line-height: 22px;
      }
    }
    .list {
      height: 115px;
      background: rgb(255, 255, 255);
      overflow-x: auto;
      overflow-y: hidden;
      ul {
        display: flex;
        box-pack: start;
        justify-content: flex-start;
        box-align: center;
        align-items: center;
        width: 100%;
        padding-left: 15px;
        list-style: none;
        box-sizing: border-box;
        li {
          min-width: 150px;
          position: relative;
          margin-right: 10px;
          width: auto !important;
          cursor: pointer;
          display: block;
          float: left;
          div {
            box-sizing: border-box;
            width: 150px;
            height: 100px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
  a {
    height: 49px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    outline: none;
    color: #333;
    text-decoration: none;
    div {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 49px;
      width: 100%;
      text-align: center;
      background-color: #ff5f16;
      color: #fff;
      font-size: 16px;
      line-height: 49px;
      box-sizing: border-box;
    }
  }
}
</style>