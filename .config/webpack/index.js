const development = require('./environments/development')
const production = require('./environments/production')

module.exports = mode => {
  if (mode === 'production') {
    return production
  }

  return development
}
