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
    var ANIMATE_CSS_CLASSES, IS_SAFARI, addCSS, addClass, hustle, isFunc, __slice = [].slice;
    ANIMATE_CSS_CLASSES = {
      animated: 'animated',
      loopForever: 'infinite'
    };
    IS_SAFARI = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    isFunc = typeof /./ !== 'function' && typeof Int8Array !== 'object' ? function (obj) {
      return typeof obj === 'function' || false
    } : function (obj) {
      return toString.call(obj === '[object Function]')
    };
    addClass = function ($el, clas, next) {
      $el.addClass(clas);
      return $el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        return $el.removeClass(clas)
      }, isFunc(next) ? next($el) : void 0)
    };
    addCSS = function ($el, field, value, next) {
      var oldValue;
      oldValue = $el.css(field);
      $el.css(field, value);
      return $el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        return $el.css(field, oldValue)
      }, isFunc(next != null) ? next($el) : void 0)
    };
    hustle = {
      animate: function () {
        var $el, animations, el;
        el = arguments[0], animations = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        $el = $(el);
        return addClass($el, ANIMATE_CSS_CLASSES.animated)
      },
      set: function () {
        var args, fn;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        fn = function ($el) {
          return $el.css.apply($el, args)
        };
        fn.HustleFn = hustle.set;
        return fn
      },
      using: function (animationName) {
        var fn;
        fn = function ($el) {
          return addClass($el, animationName)
        };
        fn.HustleFn = hustle.using;
        return fn
      },
      'for': function (duration) {
        var fn;
        if (IS_SAFARI) {
          fn = function ($el) {
            return addCSS($el, '-webkit-animation-duration', duration)
          }
        } else {
          fn = function ($el) {
            return addCSS($el, 'animation-duration', duration)
          }
        }
        fn.HustleFn = hustle['for'];
        return fn
      },
      delay: function (duration) {
        var fn;
        if (IS_SAFARI) {
          fn = function ($el) {
            return addCSS($el, '-webkit-animation-delay', duration)
          }
        } else {
          fn = function ($el) {
            return addCSS($el, 'animation-delay', duration)
          }
        }
        fn.HustleFn = hustle.delay;
        return fn
      },
      loop: function (times) {
        var fn;
        if (times != null) {
          fn = function ($el) {
            return addClass(el, ANIMATE_CSS_CLASSES.loopForever)
          }
        } else if (IS_SAFARI) {
          fn = function ($el) {
            return addCSS($el, '-webkit-animation-iteration-count', times)
          }
        } else {
          fn = function ($el) {
            return addCSS($el, 'animation-iteration-count', times)
          }
        }
        fn.HustleFn = hustle.loop;
        return fn
      }
    };
    module.exports = hustle
  });
  require('./hustle')
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh1c3RsZS5jb2ZmZWUiXSwibmFtZXMiOlsiQU5JTUFURV9DU1NfQ0xBU1NFUyIsIklTX1NBRkFSSSIsImFkZENTUyIsImFkZENsYXNzIiwiaHVzdGxlIiwiaXNGdW5jIiwiX19zbGljZSIsInNsaWNlIiwiYW5pbWF0ZWQiLCJsb29wRm9yZXZlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJJbnQ4QXJyYXkiLCJvYmoiLCJ0b1N0cmluZyIsImNhbGwiLCIkZWwiLCJjbGFzIiwibmV4dCIsIm9uZSIsInJlbW92ZUNsYXNzIiwiZmllbGQiLCJ2YWx1ZSIsIm9sZFZhbHVlIiwiY3NzIiwiYW5pbWF0ZSIsImFuaW1hdGlvbnMiLCJlbCIsImFyZ3VtZW50cyIsImxlbmd0aCIsIiQiLCJzZXQiLCJhcmdzIiwiZm4iLCJhcHBseSIsIkh1c3RsZUZuIiwidXNpbmciLCJhbmltYXRpb25OYW1lIiwiZHVyYXRpb24iLCJkZWxheSIsImxvb3AiLCJ0aW1lcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNBLElBQUFBLG1CQUFBLEVBQUFDLFNBQUEsRUFBQUMsTUFBQSxFQUFBQyxRQUFBLEVBQUFDLE1BQUEsRUFBQUMsTUFBQSxFQUFBQyxPQUFBLE1BQUFDLEtBQUEsQztJQUFBUCxtQkFBQSxHQUNFO0FBQUEsTUFBQVEsUUFBQSxFQUFVLFVBQVY7QUFBQSxNQUNBQyxXQUFBLEVBQWEsVUFEYjtBQUFBLEtBREYsQztJQUFBUixTQUFBLEdBS1lTLFNBQUEsQ0FBVUMsU0FBVixDQUFvQkMsT0FBcEIsQ0FBNEIsUUFBNUIsTUFBeUMsRUFBekMsSUFBK0NGLFNBQUEsQ0FBVUMsU0FBVixDQUFvQkMsT0FBcEIsQ0FBNEIsUUFBNUIsTUFBeUMsRUFMcEcsQztJQUFBUCxNQUFBLEdBU0ssZUFBYyxVQUFkLElBQTRCLE9BQUFRLFNBQUEsS0FBb0Is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