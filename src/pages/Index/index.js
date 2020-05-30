/**
 * 首页
 */
import React, { Component } from 'react';
// 导入走马灯组件
import { SearchBar, Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
// 导入封装后的axios
import { BASE_URL } from '../../utils/axios'
import { getSwiper, getGroup, getNews } from '../../utils/api/home'
// 导入样式
import './index.scss'

// 导入栏目导航数据
import Navs from '../../utils/navConfig'

class Index extends Component {
  state = {
    // 搜索关键词
    keyword: '',
    // 轮播图图片
    swiper: [],
    // 租房小组
    groups: [],
    // 最新资讯
    news: [],
    // 默认高度
    imgHeight: 212,
    // 是否自动播放
    isPlay: false
  }

  // 调接口
  componentDidMount() {
    // this.getSwiper()
    // this.getGroup()
    // this.getNews()
    this.loadAll()
  }


  // 获取首页所有接口数据
  loadAll = async () => {
    const [swiper, group, news] = await Promise.all([getSwiper(), getGroup(), getNews()]);
    // 2. 批量修改数据
    if (swiper.status === 200) {
      this.setState({
        swiper: swiper.body,
        groups: group.body,
        news: news.body
      }, () => {
        // swiper有数据后改变isPlay的状态
        this.setState({
          isPlay: true
        })
      })
    }

  }
  /*  // 发请求获取轮播图图片
   getSwiper = async () => {
     const { status, body } = await getSwiper()
     // 请求成功后修改swiper的数据
     if (status === 200) {
       this.setState({
         swiper: body
       }, () => {
         // swiper有数据后改变isPlay的状态
         this.setState({
           isPlay: true
         })
       })
     }
   }
 
   // 发请求获取租房小组数据
   getGroup = async () => {
     const { status, body } = await getGroup()
     if (status === 200) {
       this.setState({
         groups: body
       })
     }
   }
 
   // 发请求获取最新资讯数据
   getNews = async () => {
     const { status, body } = await getNews()
     if (status === 200) {
       this.setState({
         news: body
       })
     }
   } */

  // 渲染顶部搜索导航
  renderTopNav = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={
            () => this.props.history.push('/cityList')
          }>
            北京<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={
          () => this.props.history.push('/map')
        }>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }

  // 渲染轮播图组件
  renderCarousel = () => {
    return (
      <Carousel
        // 自动播放--响应式数据，swiper里面有数据之后改为true
        autoplay={this.state.isPlay}
        // 无限循环
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {/* 遍历轮播图图片 */}
        {
          this.state.swiper.map(item => {
            return (
              <a
                key={item.id}
                href={BASE_URL}
                style={{ display: 'inline-block', width: '100%', background: 'gray', height: this.state.imgHeight }}
              >
                <img
                  src={BASE_URL + item.imgSrc}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    // 自适应高度
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            )
          })
        }
      </Carousel>
    )
  }

  // 渲染栏目导航组件
  renderNavs = () => {
    return (
      <Flex className="nav">
        {
          Navs.map((item) => {
            return (
              <Flex.Item
                // 栏目导航
                onClick={() => this.props.history.push(item.path)}
                key={item.id}>
                <img src={item.img} alt={''} />
                <p>{item.title}</p>
              </Flex.Item>
            )
          })
        }
      </Flex>
    )
  }

  // 渲染租房小组
  renderGroup = () => {
    return (
      <div className="group">
        {/* 标题 */}
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
        {/* 内容 */}
        <Grid data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={item => (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </div>
    )
  }

  // 渲染最新资讯
  renderNews = () => {
    return (
      <div className="news">
        <h3 className="group-title">最新资讯</h3>
        <WingBlank size="md">
          {
            this.state.news.map((item) => {
              return (
                <div className="news-item" key={item.id}>
                  <div className="imgwrap">
                    <img
                      className="img"
                      src={`${BASE_URL}${item.imgSrc}`}
                      alt=""
                    />
                  </div>
                  <Flex className="content" direction="column" justify="between">
                    <h3 className="title">{item.title}</h3>
                    <Flex className="info" justify="between">
                      <span>{item.from}</span>
                      <span>{item.date}</span>
                    </Flex>
                  </Flex>
                </div>
              )
            })
          }
        </WingBlank>
      </div>
    )
  }


  render() {
    return (
      <div className="indexBox">
        {/* 顶部搜索导航*/}
        {
          this.renderTopNav()
        }
        {/* 轮播图 */}
        {
          this.renderCarousel()
        }
        {/* 栏目导航 */}
        {
          this.renderNavs()
        }
        {/* 租房小组 */}
        {
          this.renderGroup()
        }
        {/* 最新资讯 */}
        {
          this.renderNews()
        }
      </div>
    );
  }
}

export default Index;