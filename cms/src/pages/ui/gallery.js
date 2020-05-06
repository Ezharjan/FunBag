import React from 'react'
import { Row, Col, Modal } from 'antd'
import { Card, Form, Input, Button, Radio, Select, DatePicker, TimePicker, Icon, Checkbox, Upload, InputNumber, Switch } from "antd";
import './ui.less'
import moment from "moment";

const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
export default class Gallery extends React.Component{
    state = {
     visible:false
    }


    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    userImg: imageUrl,
                    loading: false,
                }),
            );
        }
    };
    openGallery(imgSrc){
        this.setState({
            visible:true,
            currentImg:"/new/"+imgSrc
        })
    }
    render()
    {
        //const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        const imgs = [
            ['1.png','2.png','3.png'],
            ['4.png','5.png','6.png'],
            ['7.png','8.png','9.png'],
            ['10.png','11.png','12.png'],
            ['13.png'],
            
  
        ]
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                cover={<img src={'/new/'+item} onClick={()=>this.openGallery(item)} alt=""/>}
                style={{marginBottom:10}}
            >
                <Card.Meta
                    title=" "
                    description=" "
                />
            </Card>
        ))
        return (
            
            <div>  
                <Row gutter="10">
                    <Col md={6}>
                        {imgList[0]}
                    </Col>
                    <Col md={6}>
                        {imgList[1]}
                    </Col>
                    <Col md={6}>
                        {imgList[2]}
                    </Col>
                    <Col md={6}>
                        {imgList[3]}
                    </Col>
                    <Col md={6}>
                        {imgList[4]}
                    </Col>      

                </Row>
                <Modal
                    width={300}
                    height={500}
                    title="图片详情"
                    visible={this.state.visible}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                >
                    <img src={this.state.currentImg} alt="" width="100%"/>
                </Modal>
              
 
                 
            </div>
        )
    }
}

/*
      <Form layout="horizontal">
                        <FormItem label="头像" {...formItemLayout} >
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={this.handleChange}
                                    >
                                        {this.state.userImg ? <img src={this.state.userImg} alt='' /> : <Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                    </Form>
*/
