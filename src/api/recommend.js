/**
 * Created by tianzhihong on 2017/6/28.
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export function getDiscList() {
  // 线上环境地址，同学们根据自己的需要配置修改
  const url = debug ? '/api/getDiscList' : 'http://ustbhuangyi.com/music/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
export function getGameItems() {
  const url = '/api/getGameItems'
  const data = {
    app_signature: '8f6a604c5c7f0784eaa40cdeb6fec603',
    appid: '45f8f98fedc702b3d2334424ebc8e2d9',
    app_ts: 1506412742,
    module: 'guess',
    action: 'get_game'
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getGameBanner() {
  const url = '/api/getGameBanner'
  const data = {
    app_signature: '511060d2b525661237198c35aff245e4',
    appid: '45f8f98fedc702b3d2334424ebc8e2d9',
    app_ts: 1506413717,
    module: 'guess',
    action: 'get_banner',
    channel: 2
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getGameList() {
  const url = '/api/getGameList'
  const data = {
    app_signature: '511060d2b525661237198c35aff245e4',
    appid: '45f8f98fedc702b3d2334424ebc8e2d9',
    app_ts: 1506413717,
    module: 'guess',
    action: 'get_guess',
    page: 1,
    page_num: 30,
    act: '',
    uid: null
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
