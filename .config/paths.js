const { resolve } = require('path')

const appDirectory = resolve(__dirname, '../')

function resolveApp (relativePath) {
  return resolve(appDirectory, relativePath)
}

module.exports = {
  app: resolveApp('src'),
  examples: resolveApp('examples'),
  favicon: resolveApp('src/images/favicon.png'),
  homepage: resolveApp('examples/index.html'),
  images: resolveApp('src/images'),
  styles: resolveApp('src/styles/main.css'),
  postcssConfig: resolveApp('.config/postcss/')
}
