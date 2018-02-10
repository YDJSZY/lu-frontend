/**
 * Created by luwenwe on 2017/9/11.
 */
import React from "react";
import QueueAnim from 'rc-queue-anim';
import DragTableTh from './dragTableTh/dragTableTh';
import Pagination from './pagination';
import {findObjectIndexById} from '../untils/commonMethods';
import propTypes from 'prop-types';

export default class DataTable extends React.Component {
    static defaultProps = {
        
    }

    static propTypes = {
        dataStore:propTypes.object,/*表格数据源*/
        dataModel:propTypes.array,/*数据字段描述*/
        updateDataStore:propTypes.func,/*更新数据源*/
        gotoPage:propTypes.func,/*翻页*/
        getExpandedRowTpl:propTypes.func/*表格展开*/
    }

    constructor(props) {
        super(props);
        this.state = {
            switchTdCache:{}
        }
    }

    expandedRow(record) {
        record.$showDetail = !record.$showDetail;
        let dataStore = this.props.dataStore;
        let index = findObjectIndexById(dataStore.results,record.id);
        dataStore.results[index] = record;
        this.props.updateDataStore(dataStore);/*打开或者关闭*/
    }/*每一行可以打开子行*/

    setSwitchTdCache() {
        let switchTdCache = this.state.switchTdCache || {};
        for(let model of this.props.dataModel){
            switchTdCache[model.key] = model.show || false;
        }
        this.setState({switchTdCache})
    }/*给那个小眼睛提供数据{key:true || false}*/

    switchTdCacheChange = (switchTdCache)=> {
        this.setState({switchTdCache})
    }

    dataModelChange = (dataModel) => {
        this.setState({dataModel})
    }/*表头拖拽组件回调*/

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        this.setSwitchTdCache();
    }

    componentDidMount() {
    }
    
    render() {
        let {dataModel,dataStore} = this.props;
        let switchTdCache = this.state.switchTdCache;
        return <div>
            <div className="table-responsive" key="table">
                <table className="table table-hover table-striped table-bordered" ref={(ref) => { this.$dataTable = ref; }}>
                    <thead ref={(ref) => { this.$dataTableThead = ref; }}>
                    <tr>
                        {dataModel.map((item,index)=> {
                            return switchTdCache[item.key] ?
                                <DragTableTh titleModel={dataModel} style={item.style}
                                             titleModelChange={(dataModel)=>{this.dataModelChange(dataModel)}}
                                             dataIndex={index} key={"_"+index} title={item.title}>
                                    {
                                        item.icon ?
                                            item.icon(this,item)
                                            : null
                                    }
                                </DragTableTh> : null
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        dataStore ?
                            (dataStore.totalRecords === 0 ?
                                <tr>
                                    <td colSpan="30">
                                        <div className="alert alert-info" style={{margin:"5px 0"}}>
                                            <h4><i className="icon fa fa-warning"></i>没有数据</h4>
                                        </div>
                                    </td>
                                </tr> :
                                dataStore.results.map((item,index)=> {
                                    return [
                                        <tr key={'_'+index}>
                                            {
                                                dataModel.map((modelItem,index)=> {
                                                    let val = item[modelItem.key];
                                                    return switchTdCache[modelItem.key] ?
                                                        <td key={modelItem.key}>{
                                                            modelItem.render ? modelItem.render(val,item,this) : val
                                                        }</td> : null
                                                })
                                            }
                                        </tr>,
                                        item["$showDetail"] ? <tr>{this.props.getExpandedRowTpl(item,this)}</tr> : null
                                    ]
                                }))
                            : null
                    }

                    <tr>
                    </tr>
                    </tbody>
                </table>
            </div>
            <Pagination key="pagination" paginationMessage={dataStore} gotoPage={this.props.gotoPage}></Pagination>
        </div>
    }
}