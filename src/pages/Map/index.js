/**
 * 地图找房
 */
import React, { Component } from 'react';
import './index.scss'

class Map extends Component {
  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  initMap = () => {
    const { BMap } = window
    // 1.创建地图实例
    var map = new BMap.Map("container");
    // 2.设置中心点坐标
    var point = new BMap.Point(116.404, 39.915);
    // 3.地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15);
  }
  render() {
    return (
      <div className="mapBox">
        {/* 地图 */}
        <div id="container"></div>
      </div>
    );
  }
}

export default Map;