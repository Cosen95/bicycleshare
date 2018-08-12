import React from 'react'
import { Tabs, Card, message, Icon } from 'antd'
const TabPane = Tabs.TabPane;
export default class Tab extends  React.Component{
  newTabIndex = 0;
  componentWillMount(){
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
    ];
    this.setState({
      panes,
      activeKey: panes[0].key
    })
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  callback = (key)=> {
    message.info(`你选中的是第${key}个标签页`);
  }
  render(){
    return(
        <div>
          <Card title="Tabs 标签页">
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
              <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
          </Card>
          <Card title="Tabs 带图标的标签页">
            <Tabs defaultActiveKey="2">
              <TabPane tab={<span><Icon type="edit" />Tab 1</span>} key="1">
                Tab 1
              </TabPane>
              <TabPane tab={<span><Icon type="search" />Tab 2</span>} key="2">
                Tab 2
              </TabPane>
            </Tabs>
          </Card>
          <Card title="新增和关闭页签">
            <Tabs
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
          </Card>
        </div>
    )
  }
}