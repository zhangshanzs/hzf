import http from '../axios'


/**
 * 获取首页轮播图
 */
export function getSwiper() {
  return http.get('/home/swiper')
}