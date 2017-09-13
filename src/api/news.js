import jsonp from 'common/js/jsonp'

export function getNewsList(tag) {
  const url = 'https://m.toutiao.com/list/'
  const data = {
    tag: tag,
    ac: 'wap',
    count: 20,
    format: 'json_raw',
    as: 'A105395B01A0730',
    cp: '59B130E75360FE1',
    min_behot_time: 0
  }
  return jsonp(url, data, {params: 'jsonpCallback'})
}

export function getNewsDetail (id) {
  const url = `https://m.toutiao.com/i${id}/info/`
  const data = {}
  return jsonp(url, data, {params: 'jsonpCallback'})
}
