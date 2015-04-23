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
        topLevelKeys = R.filter(R.allPass([hasDeps, isNotNodeModule]))(allKeys)

    var html = mt.render(template, {
        title:'JavaScript dependencies Diagrams for ' + program.args,
        datas: JSON.stringify(rawData),
        topLevelKeys: topLevelKeys,
        project: program.args
    });

    return html

}

module.exports = function (rawData, program) {
    var html = genHtml(rawData, program)
    process.stdout.write(html);
}
