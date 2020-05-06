import React from 'react'
import { Card, Tabs, message,Icon } from 'antd'
import "./ui.less"
export default class Tabs extends React.Component {
   
    render(){
        
        return (
            <div>
                <Card title="提示框" className="card-wrap">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}