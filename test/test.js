(function() {
  var nx = require('next-js-core2');
  var NxActiveMenu = require('../src/next-active-menu');
  var menus = [];
  var activeMenuInstance;

  // next packages:
  require('next-traverse');

  describe('NxActiveMenu basic test', function() {
    beforeEach(() => {
      menus = require(__dirname + '/menu.json');
      activeMenuInstance = new NxActiveMenu(menus);
    });

    test('main menu acitive', function() {
      var currentMenu = null;
      var currentPath = '/admin/-1/person/chart-list';
      var items = activeMenuInstance.match(menus, currentPath);
      nx.traverse(
        menus,
        (_, item, children) => {
          if (item.value === currentPath) {
            currentMenu = item;
          }
        },
        { itemsKey: 'children' }
      );
      expect(items.length).toBe(1);
      expect(items.includes(currentPath)).toBe(true);
    });

    test('main menu - sub - level1', function() {
      var currentPath = '/admin/-1/person/1/1';
      var items = activeMenuInstance.match(currentPath);
      expect(items).toEqual(['/admin/-1/person/chart-list', currentPath]);
    });

    test('main menu - sub - level3', function() {
      var currentPath = '/admin/space/1/setting';
      var items = activeMenuInstance.match(currentPath);
      expect(items).toEqual(['/admin/space', '/admin/space/1', currentPath]);
    });
  });
})();
