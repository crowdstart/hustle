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
        var $el, animation, animations, el, lastDelay, lastDuration, lastLoop, lastUsing, oldThens, set, sets, thens, _i, _j, _len, _len1, _results;
        el = arguments[0], animations = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        $el = $(el);
        lastUsing = null;
        lastDuration = null;
        lastDelay = null;
        lastLoop = null;
        sets = [];
        thens = null;
        for (_i = 0, _len = animations.length; _i < _len; _i++) {
          animation = animations[_i];
          if (isFunc(animation)) {
            switch (animation.HustleFn) {
            case hustle.set:
              sets.push(animation);
              break;
            case hustle.using:
              lastUsing = animation;
              break;
            case hustle.duration:
              lastDuration = animation;
              break;
            case hustle.delay:
              lastDuration = animation;
              break;
            case hustle.loop:
              lastLoop = animation;
              break;
            case hustle.then:
              if (thens != null) {
                oldThens = thens;
                thens = function ($el) {
                  animation($el);
                  return oldThens($el)
                }
              } else {
                thens = animation
              }
            }
          }
        }
        if (lastUsing != null) {
          lastUsing($el)
        }
        if (lastDuration != null) {
          lastDuration($el)
        }
        if (lastDelay != null) {
          lastDelay($el)
        }
        if (lastLoop != null) {
          lastLoop($el)
        }
        addClass($el, ANIMATE_CSS_CLASSES.animated(thens));
        _results = [];
        for (_j = 0, _len1 = sets.length; _j < _len1; _j++) {
          set = sets[_j];
          _results.push(set($el))
        }
        return _results
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
      },
      then: function (someFn) {
        var fn;
        fn = function ($el) {
          return someFn($el)
        };
        fn.HustleFn = hustle.then;
        return fn
      }
    };
    module.exports = hustle
  });
  require('./hustle')
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh1c3RsZS5jb2ZmZWUiXSwibmFtZXMiOlsiQU5JTUFURV9DU1NfQ0xBU1NFUyIsIklTX1NBRkFSSSIsImFkZENTUyIsImFkZENsYXNzIiwiaHVzdGxlIiwiaXNGdW5jIiwiX19zbGljZSIsInNsaWNlIiwiYW5pbWF0ZWQiLCJsb29wRm9yZXZlciIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJJbnQ4QXJyYXkiLCJvYmoiLCJ0b1N0cmluZyIsImNhbGwiLCIkZWwiLCJjbGFzIiwibmV4dCIsIm9uZSIsInJlbW92ZUNsYXNzIiwiZmllbGQiLCJ2YWx1ZSIsIm9sZFZhbHVlIiwiY3NzIiwiYW5pbWF0ZSIsImFuaW1hdGlvbiIsImFuaW1hdGlvbnMiLCJlbCIsImxhc3REZWxheSIsImxhc3REdXJhdGlvbiIsImxhc3RMb29wIiwibGFzdFVzaW5nIiwib2xkVGhlbnMiLCJzZXQiLCJzZXRzIiwidGhlbnMiLCJfaSIsIl9qIiwiX2xlbiIsIl9sZW4xIiwiX3Jlc3VsdHMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCIkIiwiSHVzdGxlRm4iLCJwdXNoIiwidXNpbmciLCJkdXJhdGlvbiIsImRlbGF5IiwibG9vcCIsInRoZW4iLCJhcmdzIiwiZm4iLCJhcHBseSIsImFuaW1hdGlvbk5hbWUiLCJ0aW1lcyIsInNvbWVGbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNBLElBQUFBLG1CQUFBLEVBQUFDLFNBQUEsRUFBQUMsTUFBQSxFQUFBQyxRQUFBLEVBQUFDLE1BQUEsRUFBQUMsTUFBQSxFQUFBQyxPQUFBLE1BQUFDLEtBQUEsQztJQUFBUCxtQkFBQSxHQUNFO0FBQUEsTUFBQVEsUUFBQSxFQUFVLFVBQVY7QUFBQSxNQUNBQyxXQUFBLEVBQWEsVUFEYjtBQUFBLEtBREYsQztJQUFBUixTQUFBLEdBS1lTLFNBQUEsQ0FBVUMsU0FBVixD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