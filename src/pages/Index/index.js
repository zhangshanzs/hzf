/**
 * 首页
 */
import React, { Component } from 'react';
// 导入走马灯组件
import { Carousel } from 'antd-mobile';
// 导入封装后的axios
import { BASE_URL } from '../../utils/axios'
import { getSwiper } from '../../utils/api/home'


class Index extends Component {
  state = {
    // 轮播图图片
    swiper: [],
    // 默认高度
    imgHeight: 212,
    // 是否自动播放
    isPlay: false
  }

  // 调接口
  componentDidMount() {
    this.getSwiper()
  }

  // 发请求获取轮播图图片
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
  render() {
    return (
      <div>
        {/* 轮播图 */}
        {
          this.renderCarousel()
        }

      </div>
    );
  }
}

export default Index;