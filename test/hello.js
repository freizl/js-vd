var main = require('./lib')

var fs = require('fs')
var raw = fs.readFileSync(__dirname + '/koa.json', 'utf-8'),
    rawData = JSON.parse(raw);

main(rawData)
