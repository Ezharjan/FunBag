import React from 'react';
import Utils from './../../utils/utils';
import {Table} from 'antd';
import { push_uniq } from 'terser';

export default class ETable extends React.Component{
    onRowClick =(record,index)=>{
        let rowSelection = this.props.rowSelection;
        if(rowSelection=='checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem =  this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if(selectedIds){
                const i = selectedIds.indexOf(record.id);
                if(i == -1){
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    //取反
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            }else{
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record]
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds);
        } else{
            let selectedRowKeys = [index];
            let selectedItem = record;
            this.props.updateSelectedItem(selectedRowKeys,selectedItem);
        }
    }
    tableInit = ()=>{
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys;
        const rowSeletion = {
            type:'radio',
            selectedRowKeys
        }
        if (row_selection === false || row_selection === null){
            row_selection = false;
        } else if(row_selection == 'checkbox'){
            rowSeletion.type = 'checkbox';
        } else {
            row_selection = 'radio';
        }
        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection?rowSeletion:null}
            onRow={(record,index)=>{
                return {
                    onClick:()=>{
                        if(!row_selection){
                            return;
                        }
                        this.onRowClick(record,index);
                    }
                }
            }}
        />
    }
    render(){
        return(
            <div>
                {this.tableInit()}
            </div>
        )
    }
}