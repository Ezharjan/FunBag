import {Select} from 'antd';
import React from 'react';
const Option = Select.Option;
export default {
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showTotal:()=>{
                return  `共${data.result.total_count}条`
            },
            showQuickJumper:true
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        });
        return options;
    },
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            //多选
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
        this.setState({
            selectedRowKeys,
            selectedItem,
            selectedIds
        })
    }
}