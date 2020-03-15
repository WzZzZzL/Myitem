import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/Film'
import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Info from '@/views/Info'
import Search from '@/views/Search'
import City from '@/views/City'
import CinemaFilm from '@/views/CinemaFilm'
import Nowplaying from '@/views/Nowplaying'
import Comingsoon from '@/views/Comingsoon'
import Detail from '@/views/Detail'
import Photo from '@/views/Photo'
import ComingDetail from '@/views/ComingDetail'
import CenterLoginPage from '@/views/CenterLoginPage'
import Register from '@/views/Reg'
import Data from '@/views/UserData'
import Set from '@/views/Set'
import Card1 from '@/views/Card/Card1'
import Card2 from '@/views/Card/Card2'
import Card3 from '@/views/Card/Card3'
import Card4 from '@/views/Card/Card4'
import Card5 from '@/views/Card/Card5'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/film/nowplaying'
  },
  {
    path: '/film',
    redirect: '/film/nowplaying',
    component: Film,
    children: [
      {
        path: '/film/nowplaying',
        component: Nowplaying
      },
      {
        path: '/film/comingsoon',
        component: Comingsoon
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
    {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/cinema/:cinemaId',
    component: CinemaFilm
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/center',
    component: Center,
  },
  {
    path: '/info',
    component: Info
  },
  {
    path: '/detail/:wzlid',
    component: Detail
  },
  {
    path: '/photo',
    component: Photo
  },
  {
    path: '/comingdetail/:wzlid2',
    component: ComingDetail
  },
  {
    path: '/center/centerloginpage',
    component: CenterLoginPage
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/data',
    component: Data
  },
  {
    path: '/center/setting',
    component: Set
  },
  {
    path: '/center/card',
    component: Card1
  },
  {
    path: '/center/redPacket',
    component: Card2
  },
  {
    path: '/user/balance',
    component: Card3
  },
  {
    path: '/user/order',
    component: Card4
  },
  {
    path: '/user/ticket',
    component: Card5
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
