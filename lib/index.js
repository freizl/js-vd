/*
 * js-vd
 * https://github.com/freizl/js-vd
 *
 * Copyright (c) 2015 Haisheng.Wu
 * Licensed under the MIT license.
 */

'use strict';

var R = require('ramda'),
    mt = require('mustache'),
    fs = require('fs'),
    template = fs.readFileSync(__dirname + '/index.mst', 'utf-8');

function genHtml(rawData, program) {
    var allKeys = R.keys(rawData),
        isNotNodeModule = R.compose(R.eq(-1), R.strIndexOf('node_modules', R.__)),
        hasDeps = R.compose(R.gt(R.__, 0), R.length, R.prop(R.__, rawData)),
        topLevelKeys = R.filter(R.allPass([hasDeps, isNotNodeModule]))(allKeys);

    var html = mt.render(template, {
        title:'JavaScript dependencies Diagrams for ' + program.args,
        datas: JSON.stringify(rawData),
        topLevelKeys: topLevelKeys,
        project: program.args
    });

    return html;
}


function dependOf(treeData, name) {
  var getVal = R.prop(R.__, treeData),
      hasDepends = R.compose(R.contains(name), getVal),
      keys = R.keys(treeData);

  return R.filter(hasDepends, keys);
}


/**
 * an reversed tree with the specified @depName@ as top.
 */
function genDependReverseTree(treeData, depName) {
  var ds = dependOf(treeData, depName),
      dTree = {};

  dTree[depName] = ds;

  if (R.isEmpty(ds)) {
    return dTree;
  } else {
    var deeperDeps = R.map(function (name) {
      return genDependReverseTree(treeData, name);
    }, ds);
    return R.mergeAll(deeperDeps.concat(dTree));
  }
}

module.exports = function (treeData, program) {
    if (program.depends) {
      treeData = genDependReverseTree(treeData, program.depends);
      //console.log(treeData);
    }
    var html = genHtml(treeData, program);
    process.stdout.write(html);
}
