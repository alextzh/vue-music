/**
 * Created by tianzhihong on 2017/7/3.
 */
import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite(),
  navList: [
    {
      name: '推荐',
      tag: '__all__',
      to: 'all'
    },
    {
      name: '视频',
      tag: 'video',
      to: 'video'
    },
    {
      name: '热点',
      tag: 'news_hot',
      to: 'hot'
    },
    {
      name: '社会',
      tag: 'news_society',
      to: 'society'
    },
    {
      name: '娱乐',
      tag: 'news_entertainment',
      to: 'entertainment'
    },
    {
      name: '军事',
      tag: 'news_military',
      to: 'military'
    },
    {
      name: '科技',
      tag: 'news_tech',
      to: 'tech'
    },
    {
      name: '汽车',
      tag: 'news_car',
      to: 'car'
    },
    {
      name: '体育',
      tag: 'news_sports',
      to: 'sports'
    },
    {
      name: '财经',
      tag: 'news_finance',
      to: 'finance'
    },
    {
      name: '国际',
      tag: 'news_world',
      to: 'world'
    },
    {
      name: '时尚',
      tag: 'news_fashion',
      to: 'fashion'
    }
  ],
  newsList: [],
  activeIndex: 0,
  tag: '__all__'
}

export default state
