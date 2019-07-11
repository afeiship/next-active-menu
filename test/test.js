(function() {
  var nx = require('next-js-core2');
  var NxActiveMenu = require('../src/next-active-menu');
  var menus = [];
  var activeMenuInstance;
  var pathToRegexp = require('path-to-regexp');

  // next packages:
  require('next-traverse');

  describe('NxActiveMenu basic test', function() {
    beforeEach(() => {
      menus = require(__dirname + '/menu.json');
      activeMenuInstance = new NxActiveMenu(menus);
    });

    test('main menu acitive', function() {
      var currentPath = '/admin/-1/person/chart-list';
      var items = activeMenuInstance.match(currentPath);
      nx.traverse(
        menus,
        (_, item, children) => {
          if (item.value === currentPath) {
            currentMenu = item;
            return nx.BREAKER;
          }
        },
        { itemsKey: 'children' }
      );

      expect(items.length).toBe(1);
      expect(pathToRegexp(items[0]).test(currentPath)).toBe(true);
    });

    test('main menu - sub - level1', function() {
      var currentPath = '/admin/-1/person/1/1';
      var items = activeMenuInstance.match(currentPath);
      expect(items).toEqual([
        '/admin/-1/person/1/:id',
        '/admin/-1/person/chart-list'
      ]);
    });

    test('main menu - sub - level3', function() {
      var currentPath = '/admin/space/1/setting';
      var items = activeMenuInstance.match(currentPath);
      expect(items).toEqual([
        '/admin/space/:id/setting',
        '/admin/space/:id',
        '/admin/space'
      ]);
    });

    test('active level3', function() {
      var routes = [
        '/admin/space/:id/setting',
        '/admin/space/:id',
        '/admin/space'
      ];
      var items = activeMenuInstance.active(routes);
      expect(items.length).toBe(3);
    });

    test('menu serialize', function() {
      var data = activeMenuInstance.serialize();
      console.log(data);
    });
  });
})();
