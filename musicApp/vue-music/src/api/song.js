// import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'

// export function getLyric(mid) {
//   const url = '/api/lyric'
//   const data = Object.assign({}, commonParams, {
//     callback: 'MusicJsonCallback_lrc',
//     pcachetime: +new Date(),
//     songmid: mid,
//     g_tk: 5381,
//     jsonpCallback: 'MusicJsonCallback_lrc',
//     loginUin: 0,
//     hostUin: 0,
//     format: 'jsonp',
//     inCharset: 'utf8',
//     outCharset: 'utf-8',
//     notice: 0,
//     platform: 'yqq',
//     needNewCode: 0
//     // songmid: mid,
//     // pcachetime: +new Date(),
//     // platform: 'yqq',
//     // hostUin: 0,
//     // needNewCode: 0,
//     // g_tk: 67232076,
//     // format: 'json'
//     // songmid: mid,
//     // platform: 'yqq',
//     // hostUin: 0,
//     // needNewCode: 0,
//     // categoryId: 10000000,
//     // pcachetime: +new Date(),
//     // format: 'json'
//   })
//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

export function getLyric(mid) {
  const url = '/static/lyric.json'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}