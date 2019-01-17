# bicycle share

## react构建的共享单车后台管理

## 命令介绍
1.`yarn`
* 安装依赖
2.`yarn run start`
* 启动本地服务
3.`yarn run build`
* 项目打包

## 项目core(核心部分代码)
### axios请求封装
`src/axios/index.js`
```
import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../utils/index'

export default class Axios{
  static reqList(_this,url,params,isMock) {
    let data = {
      params:params,
      isMock
    }
    this.ajax({
      url,
      data
    }).then((data)=>{
      if(data && data.data){
        let list = data.data.item_list.map((item,index)=>{
          item.key = index;
          return item;
        })
        _this.setState({
          list: list,
          selectedRowKeys: [],
          selectedRows: null,
          pagination:Utils.pagination(data,(current)=>{
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }
  static jsonp(options) {
    return new Promise((resolve,reject) => {
      Jsonp(options.url,{  //eslint-disable-line
        params:'callback'
      },function(err,response) {
          if(response.status === 'success'){
            resolve(response);
          } else {
            reject(response.message);
          }
      })
    })
  }

  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    // let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    console.log('---------------',options);
    let baseUrl = 'https://www.easy-mock.com/mock/5b77a194f30ef76bb8687e11/manageMock';
    const { data:{isMock} } = options;
    // if(isMock){ //判断是mock环境还是真实数据环境
    //   baseUrl = 'https://www.easy-mock.com/mock/5b77a194f30ef76bb8687e11/manageMock'; //mock api
    // } else {
    //   // baseUrl = '真实线上环境api'
    // }
    return new Promise((resolve,reject) => {
      axios({
        url:options.url,
        method:'get',
        baseURL:baseUrl,
        timeout:5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status == '200') {
          let res = response.data;
          if(res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title:"提示",
              content: res.msg
            })
          }
        } else {
          reject(response.data);
        }
      })
    })
  }
}

```

### 请求中loading效果实现
`src/style/loading.less`
```
/** load **/
.ajax-loading{
    display: none;
    .loading{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding:0 40px;
      height: 80px;
      line-height: 80px;
      background: rgba(0, 0, 0, 0.75);
      border-radius: 6px;
      text-align: center;
      z-index: 9999;
      font-size:@fontD;
      color:#fff;
      img{
        width: 32px;
        vertical-align: middle;
      }
      span{
        margin-left:12px;
      }
    }
    .overlay{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 9998;
      background: rgb(255, 255, 255);
      opacity: 0.1;
    }
  }
  
  /****/

```

`public/index.html`
```
<div class="ajax-loading" id="ajaxLoading" style="display: none;">
    <div class="overlay"></div>
    <div class="loading">
    <img src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif" alt="">
    <span>加载中，请稍后...</span>
    </div>
</div>

```

### 递归遍历左侧菜单menu
`src/config/menuConfig.js`
```
const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: 'UI',
        key: '/ui',
        children: [
            {
                title: '按钮',
                key: '/ui/buttons',
            },
            {
                title: '弹框',
                key: '/ui/modals',
            },
            {
                title: 'Loading',
                key: '/ui/loading',
            },
            {
                title: '通知提醒',
                key: '/ui/notification',
            },
            {
                title: '全局Message',
                key: '/ui/messages',
            },
            {
                title: 'Tab页签',
                key: '/ui/tabs',
            },
            {
                title: '图片画廊',
                key: '/ui/gallery',
            },
            {
                title: '轮播图',
                key: '/ui/carousel',
            }
        ]
    },
    {
        title: '表单',
        key: '/form',
        children: [
            {
                title: '登录',
                key: '/form/login',
            },
            {
                title: '注册',
                key: '/form/reg',
            }
        ]
    },
    {
        title: '表格',
        key: '/table',
        children: [
            {
                title: '基础表格',
                key: '/table/basic',
            },
            {
                title: '高级表格',
                key: '/table/high',
            }
        ]
    },
    {
        title: '富文本',
        key: '/rich'
    },
    {
        title: '城市管理',
        key: '/city'
    },
    {
        title: '订单管理',
        key: '/order',
        btnList: [
            {
                title: '订单详情',
                key: 'detail'
            },
            {
                title: '结束订单',
                key: 'finish'
            }
        ]
    },
    {
        title: '员工管理',
        key: '/user'
    },
    {
        title: '车辆地图',
        key: '/bikeMap'
    },
    {
        title: '图标',
        key: '/charts',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
            {
                title: '饼图',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                key: '/charts/line'
            },
        ]
    },
    {
        title: '权限设置',
        key: '/permission'
    },
];
export default menuList;

```

`src/components/NavLeft/index.js`
```
import React from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
import MenuConfig from './../../config/menuConfig'
import './index.less'
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component{
  state = {
    currentKey: ''
  }
  handleClick = ({item,key})=> {
    console.log('点击菜单-------',item);
    const { props:{children:{props:{children:navTitle}}}} = item;
    this.props.dispatch(switchMenu(navTitle))
    this.setState({
      currentKey:key
    })
  }
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*/g,'');
    this.setState({
      menuTreeNode,
      currentKey
    })
  }

  //菜单渲染
  renderMenu = (data)=> {
      return data.map((item) => {
        if(item.children) {
          return(
              <SubMenu title={item.title} key={item.key}>
                { this.renderMenu(item.children)}
              </SubMenu>
          )
        }
        return <Menu.Item key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      })
  }
  render(){
    return(
        <div>
          <div className="logo">
            <img src="/assets/logo-ant.svg" alt=""/>
            <h1>小黄车后台</h1>
          </div>
          <Menu 
            onClick={this.handleClick}
            selectedKeys={this.state.currentKey}
            theme="dark">
            { this.state.menuTreeNode}
          </Menu>
        </div>
    )
  }
}

export default connect()(NavLeft)

```

### 图片画廊实现
`src/pages/ui/gallery/index.js`
```
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

```
### 富文本实现
`src/pages/rich/index.js`
```
import React from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class RichText extends React.Component{
    state = {
        editorState: '',
        isShowRich: false
    }
    onEditorStateChange = (editorState)=> {
        this.setState({
            editorState
        })
    }
    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        })
    }
    handleClear = ()=> {
        this.setState({
            editorState: ''
        })
    }
    handleGetRich = ()=> {
        this.setState({
            isShowRich: true
        })
    }
    render(){
        const { editorState } = this.state;
        return(<div>
            <Card>
                <Button type="primary" onClick={this.handleClear}>清空内容</Button> 
                <Button type="primary" onClick={this.handleGetRich}>获取富文本（Html）内容</Button>  
            </Card>
            <Card title="富文本编辑器">
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                />
            </Card>
            <Modal
                title="富文本"
                visible={this.state.isShowRich}
                onCancel={()=>{
                    this.setState({
                        isShowRich: false
                    })
                }}
                footer={null}
            >
                {draftToHtml(this.state.contentState)}
            </Modal>
            </div>)
    }
}

```

### 车辆地图实现
`src/pages/map/index.js`
```
import React from 'react'
import { Card, Table, Button, Form, Select, Modal, message, DatePicker } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/index'
import BaseForm from '../../components/BaseForm'
import moment from 'moment';

export default class BikeMap extends React.Component{
    state = {}
    formList = [
        {
            type: '城市',
            label: '城市',
            field: 'city',
            placeholder: '请输入城市',
            initialValue: '0',
            list: [{ id:'0',name:'全部'},{ id:'1',name:'北京'},{ id:'2',name:'大连'},{ id:'3',name:'深圳'}]
        },{
            type: '时间查询'
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            list: [{ id:'0',name:'全部'},{ id:'1',name:'进行中'},{ id:'2',name:'结束行程'}]

        }
    ]
    componentDidMount(){
        this.requestList();
    }
    requestList = ()=> {
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    total_count:res.data.total_count
                })
                this.renderMap(res);
            }
        })
    }
    //渲染地图数据
    renderMap = (res)=> {
        let list = res.data.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0],gps1[1]);
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);

        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint,{ icon:startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{ icon:endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        //绘制车辆行驶路线
        let routeList = [];
        list.forEach((item) => {
            let pos = item.split(',');
            routeList.push(new window.BMap.Point(pos[0],pos[1]));
        });
        let polyline = new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:2,
            strokeOpacity:1
        })
        this.map.addOverlay(polyline);

        //绘制服务区路线
        let serviceList = res.data.service_list;
        let serviceLineList = [];
        serviceList.forEach((item) => {
            serviceLineList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polyServiceLine = new window.BMap.Polygon(serviceLineList,{
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })
        this.map.addOverlay(polyServiceLine);

        //添加地图中的自行车图标
        let bikeList = res.data.bike_list;
        let bikePointIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        bikeList.forEach((item) => {
            let bikePos = item.split(',');
            let bikePoint = new window.BMap.Point(bikePos[0],bikePos[1]);
            let bikeMarker = new window.BMap.Marker(bikePoint,{ icon:bikePointIcon });
            this.map.addOverlay(bikeMarker);
        })
    }
    handleFilter = (params)=> {
        this.params = params;
        this.requestList;
    }
    render() {
        return(<div>
            <Card>
                <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
            </Card>
            <Card style={{marginTop:10}}>
                <div>共{this.state.total_count}辆车</div>
                <div id="container" style={{height:500}}></div>
            </Card>
        </div>)
    }
}

```
