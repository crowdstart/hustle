(function (global) {
  var process = {
    title: 'browser',
    browser: true,
    env: {},
    argv: [],
    nextTick: function (fn) {
      setTimeout(fn, 0)
    },
    cwd: function () {
      return '/'
    },
    chdir: function () {
    }
  };
  // Require module
  function require(file, callback) {
    if ({}.hasOwnProperty.call(require.cache, file))
      return require.cache[file];
    // Handle async require
    if (typeof callback == 'function') {
      require.load(file, callback);
      return
    }
    var resolved = require.resolve(file);
    if (!resolved)
      throw new Error('Failed to resolve module ' + file);
    var module$ = {
      id: file,
      require: require,
      filename: file,
      exports: {},
      loaded: false,
      parent: null,
      children: []
    };
    var dirname = file.slice(0, file.lastIndexOf('/') + 1);
    require.cache[file] = module$.exports;
    resolved.call(module$.exports, module$, module$.exports, dirname, file);
    module$.loaded = true;
    return require.cache[file] = module$.exports
  }
  require.modules = {};
  require.cache = {};
  require.resolve = function (file) {
    return {}.hasOwnProperty.call(require.modules, file) ? require.modules[file] : void 0
  };
  // define normal static module
  require.define = function (file, fn) {
    require.modules[file] = fn
  };
  global.require = require;
  require.define('./hustle', function (module, exports, __dirname, __filename) {
    'use strict';
    var Hustle, hustle;
    Hustle = function () {
      Hustle.prototype.$el = null;
      function Hustle(el) {
        this.$el = $(el)
      }
      return Hustle
    }();
    hustle = {
      animate: function (el) {
        return new Hustle(el)
      }
    };
    module.exports = hustle
  });
  require('./hustle')
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh1c3RsZS5jb2ZmZWUiXSwibmFtZXMiOlsiSHVzdGxlIiwiaHVzdGxlIiwicHJvdG90eXBlIiwiJGVsIiwiZWwiLCIkIiwiYW5pbWF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLElBQUFBLE1BQUEsRUFBQUMsTUFBQSxDO0lBQUFELE1BQUEsRztNQUNFQSxNQUFBLENBQUFFLFNBQUEsQ0FBQUMsR0FBQSxHQUFLLElBQUwsQztNQUNhLFNBQUFILE1BQUEsQ0FBQ0ksRUFBRDtBQUFBLFFBQ1gsS0FBQ0QsR0FBRCxHQUFPRSxDQUFBLENBQUVELEVBQUYsQ0FESTtBQUFBLE87O0tBRmYsRztJQUFBSCxNQUFBLEdBTUU7QUFBQSxNQUFBSyxPQUFBLEVBQVMsVUFBQ0YsRUFBRDtBQUFBLFFBQ1AsT0FBVyxJQUFBSixNQUFBLENBQU9JLEVBQVAsQ0FESjtBQUFBLE9BQVQ7QUFBQSxLQU5GLEM7SUFBQUcsTUFBQSxDQVNPQyxPQVRQLEdBU2lCUCxNIiwic291cmNlUm9vdCI6Ii9zcmMifQ==