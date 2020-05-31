import http from '../axios'

/**
 * 获取当前定位城市信息
 */
export function getCityInfo(name) {
  return http.get('/area/info', {
    params: {
      name
    }
  })
}