/**
 * 城市找房
 */
import React, { Component } from 'react';
// 导入封装后的axios
import { getCityList, getHotCity } from '../../utils/api/city'
// 获取当前城市
import { getCurrCity, setLocalData, CURR_CITY } from '../../utils/index'
// 导入列表组件
import { List, AutoSizer } from 'react-virtualized'
// 导入NavBar组件
import { NavBar, Icon, Toast } from 'antd-mobile';

import './index.scss'

// list组件所用假数据
// const list = Array.from(new Array(100)).map((item, index) => index)

class CityList extends Component {
  state = {
    // 城市列表分类
    cityIndex: [],
    // 处理后的城市列表数据
    cityList: {},
    // 当前右侧激活索引
    activeIndex: 0
  }

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


      // 响应式
      this.setState({
        cityIndex,
        cityList
      })
    }
  }

  // 获取行高
  getRowHeight = ({ index }) => {
    const { cityIndex, cityList } = this.state;
    const title = cityIndex[index];
    // title高度+城市高度*城市个数
    return 36 + 50 * cityList[title].length
  }

  // 选择城市
  changeCity = (item) => {
    const hasData = ['北京', '上海', '广州', '深圳'];
    if (hasData.includes(item.label)) {
      // 选择的是北上广深
      // 把当前城市存入本地
      setLocalData(CURR_CITY, JSON.stringify(item));
      // 跳转到首页
      this.props.history.push('/home')
    } else {
      // 不是北上广深就提示
      Toast.fail('当前城市没有房源 !!!', 1);
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

  // 格式化字母
  formatTitle(title, flag) {
    switch (title) {
      case 'hot':
        return flag ? '热' : '热门城市';
      case '#':
        return flag ? '当' : '当前城市';
      default:
        return title.toUpperCase();
    }
  }


  // 渲染列表项
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {

    const { cityIndex, cityList } = this.state;
    // 拿索引逐次取出title
    const title = cityIndex[index]
    // 对应title下的城市
    const titleCity = cityList[title]

    return (
      <div key={key} style={style} className="city-item">
        {/* 标题 */}
        <div className="title">{this.formatTitle(title)}</div>
        {/* 对应城市 */}
        {
          titleCity.map((item) => {
            // 事件传参需要函数套函数
            return <div onClick={() => this.changeCity(item)} key={item.value} className="name">{item.label}</div>
          })
        }
      </div>
    )
  }

  // 渲染右侧索引
  renderCityIndex = () => {
    const { cityIndex, activeIndex } = this.state;
    return cityIndex.map((item, index) => {
      return (
        <li
          key={item}
          className="city-index-item"
          onClick={() => {
            // 滚动回到index行
            this.listRef.scrollToRow(index)
          }}
        >
          <span className={activeIndex === index ? 'index-active' : ''}>
            {this.formatTitle(item, true)}
          </span>
        </li>
      )
    })
  }

  // 列表重新渲染时执行
  onRowsRendered = ({ startIndex }) => {
    // 只有两者不相等时做响应式
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  render() {
    return (
      <div className="cityListBox">
        {/* 顶部导航 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市列表
        </NavBar>
        {/* 城市列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              //获取组件实例 
              ref={(ele) => this.listRef = ele}
              // 控制滚动到行的对齐方式 默认auto, 使用“start”始终将行与列表顶部对齐
              scrollToAlignment="start"
              // 重新渲染时执行回调
              onRowsRendered={this.onRowsRendered}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    );
  }
}

export default CityList;