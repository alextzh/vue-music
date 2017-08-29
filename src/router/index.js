import Vue from 'vue'
import Router from 'vue-router'
import VueRouterTitle from 'vue-router-title'

Vue.use(Router)

// 懒加载路由模块导入
const Recommend = () => import('components/recommend/recommend')
const Singer = () => import('components/singer/singer')
const Rank = () => import('components/rank/rank')
const Search = () => import('components/search/search')
const SingerDetail = () => import('components/singer-detail/singer-detail')
const Disc = () => import('components/disc/disc')
const TopList = () => import('components/top-list/top-list')
const UserCenter = () => import('components/user-center/user-center')
const List = () => import('components/list/list')

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      meta: {
        title: '首页'
      },
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      meta: {
        title: '歌手列表'
      },
      component: Singer,
      children: [
        {
          path: ':id',
          meta: {
            title: '歌手详情'
          },
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      meta: {
        title: '排行榜'
      },
      component: Rank,
      children: [
        {
          path: ':id',
          meta: {
            title: '榜单详情'
          },
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      meta: {
        title: '搜索'
      },
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      meta: {
        title: '个人中心'
      },
      component: UserCenter
    },
    {
      path: '/list',
      meta: {
        title: '列表页面'
      },
      component: List
    }
  ]
})
Vue.use(VueRouterTitle, {router})
export default router
