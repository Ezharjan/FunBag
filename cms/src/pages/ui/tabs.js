import React from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import "./ui.less"
const TabPane = Tabs.TabPane
export default class Tabss extends React.Component {

    componentWillMount() {
        this.newTabIndex = 0;
        const panes = [
            {
                title: 'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }
    onChange = (activeKey)=>{
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };

    callback = (key) => {
        message.info("Hi, good morning." + key)
    }
    render() {

        return (
            <div>
                <Card title="Tabs页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tabs带图标页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={
                            <span>
                                <Icon type="apple" />
                                Tab 1
                            </span>
                        } key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab={
                            <span>
                                <Icon type="android" />
                                Tab 2
                            </span>
                        } key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={
                            <span>
                                <Icon type="delete" />
                                Tab 2
                            </span>
                        } key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="可添加删除Tabs标页签" className="card-wrap">
                    <Tabs 
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onChange={this.onChange}
                    onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((pane)=>{
                                return <TabPane 
                                    tab={pane.title}
                                    key={pane.key}                                    
                                >
                                    {pane.content}
                                </TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}