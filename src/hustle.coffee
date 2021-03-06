# Constants corresponding to animate css classes for compatibility
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

# Add animation to the list of animations kept by each hustle created function
saveAnimations = (fn, fns) ->
  if isFunc fn
    if fns? && fns.HustleAnimations && isFunc fns.HustleAnimations.push
      fn.HustleAnimations = fns.HustleAnimations
    else
      fn.HustleAnimations = []

  fn.HustleAnimations.push fn

hustle =
  # animation executes a series of animations
  animate: (el, fns) ->
    $el = $ el
    animations = fns.HustleAnimations
    # non sets and then will override previous calls to the same fn
    lastUsing = null
    lastDuration = null
    lastDelay = null
    lastLoop = null
    sets = []
    thens = null
    for animation in animations
      # only recognize functions
      if isFunc animation
        switch animation.HustleFn
          when hustle.set
            sets.push animation
          when hustle.using
            lastUsing = animation
          when hustle.duration
            lastDuration = animation
          when hustle.delay
            lastDuration = animation
          when hustle.loop
            lastLoop = animation
          when hustle.then
            if thens?
              oldThens = thens
              thens = ($el) ->
                animation $el
                oldThens $el
            else
              thens = animation

    lastUsing $el if lastUsing?
    lastDuration $el if lastDuration?
    lastDelay $el if lastDelay?
    lastLoop $el if lastLoop?

    addClass $el, ANIMATE_CSS_CLASSES.animated thens

    set $el for set in sets

  # set takes in a jquery object and calls css with the parameters
  set: (args..., fns) ->
    fn = ($el)->
      $el.css args...
    fn.HustleFn = hustle.set
    saveAnimations fn, fns
    fn

  # using specifies the Animate.CSS, Bounce.js, or other easing class to use, only the last one before a then is applied.
  # using relies on the user to supply valid class names from Animate.css
  using: (animationName, fns) ->
    fn = ($el)->
      addClass $el, animationName
    fn.HustleFn = hustle.using
    saveAnimations fn, fns
    fn

  # for specifies duration of animation
  for: (durationi, fns) ->
    if IS_SAFARI
      fn = ($el) ->
        addCSS $el, '-webkit-animation-duration', duration
    else
      fn = ($el) ->
        addCSS $el, 'animation-duration', duration
    fn.HustleFn = hustle.for
    saveAnimations fn, fns
    fn

  # delay specifies the amount of time to wait until animation plays
  delay: (duration, fns) ->
    if IS_SAFARI
      fn = ($el) ->
        addCSS $el, '-webkit-animation-delay', duration
    else
      fn = ($el) ->
        addCSS $el, 'animation-delay', duration
    fn.HustleFn = hustle.delay
    saveAnimations fn, fns
    fn

  # loop specifies the number of times the animation loops, omitting the argument results in infinite animation
  # loop() causes 'then' calls that are part of the same animation block to fail
  loop: (times, fns) ->
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
    saveAnimations fn, fns
    fn

  # then executes an arbitrary fn after the current animation and passes it the element
  then: (someFn) ->
    # wrap someFn with a function so we can safely set fn.HustleFn
    fn = ($el) ->
      someFn $el

    fn.HustleFn = hustle.then
    saveAnimations fn
    fn

module.exports = hustle
