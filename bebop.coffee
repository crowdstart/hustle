exec = require('executive').interactive

# Compile style guide into docs/
kss = (done = ->) ->
  bin  = 'node_modules/.bin/kss-node'
  args = '--template=guide/template --source=src --source=guide --destination=docs --mask=*.styl'
  exec "#{bin} #{args}", -> stylus done

# Compile stylus from guide into docs/
stylus = (src = 'guide/template/public', done = ->) ->
  if typeof src == 'function'
    [done, src] = [src, 'guide/template/public']

  bin  = 'node_modules/.bin/stylus'
  args = '-u autoprefixer-stylus --sourcemap --sourcemap-inline'
  exec "#{bin} #{args} #{src} -o docs/public", done

module.exports =
  pre:       kss
  staticDir: 'docs/'

  include: [
    /docs/
    /guide/
    /src/
  ]

  compilers:
    html: (src) ->
      kss() if /^guide/.test src

    md:   (src) ->
      kss() if /^guide/.test src

    styl: (src) ->
      if /^guide/.test src
        stylus src
      if /^src/.test src
        stylus 'guide/template/public/quill.styl'
