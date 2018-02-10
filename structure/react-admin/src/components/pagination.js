/**
 * Created by luwenwei on 17/9/26.
 */
import React from "react";
const UiPagination = require("../untils/ui-pagination");
export default class Pagination extends React.Component {
    static defaultProps = {}

    constructor(props) {
        super(props);
        this.paginationMessage = props.paginationMessage || {};
        this.pageSize = this.paginationMessage.pageSize
        this.totalPages = this.paginationMessage.totalPages
        this.updatePagination = false;
    }

    everyPageSizeChange = (e)=> {
        this.props.gotoPage({page_size:e.target.value,page:1});
    }

    createPagination() {
        this.uiPagination = new UiPagination(this.totalPages,this.$uiPagination);
        this.uiPagination.init();
        this.listenGotoPage();
    }

    listenGotoPage() {
        $(this.$uiPagination).on("gotoPage",(e,page)=> {
            this.props.gotoPage({page:page})
        })
    }

    componentDidMount() {
        this.createPagination();
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.paginationMessage) return;
        if(this.pageSize !== nextProps.paginationMessage.pageSize || this.totalPages !== nextProps.paginationMessage.totalPages){
            this.pageSize = nextProps.paginationMessage.pageSize;
            this.totalPages = nextProps.paginationMessage.totalPages;
            this.currentPage = nextProps.paginationMessage.currentPage;
            this.updatePagination = true;
            return;
        }
    }

    componentDidUpdate() {
        if(this.updatePagination){
            this.createPagination();
            this.updatePagination = false;
        }/*在这里才能获得$uiPagination这个真实节点*/
    }

    render() {
        let paginationMessage = this.props.paginationMessage;
        if(!paginationMessage) return null;/*由于返回null，$uiPagination这个真实节点并没有生成*/
        let {totalRecords,totalPages,currentPage} = paginationMessage;
        return <div>
                <div style={{float:"left"}}>
                    <span>{"一共"+totalRecords+"条数据，"+"分为"+totalPages+"页，"+"当前"+currentPage+"页。"}</span>
                    <span style={{display: "inline-block",width: "60px"}}>
                        <select className="custom-select" style={{width: "60px"}} onChange={this.everyPageSizeChange}>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                            <option>200</option>
                        </select>
                    </span>
                </div>
                <div style={{float:"right"}}>
                    <span ref={(ref) => { this.$uiPagination = ref; }}></span>
                </div>
                <div style={{clear: "both"}}></div>
            </div>
    }
}