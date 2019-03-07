'use strict'

const spawn = require('cross-spawn')
const {
  getPathToGlobalCommand,
  hereRelative,
  resolveExecutable
} = require('../common/utils')

const args = process.argv.slice(2)
const executable = 'lint-staged'
const config = ['-v -d', '--config', hereRelative('../config/lintstaged.js')]

const resolveParams = {
  pathToGlobalCommand: getPathToGlobalCommand(executable),
  moduleName: executable,
  cwd: process.cwd()
}
const result = spawn.sync(
  resolveExecutable(executable, resolveParams),
  [...config, ...args],
  { stdio: 'inherit' }
)

process.exit(result.status)