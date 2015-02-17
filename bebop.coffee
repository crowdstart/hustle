fs   = require 'fs'
path = require 'path'

requisite = 'node_modules/.bin/requisite -s -g'

files =
  js:
    in:  'src/hustle.coffee'
    out: 'lib/hustle.js'

module.exports =
  cwd: process.cwd()

  exclude: [
    /node_modules/
  ]

  compilers:
    coffee: (src) ->
      return "#{requisite} #{files.js.in} -o #{files.js.out}"
