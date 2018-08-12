import React from 'react'
import { Card, Carousel } from 'antd'
import './index.less'

export default class Carousels extends React.Component{
  render(){
    return(
        <div>
          <Card title="文字轮播">
            <Carousel autoplay>
              <div><h3>nginx</h3></div>
              <div><h3>node</h3></div>
              <div><h3>react</h3></div>
              <div><h3>mysql</h3></div>
            </Carousel>
          </Card>
          <Card title="图片轮播" className="carousel-wrap">
            <Carousel autoplay>
              <div>
                <img src="/carousel-img/4.jpg" alt="" />
              </div>
              <div>
                <img src="/carousel-img/5.jpg" alt="" />
              </div>
              <div>
                <img src="/carousel-img/6.jpg" alt="" />
              </div>
            </Carousel>
          </Card>
        </div>
    )
  }
}