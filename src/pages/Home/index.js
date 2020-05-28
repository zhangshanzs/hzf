/**
 * 首页
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom'
// 导入标签栏
import { TabBar } from 'antd-mobile';
// 引入样式
import './index.css'

// 导入二级组件
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
// TabBar 数据
import tabItems from '../../utils/tabBarConfig';

class Home extends Component {
  state = {
    // 当前选中项 动态设置 
    selectedTab: this.props.location.pathname,
  };
  // 渲染tabBar的items
  renderTabBarItems = () => {
    return (
      <div className='tabBox'>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {
            tabItems.map((item, index) => {
              return (
                <TabBar.Item
                  title={item.title}
                  key={index}
                  icon={
                    <i className={`iconfont ${item.icon}`}></i>
                  }
                  selectedIcon={
                    <i className={`iconfont ${item.icon}`}></i>
                  }
                  // 是否选中
                  selected={this.state.selectedTab === item.path}
                  // bar点击触发
                  onPress={() => {
                    // 编程式导航
                    this.props.history.push(item.path)
                    this.setState({
                      selectedTab: item.path,
                    });
                  }}
                  data-seed="logId"
                ></TabBar.Item>
              )
            })
          }

        </TabBar>
      </div>
    )
  }
  render() {
    return (
      <div className="home">
        {/* 配置二级路由 */}
        {/* 默认首页 */}
        <Route exact path="/home" component={Index} />
        {/* 列表找房 */}
        <Route path="/home/house" component={House} />
        {/* 个人中心 */}
        <Route path="/home/profile" component={Profile} />

        {/* 标签栏组件 */}
        {
          // 渲染tabBar的items
          this.renderTabBarItems()
        }
      </div>
    );
  }
}

export default Home;