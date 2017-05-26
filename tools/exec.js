const _ = require('lodash')
const path = require('path')
const execSync = require('child_process').execSync

module.exports = function (command, options = {}) {
  execSync(command, _.defaultsDeep({}, options, {
    stdio: 'inherit',
    env: {
      AC_TOOLS: true,
      PATH: path.resolve(__dirname, '../node_modules/.bin') + ':' + process.env.PATH
    }
  }, {env: process.env}))
}
