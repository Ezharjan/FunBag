import React from 'react'
import { Card, Button, message } from 'antd'
import './ui.less'
export default class Messages extends React.Component {
    info = (type) => {
        message[type]('This is a normal message');
    }
    render() {
        return (
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={()=>this.info('success')}>
                        success
                    </Button>
                    <Button type="primary" onClick={()=>this.info('error')}>
                        error
                    </Button>
                    <Button type="primary" onClick={()=>this.info('info')}>
                        info
                    </Button>
                    <Button type="primary" onClick={()=>this.info('warning')}>
                        warning
                    </Button>
                    <Button type="primary" onClick={()=>this.info('warn')}>
                        warn
                    </Button>
                    <Button type="primary" onClick={()=>this.info('loading')}>
                        loading
                    </Button>
                </Card>
            </div>
        )
    }
}