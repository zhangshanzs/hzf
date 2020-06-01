/**
 * 多个模块用到定位当前城市，所以要进行封装
 */

// 1. 如果没有本地数据->利用百度地图API获取当前城市->发送请求获取城市详细信息->并保存本地数据->Promise返回城市数据
// 2. 如果有本地数据->直接Promise.resolve(数据)返回

import { getCityInfo } from './api/city'

const CURR_CITY = 'CURR_CITY';
export function getCurrCity() {
  // 从本地获取定位信息
  const currCity = JSON.parse(localStorage.getItem(CURR_CITY))
  if (!currCity) {
    // 没有本地数据
    return new Promise((reslove, reject) => {
      const { BMap } = window;
      // 使用百度地图LocalCity类获取当前城市名字
      const myCity = new BMap.LocalCity();
      myCity.get(async (result) => {
        // 根据百度地图获取到城市名字
        const cityName = result.name;
        // console.log(cityName);

        // 调用后台接口获取当前城市的详细数据
        let { status, body } = await getCityInfo(cityName);
        // console.log(status, body);
        if (status === 200) {
          // 存储到本地
          localStorage.setItem(CURR_CITY, JSON.stringify(body))
          reslove(body)
        } else {
          reject('error')
        }
      });
    })
  } else {
    // 本地存储了CURR_CITY
    return Promise.resolve(currCity)
  }
}

