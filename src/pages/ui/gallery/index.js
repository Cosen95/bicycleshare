import React from 'react'
import { Card, Row, Col, Modal } from 'antd'

export default class Gallery extends React.Component{
  state = {
    visible: false
  }
  showGallery=(imgSrc)=>{
    this.setState({
      currentGallery: '/gallery/'+imgSrc,
      visible: true
    })
  }
  render(){
    const imgs = [
        ['1.png','2.png','3.png','4.png','5.png'],
        ['6.png','7.png','8.png','9.png','10.png'],
        ['11.png','12.png','13.png','14.png','15.png'],
        ['16.png','17.png','18.png','19.png','20.png'],
        ['21.png','22.png','23.png','24.png','25.png']
    ]
    const imgList = imgs.map((list) =>{
        return list.map((item) =>{
          return <Card
              cover={<img src={'/gallery/'+item} alt="" onClick={()=>this.showGallery(item)}/>}
          >
              <Card.Meta
                title="童年的时光啊"
                description="开向明天的火车"
              />
          </Card>
        })
        })
    return(
        <div>
          <Row gutter={10}>
            <Col md={5}>
              {imgList[0]}
            </Col>
            <Col md={5}>
              {imgList[1]}
            </Col>
            <Col md={5}>
              {imgList[2]}
            </Col>
            <Col md={5}>
              {imgList[3]}
            </Col>
            <Col md={4}>
              {imgList[4]}
            </Col>
          </Row>
          <Modal
            width={360}
            title="跟着流年去旅行"
            visible={this.state.visible}
            onCancel={()=>{
              this.setState({
                visible: false
              })
            }}
            footer={null}
          >
            <img src={this.state.currentGallery} alt="" style={{width:'100%'}} />
          </Modal>
        </div>
    )
  }
}