/**
 * Created by luwenwei on 17/8/29.
 */
import MyMenu from './components/nav';
import Main from './route/index';
import React from 'react';
import AlertContainer from 'react-alert';
import FadeLoader from './components/fakeLoader';
import { myInfo } from './untils/global';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.alertOptions = {
            offset: 14,
            position: 'top right',
            theme: 'light',
            time: 5000,
            transition: 'scale'
        }
        React.$alert = this.alert.bind(this);
    }

    alert(type,mes) {
        this.$alert.show(mes, {
            type: type
        })
    }

    clearQueueAnimStyle = ()=> {
        $(".content").css({transform:"none"})
    }

    render() {
        return <div className="app app-header-fixed" id="app">
            <div className="app-header navbar" style={{textAlign: "center"}}>
                <div className="navbar-header bg-info dker" style={{background: "#108ee9"}}>
                    <button className="pull-right visible-xs dk" data-toggle="className:show" data-target=".navbar-collapse">
                        <i className="glyphicon glyphicon-cog"></i>
                    </button>
                    <button className="pull-right visible-xs" data-toggle="className:off-screen" data-target=".app-aside">
                        <i className="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <a href="#/" className="navbar-brand text-lt system-name" style={{fontSize: "19px"}}>
                        <span className="hidden-folded">Admin</span>
                    </a>
                </div>
                <div className="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
                    <div className="nav navbar-nav hidden-xs">
                        <a href="" className="btn no-shadow navbar-btn" data-toggle="className:app-aside-folded" data-target=".app">
                            <i className="fa fa-dedent fa-fw text"></i>
                            <i className="fa fa-indent fa-fw text-active"></i>
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="" style={{color:"#363f44"}} data-toggle="dropdown" className="dropdown-toggle clear" data-toggle="dropdown">
                                <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                    <img src="../app/images/head.jpg" alt="..." />
                                    <i className="on md b-white bottom"></i>
                                </span>
                                <span className="hidden-sm hidden-md">{myInfo.username}</span> <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu animated fadeInRight w">
                                <li>
                                    <a>个人信息</a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="/accounts/logout/">退出</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <MyMenu />
            <div className="app-content">
                <a href className="off-screen-toggle hide" data-toggle="className:off-screen" data-target=".app-aside" ></a>
                <FadeLoader />
                <div className="app-content-body ainmate-scale-up">
                    <Main />
                </div>
            </div>
            <div className="app-footer wrapper b-t bg-light" style={{"textAlign": "center"}}>
                <span>
                    <strong>快云信息科技有限公司</strong>
                </span>
            </div>
            <AlertContainer ref={ref => this.$alert = ref} {...this.alertOptions} />
        </div>
    }
}

