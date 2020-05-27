import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
// 导入组件
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFount from './pages/NotFount'


function App() {
  return (
    <div className="App">
      {/* 配置路由 */}
      <Router>
        <div className="nav">
          <Link to="/home">home</Link>
          <Link to="/cityList">cityList</Link>
          <Link to="/map">map</Link>
        </div>
        <Switch>
          <Redirect exact from="/" to="/home" />
          {/* 首页 */}
          <Route path="/home" component={Home} />
          {/* 城市找房 */}
          <Route path="/cityList" component={CityList} />
          {/* 地图找房 */}
          <Route path="/map" component={Map} />
          {/* 404 */}
          <Route component={NotFount} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
