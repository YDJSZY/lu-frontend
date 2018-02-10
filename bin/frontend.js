#!/usr/bin/env node
var program = require('commander');
var gs = require('../lib/generateStructure');
program
    .version(require('../package.json').version)
    .usage('[options] [project name]')
    .parse(process.argv);
var projectType = program.args[0];
var targetProjectName = program.args[1];
console.log(program.args);
if (!projectType || !targetProjectName) program.help();
gs(projectType,targetProjectName);