import http from '../axios'


/**
 * 获取首页轮播图
 */
export function getSwiper() {
  return http.get('/home/swiper')
}

/**
 * 获取租房小组
 */
export function getGroup(area = 'AREA%7C88cff55c-aaa4-e2e0') {
  return http.get('/home/groups', {
    params: {
      area
    }
  })
}