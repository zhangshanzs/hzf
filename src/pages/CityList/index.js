/**
 * 城市找房
 */
import React, { Component } from 'react';
// 导入封装后的axios
import { getCityList, getHotCity } from '../../utils/api/city'

import { getCurrCity } from '../../utils/index'

class CityList extends Component {

  componentDidMount() {
    this.getCityList()
  }

  // 获取城市列表数据
  getCityList = async () => {
    const { status, body } = await getCityList()
    if (status === 200) {
      // 成功获取城市列表后处理数据
      const { cityList,
        cityIndex } = this.formatCities(body);

      // 获取热门城市
      // 起别名，避免引起混淆
      const { status: sta, body: bd } = await getHotCity()
      if (sta === 200) {
        // {'hot':[{},{},..]}
        cityList['hot'] = bd
        // ['a','b','c',...,'hot']
        cityIndex.unshift('hot')
      }

      // 获取当前定位城市
      let currCity = await getCurrCity();
      cityList['#'] = [currCity];
      cityIndex.unshift('#');
      console.log('处理完的数据：', cityList, cityIndex)
    }
  }
  // 按拼音首字母处理城市列表
  formatCities = (body) => {
    // 城市列表信息 {首字母:[{···}，{···},..]}
    let cityList = {}
    // 所有城市的拼音首字母
    let cityIndex = [];
    body.forEach((item) => {
      // 获取当前遍历城市的拼音首字母
      let firstLetter = item.short.slice(0, 1);
      // 判断遍历城市的首字母是否已经是cityList的键
      if (!cityList[firstLetter]) {
        // 不是键，就把所遍历的城市信息放在[]
        cityList[firstLetter] = [item]
      } else {
        // 已经是键，向数组里push遍历城市信息
        cityList[firstLetter].push(item)
      }
    })
    // Object.keys()返回一个由一个给定对象的自身可枚举属性组成的数组
    // sort()排序
    // 所有城市的首字母
    cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex
    }
  }

  render() {
    return (
      <div>
        CityList
      </div>
    );
  }
}

export default CityList;