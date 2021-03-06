/**
 * Created by luwenwe on 2017/10/11.
 */
import React from  'react';
import  { Route,Redirect } from 'react-router-dom';
import { constants } from './global';
import axios from '../config/axiosConfig';
let loading;
let getConstantArrayValue = function(group, value) {
    let cs = constants[group];
    if(!cs) {
        console.log("found invalid constant: " + group + name);
        return -1;
    }
    for(let i = 0; i < cs.length; ++i) {
        if(cs[i][0] === value){
            return cs[i][2];
        }
    }
    return "";
}

let getConstantObjectValue = function(group, name) {
    let cs = constants[group];
    if(!cs) {
        console.log("found invalid constant: " + group + name);
        return -1;
    }
    for(let i = 0; i < cs.length; ++i) {
        if(cs[i]["code"] === name){
            return cs[i]["description"];
        }
    }
    return -1;
}

let showLoading = function (global) {
    if(loading) return;
    let p, c;
    if(global){
        p = "fakeloader1";
        c = "spinner7";
    }else{
        p = "fakeloader6";
        c = "spinner2";
    }
    $('.' + c).show();
    $("." + p).fadeIn("fast",function () {
        loading = true;
    });
};

let hideLoading = function (global) {
    let p;
    if(global){
        p = "fakeloader1";
    }else{
        p = "fakeloader6";
    }
    $("."+p).fadeOut("fast",function () {
        loading = false;
    });
};

let translateSelectSource = function (source) {
    let newSource = []
    for(let s of source){
        let obj = {id:''+s.code,name:s.description};
        newSource.push(obj);
    }
    return newSource;
};

let findObjectById = function (objectList, id) {
    for(let i = 0; i < objectList.length; ++i) {
        let obj = objectList[i];
        if(obj.id == id) {
            return obj;
        }
    }
    return null;
};

let findObjectIndexById = function (objectList, id) {
    for(let i = 0; i < objectList.length; ++i) {
        let obj = objectList[i];
        if(obj.id == id) {
            return i;
        }
    }
    return null;
}

let exportData = function (view,params) {
    axios({
        "url":this.makeUrl("export"),
        "data":{view:view,params:params},
        "method":"POST"
    }).then(function(res){
        if(res.status == 200) {
            React.$alert("success","导出成功");
            return;
        }
        React.$alert("error",res.data)
    }.bind(this))
}

let subStrText = function (val,cutTextCount) {
    if(!val) return "";
    cutTextCount = cutTextCount || 20;
    let newVal = val.length > cutTextCount ? val.substr(0,cutTextCount)+"..." : val;
    return newVal;
}

let createRoute = function (routes,temporarily) {
    return routes.map((route,i)=> {
        if(route.exact) return <Route key={'route_'+i} exact={route.exact ? route.exact : true} path={route.path} render={()=>{return <Redirect to={"/"+route.redirect+"/"} />}}></Route>
        return <Route path={route.path} key={'route_'+i} render={(match)=>{return temporarily[route.key](match,route.routes)}}></Route>
    })
}

export { 
    getConstantArrayValue,
    getConstantObjectValue,
    showLoading,
    hideLoading,
    translateSelectSource,
    findObjectById,
    findObjectIndexById,
    exportData,
    subStrText,
    createRoute
}