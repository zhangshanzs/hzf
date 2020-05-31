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


/**
 * 获取城市列表信息
 */
export function getCityList(level = 1) {
  return http.get('/area/city', {
    params: {
      level
    }
  })
}