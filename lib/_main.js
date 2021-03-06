/* eslint no-console: 0 */
/* global $:false */
/* global R:false */
/* global Viz:false */
/* global rawData:false */
/* global reverseDeps:false */

(function (R, viz, $, rawData, reverseDeps) {
  function actionHandler() {
    genDiagram($('#modules').val(), $('#reverse-deps').is(':checked'));
  }

  function genDiagram(selectVal, reverseDep) {
    var treeData = rawData;
    var el = $('#graph');
    var dots;

    el.html('<h3>LOADING...</h3>');

    if (selectVal !== '...') {
      if (reverseDep) {
        treeData = genDependReverseTree(treeData, selectVal);
      }

      dots = graphData(selectVal, treeData);

      // Viz takes times synchronizedly !!
      setTimeout(function () {
        console.time('renderTree');
        var g = viz(dots, 'svg', 'dot');
        $('#graph').html(g);
        console.timeEnd('renderTree');
      }, 0);
    }
  }

  function dependOf(treeData, name) {
    var getVal = R.prop(R.__, treeData);
    var hasDepends = R.compose(R.contains(name), getVal);
    var keys = R.keys(treeData);

    return R.filter(hasDepends, keys);
  }

  /**
   * an reversed tree with the specified @depName@ as top.
   */
  function genDependReverseTree(treeData, depName) {
    if (!genDependReverseTree.cache) {
      genDependReverseTree.cache = {};
    }
    if (genDependReverseTree.cache[depName]) {
      return genDependReverseTree.cache[depName];
    }
    var ds = dependOf(treeData, depName);
    var dTree = {};

    dTree[depName] = ds;

    if (R.isEmpty(ds)) {
      return dTree;
    } else {
      var deeperDeps = R.map(R.curry(genDependReverseTree)(treeData), ds),
        allDeps = deeperDeps.concat(dTree),
        result = R.mergeAll(allDeps);
      genDependReverseTree.cache[depName] = result;
      return result;
    }
  }

  function getDep(name, treeData) {
    return (
      R.prop(name, treeData) || R.prop('node_modules/' + name, treeData) || []
    );
  }

  function graphData(name, treeData) {
    var nodes = [],
      links = [];

    genNode.cache = {};
    genNode([name], nodes, links, treeData);
    return genDot(nodes, links);
  }

  function genNode(names, nodes, links, treeData) {
    R.map(function (n) {
      if (!genNode.cache[n]) {
        var deps = getDep(n, treeData),
          ls = R.map(function (d) {
            return { source: n, target: d };
          }, deps);
        nodes.push(n);
        // links is "global" defined at graphData function hence have to change in place.
        R.map(function (l) {
          links.push(l);
        }, ls);

        genNode.cache[n] = ls;
        genNode(deps, nodes, links, treeData);
      }
    }, names);
  }

  function genDot(nodes, links) {
    var start = ['digraph G {'];
    var end = ['}'];
    var appendComma = function (x) {
      return '"' + x + '";';
    };
    var reverseArrow = $('#reverse-deps').is(':checked') ? ' [dir=back]' : '';
    var genLink = function (o) {
      return (
        '"' + o.source + '"' + ' -> ' + '"' + o.target + '"' + reverseArrow
      );
    };
    var xs = R.uniq(R.map(appendComma, nodes));
    var ys = R.uniq(R.map(genLink, links));
    var dots = R.reduce(R.concat, [], [start, xs, ys, end]).join('\r\n');

    return dots;
  }

  function nodeClickHandler() {
    var that = $(this);
    var val = that.find('text').text();

    if (rawData[val]) {
      $('#modules').val(val).change().trigger('chosen:updated');
    } else {
      $('#graph').html('<h3>ERROR: dont have module: ' + val + '</h3>');
    }
  }

  function main() {
    var m = $('#modules');
    var rd = $('#reverse-deps');

    m.bind('change', actionHandler);
    rd.bind('change', actionHandler);
    $('#graph').delegate('.node', 'click', nodeClickHandler);

    if (reverseDeps) {
      rd.prop('checked', true);
    }
    if (m.val()) {
      m.change();
    }
  }

  main();
})(R, Viz, $, rawData, reverseDeps);
