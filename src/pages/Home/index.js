/**
 * 首页
 */
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'

// 导入二级组件
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'

class Home extends Component {
  render() {
    return (
      <div className="home">
        {/* 配置二级路由 */}
        <Link to="/home/index">Index</Link>
        <Link to="/home/house">house</Link>
        <Link to="/home/profile">profile</Link>
        {/* 默认首页 */}
        <Route path="/home/index" component={Index} />
        {/* 列表找房 */}
        <Route path="/home/house" component={House} />
        {/* 个人中心 */}
        <Route path="/home/profile" component={Profile} />
      </div>
    );
  }
}

export default Home;