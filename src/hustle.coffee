class Hustle
  $el: null
  constructor: (el) ->
    @$el = $ el

hustle =
  animate: (el) ->
    return new Hustle el

module.exports = hustle
