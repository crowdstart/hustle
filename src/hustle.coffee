# Constants corresponding to animate css classes
ANIMATE_CSS_CLASSES =
  animated: "animated"
  loopForever: "infinite"

# Detect Safari for webkit prefixes
IS_SAFARI = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1

# From Underscore.js
isFunc =
  if typeof /./ != 'function' && typeof Int8Array != 'object'
    (obj) ->
      typeof obj == 'function' || false
  else
    (obj) ->
      toString.call obj == '[object Function]'

# Add a class to an element that is removed once animation is complete
addClass = ($el, clas, next) ->
  $el.addClass clas
  $el.one "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
    ()-> $el.removeClass clas
    next $el if isFunc next

# Add css/style pairs to an element that is removed once animation is complete
addCSS = ($el, field, value, next) ->
  oldValue = $el.css field
  $el.css field, value
  $el.one "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
    ()-> $el.css field, oldValue
    next $el if isFunc next?

hustle =
  # animation executes a series of animations
  animate: (el, animations...) ->
    $el = $ el
    addClass $el, ANIMATE_CSS_CLASSES.animated

  # set takes in a jquery object and calls css with the parameters
  set: (args...) ->
    fn = ($el)->
      $el.css args...
    fn.HustleFn = hustle.set
    fn

  # using specifies the Animate.CSS class to use, only the last one before a then is applied.
  # using relies on the user to supply valid class names from Animate.css
  using: (animationName) ->
    fn = ($el)->
      addClass $el, animationName
    fn.HustleFn = hustle.using
    fn

  # for specifies duration of animation
  for: (duration) ->
    if IS_SAFARI
      fn = ($el) ->
        addCSS $el, '-webkit-animation-duration', duration
    else
      fn = ($el) ->
        addCSS $el, 'animation-duration', duration
    fn.HustleFn = hustle.for
    fn

  # delay specifies the amount of time to wait until animation plays
  delay: (duration) ->
    if IS_SAFARI
      fn = ($el) ->
        addCSS $el, '-webkit-animation-delay', duration
    else
      fn = ($el) ->
        addCSS $el, 'animation-delay', duration
    fn.HustleFn = hustle.delay
    fn

  # loop specifies the number of times the animation loops, omitting the argument results in infinite animation
  # loop() causes 'then' calls that are part of the same animation block to fail
  loop: (times) ->
    if times?
      fn = ($el) ->
        addClass el, ANIMATE_CSS_CLASSES.loopForever
    else if IS_SAFARI
      fn = ($el) ->
        addCSS $el, '-webkit-animation-iteration-count', times
    else
      fn = ($el) ->
        addCSS $el, 'animation-iteration-count', times
    fn.HustleFn = hustle.loop
    fn

module.exports = hustle
