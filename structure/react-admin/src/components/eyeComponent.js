/**
 * Created by luwenwe on 2017/10/19.
 */
import React from "react";
import ReactDOM from "react-dom";

export default class EyeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.fieldModel = this.props.fieldModel;
        this.switchTdCache = this.props.switchTdCache;
    }

    openPanel = (e)=> {
        e.stopPropagation();
        e.preventDefault();
        let ele = ReactDOM.findDOMNode(this.$switchTdPanel);
        $(ele).show();
    }

    hidePanel = ()=> {
        let ele = ReactDOM.findDOMNode(this.$switchTdPanel);
        $(ele).hide();
    }

    switchTdShow = (key)=> {
        var switchTdCache = this.state.switchTdCache;
        switchTdCache[key] = !switchTdCache[key];
        this.setState({switchTdCache});
        this.props.callBack(switchTdCache)
    }

    componentDidMount() {
        $(document).click(()=> {
            this.hidePanel();
        })
        var switchTdCache = {};
        for(var m of this.fieldModel){
            switchTdCache[m.key] = m.show || false;
        }
        this.setState({
            switchTdCache
        })
    }

    render() {
        var fieldModel = this.fieldModel;
        var switchTdCache = this.state.switchTdCache || {};
        return <div className="mySelectBox">
            <div className="openBtn">
                <button type="button" className="btn btn-default" onClick={this.openPanel}>
                    <i className="fa fa-eye"></i>
                </button>
            </div>
            <div className="switch-td-panel" data-tabindex="1" ref={(refs)=>{this.$switchTdPanel = refs}} onClick={this.openPanel}>
                <ul>
                    {
                        fieldModel.map((item,index)=> {
                            if(item.eyeWatch === false) return null;
                            return <li key={item.key} onClick={(e)=>{this.switchTdShow(item.key)}} className="field_dl">
                                <span id={'_'+item.key} className={"myCheckBox" +(switchTdCache[item.key] ? " selectSpan" : "")}>✔</span>
                                <label htmlFor={item.key}>{item.title}</label>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}
