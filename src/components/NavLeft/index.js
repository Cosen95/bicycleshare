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