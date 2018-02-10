/**
 * Created by Apple on 17/2/6.
 */
import  { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import React from "react";
import Bundle from './bundle.js';
import ManageUsers from 'bundle-loader?lazy&name=[name]!../pages/manageUsers/manageUsersPage.js';
import Comments from 'bundle-loader?lazy&name=[name]!../pages/comments/commentsPage.js';
import Promotion from 'bundle-loader?lazy&name=[name]!../pages/promotion/promotionPage.js';
//import page_b from 'bundle-loader?lazy&name=[name]!../pages/page_b/page_b.js';
import { getLocalStorage } from '../untils/global';
const $localStorage = getLocalStorage();
const currentRoute = $localStorage.route;
const exactRoute = currentRoute || "manageUsers";
const ManageUsers = (match) => (
    <Bundle load={manageUsers}>
        {(ManageUsers) => <ManageUsers match={match}/>}
    </Bundle>
)
const Comments = (match) => (
    <Bundle load={comments}>
        {(Comments) => <Comments match={match}/>}
    </Bundle>
)
const Promotion = (match) => (
    <Bundle load={promotion}>
        {(Promotion) => <Promotion match={match}/>}
    </Bundle>
)
/*const Page_b = (match) => (
 <Bundle load={page_b}>
 {(Page_b) => <Page_b match={match}/>}
 </Bundle>
 )*/

export default class Main extends React.Component {
    render() {
        return <HashRouter>
            <div>
                <Route path="/manageUsers" cache index key="manageUsers" loadComponent={ManageUsers}></Route>
                <Route path="/comments" cache key="comments" loadComponent={Comments}></Route>
                <Route path="/promotion" cache key="promotion" loadComponent={Promotion}></Route>
            </div>
        </HashRouter>

    }
}
