/**
 * Created by luwenwei on 17/2/5.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
//import { HashRouter, Route } from 'react-keeper'
import axios from './config/axiosConfig';
import App from './app';
import { setMyInfo,setConstants } from './untils/global';
import { hideLoading } from './untils/commonMethods';
import './styles/main.css';
import './styles/someReset.css';
import './untils/toggle';

async function init() {
    var myInfo = await axios.get('/api/v0/my_info');
    setMyInfo(myInfo.data);
    var constants = await axios.get('/api/v0/constants');
    setConstants(constants.data);
    hideLoading(true);
    ReactDom.render((
        <HashRouter>
            <App />
        </HashRouter>
    ), document.getElementById('root'));
}
init();
