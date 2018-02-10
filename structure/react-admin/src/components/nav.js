/**
 * Created by Apple on 17/2/6.
 */
import cs from 'classnames'//引入classnames依赖库
import React from "react";
import { BrowserRouter as StaticRouter,Link } from 'react-router-dom';
//import { Link, Route } from 'react-keeper'
import { getLocalStorage } from '../untils/global';
const $localStorage = getLocalStorage();
const currentRoute = $localStorage.route;

export default class MyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        var $href = '#/'+currentRoute+'/';
        var admin_nav_a = $(".admin-nav").find("a[href='"+$href+"']");
        $(admin_nav_a).parent("li").addClass("active");
        $(admin_nav_a).parents("li.main-menu").addClass("active");
    }

    render() {
        var collapsedClass = cs({
            'nav-text':true,
            'hideNavText':this.props.collapsed
        });

        return  <div className="app-aside hidden-xs bg-black" style={{position: "fixed",height: "100%"}}>
                    <div className="aside-wrap">
                        <div className="navi-wrap">
                            <nav className="navi">
                                <ul className="nav admin-nav">
                                    <li className="main-menu">
                                        <a href className="auto">
                                            <span className="pull-right text-muted">
                                                <i className="fa fa-fw fa-angle-right text"></i>
                                                <i className="fa fa-fw fa-angle-down text-active"></i>
                                            </span>
                                            <i className="fa fa-users text-info-dker"></i>
                                            <span className="font-bold">用户管理</span>
                                        </a>
                                        <ul className="nav nav-sub dk">
                                            <li>
                                                <Link to="/manageUsers/">用户</Link>
                                            </li>
                                            <li>
                                                <Link to="/comments/">评论</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="main-menu">
                                        <a href className="auto">
                                          <span className="pull-right text-muted">
                                                <i className="fa fa-fw fa-angle-right text"></i>
                                                <i className="fa fa-fw fa-angle-down text-active"></i>
                                          </span>
                                            <i className="fa fa-th text-success-dker"></i>
                                            <span className="font-bold">拼单管理</span>
                                        </a>
                                        <ul className="nav nav-sub dk">
                                            <li>
                                                <Link to="/promotion/">促销产品</Link>
                                            </li>
                                            <li>
                                                <Link to="/category/">产品分类</Link>
                                            </li>
                                            <li>
                                                <Link to="/ordergroup/">已有拼单</Link>
                                            </li>
                                            <li>
                                                <Link to="/promotionRecord/">访问记录</Link>
                                            </li>
                                            <li>
                                                <Link to="/orderRecord/">拼单记录</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
    }
};
