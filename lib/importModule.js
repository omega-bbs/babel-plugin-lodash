'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoize2 = require('lodash/memoize');

var _memoize3 = _interopRequireDefault(_memoize2);

var _babelHelperModuleImports = require('babel-helper-module-imports');

var _mapping = require('./mapping');

var _mapping2 = _interopRequireDefault(_mapping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*----------------------------------------------------------------------------*/

function resolvePath(pkgStore, name, path) {
  var base = pkgStore.base,
      id = pkgStore.id;

  var lower = name.toLowerCase();
  var module = _mapping2.default.modules.get(id);

  if (!module.get(base).has(lower)) {
    base = base ? '' : module.findKey(function (map) {
      return map.has(lower);
    });
    if (!base) {
      throw path.buildCodeFrameError([`The '${id}' method \`${name}\` is not a known module.`, 'Please report bugs to https://github.com/lodash/babel-plugin-lodash/issues.'].join('\n'));
    }
  }
  return id + '/' + (base ? base + '/' : '') + module.get(base).get(lower);
}

function importModule(pkgStore, name, path) {
  return (0, _babelHelperModuleImports.addDefault)(path, resolvePath(pkgStore, name, path), { nameHint: name });
}

exports.default = (0, _memoize3.default)(importModule, function (pkgStore, name) {
  return (pkgStore.path + '/' + name).toLowerCase();
});
module.exports = exports['default'];