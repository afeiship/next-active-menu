(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var nxTraverse = nx.traverse || require('next-traverse');
  var DEFAULT_OPTIONS = { itemsKey: 'children' };

  var NxActiveMenu = nx.declare('nx.ActiveMenu', {
    methods: {
      init: function(inItems, inOptions) {
        this.menu = inItems;
        this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      },
      match: function(inValue) {}
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxActiveMenu;
  }
})();
