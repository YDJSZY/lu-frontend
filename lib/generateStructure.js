/**
 * Created by Apple on 17/2/20.
 */
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require('fs-extra'));
var root = __dirname;

function generateStructure(projectType,targetProjectName){
    console.log(root)
    var result;
    switch (projectType){
        case "react-admin":
            result = fs.copyAsync(root+'/../structure/'+projectType, targetProjectName,{clobber: true});
            break;
    }
    return result.then(function(err){
        if(err){
            console.error(err);
        }else{
            return console.log('generate project success');
        }
    })

}

module.exports = generateStructure;