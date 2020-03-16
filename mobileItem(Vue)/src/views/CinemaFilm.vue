<template>
    <div>
        <div class="title">
            <div class="left" @click="back"><i class="iconfont icon-arrow-lift"></i></div>
        </div>
        <div class="cinemaName">
            {{cinemaData.name}}
        </div>
        <div class="content">
            <div class="tags">
                <div class="tag" v-for="(data,index) in cinemaData.services" :key="index">
                    {{data.name}}
                </div>
                <div><i class="iconfont icon-more"></i></div>
            </div>
            <div class="address">
                <div class="left"><i class="iconfont icon-map"></i></div>
                <div class="center">{{cinemaData.address}}</div>
                <div class="right"><i class="iconfont icon-phone1"></i></div>
            </div>
            <div class="Films">
                <div class="Film" v-for="(data,index) in filmData" :key="index">
                    <div class="bg">
                        <img :src="data.poster" class="bottom">
                        <img :src="data.poster" class="outer">
                        <img class="sj" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUAgMAAACCKJcoAAAACVBMVEVHcEz////////mcEUwAAAAAnRSTlMAgJsrThgAAABLSURBVAgdBcEBDQAACAMg/GYDAxnB/mkEUAuBPgjMQOAagtpaBM0hGAbB0Qi11BIajjAwhIMmaqFWNHBigBEHtNQCtWmAywBMDqAfx4oGipkmrUEAAAAASUVORK5CYII=">
                    </div>
                    <div class="filminfo">
                        <div class="head" @click=Tofilm(data)>
                            <span class="ic">{{data.name}}</span><i class="ac">{{data.grade}}分</i>
                        </div>
                        <div class="desc" @click=Tofilm(data)>
                            <div>
                                <span>{{data.category}}| {{data.runtime}}分钟 | {{data.director}} | {{data.actors|mainActors}}</span>
                            </div>                           
                            <img data-v-0134b84b="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAMAAAD57OxYAAAAZlBMVEVHcEwZGhseHh4aGh8zMzMZGhsZGhwZGhsfHx8ZGhsbGxsZGhsZGxsZGxsZGxsZGxsbGxsaGhsaGh0aGh0ZGhwbGxsZGhweHh4ZGhsaGh0ZGxsZGxsZGxsZGhsZGxsZGxsaGhwZGhtuA7MxAAAAIXRSTlMA6iE5Bda99xD+OOWenXh6VddWV9BxviLpe7x5jeSBgI/e7hU0AAAAeUlEQVQY023PyRqCMAyFUSilA2VGnBX/939JN01QP7O6Z5ObFGt6FjoPuCjuEBeBvYKvRKGG8iQyZ5iCqPFwtKIxQqsre2BQdV8F7rfgoJh2WAe+yWghjjkPQJ/zHKHLufLg8jmmhDp8vGD+LH1BnKU6wU3vXdOm+Q34ngmHHMc+eAAAAABJRU5ErkJggg==" width="4px" height="8px" alt="" class="more">
                        </div>
                        <div class="datebar">
                            <div class="date"><span>{{data.showDate|filmDate}}</span></div>
                        </div>
                        <div class="nofilm">
                            <img data-v-0134b84b="" width="100%" height="100%" src="data:image/png;base64,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">
                            <span>暂无场次</span>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
import http from '@/util/http'
export default {
    data(){
        return{
            cinemaData:[],
            filmData:[]
        }
    },
    mounted(){
        //影院详细信息
        http.request({
            url:`/gateway?cinemaId=${this.$route.params.cinemaId}&k=9785175`,
            headers:{
            'X-Host': 'mall.film-ticket.cinema.info'
            }
        }).then(res=>{
            // console.log(res)
            this.cinemaData = res.data.data.cinema
        }),
        //电影详细信息
        http.request({
            url:`/gateway?cinemaId=${this.$route.params.cinemaId}&k=3362653`,
            headers:{
            'X-Host': 'mall.film-ticket.film.cinema-show-film'
            }
        }).then(res=>{
            this.filmData = res.data.data.films
            // console.log(this.filmData)
        })
    },
    methods:{
        back(){
           this.$router.back()
        },
        Tofilm(data){
            // console.log(data.filmId)
            this.$router.push(`/detail/${data.filmId}`)
        }
    },
    filters:{
        mainActors:function(data){
            data = data.map(function (data) {
                return data.name
            })
            let arr = data.toString()
            return arr
        },
        filmDate:function(data){
            Date.prototype.Format = function (fmt) {
                var o = {
                        "M+": this.getMonth() + 1, // 月份
                        "d+": this.getDate(), // 日
                        "h+": this.getHours(), // 小时
                        "m+": this.getMinutes(), // 分
                        "s+": this.getSeconds(), // 秒
                        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
                        "S": this.getMilliseconds() // 毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            let time = new Date(data*1000).Format('M月dd日')
            return time
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
    width:100%;
    height:44px;
    position: fixed;
    left: 0;
    top: 0;
    z-index:10;
    background-color: white;
    .left{
        width:10%;
        height:44px;
        float: left;
        line-height: 44px;
        padding-left: 15px;
        .iconfont{
            font-size: 20px;
        }
    }
}
.cinemaName{
    width: 100%;
    height:44px;
    position: relative;
    top: 44px;
    text-align: center;
    font-size: 17px;
    line-height: 44px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.content{
    display: block;
    position: relative;
    top: 44px;
    box-sizing: border-box;
    .tags{
        width: 100%;
        height: 38px;
        display: flex;
        font-size: 15px;
        color: #ffb232;
        overflow: hidden;
        padding: 5px 0 15px;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        .tag{
            padding: 0 3px;
            margin: 0 2.5px;
            font-size: 10px;
            border: 1px solid #ffb232;
            border-radius: 2px;
            height: 19px;
            box-sizing: border-box;
        }
    }
    .address{
        height: 50px;
        width: 100%;
        .left{
            width: 10%;
            height: 50px;
            padding-left: 15px;
            box-sizing: border-box;
            float: left;
            .iconfont{
                font-size: 16px; 
                line-height: 50px;
            }
        }
        .center{
            width: 70%;
            height: 50px;
            float: left;
            font-size: 14px;
            line-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-left: 2px;
            box-sizing: border-box;
        }
        .right{
            width: 20%;
            height: 50px;
            float: left;
            box-sizing: border-box;
            padding-left: 25px;
            .iconfont{
                font-size: 16px; 
                line-height: 50px;
            }
        }
    }
    .Films{
        width:100%;
        .Film{
            width: 100%;
            .bg{
                width:100%;
                height: 160px;
                align-items: center;
                display: flex;
                justify-content: center;
                overflow: hidden;
                .bottom{
                    width:100%;
                    height:160px;
                    filter: blur(20px);
                }
                .outer{
                    width:90px;
                    height: 120px;
                    position: absolute;
                }
                .sj{
                    position: absolute;
                    top: 238px;
                    width:20px;
                    height:10px;
                }
            }
        }
        .filminfo{
            width:100%;
            padding: 15px 0;
            .head{
                width:100%;
                height:20px;
                text-align: center;
                margin-bottom: 10px;
                .ic{
                    font-size: 15px;
                    color: #191a1b;
                    padding-right: 5px;
                }
                .ac{
                    font-size: 16px;
                    color: #ffb232;
                }
            }
            .desc{
                width:100%;
                text-align: center;
                height: 18px;
                color: #797d82;
                font-size: 13px;
                width: 100%;
                position: relative;
                div{
                    padding:0 25px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    box-sizing: border-box;
                }
                img{
                    position: absolute;
                    top: 0;
                    right: 15px;
                }
            }
            .datebar{
                width:100%;
                height:49px;
                padding-left: 15px;
                box-sizing: border-box;
                margin-top: 10px;
                .date{
                    height: 49px;
                    width: 100%;
                    span{
                        width: 80px;
                        height: 49px;
                        display: block;
                        color: #ff5f16;
                        line-height: 65px;
                        font-size: 14px;
                        border-bottom: 2px solid #ff5f16;
                        text-align: center;
                    }
                }
            }
            .nofilm{
                width: 100%;
                height: 180px;
                padding: 40px 0 44px;
                text-align: center;
                img{
                    width:70px;
                    height: 70px;
                }
                span{
                    color: #bdc0c5;
                    font-size: 14px;
                    display: block;
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>
