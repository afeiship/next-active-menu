/*!
 * name: next-active-menu
 * url: https://github.com/afeiship/next-active-menu
 * version: 1.0.0
 * date: 2019-07-11T03:38:23.631Z
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var Nxtree = nx.Tree || require('next-tree');
  var nxTraverse = nx.traverse || require('next-traverse');
  var nxDeepClone = nx.deepClone || require('next-deep-clone');
  var pathToRegexp = require('path-to-regexp');
  var DEFAULT_OPTIONS = { itemsKey: 'children' };

  var NxActiveMenu = nx.declare('nx.ActiveMenu', {
    methods: {
      init: function(inItems, inOptions) {
        this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        this.dataTree = new Nxtree(inItems, this.options);
      },
      match: function(inValue) {
        var current = null;
        var ancestors = [];
        this.dataTree.traverse(function(key, item) {
          var regexp = pathToRegexp(item.value);
          if (regexp.test(inValue)) {
            current = item;
            return nx.BREAKER;
          }
        });

        current &&
          (ancestors = [current].concat(this.dataTree.ancestors(current)));
        return ancestors.map(function(item) {
          return item.value;
        });
      },
      active: function(inRoutes) {
        var results = [];
        var regRoutes = inRoutes.map(function(route) {
          return pathToRegexp(route);
        });
        var testItem = function(inItem) {
          return regRoutes.some(function(reg) {
            return reg.test(inItem.value);
          });
        };
        this.dataTree.traverse(function(key, item) {
          item.active = testItem(item);
          item.active && results.push(item);
        });
        return results;
      },
      serialize: function() {
        var cloneData = nxDeepClone(this.dataTree.data);
        nxTraverse(
          cloneData,
          function(_, item) {
            delete item.__parent__;
            delete item.__children__;
          },
          this.options
        );
        return cloneData;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxActiveMenu;
  }
})();

//# sourceMappingURL=next-active-menu.js.map
