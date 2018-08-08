import React from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import MenuConfig from './../../config/menuConfig'
import './index.less'
const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component{
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);

    this.setState({
      menuTreeNode
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
          <Menu theme="dark">
            {/*<SubMenu key="sub1" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>*/}
              {/*<Menu.Item key="1">Option 9</Menu.Item>*/}
              {/*<Menu.Item key="2">Option 10</Menu.Item>*/}
              {/*<Menu.Item key="3">Option 11</Menu.Item>*/}
              {/*<Menu.Item key="4">Option 12</Menu.Item>*/}
            {/*</SubMenu>*/}
            { this.state.menuTreeNode}
          </Menu>
        </div>
    )
  }
}